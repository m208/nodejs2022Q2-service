import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
