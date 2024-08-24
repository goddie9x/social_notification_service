const mongoose = require('../configs/database');
const NOTIFICATION = require('../utils/constants/notification');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    target: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: Number,
        enum: NOTIFICATION.TYPE,
        default: NOTIFICATION.TYPE.NORMAL,
    },
    content: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;