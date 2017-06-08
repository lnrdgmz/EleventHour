// require all middleware here
// MODULES ==============================
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const authRouter = require('../routes/authRoutes');
const eventRouter = require('../routes/eventRoutes');
const userRouter = require('../routes/userRoutes');
const testRouter = require('../routes/testRoutes');
const cookieParser = require('cookie-parser');
const apiRouter = require('../routes/apiRoutes');
const messageRouter = require('../routes/messageRoutes');
// export middleware

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(authRouter);
  app.use(testRouter);
  app.use('/events', eventRouter);
  app.use('/users', userRouter);
  app.use('/api', apiRouter);
  app.use('/messages', messageRouter);
};
