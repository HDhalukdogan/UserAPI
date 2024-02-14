import { User } from "next-auth";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from "@/app/actions/authActions";

interface AccountState {
    user: User | null;
    users: any;
}

const initialState: AccountState = {
    user: null,
    users: []
}

export const fetchUsersAsync = createAsyncThunk<[], void>(
    'account/fetchUsersAsync',
    async (_, thunkAPI) => {

        try {
            const response = await getAllUsers()
            return response.map((r: any) => ({ id: r.id, userName: r.userName }))
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)



export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchUsersAsync.pending, (state) => {
        })
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.users = action.payload
        });
        builder.addCase(fetchUsersAsync.rejected, (state, action) => {
        });
    })
})
export const { signOut, setUser } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;