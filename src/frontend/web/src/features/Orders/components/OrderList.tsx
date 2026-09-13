import { Paper, Box, Typography, Chip } from "@mui/material"

export const OrderList = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* const isSelected = selectedOrderId === order.id; */}
            <Paper
                key="{order.id}"
                elevation={0}
                variant="outlined"
                sx={{
                p: 2.5,
                borderRadius: 2,
                cursor: 'pointer',
                borderColor: true ? 'primary.main' : 'divider',
                bgcolor: true ? 'action.hover' : 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': { borderColor: 'primary.main' }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{fontWeight:"bold"}}>
                    Order #order.id.slice(0, 8)...
                </Typography>
                <Chip label="order.status" color='error' size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Date: new Date(order.orderDate).toLocaleDateString()
                </Typography>
                <Typography variant="subtitle2" color="primary.main" sx={{fontWeight:"bold"}}>
                Total: $order.totalAmount.toFixed(2)
                </Typography>
            </Paper>
        </Box>
    )
}