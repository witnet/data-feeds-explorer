import { getRangeData } from '../../utils/getRangeData'
import { CHART_UNITS } from '../../constants'

describe('getRangeData', () => {
  test('getWeeklyData', () => {
    const data = [
      // 2018/11/18
      { time: 1542400000, value: '26.19' },
      // 2018/11/23
      { time: 1542927601, value: '25.83' },
      // 2018/11/24
      { time: 1543014001, value: '25.78' },
      // 2018/11/25
      { time: 1543100401, value: '25.82' },
      // 2018/11/29
      { time: 1543446001, value: '25.82' },
      // 2018/11/30
      { time: 1543532401, value: '25.71' },
      // 2018/12/2
      { time: 1543705201, value: '25.74' },
      // 2018/12/5
      { time: 1543964401, value: '25.81' },
      // 2018/12/6
      { time: 1544050801, value: '25.75' },
      // 2018/12/7
      { time: 1544137201, value: '25.73' },
      // 2018/12/8
      { time: 1544223601, value: '25.75' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    const expected = [
      // 2018/11/18
      { time: 1542400000, value: '26.19' },
      // 2018/11/23
      { time: 1542927601, value: '25.81' },
      // 2018/11/29
      { time: 1543446001, value: '25.76' },
      // 2018/12/5
      { time: 1543964401, value: '25.76' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    expect(getRangeData(data, CHART_UNITS.week)).toStrictEqual(expected)
  })
  test('getMonthlyData', () => {
    const data = [
      // 2018/11/19
      { time: 1542582001, value: '26.19' },
      // 2018/11/22
      { time: 1542841201, value: '25.87' },
      // 2018/11/23
      { time: 1542927601, value: '25.83' },
      // 2018/11/24
      { time: 1543014001, value: '25.78' },
      // 2018/11/25
      { time: 1543100401, value: '25.82' },
      // 2018/11/26
      { time: 1543186801, value: '25.81' },
      // 2018/11/29
      { time: 1543446001, value: '25.82' },
      // 2018/11/30
      { time: 1543532401, value: '25.71' },
      // 2018/12/2
      { time: 1543705201, value: '25.74' },
      // 2018/12/5
      { time: 1543964401, value: '25.81' },
      // 2018/12/6
      { time: 1544050801, value: '25.75' },
      // 2018/12/7
      { time: 1544137201, value: '25.73' },
      // 2018/12/8
      { time: 1544223601, value: '25.75' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    const expected = [
      // 2018/11/19
      { time: 1542582001, value: '25.85' },
      // 2018/12/1
      { time: 1543705201, value: '25.76' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    expect(getRangeData(data, CHART_UNITS.month)).toStrictEqual(expected)
  })
  test('getYearlyData', () => {
    const data = [
      // 2018/11/19
      { time: 1542582001, value: '26.19' },
      // 2018/11/22
      { time: 1542841201, value: '25.87' },
      // 2018/11/23
      { time: 1542927601, value: '25.83' },
      // 2018/11/24
      { time: 1543014001, value: '25.78' },
      // 2018/11/25
      { time: 1543100401, value: '25.82' },
      // 2018/11/26
      { time: 1543186801, value: '25.81' },
      // 2018/11/29
      { time: 1543446001, value: '25.82' },
      // 2018/11/30
      { time: 1543532401, value: '25.71' },
      // 2018/12/2
      { time: 1543705201, value: '25.74' },
      // 2018/12/5
      { time: 1543964401, value: '25.81' },
      // 2018/12/6
      { time: 1544050801, value: '25.75' },
      // 2018/12/7
      { time: 1544137201, value: '25.73' },
      // 2018/12/8
      { time: 1544223601, value: '25.75' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    const expected = [
      // 2018/11/19
      { time: 1542582001, value: '25.82' },
      // 2019/12/8
      { time: 1575759601, value: '25.75' },
    ]
    expect(getRangeData(data, CHART_UNITS.year)).toStrictEqual(expected)
  })
})
