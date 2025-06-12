import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton
} from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import GroupsIcon from "@mui/icons-material/Groups"
import { useState } from "react"

const stories = [
  {
    id: 1,
    title: "Max's Journey",
    description:
      "Max was found abandoned and malnourished. After 3 months of care and rehabilitation, he found his forever home with the Johnson family.",
    before: "/assets/max-before.jpg",
    after: "/assets/max-after.jpg",
    supporters: 142,
  },
  {
    id: 2,
    title: "Luna's Recovery",
    description:
      "Luna needed emergency surgery after being hit by a car. Thanks to the emergency fund, she received care and now thrives in her new home.",
    before: "/assets/luna-before.jpg",
    after: "/assets/luna-after.jpg",
    supporters: 98,
  },
  {
    id: 3,
    title: "The Paw Squad",
    description:
      "A litter of 6 puppies was rescued from an abandoned property. After foster care, all found loving homes within two months.",
    before: "/assets/pups-before.jpg",
    after: "/assets/pups-after.jpg",
    supporters: 215,
  },
]

const SuccessStoriesSection = () => {
  const [liked, setLiked] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <Box px={{ xs: 2, md: "60px" }} py={10} sx={{ backgroundColor: "#fff" }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Success Stories
        </Typography>
        <Typography color="text.secondary" maxWidth={700} mx="auto">
          See the real impact of your support through these heartwarming transformations.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {stories.map((story) => (
          <Grid item key={story.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Box display="flex" gap={0.5}>
                <CardMedia
                  component="img"
                  image={story.before}
                  alt={`${story.title} before`}
                  sx={{ width: "50%", height: 200, objectFit: "cover" }}
                />
                <CardMedia
                  component="img"
                  image={story.after}
                  alt={`${story.title} after`}
                  sx={{ width: "50%", height: 200, objectFit: "cover" }}
                />
              </Box>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {story.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {story.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <GroupsIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption">
                      {story.supporters} supporters
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => toggleLike(story.id)}
                    sx={{ transition: "transform 0.2s", "&:active": { transform: "scale(1.3)" } }}
                  >
                    {liked.includes(story.id) ? (
                      <FavoriteIcon color="error" fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={6}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#8C471F",
            color: "#8C471F",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.25,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#F5E7D5",
              borderColor: "#8C471F",
            },
          }}
        >
          View More Success Stories
        </Button>
      </Box>
    </Box>
  )
}

export default SuccessStoriesSection;