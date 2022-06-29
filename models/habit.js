const mongoose = require('mongoose');
const Habit = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    dates: [{
        date: String,
        complete: String,
        day: String,
    }],

    favourite: {
        type: Boolean,
        default: false,
    }
})

const habit = mongoose.model('Habit', Habit);
module.exports = habit;