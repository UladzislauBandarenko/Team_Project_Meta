"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./HelpSheltersPage.scss"
import support from "../../assets/IMG-40.png"
import shop from "../../assets/IMG-87.jpg"
import make from "../../assets/IMG-100.jpg"
import shelt from "../../assets/IMG-113.jpg"
import track from "../../assets/IMG-126.jpg"

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

const partnerShelters = [
  {
    id: 1,
    name: "VGGN",
    icon: "🐾",
    description:
      "Vilniaus gyvūnų globos namai provides shelter and care for abandoned animals in Vilnius, helping them find loving forever homes.",
    website: "https://vggn.grinda.lt/ataskaitos/",
  },
  {
    id: 2,
    name: "Lesė",
    icon: "❤️",
    description:
      "Lesė animal shelter has been rescuing and rehabilitating animals since 2008, focusing on education and responsible pet ownership.",
    website: "https://lese.lt/apie-mus/",
  },
  {
    id: 3,
    name: "Beglobis",
    icon: "🏠",
    description:
      "Beglobis provides shelter, medical care, and adoption services for homeless animals, working to reduce the stray animal population.",
    website: "http://www.beglobis.com/",
  },
  {
    id: 4,
    name: "SOS Gyvūnai",
    icon: "🐕",
    description:
      "SOS Gyvūnai focuses on emergency animal rescue, providing immediate care and rehabilitation for animals in crisis situations.",
    website: "https://sos-gyvunai.lt/",
  },
]

export const HelpSheltersPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("")

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
            <img src={support || "/placeholder.svg"} alt="People with shelter animals" className="hero__image-main" />
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
                <img src={shop || "/placeholder.svg"} alt="Shop Products" />
              </div>
              <h3 className="step-card__title">Shop Products</h3>
              <p className="step-card__description">
                Browse our curated collection of high-quality pet supplies and accessories for your beloved pets.
              </p>
            </div>

            <div className="step-card">
              <div className="step-card__number">2</div>
              <div className="step-card__image">
                <img src={make || "/placeholder.svg"} alt="Make a Purchase" />
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
                <img src={shelt || "/placeholder.svg"} alt="Support Shelters" />
              </div>
              <h3 className="step-card__title">Support Shelters</h3>
              <p className="step-card__description">
                Your purchase helps provide essential supplies and care for animals in partner shelters.
              </p>
            </div>

            <div className="step-card">
              <div className="step-card__number">4</div>
              <div className="step-card__image">
                <img src={track || "/placeholder.svg"} alt="Track Impact" />
              </div>
              <h3 className="step-card__title">Track Impact</h3>
              <p className="step-card__description">
                A portion of every purchase goes directly to supporting animals in need through our network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Shelters Section */}
      <section className="partner-shelters">
        <div className="partner-shelters__container">
          <h2 className="partner-shelters__title">Our Partner Shelters</h2>
          <p className="partner-shelters__subtitle">
            We're proud to work with these amazing animal shelters across Lithuania. Your purchases help support their
            vital work.
          </p>

          <div className="shelters-grid">
            {partnerShelters.map((shelter) => (
              <div key={shelter.id} className="shelter-card">
                <div className="shelter-card__header">
                  <div className="shelter-card__icon">{shelter.icon}</div>
                  <h3 className="shelter-card__name">{shelter.name}</h3>
                </div>
                <p className="shelter-card__description">{shelter.description}</p>
                <a href={shelter.website} target="_blank" rel="noopener noreferrer" className="shelter-card__link">
                  Visit Website ↗
                </a>
              </div>
            ))}
          </div>

          <div className="partner-shelters__footer">
            <Link to="/contact" className="partner-shelters__register-btn">
              Become a Partner Shelter
            </Link>
          </div>
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
