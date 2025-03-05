import React from 'react';
import { Link } from "react-router-dom";

export default function Menu(){
	return (
		<div className="quiz">
			<h1 className='title text-light'>Grammar</h1>

		<div>
		<Link to="/levelG">
						<button type="button" className={styles.btnG}>
							Grammar
						</button>
					</Link>
					<Link to="/levelR">
						<button type="button" className={styles.btnR}>
							Reading
						</button>
					</Link>
					<Link to="/levelV">
						<button type="button" className={styles.btnV}>
						Vocabluary
						</button>
					</Link>
			<div className="grammar">
				<Link className="btnG" to={'levelG'}>Grammar</Link>
			</div>
			<div className="read">
				<Link className="btnR" to={'levelR'}>Grammar</Link>
			</div>
			<div className="vocabluary">
				<Link className="btnV" to={'levelV'}>Vocabluary</Link>
			</div>
			
		</div>
			<ol>
				<li>You can choose any level of quizzes</li>
			</ol>

		</div>
	)

}