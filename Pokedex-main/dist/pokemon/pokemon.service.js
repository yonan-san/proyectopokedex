"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pokemon_entity_1 = require("./entities/pokemon.entity");
const mongoose_2 = require("mongoose");
const common_2 = require("@nestjs/common");
let PokemonService = class PokemonService {
    pokemonModel;
    constructor(pokemonModel) {
        this.pokemonModel = pokemonModel;
    }
    async create(createPokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
        try {
            const pokemon = await this.pokemonModel.create(createPokemonDto);
            return pokemon;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadGatewayException(`El pokemon existe en la db ${JSON.stringify(error.keyValue)}`);
            }
            console.log(error);
            throw new common_1.InternalServerErrorException(`no se puede crear el pokemon`);
        }
    }
    findAll() {
        return this.pokemonModel.find();
    }
    async findOne(term) {
        let pokemon = null;
        if (!isNaN(+term)) {
            pokemon = await this.pokemonModel.findOne({ no: +term });
        }
        if (!pokemon) {
            pokemon = await this.pokemonModel.findOne({
                name: term.toLowerCase()
            });
        }
        if (!pokemon) {
            throw new common_2.NotFoundException(`Pokémon con id, nombre o no "${term}" no encontrado`);
        }
        return pokemon;
    }
    async update(term, updatePokemonDto) {
        const pokemon = await this.findOne(term);
        if (updatePokemonDto.name) {
            updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
        }
        try {
            await pokemon.updateOne(updatePokemonDto);
            return { ...pokemon.toJSON(), ...updatePokemonDto };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`Ya existe un pokémon con ${JSON.stringify(error.keyValue)}`);
            }
            throw new common_1.InternalServerErrorException(`No se puede actualizar el pokémon - revise el log`);
        }
    }
    async remove(term) {
        const pokemon = await this.findOne(term);
        await pokemon.deleteOne();
        return { message: `Pokémon "${pokemon.name}" eliminado correctamente` };
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pokemon_entity_1.Pokemon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map