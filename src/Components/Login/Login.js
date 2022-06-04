import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../Slices/userSlice'
//import loginImg from 
//import axios from 'axios';


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(state => state.user)
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFormSubmit = (userCredentialsObj) => {
    console.log(userCredentialsObj)
    //http post req
    //based on userType
    if(userCredentialsObj.userType==='user'){
    dispatch(userLogin(userCredentialsObj))
    }
    if(userCredentialsObj.userType==='admin'){
      alert("......");
    }
    
  }
  //This is to be executed when either isSuccess / isError changed.
  useEffect(() => {
    if (isSuccess) {
      navigate('/userdashboard')
    }
   if(isError){
      alert("Invalid Password/Username")
    }
  }, [isSuccess, isError]);
  return (
    <div className="container">
      <p className="display-2 text-center text-primary">Login</p>
      {/* //<img src={loginImg} width="300px" className="d-sm-block d-none mx-auto" alt="" /> */}
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Select type of User</Form.Label> <br />
          {/* user type */}
          <Form.Check inline type="radio" id="user">
            <Form.Check.Input
              type="radio"
              value="user"
              {...register("userType", { required: true })}
            />
            <Form.Check.Label>User</Form.Check.Label>
          </Form.Check>
          <Form.Check inline type="radio" id="admin">
            <Form.Check.Input
              type="radio"
              value="admin"
              {...register("userType", { required: true })}
            />
            <Form.Check.Label>Admin</Form.Check.Label>
          </Form.Check>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" {...register("username", { required: true })} />
          {errors.username && <p className="text-danger">Username is required</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" {...register("password", { required: true })} />
          {errors.password && <p className="text-danger">Password is required</p>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Login<MdLogin />
        </Button>
      </Form>
    </div>

  )
}

export default Login