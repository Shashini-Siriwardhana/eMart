import { StorefrontOutlined } from "@mui/icons-material"
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Badge } from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserMenu } from "./UserMenu";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const NavBar = () => {
    const navigate = useNavigate();
    const {cart} = useCart();

    const cartCount = cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                
                {/* Left: Brand Logo & Title */}
                <Box 
                component={RouterLink} 
                to="/" 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit' }}
                >
                <StorefrontOutlined color="primary" fontSize="large" />
                <Typography variant="h6" sx={{ fontWeight:"bold", letterSpacing: 0.5 }}>
                    eMart
                </Typography>
                </Box>

                {/* Right: Navigation Links & Cart Icon */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button component={RouterLink} to="/products" color="inherit" sx={{ fontWeight: 600 }}>
                        Catalog
                    </Button>
                    <Button component={RouterLink} to="/orders" color="inherit" sx={{ fontWeight: 600 }}>
                        Orders
                    </Button>
                    <IconButton color="primary" aria-label="cart" sx={{ ml: 1 }} onClick={() => navigate("/cart")}>
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <UserMenu />
                </Box>

            </Toolbar>
        </AppBar>
    )
}