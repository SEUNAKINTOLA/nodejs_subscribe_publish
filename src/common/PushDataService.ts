import axios from 'axios';

class PushDataService {
  static async push(userUrl: string, publishedTopic: string, publishedData: object) {
    try {
      // send published data to each subscribed endpoints
      await axios({
        method: 'POST',
        url: userUrl,
        data: {
          topic: publishedTopic,
          data: publishedData,
        },
      });
    } catch (err) {}
  }
}

export default PushDataService;
