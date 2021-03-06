const fraction = require('./fraction');

describe("evaluate", () => {
    describe("examples", () => {
        test('computes first example', () => {
            expect(fraction.evaluate('1/2 * 3_3/4')).toBe('1_7/8')
        })

        test('computes second example', () => {
            expect(fraction.evaluate('2_3/8 + 9/8')).toBe('3_1/2')
        })
    })

    test('addition', () => {
        expect(fraction.evaluate('1/3 + 1/2')).toBe('5/6')
    })

    test('subtraction', () => {
        expect(fraction.evaluate('1/2 - 1/3')).toBe('1/6')
    })

    test('multiplication', () => {
        expect(fraction.evaluate('1/2 * 1/3')).toBe('1/6')
    })

    test('division', () => {
        expect(fraction.evaluate('1/2 / 1/3')).toBe('1_1/2')
    })

    test('negative division', () => {
        expect(fraction.evaluate('-1/2 / 1/3')).toBe('-1_1/2')
    })

    test('negative result', () => {
        expect(fraction.evaluate('1 - 2')).toBe('-1')
    })

    describe('invalid inputs', () => {
        const testValues = ["cheese", "1 % 2"]
        testValues.forEach(value => {
            it(`should not work with '${value}'`, () => {
                expect(fraction.evaluate(value)).toBe('Invalid expression')
            })
        })
    })
})

describe("parse", () => {
    test('parses fraction', () => {
        expect(fraction.parse('1/2')).toStrictEqual({ numerator: 1, denominator: 2 })
    })

    test('parses negative fraction', () => {
        expect(fraction.parse('-1/2')).toStrictEqual({ numerator: -1, denominator: 2 })
    })

    test('parses mixed number', () => {
        expect(fraction.parse('3_3/4')).toStrictEqual({ numerator: 15, denominator: 4 })
    })

    test('parses negative mixed number', () => {
        expect(fraction.parse('-3_3/4')).toStrictEqual({ numerator: -15, denominator: 4 })
    })

    test('parses whole number', () => {
        expect(fraction.parse('3')).toStrictEqual({ numerator: 3, denominator: 1 })
    })
})

describe("toString", () => {
    describe("whole numbers", () => {
        const testValues = [0, 1, 2]
        testValues.forEach(value => {
            it(`should work with ${value}`, () => {
                expect(fraction.toString({ numerator: value, denominator: 1 })).toBe(value.toString())
            })
        })
    })
})
