### EnlightenDS: Advanced Technologies for Skill Enhancement and Talent Recognition in Children with Down Syndrome 

###  Team Members
**Group Leader** : IT21296314- Kumarasinghe D.P.

**Member 1**: IT21292972- Methsahani K.K.S.P.

**Member 2**: IT21293030- Jayasuriya S.H.

**Member 3**: IT21342394- Semini B.V.S.

###  Overview
EnlightenDS is an adaptive educational platform tailored to support children with Down syndrome aged 5–15. Leveraging technologies like machine learning, gamification, and interactive tools, the system focuses on early detection, cognitive assessment, and skill development. It enhances pronunciation, mathematical abilities and artistic talents through personalized interventions, empowering children to reach their full potential while offering valuable insights to parents and educators.

###  Problem Statement
In Sri Lanka, children with Down syndrome often face significant developmental and educational challenges due to insufficient early detection and tailored intervention systems. This lack of personalized support hinders their cognitive, linguistic, mathematical, and artistic development, limiting their potential and impacting their ability to thrive in academic and social environments.

###  Objectives
Our primary objective is to develop a comprehensive system that fosters the detection and holistic development of children with Down syndrome aged 5–15 through personalized and adaptive educational interventions.

### Specific Objectives:
•	Early Detection: Design an efficient system to identify Down syndrome in children at early stages for timely intervention.

•	Pronunciation Enhancement: Implement innovative techniques to improve speech clarity and communication skills.

•	Mathematical Skill Development: Create adaptive learning modules to enhance foundational and advanced numeracy skills.

•	Artistic Talent Recognition: Develop tools to discover, nurture, and celebrate artistic abilities such as painting and music.

•	Parental and Educator Support: Provide actionable insights and guidance to parents and educators to support the child’s learning journey.

## System Overview Diagram

![Overall System Diagram](https://github.com/user-attachments/assets/85c0aefb-f109-429d-856f-882c7eb38efe)

### Key Features

###  Assessing the detection of down syndrome (IT21296314- Kumarasinghe D.P.) 
This component focuses on leveraging advanced image analysis techniques to support the early detection and assessment of Down syndrome, as well as evaluating the cognitive level of children using standardized methods.
1.      Early Detection of downsydrome
        •Apply preprocessing techniques to enhance image quality and prepare the dataset for analysis.
        •Utilize Convolutional Neural Networks to extract key facial features associated with Down syndrome.
2.      Probability Prediction Using Labeled Data
        •Train the CNN using labeled data derived from facial symptoms to predict the probability of Down syndrome.
3.      Cognitive Level Assessment
        •Assess the cognitive level of children using the standardized score which is used by doctors.
4.      User-Friendly Feedback Platform
        •Develop a user friendly interface for uploading images and receiving diagnostic feedback, including cognitive insights.

####  Enhancing pronunciation skills in children with down syndrome (IT21293030- Jayasuriya S.H.) 
This project aims to support children with Down syndrome by providing innovative tools to improve their communication skills. 
1.	Pronunciation enhancement guided platform 
2.	Emotion Detection Platform

        •	To analyze children’s emotions during interactions. 
4.	Real-Time Feedback
   
        •	Provides real time feedback to children, enabling them to correct pronunciation mistakes on the spot. 
6.	Advanced Gamified Pronunciation Platform
   
        •	Engaging, game-based learning modules to make pronunciation practice enjoyable and effective. 
8.	Quiz Platform for Knowledge Assessment
   
        •	A dedicated quiz system to evaluate children’s learning progress and understanding.

###  Enhancing mathematical skills in children with Down Syndrome (IT21342394- Semini B.V.S.) 
1.	Design adaptive quizzes that adjust difficulty based on real-time performance
   
        •	Create 4 categories of question pools, 3 difficulty levels, each with 4 sub-levels. 
        •	The difficulty of the sub-level questions is adjust based on the child's performance
3.	Design quizzes for all levels 
4.	Integrate educational animations with step-by-step solutions
   
        •	Before beginning the question program, learners can benefit from pre-teaching sessions to build foundational knowledge.
        •	After completing each question, a step-by-step instructional program will be provided to reinforce understanding and ensure effective learning.
6.	Create a performance tracking module that logs progress and generates detailed reports
7.	Evaluate improvements in mathematical skills through post-system quizzes

###  Identify the interests and talents of children with down syndrome (IT21292972- Methsahani K.K.S.P) 
The major objective of this component is to identify the talented and interested area of down syndrome children by using recital, learning and painting categories
1.	Recital Skill Identification using an implemented piano (keyboard)
   
        •	To identify the recital skill couple of parameters used in this component. They are time period of users interacting with the piano category and sequence of playing keys.
3.	Learning Skill Measurement using AI generated quizzes
   
        •	Implemented 2 main subjects related to quizzes.
        •	Once the user submitted an answer, the correct answer will be displayed in the UI.
        •	Also, once the quiz is completed, the score of the quiz will be displayed.
        •	Retake option and the navigation to the main page option are available.
5.	Painting Skill Evaluation using a painting platform
6.	Analyze the collected data to identify the skill area with the highest engagement and proficiency for each child
7.	Highlighting their child’s strengths and potential areas for further development


###  Dependencies

### Frontend 
•	Framework: React.js 

•	Styling: CSS and Bootstrap 

•	Frontend Dependencies: animate.css, axios, bootstrap, react, react-dom, react-router-dom, react-scripts, web-vitals

### Backend 
•	Framework: Node.js, Python 

•	Backend Dependencies: bcrypt, cors, body-parser, dotenv, express, helmet, joi, jsonwebtoken, mongoose, morgan, multer, multer-gridfs-storage, nodemailer, python-shell, tesseract.js

### Machine Learning 
•	Framework: TensorFlow

•	Libraries: Scikit-learn, Pandas, NumPy, joblib, os, matplotlib

### Database 
•	Database: MongoDB 

•	Object Modeling Tool: Mongoose

### Other Tools 
•	Image Processing: OpenCV, NLP, CNN
•	Deployment: Docker 

