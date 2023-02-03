import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly artistId: string | null;

  @IsOptional()
  @IsString()
  readonly albumId: string | null;

  @IsOptional()
  @IsInt()
  readonly duration: number;
}
