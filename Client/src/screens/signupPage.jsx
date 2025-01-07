import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
  
    password: "",
    parentEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/child/signup", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (

// <div className="signin-page">
//     <div className="container mt-5">
//   <div className="row justify-content-center" style={{ marginTop: '80px',marginBottom:'50px' }}>
//     <div className="col-md-6">
//       <div className="card shadow">
//         <div className="card-header text-center bg-white">
          
//         </div>
//         <div className="card-body">
//           <h1 className="text-center mb-4" style={{ fontSize: '40px', fontWeight: '800' }}>
//             Sign Up
//           </h1>
//           <form onSubmit={handleSubmit} style={{ fontSize: '25px', fontWeight: '700' }}>
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
//                 style={{ fontSize: '18px' }}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="gender" className="form-label">
//                 Gender
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 className="form-control"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 style={{ fontSize: '18px' }}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label htmlFor="age" className="form-label">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 className="form-control"
//                 placeholder="Enter age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 style={{ fontSize: '18px' }}
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
//                 style={{ fontSize: '18px' }}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="parentEmail" className="form-label">
//                 Parent Email
//               </label>
//               <input
//                 type="email"
//                 id="parentEmail"
//                 name="parentEmail"
//                 className="form-control"
//                 placeholder="Enter parent email"
//                 value={formData.parentEmail}
//                 onChange={handleChange}
//                 required
//                 style={{ fontSize: '18px' }}
//               />
//             </div>
// <br></br>
//             <button
//               type="submit"
//               className="btn w-100"
//               style={{ fontSize: '25px', backgroundColor: '#4083A8', color: 'white', height: '50px' }}
//             >
//               Sign Up
//             </button>
//           </form>
//           {message && <p className="text-success text-center mt-3">{message}</p>}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>

<div className="signin-page" style={{ backgroundImage: "url('./images/s2.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <div className="row shadow-lg" style={{ background: "white", borderRadius: "10px", overflow: "hidden", maxWidth: "1200px", width: "100%" }}>
      {/* Left Section */}
      <div className="col-md-6 p-5">
        <h1 className="mb-4" style={{ fontSize: "44px", fontWeight: "800" }}>Welcome to EnlightenDS</h1>
       
        <form onSubmit={handleSubmit} style={{ fontSize: '20px', fontWeight: '700' }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ fontSize: "20px", fontWeight: "600" }}>Child's Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label" style={{ fontSize: "20px", fontWeight: "600" }}>Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label" style={{ fontSize: "20px", fontWeight: "600" }}>Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="parentEmail" className="form-label" style={{ fontSize: "20px", fontWeight: "600" }}>Parent Email</label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              className="form-control"
              placeholder="Enter parent email"
              value={formData.parentEmail}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label" style={{ fontSize: "20px", fontWeight: "600" }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ fontSize: "14px" }}
            />
          </div>
          
          <button
            type="submit"
            className="btn w-100"
            style={{ fontSize: "20px", backgroundColor: "#4083A8", color: "white", fontWeight: "700" }}
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-success text-center mt-3">{message}</p>}
      </div>

      {/* Right Section */}
      <div className="col-md-6 bg-light position-relative">
        <img src="/path-to-image.jpg" alt="Illustration" className="img-fluid" style={{ width: "100%", height: "100%" }} />
        <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ color: "white" }}>
          <h3 style={{ fontWeight: "700" }}>Children Law Kuwait</h3>
          <p style={{ fontWeight: "500", fontSize: "16px" }}>We care for your child</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default SignUp;