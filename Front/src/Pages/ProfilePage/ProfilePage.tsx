import type React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../../redux/auth/authSlice"
import type { RootState } from "../../redux/store"
import { useGetMyOrdersQuery } from "../../redux/order/orderApi"
import "./ProfilePage.scss"

interface Order {
  id: string
  date: string
  status: string
  total: number
}

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.user)

    const { data: orders = [], isLoading } = useGetMyOrdersQuery()

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile")
    return saved
      ? JSON.parse(saved)
      : {
          firstName: user?.firstName || "John",
          lastName: user?.lastName || "Doe",
          email: user?.email || "john.doe@example.com",
        }
  })

  const [addressData, setAddressData] = useState(() => {
    const saved = localStorage.getItem("userAddress")
    return saved
      ? JSON.parse(saved)
      : {
          address: "",
          apartmentNumber: "",
          city: "",
          postalCode: "",
          country: "",
          phone: "",
        }
  })

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate("/")
  }

  const handleProfileEdit = () => setIsEditingProfile(!isEditingProfile)
  const handleAddressEdit = () => setIsEditingAddress(!isEditingAddress)

  const handleProfileSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    setIsEditingProfile(false)
  }

  const handleAddressSave = () => {
    localStorage.setItem("userAddress", JSON.stringify(addressData))
    setIsEditingAddress(false)
  }

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <h1 className="profile-page__title">My Profile</h1>

        <div className="profile-page__content">
          <div className="profile-page__main">
            {/* Profile Section */}
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src="/placeholder.svg?height=80&width=80" alt="Profile Avatar" className="profile-avatar__image" />
                </div>
                <div className="profile-info">
                  {isEditingProfile ? (
                    <div className="profile-edit">
                      <input type="text" value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} className="profile-edit__input" placeholder="First Name" />
                      <input type="text" value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} className="profile-edit__input" placeholder="Last Name" />
                      <input type="email" value={profileData.email} className="profile-edit__input profile-edit__input--disabled" disabled />
                      <div className="profile-edit__actions">
                        <button onClick={handleProfileSave} className="btn btn--primary">Save</button>
                        <button onClick={handleProfileEdit} className="btn btn--secondary">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="profile-info__name">{profileData.firstName} {profileData.lastName}</h2>
                      <p className="profile-info__email">{profileData.email}</p>
                    </>
                  )}
                </div>
                {!isEditingProfile && <button onClick={handleProfileEdit} className="profile-header__edit-btn">Edit Profile</button>}
              </div>
            </div>

            {/* Address Section */}
            <div className="address-section">
              <div className="section-header">
                <h3 className="section-title">Shopping Address</h3>
                {!isEditingAddress && <button onClick={handleAddressEdit} className="section-edit-btn">Edit</button>}
              </div>

              {isEditingAddress ? (
                <div className="address-edit">
                  {Object.entries({
                    Address: "address",
                    "Apartment Number": "apartmentNumber",
                    City: "city",
                    "Postal Code": "postalCode",
                    Country: "country",
                    "Phone Number": "phone"
                  }).map(([label, key]) => (
                    <div className="form-group" key={key}>
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        value={(addressData as any)[key]}
                        onChange={(e) => setAddressData({ ...addressData, [key]: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  ))}
                  <div className="address-edit__actions">
                    <button onClick={handleAddressSave} className="btn btn--primary">Save</button>
                    <button onClick={handleAddressEdit} className="btn btn--secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="address-info">
                  <p><strong>Address:</strong> {addressData.address}, Apt. {addressData.apartmentNumber}</p>
                  <p><strong>City:</strong> {addressData.city}</p>
                  <p><strong>Postal Code:</strong> {addressData.postalCode}</p>
                  <p><strong>Country:</strong> {addressData.country}</p>
                  <p><strong>Phone:</strong> {addressData.phone}</p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="orders-section">
              <h3 className="section-title">Order History</h3>
              <div className="orders-list">
                              {isLoading ? (
                                  <p>Loading orders...</p>
                              ) : (
                                  <div className="orders-list">
                                      {orders.map((order) => (
                                          <div key={order.id} className="order-item">
                                              <div className="order-item__header">
                                                  <span className="order-item__id">ORD-{order.id}</span>
                                                  <span className="order-item__date">
                                                      {new Date(order.createdDate).toLocaleDateString()}
                                                  </span>
                                              </div>
                                              <div className="order-item__details">
                                                  <div className="order-item__status">Status: {order.status}</div>
                                                  <div className="order-item__total">Total: €{order.totalPrice}</div>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              )}
              </div>
            </div>
          </div>

          {/* Sidebar with only Log Out */}
          <div className="profile-page__sidebar">
            <div className="settings-section">
              <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
