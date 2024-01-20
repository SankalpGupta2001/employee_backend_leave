const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  leaveStartDate: {
    type: Date,
    required: true,
  },
  leaveEndDate: {
    type: Date,
    required: true,
  },
  visitingPlace :{
    type:String
  },
  approvalStatus: {
    type: String,
    default: 'pending',
  },
  reasonForLeave: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    default: '',
  },
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
