export interface Category {
  name: string
  image: string
}

const categories: Category[] = [
  { name: "Dog Products", image: "/assets/dogs.jpg" },
  { name: "Cat Products", image: "/assets/cats.jpg" },
  { name: "Fish Products", image: "/assets/fish.jpg" },
  { name: "Bird Products", image: "/assets/birds.jpg" },
  { name: "Small Pet Products", image: "/assets/small_pets.jpg" },
  { name: "Reptile Products", image: "/assets/reptiles.jpg" }
]

export default categories
