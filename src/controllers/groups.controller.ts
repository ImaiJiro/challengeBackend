import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Group } from '@interfaces/groups.interface';
import { GroupService } from '@services/groups.service';

export class GroupController {
  public group = Container.get(GroupService);

  public getGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllGroupsData: Group[] = await this.group.findAllGroup();

      res.status(200).json({ data: findAllGroupsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const group_id = Number(req.params.id);
      const findOneGroupData: Group = await this.group.findGroupById(group_id);

      res.status(200).json({ data: findOneGroupData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupData: Group = req.body;
      const createGroupData: Group = await this.group.createGroup(groupData);

      res.status(201).json({ data: createGroupData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groupData: Group = req.body;
      const updateGroupData: Group[] = await this.group.updateGroup(groupData);

      res.status(200).json({ data: updateGroupData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const group_id = Number(req.params.id);
      const deleteGroupData: Group[] = await this.group.deleteGroup(group_id);

      res.status(200).json({ data: deleteGroupData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
