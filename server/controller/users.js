import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kenan",
  database: "dbMobile",
});

export const registerUser = async (req, res) => {
  if (!req.body) {
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

   connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        return;
      }
      if (result.length != 0) {
        console.log("User already exists");
        res.send(409);
      } else {
         connection.query(
          "INSERT INTO users(username, password, role ,status) VALUES(?, ?, 'user', 'neaktivan')",
          [username, password],
          (err, data, fields) => {
            if (err) {
              console.log(err);
              return;
            }
            res
              .status(201)
              .json({ status: "success", message: "User Created!" });
          }
        );
      }
    }
  );
};

export const loginUser = async (req, res) => {
  if (!req.body) {
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

  try {
     connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        if (
          data[0]?.username.length > 0 &&
          data[0].username === username &&
          data[0].password === password
        ) {
          res.send(data[0]);
        } else {
          res.sendStatus(404);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
   connection.query("SELECT * FROM users", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(data);
  });
};

export const changeUserStatus = async (req, res) => {
  const id = req.params.id;
   connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (data[0].status === "aktivan") {
         connection.query(
          "UPDATE users SET status = 'neaktivan' WHERE id = ?",
          [id],
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
      } else {
         connection.query(
          "UPDATE users SET status = 'aktivan' WHERE id = ?",
          [id],
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
      }
      res.sendStatus(200);
    }
  );
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
   connection.query(
    "DELETE FROM comments WHERE userId = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
   connection.query(
    "DELETE FROM users WHERE id = ?",
    [parseInt(id)],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      res.sendStatus(200);
    }
  );
};
