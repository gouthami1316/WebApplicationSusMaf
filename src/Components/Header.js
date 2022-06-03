import { FaAdn } from "react-icons/fa";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { clearLoginStatus } from '../Slices/userSlice'
import Userdashboard from "../Components/userdashboard/Userdashboard"
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Contactus from "./Contactus"
import Userprofile from "./user-profile/Userprofile";
import MyList from "./mylist/mylist";
import Content  from "./view-content/ViewContent";
import React from 'react'



function Header() {
  //get state from store
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  //get dispathc function
  let dispath = useDispatch()
  //get navigate function
  let navigate = useNavigate()
  //logout user
  const userLogout = () => {
    localStorage.clear()
    dispath(clearLoginStatus())
    navigate('/login')
  }
  return (
    <div>

      <Navbar collapseOnSelect bg="dark" expand="sm lg md xl xxl">
        <Container>
          <Navbar.Brand href="#home" className="text-white">WebsiteName</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="ms-auto">
              {isSuccess !== true ? (
                <>

                  <Nav.Item>
                    <NavLink className="nav-link text-white" to="/">
                      Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink className="nav-link text-white" to="/signup">
                      SignUp
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink className="nav-link text-white" to="/login">
                      Login
                    </NavLink>
                  </Nav.Item>

                  <NavLink className="nav-link text-white" to="/contactus">
                    ContactUs
                  </NavLink>

                </>
              ) : (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <div className="text-white">
                    <NavDropdown className="text-white" title={<span className="text-white my-auto">{userObj.username} </span>} id="collasible-nav-dropdown">
                      <NavDropdown.Item>
                        Change password
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={userLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>

                </>
              )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/userdashboard" element={<Userdashboard />} >
          <Route path="mylist" element={<MyList/>} />
          <Route path="content" element={<Content />} />
          <Route path="profile" element={<Userprofile />} />
          {/* Navigating into profile when child path is empty */}
          <Route path="" element={<Navigate to="profile" replace={true} />} />
        </Route>
      </Routes>

    </div>
  )
}

export default Header