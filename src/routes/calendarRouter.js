import express from 'express';
import CalendarController from '../controller/calendarController.js';

const calendarRouter = express.Router();
const calendarController = new CalendarController();

calendarRouter.post('/create-events', calendarController.createCalendarEvent.bind(calendarController));
calendarRouter.get('/get-events', calendarController.getEvent.bind(calendarController));
calendarRouter.get('/list-events', calendarController.listEvents.bind(calendarController));
calendarRouter.get('/list-user-events', calendarController.listUserEvents.bind(calendarController));
calendarRouter.put('/update-events', calendarController.updateEvent.bind(calendarController));
calendarRouter.delete('/delete-events', calendarController.deleteEvent.bind(calendarController));
calendarRouter.get('/list-by-date', calendarController.listEventsByDate.bind(calendarController));

export default calendarRouter;