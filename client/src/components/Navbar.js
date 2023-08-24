import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App';
import { useGetUserID } from '../hooks/useGetUserID';

const Navbar = () => {
    const navigate = useNavigate();
    const userID = useGetUserID("userId")

    
    const Logout = () =>{
        window.localStorage.removeItem('userId')
        navigate("/auth")
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bgColor">
        <div className="container-fluid">
            <a className="navbar-brand text-light" href="#">RECIPE-APP</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link text-light" href="#">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/create-recipe "} className="nav-link text-light" href="#">Create Recipe</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/save-recipe"} className="nav-link text-light" href="#">Save Recipe</Link>
                </li>
                {!userID ?
                <li className="nav-item">
                    <Link to={"/auth"} className="nav-link text-light" href="#">Login/Registration</Link>
                </li>
                :
                <button className="btn btn-primary" onClick={Logout}>Log Out</button>
                }
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar