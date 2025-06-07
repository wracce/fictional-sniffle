import { ApiProperty } from '@nestjs/swagger';

export class RentScooterResponseDto {
  @ApiProperty({ type: String })
  startDate: string;

  @ApiProperty({ type: String })
  endDate: string;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String })
  carId: string;

  @ApiProperty({ type: String })
  userId: string;
}