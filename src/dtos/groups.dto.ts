import { IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  public group_name: string;

  @IsNumber()
  public group_id: number;

  @IsString()
  public group_link: string;
}

export class UpdateGroupDto {
  @IsString()
  public group_name: string;

  @IsNumber()
  public group_id: number;

  @IsString()
  public group_link: string;
}
