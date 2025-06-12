import { Box, Button, Container, TextField, Typography } from "@mui/material";

const NewsletterSection = () => (
  <Box sx={{ pt: "125px", pb: 8, backgroundColor: "#fff" }}>
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Join Our Pet-Loving Community
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
      >
        Subscribe to our newsletter for exclusive deals, pet care tips, and updates on how your purchases help animal shelters
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        maxWidth={500}
        mx="auto"
      >
        <TextField
          placeholder="Your email address"
          fullWidth
          size="small"
          sx={{
            backgroundColor: "#fff",
            flex: 2,
            minWidth: "250px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#8C471F",
            "&:hover": { bgcolor: "#6B2802" },
            textTransform: "none",
            px: 3,
            flexShrink: 0,
            height: "40px",
            fontWeight: "bold",
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Container>
  </Box>
);

export default NewsletterSection;