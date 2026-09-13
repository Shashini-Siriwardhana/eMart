import { Box, Button } from "@mui/material"
import { LocalShippingOutlined, DescriptionOutlined } from "@mui/icons-material"

interface OrderBottomBarProps {
    onTrackShipment?: () => void;
}

export const OrderBottomBar = ({onTrackShipment}: OrderBottomBarProps) => {
    return (
        <Box sx={{ 
            mt: 3, 
            pt: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider', 
            display: 'flex', 
            gap: 2 
        }}>
            <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                onClick={onTrackShipment}
                startIcon={<LocalShippingOutlined />} 
                sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}
            >
                Track Shipment Status
            </Button>
            {/* View Invoice Button */}
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                startIcon={<DescriptionOutlined />} 
                sx={{ textTransform: 'none', borderRadius: 2, py: 1, fontWeight: 'medium' }}
            >
                View Invoice
            </Button>
        </Box>
    )
}