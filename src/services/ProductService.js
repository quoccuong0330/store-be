const Product = require("../models/ProductModel");

const createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        name,
        image,
        type,
        countInStock,
        price,
        rating,
        discount,
        description,
      } = body;
      const checkName = await Product.findOne({ name: name });
      if (checkName !== null) {
        resolve({
          status: "ERR",
          message: "Name product is exits",
        });
      }
      if (
        typeof countInStock === "number" &&
        typeof price === "number" &&
        typeof rating === "number" &&
        typeof discount === "number"
      ) {
        resolve({
          status: "ERR",
          message:
            "Input price, rating, discount, count in stock is required number",
        });
      }
      const data = await Product.create({
        ...body,
      });
      resolve({ status: "OK", message: "Create product successfully", data });
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, image, type, countInStock, price, rating, description } =
        body;

      const data = await Product.findByIdAndUpdate(id, body, { new: true });
      resolve({
        status: "OK",
        message: "Update product successfully",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkId = await Product.findById(id);
      if (checkId === null) {
        resolve({ status: "OK", message: "Cant get product" });
      }
      resolve({
        status: "OK",
        message: "Get product successfully",
        data: checkId,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkId = await Product.findById(id);
      if (checkId === null) {
        resolve({ status: "ERR", message: "Not find product to delete" });
      }
      const resDB = await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product successfully",
        data: resDB,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (page = 0, limit, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      let getAll;
      if (sort) {
        const objectSort = {};
        objectSort[sort[0]] = sort[1];
        getAll = await Product.find({})
          .limit(limit)
          .skip(limit * page)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Get product successfully",
          data: getAll,
          total: totalProduct,
          currentPage: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (filter) {
        const label = filter[0];
        getAll = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "Get product successfully",
          data: getAll,
          total: totalProduct,
          currentPage: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      } else {
        getAll = await Product.find({})
          .limit(limit)
          .skip(limit * page);
      }

      resolve({
        status: "OK",
        message: "Get product successfully",
        data: getAll,
        total: totalProduct,
        currentPage: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getAll,
};
