import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { GetUpTime } from '@/interfaces/getuptime.interface';
import { GetUpTimeService } from '@/services/getuptime.service';

export class GetUpTimeController {
  public getUpTimeService = Container.get(GetUpTimeService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userID);
      const findAllUsersData: GetUpTime = await this.getUpTimeService.findTimeById(userId);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createGetUpTime = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: GetUpTime = req.body;
      const createUserData: GetUpTime = await this.getUpTimeService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGetUpTime = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: GetUpTime = req.body;
      const updateUserData: GetUpTime = await this.getUpTimeService.updateUser(userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateCheckedField = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userid, get_up_time } = req.body;
      const updateUserData = await this.getUpTimeService.updateCheckedField(userid, get_up_time);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
