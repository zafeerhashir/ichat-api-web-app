
export const formatMonthYear = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day] = formattedDate.split('/');
  const monthYear = `${month}/${day}`
  return monthYear;

}