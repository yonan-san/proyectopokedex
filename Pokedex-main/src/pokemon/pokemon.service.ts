import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class PokemonService {

    constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>
    ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon
    } catch (error) {
    if (error.code === 11000) {
    throw new BadGatewayException(
      `El pokemon existe en la db ${JSON.stringify(error.keyValue)}`
    );
  }

  console.log(error);
  throw new InternalServerErrorException(`no se puede crear el pokemon`);
}
    
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {

  let pokemon: Pokemon | null = null;

  // ¿Es un número? Busca por "no"
  if (!isNaN(+term)) {
    pokemon = await this.pokemonModel.findOne({ no: +term });
  }

  // Si no encontró nada, busca por nombre
  if (!pokemon) {
    pokemon = await this.pokemonModel.findOne({
      name: term.toLowerCase()
    });
  }

  // Si tampoco encontró por nombre, lanza error
  if (!pokemon) {
    throw new NotFoundException(
      `Pokémon con id, nombre o no "${term}" no encontrado`
    );
  }

  return pokemon;
}

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

  // Primero buscamos el pokémon
  const pokemon = await this.findOne(term);

  // Si viene el nombre, lo pasamos a minúscula
  if (updatePokemonDto.name) {
    updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
  }

  try {
    // Actualizamos solo los campos que vienen en el body
    await pokemon.updateOne(updatePokemonDto);

    return { ...pokemon.toJSON(), ...updatePokemonDto };

  } catch (error) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Ya existe un pokémon con ${JSON.stringify(error.keyValue)}`
      );
    }
    throw new InternalServerErrorException(
      `No se puede actualizar el pokémon - revise el log`
    );
  }
}

    async remove(term: string) {

  // Primero buscamos el pokémon con el findOne que ya hicimos
  const pokemon = await this.findOne(term);

  // Si lo encontró, lo eliminamos
  await pokemon.deleteOne();

  return { message: `Pokémon "${pokemon.name}" eliminado correctamente` };
}
  }

