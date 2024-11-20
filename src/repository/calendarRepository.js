import Database from "../config/database.js";
import GoogleCalendarService from "../services/googleCalendar.js";

class CalendarRepository {
    constructor() {
        this.database = new Database();
        this.googleCalendarService = new GoogleCalendarService();
    }

    async createCalendarEvent(event) {
        
        try {
            const busyPeriods = await this.googleCalendarService.checkAvailability(event.startDateTime, event.endDateTime);
    
            if (busyPeriods.length > 0) {
                console.log("Horário ocupado! Não é possível criar o evento.");
                return {
                    success: false,
                    message: "Horário ocupado. Por favor, escolha outro horário.",
                    busyPeriods,
                };
            }
            const eventData = await this.googleCalendarService.createCalendarEvent(event);
            const eventId = eventData.id;

            await this.database.addCalendarDocument(event, eventId);
            return {
                success: true,
                message: "Evento criado com sucesso!",
                event: eventData,
            };
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            throw error;
        }
    }
    
    //TODO: Pegar todos os agendamentos do usuário
    async listUserEvents(){

    }

}

export default CalendarRepository;