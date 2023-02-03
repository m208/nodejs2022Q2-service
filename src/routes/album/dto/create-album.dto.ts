import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly artistId: string;
}
