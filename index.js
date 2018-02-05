const Koa = require('koa');
const app = new Koa();
const fetchGopher = require('./fetch-gopher');
const generateMenu = require('./generate-menu');
const router = require('koa-router')();
const fs = require('fs');

router.get('/style.css', (ctx, next) => {

  ctx.set('Content-Type', 'text/css');
  return ctx.body = fs.readFileSync('style.css', 'utf-8');

});

app.use(router.routes());

app.use(async ctx => {

  const uri = 'gopher://quux.org/';
  const response = await fetchGopher(uri);

  switch(response[0]) {

    case '1':
      ctx.body = generateMenu(
        uri,
        response[1]
      );
      break;
    default:
      console.log(response[0]);
      ctx.body = response;
      break;

  }
  console.log(response);


});

app.listen(80);
