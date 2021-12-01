import express from 'express';
var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Seed Detection Server' });
});

indexRouter.get('/readiness', function(req, res, next) {
  res.send('OK')
});

export default indexRouter;
