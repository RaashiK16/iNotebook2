import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = (props) => {
    let visible = true;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MzIwYjQ5MmIxNTYwN2YyMWNmYmE2In0sImlhdCI6MTcwNDE0NDA3MX0.KQwVOf8asr1tymnDQEpzZWjZ5CszuMxf3QaJ04U-2f0'

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", 'success');
            visible = false;
            history("/");


        }
        else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ padding: "20px", borderRadius: "10px" }} className='row align-items-center'>
            <div className='col-6' style={{marginTop:"80px"}}>
                <h1 style={{ marginTop: "15px", marginBottom: "80px", color: "white" }}>Welcome to iNotebook!</h1>
                <h1 style={{ marginTop: "15px", color: "white" }}>Your notebook</h1>
                <h1 style={{  color: "white" }}>on the cloud.</h1>
            </div>
            <div className="col-6" style={{border:"1px solid white",marginTop:"150px",padding:"20px",borderRadius:"10px"}}>
                <h3 style={{ color: "white" }}>Login to write notes!</h3>
                <h4 style={{ marginBottom: "40px", color: "white" }}>Do not have an account? <Link to="/signup">Sign Up</Link></h4>
                <form hidden={!visible} onSubmit={handleSubmit} style={{ color: "white" }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={handleChange} value={credentials.email} type="email" className="form-control " id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" style={{ color: "white" }} className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={handleChange} value={credentials.password} type="password" className="form-control " id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-light" style={{ marginTop: "20px" }}>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login
