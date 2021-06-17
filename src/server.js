const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const common = require('./Common')

//let host = 'http://127.0.0.1:4000';
let host = 'https://getsrc-3o9kb.ondigitalocean.app';
let assets = {
    host: host,
}

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
    let data = fs.readFileSync(__dirname+'/pages/index.html.ejs').toString();

    let html = ejs.render(data, assets);

    return  reply.type('text/html').send(html);
})


// Declare a route
app.get('/p', function (req, reply) {
    let src = common.getSvg(req.params);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width', function (req, reply) {
    let src = common.getSvg(req.params);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height', function (req, reply) {
    let src = common.getSvg(req.params);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height/:color', function (req, reply) {
    let src = common.getSvg(req.params);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height/:color/:type', function (req, reply) {
    let src = common.getSvg(req.params);
    return  reply.type('image/svg+xml').send(src);
})


// Run the server!
//app.listen(4000,  (err, address) => {

/*
GitHub
 */
app.listen(8080, '0.0.0.0', (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    //app.log.info(`server listening on ${address}`)
})