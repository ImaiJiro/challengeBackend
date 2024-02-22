import { IsNumber, IsArray } from 'class-validator';

export class CreateGetUpTimeDto {
  @IsNumber()
  public athlete_id: number;

  @IsNumber()
  public user_id: number;

  @IsArray()
  public get_up_time: any[];
}

export class UpdateGetUpTimeDto {
  @IsNumber()
  public user_id: number;

  @IsArray()
  public get_up_time: any[];
}
