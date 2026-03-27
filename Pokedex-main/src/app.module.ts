import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';

// decorador que le dice a NestJs que modulos externos va a usar esta clase 
@Module({ 
  imports: [
    // hace que NestJs sirva archivos estaticos HTMLAllCollection,css,imagenes desde la carpeta public
    ServeStaticModule.forRoot({
      // construye la ruta correcta al directorio, subiendo un nivel desde dist/ hasta llegar public/
      rootPath: join(__dirname, '..','public'),
    }),
    //establece conexion con MongoDB usando la URL de conexion, localhost:27017 direccion y puerto del servidor monogodb y nest-pokemon nombre de la base de datos.
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    SeedModule,
  ],
  
})
export class AppModule {}
