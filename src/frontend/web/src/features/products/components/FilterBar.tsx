import { Checkbox, FormControlLabel,  FormGroup } from "@mui/material"
import { Box, Divider, Paper, Slider, Typography } from "@mui/material"

interface ProductFiltersProps {
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
  priceRange?: number[];
  onPriceChange: (event: Event, newValue: number | number[]) => void;
}

export const FilterBar = ({ selectedCategory = 'All', onCategoryChange, priceRange = [0, 1000], onPriceChange }: ProductFiltersProps) => {
    const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Books'];
    const stockStatuses = ['In Stock', 'Out of Stock'];

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minWidth: '240px' }}>
            <Typography variant="h6" sx={{fontWeight:'bold'}} gutterBottom>
                Filters
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Categories Filter */}
            <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom>
                Category
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
                {categories.map((cat) => (
                <FormControlLabel
                    key={cat}
                    control={
                    <Checkbox
                        checked={selectedCategory === cat}
                        onChange={() => onCategoryChange(cat)}
                        size="small"
                    />
                    }
                    label={cat}
                />
                ))}
            </FormGroup>
            {/* Stock Status Filter */}
            <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom>
                Stock Status
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
                {stockStatuses.map((status) => (
                <FormControlLabel
                    key={status}
                    control={
                    <Checkbox
                        checked={selectedCategory === status}
                        onChange={() => onCategoryChange(status)}
                        size="small"
                    />
                    }
                    label={status}
                />
                ))}
            </FormGroup>

            <Divider sx={{ mb: 3 }} />

            {/* Price Range Filter */}
            <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom>
                Max Price: ${priceRange[1]}
            </Typography>
            <Box sx={{ px: 1 }}>
                <Slider
                value={priceRange}
                onChange={onPriceChange}
                valueLabelDisplay="auto"
                max={1000}
                step={10}
                />
            </Box>
        </Paper>
    )
}