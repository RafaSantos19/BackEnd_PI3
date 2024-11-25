import Database from "../config/database.js";
import GoogleCalendarService from "../services/googleCalendar.js";
import GoogleAnalyticsService from "../services/googleAnalyticsService.js";

class CalendarRepository {
    constructor() {
        this.database = new Database();
        this.googleCalendarService = new GoogleCalendarService();
        this.googleAnalyticsService = new GoogleAnalyticsService();
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

           // await this.googleAnalyticsService.sendEvent(eventData.service, eventData);

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

    async listUserEvents(email) {
        try {
            const userEvents = await this.database.listUserEvents(email);
            return userEvents;
        } catch (error) {
            console.error("Erro ao listar eventos: ", error);
            return [];
        }
    }

    async listAllEvents() {
        try {
            const allEvents = await this.database.listAllDocuments('agendamentos');
            return allEvents;
        } catch (error) {
            console.error("Erro ao listar todos os agendamentos: ", error);
            return [];
        }
    }

    async countEvents (){
        try {
            const events = await this.database.countEvents();
            return events;
        } catch (error) {
            console.error("Erro ao contabilizar Eventos: ", error);
            return {}
        }
    }

    async deleteEvents(eventId) {
        try {
            await this.database.deleteDocument("agendamentos", eventId);
            await this.googleCalendarService.deleteEvent(eventId);
            return true;
        } catch (err) {
            console.error("Erro ao deletar evento:", err.message);
            return false;
            //throw new Error("Erro ao deletar evento: ", err.message);
        }
    }


}

export default CalendarRepository;