const fraction = require('./fraction');

test('does nothing', () => {
})

test('computes first example', () => {
    expect(fraction.evaluate('1/2 * 3_3/4')).toBe('1_7/8')
})
