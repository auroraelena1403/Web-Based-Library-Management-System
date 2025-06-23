import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user:null
    },
    reducers: {
      setUserDetails :(state,action)=>{
        // console.log(action.payload); OK
        state.user=action.payload;
      }
    }
  })

  export const {setUserDetails}=userSlice.actions
  export default userSlice.reducer