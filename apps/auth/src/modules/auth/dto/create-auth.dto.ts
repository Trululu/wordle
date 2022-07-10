import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: '123456' })
  password: string;
  @ApiProperty({ example: '123456' })
  confirmPassword: string;
  @ApiProperty({ example: 'iTheia' })
  username: string;
}
