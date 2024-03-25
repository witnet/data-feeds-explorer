export function formatNumber(num: string): string {
  const parsedNum = parseFloat(num).toString()
  const splitedNumber = parsedNum.split('.')
  parseFloat(`0.${splitedNumber[1]}`)
  const decimals = splitedNumber.length > 1 ? '.' + splitedNumber[1] : ''
  const rgx = /(\d)(?=(\d{3})+(?!\d))/g
  const unit = splitedNumber[0].replace(rgx, '$1,')
  return unit + decimals
}
