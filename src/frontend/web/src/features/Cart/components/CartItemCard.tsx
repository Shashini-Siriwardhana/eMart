import { Box, Paper, Typography, IconButton } from "@mui/material"
import { IndeterminateCheckBox, AddBox, DeleteOutlineOutlined } from "@mui/icons-material"
import type { CartItem } from "../types/CartItem"

interface CartItemCardProps {
    item: CartItem;
    onQuantityUpdate: (productId: string, quantity: number) => Promise<void>
    onDelete: (productId: string) => Promise<void>
}

export const CartItemCard = ({item, onQuantityUpdate, onDelete}: CartItemCardProps) => {

    const handleAddQuantity = () => {
        onQuantityUpdate(item.productId, item.quantity + 1)
    }

    const handleRemoveQuantity = () => {
        onQuantityUpdate(item.productId, item.quantity - 1);
    }

    return (
        <Paper
        elevation={0} 
        variant="outlined"
        sx={{ 
            p: 2.5, 
            mb: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3, 
            borderRadius: 2,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }
        }}>
            {/* Image */}
            <Box
            component="img"
            src={item.imageUrl}
            alt=""
            sx={{width: 80, height: 80, objectFit: 'cover', borderRadius: 1.5, bgcolor: 'gray.100'}} />

            {/* Item Name and unit price */}
            <Box sx={{ flexGrow: 1, minWidth: 0}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: '0.5'}} noWrap>{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">Unit price: {item.price}</Typography>
            </Box>

            {/* Quantity (Add/Remove) */}
            <Box 
            sx={{ display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                bgcolor: 'grey.50', 
                p: 0.5, 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider'
                }}
            >
                <IconButton 
                size="small" 
                disabled={false}
                sx={{ '&.Mui-disabled': { opacity: 0.4 } }}
                onClick={handleRemoveQuantity}
                >
                    <IndeterminateCheckBox fontSize="small" />
                </IconButton>
                
                <Typography variant="body2" sx={{ minWidth: '28px', textAlign: 'center', fontWeight:"bold" }}>
                {item.quantity}
                </Typography>

                <IconButton 
                size="small" 
                onClick={handleAddQuantity}
                >
                    <AddBox fontSize="small" />
                </IconButton>
            </Box>
            <Typography 
                variant="subtitle1" 
                color="primary.main"
                sx={{ fontWeight: 'bold', minWidth: '95px', textAlign: 'right' }}
            >
                {`${item.subtotal.toFixed(2)}`}
            </Typography>

            {/* Delete Item Icon Button */}
            <IconButton 
                color="error" 
                aria-label="remove cart item"
                sx={{ 
                '&:hover': { bgcolor: 'error.lighter', color: 'error.dark' } 
                }}
                onClick={() => onDelete(item.productId)}
            >
                <DeleteOutlineOutlined />
            </IconButton>
        </Paper>
    )
}