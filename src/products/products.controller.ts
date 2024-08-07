import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product created',
            product
        })
    }

    @Get()
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json(product);
}

@Delete() // localhost:3000/products?productID=19283791283
async deleteProduct(@Res() Res, @Query('productID') productID){
    const productDeleted = await this.productService.deleteProduct(productID);
    if(!productDeleted) throw new NotFoundException('Product does not exist');
    return Res.status(HttpStatus.OK).json({
        message: 'Product deleted',
        productDeleted
    })
}

@Put()
async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
    const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
    if(!updatedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
        message: 'Product updated',
        updatedProduct
    })
}

}