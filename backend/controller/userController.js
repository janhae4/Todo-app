const User = require("../models/User");

exports.Add = async (data) => {
    const user = new User(data);
    await user.save();
    return user
};

exports.Get = async (username) => {
    return await User.findOne({username: username});
}