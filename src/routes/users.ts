import express from 'express';
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/token', function(req, res, next) {
  res.send('respond with a resource');
});

export default usersRouter;
