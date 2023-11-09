import express from 'express'
import {
    bookingRoom,
    countsWithCustomerData,
    createRoom,
    customerWithBookedData,
    getRoomDetails,
    roomsWithBookedData
} from '../Controllers/hallBooking.Controller.js';

const router = express.Router()



router.get('/rooms', getRoomDetails)
router.get('/rooms/alldata', roomsWithBookedData)
router.get('/customers/alldata', customerWithBookedData)
router.get('/count/alldata', countsWithCustomerData)
router.post('/create/room', createRoom)
router.post('/booking', bookingRoom)




export default router;