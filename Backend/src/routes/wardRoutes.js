const express = require('express');
const {
  getWards, createWard,
  getRooms, createRoom,
  getBeds, createBed, updateBed
} = require('../controllers/wardController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/wards')
  .get(getWards)
  .post(authorize('admin'), createWard);

router.route('/rooms')
  .get(getRooms)
  .post(authorize('admin'), createRoom);

router.route('/beds')
  .get(getBeds)
  .post(authorize('admin'), createBed);

router.route('/beds/:id')
  .put(authorize('admin', 'nurse'), updateBed);

module.exports = router;
