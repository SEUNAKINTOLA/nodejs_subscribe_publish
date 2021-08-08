import { Router } from 'express';
import PublicationsController from '@controllers/publication.controller';
import { Routes } from '@interfaces/routes.interface';
import subscriptionService from '@services/subscription.service';

class PublicationsRoute implements Routes {
  public subscriptionService = new subscriptionService();

  public path = '/publish2';
  public router = Router();
  public publicationsController = new PublicationsController(this.subscriptionService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:topic`, this.publicationsController.Publish);
  }
}

export default PublicationsRoute;
