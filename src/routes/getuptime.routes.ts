import { Router } from 'express';
import { GetUpTimeController } from '@controllers/getuptime.controller';
import { Routes } from '@interfaces/routes.interface';

export class GetUpRoute implements Routes {
  public path = '/getuptime';
  public router = Router();
  public getUp = new GetUpTimeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userID`, this.getUp.getUsers);
    this.router.post(`${this.path}/create`, this.getUp.createGetUpTime);
    this.router.put(`${this.path}/update`, this.getUp.updateGetUpTime);
    this.router.put(`${this.path}/updateChecked`, this.getUp.updateCheckedField);
  }
}
