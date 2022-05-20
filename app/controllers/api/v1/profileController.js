const profileService = require("../../../services/profileService");
const postService = require("../../../services/profileService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Secret / Hidden");
}

module.exports = {
  list(req, res) {

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

    postService
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

  async create(req, res) {
    const encryptedPassword = await encryptPassword(req.body.password);

    postService
      .create({...req.body, password:encryptedPassword, role:"SuperAdmin"})
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

  async create1(req, res) {
    const encryptedPassword = await encryptPassword(req.body.password);

    postService
      .create({...req.body, password:encryptedPassword, role:"Member"})
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

  async update(req, res) 
  {
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
    const username = req.body.username;
    const email = req.body.email;
    const password = await encryptPassword(req.body.password); 
    const data = {username,email,password}
    postService
      .update(req.params.id,data)
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

  async updaterole(req, res) 
  {
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
    const role = "Admin"; 
    const data = {role}
    postService
      .update(req.params.id, data)
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

    postService
      .get(req.params.id)
      .then((post) => {
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

  profile(req, res) {
    const bearerToken = req.headers.authorization; 
    const token = bearerToken.split("Bearer ")[1]; 
    const tokenPayload = jwt.verify( 
      token, 
      process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
    );

    postService
      .get(tokenPayload.id)
      .then((post) => {
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

  destroy(req, res) {
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

    postService
      .delete({where : {
        id : req.params.id}
      })
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase(); // Biar case insensitive
    const password2 = req.body.password;

    const loginuser = await profileService.login(email)

    if (!loginuser) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(
      loginuser.password,
      password2
    );

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }

    const token = createToken({
      id: loginuser.id,
      username: loginuser.username,
      email: loginuser.email,
      role: loginuser.role,
      createdAt: loginuser.createdAt,
      updatedAt: loginuser.updatedAt,
    });

    res.status(200).json({
      statusLogin :"Berhasil",
      id: loginuser.id,
      email: loginuser.email,
      token, 
      createdAt: loginuser.createdAt,
      updatedAt: loginuser.updatedAt,
    });
  },

  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization; 
      const token = bearerToken.split("Bearer ")[1]; 
      const tokenPayload = jwt.verify( 
        token, 
        process.env.JWT_SIGNATURE_KEY || "Secret / Hidden" 
      );

      req.loginuser = await profileService.get(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

};
