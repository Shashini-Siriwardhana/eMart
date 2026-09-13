import { Container, Box, Typography, Paper, Tabs, Tab } from "@mui/material"
import { LoginForm } from "../components/LoginForm"
import { SignUpForm } from "../components/SignUpForm"
import { StorefrontOutlined } from "@mui/icons-material"
import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"

export const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper 
                elevation={0} 
                variant="outlined" 
                sx={{ p: {xs: 3, sm: 5}, borderRadius: 3, borderColor: 'divider', textAlign: 'center' }}
            >
                {/* Branding Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
                <StorefrontOutlined color="primary" fontSize="large" />
                <Typography variant="h4" sx={{fontWeight: "bold"}}>eMart</Typography>
                </Box>

                {/* Tab Toggle for Sign In / Register */}
                <Tabs 
                value={tabIndex} 
                variant="fullWidth" 
                sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
                >
                <Tab label="Sign In" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => setTabIndex(0)}/>
                <Tab label="Register" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => setTabIndex(1)} />
                </Tabs>

                {/* Conditional Form Render */}
                {tabIndex === 0 ? <LoginForm setTabIndex={setTabIndex} /> : <SignUpForm setTabIndex={setTabIndex} />}
            </Paper>
        </Container>
    )
}