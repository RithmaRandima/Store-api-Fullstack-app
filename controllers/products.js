const getAllProductStatic = async (req, res) => {
  res.status(200).json({ msg: "Products Testing Router" });
};

const getAllProduct = async (req, res) => {
  res.status(200).json({ msg: "Products Router" });
};

module.exports = {
  getAllProduct,
  getAllProductStatic,
};
