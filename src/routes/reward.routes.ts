import { Router } from 'express';
import { RewardController } from '@controllers/reward.controller';
import { Routes } from '@interfaces/routes.interface';

export class RewardRoute implements Routes {
  public path = '/reward';
  public router = Router();
  public rewardController = new RewardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.rewardController.getAllReward);
    this.router.get(`${this.path}/:userID`, this.rewardController.getReward);
    this.router.post(`${this.path}/create`, this.rewardController.createReward);
    this.router.put(`${this.path}/update`, this.rewardController.updateReward);
  }
}
