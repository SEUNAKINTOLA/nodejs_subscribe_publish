import { CreateSubscriptionDto } from '@dtos/subscription.dto';
import { HttpException } from '@exceptions/HttpException';
import { Subscription } from '@interfaces/subscription.interface';
import { isEmpty } from '@utils/util';

class SubscriptionService {
  public subscriptions: Subscription[] = [];

  public async findAllSubscription(): Promise<Subscription[]> {
    const subscriptions: Subscription[] = this.subscriptions;
    return subscriptions;
  }

  public async findSubscriptionByTopic(topic: string): Promise<Subscription> {
    const findSubscription: Subscription = this.subscriptions.find(subscription => subscription.topic === topic);
    if (!findSubscription) throw new HttpException(409, 'no subscription');

    return findSubscription;
  }

  public async createSubscription(topic: string, subscriptionData: CreateSubscriptionDto): Promise<Subscription> {
    if (isEmpty(subscriptionData)) throw new HttpException(400, 'subscription Data is empty');

    const findSubscription: Subscription = this.subscriptions.find(
      subscription => subscription.url === subscriptionData.url && subscription.topic === topic,
    );
    if (findSubscription) throw new HttpException(409, `You already subscribed to  ${topic} with  ${subscriptionData.url} `);

    const createSubscriptionData: Subscription = { topic: topic, ...subscriptionData };
    this.subscriptions = [...this.subscriptions, createSubscriptionData];

    return createSubscriptionData;
  }
}

export default SubscriptionService;
