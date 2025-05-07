

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./grammar.css";
function ButtonSection() {
  console.log("Grammar component mounted");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const handleSubmit = async (e) => {
    console.log("Submit button clicked");
    e.preventDefault();
    setIsLoading(true);
    console.log("Making API request with data:", {
      category: "Basic Maths",
      subcategory: value,
      userId: userId, // Using a dummy ID for development
    });

    try {
      const response = await fetch(
        "http://localhost:3001/api/quizzes/generate-quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: "Basic Maths",
            subcategory: value,
            userId: userId, // Using a dummy ID for development
          }),
        }
      );
      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);
      setApiResponse(data);
      navigate("/quiz");
    } catch (error) {
      console.error("Error details:", error);
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="bodyq">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-6 rounded-lg min-w-[300px] text-center">
          <h1 className="maths">Quiz App</h1>
          <form onSubmit={handleSubmit} className="form">
            <h1 className="maths">Maths</h1>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <FormControl>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="select1"
                >
                  Choose a topic
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Beginner"
                    control={<Radio />}
                    label="Beginner"
                  />
                  <FormControlLabel
                    value="Intermediate"
                    control={<Radio />}
                    label="Intermediate"
                  />
                  <FormControlLabel
                    value="Advance"
                    control={<Radio />}
                    label="Advance"
                  />
                  {/* <FormControlLabel value="Passive" control={<Radio />} label="Passive" />
                <FormControlLabel value="Report Speech" control={<Radio />} label="Report Speech" />
                <FormControlLabel value="Pronouns" control={<Radio />} label="Pronouns" />
                <FormControlLabel value="Adjectives" control={<Radio />} label="Adjectives" />
                <FormControlLabel value="Conjunctions" control={<Radio />} label="Conjunctions" /> */}
                </RadioGroup>
              </FormControl>
              {value ? (
                <p className="select">You selected: {value}</p>
              ) : (
                <p className="select">Please select a topic</p>
              )}
              <button
                disabled={!value || isLoading}
                onClick={handleSubmit}
                type="button"
                className="btns"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </Stack>
          </form>
          {apiResponse && (
            <p className="mt-4">API Response: {JSON.stringify(apiResponse)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ButtonSection;