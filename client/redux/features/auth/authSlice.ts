import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "inspector/promises";

const initialState: {
    token: string;
    user: string;
    sessions: Session[]; 
    role:string
  } = {
    token: "",
    user: "",
    sessions: [],
    role:''
  };

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state, action:PayloadAction<{token:string}>) => {
            state.token = action.payload.token;
        },
        userLoggedIn : (state, action:PayloadAction<{accesstoken:string, user:string}>) => {
            state.token = action.payload.accesstoken;
            state.user = action.payload.user;
        },
        userLoggedOut : (state) => {
            state.token = "";
            state.user = "";
        },
        userSessions : (state,action)=>{
            state.sessions = action.payload
        },
        
    }
})

export const {userRegistration, userLoggedIn, userLoggedOut,userSessions} = authSlice.actions;

export default authSlice.reducer;