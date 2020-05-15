const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const Bug = require('./Bug');

// Get all bugs
router.get('/bugs', async (req, res) => {
    const bugs = await Bug.find();
    res.send(bugs);
});

// Add new bug
router.post('/bugs', async (req, res) => {
    try {
        const bug = new Bug({
            name: req.body.name,
            description: req.body.description
        });
        await bug.save();
        res.send(bug);
    } catch {
        res.send('Can not create new bug');
    }
});

// Detele a bug
router.delete('/bugs/:id', async (req, res) => {
    try {
        const bug = await Bug.findOne({ _id: req.params.id });
        await bug.delete();
        res.send(true);
    } catch {
        res.send(false);
    }
});

// Update a bug
router.patch('/bugs/:id', async (req, res) => {
    try {
        const bug = await Bug.findOne({ _id: req.params.id });
        if (req.body.name)
        {
            bug.name = req.body.name;
        }
        if (req.body.description)
        {
            bog.description = req.body.description;
        }
        await bug.save();
        res.send(bug);
    } catch {
        res.send('Can not delete bug');
    }
});

// Update bug status
router.patch('/bugs/:id/status', async (req, res) => {
    try {
        const bug = await Bug.findOne({ _id: req.params.id });
        // should refactor magic numbers
        switch (bug.status) {
            case 0:
                bug.status = 1;
                break;
            case 1:
                bug.status = 0;
                break;
            default:
                break;
        }
        await bug.save();
        res.send(bug);
    } catch {
        res.send('error');
    }
});

mongoose
    .connect("mongodb://localhost:27017/bug_tracking", {
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded());
        
        app.use('/api', router);

        app.listen(3001, () => {
            console.log("Server has started!");
        });
    });