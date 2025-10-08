const Product = require("../models/product");

const getAllProductStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 100 } });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProduct = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = name;
  }
  // console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    // products = products.sort();
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fildsList = fields.split(",").join(" ");
    result = result.select(fildsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProduct,
  getAllProductStatic,
};
