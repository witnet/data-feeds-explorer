import { containFalsyValues } from '../src/repository/containFalsyValues'

describe('containFalsyValues', () => {
  it('should return FALSE when no falsy value is found on the object', () => {
    const obj = {
      a: 'a',
      b: 'b',
    }

    expect(containFalsyValues(obj)).toBe(false)
  })

  it('should return TRUE when falsy value is found on the object', () => {
    const obj = {
      a: 'a',
      b: null,
    }

    expect(containFalsyValues(obj)).toBe(true)
  })
})
