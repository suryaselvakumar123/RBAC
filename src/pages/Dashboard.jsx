import { useQuery } from '@tanstack/react-query'
import { users, roles, permissions } from '../services/api'
import { UsersIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-2xl font-semibold text-gray-700">{value}</p>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
  })

  const { data: rolesData } = useQuery({
    queryKey: ['roles'],
    queryFn: roles.getAll,
  })

  const { data: permissionsData } = useQuery({
    queryKey: ['permissions'],
    queryFn: permissions.getAll,
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={usersData?.length || 0}
          icon={UsersIcon}
        />
        <StatCard
          title="Total Roles"
          value={rolesData?.length || 0}
          icon={KeyIcon}
        />
        <StatCard
          title="Total Permissions"
          value={permissionsData?.length || 0}
          icon={ShieldCheckIcon}
        />
      </div>
    </div>
  )
}

export default Dashboard