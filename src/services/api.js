import axios from 'axios'
import useAuthStore from '../store/authStore'
import { create } from 'zustand'

// Create a store for managing mock data
const useMockStore = create((set) => ({
  users: [
    { id: 1, name: 'Admin User', email: 'admin@example.com', status: 'active', role: 'admin' },
    { id: 2, name: 'Editor User', email: 'editor@example.com', status: 'active', role: 'editor' },
    { id: 3, name: 'Viewer User', email: 'viewer@example.com', status: 'inactive', role: 'viewer' },
    { id: 4, name: 'Arun Kumar', email: 'arun.kumar@example.com', status: 'active', role: 'admin' },
    { id: 5, name: 'Meena Ramesh', email: 'meena.ramesh@example.com', status: 'inactive', role: 'editor' },
    { id: 6, name: 'Karthik Subramani', email: 'karthik.subramani@example.com', status: 'active', role: 'viewer' },
    { id: 7, name: 'Priya Vishwanath', email: 'priya.vishwanath@example.com', status: 'inactive', role: 'admin' },
    { id: 8, name: 'Suresh Iyer', email: 'suresh.iyer@example.com', status: 'active', role: 'editor' },
    { id: 9, name: 'Lakshmi Narayanan', email: 'lakshmi.narayanan@example.com', status: 'inactive', role: 'viewer' },
    { id: 10, name: 'Vigneshwaran', email: 'vigneshwaran@example.com', status: 'active', role: 'editor' },
    { id: 11, name: 'Revathi Krishnan', email: 'revathi.krishnan@example.com', status: 'inactive', role: 'viewer' }
  ],
  roles: [
    { 
      id: 1, 
      name: 'admin', 
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
      description: 'Full access to all features'
    },
    { 
      id: 2, 
      name: 'editor', 
      permissions: ['read', 'write'],
      description: 'Can read and modify content'
    },
    { 
      id: 3, 
      name: 'viewer', 
      permissions: ['read'],
      description: 'Can only view content'
    },
  ],
  permissions: [
    { id: 1, name: 'read', description: 'Can read content' },
    { id: 2, name: 'write', description: 'Can create and edit content' },
    { id: 3, name: 'delete', description: 'Can delete content' },
    { id: 4, name: 'manage_users', description: 'Can manage users' },
    { id: 5, name: 'manage_roles', description: 'Can manage roles and permissions' },
  ],
  updateUsers: (users) => set({ users }),
  updateRoles: (roles) => set({ roles }),
}))

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const auth = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { users } = useMockStore.getState()
    const user = users.find(u => u.email === credentials.email)
    if (user && credentials.password === 'admin') {
      return { user, token: 'mock-token' }
    }
    throw new Error('Invalid credentials')
  },
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { users, updateUsers } = useMockStore.getState()
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists')
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      status: 'active',
      role: 'viewer', // Default role for new users
    }

    // Update users store
    updateUsers([...users, newUser])

    // Return user data and token
    return { user: newUser, token: 'mock-token' }
  }
}

// Users endpoints
export const users = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return useMockStore.getState().users
  },
  create: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { users, updateUsers } = useMockStore.getState()
    const newUser = { ...userData, id: Date.now() }
    updateUsers([...users, newUser])
    return newUser
  },
  update: async (id, userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { users, updateUsers } = useMockStore.getState()
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    )
    updateUsers(updatedUsers)
    return userData
  },
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { users, updateUsers } = useMockStore.getState()
    updateUsers(users.filter(user => user.id !== id))
    return true
  },
}

// Roles endpoints
export const roles = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return useMockStore.getState().roles
  },
  create: async (roleData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { roles, updateRoles } = useMockStore.getState()
    const newRole = { ...roleData, id: Date.now() }
    updateRoles([...roles, newRole])
    return newRole
  },
  update: async (id, roleData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { roles, updateRoles } = useMockStore.getState()
    const updatedRoles = roles.map(role => 
      role.id === id ? { ...role, ...roleData } : role
    )
    updateRoles(updatedRoles)
    return roleData
  },
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { roles, updateRoles } = useMockStore.getState()
    updateRoles(roles.filter(role => role.id !== id))
    return true
  },
}

// Permissions endpoints
export const permissions = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return useMockStore.getState().permissions
  },
}

export default api