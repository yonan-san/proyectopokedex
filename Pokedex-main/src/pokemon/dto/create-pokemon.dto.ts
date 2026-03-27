import { IsInt, IsPositive, IsString, MinLength, Min } from "class-validator";

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString({ message: "el campo name debe ser un string" })
  @MinLength(2)
  name: string;
}