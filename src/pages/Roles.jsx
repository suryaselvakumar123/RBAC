import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { roles, permissions } from '../services/api'
import Modal from '../components/Modal'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

function RolesList({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-50 py-3 px-4 text-sm font-medium text-gray-500 border-b">
        <div className="col-span-3">ROLE NAME</div>
        <div className="col-span-7">PERMISSIONS</div>
        <div className="col-span-2 text-right">ACTIONS</div>
      </div>
      <div className="divide-y">
        {data.map((role) => (
          <div key={role.id} className="grid grid-cols-12 py-4 px-4 items-center">
            <div className="col-span-3 font-medium">{role.name}</div>
            <div className="col-span-7">
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(role)}
                className="p-1 text-gray-400 hover:text-blue-500"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(role)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Roles() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  const { data: rolesData } = useQuery({
    queryKey: ['roles'],
    queryFn: roles.getAll,
  })

  const { data: permissionsData } = useQuery({
    queryKey: ['permissions'],
    queryFn: permissions.getAll,
  })

  const createMutation = useMutation({
    mutationFn: roles.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles'])
      setIsModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => roles.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['roles'])
      setIsModalOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: roles.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles'])
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      permissions: Array.from(formData.getAll('permissions')),
    }

    if (selectedRole) {
      updateMutation.mutate({ id: selectedRole.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <button
          onClick={() => {
            setSelectedRole(null)
            setIsModalOpen(true)
          }}
          className="btn btn-primary"
        >
          Add Role
        </button>
      </div>

      {rolesData && (
        <RolesList
          data={rolesData}
          onEdit={(role) => {
            setSelectedRole(role)
            setIsModalOpen(true)
          }}
          onDelete={(role) => {
            if (window.confirm('Are you sure you want to delete this role?')) {
              deleteMutation.mutate(role.id)
            }
          }}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRole ? 'Edit Role' : 'Add Role'}
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
              defaultValue={selectedRole?.name}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={selectedRole?.description}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {permissionsData?.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    name="permissions"
                    value={permission.name}
                    defaultChecked={selectedRole?.permissions?.includes(permission.name)}
                    className="rounded border-gray-300 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700">{permission.description}</span>
                </label>
              ))}
            </div>
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

export default Roles