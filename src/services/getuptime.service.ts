import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { GetUpTime } from '@/interfaces/getuptime.interface';

@Service()
export class GetUpTimeService {
  public async findTimeById(userID: number): Promise<GetUpTime> {
    const { rows, rowCount } = await pg.query(`SELECT * FROM fact_get_up WHERE userId = $1`, [userID]);
    if (!rowCount) throw new HttpException(409, "User doesn't exist");
    return rows[0];
  }

  public async createUser(userData: GetUpTime): Promise<GetUpTime> {
    const { athlete_id, userid, get_up_time } = userData;
    const query = 'INSERT INTO fact_get_up (athlete_id, userid, get_up_time) VALUES ($1, $2, $3) RETURNING *';
    const values = [athlete_id, userid, get_up_time];

    const { rows } = await pg.query(query, values);

    return rows[0];
  }

  public async updateUser(userData: GetUpTime): Promise<GetUpTime> {
    const { userid, get_up_time } = userData;
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
    const { rows: Data } = await pg.query(`SELECT * FROM fact_get_up WHERE "userid" = $1`, [userid]);
    const data = Data[0];
    console.log(data, get_up_time);
    const mergedData = [...data?.get_up_time, ...get_up_time];
    const { rows } = await pg.query(`UPDATE fact_get_up SET "get_up_time" = $2 WHERE "userid" = $1 RETURNING *`, [userid, mergedData]);

    return rows[0];
  }

  public async updateCheckedField(userid: number, get_up_time: any) {
    try {
      const result = await pg.query(
        `
            UPDATE fact_get_up
            SET get_up_time = $2 
            WHERE userid = $1
        `,
        [userid, get_up_time],
      );

      console.log(result);
    } catch (error) {
      console.error('Error updating Checked field:', error);
    }
  }
}
