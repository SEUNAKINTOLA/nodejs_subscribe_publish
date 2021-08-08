process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import SubscriptionsRoute from '@routes/subscription.route';
import PublicationsRoute from '@routes/publication.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new SubscriptionsRoute(), new PublicationsRoute()]);

app.listen();
