import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { users, roles } from '../services/api'
import Table from '../components/Table'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import FilterDropdown from '../components/FilterDropdown'
import { useSort } from '../hooks/useSort'
import { useFilter } from '../hooks/useFilter'

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

function Users() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
  })

  const { data: rolesData } = useQuery({
    queryKey: ['roles'],
    queryFn: roles.getAll,
  })

  const { sortedData, sortConfig, requestSort } = useSort(usersData || [])
  const { filteredData, filters, updateFilter } = useFilter(sortedData)

  const createMutation = useMutation({
    mutationFn: users.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => users.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsModalOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: users.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredAndSearchedData = filteredData.filter(user => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    )
  })

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, user) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {value.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    if (selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <button
          onClick={() => {
            setSelectedUser(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary"
        >
          Add User
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search users..."
          />
        </div>
        <FilterDropdown
          options={roleOptions}
          value={filters.role}
          onChange={(value) => updateFilter('role', value)}
          label="Filter by Role"
        />
        <FilterDropdown
          options={statusOptions}
          value={filters.status}
          onChange={(value) => updateFilter('status', value)}
          label="Filter by Status"
        />
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <Table
          columns={columns}
          data={filteredAndSearchedData}
          sortConfig={sortConfig}
          onSort={requestSort}
          onEdit={(user) => {
            setSelectedUser(user)
            setIsModalOpen(true)
          }}
          onDelete={(user) => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              deleteMutation.mutate(user.id)
            }
          }}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={selectedUser?.name}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={selectedUser?.email}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue={selectedUser?.role}
              className="input mt-1"
              required
            >
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={selectedUser?.status}
              className="input mt-1"
              required
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Saving...'
                : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Users