import { useQuery } from '@tanstack/react-query'
import { roles, permissions } from '../services/api'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

function PermissionCard({ name, roles: assignedRoles }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="mr-2 text-blue-600">🔑</span>
        {name}
      </h3>
      <div>
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Assigned Roles:</p>
        <div className="flex flex-wrap gap-2">
          {assignedRoles.map((role) => (
            <span
              key={role}
              className="px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function RolePermissionMatrix({ roles: rolesData, permissions: permissionsData }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Role
            </th>
            {permissionsData.map((permission) => (
              <th
                key={permission.name}
                className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              >
                {permission.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rolesData.map((role) => (
            <tr key={role.name} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                {role.name}
              </td>
              {permissionsData.map((permission) => (
                <td key={permission.name} className="px-6 py-4 whitespace-nowrap text-center">
                  {role.permissions.includes(permission.name) ? (
                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto animate-fadeIn" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 text-red-400 mx-auto animate-fadeIn" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Permissions() {
  const { data: permissionsData } = useQuery({
    queryKey: ['permissions'],
    queryFn: permissions.getAll,
  })

  const { data: rolesData } = useQuery({
    queryKey: ['roles'],
    queryFn: roles.getAll,
  })

  if (!permissionsData || !rolesData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-gray-500 text-lg">Loading permissions...</div>
      </div>
    )
  }

  const getAssignedRoles = (permissionName) => {
    return rolesData
      .filter((role) => role.permissions.includes(permissionName))
      .map((role) => role.name)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <ShieldCheckIcon className="h-10 w-10 text-blue-600 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-900">Permissions Dashboard</h1>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center border-b pb-2 border-gray-200">
          <span className="mr-3 text-lg">🔐</span>
          Available Permissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permissionsData.map((permission) => (
            <PermissionCard
              key={permission.name}
              name={permission.name}
              roles={getAssignedRoles(permission.name)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center border-b pb-2 border-gray-200">
          <span className="mr-3 text-lg">📊</span>
          Role-Permission Matrix
        </h2>
        <RolePermissionMatrix
          roles={rolesData}
          permissions={permissionsData}
        />
      </div>
    </div>
  )
}

export default Permissions