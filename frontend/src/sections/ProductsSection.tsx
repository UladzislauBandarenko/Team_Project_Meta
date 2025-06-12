import { Box, Typography, Button } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import ProductCard from "../ common/ProductCard"
import products from "../data/products"
import { useNavigate } from "react-router-dom"

const ProductsSection = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Bestseller Products
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Most loved products by pet parents like you
      </Typography>

      <Grid2 container spacing={5} columns={12} justifyContent="center">
        {products.slice(0, 8).map((product, index) => (
          <Grid2
            key={index}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>

      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          onClick={() => navigate("/shop")}
          sx={{
            backgroundColor: "#8C471F",
            "&:hover": { backgroundColor: "#6B2802" },
            fontWeight: "bold",
            textTransform: "none",
            px: 4,
            py: 1.5,
            borderRadius: "8px"
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  )
}

export default ProductsSection