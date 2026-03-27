import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
export declare class SeedService {
    private readonly pokemonModel;
    constructor(pokemonModel: Model<Pokemon>);
    executeSeed(): Promise<string>;
}
