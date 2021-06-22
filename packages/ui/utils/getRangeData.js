import { getISOWeek, getMonth, getYear } from 'date-fns'
import Big from 'big.js'
import { RANGE_DATA } from '../constants'

export function getRangeData(data, range) {
  const finalResult = []
  // Define the key that the element should match to be included in the same group
  const rangeKeys = {
    [RANGE_DATA.week]: (value) => getISOWeek(new Date(value)),
    [RANGE_DATA.month]: (value) =>
      `${getMonth(new Date(value))}-${getYear(new Date(value))}`,
    [RANGE_DATA.year]: (value) => getYear(new Date(value)),
  }
  const rule = rangeKeys[range]

  // Organizes the array in separated object keys
  const newObject = data.reduce(function (obj, item) {
    const key = rule(item.time)

    // If the key doesn't exist yet, create it
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = []
    }

    // Push the value to the object
    obj[key].push(item)
    return obj
  }, {})

  // Iterates each of the groups created
  Object.keys(newObject).map((key) => {
    // Calculates de average value of each group
    const sum = newObject[key].reduce(function (sum, data) {
      return new Big(sum).plus(data.value)
    }, 0)
    const averageValue = new Big(sum).div(newObject[key].length).toFixed(2)

    // Pushes only one item from each of the groups created
    const data = {
      time: newObject[key][0].time,
      value: averageValue,
    }
    return finalResult.push(data)
  })
  return finalResult
}
