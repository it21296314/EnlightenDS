import Stack from '@mui/material/Stack';
import React from 'react';
import { Link } from "react-router-dom";
// import X from "../../assets/img/Quiz.jpg";
import "./menu.css";
export default function Menu(){
	
	
	return (
		<body >
		
		<div className="bodyq1">
		<div className="quiz">
			
			<h1 className='title'>Courses</h1>
			
		
		<section class="layout">
			<div >

			</div>
			<div >
		<Stack direction="row" spacing={15} alignContent={'center'} >
 
  <Link to="/grammar">
  <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700" }}>
            Maths
          </button>
						</Link>
						
 
  {/* <Link to="/reading">
						<button type="button" className={styles.btnR}>
						Vocabulary
						</button>
					</Link> */}
  
  <Link to="/vocabluary">
						<button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
						Language
          </button>
					</Link>
					<Link to="/main">
						<button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
						Main Page
          </button>
					</Link>
					</Stack>
					</div>
					<div></div>
					</section>

		
					
			
	
		<br></br>
		<br></br>
	
		
		
			<ol>
				
				<p className='ha'>Are you ready to test your knowledge and challenge yourself?</p>
				<br></br>
				<p className='ha'> Welcome to our interactive quiz platform where you can engage in fun and educational quizzes on various topics.</p>
				
				<p className='ha'>Quiz Rules:</p>
				<p className='ha'>Once you choose an answer it cannot be altered</p>
			</ol>
			<div>
			{/* <img src={X} className='image' alt="Quiz" /> */}
			
			</div>

		</div>
	</div>
		</body>
	)

	
}