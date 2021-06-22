import { getRangeData } from '../../utils/getRangeData'
import { CHART_UNITS } from '../../constants'

describe('getRangeData', () => {
  test('getWeeklyData', () => {
    const data = [
      { time: '2018-10-19', value: '26.19' },
      { time: '2018-10-22', value: '25.87' },
      { time: '2018-10-23', value: '25.83' },
      { time: '2018-10-24', value: '25.78' },
      { time: '2018-10-25', value: '25.82' },
      { time: '2018-10-26', value: '25.81' },
      { time: '2018-10-29', value: '25.82' },
      { time: '2018-10-30', value: '25.71' },
      { time: '2018-10-31', value: '25.82' },
      { time: '2018-11-01', value: '25.72' },
      { time: '2018-11-02', value: '25.74' },
      { time: '2018-11-05', value: '25.81' },
      { time: '2018-11-06', value: '25.75' },
      { time: '2018-11-07', value: '25.73' },
      { time: '2018-11-08', value: '25.75' },
      { time: '2019-11-08', value: '25.75' },
    ]
    const expected = [
      { time: '2018-10-19', value: '26.19' },
      { time: '2018-10-22', value: '25.82' },
      { time: '2018-10-29', value: '25.76' },
      { time: '2018-11-05', value: '25.76' },
    ]
    expect(getRangeData(data, CHART_UNITS.week)).toStrictEqual(expected)
  })
  test('getMonthlyData', () => {
    const data = [
      { time: '2018-10-19', value: '26.19' },
      { time: '2018-10-22', value: '25.87' },
      { time: '2018-10-23', value: '25.83' },
      { time: '2018-10-24', value: '25.78' },
      { time: '2018-10-25', value: '25.82' },
      { time: '2018-10-26', value: '25.81' },
      { time: '2018-10-29', value: '25.82' },
      { time: '2018-10-30', value: '25.71' },
      { time: '2018-10-31', value: '25.82' },
      { time: '2018-11-01', value: '25.72' },
      { time: '2018-11-02', value: '25.74' },
      { time: '2018-11-05', value: '25.81' },
      { time: '2018-11-06', value: '25.75' },
      { time: '2018-11-07', value: '25.73' },
      { time: '2018-11-08', value: '25.75' },
      { time: '2019-11-08', value: '25.75' },
    ]
    const expected = [
      { time: '2018-10-19', value: '25.85' },
      { time: '2018-11-01', value: '25.75' },
      { time: '2019-11-08', value: '25.75' },
    ]
    expect(getRangeData(data, CHART_UNITS.month)).toStrictEqual(expected)
  })
  test('getYearlyData', () => {
    const data = [
      { time: '2018-10-19', value: '26.19' },
      { time: '2018-10-22', value: '25.87' },
      { time: '2018-10-23', value: '25.83' },
      { time: '2018-10-24', value: '25.78' },
      { time: '2018-10-25', value: '25.82' },
      { time: '2018-10-26', value: '25.81' },
      { time: '2018-10-29', value: '25.82' },
      { time: '2018-10-30', value: '25.71' },
      { time: '2018-10-31', value: '25.82' },
      { time: '2018-11-01', value: '25.72' },
      { time: '2018-11-02', value: '25.74' },
      { time: '2018-11-05', value: '25.81' },
      { time: '2018-11-06', value: '25.75' },
      { time: '2018-11-07', value: '25.73' },
      { time: '2018-11-08', value: '25.75' },
      { time: '2019-11-08', value: '25.75' },
    ]
    const expected = [
      { time: '2018-10-19', value: '25.81' },
      { time: '2019-11-08', value: '25.75' },
    ]
    expect(getRangeData(data, CHART_UNITS.year)).toStrictEqual(expected)
  })
})
