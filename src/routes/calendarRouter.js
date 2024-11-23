import express from 'express';
import CalendarController from '../controller/calendarController.js';
import verifyToken from "../config/middleware.js";

const calendarRouter = express.Router();
const calendarController = new CalendarController();

calendarRouter.post('/create-events', verifyToken,calendarController.createCalendarEvent.bind(calendarController));
calendarRouter.get('/get-events', verifyToken, calendarController.getEvent.bind(calendarController));
calendarRouter.get('/list-events', verifyToken, calendarController.listEvents.bind(calendarController));
calendarRouter.get('/list-user-events', verifyToken, calendarController.listUserEvents.bind(calendarController));
calendarRouter.put('/update-events', verifyToken, calendarController.updateEvent.bind(calendarController));
calendarRouter.delete('/delete-events', verifyToken, calendarController.deleteEvent.bind(calendarController));
calendarRouter.get('/list-by-date', verifyToken, calendarController.listEventsByDate.bind(calendarController));

export default calendarRouter;