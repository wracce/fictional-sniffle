import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  middlename: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: Number })
  money: number;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: Date })
  birthday: Date;

  @ApiProperty({ type: String })
  address: string;
}
