const db = require("../config/db");

exports.loginModel = (email) => {
console.log("email",email)

 const user =  db.query("CALL AdminLogin(?)", [email], (err, results) => {
    if (err) return res.status(500).json(err);

    return results[0][0];

   
  });
    console.log("email",email)
return user[0][0];
   
};