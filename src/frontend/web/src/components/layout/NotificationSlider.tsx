import { Alert, Snackbar } from "@mui/material"
import { createContext, useContext, useState, type ReactNode } from "react"

type SeverityType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
    showNotification: (message: string, severity?: SeverityType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationSlider = ({children}: {children: ReactNode}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<SeverityType>('info');

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const showNotification = (message: string, type: SeverityType = 'info') => {
        setMessage(message);
        setSeverity(type);
        setOpen(true);
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {/* Global Floating Snackbar positioned at Top Right */}
            <Snackbar 
                open={open} 
                autoHideDuration={4000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ mt: 8 }} // Clears the navbar
            >
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%', boxShadow: 3 }}>
                {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}

// Custom hook for consumption across components
export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context;
}