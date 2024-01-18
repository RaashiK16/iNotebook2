import React, { useState } from 'react'
import { useNavigate } from 'react-router';



const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfpassword: "" });
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MzIwYjQ5MmIxNTYwN2YyMWNmYmE2In0sImlhdCI6MTcwNDE0NDA3MX0.KQwVOf8asr1tymnDQEpzZWjZ5CszuMxf3QaJ04U-2f0'

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account Created Successfully", 'success');
        }
        else {
            props.showAlert("Invalid credentials", 'danger')
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container row align-items-center'>
            <div className='col-6'>
                <h1 style={{ marginTop: "15px", marginBottom: "80px", color: "white" }}>Welcome to iNotebook!</h1>
                <h1 style={{ marginTop: "15px", color: "white" }}>Your notebook</h1>
                <h1 style={{ color: "white" }}>on the cloud.</h1>
            </div>
            <div className="col-6" style={{border:"1px solid white",padding:"20px",borderRadius:"10px",marginTop:"150px"}}>
                <h2 style={{marginBottom:"40px"}}>Enter your details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={handleChange} id="name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={handleChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{color:"white"}}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="password" name="password" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="cnfpassword" name="cnfpassword" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-light">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Signup
