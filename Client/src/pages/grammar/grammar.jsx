/*import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ButtonSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    // If user is not logged in, redirect to login page
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make API call here, replace the URL with your actual API endpoint

      const response = await fetch("http://localhost:8070/generate-quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "Grammer",
          subcategory: value,
          userId: userId,
        }),
      });

      const data = await response.json();
      console.log({ data });
      setApiResponse(data);
      navigate('/quiz')
    } 
    catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    
    <div className="flex justify-center items-center h-screen">
      
      <div className="bg-gray-200 p-6 rounded-lg min-w-[300px] text-center">
      <h1 alignItems='center'>Grammar</h1>
        <form onSubmit={handleSubmit} aria-setsize={'10000'}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Choose a topic
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Tenses"
                  control={<Radio />}
                  label="Tenses"
                  sx={{
                    color: "black",
                  }}
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Modals"
                  control={<Radio />}
                  label="Modals"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Nouns"
                  control={<Radio />}
                  label="Nouns"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Passive"
                  control={<Radio />}
                  label="Passive"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Report Speech"
                  control={<Radio />}
                  label="Report Speech"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Pronouns"
                  control={<Radio />}
                  label="Pronouns"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Adjectives"
                  control={<Radio />}
                  label="Adjectives"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Conjunctions"
                  control={<Radio />}
                  label="Conjunctions"
                />
              </RadioGroup>
            </FormControl>
            {value && <p style={{ color: "blue" }}>You selected: {value}</p>}
            {!value && <p style={{ color: "blue" }}>Please select a topic</p>}

            <LoadingButton
              disabled={!value || isLoading}
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              <span>Submit</span>
            </LoadingButton>
          </Stack>
        </form>
        {apiResponse && <p>API Response: {JSON.stringify(apiResponse)}</p>}
      </div>
    </div>
  );
}

export default ButtonSection;
*/
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./grammar.css";
function ButtonSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8070/generate-quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "Maths questions in Sinhala",
          subcategory: value,
          userId: userId,
        }),
      });
      const data = await response.json();
      console.log({ data });
      setApiResponse(data);
      navigate('/quiz');
    } catch (error) {
      console.error("Error:", error);
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
        <form onSubmit={handleSubmit} className='form'>
        <h1 className="maths">Maths</h1>
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
          
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" className="select1">
                Choose a topic
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
                {/* <FormControlLabel value="Passive" control={<Radio />} label="Passive" />
                <FormControlLabel value="Report Speech" control={<Radio />} label="Report Speech" />
                <FormControlLabel value="Pronouns" control={<Radio />} label="Pronouns" />
                <FormControlLabel value="Adjectives" control={<Radio />} label="Adjectives" />
                <FormControlLabel value="Conjunctions" control={<Radio />} label="Conjunctions" /> */}
              </RadioGroup>
            </FormControl>
            {value ? <p className="select">You selected: {value}</p> : <p className="select">Please select a topic</p>}
            <button 
              disabled={!value || isLoading}
              loading={isLoading}
              variant="contained"
              type="submit"
              className="btns"
            >
              Submit
            </button>
          </Stack>
        </form>
        {apiResponse && <p className="mt-4">API Response: {JSON.stringify(apiResponse)}</p>}
      </div>
    </div>
    </div>
  );
}

export default ButtonSection;
