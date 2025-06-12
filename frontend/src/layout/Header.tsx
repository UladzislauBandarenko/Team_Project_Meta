import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material"
import { ShoppingCart, AccountCircle, Favorite } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

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
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontWeight: isActive("/") ? "bold" : "normal",
              borderBottom: isActive("/") ? "2px solid white" : "none",
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/shop"
            sx={{
              fontWeight: isActive("/shop") ? "bold" : "normal",
              borderBottom: isActive("/shop") ? "2px solid white" : "none",
            }}
          >
            Shop
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/help"
            sx={{
              fontWeight: isActive("/help") ? "bold" : "normal",
              borderBottom: isActive("/help") ? "2px solid white" : "none",
            }}
          >
            Help Shelters
          </Button>

          <IconButton
            component={Link}
            to="/favourites"
            sx={{
              color: isActive("/favourites") ? "#DD2F2F" : "white",
            }}
          >
            <Favorite />
          </IconButton>

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