export const Notification = ({ text, type }) => {
  if (text === null) return
  return <div className={type}>{text}</div>
}
