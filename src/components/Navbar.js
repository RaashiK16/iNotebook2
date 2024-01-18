import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    const history=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history("/login");
    }

    return (
        <div><nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"#323232",color:"white",margin:"20px",borderRadius:"8px"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><strong>iNotebook</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn  mx-2" role="button" to="/login" style={{backgroundColor:"#323232",color:"white"}}>Login</Link>
                        <Link className="btn " role="button" to="/signup" style={{backgroundColor:"#323232",color:"white"}}>Sign Up</Link>
                        
                    </form>: <Link onClick={handleLogout} className="btn btn-dark mx-2" role="button" to="/login" style={{backgroundColor:"#323232"}}>Logout</Link>}
                </div>
            </div>
        </nav>
        </div>
    )
}

export default Navbar
