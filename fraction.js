// https://stackoverflow.com/questions/4652468/is-there-a-javascript-function-that-reduces-a-fraction
// Is that too lazy?
function reduce(fraction) {
    const gcd = function gcd(a,b) {
        return b ? gcd(b, a%b) : a
    }
    finalGcd = gcd(fraction.numerator, fraction.denominator);
    return { numerator: fraction.numerator / finalGcd, denominator: fraction.denominator / finalGcd }
}

// For whatever reason, the denominator could be negative. This will help.
function normalizeSign(fraction) {
    const multiplier = (fraction.denominator < 0) ? -1 : +1

    return { numerator: fraction.numerator * multiplier, denominator: fraction.denominator * multiplier }
}

function parse(fractionString) {
    const hasMixedDelimiter = fractionString.includes('_')
    const hasFractionDelimiter = fractionString.includes('/')
    const isNegative = fractionString[0] == '-'
    let whole = 0
    let numerator = 0
    let denominator = 1
    let fractionPart = fractionString

    if (isNegative) {
        fractionString = fractionString.substring(1)
        fractionPart = fractionString
    }

    if (!hasMixedDelimiter && !hasFractionDelimiter) {
        whole = parseInt(fractionString)
    }

    if (hasMixedDelimiter) {
        const parts = fractionString.split('_')
        whole = parseInt(parts[0])
        fractionPart = parts[1]
    }

    if (hasFractionDelimiter) {
        const parts = fractionPart.split('/')
        numerator = parseInt(parts[0])
        denominator = parseInt(parts[1])
    }

    return { numerator: (whole * denominator + numerator) * (isNegative ? -1 : +1), denominator: denominator }
}

function toString(fraction) {
    fraction = normalizeSign(fraction)

    let whole = null
    const isNegative = fraction.numerator < 0
    let numerator = Math.abs(fraction.numerator)
    let denominator = fraction.denominator
    let finalString = ""

    if ((numerator >= denominator) || (numerator == 0)) {
        whole = Math.floor(numerator / denominator)
        numerator = numerator % denominator
    }

    const hasFractionalPart = numerator > 0

    if (isNegative) {
        finalString += '-'
    }

    if (whole != null) {
        finalString += whole
        if (hasFractionalPart) {
            finalString += "_"
        }
    }

    if (hasFractionalPart) {
        finalString += numerator + "/" + denominator
    }

    return finalString
}

function evaluate(expression) {
    let parts = expression.split(/\s+/)

    if (parts.length != 3) {
        return("Invalid expression")
    }

    const fraction1 = parse(parts[0])
    const operation = parts[1]
    const fraction2 = parse(parts[2])
    let result = {}

    switch (operation) {
        case '*':
            result = { numerator: fraction1.numerator * fraction2.numerator, denominator: fraction1.denominator * fraction2.denominator }
            break

        case '/':
            result = { numerator: fraction1.numerator * fraction2.denominator, denominator: fraction1.denominator * fraction2.numerator }
            break

        case '+':
            result = {
                numerator: fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator,
                denominator: fraction1.denominator * fraction2.denominator }
            break;

        case '-':
            result = {
                numerator: fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator,
                denominator: fraction1.denominator * fraction2.denominator }
            break;
    
        default:
            return "Invalid expression"
    }

    return toString(reduce(result))
}

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
exports.evaluate = evaluate
exports.parse = parse
exports.reduce = reduce
exports.toString = toString