const seneca = require('seneca')()
const plugin = require('./plugin')
seneca.use(plugin)
seneca.use('mongo-store', {
    name: 'seneca',
    host: '127.0.0.1',
    port: '27017'
})

seneca.ready(err => {
    seneca.act('role:web', {
        // execute the role:web action, indicating the configuration.
        use: {
            prefix: '/products', // specifies to use a /products prefix for all the URLs
            pin: { area: 'product', action: '*' }, // pins the action with a matching {area: "product", action: "*"} pattern
            // /products/fetch endpoint will correspond to the {area: 'products', action: 'fetch'} pattern
            map: {
                fetch: { GET: true },
                edit: { GET: false, POST: true },
                delete: { GET: false, DELETE: true }
            }
        }
    })
    const express = require('express')
    const app = express()
    app.use(require('body-parser').json())
    app.use(seneca.export('web'))
    app.listen(3000)
})
