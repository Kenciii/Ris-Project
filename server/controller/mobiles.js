import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kenan", 
    database: "dbMobile",
});


export const getMobiles = async (req, res) =>{
     connection.query("SELECT * FROM mobiles", (err, data) =>{
        if(err){
            console.log(err);
            return;
        }
        res.status(200).send(data);
    });
};

export const getOneMobile = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }
     connection.query(
        "SELECT * FROM mobiles WHERE mobiles.id = ?",
        [id],
        (err, data) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).send(data);
        }
    );
};


export const postMobile = async (req, res) =>{
    if(!req.body){
        return;
    }
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;

     connection.query(
        "INSERT INTO mobiles(title, price, description, imageURL) VALUES(?,?,?,?)",
        [title, price, description, imageURL],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Post Created!"});
        }
    );
};

export const deleteMobile = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }
     connection.query(
        "DELETE FROM comments WHERE mobilesId = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
        }
    );

     connection.query(
        "DELETE FROM mobiles WHERE id = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).json({status: "success", message: "Post Deleted!"});
        }
    );
};

export const updateMobile = async (req, res) =>{
    if(!req.body){
        return;
    }
    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

     connection.query(
        "UPDATE mobiles SET title = ?, price = ?, description = ? WHERE id = ? ",
        [title, price, description, id],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Post Updated!"});
        }
    );
};

export const getComments = async (req, res) =>{
    const id = req.params.id;
     connection.query(
        "SELECT comments.id, comments.comment, users.username FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.mobilesId = ?",
        [id],
        (err, data) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).send(data);
        }
    );
};

export const postComment = async (req, res) =>{
    if(!req.body){
        return;
    }
    const comment = req.body.comment;
    const mobilesId = req.body.mobilesId;
    const userId = req.body.userId;

     connection.query(
        "INSERT INTO comments(comment, mobilesId, userId) VALUES(?, ?, ?)",
        [comment, mobilesId, userId],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Comment Added!"});
        }
    );
};

export const deleteComment = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }

     connection.query(
        "DELETE FROM comments WHERE id = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Comment Deleted!"});
        }
    );
};

export const searchMobiles = async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.status(400).json({ status: "error", message: "Search query is missing" });
    }
    connection.query(
        "SELECT * FROM mobiles WHERE title LIKE ?",
        [`%${searchQuery}%`],
        (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.status(200).send(data);
        }
    );
};

export const createReservation = async (req, res) => {
    const { name, email, phone, mobile_model, issue_description, preferred_date } = req.body;

    connection.query(
        "INSERT INTO reservations (name, email, phone, mobile_model, issue_description, preferred_date) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, phone, mobile_model, issue_description, preferred_date],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server error");
                return;
            }
            res.status(201).send("Reservation created successfully");
        }
    );
};

export const getReservations = async (req, res) => {
    connection.query("SELECT * FROM reservations", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Server error");
            return;
        }
        res.status(200).json(results);
    });
};