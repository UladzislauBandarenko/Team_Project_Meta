import { Box, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { useNavigate } from "react-router-dom"

import CategoryCard from "../common/CategoryCard"
import categories from "../data/categories"

const CategoriesSection = () => {
  const navigate = useNavigate()

  const categoryToTypeMap: Record<string, string> = {
    "Dog Products": "Dogs",
    "Cat Products": "Cats",
    "Fish Products": "Fish",
    "Bird Products": "Birds",
    "Small Pet Products": "Small Pets",
    "Reptile Products": "Reptiles",
  }

  const handleClick = (name: string) => {
    const type = categoryToTypeMap[name]
    if (type) {
      navigate(`/shop?type=${encodeURIComponent(type)}`)
    }
  }

  return (
    <Box sx={{ py: 8, backgroundColor: "#F9F9F9", px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Pet Categories
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Find everything your pet needs in one place
      </Typography>

      <Grid2 container spacing={4}>
        {categories.map((category, index) => (
          <Grid2 key={index} xs={12} sm={6} md={4}>
            <CategoryCard
              category={category}
              onClick={() => handleClick(category.name)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default CategoriesSection