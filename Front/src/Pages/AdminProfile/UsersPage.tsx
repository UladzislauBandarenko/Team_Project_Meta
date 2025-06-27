"use client"

import type React from "react"
import { useState } from "react"
import "./UsersPage.scss"

interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: "buyer" | "seller" | "administration"
}

const UsersPage: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      username: "johndoe",
      email: "john@example.com",
      fullName: "John Doe",
      role: "buyer",
    },
    {
      id: "2",
      username: "janesmith",
      email: "jane@example.com",
      fullName: "Jane Smith",
      role: "seller",
    },
    {
      id: "3",
      username: "admin123",
      email: "admin@example.com",
      fullName: "Admin User",
      role: "administration",
    },
    {
      id: "4",
      username: "mikejohnson",
      email: "mike@example.com",
      fullName: "Mike Johnson",
      role: "buyer",
    },
    {
      id: "5",
      username: "sarahwilson",
      email: "sarah@example.com",
      fullName: "Sarah Wilson",
      role: "seller",
    },
  ])

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editRole, setEditRole] = useState<"buyer" | "seller" | "administration">("buyer")

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setEditRole(user.role)
    setIsEditModalOpen(true)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      // Here you would typically update the user in your backend
      console.log(`Updating user ${editingUser.id} role to ${editRole}`)
      setIsEditModalOpen(false)
      setEditingUser(null)
    }
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setEditingUser(null)
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "buyer":
        return "role-badge role-buyer"
      case "seller":
        return "role-badge role-seller"
      case "administration":
        return "role-badge role-admin"
      default:
        return "role-badge"
    }
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>Users</h2>
        <div className="users-stats">
          <div className="stat-item">
            <span className="stat-label">Total Users:</span>
            <span className="stat-value">{users.length}</span>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-full-name">{user.fullName}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
                </td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEditUser(user)}>
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={editingUser.username} disabled className="form-input disabled" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editingUser.email} disabled className="form-input disabled" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as "buyer" | "seller" | "administration")}
                  className="form-select"
                >
                  <option value="buyer">buyer</option>
                  <option value="seller">seller</option>
                  <option value="administration">administration</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersPage
