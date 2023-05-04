import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../api/agent";


const signInUser = createAsyncThunk('accunt/signInUser', async (data, thunkAPI) =>{
    try {
        const user = await agent.Account.login(data);
        localStorage.setItem('user',JSON.stringify(user));
        let claims = JSON.parse(atob(user.token.split('.')[1]));
        return user
    } catch (error) {
        return thunkAPI.rejectWithValue({error: error.data});
    }
});

export {signInUser};