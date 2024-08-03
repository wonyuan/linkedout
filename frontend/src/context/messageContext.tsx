import React, { createContext, useContext, useState, ReactNode } from 'react';

//messages context
const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

interface MessagesContextType {
    messages: { content: string }[];
    addMessage: (content: string) => void;
}

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<{ content: string }[]>([]); 

    const addMessage = (content: string) => {
        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, { content }];
            console.log("Updated Saved Messages:", updatedMessages); 
            return updatedMessages;
        });
    };

    return (
        <MessagesContext.Provider value={{ messages, addMessage }}>
            {children}
        </MessagesContext.Provider>
    );
};

// use hook context
export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error("error");
    }
    return context;
};
