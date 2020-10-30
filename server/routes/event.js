const router = require('express').Router();
const Event = require('../models/event');
    
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({'result.stakerAddr': req.query.userAddress});
        res.send(events);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.send(event);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;