/*import React from 'react';
import { Link } from "react-router-dom";
import styles from "./vocabluary.css";

export default function Vocabluary(){
	return (
		<div className={styles.login_container}>
			
			<br></br>
			<br></br>
			<br></br>
		<div className="quiz">
			<h1 className='title'>Vocabluary</h1>

			<br></br>
			<br></br>
			<br></br>
		<div>
		<div>
		<Link to="/levelG">

		<section class="layout">
  <div class="grow1">
	<button type="button" className={styles.btnB}>
							Beginner
						</button></div>
  <div  class="grow1">
	<button type="button" className={styles.btnI}>
							Intermediate
						</button></div>
  <div class="grow1">
	<button type="button" className={styles.btnA}>
						Advance
						</button></div>
</section>
					
					</Link>
					</div>
					
			
		</div>
			
		</div>
		</div>
		
	)

}*/
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from "@mui/material";
import React, { useState } from 'react';
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
          category: "letters identification in English",
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
    <div className="bodyq">
    <div className="flex justify-center items-center h-screen">
     
      <div className="bg-gray-200 p-6 rounded-lg min-w-[300px] text-center">
      <h1 className="maths">Quiz App</h1>
        <form onSubmit={handleSubmit} className='form'>
        <h1 className="maths">Language</h1>
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
                <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
                {/* <FormControlLabel
                  value="Beginner"
                  control={<Radio />}
                  label="Beginner"
                  sx={{
                    color: "black",
                  }}
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Intermediate"
                  control={<Radio />}
                  label="Intermediate"
                />
                <FormControlLabel
                  sx={{
                    color: "black",
                  }}
                  value="Advance"
                  control={<Radio />}
                  label="Advance"
                /> */}
                
              </RadioGroup>
            </FormControl>
            {value && <p style={{ color: "purple" }}>You selected: {value}</p>}
            {!value && <p style={{ color: "purple" }}>Please select a topic</p>}

            <button className="btn1"
              disabled={!value || isLoading}
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              <span>Submit</span>
            </button>
          </Stack>
        </form>
        {apiResponse && <p>API Response: {JSON.stringify(apiResponse)}</p>}
      </div>
    </div>
    </div>
  );
}

export default ButtonSection;
