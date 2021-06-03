// crop string to selected number of caracters
export function cropString(string, caracters, position) {
  if (string) {
    if (position === 'middle') {
      const middlePosition = Math.floor(caracters / 2)
      return string.length > caracters
        ? `${string.substring(0, middlePosition)}...${string.substring(
            string.length - middlePosition,
            string.length
          )}`
        : string
    } else {
      return string.length > caracters
        ? `${string.substring(0, caracters)}...`
        : string
    }
  } else {
    return ''
  }
}
