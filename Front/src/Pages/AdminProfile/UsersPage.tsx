"use client"

import React, { useState } from "react"
import {
    useGetAllUsersQuery,
    usePromoteUserMutation,
} from "../../redux/admin/adminApi"
import "./UsersPage.scss"

const UsersPage: React.FC = () => {
    const { data: users = [], isLoading, isError } = useGetAllUsersQuery()
    const [promoteUser] = usePromoteUserMutation()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<{
        id: number
        email: string
        firstName: string
        lastName: string
        role: "buyer" | "seller" | "admin"
    } | null>(null)
    const [editRole, setEditRole] = useState<"buyer" | "seller" | "admin">("buyer")

    const handleEditUser = (user: typeof editingUser) => {
        if (!user) return
        setEditingUser(user)
        setEditRole(user.role)
        setIsEditModalOpen(true)
    }

    const handleSaveUser = async () => {
        if (!editingUser) return
        try {
            await promoteUser({
                userId: editingUser.id,
                role: editRole,
            }).unwrap()
            setIsEditModalOpen(false)
            setEditingUser(null)
        } catch (error) {
            console.error("Failed to promote user:", error)
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
            case "admin":
                return "role-badge role-admin"
            default:
                return "role-badge"
        }
    }

    if (isLoading) return <div className="users-page">Loading users...</div>
    if (isError) return <div className="users-page">Failed to load users</div>

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
                                        <div className="user-name">{user.email.split("@")[0]}</div>
                                        <div className="user-full-name">{user.firstName} {user.lastName}</div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
                                </td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEditUser(user)}
                                    >
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
                                <input
                                    type="text"
                                    value={editingUser.email.split("@")[0]}
                                    disabled
                                    className="form-input disabled"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    disabled
                                    className="form-input disabled"
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={editRole}
                                    onChange={(e) =>
                                        setEditRole(e.target.value as "buyer" | "seller" | "admin")
                                    }
                                    className="form-select"
                                >
                                    <option value="buyer">buyer</option>
                                    <option value="seller">seller</option>
                                    <option value="admin">admin</option>
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
