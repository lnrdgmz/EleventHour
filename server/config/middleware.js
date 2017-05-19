// require all middleware here

// MODULES ==============================
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const authRouter = require('../routes/authRoutes');
const eventRouter = require('../routes/eventRoutes');
const userRouter = require('../routes/userRoutes');
const ratingRouter = require('../routes/ratingRoutes');

// export middleware

module.exports = (app, express) => {
    app.use(morgan('dev'));
    app.use(bodyParse.urlencoded({extended: true}));
    app.use(bodyParse.json());
    // app.use(express.static(path.join(_dirname, 'CLIENT FOLDER')))
    // app.use(express.static(path.join(_dirname, 'NODE MODULES FOLDER')))
    app.use(authRouter);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);
    app.use('/rating', ratingRouter);

}
