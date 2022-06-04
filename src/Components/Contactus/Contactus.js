import React from 'react'
//import React from 'react'
import "./second.css"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ChatIcon from '@mui/icons-material/Chat';
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
function ContactUs() {
  return (
    <div className="second">
        <img className='img' alt=""  src="https://media.istockphoto.com/photos/lake-in-the-shape-of-the-worlds-continents-in-the-middle-of-untouched-picture-id1342229191?b=1&k=20&m=1342229191&s=170667a&w=0&h=swcdZlnGAdTuLsuYgPgVmpEVmFmKpgrSCnqWsc5l6vI="/>
        <div className="main">
        <div className="post">
          <div className='desc'>
            <img className="avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt=""/>
            <input type="text" name="say something" placeholder='Say Something'/>
          </div>
          <div>  
            <CameraAltIcon className="icon"/>
            <MissedVideoCallIcon className="icon"/>
          </div>
        </div>
        <div className="side">
          <div className="about">
            <h4>About</h4>
            <p>Contain details about the user like the name achivement</p>
          </div>
          <div className="connection">
            <h4>Add Asker</h4>
            <div className='link'>
            <p>Priyanshi Sharamd</p>
            <span>+ Link</span>
            </div>
            <div className='link'>
            <p>Priyanshi Sharamd</p>
            <span>+ Link</span>
            </div>
            <div className='link'>
            <p>Priyanshi Sharamd</p>
            <span>+ Link</span>
            </div>
            <div className='link'>
            <p>Priyanshi Sharamd</p>
            <span>+ Link</span>
            </div>
          </div>
          <div className="chaticon">
            <ChatIcon/>
          </div>
        </div>
        </div>
        

    </div>
  )
}

export default ContactUs
