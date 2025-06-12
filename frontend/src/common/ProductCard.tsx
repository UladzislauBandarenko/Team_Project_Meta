import {
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  Rating,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import { ShoppingCart } from "lucide-react"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { useEffect, useState } from "react"
import type { Product } from "../types/product"

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const [isFav, setIsFav] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("favourites")
    if (stored) {
      const favs: Product[] = JSON.parse(stored)
      setIsFav(favs.some((item) => item.id === product.id))
    }
  }, [product.id])

  const toggleFavourite = () => {
    const stored = localStorage.getItem("favourites")
    const current: Product[] = stored ? JSON.parse(stored) : []

    const updated = isFav
      ? current.filter((item) => item.id !== product.id)
      : [...current, product]

    localStorage.setItem("favourites", JSON.stringify(updated))
    setIsFav(!isFav)

    setAnimate(true)
    setTimeout(() => setAnimate(false), 400)

    if (!isFav) setShowSnackbar(true)
  }

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
      }}
    >
      <IconButton
        onClick={toggleFavourite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: isFav ? "#B91C1C" : "#aaa",
          transform: animate ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      >
        {isFav ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 2,
          mb: 2,
        }}
      />

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
        {product.name}
      </Typography>
      <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
        €{product.price}
      </Typography>
      <Box display="flex" alignItems="center" gap={0.5} mb={1}>
        <Rating value={product.rating} precision={0.5} size="small" readOnly />
        <Typography variant="caption" color="text.secondary">
          ({product.reviews} reviews)
        </Typography>
      </Box>

      <CardActions sx={{ mt: "auto", p: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart size={16} />}
          sx={{
            backgroundColor: "#8C471F",
            "&:hover": { backgroundColor: "#6B2802" },
            fontWeight: "bold",
            textTransform: "none",
            py: 1.2,
          }}
        >
          Add to Cart
        </Button>
      </CardActions>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSnackbar(false)}
        >
          Added to Wishlist!
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default ProductCard