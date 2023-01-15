const bcrypt = require("bcrypt");
const User = require("../database/Users");

const updateHashedPassword = async (req, res) => {
    try {
        // hash the new password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // update the document in the database
        const result = await User.updateOne({ _id: req.body._id }, { $set: { password: hashedPassword } });
        if (result.modifiedCount === 0) {
            return res.status(404).send("Document not found");
        }
        res.send(`Successfully updated password for user`);
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports={updateHashedPassword}