const fs = require('fs')
const path = require('path')

// Require the framework and instantiate it
const app = require('fastify')({
    logger: true,
    /*http2: true,
    https: {
    key: fs.readFileSync(path.join(__dirname, './../../ssl/', 'keys', 'b50e1_531d5_9aeb5e1e77b5417ca98f9ce688790876.key')),
    cert: fs.readFileSync(path.join(__dirname, './../../ssl/', 'certs', 'nuxt_getdemo_dev_b50e1_531d5_1629244799_b091936f52e600bb51995f5ce27294cd.crt'))
    }*/
})



// Declare a route
app.get('/', function (req, reply) {

    let data = "<h1>Testing</h1>";

    return  reply.type('text/html').send(data);
})

// Declare a route
app.get('/p', function (req, reply) {

    var svg = require('svg-builder')
        .width(125)
        .height(125);

    var logo = svg
        .circle({
            r: 40,
            fill: 'none',
            'stroke-width': 1,
            stroke: '#CB3728',
            cx: 42,
            cy: 82
        }).circle({
            r: 40,
            fill: 'none',
            'stroke-width': 1,
            stroke: '#3B92BC',
            cx: 84,
            cy: 82
        }).text({
            x: 10,
            y: 20,
            'font-family': 'helvetica',
            'font-size': 15,
            stroke : '#fff',
            fill: '#fff'
        }, 'My logo').render();

    return  reply.type('image/svg+xml').send(logo);
})


// Run the server!
//app.listen(80, 'getsrc.ondigitalocean.app', (err, address) => {
app.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    //app.log.info(`server listening on ${address}`)
})