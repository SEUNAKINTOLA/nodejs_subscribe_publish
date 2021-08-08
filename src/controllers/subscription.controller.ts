import { NextFunction, Request, Response } from 'express';
import { CreateSubscriptionDto } from '@dtos/subscription.dto';
import { Subscription } from '@interfaces/subscription.interface';
import subscriptionService from '@services/subscription.service';
import PublicationController from './publication.controller';

class SubscriptionController {
  public subscriptionService = new subscriptionService();
  public publicationController = new PublicationController(this.subscriptionService);

  public getSubscriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSubscriptionsData: Subscription[] = await this.subscriptionService.findAllSubscription();

      res.status(200).json({ data: findAllSubscriptionsData });
    } catch (error) {
      next(error);
    }
  };

  public getSubscriptionByTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const subscriptionTopic = req.params.topic;
      const findOneSubscriptionData: Subscription = await this.subscriptionService.findSubscriptionByTopic(subscriptionTopic);

      res.status(200).json({ data: findOneSubscriptionData });
    } catch (error) {
      next(error);
    }
  };

  public createSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const subscriptionData: CreateSubscriptionDto = req.body;
      const subscriptionTopic = req.params.topic;

      const createSubscriptionData: Subscription = await this.subscriptionService.createSubscription(subscriptionTopic, subscriptionData);

      res.status(201).json({ createSubscriptionData });
    } catch (error) {
      next(error);
    }
  };
}

export default SubscriptionController;
