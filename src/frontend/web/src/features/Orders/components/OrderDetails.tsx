import { Box, Divider, Typography, Chip } from "@mui/material"

export const OrderDetails = () => {
    return(
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{fontWeight: "bold"}}>
                Order Details
                </Typography>
                <Chip label="order.status" color='primary' />
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Order ID: order.id
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Placed on: new Date(order.orderDate).toLocaleString()
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" sx={{fontWeight: "bold"}} gutterBottom>
                Items in this order:
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                <Box 
                    key="{idx}" 
                    sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    p: 1.5, 
                    bgcolor: 'grey.50', 
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: 'divider'
                    }}
                >
                    <Box>
                    <Typography variant="body2" sx={{fontWeight: "bold"}}>item.productName</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Qty: item.quantity × $item.unitPrice.toFixed(2)
                    </Typography>
                    </Box>
                    <Typography variant="body2" sx={{fontWeight: "bold"}}>
                    $(item.quantity * item.unitPrice).toFixed(2)
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>Grand Total</Typography>
                <Typography variant="h6" sx={{fontWeight: "bold"}} color="primary.main">
                $ order.totalAmount.toFixed(2)
                </Typography>
            </Box>
        </Box>
    )
}