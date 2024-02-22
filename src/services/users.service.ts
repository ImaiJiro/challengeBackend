import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const { rows } = await pg.query(` SELECT * FROM dim_user`);
    return rows;
  }

  public async findUserById(userid: number): Promise<User> {
    const { rows, rowCount } = await pg.query(`SELECT * FROM dim_user WHERE userid = $1`, [userid]);
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }

  public async findUserByEmail(email: string): Promise<User> {
    const { rows, rowCount } = await pg.query(`SELECT * FROM dim_user WHERE email = $1`, [email]);
    if (!rowCount) throw new HttpException(409, "User doesn't exist");

    return rows[0];
  }

  public async createUser(userData: User): Promise<User> {
    const {
      email,
      accesstoken = '',
      age,
      createdat = new Date().getTime().toString(),
      createdtime = new Date().toISOString(),
      description = '',
      iskickoff = false,
      ispaid = false,
      lastloginat = new Date().getTime().toString(),
      lastsignintime = new Date().toISOString(),
      name = '',
      off_set = 0,
      timezone,
      userindex = 0,
      wallet = '',
      group_id,
      photourl,
    } = userData;

    const { rows } = await pg.query(`SELECT EXISTS(SELECT "email" FROM dim_user WHERE "email" = $1)`, [email]);
    if (rows[0].exists) throw new HttpException(409, `This email ${email} already exists`);

    const { rows: createUserData } = await pg.query(
      `INSERT INTO dim_user( "email",
        "accesstoken",
        "age",
        "createdat",
        "createdtime",
        "description",
        "iskickoff",
        "ispaid",
        "lastloginat",
        "lastsignintime",
        "name",
        "off_set",
        "timezone",
        "userindex",
        "wallet",
        "userid",
        "group_id",
        "photourl"
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 , $16, $17, $18)
      RETURNING *
      `,
      [
        email,
        accesstoken,
        age,
        createdat,
        createdtime,
        description,
        iskickoff,
        ispaid,
        lastloginat,
        lastsignintime,
        name,
        off_set,
        timezone,
        userindex,
        wallet,
        userindex,
        group_id,
        photourl,
      ],
    );

    return createUserData[0];
  }

  public async updateUser(userData: User): Promise<User[]> {
    const {
      email,
      accesstoken,
      age,
      createdat,
      createdtime,
      description,
      iskickoff,
      ispaid,
      lastloginat,
      lastsignintime,
      name,
      off_set,
      timezone,
      userindex,
      wallet,
      group_id,
      photourl,
    } = userData;
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
      [userindex],
    );
    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: updateUserData } = await pg.query(
      `
      UPDATE
        dim_user
      SET
        "email" = $2,
        "accesstoken" = $3,
        "age" = $4,
        "createdat" = $5,
        "createdtime" = $6,
        "description" = $7,
        "iskickoff" = $8,
        "ispaid" = $9,
        "lastloginat" = $10,
        "lastsignintime" = $11,
        "name" = $12,
        "off_set" = $13,
        "timezone" = $14,
        "userindex" = $15,
        "wallet" = $16,
        "group_id" = $17,
        "photourl" = $18
      WHERE
        "userid" = $1
      RETURNING *
    `,
      [
        userindex,
        email,
        accesstoken,
        age,
        createdat,
        createdtime,
        description,
        iskickoff,
        ispaid,
        lastloginat,
        lastsignintime,
        name,
        off_set,
        timezone,
        userindex,
        wallet,
        group_id,
        photourl,
      ],
    );

    return updateUserData;
  }

  public async deleteUser(userid: number): Promise<User[]> {
    const { rows: findUser } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          "userid"
        FROM
          dim_user
        WHERE
          "userid" = $1
      )`,
      [userid],
    );
    if (!findUser[0].exists) throw new HttpException(409, "User doesn't exist");

    const { rows: deleteUserData } = await pg.query(
      `
      DELETE
      FROM
        dim_user
      WHERE
        userid = $1
      RETURNING *
      `,
      [userid],
    );

    return deleteUserData;
  }
}
