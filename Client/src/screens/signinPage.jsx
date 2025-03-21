import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Signin.css'
const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3001/api/child/signin",
      formData,
      { withCredentials: true }
    );
    
    console.log("Response data: ", response.data); // Debugging line

    setMessage(response.data.message); // This assumes message exists in the response

    // Redirect to profile with child data
    navigate("../MainPage", { state: { child: response.data.child } });
  } catch (error) {
    if (error.response) {
      console.error("Error response: ", error.response); // Debugging line
      setMessage(error.response.data.message || "An error occurred.");
    } else {
      setMessage("Network error or server is down.");
    }
  }
};
 return (
  //   <div className="signin-page">
  //   <div className="container mt-5" >
  //   <div className="row justify-content-center" >
  //     <div className="col-md-6">
  //       <div className="card shadow">
  //         <div className="text-center bg-white">
           
  //         </div>
  //         <div className="card-body" >
  //           <h1 className="text-center mb-4" style={{fontSize:'40px', fontWeight:'800'}}>Sign In</h1>
  //           <form onSubmit={handleSubmit} style={{fontSize:'25px', fontWeight:'700'}}>
  //             <div className="mb-3">
  //               <label htmlFor="name" className="form-label">
  //                 Child's Name
  //               </label>
  //               <input
  //                 type="text"
  //                 id="name"
  //                 name="name"
  //                 className="form-control"
  //                 placeholder="Enter your name"
  //                 value={formData.name}
  //                 onChange={handleChange}
  //                 required
  //                 style={{fontSize:'18px'}}
  //               />
  //             </div>
             
  //             <div className="mb-3">
  //               <label htmlFor="password" className="form-label">
  //                 Password
  //               </label>
  //               <input
  //                 type="password"
  //                 id="password"
  //                 name="password"
  //                 className="form-control"
  //                 placeholder="Enter your password"
  //                 value={formData.password}
  //                 onChange={handleChange}
  //                 required
  //                 style={{fontSize:'18px'}}
  //               />
  //             </div>
  //             <br></br>
  //             <button type="submit" className="btn w-100" style={{fontSize:'25px', backgroundColor:'#4083A8', color:'white',height:'50px'}}>
  //               Sign In
  //             </button>
  //           </form>
  //           {message && <p className="text-success text-center mt-3">{message}</p>}
  //           <div className="text-center mt-3">
                // <p style={{ fontSize: "18px" }}>
                //   Don't have an account?{" "}
                //   <Link to="/SignUp" style={{ color: "#4083A8", fontWeight: "700" }}>
                //     Sign Up
                //   </Link>
                // </p>
  //             </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // </div>
////////////////////////////////////////////////////////////////
  <div className="signin-page" style={{ backgroundImage: "url('./images/s1.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh",opacity:'0.95' }}>
    <div className="row shadow-lg" style={{ background: "white", borderRadius: "30px", overflow: "hidden", maxWidth: "1000px", width: "100%" }}>
      {/* Left Section */}
      <div className="col-md-6 p-5" >
        <h1 className="mb-4" style={{ fontSize: "50px", fontWeight: "800" }}> Welcome Back to EnligthenDS</h1>
        <p style={{ fontSize: "15px" ,color:'black',fontWeight:'400'}}>
            You've been missed!! Please enter your credentials to login   
          </p><br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label" style={{ fontSize: "24px", fontWeight: "600" }}>Child's Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ fontSize: "16px" }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label" style={{ fontSize: "24px", fontWeight: "600" }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ fontSize: "16px",marginBottom:'30px' }}
            />
          </div>
          <button type="submit" className="btn w-100" style={{ fontSize: "24px", backgroundColor: "#4083A8", color: "white", height: "1%", fontWeight: "700" }}>
            Sign In
          </button>
        
        </form>
        <div className=" mt-4">
          <p style={{ fontSize: "16px" ,color:'black'}}>
            Don't have an account?{" "}
            <Link to="/SignUp" style={{ color: "#4083A8", fontWeight: "700" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="col-md-6 bg-light position-relative">
        <img src="./images/Welcome.gif" alt="Illustration" className="img-fluid" style={{ width: "100%", height: "100%" }} />
        
      </div>
    </div>
  </div>
</div>

  );
};

export default SignIn;