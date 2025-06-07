import { ApiProperty } from '@nestjs/swagger';

export class RentScooterDto {
  @ApiProperty({ type: String })
  endDate: string;
}