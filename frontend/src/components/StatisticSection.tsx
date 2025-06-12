import { Box, Typography, Paper } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import HomeIcon from "@mui/icons-material/Home"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import PetsIcon from "@mui/icons-material/Pets"

const stats = [
  {
    icon: <HomeIcon sx={{ fontSize: 40, color: "#8C471F" }} />,
    value: "124",
    label: "Shelters Supported",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: "#8C471F" }} />,
    value: "$1.2M",
    label: "Total Donations",
  },
  {
    icon: <PetsIcon sx={{ fontSize: 40, color: "#8C471F" }} />,
    value: "5,280",
    label: "Animals Helped",
  },
]

const StatsSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 7.5, backgroundColor: "#F5F5F5" }}>
      <Grid2
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {stats.map((item, index) => (
          <Grid2 key={index} xs={12} sm={6} md={4} display="flex" justifyContent="center">
            <Paper
              elevation={3}
              sx={{
                width: 400,
                height: 165,
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box mb={1}>{item.icon}</Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#5A2600"
                gutterBottom
              >
                {item.value}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1rem" }}
              >
                {item.label}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default StatsSection