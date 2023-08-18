export const getInitials = (text: string) => {
  const usernameInitialLetters = `${text.charAt(0).toUpperCase()}${text.charAt(1).toLocaleUpperCase()}`;
  return usernameInitialLetters
}

export const formatUsername = (text: string) => {
  const  formatUsername = `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
  return formatUsername
}

export const formatMonthYear = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day] = formattedDate.split('/');
  const monthYear = `${month}/${day}`
  return monthYear;
}