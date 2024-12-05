import { useState } from 'react'
import { sortData } from '../utils/sorting'

export function useSort(initialData) {
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null })

  const sortedData = sortConfig.field
    ? sortData(initialData, sortConfig)
    : initialData

  const requestSort = (field) => {
    setSortConfig(current => ({
      field,
      direction:
        current.field === field && current.direction === 'asc'
          ? 'desc'
          : 'asc',
    }))
  }

  return { sortedData, sortConfig, requestSort }
}