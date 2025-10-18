const expressAsyncHandler = require("express-async-handler")
const ContactMessage = require("../models/ContactMessage")

const getContactMessage = expressAsyncHandler(async (req, res) => {
    const result = await ContactMessage.find().sort({ createdAt: -1 })
    res.json({
        message: "Messages fetched successfully",
        count: result.length,
        result
    })
})

const getSingleMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await ContactMessage.findById(id)

    if (!result) {
        return res.status(404).json({ message: "Message not found" })
    }

    res.json({
        message: "Message fetched successfully",
        result
    })
})

const updateContactMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const updateData = req.body

    const result = await ContactMessage.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )

    if (!result) {
        return res.status(404).json({ message: "Message not found" })
    }

    res.json({
        message: "Message updated successfully",
        result
    })
})

const deleteContactMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await ContactMessage.findByIdAndDelete(id)

    if (!result) {
        return res.status(404).json({ message: "Message not found" })
    }

    res.json({
        message: "Message deleted successfully"
    })
})

const getUnreadCount = expressAsyncHandler(async (req, res) => {
    const count = await ContactMessage.countDocuments({ isRead: false })

    res.json({
        message: "Unread count fetched successfully",
        unreadCount: count
    })
})

const markAllAsRead = expressAsyncHandler(async (req, res) => {
    const result = await ContactMessage.updateMany(
        { isRead: false },
        { isRead: true }
    )

    res.json({
        message: "All messages marked as read",
        modifiedCount: result.modifiedCount
    })
})

module.exports = {
    getContactMessage,
    getSingleMessage,
    updateContactMessage,
    deleteContactMessage,
    getUnreadCount,
    markAllAsRead
}
