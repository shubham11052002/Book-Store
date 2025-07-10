const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
let Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName : { type: String, required: true },
    lastName: { type: String, default: '' },
    mobileNo: { type: String, default: '' },
    email:  { type: String, required: true },
    password: { type: String, required: true },
    userImage : { type: String, default: '' },
    userType:{type:Number,default:2,enum:[1,2]},  // 1-> admin , 2-> user
    status: { type : String, default: 'Active', enum: ['Active', 'Disabled']},
    lastLogin: { type: Date },
    createdAt: Date,
    updatedAt: Date,
})
UserSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('User', UserSchema )