const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
let Schema = mongoose.Schema;
const ProductReviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', require: true },
    review: { type: String },
    createdAt: Date,
    updatedAt: Date,
})
ProductReviewSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('ProductReview', ProductReviewSchema)