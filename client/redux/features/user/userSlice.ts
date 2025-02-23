import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  avatar?: { url: string };
  role?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    setImage:(state,action: PayloadAction<User | null>)=>{
      state.user=action.payload
    },
    setUpdateImage:(state, action: PayloadAction<string>)=>{
      if(state.user){

        if(state.user.avatar){
          state.user.avatar.url = action.payload
        }
      }
    },
    setUpdateRole:(state,action:PayloadAction<string>)=>{
      if(state.user){
        if(state.user.role){
          state.user.role = action.payload
        }
      }
    }
  },
});

export const { setUser, updateUserName , setUpdateImage,setUpdateRole} = userSlice.actions;
export default userSlice.reducer;
