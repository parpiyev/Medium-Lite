import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class ListPostDto {
  @IsString()
  @IsOptional()
  public user_id: string;

  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsNumber()
  @IsOptional()
  public offset: number;
}

export class CreatePostDto {
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  public title: string;

  @IsString()
  @MinLength(50)
  public content: string;
}
