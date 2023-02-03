import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly artistId: string;

  @IsOptional()
  @IsString()
  readonly albumId: string;

  @IsOptional()
  @IsInt()
  readonly duration: number;
}
