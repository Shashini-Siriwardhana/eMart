import { Container, Box, Typography, Grid, Alert } from "@mui/material"
import { PaymentMethodSection } from "../components/PaymentMethodSection"
import { ShippingAddressForm } from "../components/ShippingAddressForm"
import { CheckoutSummary } from "../components/CheckoutSummary"
import { useState } from "react"

export const PaymentPage = () => {
    const [error] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                Checkout & Payment
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Box component="form">
                <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <ShippingAddressForm />
                    <PaymentMethodSection 
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}/>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <CheckoutSummary paymentMethod={paymentMethod}/>
                </Grid>
                </Grid>
            </Box>
        </Container>
    )
}