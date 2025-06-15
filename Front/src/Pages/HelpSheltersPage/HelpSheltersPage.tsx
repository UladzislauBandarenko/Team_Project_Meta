import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./HelpSheltersPage.scss"
import support from "../../assets/IMG-40.png"
import shop from "../../assets/IMG-87.jpg"
import make from "../../assets/IMG-100.jpg"
import shelt from "../../assets/IMG-113.jpg"
import track from "../../assets/IMG-126.jpg"

interface ShelterRegistrationForm {
  shelterName: string
  taxId: string
  contactPersonName: string
  position: string
  emailAddress: string
  phoneNumber: string
  shelterAddress: string
  city: string
  state: string
  zipCode: string
  shelterType: string
  animalsAccepted: string[]
  shelterCapacity: string
  shelterDescription: string
  currentNeeds: string
  certificationAgreed: boolean
}

const successStories = [
  {
    id: 1,
    title: "Max's Journey",
    description:
      "Max was found abandoned and malnourished. After 3 months of care and rehabilitation, he found his forever home with a loving family.",
    image: "/placeholder.svg?height=200&width=300",
    supporters: 142,
    shares: 23,
  },
  {
    id: 2,
    title: "Luna's Recovery",
    description:
      "Luna needed emergency surgery after being hit by a car. Thanks to the emergency fund, she made a full recovery and is now thriving.",
    image: "/placeholder.svg?height=200&width=300",
    supporters: 89,
    shares: 15,
  },
  {
    id: 3,
    title: "The Paw Squad",
    description:
      "A litter of 8 puppies was rescued from an abandoned property. After foster care, all found loving homes through our network.",
    image: "/placeholder.svg?height=200&width=300",
    supporters: 203,
    shares: 45,
  },
]

export const HelpSheltersPage: React.FC = () => {
  const [formData, setFormData] = useState<ShelterRegistrationForm>({
    shelterName: "",
    taxId: "",
    contactPersonName: "",
    position: "",
    emailAddress: "",
    phoneNumber: "",
    shelterAddress: "",
    city: "",
    state: "",
    zipCode: "",
    shelterType: "",
    animalsAccepted: [],
    shelterCapacity: "",
    shelterDescription: "",
    currentNeeds: "",
    certificationAgreed: false,
  })

  const [newsletterEmail, setNewsletterEmail] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement
      if (name === "certificationAgreed") {
        setFormData((prev) => ({ ...prev, [name]: checked }))
      } else if (name === "animalsAccepted") {
        setFormData((prev) => ({
          ...prev,
          animalsAccepted: checked
            ? [...prev.animalsAccepted, value]
            : prev.animalsAccepted.filter((animal) => animal !== value),
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Shelter registration:", formData)
    // Handle form submission
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", newsletterEmail)
    setNewsletterEmail("")
  }

  return (
    <div className="help-shelters-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">Support Animal Shelters</h1>
            <p className="hero__description">
              Join our mission to improve the lives of shelter animals. Your contributions make a real difference in
              providing care, resources, and finding forever homes for animals in need.
            </p>
            <Link to="/shop" className="hero__cta-button">
              Start Shopping & Helping
            </Link>
          </div>
          <div className="hero__image">
            <img
              src={support}
              alt="People with shelter animals"
              className="hero__image-main"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="statistics__container">
          <div className="stat-card">
            <div className="stat-card__icon">🏠</div>
            <div className="stat-card__number">124</div>
            <div className="stat-card__label">Shelters Supported</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">💰</div>
            <div className="stat-card__number">$1.2M</div>
            <div className="stat-card__label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">🐾</div>
            <div className="stat-card__number">5,280</div>
            <div className="stat-card__label">Animals Helped</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works__container">
          <h2 className="how-it-works__title">How It Works</h2>
          <p className="how-it-works__subtitle">
            Join our community in making a difference for shelter animals through these simple steps.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-card__number">1</div>
              <div className="step-card__image">
                <img src={shop} alt="Shop Products" />
              </div>
              <h3 className="step-card__title">Shop Products</h3>
              <p className="step-card__description">
                Browse our curated collection of high-quality pet supplies and accessories for your beloved pets.
              </p>
            </div>

            <div className="step-card">
              <div className="step-card__number">2</div>
              <div className="step-card__image">
                <img src={make} alt="Make a Purchase" />
              </div>
              <h3 className="step-card__title">Make a Purchase</h3>
              <p className="step-card__description">
                Complete your purchase knowing that a portion of every transaction goes directly to helping shelter
                animals.
              </p>
            </div>

            <div className="step-card">
              <div className="step-card__number">3</div>
              <div className="step-card__image">
                <img src={shelt} alt="Support Shelters" />
              </div>
              <h3 className="step-card__title">Support Shelters</h3>
              <p className="step-card__description">
                Your purchase helps provide essential supplies and care for animals in partner shelters.
              </p>
            </div>

            <div className="step-card">
              <div className="step-card__number">4</div>
              <div className="step-card__image">
                <img src={track} alt="Track Impact" />
              </div>
              <h3 className="step-card__title">Track Impact</h3>
              <p className="step-card__description">
                A portion of every purchase goes directly to supporting animals in need through our network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shelter Registration Section */}
      <section className="shelter-registration">
        <div className="shelter-registration__container">
          <h2 className="shelter-registration__title">Shelter Registration</h2>
          <p className="shelter-registration__subtitle">
            Register your animal shelter to join our network and receive support from our community
          </p>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shelterName" className="form-label">
                  Shelter Name *
                </label>
                <input
                  type="text"
                  id="shelterName"
                  name="shelterName"
                  value={formData.shelterName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="taxId" className="form-label">
                  Tax ID (EIN) *
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactPersonName" className="form-label">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  Position *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shelterAddress" className="form-label">
                Shelter Address *
              </label>
              <input
                type="text"
                id="shelterAddress"
                name="shelterAddress"
                value={formData.shelterAddress}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Street Address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode" className="form-label">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shelterType" className="form-label">
                Shelter Type *
              </label>
              <select
                id="shelterType"
                name="shelterType"
                value={formData.shelterType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Shelter Type</option>
                <option value="municipal">Municipal Shelter</option>
                <option value="nonprofit">Non-Profit Shelter</option>
                <option value="rescue">Rescue Organization</option>
                <option value="sanctuary">Animal Sanctuary</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Animals Accepted *</label>
              <div className="checkbox-grid">
                {["Dogs", "Cats", "Birds", "Rabbits", "Reptiles", "Other"].map((animal) => (
                  <label key={animal} className="checkbox-option">
                    <input
                      type="checkbox"
                      name="animalsAccepted"
                      value={animal.toLowerCase()}
                      checked={formData.animalsAccepted.includes(animal.toLowerCase())}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-option__text">{animal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shelterCapacity" className="form-label">
                Shelter Capacity *
              </label>
              <input
                type="number"
                id="shelterCapacity"
                name="shelterCapacity"
                value={formData.shelterCapacity}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Maximum number of animals"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shelterDescription" className="form-label">
                Shelter Description *
              </label>
              <textarea
                id="shelterDescription"
                name="shelterDescription"
                value={formData.shelterDescription}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Tell us about your shelter, mission, and the services you provide"
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentNeeds" className="form-label">
                Current Needs
              </label>
              <textarea
                id="currentNeeds"
                name="currentNeeds"
                value={formData.currentNeeds}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Describe your shelter's current needs and how we can help"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="certificationAgreed"
                  checked={formData.certificationAgreed}
                  onChange={handleInputChange}
                  required
                />
                <span className="checkbox-option__text">
                  I certify that all information provided is accurate and agree to the partnership terms and conditions
                  *
                </span>
              </label>
            </div>

            <button type="submit" className="registration-form__submit">
              Submit Registration
            </button>
          </form>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="success-stories__container">
          <h2 className="success-stories__title">Success Stories</h2>
          <p className="success-stories__subtitle">
            See the real impact of your support through these heartwarming transformations.
          </p>

          <div className="stories-grid">
            {successStories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-card__image">
                  <img src={story.image || "/placeholder.svg"} alt={story.title} />
                </div>
                <div className="story-card__content">
                  <h3 className="story-card__title">{story.title}</h3>
                  <p className="story-card__description">{story.description}</p>
                  <div className="story-card__stats">
                    <div className="story-card__stat">
                      <span className="story-card__stat-icon">❤️</span>
                      <span className="story-card__stat-text">{story.supporters} supporters</span>
                    </div>
                    <div className="story-card__stat">
                      <span className="story-card__stat-icon">📤</span>
                      <span className="story-card__stat-text">{story.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="success-stories__footer">
            <Link to="/success-stories" className="success-stories__view-more">
              View More Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter__container">
          <h2 className="newsletter__title">Join Our Pet-Loving Community</h2>
          <p className="newsletter__subtitle">
            Subscribe to our newsletter for exclusive deals, pet care tips, and updates on how your purchases are
            helping animal shelters.
          </p>

          <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="newsletter__input"
              required
            />
            <button type="submit" className="newsletter__button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HelpSheltersPage
