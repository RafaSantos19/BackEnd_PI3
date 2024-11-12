import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv'
import path from 'path';

dotenv.config()

// Carrega as credenciais da conta de serviço
const CREDENTIALS_PATH = path.join(process.cwd(), 'service-account.json');

async function getServiceAccountAuth() {
  const credentials = JSON.parse(await readFile(CREDENTIALS_PATH, 'utf-8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return auth;
}

class GoogleCalendarService{
  constructor(){}

  async createCalendarEvent(eventData) {
    const auth = await getServiceAccountAuth();
    const calendar = google.calendar({ version: 'v3', auth });
    
    const event = {
      summary: eventData.summary,
      location: eventData.location,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime, // formato 'YYYY-MM-DDTHH:MM:SSZ'
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: eventData.endDateTime, // formato 'YYYY-MM-DDTHH:MM:SSZ'
        timeZone: 'America/Sao_Paulo',
      },
    };
  
    try {
      const response = await calendar.events.insert({
        calendarId: process.env.APP_CALENDAR_ID, // ou o ID do calendário compartilhado
        resource: event,
      });
      console.log('Evento criado: %s', response.data.htmlLink);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw new Error('Não foi possível criar o evento.');
    }
  }
  
  async listEvents() {
    const auth = await getServiceAccountAuth();
    const calendar = google.calendar({ version: 'v3', auth });
  
    const response = await calendar.events.list({
      calendarId: process.env.APP_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
  
    return response.data.items;
  }
  
  async getEvent(eventId) {
    const auth = await getServiceAccountAuth();
    const calendar = google.calendar({ version: 'v3', auth });
    
    const response = await calendar.events.get({
      calendarId: process.env.APP_CALENDAR_ID,
      eventId: eventId,
    });
  
    return response.data;
  }
  
  async updateEvent(eventId, eventData) {
    const auth = await getServiceAccountAuth();
    const calendar = google.calendar({ version: 'v3', auth });
  
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
  
    const response = await calendar.events.update({
      calendarId: process.env.APP_CALENDAR_ID,
      eventId: eventId,
      resource: updatedEvent,
    });
  
    return response.data;
  }
  
  async deleteEvent(eventId) {
    const auth = await getServiceAccountAuth();
    const calendar = google.calendar({ version: 'v3', auth });
  
    await calendar.events.delete({
      calendarId: process.env.APP_CALENDAR_ID,
      eventId: eventId,
    });
  
    return true;
  }
}

export default GoogleCalendarService;
