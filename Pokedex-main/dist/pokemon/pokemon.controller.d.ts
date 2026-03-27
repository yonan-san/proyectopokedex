import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    create(createPokemonDto: CreatePokemonDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, import("./entities/pokemon.entity").Pokemon, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/pokemon.entity").Pokemon & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./entities/pokemon.entity").Pokemon, "find", {}>;
    findOne(id: string): Promise<import("./entities/pokemon.entity").Pokemon>;
    update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
