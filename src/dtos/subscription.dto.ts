import { IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  public url: string;
}
