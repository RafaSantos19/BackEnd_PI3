import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

class GoogleAnalyticsService {
  constructor() {
    this.measurementId = process.env.APP_MEASUREMENT_ID; 
    this.apiSecret = process.env.APP_MEASUREMENT_SECRET_KEY; 
  }

  async sendEvent(eventName, eventParams) {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;

    const payload = {
      client_id: "analytics-service", 
      events: [
        {
          name: eventName,
          params: eventParams,
        },
      ],
    };

    try {
      const response = await axios.post(url, payload);
      console.log("Evento enviado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar evento para o Google Analytics:", error.message);
      throw error;
    }
  }
}

export default GoogleAnalyticsService;
