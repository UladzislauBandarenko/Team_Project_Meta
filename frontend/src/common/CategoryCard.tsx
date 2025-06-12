import { Box, Typography } from "@mui/material"
import type { Category } from "../types/category"

type CategoryCardProps = {
  category: Category
  onClick: () => void
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px) scale(1.03)",
          boxShadow: 4,
        },
        maxWidth: 400, 
        mx: "auto",
      }}
    >
      <Box
        component="img"
        src={category.image}
        alt={category.name}
        sx={{
          width: "100%",
          height: 200, 
          objectFit: "cover",
        }}
      />
      <Box sx={{ p: 1.5, textAlign: "center" }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {category.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default CategoryCard