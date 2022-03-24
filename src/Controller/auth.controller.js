const { signUp, signIn, checkCookie } = require('../Service/user.service');
const { userObj } =  require('../Models/users.model');

var reqObj = [];
for (let _obj of Object.keys(userObj)) {
    if (userObj[_obj]?.required) {
        reqObj.push(_obj);
    }
}

const signup = async (req, res) => {
    const currentObj = Object.keys(req.body);
    let error;
    reqObj.forEach(item => {
        if (currentObj.includes(item)) {
            if (typeof (req.body[item]) == 'string' && !req.body[item].length) {
                error = item;
                return;
            }
            else if (typeof (req.body[item]) == 'object' && !Object.keys(req.body[item]).length) {
                error = item;
                return;
            }
            
        }
        else {
            error = item;
            return;
        }
        
    })
    if (error) { 
        res.json({error: `${error} is required`});
        return;
    }
    
    const userCreation = await signUp(req.body);
    res.status(201).json({
        ...userCreation
    })
    return;
}

const signin = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const getUser = await signIn(userName, password);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(200).json({
        ...getUser
    });
    return;
    
}

const validateUser = async (req, res) => {
    const userId = res.locals.userId;

    const getUser = await checkCookie(userId);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(401).json({
        ...getUser
    });
    return;
    
}

module.exports = {
    signin,
    signup,
    validateUser
}