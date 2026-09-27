import { useEffect, useState } from "react"
import { CartItemCard } from "../components/CartItemCard"
import { CartSummary } from "../components/CartSummary"
import { Container, Typography, Box, Grid } from "@mui/material"
import { getCart, removeItem, updateCart } from "../api/CartApi"
import { useNotification } from "../../../components/layout/NotificationSlider"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../../context/CartContext"

export const CartPage = () => {
    const {cart, setCart} = useCart();
    const [, setLoading] = useState(false);
    const {showNotification} = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async() => {
            try {
                setLoading(true);
                const data = await getCart();
                setCart(data);
            } catch (error) {
                showNotification('Cart cannot be loaded.');
                console.log(error);
            } finally {
                setLoading(false);
            }           
        }
        fetchCart();
    }, [])

    const handleQuantityUpdate = async(productId: string, quantity: number) => {
        try {
            setLoading(true);
            const data = await updateCart(productId, quantity);
            setCart(data);
            if ((data.cartItems).length == 0) {
                navigate("/products");
            }
            showNotification("Cart updated.", 'success');
        } catch (error) {
            console.log(error);
            showNotification("Can't update the cart");
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteItem = async(productId: string) => {
        try {
            setLoading(true);
            const data = await removeItem(productId);
            setCart(data);
            showNotification("Item deleted successfully");
            if ((data.cartItems).length == 0) {
                navigate("/products");
            }
        } catch (error) {
            console.log(error);
            showNotification("Failed to delete cart item");
        } finally {
            setLoading(false);
        }
    }

    return (
        cart && <Container maxWidth="lg" sx={{ py: 8, minHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{fontWeight: "bold", mb: 4}} gutterBottom >
                Shopping Cart
            </Typography>
            
            <Grid container spacing={4} sx={{alignItems: 'flex-start', flexGrow: 1}}>
        
                {/* Left Column: Cart Items List */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {cart?.cartItems?.map(item => (
                            <CartItemCard item={item} key={item.id} onQuantityUpdate={handleQuantityUpdate} onDelete={handleDeleteItem} />
                        ))}
                    </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ position: 'sticky', top: 32 }}>
                        <CartSummary cart={cart} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}