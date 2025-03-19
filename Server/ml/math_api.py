# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from transformers import AutoModelForCausalLM, AutoTokenizer
# # import torch

# # # Initialize FastAPI app
# # app = FastAPI()



# # # Load LLaMA 2 model and tokenizer
# # MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"


# # TOKEN = "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"

# # tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_auth_token=TOKEN)

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step: {problem}"
# #     inputs = tokenizer(input_text, return_tensors="pt").to("cpu")
# #     outputs = MODEL_NAME(**inputs, max_length=200)
# #     explanation = tokenizer.decode(outputs[0], skip_special_tokens=True)
# #     return {"explanation": explanation}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from transformers import AutoModelForCausalLM, AutoTokenizer
# # import torch
 
# # # Initialize FastAPI app
# # app = FastAPI()

# # # Load LLaMA 2 model and tokenizer
# # MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"

# # TOKEN = "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"  # Replace with your actual token

# # # Detect if CUDA is available
# # device = "cuda" if torch.cuda.is_available() else "cpu"   

# # # Load model and tokenizer
# # tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, token=TOKEN)
# # model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, token=TOKEN).to(device)

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step: {problem}"
    
# #     # Tokenize input and move to the detected device (CPU/GPU)
# #     inputs = tokenizer(input_text, return_tensors="pt").to(device)
    
# #     # Generate model response
# #     outputs = model.generate(**inputs, max_length=200)
# #     explanation = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
# #     return {"explanation": explanation}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from transformers import AutoModelForCausalLM, AutoTokenizer
# # import torch

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Load LLaMA 2 model and tokenizer
# # MODEL_NAME = "meta-llama/Meta-Llama-3-8B-Instruct"
# # TOKEN = "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"

# # # Check if CUDA (GPU) is available, otherwise use CPU
# # device = "cuda" if torch.cuda.is_available() else "cpu"

# # # Load tokenizer and model
# # tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, token=TOKEN)
# # model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float32).to(device)


# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step: {problem}"

# #     # Tokenize input and move it to the correct device
# #     inputs = tokenizer(input_text, return_tensors="pt").to(device)

# #     # Generate response
# #     outputs = model.generate(**inputs, max_length=200)
# #     explanation = tokenizer.decode(outputs[0], skip_special_tokens=True)

# #     return {"explanation": explanation}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # import requests

# # # FastAPI app instance
# # app = FastAPI()

# # # Hugging Face API details
# # API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct"
# # HEADERS = {"Authorization": "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"}

# # # Request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # # Function to send requests to Hugging Face API
# # def query(payload):
# #     response = requests.post(API_URL, headers=HEADERS, json=payload)
# #     return response.json()

# # # FastAPI endpoint to solve math problems
# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     response = query({"inputs": f"Explain step-by-step: {data.problem}"})
# #     return {"explanation": response}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # import openai

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Set your OpenAI API key
# # openai.api_key = "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"

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step simple as possible using examples: {problem}"

# #     # Make request to OpenAI
# #     response = openai.ChatCompletion.create(
# #         model="gpt-4",  # Use "gpt-3.5-turbo" for cheaper requests
# #         messages=[{"role": "system", "content": "You are a helpful math assistant."},
# #                   {"role": "user", "content": input_text}]
# #     )

# #     explanation = response["choices"][0]["message"]["content"]
# #     return {"explanation": explanation}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # import openai

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Set your OpenAI API key
# # openai.api_key = "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"  # Replace with your actual API key

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step: {problem}"

# #     # Make request to OpenAI (updated)
# #     response = openai.Completion.create(
# #         model="gpt-3.5-turbo",  # Use "gpt-3.5-turbo" for cheaper requests
# #         prompt=input_text,
# #         max_tokens=100
# #     )

# #     explanation = response["choices"][0]["text"]
# #     return {"explanation": explanation}

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # import requests

# # # Initialize FastAPI app
# # app = FastAPI()

# # # Hugging Face API details
# # API_URL = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"
# # HEADERS = {"Authorization": "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"}

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # # Function to query Hugging Face API
# # def query_huggingface(payload):
# #     response = requests.post(API_URL, headers=HEADERS, json=payload)
# #     return response.json()

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     problem = data.problem
# #     input_text = f"Explain step-by-step: {problem}"
    
# #     # Query the Hugging Face API
# #     response = query_huggingface({"inputs": input_text})
    
# #     # Extract explanation from response
# #     explanation = response[0]['generated_text'] if isinstance(response, list) else response
    
# #     return {"explanation": explanation}




# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # import google.generativeai as genai

# # from fastapi.middleware.cors import CORSMiddleware

# # # Initialize FastAPI app
# # app = FastAPI()


# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Change this to specific origins in production
# #     allow_credentials=True,
# #     allow_methods=["*"],  # Allows POST, GET, etc.
# #     allow_headers=["*"],
# # )



# # # Set up Gemini API Key
# # GEMINI_API_KEY = "AIzaSyAwzx51b6E989eCWd341_6AFoF5400zk9M"  # Replace with your Google API key
# # genai.configure(api_key=GEMINI_API_KEY)

# # # Define request schema
# # class MathProblem(BaseModel):
# #     problem: str

# # @app.post("/solve-math")
# # async def solve_math(data: MathProblem):
# #     input_text = f"Explain for childre use emojis to interact them give answer, answer is read by text to speech so generate answer text to speech friendly and easy to understand: {data.problem}"

# #     # Call Gemini API
# #     model = genai.GenerativeModel("gemini-pro")
# #     response = model.generate_content(input_text)

# #     # Extract and return response
# #     if response and response.candidates:
# #         explanation = response.candidates[0].content.parts[0].text
# #         return {"explanation": explanation}
# #     else:
# #         return {"error": "Failed to generate response"}

# from fastapi import FastAPI
# from pydantic import BaseModel
# import google.generativeai as genai
# from fastapi.middleware.cors import CORSMiddleware

# # Initialize FastAPI app
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to specific origins in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Set up Gemini API Key
# GEMINI_API_KEY = "AIzaSyAwzx51b6E989eCWd341_6AFoF5400zk9M"  # Replace with your Google API key
# genai.configure(api_key=GEMINI_API_KEY)

# # Store last response
# last_response = None

# # Define request schema
# class MathProblem(BaseModel):
#     problem: str

# @app.post("/solve-math")
# async def solve_math(data: MathProblem):
#     global last_response  # Use global variable to store last response

#     # If a response is already available, return it instead of generating a new one
#     if last_response:
#         return {"explanation": last_response}

#     input_text = f"Explain for children using emojis to engage them. Answer should be text-to-speech friendly and easy to understand: {data.problem}"

#     # Call Gemini API
#     model = genai.GenerativeModel("gemini-pro")
#     response = model.generate_content(input_text)

#     # Extract and store response
#     if response and response.candidates:
#         last_response = response.candidates[0].content.parts[0].text
#         return {"explanation": last_response}
#     else:
#         return {"error": "Failed to generate response"}

# from fastapi import FastAPI
# from pydantic import BaseModel
# import google.generativeai as genai
# from fastapi.middleware.cors import CORSMiddleware

# # Initialize FastAPI app
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to specific origins in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Set up Gemini API Key
# GEMINI_API_KEY = "AIzaSyAwzx51b6E989eCWd341_6AFoF5400zk9M"  # Replace with your Google API key
# genai.configure(api_key=GEMINI_API_KEY)

# # Define request schema
# class MathProblem(BaseModel):
#     problem: str

# @app.post("/solve-math")
# async def solve_math(data: MathProblem):
#     global last_response  # Use global variable to store last response

#     input_text = f"Explain for children using emojis to engage them. Answer should be text-to-speech friendly and easy to understand: {data.problem}"

#     # Call Gemini API
#     model = genai.GenerativeModel("gemini-pro")
#     response = model.generate_content(input_text)

#     # Extract and store response
#     if response and response.candidates:
#         last_response = response.candidates[0].content.parts[0].text  # Update the response every request
#         return {"explanation": last_response}
#     else:
#         return {"error": "Failed to generate response"}

# from fastapi import FastAPI
# from pydantic import BaseModel
# import google.generativeai as genai
# from fastapi.middleware.cors import CORSMiddleware
# from google.cloud import texttospeech
# import base64
# import os

# # Initialize FastAPI app
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Use trusted domains
#     allow_credentials=True,
#     allow_methods=["POST", "GET"],
#     allow_headers=["*"],
# )

# # Configure Gemini API
# GEMINI_API_KEY = "AIzaSyAwzx51b6E989eCWd341_6AFoF5400zk9M"
# genai.configure(api_key=GEMINI_API_KEY)

# # Set up Google TTS credentials
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "EnlightenDScred.json"
# tts_client = texttospeech.TextToSpeechClient()

# # Define request schema
# class MathProblem(BaseModel):
#     problem: str

# @app.post("/solve-math-tts")
# async def solve_math_tts(data: MathProblem):
#     input_text = f"Explain for children using emojis to engage them. Answer should be text-to-speech friendly and easy to understand: {data.problem}"

#     # Call Gemini API to generate explanation
#     model = genai.GenerativeModel("gemini-pro")
#     response = model.generate_content(input_text)

#     if not response or not hasattr(response, "text"):
#         return {"error": "Failed to generate response"}

#     explanation_text = response.text  # Get text directly

#     # Convert text to speech using Google TTS
#     synthesis_input = texttospeech.SynthesisInput(text=explanation_text)
#     voice = texttospeech.VoiceSelectionParams(language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
#     audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

#     tts_response = tts_client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

#     # Encode audio to base64 to send as JSON
#     audio_base64 = base64.b64encode(tts_response.audio_content).decode("utf-8")

#     return {"explanation": explanation_text, "audio": audio_base64}

from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import texttospeech
import base64
import os

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to trusted domains in production
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Configure Gemini API

# GEMINI_API_KEY ="AIzaSyB0DaFJuEdvnbXof0Ni1T0yFNpBUAqbVp0"
# genai.configure(api_key=GEMINI_API_KEY)

# Set up Google TTS credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "EnlightenDScred.json"
tts_client = texttospeech.TextToSpeechClient()

# Define request schema
class MathProblem(BaseModel):
    problem: str

# @app.post("/solve-math-tts")
# async def solve_math_tts(data: MathProblem):
#     input_text = f"""Create a very short, simple step-by-step explanation for children with Down syndrome. 
#     Keep it brief - no more than 6-8 short sentences. 
#     Use 'times' instead of '*' for multiplication.
#     Use 'divided by' instead of '/'.
#     Use simple words and concepts: {data.problem}"""

#     try:
#         # Call Gemini API to generate explanation
#         model = genai.GenerativeModel("models/gemini-1.5-pro")

#         response = model.generate_content(input_text)

#         # Ensure response is valid
#         if not response or not hasattr(response, "text") or not response.text.strip():
#             return {"error": "Failed to generate a valid explanation"}

#         # Get the original explanation text
#         original_text = response.text.strip()
        
#         # Create a clean display version (what the user will see)
#         display_text = original_text
#         display_text = display_text.replace("*", " times ")
#         display_text = display_text.replace("//", " divided by ")
#         display_text = display_text.replace("/", " divided by ")
#         display_text = display_text.replace("+", " plus ")
#         display_text = display_text.replace("-", " minus ")
#         display_text = display_text.replace("=", " equals ")
#         display_text = display_text.replace("**", " to the power of ")
        
#         # Create a separate TTS version with SSML tags (what will be spoken)
#         tts_text = original_text
#         tts_text = tts_text.replace("*", " times ")
#         tts_text = tts_text.replace("//", " divided by ")
#         tts_text = tts_text.replace("/", " divided by ")
#         tts_text = tts_text.replace("+", " plus ")
#         tts_text = tts_text.replace("-", " minus ")
#         tts_text = tts_text.replace("=", " equals ")
#         tts_text = tts_text.replace("**", " to the power of ")
        
#         # Build SSML document properly
#         ssml_text = "<speak>\n"
#         sentences = tts_text.split(". ")
#         for i, sentence in enumerate(sentences):
#             if sentence.strip():  # Skip empty sentences
#                 ssml_text += sentence.strip()
#                 if i < len(sentences) - 1:  # Don't add period and pause after last sentence
#                     ssml_text += ".<break time='700ms'/>\n"
#                 else:
#                     ssml_text += "."
#         ssml_text += "\n</speak>"
        
#         # Use the SSML for text-to-speech
#         synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)
        
#         voice = texttospeech.VoiceSelectionParams(
#             language_code="en-US", 
#             ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
#         )
        
#         audio_config = texttospeech.AudioConfig(
#             audio_encoding=texttospeech.AudioEncoding.MP3,
#             speaking_rate=0.8,
#             pitch=0.0,
#             volume_gain_db=1.0
#         )

#         tts_response = tts_client.synthesize_speech(
#             input=synthesis_input, voice=voice, audio_config=audio_config
#         )

#         # Encode audio to base64
#         audio_base64 = base64.b64encode(tts_response.audio_content).decode("utf-8")

#         # Return clean display text and audio
#         return {"explanation": display_text, "audio": audio_base64}

#     except Exception as e:
#         return {"error": str(e)}

@app.post("/solve-math-tts")
async def solve_math_tts(data: MathProblem):
    input_text = f"""Create a very short, simple step-by-step explanation for children with Down syndrome. 
    Keep it brief - no more than 5-6 short sentences. 
    Use 'times' instead of '*' for multiplication.
    Use 'divided by' instead of '/'.
    Use simple words and concepts: {data.problem}"""

    try:
        # Call Gemini API to generate explanation
        model = genai.GenerativeModel("models/gemini-1.5-pro")

        response = model.generate_content(input_text)

        # Ensure response is valid
        if not response or not hasattr(response, "text") or not response.text.strip():
            return {"error": "Failed to generate a valid explanation"}

        # Get the original explanation text
        original_text = response.text.strip()
        
        # Create a clean display version with emojis (what the user will see)
        display_text = original_text
        display_text = display_text.replace("*", " times ")
        display_text = display_text.replace("//", " divided by ")
        display_text = display_text.replace("/", " divided by ")
        display_text = display_text.replace("+", " plus ")
        display_text = display_text.replace("-", " minus ")
        display_text = display_text.replace("=", " equals ")
        display_text = display_text.replace("**", " to the power of ")
        
        # Add emojis to the display text
        # Split by sentences to add emojis at appropriate places
        display_sentences = display_text.split(". ")
        enhanced_display = []
        
        math_emojis = ["🔢", "🧮", "✏️", "📝", "🤔"]
        success_emojis = ["🎉", "👍", "⭐", "🌟", "🏆"]
        
        for i, sentence in enumerate(display_sentences):
            if sentence.strip():
                # Add math emojis to instruction sentences
                if "add" in sentence.lower() or "subtract" in sentence.lower() or "multiply" in sentence.lower() or "divide" in sentence.lower() or "times" in sentence.lower():
                    enhanced_display.append(f"{sentence} {math_emojis[i % len(math_emojis)]}")
                # Add encouraging emojis for conclusion sentences
                elif "that's" in sentence.lower() or "answer" in sentence.lower() or "result" in sentence.lower() or "equals" in sentence.lower():
                    enhanced_display.append(f"{sentence} {success_emojis[i % len(success_emojis)]}")
                else:
                    enhanced_display.append(sentence)
        
        display_text = ". ".join(enhanced_display)
        if not display_text.endswith("."):
            display_text += "."
        
        # Create a separate TTS version with SSML tags (what will be spoken)
        tts_text = original_text
        tts_text = tts_text.replace("*", " times ")
        tts_text = tts_text.replace("//", " divided by ")
        tts_text = tts_text.replace("/", " divided by ")
        tts_text = tts_text.replace("+", " plus ")
        tts_text = tts_text.replace("-", " minus ")
        tts_text = tts_text.replace("=", " equals ")
        tts_text = tts_text.replace("**", " to the power of ")
        
        # Build SSML document properly
        ssml_text = "<speak>\n"
        sentences = tts_text.split(". ")
        for i, sentence in enumerate(sentences):
            if sentence.strip():  # Skip empty sentences
                ssml_text += sentence.strip()
                if i < len(sentences) - 1:  # Don't add period and pause after last sentence
                    ssml_text += ".<break time='700ms'/>\n"
                else:
                    ssml_text += "."
        ssml_text += "\n</speak>"
        
        # Use the SSML for text-to-speech
        synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)
        
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", 
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )
        
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=0.8,
            pitch=0.0,
            volume_gain_db=1.0
        )

        tts_response = tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        # Encode audio to base64
        audio_base64 = base64.b64encode(tts_response.audio_content).decode("utf-8")

        # Return enhanced display text and audio
        return {"explanation": display_text, "audio": audio_base64}

    except Exception as e:
        return {"error": str(e)}