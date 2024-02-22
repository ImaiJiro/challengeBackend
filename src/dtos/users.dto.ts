import { IsEmail, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public accesstoken: string;

  @IsNumber()
  public age: number;

  @IsString()
  public createdat: string;

  @IsString()
  public createdtime: string;

  @IsString()
  public lastloginat: string;

  @IsString()
  public lastsignintime: string;

  @IsString()
  public name: string;

  @IsNumber()
  public off_set: number;
  

  @IsString()
  public timezone: string;

  @IsNumber()
  public userindex: number;

  @IsString()
  public wallet: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public iskickoff: boolean;

  @IsBoolean()
  public ispaid: boolean;

  @IsNumber()
  public group_id: number;
}

export class UpdateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public accesstoken: string;

  @IsNumber()
  public age: number;

  @IsString()
  public createdat: string;

  @IsString()
  public createdtime: string;

  @IsString()
  public lastloginat: string;

  @IsString()
  public lastsignintime: string;

  @IsString()
  public name: string;

  @IsNumber()
  public off_set: number;

  @IsString()
  public timezone: string;

  @IsNumber()
  public userindex: number;

  @IsString()
  public wallet: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public iskickoff: boolean;

  @IsBoolean()
  public ispaid: boolean;

  @IsNumber()
  public group_id: number;

  @IsString()
  public photourl: string;
}
