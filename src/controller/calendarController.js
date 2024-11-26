import CalendarRepository from "../repository/calendarRepository.js";
import GoogleCalendarService from "../services/googleCalendar.js";

class CalendarController {
    constructor() {
        this.calendarRepository = new CalendarRepository()
        this.googleCalendarService = new GoogleCalendarService();
    }

    async createCalendarEvent(req, res) {
        const event = req.body;
        try {
            const result = await this.calendarRepository.createCalendarEvent(event);

            if (!result.success) {
                return res.status(409).json({
                    message: result.message,
                    busyPeriods: result.busyPeriods,
                });
            }
            res.status(201).json({
                message: result.message,
                event: result.event,
            });
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            res.status(500).json({ message: "Erro ao criar evento", error: error.message });
        }

    }

    async listUserEvents(req, res) {
        try {
            const { email } = req.query;
            const userEvents = await this.calendarRepository.listUserEvents(email)
            res.status(201).json(userEvents);
        } catch (error) {
            res.status(404).json({ message: "Agendamentos não encontrados" }, [])
        }
    }

    async listAllEvents(req, res) {
        try {
            const events = await this.calendarRepository.listAllEvents();
            res.status(200).json(events);
        } catch (err) {
            res.status(400).json({ message: "Erro ao listar eventos", error: err.message });
        }
    }

    async listEventsByDate(req, res) {
        try {
            const { date } = req.query;
            if (!date) {
                return res.status(400).json({ message: "A data é obrigatória." });
            }

            const events = await this.googleCalendarService.listEventsByDate(date);
            res.status(200).json(events);
        } catch (error) {
            console.error('Erro ao listar eventos:', error.message);
            res.status(400).json({ message: "Erro ao listar eventos", error: error.message });
        }
    }

    async coutEvents(req, res) {
        try {
            const events = await this.calendarRepository.countEvents();
            res.status(201).json(events);
        } catch (error) {
            res.status(400).json({ message: "Erro ao contabilizar os serviços: ", error: error });
        }
    }

    async deleteEvent(req, res) {
        const eventId = req.query.eventId;

        if (!eventId) {
            return res.status(400).json({ message: "Parâmetro 'eventId' é obrigatório." });
        }

        try {
            await this.calendarRepository.deleteEvents(eventId);
            res.status(204).json({ message: "Evento deletado com sucesso" });
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
            res.status(500).json({ message: "Erro ao deletar evento", error: error.message });
        }
    }

}

export default CalendarController;