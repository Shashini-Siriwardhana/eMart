import { Paper, Typography, Divider, Box, Button } from "@mui/material"
import { Lock } from "@mui/icons-material";
import { useState } from "react"
import { useCart } from "../../../context/CartContext";

interface CheckoutSummaryProps {
    paymentMethod: string;
}

export const CheckoutSummary = ({paymentMethod}: CheckoutSummaryProps) => {
    const {cart} = useCart();
    const [loading] = useState(false);
    // const [order, setOrder] = useState<Order|null>(null);
    // const paymentMethod = 'CashOnDelivery';

    // useEffect(() => {
    //     const createOrder = async() => {
    //         try {
    //             setLoading(true);
    //             const data = await getCart();
    //             setOrder(data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     createOrder();
    // }, [])

    return (
        <Paper 
            elevation={0} 
            variant="outlined" 
            sx={{ p: 3, borderRadius: 2, borderColor: 'divider', position: 'sticky', top: 24 }}
            >
            <Typography variant="h6" sx={{fontWeight: "bold"}} gutterBottom>
                Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {cart?.cartItems.map(item => 
                    <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '200px' }}>
                        {`${item.productName} x ${item.quantity}`}
                        </Typography>
                        <Typography variant="body2" sx={{fontWeight: "medium"}}>
                        {item.subtotal.toFixed(2)}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2" sx={{fontWeight: "medium"}}>{cart?.totalCost.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Shipping</Typography>
                <Typography variant="body2" color="success.main" sx={{fontWeight: "medium"}}>Free</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Total Amount</Typography>
                <Typography variant="h5" sx={{fontWeight: "bold"}} color="primary.main">
                $ {cart?.totalCost.toFixed(2)}
                </Typography>
            </Box>

            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                startIcon={<Lock />}
                disabled={loading}
                sx={{ 
                py: 1.5, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                fontSize: '1rem',
                borderRadius: 2 
                }}
            >
                {loading ? 'Processing Order...' : paymentMethod === 'CashOnDelivery' ? 'Place Order (COD)' : `Proceed Payment $${cart.totalCost.toFixed(2)}`}
            </Button>
        </Paper>
    )
}