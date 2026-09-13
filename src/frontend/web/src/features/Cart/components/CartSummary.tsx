import { Paper, Typography, Divider, Box, Button } from "@mui/material"
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import type { Cart } from "../types/Cart";

interface CartSummaryProps {
    cart: Cart | null;
}

export const CartSummary = ({cart}: CartSummaryProps) => {
    const navigate = useNavigate();

    return (
        <Paper 
            elevation={0} 
            variant="outlined"
            sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2, 
                borderColor: 'divider',
                bgcolor: 'background.paper' 
            }}
            >
            <Typography variant="h6" sx={{fontWeight: "bold"}} gutterBottom>
                Order Summary
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                Items (totalItems)
                </Typography>
                <Typography variant="body2" sx={{fontWeight: "medium"}}>
                ${cart?.subtotal.toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                Shipping
                </Typography>
                <Typography variant="body2" color="success.main" sx={{fontWeight: "medium"}}>
                {cart?.shippingCost == 0 ? "Free" : `$${cart?.shippingCost}`}
                </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
                Subtotal
                </Typography>
                <Typography variant="h6" sx={{fontWeight: "bold"}} color="primary.main">
                ${cart?.totalCost.toFixed(2)}
                </Typography>
            </Box>
            <Divider sx={{ mb: 6 }} />
            {/* Action Buttons Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="small"
                    onClick={() => navigate('/products')}
                    sx={{ textTransform: 'none', fontWeight: 'medium' }}
                    >
                    Continue Shopping
                </Button>

                <Button 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/checkout')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                    Proceed to Checkout
                </Button>
            </Box>
        </Paper>
    )
}