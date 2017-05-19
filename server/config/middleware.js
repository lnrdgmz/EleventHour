// require all middleware here

// MODULES ==============================
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const authRouter = require('../routes/authRoutes.js');
const eventRouter = require('../routes/eventRoutes.js');
const userRouter = require('../routes/userRoutes.js');
const ratingRouter = require('../routes/ratingRoutes.js');

// export middleware

module.exports = (app, express) => {
    app.use(morgan('dev'));
    app.use(bodyParse.urlencoded({extended: true}));
    app.use(bodyParse.json());
    // app.use(express.static(path.join(_dirname, 'CLIENT FOLDER')))
    // app.use(express.static(path.join(_dirname, 'NODE MODULES FOLDER')))
    app.use('/auth', authRouter);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);
    app.use('/rating', ratingRouter);

}
