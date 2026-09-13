import { Container, Typography, Grid, Paper } from "@mui/material"
import { OrderList } from "../components/OrderList"
import { OrderDetails } from "../components/OrderDetails"
import { OrderBottomBar } from "../components/OrderBottomBar"

export const OrderPage = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{fontWeight: "bold", mb: 3}} gutterBottom>
                Order History
            </Typography>

            <Grid container spacing={4}>
                {/* Left Column: Order List Component */}
                <Grid size={{ xs: 12, md: 5 }}>
                <OrderList/>
                </Grid>

                {/* Right Column: Order Details + Bottom Bar inside a Paper wrapper */}
                <Grid size={{ xs: 12, md: 7 }}>
                <Paper 
                    elevation={0} 
                    variant="outlined" 
                    sx={{ p: 3, borderRadius: 2, borderColor: 'divider', position: 'sticky', top: 24 }}
                >
                    <OrderDetails />
                    <OrderBottomBar onTrackShipment={() => alert('Tracking shipment status...')} />
                </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}