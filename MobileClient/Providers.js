import React from 'react'
import { Provider as AuthProvider } from './src/context/AuthContext';

export default function Providers({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
