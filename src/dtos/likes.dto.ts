import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ListLikeDto {
  @IsNumber()
  @IsOptional()
  public limit: number;

  @IsNumber()
  @IsOptional()
  public offset: number;
}

export class CreateLikeDto {
  @IsString()
  @IsUUID()
  public post_id: string;
}
