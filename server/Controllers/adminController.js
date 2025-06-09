const Admin = require("../Models/admin");

//Create- Post
const createNewAdmin = async (req, res) => {
    const { username, password, roles } = req.body
    if (!username|| !password) {
        return res.status(400).json({ message: 'failds is required' })
    }


    const adnim = await Admin.create({ username, password, roles })
    if (adnim) {
        return res.status(201).json({ message: 'New Admin created' })
    } else {
        return res.status(400).json({ message: 'Invalid Admin ' })
    }
}

module.exports = {createNewAdmin };