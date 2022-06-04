import React from 'react'
import { useSelector } from 'react-redux'
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import "../style.css"
function Userdashboard() {

  let { userObj } = useSelector(state => state.user)
  return (
    <>
      <img src={userObj.profileImg} className='float-end m-5 profile-pic' alt="" />
      <> 
         <Nav className="justify-content-center mt-3" defaultActiveKey="/profile"> 
          <Nav.Item>
            <Nav.Link to="profile" as={NavLink}>
              User Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="Leaderboard" as={NavLink}>
            Leaderboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="content" as={NavLink}>
              Content
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="mt-3">
          <Outlet />
        </div>
       
      </>
    </>
  )
}

export default Userdashboard