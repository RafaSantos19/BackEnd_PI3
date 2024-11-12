import GoogleCalendarService from "../services/googleCalendar";

class CalendarController{
    constructor(){
        this.googleCalendarService = new GoogleCalendarService();
    }

    async createCalendarEvent(req, res){
         const event = req.body;

         this.googleCalendarService.createCalendarEvent(event).then( response => {
            res.status(201).json({message: "Evento criado com sucesso", link: response.htmllink});
         }).catch( err => {
            res.status(400).json({message: "Erro ao criar envento", error: err});
         });
    }

    async listEvents(req, res){
        this.googleCalendarService.listEvents( events => {
            res.status(200).json(events);
        }).catch( err => {
            res.status(400).json({message: "Erro ao listar enventos", error: err});
        });
    }

    async getEvent(req, res){
        const eventId = req.params;

        this.googleCalendarService.getEvent(eventId).then( event => {
            res.status(200).json(event);
        }).catch( err => {
            res.status(404).json({ message: "Evento não encontrado", error: err});
        });
    }

    async updateEvent(req, res) {
        const eventId = req.params;
        const eventData = req.body;

        this.googleCalendarService.updateEvent(eventId, eventData).then( event => {
            res.status(200).json({ message: "Evento atualizado com sucesso"});
        }).catch( err => {
            res.status(400).json({ message: "Erro ao atualizar evento", error: err})
        });
    }

    async deleteEvent(req, res){
        const eventId = req.params;

        this.googleCalendarService.deleteEvent(eventId).then( () => {
            res.status(200).json({ message: "Evento deletado com sucesso"});
        }).catch( err => {
            res.status(400).json({ message: "Erro ao deletar evento"});
        });
    }

}

export default CalendarController;