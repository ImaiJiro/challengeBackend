import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Group } from '@interfaces/groups.interface';

@Service()
export class GroupService {
  public async findAllGroup(): Promise<Group[]> {
    const { rows } = await pg.query(`
    SELECT
      *
    FROM
      fact_telegram_group
    `);
    return rows;
  }

  public async findGroupById(group_id: number): Promise<Group> {
    const { rows, rowCount } = await pg.query(
      `
    SELECT
      *
    FROM
      fact_telegram_group
    WHERE
      group_id = $1
    `,
      [group_id],
    );
    if (!rowCount) throw new HttpException(409, "Group doesn't exist");

    return rows[0];
  }

  public async createGroup(groupData: Group): Promise<Group> {
    const { group_id, group_link, group_name } = groupData;

    const { rows } = await pg.query(
      `
    SELECT EXISTS(
      SELECT
        *
      FROM
        fact_telegram_group
      WHERE
        "group_link" = $1
    )`,
      [group_link],
    );
    if (rows[0].exists) throw new HttpException(409, `This group_link ${group_link} already exists`);

    const { rows: createGroupData } = await pg.query(
      `
      INSERT INTO
        fact_telegram_group(
        "group_id",
        "group_name",
        "group_link"
        )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [group_id, group_name, group_link],
    );

    return createGroupData[0];
  }

  public async updateGroup(groupData: Group): Promise<Group[]> {
    const { group_id, group_name, group_link } = groupData;
    const { rows: findGroup } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          *
        FROM
          fact_telegram_group
        WHERE
          group_id = $1
      )`,
      [group_id],
    );
    if (findGroup[0].exists) throw new HttpException(409, "Group doesn't exist");

    const { rows: updateGroupData } = await pg.query(
      `
      UPDATE
        fact_telegram_group
      SET
        "group_name" = $2,
        "group_link" = $3
      WHERE
        group_id = $1
      RETURNING *
    `,
      [group_id, group_name, group_link],
    );

    return updateGroupData;
  }

  public async deleteGroup(group_id: number): Promise<Group[]> {
    const { rows: findGroup } = await pg.query(
      `
      SELECT EXISTS(
        SELECT
          *
        FROM
          fact_telegram_group
        WHERE
          group_id = $1
      )`,
      [group_id],
    );
    if (!findGroup[0].exists) throw new HttpException(409, "Group doesn't exist");

    const { rows: deleteGroupData } = await pg.query(
      `
      DELETE
      FROM
        fact_telegram_group
      WHERE
        "group_id" = $1
      RETURNING *
      `,
      [group_id],
    );

    return deleteGroupData;
  }
}
