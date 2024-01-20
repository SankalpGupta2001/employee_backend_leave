const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Leave = require('../models/LeaveSchema');
const authentication = require("../authentication/userAuthentication");
const sendEmail = require("./SendEmail")
const path = require("path");


router.post('/leave', authentication, async (req, res) => {
    try {
        const { leaveType, leaveStartDate, leaveEndDate, reasonForLeave ,visitingPlace} = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newLeave = new Leave({
            employeeId: user._id,
            leaveType,
            leaveStartDate,
            leaveEndDate,
            visitingPlace,
            reasonForLeave

        });

        await newLeave.save();
        sendEmail(req.body);



        res.status(201).json({ message: 'Leave request created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/leaves', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userLeaves = await Leave.find({ employeeId: user._id });

        res.status(200).json({ leaves: userLeaves });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/leave/:leaveId', async (req, res) => {
    try {

        const leaveId = req.params.leaveId;

        const leave = await Leave.findOne({ _id: leaveId });


        if (!leave) {
            return res.status(404).json({ message: 'Leave not found or you do not have permission to access it' });
        }

        res.status(200).json({ leave });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/leave/:id', async (req, res) => {
    try {
        const updatedLeave = req.body;
        const { id } = req.params;


        const updatedLeaveRequest = await Leave.findByIdAndUpdate(id, updatedLeave, { new: true });

        if (!updatedLeaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.json({ message: 'Leave request updated successfully', leaveRequest: updatedLeaveRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});



router.delete('/leave/:leaveId', async (req, res) => {
    try {

        const leaveId = req.params.leaveId;
        const leave = await Leave.findOneAndDelete({ _id: leaveId });

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found or you do not have permission to delete it' });
        }

        res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/leaves-employees', async (req, res) => {
    try {


        const userLeaves = await Leave.find({});

        res.status(200).json({ leaves: userLeaves });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
