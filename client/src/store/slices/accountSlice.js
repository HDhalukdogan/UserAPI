import { createSlice } from "@reduxjs/toolkit";
import { signInUser } from "store/thunks/signInUser";

const accountSlice = createSlice({
    name:'account',
    initialState:{
        user:null
    },
    reducers:{
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }
    },
    extraReducers(builder) {
        builder.addCase(signInUser.pending, (state, action) => {
          });
          builder.addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload
          });
          builder.addCase(signInUser.rejected, (state, action) => {
            
          });
    }
});


export const {signOut, setUser} = accountSlice.actions;
export const accountReducer= accountSlice.reducer;