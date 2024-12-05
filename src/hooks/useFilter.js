import { useState, useMemo } from 'react'
import { filterData } from '../utils/sorting'

export function useFilter(data) {
  const [filters, setFilters] = useState({})

  const filteredData = useMemo(() => {
    return filterData(data, filters)
  }, [data, filters])

  const updateFilter = (field, value) => {
    setFilters(current => ({
      ...current,
      [field]: value,
    }))
  }

  return { filteredData, filters, updateFilter }
}