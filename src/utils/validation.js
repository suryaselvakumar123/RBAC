export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

export const getValidationError = (field, value) => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email format'
      return null
    case 'password':
      if (!value) return 'Password is required'
      if (!validatePassword(value)) return 'Password must be at least 8 characters'
      return null
    case 'name':
      if (!value) return 'Name is required'
      if (!validateName(value)) return 'Name must be at least 2 characters'
      return null
    default:
      return null
  }
}