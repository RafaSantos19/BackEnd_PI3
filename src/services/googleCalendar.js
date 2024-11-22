import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Caminho para as credenciais da conta de serviço
const CREDENTIALS_PATH = path.join(process.cwd(), 'service-account.json');

async function getServiceAccountAuth() {
  const credentials = JSON.parse(await readFile(CREDENTIALS_PATH, 'utf-8'));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
}

class GoogleCalendarService {
  constructor() {
    this.initializeAuth();
  }

  async initializeAuth() {
    this.auth = await getServiceAccountAuth();
    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async createCalendarEvent(eventData) {
    const event = {
      summary: eventData.summary,
      location: eventData.location,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: eventData.endDateTime,
        timeZone: 'America/Sao_Paulo',
      },
    };

    try {
      const response = await this.calendar.events.insert({
        calendarId: process.env.APP_CALENDAR_ID,
        resource: event,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error.message);
      throw new Error('Não foi possível criar o evento.');
    }
  }

  async checkAvailability(startDateTime, endDateTime) {
    const calendarId = process.env.APP_CALENDAR_ID;

    const requestBody = {
      timeMin: startDateTime,
      timeMax: endDateTime,
      timeZone: 'America/Sao_Paulo',
      items: [{ id: calendarId }],
    };

    try {
      const response = await this.calendar.freebusy.query({ requestBody });
      return response.data.calendars[calendarId]?.busy || [];
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error.message);
      throw new Error('Não foi possível verificar a disponibilidade.');
    }
  }

  async listEvents() {
    try {
      const response = await this.calendar.events.list({
        calendarId: process.env.APP_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      return response.data.items;
    } catch (error) {
      console.error('Erro ao listar eventos:', error.message);
      throw new Error('Não foi possível listar os eventos.');
    }
  }

  async listEventsByDate(date) {
    try {
      // Converter a data recebida para o fuso horário local
      const startOfDay = new Date(`${date}T00:00:00-03:00`);
      const endOfDay = new Date(`${date}T23:59:59-03:00`);

      // Solicitação ao Google Calendar
      const response = await this.calendar.events.list({
        calendarId: process.env.APP_CALENDAR_ID,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items;
    } catch (error) {
      console.error('Erro ao listar eventos:', error.message);
      throw new Error('Não foi possível listar os eventos.');
    }
  }

  async getEvent(eventId) {
    try {
      const response = await this.calendar.events.get({
        calendarId: process.env.APP_CALENDAR_ID,
        eventId,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao recuperar evento:', error.message);
      throw new Error('Não foi possível recuperar o evento.');
    }
  }

  async updateEvent(eventId, eventData) {
    const updatedEvent = {
      summary: eventData.summary,
      location: eventData.location,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: eventData.endDateTime,
        timeZone: 'America/Sao_Paulo',
      },
    };

    try {
      const response = await this.calendar.events.update({
        calendarId: process.env.APP_CALENDAR_ID,
        eventId,
        resource: updatedEvent,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error.message);
      throw new Error('Não foi possível atualizar o evento.');
    }
  }

  async deleteEvent(eventId) {
    try {
      await this.calendar.events.delete({
        calendarId: process.env.APP_CALENDAR_ID,
        eventId,
      });
      return true;
    } catch (error) {
      console.error('Erro ao excluir evento:', error.message);
      throw new Error('Não foi possível excluir o evento.');
    }
  }
}

export default GoogleCalendarService;
