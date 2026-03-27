import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import axios from 'axios';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {

    // Borramos todo lo que haya antes
    await this.pokemonModel.deleteMany({});

    const pokemonsToInsert: { name: string; no: number }[] = [];

    // Pedimos los 100 pokémon a la PokeAPI uno por uno
    for (let i = 1; i <= 100; i++) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );

      pokemonsToInsert.push({
        name: data.name,  // bulbasaur, ivysaur...
        no: data.id,      // 1, 2, 3...
      });

      console.log(`✅ ${i}/100 - ${data.name}`);
    }

    // Insertamos los 100 de una sola vez
    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed ejecutado correctamente: 100 Pokémon insertados ✅';
  }
}