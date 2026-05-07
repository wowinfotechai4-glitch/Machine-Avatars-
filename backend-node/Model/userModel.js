const db = require("../config/db");



// ================= REGISTER =================
exports.register = (
  userKeyId,
  userName,
  email,
  password
) => {
console.log("called Modal")
  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_RegisterUser(?, ?, ?, ?)",
      [
        userKeyId,
        userName,
        email,
        password
      ],
      (err, result) => {

        if (err) {
          reject(err);
        } else {
          
          resolve(result);
        }

      }
    );

  });

};

// ================= LOGIN =================
exports.login = (email) => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_LoginUser(?)",
      [email],
      (err, results) => {

        if (err) {
          reject(err);
        } else {
          resolve(results[0][0]);
        }

      }
    );

  });

};


// ================= GET USERS =================
exports.getUsers = () => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_GetAllUsers()",
      (err, results) => {

        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }

      }
    );

  });

};


// ================= ADD USER =================
exports.addUser = (
  userKeyId,
  userName,
  email,
  password
) => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_AddUpdateUser(?, ?, ?)",
      [
        userKeyId,
        userName,
        email,
        password
      ],
      (err, result) => {

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

      }
    );

  });

};


// ================= UPDATE USER =================
exports.updateUser = (
  id,
  email,
  status
) => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_AddUpdateUser(?, ?, ?)",
      [
        id,
        email,
        status
      ],
      (err, result) => {

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

      }
    );

  });

};


// ================= DELETE USER =================
exports.deleteUser = (id) => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_DeleteUser(?)",
      [id],
      (err, result) => {

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

      }
    );

  });

};


// ================= DASHBOARD =================
exports.getDashboardStats = () => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_GetAllUsers()",
      (err, results) => {

        if (err) {
          reject(err);
        } else {

          resolve({
            totalUsers: results[0].length
          });

        }

      }
    );

  });

};


// ================= BOT SETTINGS =================
exports.getBotSettings = () => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_machineavatars()",
      (err, results) => {

        if (err) {
          reject(err);
        } else {
          resolve(results[0][0]);
        }

      }
    );

  });

};


exports.saveBotSettings = (
  bot_name,
  welcome_message,
  theme_color
) => {

  return new Promise((resolve, reject) => {

    db.query(
      "CALL sp_SaveMachineAvatars(?, ?, ?)",
      [
        bot_name,
        welcome_message,
        theme_color
      ],
      (err, result) => {

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }

      }
    );

  });

};