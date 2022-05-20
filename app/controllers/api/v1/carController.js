const carService = require("../../../services/carService");
const jwt = require("jsonwebtoken");

module.exports = {

  list(req, res) {
    carService
      .list()
      .then(({ data, count }) => {
        
        res.status(200).json({
          status: "OK",
          data: { posts: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {

    const bearerToken = req.headers.authorization; 
      const token = bearerToken.split("Bearer ")[1]; 
      const tokenPayload = jwt.verify( 
        token, 
        process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
      );

      if(tokenPayload.role == "member"){
        res.status(201).json({ message: "Not Authorized" });
        return;
      }
      
      const add_user = tokenPayload.name

    carService
      .create({...req.body, add_user, status_delete: "false"})
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {

    const bearerToken = req.headers.authorization; 
    const token = bearerToken.split("Bearer ")[1]; 
    const tokenPayload = jwt.verify( 
      token, 
      process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
    );
  
  if(tokenPayload.role == "member"){
    res.status(201).json({ message: "Not Authorized" });
    return;
  }

  const update_user = tokenPayload.name  

    carService
      .update(req.params.id, {...req.body, update_user})
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    carService
      .get(req.params.id)
      .then((post) => {
        if(post.status_delete=="true"){
          res.status(201).json({ message: "Data Deleted" });
          return;
        }
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  history(req, res) {

    const bearerToken = req.headers.authorization; 
    const token = bearerToken.split("Bearer ")[1]; 
    const tokenPayload = jwt.verify( 
      token, 
      process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
    );

    if(tokenPayload.role == "Member" || tokenPayload.role == "Admin"){
      res.status(201).json({ message: "Not Authorized" });
      return;
    }

    carService
    .list()
    .then(({ data, count }) => {
        let newdata = data.filter((row) => row.status_delete == "true");
        newdata = newdata.map((row)=>{
          return {
            ...row, specs : row.specs.split(",")
          }

        })
        const newCount = newdata.length;
        res.status(200).json({
          status: "OK",
          data: { posts: newdata },
          meta: { total: newCount },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    const bearerToken = req.headers.authorization; 
      const token = bearerToken.split("Bearer ")[1]; 
      const tokenPayload = jwt.verify( 
        token, 
        process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
      );
    
    if(tokenPayload.role == "member"){
      res.status(201).json({ message: "Not Authorized" });
      return;
    }

    const delete_user = tokenPayload.name;

    carService
      .update(req.params.id, {...req.body, delete_user,status_delete: "true"})
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
