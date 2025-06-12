import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { styled } from "@mui/system"
import { Link } from "react-router-dom"

const steps = [
  {
    id: 1,
    title: "Shop Products",
    description:
      "Browse our curated selection of high-quality pet supplies and products for all your furry friends.",
    image: "/assets/shop-products.jpg",
  },
  {
    id: 2,
    title: "Make a Purchase",
    description:
      "Complete your purchase knowing that a portion of every sale goes directly to helping shelter animals.",
    image: "/assets/purchase.jpg",
  },
  {
    id: 3,
    title: "Support Shelters",
    description:
      "Your purchase helps provide essential supplies and care to animals in partner shelters.",
    image: "/assets/shelters.jpg",
  },
  {
    id: 4,
    title: "Track Impact",
    description:
      "A portion of every purchase goes directly to supporting animal shelters.",
    image: "/assets/track.jpg",
  },
]

const NumberCircle = styled("div")({
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: "#8C471F",
  color: "white",
  borderRadius: "50%",
  width: 24,
  height: 24,
  fontSize: "0.875rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
})

const HowItWorks = () => {
  return (
    <Box 
    id="how-it-works"
    sx={{ py: 6, px: { xs: 2, md: "60px" }, backgroundColor: "#F9FAFB" }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          How It Works
        </Typography>
        <Typography color="text.secondary" maxWidth={600} mx="auto">
          Join our community in making a difference for shelter animals through these simple steps.
        </Typography>
      </Box>

      <Grid2 container spacing={4} justifyContent="center">
        {steps.map((step) => (
          <Grid2 key={step.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                width: 288,
                height: 360,
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                mx: "auto",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box position="relative">
                <NumberCircle>{step.id}</NumberCircle>
                <CardMedia
                  component="img"
                  image={step.image}
                  alt={step.title}
                  sx={{
                    width: 240,
                    height: 195,
                    objectFit: "cover",
                    mx: "auto",
                    mt: 2,
                    borderRadius: 1,
                  }}
                />
              </Box>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box mt={6} display="flex" justifyContent="center">
        < Link to="/shop" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8C471F",
            color: "#fff",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "#6B2802",
            },
          }}
        >
          Start Shopping & Helping
        </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default HowItWorks