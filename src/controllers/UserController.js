const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const validator = require("validator");
const ObjectId = require("mongoose").Types.ObjectId;

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const isCheckEmail = validator.isEmail(email);
    // const isCheckPhone = phone
    //   ? validator.isMobilePhone(phone.toString(), "vi-VN")
    //   : "";
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is require",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is incorrect",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is not equal confirm password",
      });
    }
    // else if (!isCheckPhone) {
    //   return res.status(200).json({
    //     status: "ERR",
    //     message: "The phone number is incorrect",
    //   });
    // }

    const resDB = await UserService.createUser(req.body);
    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isCheckEmail = validator.isEmail(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is require",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The email is incorrect",
      });
    }

    const resDB = await UserService.logInUser(req.body);
    const { refresh_token, ...newRes } = resDB;
    res.cookie("refresh_token", refresh_token, {
      HttpOnly: true,
      Secure: false,
      SameSite: "strict",
    });

    return res.status(200).json(newRes);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    const checkId = ObjectId.isValid(userId);

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    }

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }
    const resDB = await UserService.updateUser(userId, data);

    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkId = ObjectId.isValid(userId);

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    } else if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }

    const resDB = await UserService.deleteUser(userId);

    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const resDB = await UserService.getAllUser();

    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkId = ObjectId.isValid(userId);

    if (!checkId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id was wrong",
      });
    } else if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The id is required",
      });
    }

    const resDB = await UserService.getDetail(userId);

    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const resDB = await JwtService.refreshTokenJwt(token);

    return res.status(200).json(resDB);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Log out successfully",
      data: req.cookies,
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  logInUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetail,
  refreshToken,
  logOutUser,
};
