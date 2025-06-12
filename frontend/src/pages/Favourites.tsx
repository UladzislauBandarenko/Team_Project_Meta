
import { Box, Typography, Grid, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useEffect, useState } from "react"
import type { Product } from "../types/product"
import ProductCard from "../common/ProductCard"

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Product[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("favourites")
    if (stored) setFavourites(JSON.parse(stored))
  }, [])

  const handleRemove = (id: number) => {
    const updated = favourites.filter((item) => item.id !== id)
    setFavourites(updated)
    localStorage.setItem("favourites", JSON.stringify(updated))
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        My Wishlist ({favourites.length})
      </Typography>

      {favourites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your wishlist is empty
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Box position="relative">
                <ProductCard product={product} />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemove(product.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "white",
                    boxShadow: 1,
                    "&:hover": { bgcolor: "#fcebea" },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default FavouritesPage