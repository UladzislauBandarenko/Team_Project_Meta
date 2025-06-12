import { Box, Button, Container, Stack, Typography } from "@mui/material"

const MainSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 7.5, backgroundColor: "#D5B7A5" }}>
      <Container disableGutters maxWidth={false}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={7.5}
          alignItems="center"
          justifyContent="space-between"
        >

          <Box flex={1} maxWidth={600}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="#5A2600"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Support Animal Shelters
            </Typography>
            <Typography
              variant="body1"
              color="#5A2600"
              sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.125rem" }, maxWidth: 520 }}
            >
              Join our mission to improve the lives of shelter animals. Your
              contributions make a real difference in providing care, resources,
              and finding forever homes for animals in need
            </Typography>
           <Button
             variant="contained"
                  onClick={() => {
                    const el = document.getElementById("how-it-works")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  sx={{
                    bgcolor: "#8C471F",
                    "&:hover": { bgcolor: "#6B2802" },
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 3,
                    py: 1.5,
                  }}
                >
                  Get Involved Now
                </Button>

          </Box>


          <Box
            component="img"
            src="/assets/shelters.jpg"
            alt="Helping animals"
            sx={{
              width: "100%",
              maxWidth: "624px",
              height: "auto",
              borderRadius: 3,
              boxShadow: 2,
              display: "block",
              margin: "0 auto",
              flexShrink: 0,
            }}
          />
        </Stack>
      </Container>
    </Box>
  )
}

export default MainSection