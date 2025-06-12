import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import SearchIcon from "@mui/icons-material/Search"

const HeroSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 7.5, backgroundColor: "#D5B7A5" }}>
      <Grid2
        container
        spacing={7.5} 
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid2 xs={12} md={6}>
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="#5A2600"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Shop for Your Pet
            </Typography>

            <Typography
              variant="body1"
              color="#5A2600"
              sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 500 }}
            >
              Find the best products for your furry friends while supporting animal shelters with every purchase.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
                maxWidth: 520,
              }}
            >
              <TextField
                placeholder="Search for pet products..."
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                  "& .MuiInputBase-root": {
                    height: "48px",
                    fontSize: "1rem",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon sx={{ color: "#8C471F" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#8C471F",
                "&:hover": { bgcolor: "#6B2802" },
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
                py: 1,
              }}
            >
              Find Products
            </Button>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Box
            component="img"
            src="/assets/hero.jpg"
            alt="Happy pets"
            sx={{
              width: "100%",
              maxWidth: "640px",
              height: "auto",
              borderRadius: 3,
              boxShadow: 2,
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default HeroSection