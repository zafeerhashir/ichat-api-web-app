export const getInitials = (text: string) => {
  const usernameInitialLetters = `${text.charAt(0).toUpperCase()}${text.charAt(1).toLocaleUpperCase()}`;
  return usernameInitialLetters
}

export const formatUsername = (text: string) => {
  const  formatUsername = `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
  return formatUsername
}