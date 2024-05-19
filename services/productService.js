// ../services/productService

const { where } = require("sequelize");

class productService {
    // construtor da classe recebe a User da model
    constructor(productModel) {
        this.ProductModel = productModel;
    }

    async create(name, active) {
        try {
            const newProduct = await this.ProductModel.create(
                {
                    name: name,
                    active: active
                }
            )

            return newProduct ? newProduct : null;
            
        } catch (error) {
            
        }
    }

    async update(id, updates) {
        try {
            const product = await this.ProductModel.findOne({
                where: {
                    id: id
                }
            });

            await product.update(updates);
            return product;
            
        } catch (error) {
            
        }
    }

    async getAllProduct() {
        try {
            const AllProducts = this.ProductModel.findAll();

            return AllProducts ? AllProducts : null;

        } catch (error) {
            throw error;
        }
    }

    async getProductById(ProductId) {
        try {
            const ProductById = this.ProductModel.findOne({
                where: {
                    id: ProductId
                }
            })

            return ProductById ? ProductById : null;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = productService;
