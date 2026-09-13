import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    return (
        <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Products"
        inputMode="search"
        slotProps = {{
            input: {
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon color="action" />
                </InputAdornment>
            ),
        },
        }}
        size="small"
        sx={{bgcolor: 'Background.paper', borderRadius: 1}}/>
    )
}