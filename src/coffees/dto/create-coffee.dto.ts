import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a new coffee add' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a new coffee add' })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: 'The flavors lilst of a new coffee add',
    example: [],
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
