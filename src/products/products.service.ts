import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') // nombre colocado en los imports del module
                private readonly productModel: Model<Product>//nombre en la interface
                ){}

async getProducts(): Promise<Product[]>{
    const products = await this.productModel.find();
    return products;
}

async getProduct(productId: string):Promise<Product>{
    const product = await this.productModel.findById(productId)
    return product;
}

async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
    const product = new this.productModel(createProductDTO);
    return await product.save();
}

async deleteProduct(productId: string): Promise<Product>{
    const product = await this.productModel.findByIdAndDelete(productId);
    return product;
}

async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
    const product = await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true
});
return product;
}


}