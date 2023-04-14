import { configureStore } from '@reduxjs/toolkit';
import { customizationReducer, menuOpen, menuToggle, storeBorderRadius, storeFontFamily, setMenu } from './slices/customizationSlice';


const store = configureStore({
    reducer: {
        customization: customizationReducer
    }
});
const persister = '';
export { store, setMenu, menuToggle, menuOpen, storeFontFamily, storeBorderRadius, persister }