import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#D5B7A5", color: "#6B2802", py: 4, mt: 8 }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 4, md: 8 } }}>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: { xs: 2, md: 6 },
        }}>
          <Box sx={{ minWidth: 200, flex: "1 1 250px" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              PetCare Market
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
  Making pet care products shopping meaningful by supporting animal shelters with every purchase
</Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "#6B2802" }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: "#6B2802" }}>
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: "#6B2802" }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: "#6B2802" }}>
                <YouTube />
              </IconButton>
              <IconButton size="small" sx={{ color: "#6B2802" }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ minWidth: 150 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Shop
            </Typography>
            <Typography variant="body2">Dog Products</Typography>
            <Typography variant="body2">Cat Products</Typography>
            <Typography variant="body2">Fish Products</Typography>
            <Typography variant="body2">Bird Products</Typography>
            <Typography variant="body2">Small Pets</Typography>
            <Typography variant="body2">Reptile Products</Typography>
          </Box>

          <Box sx={{ minWidth: 150 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">Our Mission</Typography>
            <Typography variant="body2">Partner Shelters</Typography>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2">Contact Us</Typography>
            <Typography variant="body2">FAQs</Typography>
            <Typography variant="body2">Shipping Policy</Typography>
            <Typography variant="body2">Returns & Refunds</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
          </Box>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © 2025 PetCare Market. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
