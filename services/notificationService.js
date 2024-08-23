const Notification = require('../models/notification');

class NotificationService {
    setSocket(io){
        this.io = io;
    }
    async getNotificationByUserIdWithPagination(payloads) {
        const { userId, page, limit } = payloads;
        const skip = (page - 1) * limit;
        const getNotificationByUserIdWithPaginationPromise = Notification.find({ target: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
        const getAmountUnreadNotificationPromise = Notification.countDocument({ read: false });

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
        io.to(payloads.target).emit('new-notifications', notification);
        return notification;
    }
    async createMultipleNotifications(notificationsPayload) {
        const notifications = await Notification.insertMany(notificationsPayload);

        const notificationsByUser = notifications.reduce((acc, notification) => {
            if (!acc[notification.target]) {
                acc[notification.target] = [];
            }
            acc[notification.target].push(notification);
            return acc;
        }, {});

        for (const [userId, userNotifications] of Object.entries(notificationsByUser)) {
            io.to(userId).emit('new-notifications', userNotifications);
        }

        return notifications;
    }
}

module.exports = new NotificationService();