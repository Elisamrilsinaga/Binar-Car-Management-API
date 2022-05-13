const authService = require("../../../services/authService");
const bcrypt = require("bcrypt");

module.exports = {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            let hashPassword = await bcrypt.hash(password, 10);

            await authService
                .create({ username, password: hashPassword })
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
        } catch (err) {
            res.status(500).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            await authService
                .getProfile({ username })
                .then(async (profile) => {
                    if (profile) {
                        console.log(password, profile.password);
                        const valid = await bcrypt.compare(password, profile.password);
                        if (valid) {
                            res.status(200).json({
                                status: "OK",
                            });
                        } else {
                            res.status(404).json({
                                status: "Not Found",
                            });
                        }
                    }
                })
                .catch((err) => {
                    res.status(404).json({
                        status: "FAIL",
                        message: err.message,
                    });
                });
        } catch (err) {
            res.status(500).json({
                status: "FAIL",
                message: err.message,
            });
        }
    }
}