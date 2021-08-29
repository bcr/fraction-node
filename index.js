const fraction = require('./fraction')
const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout)

rl.setPrompt("? ")
rl.prompt()

rl.on('line', function(line) {
    console.log("=", fraction.evaluate(line))
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});
