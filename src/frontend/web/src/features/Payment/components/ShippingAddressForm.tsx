import { Paper, Typography, Divider, TextField, Grid } from "@mui/material"
import { LocalShippingOutlined } from "@mui/icons-material"

export const ShippingAddressForm = () => {
    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: 'divider', mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShippingOutlined color="primary" /> Shipping Information
            </Typography>
            <Divider sx={{ mb: 2.5 }} />

            <Grid container spacing={2.5}>
                {/* Full Name */}
                <Grid size={{ xs: 12 }}>
                <TextField 
                    label="Full Name" 
                    fullWidth 
                    required 
                    value=""
                />
                </Grid>

                {/* Street Address */}
                <Grid size={{ xs: 12 }}>
                <TextField 
                    label="Address" 
                    fullWidth 
                    required 
                    value=""
                />
                </Grid>

                {/* Zip Code */}
                <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                    label="Zip / Postal Code" 
                    fullWidth 
                    required 
                    value=""
                />
                </Grid>

                {/* Delivery Instructions (Optional) */}
                <Grid size={{ xs: 12 }}>
                <TextField 
                    label="Delivery Instructions (Optional)" 
                    multiline 
                    rows={2} 
                    fullWidth 
                    value=""
                />
                </Grid>
            </Grid>
        </Paper>
    )
}