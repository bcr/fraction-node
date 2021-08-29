const fraction = require('./fraction');

test('does nothing', () => {
})

test.skip('computes first example', () => {
    expect(fraction.evaluate('1/2 * 3_3/4')).toBe('1_7/8')
})

test.skip('computes second example', () => {
    expect(fraction.evaluate('2_3/8 + 9/8')).toBe('3_1/2')
})

test('parses fraction', () => {
    expect(fraction.parse('1/2')).toStrictEqual({ numerator: 1, denominator: 2 })
})

test('parses mixed number', () => {
    expect(fraction.parse('3_3/4')).toStrictEqual({ numerator: 15, denominator: 4 })
})