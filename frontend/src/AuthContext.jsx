import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [quoteId, setQuoteId] = useState(null);
    const [clientId, setClientId] = useState(null);
    
    return (
        <AuthContext.Provider value={{ quoteId, setQuoteId, clientId, setClientId }}>
            {children}
        </AuthContext.Provider>
    );
};