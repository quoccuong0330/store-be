const ProductService = require("../services/ProductService");
const ObjectId = require("mongoose").Types.ObjectId;

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
      sell,
    } = req.body;
    if (
      !name ||
      !image ||
      !type ||
      !countInStock ||
      !price ||
      !rating ||
      !description
    ) {
      res.status(200).json({
        status: "ERR",
        message: "Missing input",
      });
    }

    const resDB = await ProductService.createProduct(req.body);
    res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: e,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, image, type, countInStock, price, rating, description } =
      req.body;
    const checkId = ObjectId.isValid(id);

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    }

    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }
    const resDB = await ProductService.updateProduct(id, req.body);
    res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const checkId = ObjectId.isValid(id);

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    }

    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }
    const resDB = await ProductService.getProduct(id);
    res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const checkId = ObjectId.isValid(id);

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    }

    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }
    const resDB = await ProductService.deleteProduct(id);
    res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const resDB = await ProductService.getAll(
      Number(page),
      Number(limit),
      sort,
      filter
    );
    res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getAll,
};
