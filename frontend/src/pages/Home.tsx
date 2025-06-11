import HeroSection from "../sections/HeroSection"
import CategoriesSection from "../sections/CategoriesSection"
import ProductsSection from "../sections/ProductsSection"
import ImpactSection from "../sections/ImpactSection"
import NewsletterSection from "../sections/NewsletterSection"
import { Box } from "@mui/material"

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <ImpactSection />
      <NewsletterSection />
    </Box>
  )
}

export default Home
