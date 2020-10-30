const router = require('express').Router();
    
router.use('/events', require('./event'));
router.use('/days', require('./day'));
router.use('/datapoints', require('./datapoints'));
//router.use('/bots', require('./bots'));

module.exports = router;