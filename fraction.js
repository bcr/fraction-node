function parse(fractionString) {
    const hasWhole = fractionString.includes('_')
    const hasFraction = fractionString.includes('/')
    let whole = 0
    let numerator = 0
    let denominator = 1
    let fractionPart = fractionString

    if (hasWhole) {
        const parts = fractionString.split('_')
        whole = parseInt(parts[0])
        fractionPart = parts[1]
    }

    if (hasFraction) {
        const parts = fractionPart.split('/')
        numerator = parseInt(parts[0])
        denominator = parseInt(parts[1])
    }

    return { numerator: whole * denominator + numerator, denominator: denominator }
}

function evaluate(expression) {
    let parts = expression.split(/\s+/)
    const fraction1 = parse(parts[0])
    const operation = parts[1]
    const fraction2 = parse(parts[2])

    return fraction2
}

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
exports.evaluate = evaluate
exports.parse = parse