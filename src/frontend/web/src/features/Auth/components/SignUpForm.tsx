import { Box, TextField, Button, Typography } from "@mui/material"
import { PersonAddOutlined } from "@mui/icons-material";
import { useState } from "react";

interface SignUpFormProps {
    setTabIndex: React.Dispatch<React.SetStateAction<number>>
}

export const SignUpForm = ({setTabIndex}: SignUpFormProps) => {
    const [loading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFieldChange = (event: { target: { name?: string; value: any } }) => {
        const { name, value } = event.target;
        if (name == 'fullName') {
            // ... spread operator (copies all existing key value pairs from old state into the new object)
            setName(value );
        }
        else if (name == 'email') {
            setEmail(value );
        } else if (name == 'password') {
            setPassword(value);
        } else if (name == 'confirmPassword') {
            setConfirmPassword(value);
            handlePasswordVerification();
        }
    }

    const handlePasswordVerification = () => {
        if (password !== confirmPassword) {
            setError("Password doesn't match");
        }
    }

    return (
        <Box component="form" sx={{ mt: 1 }}>
            <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                required
                margin="normal"
                value={name}
                onChange={handleFieldChange}
            />
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
                label="Create a new password"
                type="password"
                name="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={handleFieldChange}
            />
            <TextField
                label="Verify Password"
                type="password"
                name="confirmPassword"
                fullWidth
                required
                margin="normal"
                value={confirmPassword}
                onChange={handleFieldChange}
                error={error ? true : false}
            />
            <Typography sx={{color: 'LinkText'}} onClick={() => setTabIndex(1)}>
            Already have an account? Log in
            </Typography>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={<PersonAddOutlined  />}
                sx={{ mt: 3, mb: 2, py: 1.5, textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </Box>
    )
}