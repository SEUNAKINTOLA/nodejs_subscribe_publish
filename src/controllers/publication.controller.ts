import { NextFunction, Request, Response } from 'express';
import { Publication } from '@interfaces/publication.interface';
import PublicationService from '@services/publication.service';
import SubscriptionService from '@services/subscription.service';

class PublicationController {
  constructor(private subscriptions: SubscriptionService) {}

  public publicationService = new PublicationService(this.subscriptions);
  public Publish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const publicationData: Object = req.body;
      const subscriptionTopic = req.params.topic;

      const createPublicationData: Publication = await this.publicationService.createPublication(subscriptionTopic, publicationData);

      res.status(201).json({ createPublicationData });
    } catch (error) {
      next(error);
    }
  };
}

export default PublicationController;
