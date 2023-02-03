import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly artistId: string;

  @IsString()
  readonly albumId: string;

  @IsNotEmpty()
  @IsInt()
  readonly duration: number;
}

export class UpdateTracDto {
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

/*
name: string;
artistId: string | null; // refers to Artist
albumId: string | null; // refers to Album
duration: number; // integer number

*/
