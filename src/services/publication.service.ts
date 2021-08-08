import { HttpException } from '@exceptions/HttpException';
import { Publication } from '@interfaces/publication.interface';
import { Subscription } from '@interfaces/subscription.interface';
import { isEmpty } from '@utils/util';
import SubscriptionService from './subscription.service';
import PushDataService from '../common/PushDataService';

class PublicationService {
  public publications: Publication[] = [];

  constructor(private subscriptions: SubscriptionService) {}

  public async createPublication(topic: string, publicationData: object): Promise<Publication> {
    if (isEmpty(publicationData)) throw new HttpException(400, 'publication data is empty');

    const subscriptions: Subscription[] = this.subscriptions.subscriptions.filter(subscription => subscription.topic === topic);
    if (subscriptions.length > 0) this.PostPublication(subscriptions, publicationData);
    else throw new HttpException(409, `No subscribtion to  ${topic}  `);

    const createPublicationData: Publication = { topic: topic, data: publicationData };
    this.publications = [...this.publications, createPublicationData];

    return createPublicationData;
  }

  public async PostPublication(subscriptions: Subscription[], publicationData: object): Promise<Boolean> {
    for (const subscription of subscriptions) {
      PushDataService.push(subscription.url, subscription.topic, publicationData);
    }
    return true;
  }
}

export default PublicationService;
