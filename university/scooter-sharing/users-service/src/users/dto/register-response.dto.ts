import { ApiProperty } from "@nestjs/swagger";
import { UserProfileResponseDto } from "./user.dto";

export class RegisterResponseDto {
    @ApiProperty({ description: 'Success flag' })
    success: boolean;

    @ApiProperty({ description: 'User registration message' })
    message: string;

    @ApiProperty({ description: 'User data' })
    user: UserProfileResponseDto;
}