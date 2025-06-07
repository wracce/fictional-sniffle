import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzRjNTcxZDAxODUzNTQ5ODIwM2FjODIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzM0Mjc5MTAsImV4cCI6MTczMzQyNzk3MH0.I3Z5RL-ypz7xfJtm7kEITHf5rroGkii6SSAhsA_xigc' })
  readonly access_token: string;
}
