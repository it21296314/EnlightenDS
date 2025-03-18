

import { z } from "zod";
import Questions from "../models/interest/questions.js";
import { v4 as uuidv4 } from "uuid";
import QuestionsCollection from "../models/interest/questionsCollection.js";

import { PromptTemplate } from "@langchain/core/prompts"; // ✅ Use this instead
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai"; // ✅ Corrected OpenAI import

const parser = StructuredOutputParser.fromZodSchema(
  z
    .array(
      z.object({
        question: z.string().describe("The question being asked."),
        optionA: z.string().describe("Option A for the question."),
        optionB: z.string().describe("Option B for the question."),
        optionC: z.string().describe("Option C for the question."),
        optionD: z.string().describe("Option D for the question."),
        correctAnswer: z
          .enum(["A", "B", "C", "D"])
          .describe("The correct option (A, B, C, or D)."),
      })
    )
    .length(6)
);
const formatInstructions = parser.getFormatInstructions();

const quizQuestions = [
  {
    question: "What is the capital city of France?",
    optionA: "Berlin",
    optionB: "Paris",
    optionC: "Rome",
    optionD: "Madrid",
    correctAnswer: "B",
  },
  {
    question: "What is the chemical symbol for water?",
    optionA: "W",
    optionB: "H2O",
    optionC: "O2",
    optionD: "Ag",
    correctAnswer: "B",
  },
];

const generateQuizzes = async (category, subcategory, userId) => {
  try {
    console.log("Starting quiz generation with:", {
      category,
      subcategory,
      userId,
    });

    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
      maxTokens: 2000,
    });

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not found");
    }

    const prompt = new PromptTemplate({
      template: `You are an esteemed expert in crafting quizzes for a prestigious educational magazine. Your current assignment involves creating a compelling quiz series centered around the topic of {category}. For this task, you are required to focus on the {subcategory} aspect of the topic.

      To achieve this, you are tasked with generating multiple-choice questions and options. Each question should have four options (A, B, C, and D), and only one of the options should be the correct answer. The questions should be appropriate for the {category} topic and {subcategory} level.

      {format_instructions}

      Generate 6 questions following this format.`,
      inputVariables: ["category", "subcategory"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const loadedChain = await prompt.format({
      category: category,
      subcategory: subcategory,
    });

    console.log("Calling OpenAI API...");
    const response = await model.invoke([
      {
        role: "system",
        content:
          "You are an expert quiz creator specializing in educational content.",
      },
      {
        role: "user",
        content: loadedChain,
      },
    ]);

    console.log("Got response from OpenAI:", response);

    // Extract content from the response
    const content = response.content;
    console.log("Response content:", content);

    const questions = await parser.parse(content);
    console.log("Parsed questions:", questions);

    const questionUUID = uuidv4();

    const newQuestionCollection = new QuestionsCollection({
      questionCollectionId: questionUUID,
      user: userId,
      category: category,
      subcategory: subcategory,
    });

    await newQuestionCollection.save();
    console.log("Saved question collection");

    // Save the questions to the database
    if (questions) {
      for (
        let questionIndex = 0;
        questionIndex < questions.length;
        questionIndex++
      ) {
        const { question, optionA, optionB, optionC, optionD, correctAnswer } =
          questions[questionIndex];

        const newQuestion = new Questions({
          questionId: questionUUID,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          user: userId,
          category,
          subcategory,
          questionCollection: newQuestionCollection._id,
        });

        await newQuestion.save();
      }
      console.log("Saved all questions successfully");
    }

    return questions;
  } catch (error) {
    console.error("Error in generateQuizzes:", error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
};

export default generateQuizzes;