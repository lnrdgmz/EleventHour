// require all middleware here

// MODULES ==============================
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const authRouter = require('../routes/authRoutes');
const eventRouter = require('../routes/eventRoutes');
const userRouter = require('../routes/userRoutes');
const ratingRouter = require('../routes/ratingRoutes');

// export middleware

module.exports = (app, express) => {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(express.static(path.join(_dirname, 'CLIENT FOLDER')))
    // app.use(express.static(path.join(_dirname, 'NODE MODULES FOLDER')))
    app.use('/auth', authRouter);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);
    app.use('/rating', ratingRouter);

}
