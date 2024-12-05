export const sortData = (data, { field, direction }) => {
  return [...data].sort((a, b) => {
    const aValue = a[field]?.toLowerCase?.() ?? a[field]
    const bValue = b[field]?.toLowerCase?.() ?? b[field]

    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    }
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
  })
}

export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      const itemValue = item[key]?.toLowerCase?.() ?? item[key]
      return itemValue?.toString().toLowerCase().includes(value.toLowerCase())
    })
  })
}