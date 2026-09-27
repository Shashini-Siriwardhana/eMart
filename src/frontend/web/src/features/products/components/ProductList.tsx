import { useState, useEffect } from 'react';
import { getProducts } from '../api/productApi';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/Product';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { Box, Button, Grid, Typography } from '@mui/material';

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [, setLoading] = useState<boolean>(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError('Failed to fetch products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const onCategoryChange = (category: string) => {
        console.log('Selected category:', category);
        // Implement filtering logic based on the selected category
    };

    const onPriceChange = (event: Event, newValue: number | number[]) => {
        console.log('Selected price range:', newValue);
        console.log('Selected event:', event);
        // Implement filtering logic based on the selected price range
    }

    return (
        <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Top Bar with Search */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{fontWeight:"bold"}}>eMart Catalog</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, flexGrow: {xs: 1, sm: 0}}}>
                    <Box sx={{ width: {xs: '100%', sm: '700px'} }}>
                        <SearchBar/>
                    </Box>
                    <Button variant="contained" color="primary" href="/products/add">
                        Add New Product
                    </Button>
                </Box>
            </Box>

            {/* Main Layout Grid */}
            <Grid container spacing={4}>
                {/* Left Column: Filters */}
                <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                    <FilterBar 
                        onCategoryChange={onCategoryChange}
                        onPriceChange={onPriceChange}
                    />
                </Grid>

                {/* Right Column: Product Cards Grid */}
                <Grid size={{ xs: 12, md: 9, lg: 10 }}>
                    <Grid container spacing={6} sx={{ justifyContent: 'flex-start' }}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Box 
                                key={product.id}
                                sx={{ 
                                    width: { xs: '100%', sm: '280px', md: '300px' },
                                    flexGrow: 0, 
                                    flexShrink: 0
                                }}
                                >
                                    <ProductCard product={product}/>
                                </Box>
                            ))
                        ) : (
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="body1" color="text.secondary" align="center">No products match your criteria.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}