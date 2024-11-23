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

    async listEvents(req, res) {
        try {
            const events = await this.googleCalendarService.listEvents();
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

    async getEvent(req, res) {
        const { id } = req.body;

        this.googleCalendarService.getEvent(id).then(event => {
            res.status(200).json(event);
        }).catch(err => {
            res.status(404).json({ message: "Evento não encontrado", error: err });
        });
    }

    async updateEvent(req, res) {
        const eventId = req.params;
        const eventData = req.body;

        this.googleCalendarService.updateEvent(eventId, eventData).then(event => {
            res.status(200).json({ message: "Evento atualizado com sucesso" });
        }).catch(err => {
            res.status(400).json({ message: "Erro ao atualizar evento", error: err })
        });
    }

    async deleteEvent(req, res) {
        const eventId = req.params;

        this.googleCalendarService.deleteEvent(eventId).then(() => {
            res.status(200).json({ message: "Evento deletado com sucesso" });
        }).catch(err => {
            res.status(400).json({ message: "Erro ao deletar evento" });
        });
    }

}

export default CalendarController;