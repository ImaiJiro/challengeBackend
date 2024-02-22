import { Router } from 'express';
import { GroupController } from '@controllers/groups.controller';
import { CreateGroupDto } from '@dtos/groups.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class GroupRoute implements Routes {
  public path = '/groups';
  public router = Router();
  public group = new GroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.group.getGroups);
    this.router.get(`${this.path}/:id(\\d+)`, this.group.getGroupById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateGroupDto), this.group.createGroup);
    this.router.put(`${this.path}`, ValidationMiddleware(CreateGroupDto, true), this.group.updateGroup);
    this.router.delete(`${this.path}/:id(\\d+)`, this.group.deleteGroup);
  }
}
