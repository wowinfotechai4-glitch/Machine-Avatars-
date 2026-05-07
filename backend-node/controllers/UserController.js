const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// ================= REGISTER =================
exports.register = async (req, res) => {
console.log("Called 123")
  try {

    // GET DATA FROM BODY
    const {
      userName,
      email,
      password,
      confirmPassword
    } = req.body;

    // VALIDATION
    if (
      !userName ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      return res.status(400).json({
        message: "All fields required"
      });

    }

    // CHECK PASSWORD MATCH
    if (password !== confirmPassword) {

      return res.status(400).json({

        message:
          "Your password is incorrect, write again"

      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // REGISTER USER
    const result = await User.register(

      null,
      userName,
      email,
      hashedPassword

    );
console.log(result[0][0]?.massage)
if(result[0][0]?.Success==0)
{
return  res.status(400).json({
    status:false,
    massage: result[0][0]?.massage
  })
}
    res.json({

      message:
        "User registered successfully",

      data: result

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= LOGIN =================
exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.login(email);

    if (!user) {

      return res.json({

        message:
          "User not found"

      });

    }

    const isMatch =
      await bcrypt.compare(

        password,
        user.Password

      );

    if (!isMatch) {

      return res.json({

        message:
          "Wrong password"

      });

    }

    const token = jwt.sign(

      {
        id: user.UserId,
        email: user.Email
      },

      "secretkey",

      {
        expiresIn: "1h"
      }

    );

    res.json({

      message:
        "Login successful",

      token,
      user

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= GET USERS =================
exports.getUsers = async (req, res) => {

  try {

    const users =
      await User.getUsers();

    res.json(users);

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= ADD USER =================
exports.addUser = async (req, res) => {

  try {

    const {
      userName,
      email,
      password
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.addUser(

      null,
      userName,
      email,
      hashedPassword

    );

    res.json({

      message:
        "User added successfully"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      email,
      status
    } = req.body;

    await User.updateUser(

      id,
      email,
      status

    );

    res.json({

      message:
        "User updated successfully"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    await User.deleteUser(id);

    res.json({

      message:
        "User deleted successfully"

    });

  } catch (err) {

    res.status(500).json({

      error: err.message

    });

  }

};


// ================= DASHBOARD =================
exports.getDashboardStats =
  async (req, res) => {

    try {

      const data =
        await User.getDashboardStats();

      res.json(data);

    } catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  };


// ================= BOT SETTINGS =================
exports.getBotSettings =
  async (req, res) => {

    try {

      const data =
        await User.getBotSettings();

      res.json(data);

    } catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  };


// ================= SAVE BOT SETTINGS =================
exports.saveBotSettings =
  async (req, res) => {

    try {

      const {

        bot_name,
        welcome_message,
        theme_color

      } = req.body;

      await User.saveBotSettings(

        bot_name,
        welcome_message,
        theme_color

      );

      res.json({

        message:
          "Saved successfully"

      });

    } catch (err) {

      res.status(500).json({

        error: err.message

      });

    }

  };