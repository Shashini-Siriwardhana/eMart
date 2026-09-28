import { Box, TextField, Alert, Button, Typography } from "@mui/material"
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react"
import { loginUser } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface LoginFormProps {
    setTabIndex: React.Dispatch<React.SetStateAction<number>>
}

export const LoginForm = ({setTabIndex} : LoginFormProps) => {
    const [loading, setLoading] = useState(false);
    const [error] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (event: React.SyntheticEvent) => {
            event.preventDefault(); // Prevent page reload
            try {
                setLoading(true);
                const response = await loginUser(email, password);
                login(
                    response.accessToken,
                    response.refreshToken
                )
                
                navigate("/products")
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

    const handleFieldChange = (event: { target: { name?: string; value: any } }) => {
        const { name, value } = event.target;
        if (name == 'email') {
            // ... spread operator (copies all existing key value pairs from old state into the new object)
            setEmail(value );
        } else if (name == 'password') {
            setPassword(value);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                label="Email Address"
                type="email"
                name="email"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={handleFieldChange}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={handleFieldChange}
            />
            <Typography sx={{color: 'LinkText'}} onClick={() => setTabIndex(1)}>
            Don't have an account yet? Register
            </Typography>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={<LockOutlined />}
                sx={{ mt: 3, mb: 2, py: 1.5, textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
        </Box>
    )
}