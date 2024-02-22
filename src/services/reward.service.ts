import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Reward } from '@/interfaces/reward.interface';

@Service()
export class RewardService {
  public async findAllReward(): Promise<Reward> {
    const { rows, rowCount } = await pg.query(`SELECT * FROM dim_reward`);
    if (!rowCount) throw new HttpException(409, "User doesn't exist");
    return rows as any;
  }

  public async findRewardById(userID: number): Promise<Reward> {
    const { rows, rowCount } = await pg.query(`SELECT * FROM dim_reward WHERE userid = $1`, [userID]);
    if (!rowCount) throw new HttpException(409, "User doesn't exist");
    return rows as any;
  }

  public async createReward(userData: Reward): Promise<Reward> {
    const { userid, reward_amount, reward_date } = userData;
    const query = 'INSERT INTO dim_reward (userid, reward_amount, reward_date) VALUES ($1, $2, $3) RETURNING *';
    const values = [userid, reward_amount, reward_date];

    const { rows } = await pg.query(query, values);

    return rows[0];
  }

  public async updateReward(userData: Reward): Promise<Reward> {
    const { userid, reward_amount, reward_date } = userData;

    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          *
        FROM
          dim_user
        WHERE
          "userid" = $1
      )`,
      [userid],
    );
    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: data } = await pg.query(`SELECT * FROM dim_reward WHERE "userid" = $1`, [userid]);
    const existingReward = data[0];

    const updatedReward = {
      reward_amount: reward_amount || existingReward.reward_amount,
      reward_date: reward_date || existingReward.reward_date,
    };

    const { rows } = await pg.query(`UPDATE dim_reward SET reward_amount = $2, reward_date = $3 WHERE "userid" = $1 RETURNING *`, [
      userid,
      updatedReward.reward_amount,
      updatedReward.reward_date,
    ]);

    return rows[0];
  }
}
