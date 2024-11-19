import Database from "../config/database.js";
import GoogleCalendarService from "../services/googleCalendar.js";

class CalendarRepository{
    constructor(){
        this.database = new Database();
        this.googleCalendarService = new GoogleCalendarService();
    }

    async createCalendarEvent(event){
        try {
            return this.googleCalendarService.createCalendarEvent(event).then( eventData => {
                const eventId = eventData.id;
                return this.database.addCalendarDocument(eventData, eventId)
            }).catch( err => {
                console.error("Erro ao criar Evento: ", err);
                throw err
            })
        } catch (error) {
            console.error("Erro ao criar Evento: ", error);
            throw error
        }
    }

}