import { IconButton, Avatar, Menu, MenuItem, Box, Typography, Divider } from "@mui/material"
import { LogoutOutlined, ReceiptLongOutlined, AccountCircle } from "@mui/icons-material"
import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogoutClick = () => {
        logout();
        navigate('/auth');

    }

    return (
        <>
            {/* User Avatar Button */}
            <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38, fontWeight: 'bold' }}>
                    S
                    {/* <AccountCircle/> */}
                </Avatar>
            </IconButton>

            {/* Profile Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 2,
                    sx: { mt: 1.5, minWidth: 220, borderRadius: 2, border: '1px solid', borderColor: 'divider' }
                    }
                }}
            >
                {/* User Info Header */}
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{fontWeight: "bold"}}>user.name</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                        user.email
                    </Typography>
                </Box>

                <Divider />

                {/* Logout Action */}
                <MenuItem  sx={{ py: 1.2, color: 'error.main' }} onClick={handleLogoutClick}>
                    <LogoutOutlined fontSize="small" sx={{ mr: 1.5 }} /> Logout
                </MenuItem>
            </Menu>
        </>
    )
}