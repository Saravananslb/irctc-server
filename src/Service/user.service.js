const { usersModel } = require('../Models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'irctcSecret';

const { success, failure } = require('../Utils/helper');

const findUser = async (mobile, email) => {
    try {
        const user = await usersModel.findOne({
            $or: [{mobile: mobile}, {email: email}]
        })
        return user;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

const signUp = async (body) => {
    try {
        const userCheck = await findUser(body.mobile, body.email);
        if (userCheck) return failure({ exists: true, error: 'user already exists' }, 'user exists, please sign in to continue..')
        const hashPassword = await bcrypt.hash(body.password, saltRound);
        const userCreate = new usersModel({
            ...body,
            password: hashPassword
        });
        const signInUser = await userCreate.save();
        delete signInUser._doc.password
        return success(signInUser._doc, 'user created successfully');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to create user');
    }
}

const signIn = async (userName, password) => {
    try {
        const user = await usersModel.findOne({userName: userName});
    
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const authToken = jwt.sign({
                    mobile: user.mobile,
                    id: user.id
                }, JWT_SECRET, { expiresIn: '10hrs' });
                delete user.password;
                return success({ authToken: authToken, ...user }, 'user logged in successfully')
            }
            return failure({ error: 'wrong password' }, 'incorrect password')
        }
        return failure({ error: 'user not found' }, 'user not found');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to login user')
    }
}

const checkCookie = async (userId) => {
    try {
        const user = await usersModel.findById(userId);
    
        if (user) {
            const authToken = jwt.sign({
                mobile: user.mobile,
                id: user.id
            }, JWT_SECRET, { expiresIn: '10hrs' });
            return success({ authToken: authToken, email: user.email, id: user.id, name: user.name }, 'user logged in successfully')
            
        }
        return failure({ error: 'user not found' }, 'user not found');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to validate user')
    }
}

module.exports = {
    signUp,
    signIn,
    checkCookie
}