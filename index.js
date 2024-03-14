const http = require('http');
const seneca = require('seneca')()

// /* producer */
// seneca.add({ role: 'math', cmd: 'sum' }, (msg, res) => {
//     let sum = msg.left + msg.right
//     res(
//         null, // error first callback
//         { answer: sum }
//     )
// })

// seneca.add({ role: 'math', cmd: 'product' }, (msg, res) => {
//     let product = msg.left * msg.right
//     res(null, { answer: product })
// })

// /* consumer
//     we ask Seneca to resolve the component for us through the use of an interface, in this case, a JSON message. This is inversion of control.
// */
// seneca.act({ role: 'math', cmd: 'sum', left: 1, right: 2 }, console.log)
// seneca.act({ role: 'math', cmd: 'product', left: 3, right: 4 }, console.log)

const server = http.createServer((req, res) => {
    console.log('called')
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n")
})

server.listen(8000)
