const Ward = require('../models/Ward');
const Room = require('../models/Room');
const Bed = require('../models/Bed');

// =======================
// WARDS
// =======================
exports.getWards = async (req, res, next) => {
  try {
    // Deep populate rooms and beds
    const wards = await Ward.find().populate({
      path: 'rooms', // Not natively in schema, but we can do a virtual, OR we just fetch manually
      // Actually, Room has wardId. So we should probably do a manual aggregate or virtual.
      // For simplicity, let's just return Wards, and let frontend fetch Rooms by wardId.
    });
    // Wait, advancedResults handles this better. We'll just use basic find here for speed.
    res.status(200).json({ success: true, data: wards });
  } catch (error) { next(error); }
};

exports.createWard = async (req, res, next) => {
  try {
    const ward = await Ward.create(req.body);
    res.status(201).json({ success: true, data: ward });
  } catch (error) { next(error); }
};

// =======================
// ROOMS
// =======================
exports.getRooms = async (req, res, next) => {
  try {
    let query = Room.find().populate('wardId', 'name type');
    if (req.query.wardId) {
      query = Room.find({ wardId: req.query.wardId }).populate('wardId', 'name type');
    }
    const rooms = await query;
    res.status(200).json({ success: true, data: rooms });
  } catch (error) { next(error); }
};

exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) { next(error); }
};

// =======================
// BEDS
// =======================
exports.getBeds = async (req, res, next) => {
  try {
    let query = Bed.find().populate({
      path: 'roomId',
      populate: { path: 'wardId', select: 'name' }
    });
    
    if (req.query.roomId) {
      query = Bed.find({ roomId: req.query.roomId });
    }
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    const beds = await query;
    res.status(200).json({ success: true, count: beds.length, data: beds });
  } catch (error) { next(error); }
};

exports.createBed = async (req, res, next) => {
  try {
    const bed = await Bed.create(req.body);
    res.status(201).json({ success: true, data: bed });
  } catch (error) { next(error); }
};

exports.updateBed = async (req, res, next) => {
  try {
    const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: bed });
  } catch (error) { next(error); }
}
