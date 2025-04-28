import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Маршруты API
  
  // Получить все услуги
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services' });
    }
  });

  // Получить услугу по ID
  app.get('/api/services/:id', async (req, res) => {
    try {
      const service = await storage.getServiceById(parseInt(req.params.id));
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service' });
    }
  });

  // Получить услуги по категории
  app.get('/api/services/category/:category', async (req, res) => {
    try {
      const services = await storage.getServicesByCategory(req.params.category);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services by category' });
    }
  });

  // Получить все программы
  app.get('/api/programs', async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching programs' });
    }
  });

  // Получить программу по ID
  app.get('/api/programs/:id', async (req, res) => {
    try {
      const program = await storage.getProgramById(parseInt(req.params.id));
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching program' });
    }
  });

  // Получить все акции
  app.get('/api/promotions', async (req, res) => {
    try {
      const promotions = await storage.getAllPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching promotions' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
