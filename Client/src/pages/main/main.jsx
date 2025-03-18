// import Stack from '@mui/material/Stack';
// import React from 'react';
// import { Link } from "react-router-dom";
// // import X from "../../assets/img/Quiz.jpg";
// import styles from "./main.css";
// export default function Main(){
	
	
// 	return (
// 		<body >
		
// 		<div className="bodyq1">
// 		<div className="quiz">
			
// 			<h1 className='title'>Courses</h1>
			
		
// 		<section class="layout">
// 			<div >

// 			</div>
// 			<div >
// 		<Stack direction="row" spacing={15} alignContent={'center'} >
 
//   <Link to="/menu">
//   <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700" }}>
//             Learning
//           </button>
// 						</Link>
						
 
//   {/* <Link to="/reading">
// 						<button type="button" className={styles.btnR}>
// 						Vocabulary
// 						</button>
// 					</Link> */}
  
//   <Link to="/DrawingCanvas">
// 						<button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
// 						Drawing
//           </button>
// 					</Link>
// 					<Link to="/TouchPiano">
// 						<button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
// 						Recital
//           </button>
// 					</Link>
// 					</Stack>
// 					</div>
// 					<div></div>
// 					</section>

		
					
			
	
// 		<br></br>
// 		<br></br>
	
		
		
// 			<ol>
				
// 				<p className='ha'>Are you ready to test your knowledge and challenge yourself?</p>
// 				<br></br>
// 				<p className='ha'> Welcome to our interactive quiz platform where you can engage in fun and educational quizzes on various topics.</p>
// 				<br></br>
// 				<p className='ha'>Quiz Rules:</p>
// 				<p className='ha'>Once you choose an answer it cannot be altered</p>
// 			</ol>
// 			<div>
// 			{/* <img src={X} className='image' alt="Quiz" /> */}
			
// 			</div>

// 		</div>
// 	</div>
// 		</body>
// 	)

	
// }

import Stack from '@mui/material/Stack';
import React from 'react';
import { Link } from "react-router-dom";
// import X from "../../assets/img/Quiz.jpg";
import styles from "./main.css";

export default function Main(){
	return (
		<body>
		<div className="bodyq1">
		<div className="quiz">
			
			<h1 className='title'>Talent Discovery</h1>
			
		<section className="layout">
			<div></div>
			<div>
		<Stack direction="row" spacing={15} alignContent={'center'} >
 
          <Link to="/menu">
            <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700" }}>
              Learning Skills
            </button>
          </Link>
						
          <Link to="/DrawingCanvas">
            <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
              Artistic Skills
            </button>
          </Link>
          
          <Link to="/TouchPiano">
            <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "100%", fontWeight: "700", marginLeft:"10" }}>
              Musical Skills
            </button>
          </Link>
        </Stack>
        </div>
        <div></div>
        </section>

        <br></br>
        <br></br>
	
        <div className="content-section">
          <p className='ha'>Welcome to the Talent Discovery Platform!</p>
          <br></br>
          <p className='ha'>This interactive platform is designed to help identify and nurture the unique talents and abilities of children with Down syndrome.</p>
          <br></br>
          <p className='ha'>Explore Different Skill Areas:</p>
          <ul className='ha-list'>
            <li className='ha'>Learning Skills - Engage with educational activities that are fun and accessible</li>
            <li className='ha'>Artistic Skills - Express creativity through drawing and visual arts</li>
            <li className='ha'>Musical Skills - Discover musical talents with our interactive piano</li>
          </ul>
          <br></br>
          <p className='ha'>Each activity is designed to be supportive, encouraging, and adapted to various abilities. Take your time and enjoy exploring!</p>
        </div>
			
        <div>
        {/* <img src={X} className='image' alt="Children enjoying activities" /> */}
        </div>

		  </div>
	  </div>
		</body>
	)
}