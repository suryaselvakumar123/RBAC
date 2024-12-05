import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/outline'

function FilterDropdown({ options, value, onChange, label }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <FunnelIcon className="h-4 w-4 mr-2" />
        {label}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <Menu.Item>
              <button
                className={`block px-4 py-2 text-sm w-full text-left ${
                  !value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                }`}
                onClick={() => onChange(null)}
              >
                All
              </button>
            </Menu.Item>
            {options.map((option) => (
              <Menu.Item key={option.value}>
                <button
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    value === option.value
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700'
                  }`}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default FilterDropdown