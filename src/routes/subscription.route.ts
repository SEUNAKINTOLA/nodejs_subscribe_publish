import { Router } from 'express';
import SubscriptionsController from '@controllers/subscription.controller';
import { CreateSubscriptionDto } from '@dtos/subscription.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class SubscriptionsRoute implements Routes {
  public path = '/subscribe';
  public path2 = '/publish';
  public router = Router();
  public subscriptionsController = new SubscriptionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.subscriptionsController.getSubscriptions);
    this.router.get(`${this.path}/:topic`, this.subscriptionsController.getSubscriptionByTopic);
    this.router.post(`${this.path}/:topic`, validationMiddleware(CreateSubscriptionDto, 'body'), this.subscriptionsController.createSubscription);
    this.router.post(`${this.path2}/:topic`, this.subscriptionsController.publicationController.Publish);
  }
}

export default SubscriptionsRoute;
