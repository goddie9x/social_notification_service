const Notification = require('../models/notification');
const { pushNewNotificationToSocketGateway } = require('../kafka/producer');
class NotificationService {
    async getNotificationByUserIdWithPagination(payloads) {
        const { userId, page, limit } = payloads;
        const skip = (page - 1) * limit;
        const getNotificationByUserIdWithPaginationPromise = Notification.find({ target: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
        const getAmountUnreadNotificationPromise = Notification.countDocuments({ target: userId, read: false });

        const [notifications, amountUnreadNotification]
            = await Promise.all([getNotificationByUserIdWithPaginationPromise, getAmountUnreadNotificationPromise]);

        return {
            page,
            limit,
            notifications,
            amountUnreadNotification,
        }
    }
    async createNotification(payloads) {
        const notification = new Notification(payloads);

        await notification.save();
        pushNewNotificationToSocketGateway({
            message: notification,
            roomId: payloads.target.toString()
        });
        return notification;
    }
    async createMultipleNotifications(payloads) {
        const notifications = await Notification.insertMany(payloads);

        const notificationsByUser = notifications.reduce((acc, notification) => {
            if (!acc[notification.target]) {
                acc[notification.target] = [];
            }
            acc[notification.target].push(notification);
            return acc;
        }, {});

        for (const [userId, userNotifications] of Object.entries(notificationsByUser)) {
            pushNewNotificationToSocketGateway({
                message: userNotifications,
                roomId: userId
            });
        }
        return notifications;
    }
    async read(payloads) {
        const { userId, ids } = payloads;
        const result = await Notification.updateMany(
            {
                _id: { $in: ids },
                target: userId
            },
            { $set: { read: true } }
        );

        return result;
    }
}

module.exports = new NotificationService();