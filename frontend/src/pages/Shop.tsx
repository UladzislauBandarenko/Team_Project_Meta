import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2"
import { useSearchParams } from "react-router-dom"

import ProductCard from "../ common/ProductCard"
import products from "../data/products"
import type { Product } from "../types/product"

const petTypes = ["Dogs", "Cats", "Fish", "Birds", "Small Pets", "Reptiles"]

const Shop = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 200])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("featured")
  const [page, setPage] = useState<number>(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const typeFromURL = searchParams.get("type")
    if (typeFromURL && petTypes.includes(typeFromURL)) {
      setSelectedTypes([typeFromURL])
    }
  }, [searchParams])

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const filteredProducts: Product[] = products
    .filter((p) => {
      const price = parseFloat(p.price.replace("€", ""))
      const matchPrice = price >= priceRange[0] && price <= priceRange[1]
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(p.badge || "")
      return matchPrice && matchType
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price)
      if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const totalItems = filteredProducts.length
  const pageCount = totalItems <= 12 ? 1 : 1 + Math.ceil((totalItems - 12) / 6)
  const itemsPerPage = page === 1 ? 12 : 6
  const startIndex = page === 1 ? 0 : 12 + (page - 2) * 6
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <Box component="a" href="/" sx={{ color: "#8C471F", textDecoration: "underline", cursor: "pointer" }}>
            Home
          </Box>{" "}
          / <Box component="span" fontWeight="bold" color="text.primary">Shop</Box>
        </Typography>
      </Box>

      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={3}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            <Typography gutterBottom>Pet Type</Typography>
            <FormGroup>
              {petTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>

            <Box sx={{ mt: 4 }}>
              <Typography gutterBottom>Price Range</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2">€</Typography>
                  <input
                    type="number"
                    value={priceRange[0]}
                    min={0}
                    max={priceRange[1]}
                    onChange={(e) => {
                      const newMin = Math.max(0, Number(e.target.value))
                      setPriceRange([newMin, priceRange[1]])
                    }}
                    style={{
                      width: "60px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
                <Typography variant="body2">to</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2">€</Typography>
                  <input
                    type="number"
                    value={priceRange[1]}
                    min={priceRange[0]}
                    onChange={(e) => {
                      const newMax = Math.max(priceRange[0], Number(e.target.value))
                      setPriceRange([priceRange[0], newMax])
                    }}
                    style={{
                      width: "60px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
              </Box>

              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={200}
                sx={{
                  mt: 3,
                  color: "#8C471F",
                  "& .MuiSlider-thumb": { backgroundColor: "#8C471F" },
                  "& .MuiSlider-track": { backgroundColor: "#8C471F" },
                }}
              />
            </Box>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              px: 2,
              py: 1.5,
              mb: 3,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
              Showing {Math.min(startIndex + paginatedProducts.length, totalItems)} of {totalItems} products
            </Typography>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel
                sx={{
                  color: "#8C471F",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#8C471F",
                  },
                }}
              >
                Sort by
              </InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  fontWeight: 500,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8C471F",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8C471F",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8C471F",
                  },
                }}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-low">Low to High</MenuItem>
                <MenuItem value="price-high">High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid2 container spacing={3} columns={12}>
            {paginatedProducts.map((product) => (
              <Grid2 xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid2>
            ))}
          </Grid2>

          <Box mt={6} display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              sx={{
                ".MuiPaginationItem-root": {
                  color: "#8C471F",
                  borderRadius: "8px",
                },
                ".Mui-selected": {
                  backgroundColor: "#8C471F",
                  color: "white",
                  "&:hover": { backgroundColor: "#8C471F" },
                },
                ".MuiPaginationItem-page:hover": {
                  backgroundColor: "#F3F4F6",
                },
              }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Shop