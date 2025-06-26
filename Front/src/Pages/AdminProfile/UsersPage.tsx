"use client"

import type React from "react"
import { useState } from "react"
import "./UsersPage.scss"

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
}

interface EditUserData {
  role: string
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: "johndoe",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "buyer",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      username: "janesmith",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "seller",
      createdAt: "2025-01-10",
    },
    {
      id: 3,
      username: "admin123",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: "administration",
      createdAt: "2025-01-01",
    },
    {
      id: 4,
      username: "mikejohnson",
      email: "mike@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      role: "buyer",
      createdAt: "2025-01-20",
    },
    {
      id: 5,
      username: "sarahwilson",
      email: "sarah@example.com",
      firstName: "Sarah",
      lastName: "Wilson",
      role: "seller",
      createdAt: "2025-01-18",
    },
  ])

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editFormData, setEditFormData] = useState<EditUserData>({ role: "" })

  const roles = [
    { value: "buyer", label: "buyer" },
    { value: "seller", label: "seller" },
    { value: "administration", label: "administration" },
  ]

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setEditFormData({ role: user.role })
    setShowEditModal(true)
  }

  const handleSaveChanges = () => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, role: editFormData.role } : user,
      )
      setUsers(updatedUsers)
      setShowEditModal(false)
      setEditingUser(null)
      setEditFormData({ role: "" })
    }
  }

  const getRoleDisplayName = (role: string) => {
    return role
  }

  return (
    <div className="users-page">
      <div className="users-page__header">
        <h2>Users Management</h2>
        <div className="users-page__stats">
          <div className="users-stat">
            <span className="users-stat__label">Total Users:</span>
            <span className="users-stat__value">{users.length}</span>
          </div>
        </div>
      </div>

      <div className="users-page__table">
        <div className="users-table">
          <div className="users-table__header">
            <div className="users-table__row">
              <div className="users-table__cell users-table__cell--header">Username</div>
              <div className="users-table__cell users-table__cell--header">Email</div>
              <div className="users-table__cell users-table__cell--header">Role</div>
              <div className="users-table__cell users-table__cell--header users-table__cell--actions">Actions</div>
            </div>
          </div>
          <div className="users-table__body">
            {users.map((user) => (
              <div key={user.id} className="users-table__row">
                <div className="users-table__cell">
                  <div className="users-user-info">
                    <div className="users-user-info__name">{user.username}</div>
                    <div className="users-user-info__full-name">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </div>
                <div className="users-table__cell">{user.email}</div>
                <div className="users-table__cell">
                  <span className={`users-role-badge users-role-badge--${user.role}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
                <div className="users-table__cell users-table__cell--actions">
                  <button
                    className="users-action-btn users-action-btn--edit"
                    onClick={() => handleEditUser(user)}
                    title="Edit user"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {users.length === 0 && (
          <div className="users-empty">
            <p>No users found.</p>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="users-modal">
          <div className="users-modal__backdrop" onClick={() => setShowEditModal(false)} />
          <div className="users-modal__content">
            <div className="users-modal__header">
              <h3>Edit User</h3>
              <button className="users-modal__close" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="users-modal__body">
              <div className="users-form-group">
                <label htmlFor="editUsername">Username</label>
                <input
                  id="editUsername"
                  type="text"
                  className="users-input users-input--disabled"
                  value={editingUser.username}
                  disabled
                />
              </div>
              <div className="users-form-group">
                <label htmlFor="editEmail">Email</label>
                <input
                  id="editEmail"
                  type="email"
                  className="users-input users-input--disabled"
                  value={editingUser.email}
                  disabled
                />
              </div>
              <div className="users-form-group">
                <label htmlFor="editRole">Role</label>
                <select
                  id="editRole"
                  className="users-input"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="users-modal__footer">
              <button className="users-btn users-btn--secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="users-btn users-btn--primary" onClick={handleSaveChanges}>
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
