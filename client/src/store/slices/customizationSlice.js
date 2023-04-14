import config from '../../config';
import { createSlice } from '@reduxjs/toolkit';


const customizationSlice = createSlice({
    name: 'customization',
    initialState:{
        isOpen: [], // for active default menu
        defaultId: 'default',
        fontFamily: config.fontFamily,
        borderRadius: config.borderRadius,
        opened: true
    },
    reducers:{
        setMenu(state,action) {
            state.opened = action.payload
        },
        menuToggle(state,action) {
            state.opened=action.payload
        },
        menuOpen(state,action) {
            state.isOpen = [action.payload]
        },
        storeFontFamily(state,action) {
            state.fontFamily = action.payload
        },
        storeBorderRadius(state,action) {
            state.borderRadius = action.payload
        }
    }
});

export const {setMenu,menuToggle,menuOpen,storeFontFamily,storeBorderRadius} = customizationSlice.actions;
export const customizationReducer = customizationSlice.reducer;