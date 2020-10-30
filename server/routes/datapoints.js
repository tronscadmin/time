const router = require('express').Router();
const Day = require('../models/datapoints');
    
router.get('/', async (req, res) => {
    try {
        const days = await Day.find();
        res.send(days);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;