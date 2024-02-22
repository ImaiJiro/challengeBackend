import request from 'supertest';
import { App } from '@/app';
import pg from '@database';
import { CreateGroupDto } from '@dtos/groups.dto';
import { GroupRoute } from '@routes/groups.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  pg.end();
});

describe('Testing Groups', () => {
  describe('[GET] /groups', () => {
    it('response statusCode 200 / findAll', async () => {
      const groupsRoute = new GroupRoute();
      const app = new App([groupsRoute]);

      return await request(app.getServer()).get(`${groupsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /groups/:id', () => {
    it('response statusCode 200 / findOne', async () => {
      const groupsRoute = new GroupRoute();
      const app = new App([groupsRoute]);

      return await request(app.getServer())
        .get(`${groupsRoute.path}`)
        .query({
          group_id: 1,
        })
        .expect(200);
    });
  });

  describe('[POST] /groups', () => {
    it('response statusCode 201 / created', async () => {
      const groupData: CreateGroupDto = {
        group_id: 0,
        group_name: 'A',
        group_link: '',
      };
      const groupsRoute = new GroupRoute();
      const app = new App([groupsRoute]);

      return await request(app.getServer()).post(`${groupsRoute.path}`).send(groupData).expect(201);
    });
  });

  describe('[PUT] /groups/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const groupData: CreateGroupDto = {
        group_id: 0,
        group_name: 'A',
        group_link: '',
      };
      const groupsRoute = new GroupRoute();
      const app = new App([groupsRoute]);

      return await request(app.getServer()).put(`${groupsRoute.path}`).send(groupData).expect(200);
    });
  });

  describe('[DELETE] /groups/:id', () => {
    it('response statusCode 200 / deleted', async () => {
      const group_id = 1;
      const groupsRoute = new GroupRoute();
      const app = new App([groupsRoute]);

      return await request(app.getServer()).delete(`${groupsRoute.path}/${group_id}`).expect(200);
    });
  });
});
