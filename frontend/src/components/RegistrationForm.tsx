import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"

const animalOptions = ["Dogs", "Cats", "Birds", "Rabbits", "Reptiles", "Other"]

const ShelterRegistrationForm = () => {
  const [form, setForm] = useState({
    shelterName: "",
    taxId: "",
    contactName: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    shelterType: "",
    animalsAccepted: [] as string[],
    capacity: "",
    description: "",
    needs: "",
    agree: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: false }))
  }

  const handleCheckboxChange = (animal: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      animalsAccepted: checked
        ? [...prev.animalsAccepted, animal]
        : prev.animalsAccepted.filter((a) => a !== animal),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: boolean } = {}

    const requiredFields = [
      "shelterName",
      "taxId",
      "contactName",
      "position",
      "email",
      "phone",
      "address",
      "shelterType",
      "capacity",
      "description",
    ]

    requiredFields.forEach((field) => {
      if (!form[field as keyof typeof form]) {
        newErrors[field] = true
      }
    })

    if (!form.agree) {
      newErrors.agree = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted", form)
    }
  }

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", py: 10, px: { xs: 2, md: "60px" } }}>
      <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", p: { xs: 4, md: 6 }, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Shelter Registration
        </Typography>
        <Typography align="center" color="text.secondary" mb={4}>
          Register your animal shelter to join our network and receive support from our community.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Shelter Name *"
                fullWidth
                value={form.shelterName}
                onChange={(e) => handleChange("shelterName", e.target.value)}
                error={errors.shelterName}
                helperText={errors.shelterName && "Required"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tax ID / EIN *"
                fullWidth
                value={form.taxId}
                onChange={(e) => handleChange("taxId", e.target.value)}
                error={errors.taxId}
                helperText={errors.taxId && "Required"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Person Name *"
                fullWidth
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                error={errors.contactName}
                helperText={errors.contactName && "Required"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Position *"
                fullWidth
                value={form.position}
                onChange={(e) => handleChange("position", e.target.value)}
                error={errors.position}
                helperText={errors.position && "Required"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address *"
                fullWidth
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                helperText={errors.email && "Required"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number *"
                fullWidth
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
                helperText={errors.phone && "Required"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Shelter Address *"
                fullWidth
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                error={errors.address}
                helperText={errors.address && "Required"}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="City"
                fullWidth
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="State"
                fullWidth
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="ZIP Code"
                fullWidth
                value={form.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={errors.shelterType}>
                <InputLabel>Shelter Type *</InputLabel>
                <Select
                  value={form.shelterType}
                  onChange={(e) => handleChange("shelterType", e.target.value)}
                  label="Shelter Type *"
                >
                  <MenuItem value="Municipal">Municipal Shelter</MenuItem>
                  <MenuItem value="Private">Private Shelter</MenuItem>
                  <MenuItem value="Rescue">Rescue Organization</MenuItem>
                  <MenuItem value="Sanctuary">Animal Sanctuary</MenuItem>
                </Select>
                {errors.shelterType && (
                  <Typography variant="caption" color="error">
                    Required
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                Animals Accepted *
              </Typography>
              <FormGroup row>
                {animalOptions.map((animal) => (
                  <FormControlLabel
                    key={animal}
                    control={
                      <Checkbox
                        checked={form.animalsAccepted.includes(animal)}
                        onChange={(e) =>
                          handleCheckboxChange(animal, e.target.checked)
                        }
                      />
                    }
                    label={animal}
                  />
                ))}
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Shelter Capacity *"
                fullWidth
                value={form.capacity}
                onChange={(e) => handleChange("capacity", e.target.value)}
                error={errors.capacity}
                helperText={errors.capacity && "Required"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Shelter Description *"
                fullWidth
                multiline
                rows={4}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={errors.description}
                helperText={errors.description && "Required"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Current Needs"
                fullWidth
                multiline
                rows={3}
                value={form.needs}
                onChange={(e) => handleChange("needs", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.agree}
                    onChange={(e) => handleChange("agree", e.target.checked)}
                  />
                }
                label="I certify that all information provided is accurate and agree to the partnership terms and conditions *"
              />
              {errors.agree && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  You must agree before submitting
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#8C471F",
                  "&:hover": { bgcolor: "#6B2802" },
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                }}
              >
                Submit Registration
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default ShelterRegistrationForm