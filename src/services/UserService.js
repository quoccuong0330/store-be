const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, phone = "", avatar = "", address = "" } = body;
    const name = body.name ?? email;
    const saltRounds = 8;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail !== null) {
        resolve({
          status: "OK",
          message: "Email is already exits .",
        });
      } else {
        const createNewUser = await User.create({
          name,
          email,
          password: hashPassword,
          avatar,
          phone,
          address,
        });
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createNewUser,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const logInUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = body;

    try {
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail === null) {
        resolve({
          status: "ERR",
          message: "Email or password is incorrect",
        });
      }
      const hashPassword = checkEmail.password;
      const checkPassword = bcrypt.compareSync(password, hashPassword);
      if (checkPassword) {
        const access_token = await generalAccessToken({
          id: checkEmail.id,
          isAdmin: checkEmail.isAdmin,
        });

        const refresh_token = await generalRefreshToken({
          id: checkEmail.id,
          isAdmin: checkEmail.isAdmin,
        });

        resolve({
          status: "OK",
          message: "Login successfully",
          access_token,
          refresh_token,
        });
      } else {
        resolve({
          status: "ERR",
          message: "Email or password is incorrect",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const updateUser = (id, body) => {
  return new Promise(async (resolve, reject) => {
    // const saltRounds = 8;
    // const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
      const checkUser = await User.findById(id);
      if (!checkUser) {
        resolve({
          status: "ERR",
          message: "Not found user to update",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, body, { new: true });
      delete updateUser.password;
      resolve({
        status: "OK",
        message: "Update successfully",
        data: updateUser,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(id);
      if (!checkUser) {
        resolve({
          status: "ERR",
          message: "Not found user to delete",
        });
      }

      const updateUser = await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete successfully",
        data: updateUser,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find({});
      resolve({
        status: "OK",
        message: "Get all users successfully",
        data: allUser,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(id);
      if (!checkUser) {
        resolve({
          status: "ERR",
          message: "Not found user to get profile",
        });
      }
      const { _id, name, email, isAdmin, phone, avatar, address, password } =
        checkUser;

      resolve({
        status: "OK",
        message: "Get profile successfully",
        data: { _id, name, email, isAdmin, phone, avatar, address, password },
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  logInUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetail,
};
