import { LocalAtmOutlined, SecurityOutlined, LockOutlined } from "@mui/icons-material"
import { 
    Paper, 
    Typography, 
    Divider, 
    Select, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Box } from "@mui/material"

interface PaymentMethodProps {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
}

export const PaymentMethodSection = ({paymentMethod, setPaymentMethod}: PaymentMethodProps) => {


    const handleFieldChange = (event: { target: { name?: string; value: any } }) => {
        const { name, value } = event.target;
        if (name) {
            // ... spread operator (copies all existing key value pairs from old state into the new object)
            setPaymentMethod(value);
            console.log(paymentMethod);
        }
    }

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center', gap: 1 }}>
                <LockOutlined color="primary" /> Payment Method
            </Typography>
            <Divider sx={{ mb: 2.5 }} />

            {/* Dropdown Menu for 3rd Party Gateway Selection */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="payment-method-label">Select Payment Provider</InputLabel>
                <Select
                name="payment-method-select"
                value={paymentMethod}
                label="Select Payment Provider"
                onChange={(e) => handleFieldChange(e)}
                sx={{ 
                        textAlign: 'left',
                        '& .MuiSelect-select': {
                            textAlign: 'left',
                        }
                    }}
                >
                    <MenuItem key={"Stripe"} value="Stripe">Stripe Secure Checkout (Credit/Debit Card)</MenuItem>
                    <MenuItem key={"PayPal"} value="PayPal">PayPal Express Checkout</MenuItem>
                    <MenuItem key={"CashOnDelivery"} value="CashOnDelivery">Cash on Delivery (COD)</MenuItem>
                </Select>
            </FormControl>

            {/* Secure 3rd Party Notice */}
            {(paymentMethod === 'Stripe' || paymentMethod === 'PayPal') && (
                <Box sx={{ p: 2.5, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'divider' }}>
                <SecurityOutlined color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="body2" color="text.secondary">
                    You will be redirected to our secure third-party provider ({paymentMethod}) to complete your payment safely. No card details are stored on our servers.
                </Typography>
                </Box>
            )}

            {paymentMethod === 'CashOnDelivery' && (
                <Box sx={{ p: 2.5, bgcolor: 'success.lighter', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalAtmOutlined color="success" sx={{ fontSize: 32 }} />
                <Typography variant="body2" color="text.secondary">
                    Please keep exact cash ready. Our courier partner will collect payment upon delivery.
                </Typography>
                </Box>
            )}
        </Paper>
    )
}