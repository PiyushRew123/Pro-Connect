import  { createSlice } from "@reduxjs/toolkit"
import { AcceptConnection, getAboutUser, getAllUsers, getConnectionRequest, getMyConnectionRequests, loginUser,registerUser } from "../../action/authAction"

const initialState = {
    user:undefined,
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    isTokenThere:false,
    profileFetched:false,
    connection:[],
    connectionRequest:[],
    all_users:[],
    all_profiles_fetched:false
}

 const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLoginUser:(state)=>{
            state.message="hello"
        },
        emptyMessage:(state)=>{
            state.message="";
        },
        setTokenIsThere:(state)=>{
            state.isTokenThere=true;
        },
        setTokenIsNotThere:(state)=>{
            state.isTokenThere=false;
        }
    },
    extraReducers:(builder)=>{  
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Knocking the door";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.loggedIn=true;
            state.isError=false;
            state.message="Login Successful";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.loggedIn = false;
          
            state.message = action.payload?.message || "Login failed";
          })
          
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Registering You....";
        
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.isError=false;
        // state.loggedIn=true;
        state.message="Registration Successful,Please Login";
    })
    
    
    .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Registration failed";
      })
      .addCase(getAboutUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.profileFetched=true;
        state.user=action.payload.user;
        state.profile = action.payload.profile;
        
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.all_profiles_fetched=true;
        state.all_users=action.payload.profiles;
      })
      .addCase(getConnectionRequest.fulfilled,(state,action)=>{
        state.connection=action.payload
      })
      .addCase(getConnectionRequest.rejected,(state,action)=>{
        state.message=action.payload
      })
      .addCase(getMyConnectionRequests.fulfilled,(state,action)=>{
        state.connectionRequest=action.payload
      })
      .addCase(getMyConnectionRequests.rejected,(state,action)=>{
        state.message=action.payload
      })
      .addCase(AcceptConnection.fulfilled,(state)=>{
        state.message = "Connection updated";
      })
      
    
}
})

export const {reset,emptyMessage,setTokenIsThere,setTokenIsNotThere}=authSlice.actions;

export default authSlice.reducer;