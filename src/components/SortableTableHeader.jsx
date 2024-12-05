import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

function SortableTableHeader({ label, field, sortConfig, onSort }) {
  const direction = sortConfig.field === field ? sortConfig.direction : null

  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronUpIcon 
            className={`h-3 w-3 ${direction === 'asc' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <ChevronDownIcon 
            className={`h-3 w-3 ${direction === 'desc' ? 'text-blue-500' : 'text-gray-400'}`}
          />
        </div>
      </div>
    </th>
  )
}

export default SortableTableHeader