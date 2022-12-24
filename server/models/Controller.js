const { Product, User } = require('./dataSchema');
const bcrypt = require('bcryptjs');
const data = require('./data');

const oneMonth = 2629800000;

exports.hello = async(req, res) => {
    await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
};

exports.products = async(req, res) => {
    // console.log('product');
    const products = await Product.find({});
    res.send(products);
};

exports.usersLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            const result = await bcrypt.compare(password, userExist.password);
            const token = await userExist.userAuth();
            // console.log(token);
            res.cookie('shopping', token, {
                expires: new Date(Date.now() + oneMonth),
                httpOnly: true,
            });
            result
                ?
                res.send(userExist).status(201) :
                res.send({ error: 'Invalid detailes' });
        }
    } catch (error) {
        // console.log(error.message);
    }
};
exports.signup = async(req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        {
            // console.log('userExist');
            res.send({ message: 'User Already Exist' });
            return;
        }
    }
    try {
        // console.log(name, email, password);
        const register = new User({
            name,
            email,
            password,
        });
        const CreateUser = await register.save();
        const token = await CreateUser.userAuth();
        // console.log(token);
        res.cookie('shopping', token, {
            expires: new Date(Date.now() + oneMonth),
            httpOnly: true,
        });
        res.send(CreateUser);
    } catch (error) {
        res.send({ error: 'server Error' });
        // console.log(error);
    }
};

exports.userAuth = async(req, res) => {
    const _id = req.user._id;
    const userExist = await User.findOne({ _id });
    res.send(userExist);
};

exports.logout = async(req, res) => {
    res.clearCookie('shopping');
    res.status(200).send({ message: 'Logout Successfully' });
};