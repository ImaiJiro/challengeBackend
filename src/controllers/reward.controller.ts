import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Reward } from '@/interfaces/reward.interface';
import { RewardService } from '@/services/reward.service';

export class RewardController {
  public rewardService = Container.get(RewardService);

  public getAllReward = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundReward: Reward = await this.rewardService.findAllReward();
      res.status(200).json({ data: foundReward, message: 'findReward' });
    } catch (error) {
      next(error);
    }
  };

  public getReward = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userID);
      const foundReward: Reward = await this.rewardService.findRewardById(userId);

      res.status(200).json({ data: foundReward, message: 'findReward' });
    } catch (error) {
      next(error);
    }
  };

  public createReward = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardData: Reward = req.body;
      console.log(rewardData, 'rewardData');
      const createdReward: Reward = await this.rewardService.createReward(rewardData);

      res.status(201).json({ data: createdReward, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateReward = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rewardData: Reward = req.body;
      const updatedReward: Reward = await this.rewardService.updateReward(rewardData);

      res.status(200).json({ data: updatedReward, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
