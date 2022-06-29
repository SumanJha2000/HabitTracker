//model habit 
const Habit = require('../models/habit.js');

//controller object 
const ctrl = {

    //get habits for daily view
    getHabits: async (req, res) => {
        const habits = await Habit.find();
        const d = new Date();
        const date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
        res.render('index', { habits, "date": date });
    },

    //add  habit 
    postHabit: async (req, res) => {
        try {
            const dates = [];
            const d = new Date();
            const v = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
            dates.push({
                date: v,
                complete: "none",
                day: getDay(0).day,
            })
            const habit = new Habit({ name: req.body.name, dates: dates })
            await habit.save();
            res.redirect('/');
        } catch (err) {
            res.status(400).json({ name, success: false, err: err.message })
        }
    },

    //delete habit
    deleteHabit: async (req, res) => {
        try {
            const id = req.params.id;
            await Habit.findOneAndDelete({ _id: id });
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    },

    //week view 
    getWeekView: async (req, res) => {
        try {
            const habits = await Habit.find();
            const currDay = [];
            for (let i = 0; i <= 6; i++) {
                currDay.push(getDay(-i));
            }
            res.render('week', { habits, currDay });
        } catch (err) {
            console.log(err);
        }
    },

    //toggle status done ,not done and none
    toggleStatus: async (req, res) => {
        const id = req.query.id;
        const d = req.query.date;
        Habit.findOne({ _id: id })
            .then(habit => {
                let dates = habit.dates;
                let bool = false;
                habit.dates.forEach((v) => {
                    if (v.date == d) {
                        v.complete = v.complete == "not done" ? "done" : "not done";
                        if (v.complete == "none") {
                            v.complete == "done";
                        } else if (v.complete == "done") {
                            v.complete == "not done "
                        } else if (v.complte == "not done") {
                            v.complete == "done";
                        }
                        bool = true;
                    }
                })
                if (bool == false) {
                    dates.push({
                        date: d,
                        complete: "done",
                    })
                }

                habit.dates = dates;
                habit.save()
                    .then(habit => {
                        req.query.index == d ? res.redirect('/') : res.redirect('/week');
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
                console.log("err:", err)
            })


    }
}

//function to get date in specific formmat and current day name
function getDay(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    var v = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return {
        date: v,
        day: day,

    };
}

module.exports = ctrl;