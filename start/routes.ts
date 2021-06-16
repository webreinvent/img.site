/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/svg', () => {

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


  return logo;

})

