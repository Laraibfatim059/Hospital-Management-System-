const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Who the notification belongs to
    required: true
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Alert', 'Message', 'System'], default: 'System' },
  isRead: { type: Boolean, default: false },
  actionUrl: { type: String } // optional link to related resource
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
