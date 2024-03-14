const plugin = function (options) {
    const seneca = this;

    /*
        fetch the list of all the products
    */
    seneca.add({ area: 'product', actions: 'fetch' }, (args, done) => {
        const products = this.make('products')
        products.list$({}, done)
    })

    /*
        fetch the list of products by category
    */
    seneca.add({ area: 'product', action: 'fetch', criteria: 'byCategory' }, (args, done) => {
        const products = this.make('products')
        products.list$({ category: args.category }, done)
    })

    /*
        fetch a product by id
    */
    seneca.add({ area: 'product', action: 'fetch', criteria: 'byId' }, (args, done) => {
        const product = this.make("products")
        product.load$(args.id, done)
    })

    /*
        adds a product
    */
    seneca.add({ area: 'product', action: 'add' }, (args, done) => {
        const products = this.make('products')
        products.category = args.category
        products.name = args.name
        products.description = args.description
        products.category = args.category
        products.price = args.price
        products.save$((err, product) => done(err, product.data$(false)))
    })

    /*
        remove a product by id
    */
    seneca.add({ area: 'product', action: 'remove' }, (args, done) => {
        const product = this.make('products')
        product.remove$(args.id, err => done(err, null))
    })

    /*
        edits a product by fetching by id first
    */
    seneca.add({ area: 'product', action: 'edit' }, (args, done) => {
        seneca.act({ area: 'product', action: 'fetch', criteria: 'byId', id: args.id }, (err, result) => {
            result.data$(
                {
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    price: args.price
                }
            )
            result.save$((err, product) => {
                done(err, product.data$(false))
            })
        })
    })
}

module.exports = plugin
