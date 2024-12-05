import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  KeyIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Users', to: '/users', icon: UsersIcon },
  { name: 'Roles', to: '/roles', icon: KeyIcon },
  { name: 'Permissions', to: '/permissions', icon: ShieldCheckIcon },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold text-white">RBAC System</h1>
      </div>
      <nav className="mt-6">
        <div className="space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar