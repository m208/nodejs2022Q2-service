import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsInt()
  readonly year: number;

  @IsOptional()
  @IsString()
  readonly artistId: string;
}
