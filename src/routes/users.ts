import express from 'express';
import { checkIfAuthenticated, getAuthToken } from '../services/firebaseAuthService';
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/token', getAuthToken, function (req, res, next) {

});

/* GET for testing authentication */
usersRouter.get('/check-auth', checkIfAuthenticated, function (req, res, next) {
  res.send('you are authorized...!');
});

export default usersRouter;
