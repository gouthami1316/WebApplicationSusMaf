import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {userLogin} from '../Slices/userSlice'
//import axios from 'axios';


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
  let dispatch=useDispatch();
  let  navigate=useNavigate();
  const onFormSubmit = (userCredentialsObj) => {
    //http post req
    dispatch(userLogin(userCredentialsObj))
    // console.log(userCredentialsObj)
  }
  useEffect(()=>{
    if(isSuccess)
    {
        navigate('/userdashboard')
    }
  },[isSuccess,isError]);
  return (
    <div className="container">
      <p className="display-2 text-center text-primary">Login</p>
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
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