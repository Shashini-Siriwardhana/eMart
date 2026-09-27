import { CloudUploadOutlined } from '@mui/icons-material';
import {Paper, Typography, Box, TextField, Button, Alert, Select, InputLabel, FormControl, MenuItem} from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../api/productApi';
import type { CreateProduct } from '../types/CreateProduct';
import { useNotification } from '../../../components/layout/NotificationSlider';

export const AddProductForm = () => {
    const navigate = useNavigate();
    const {showNotification} = useNotification();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateProduct>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stockQuantity: 0,
        imageUrl: ''
    });
    const categories = ['Electronics', 'Clothing', 'Home', 'Books'];

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault(); // Prevent page reload
        try {
            setLoading(true);
            await addProduct(formData);
            showNotification('Product added successfully', 'success');
            navigate('/products');
        } catch (error) {
            showNotification('Creating product failed', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            // Create a temporary local URL to preview the image instantly
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFieldChange = (event: { target: { name?: string; value: any } }) => {
        const { name, value } = event.target;
        if (name) {
            // ... spread operator (copies all existing key value pairs from old state into the new object)
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    
    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                Add New Product
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}  sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField 
                    label="Product Name" 
                    name="name" 
                    value={formData.name} 
                    required 
                    fullWidth 
                    onChange={handleFieldChange}
                />
                
                <TextField 
                    label="Description" 
                    name="description" 
                    value={formData.description} 
                    multiline 
                    rows={3} 
                    required 
                    fullWidth 
                    onChange={handleFieldChange}
                />
                
                <TextField 
                    label="Price ($)" 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    required 
                    fullWidth 
                    onChange={handleFieldChange}
                />
                
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        required
                        fullWidth
                        onChange={(e) => handleFieldChange(e)}
                        sx={{ 
                            textAlign: 'left',
                            '& .MuiSelect-select': {
                                textAlign: 'left',
                            }
                        }}
                        >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}

                    </Select>
                </FormControl>
                
                <TextField 
                    label="Stock Quantity" 
                    name="stockQuantity" 
                    type="number" 
                    value={formData.stockQuantity} 
                    required 
                    fullWidth 
                    onChange={handleFieldChange}
                />
                {imageFile && (
                    <Typography variant="body2" color="text.secondary">
                        Selected file: {imageFile.name}
                    </Typography>
                )}

                {/* Live Preview Thumbnail */}
                {imagePreview && (
                    <Box component="img" src={imagePreview} alt="Preview" sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1, border: '1px solid #ddd' }} />
                )}
                <Button
                    component="label" // Turns the button into a label wrapper
                    variant="contained"
                    startIcon={<CloudUploadOutlined />}
                >
                    Upload Image
                    <input 
                        type="file" 
                        hidden       // Hides the ugly native browser button
                        accept="image/*" 
                        onChange={handleFileChange}
                    />
                </Button>
                <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2}}>
                    <Button 
                        variant="contained" 
                        color="inherit" 
                        size="large" 
                        onClick={() => navigate('/products')}
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        Discard
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? 'Saving to Database...' : 'Save Product'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}