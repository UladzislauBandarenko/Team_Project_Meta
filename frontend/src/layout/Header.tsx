
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material"
import { ShoppingCart, AccountCircle } from "@mui/icons-material"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#8C471F", px: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white", textDecoration: "none" }}
          component={Link}
          to="/"
        >
          PetCare Market
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" component={Link} to="/shop">
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/help">
            Help Shelters
          </Button>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header