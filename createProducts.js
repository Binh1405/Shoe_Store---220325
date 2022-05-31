const { faker } = require("@faker-js/faker");
const Product = require("./models/Product");
const numberOfProduct = 10;

const createProduct = async () => {
  console.log("create some fake products");
  for (let index = 0; index < numberOfProduct; index++) {
    const singleProduct = {
      name: faker.commerce.product(),
      price: parseInt(faker.commerce.price()),
      stock: Math.ceil(Math.random() * 100),
    };
  }
  const found = await Product.findOne({ name: singleProduct.name });
  if (!found) {
    const created = await Product.create(singleProduct);
    console.log(
      `created ${created.name}, price: ${created.price}, stock: ${created.stock}`
    );
  } else {
    console.log(`found same product, ${found.name}`);
  }
  console.log("create fake products successfully");
  console.log("==============");
};
module.exports = createProduct;
