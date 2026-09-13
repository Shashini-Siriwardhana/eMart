import { type Product } from "../types/Product";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box, Button, Chip } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { addProductToCart } from "../api/productApi";
import { useNotification } from "../../../components/layout/NotificationSlider";
import { useCart } from "../../../context/CartContext";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
    const {setCart} = useCart();
    const IsOutOfStock = product.stockQuantity <= 0;
    const [loading, setLoading] = useState<boolean>(true);
    const {showNotification} = useNotification();

    const handleAddToCart = async() => {
        try {
            setLoading(true);
            setCart(await addProductToCart({
                productId: product.id,
                quantity: 1
            }));
            showNotification('Product added to the cart successfully', 'success');
        } catch (error) {
            showNotification('Adding product to cart failed', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card sx={{
            maxWidth: 345, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            opacity: IsOutOfStock ? 0.75 : 1,
            boxShadow: 3,
            position: 'relative'}}>
            <Box sx={{position: 'relative'}}>
                <CardMedia
                component="img"
                height="160"
                image={product.imageUrl || "data:image/jpeg;base64,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"}
                alt={product.name}/>
                <Chip
                label={IsOutOfStock ? 'Out of Stock' : `${product.stockQuantity} In Stock`}
                color={IsOutOfStock ? "error" : "success"}
                size="small"
                sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    fontWeight: 'bold',
                    backgroundColor: IsOutOfStock ? 'rgba(238, 110, 110, 0.9)' : 'rgba(0, 128, 0, 0.8)',
                    color: '#fff'
                }}
                />
            </Box>
            <CardHeader 
            title={
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
            }
            subheader={`$ ${product.price.toFixed(2)}`}
             />
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                variant="contained" 
                color="primary" 
                size="medium" 
                fullWidth
                disabled={IsOutOfStock}
                onClick={handleAddToCart}>
                    {IsOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </Button>
            </CardActions>
        </Card>
    )
}