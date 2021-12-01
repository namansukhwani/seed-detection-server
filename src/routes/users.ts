import express from 'express';
import { checkIfAuthenticated } from '../services/firebaseAuthService';
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/token', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET for testing authentication */
usersRouter.get('/check-auth', checkIfAuthenticated, function (req, res, next) {
  res.send('respond with a resource');
});

export default usersRouter;
