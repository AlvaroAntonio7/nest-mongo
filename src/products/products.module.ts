import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/products.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Product', schema: ProductSchema}]
  )],// si se necesitan mas esquemas se divide con , dentro de []
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
