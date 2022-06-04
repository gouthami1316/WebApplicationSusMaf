import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//make http post req to login user
//using async and receives a thunk for that
export const userLogin=createAsyncThunk('loginuser',async(userCredentialsObj,thunkApi)=>{
   let response=await axios.post('/user-api/login',userCredentialsObj);
   console.log(response)
   let data=response.data;
   console.log(data);
   if(data.message==='Login success')
   {
        //storing token browser's memory(local/session : use setItem(key,value),getItem(key),removeItem(key),clear())
        localStorage.setItem("token",data.payload);
        return data.userObj

    }
   if(data.message==='Invalid Password' || data.message==="User doesn't exist")
   {
       return thunkApi.rejectWithValue(data)
      
   }
   
}) 





let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{clearLoginStatus:(state)=>{
        state.isSuccess=false;
        state.userObj=null;
        state.isError=false;
        state.errMsg='';
        return state;
    }},
    extraReducers:{
        //track lifecycle of promise return by createAsyncThunk function
        //state:current action:action to be applied on current state
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg=''
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.errMsg=action.payload.message;
        },
    }


})

//export action creators
export const {clearLoginStatus}=userSlice.actions;


//export reducer
export default userSlice.reducer