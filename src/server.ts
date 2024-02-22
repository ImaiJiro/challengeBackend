import { App } from '@/app';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { GroupRoute } from './routes/groups.route';
import { GetUpRoute } from './routes/getuptime.routes';
import { RewardRoute } from './routes/reward.routes';

ValidateEnv();
const app = new App([new UserRoute(), new GroupRoute(), new GetUpRoute(), new RewardRoute()]);
app.listen();
