import { configureStore } from '@reduxjs/toolkit';
import { accountReducer, setUser, signOut } from './slices/accountSlice';
import { customizationReducer, menuOpen, menuToggle, storeBorderRadius, storeFontFamily, setMenu } from './slices/customizationSlice';


const store = configureStore({
    reducer: {
        customization: customizationReducer,
        account: accountReducer
    }
});
const persister = '';

export { store, setMenu, menuToggle, menuOpen, storeFontFamily, storeBorderRadius, persister, signOut, setUser }

export * from './thunks/signInUser';