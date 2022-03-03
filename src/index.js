const fs = require('fs')
const Pusher = require("pusher")
const path = require('path')
const ejs = require('ejs')
const { Readable } = require('stream')


const common = require('./Common')

let is_production;

is_production = false;  // for development
is_production = true //for live site

let host = 'http://127.0.0.1:4000';

if(is_production)
{
    host = 'https://img.site';
}
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
});

app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
    list: true
});

// Declare a route
app.get('/', function (req, reply) {
    let data = fs.readFileSync(__dirname+'/pages/index.html.ejs').toString();

    let html = ejs.render(data, assets);

    return  reply.type('text/html').send(html);
})


// Declare a route
app.get('/p', function (req, reply) {
    let src = common.getSvg(req);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width', function (req, reply) {
    let src = common.getSvg(req);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height', function (req, reply) {
    let src = common.getSvg(req);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height/:color', function (req, reply) {
    let src = common.getSvg(req);
    return  reply.type('image/svg+xml').send(src);
})

app.get('/p/:width/:height/:color/:type', function (req, reply) {
    let src = common.getSvg(req);
    return  reply.type('image/svg+xml').send(src);
})


//--------------------------------------------------

app.get('/api/send', function (req, reply)
{


    let response = {};

    const inputs = req.query;

    if(
        !inputs.training_record_id
        || !inputs.training_center_id
        || !inputs.training_center_name
        || !inputs.horse_id
        || !inputs.horse_name
        || !inputs.heart_rate
    )
    {
        response.status = 'failed';
        response.errors = [
            "training_record_id: is required",
            "training_center_id: is required",
            "training_center_name: is required",
            "horse_id: is required",
            "horse_name: is required",
            "heart_rate: is required",
            "latitude: is optional",
            "longitude: is optional",
            "step_counter: is optional",
            "speed: is optional",
            "ehm_id: is optional",
        ];
        return  reply.type('application/json').send(response);
    }


    try{
        const pusher = new Pusher({
            appId: '1349523',
            key: '7ad5e5bcd4d2bf5bb67f',
            secret: '600a4dc4ef7f2bc39ebb',
            cluster: 'ap2',
            useTLS: true,
        });

        // for live racecourse (training center) page
        pusher.trigger(
            'live-training-center-' + inputs.training_center_id,
            'center.new.data',
            inputs
        );

        pusher.trigger(
            'live-horse-' + inputs.horse_id,
            'horse.new.data',
            inputs
        );

        let json = JSON.stringify(inputs);

        let file = "./live.txt";

        fs.appendFileSync(file, json+",");

        response =  {
            status: "success",
            messages: ["data sent to pusher and stored in txt file"],
        };

        return  reply.type('application/json').send(response);

    }catch (e)
    {
        response =  {
            status: "failed",
            error: e,
        };

        return  reply.type('application/json').send(response);
    }


    let data =  {
        status:"success",
        data: {
            "pusher": true,
            "txt": true,
            "db": false,
        }
    }


    return  reply.type('application/json').send(data);

})

//--------------------------------------------------

// Run the server!
if(!is_production)
{
    app.listen(4000,  (err, address) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
        //app.log.info(`server listening on ${address}`)
    })
} else
{
    app.listen(8080, '0.0.0.0', (err, address) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
        //app.log.info(`server listening on ${address}`)
    })
}
