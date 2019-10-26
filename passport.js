const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('./model/user');

//jsonwebtoken 검증
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try {
        const user = await userModel.findById({_id: payload.sub}); //sub: token에 들어간 user._id

        if(!user){
            return done(null, false) //null: 에러에 유저정보가 없고, false: 유저인증이 안됨
        }
        done(null, user); //else는 생략 가능
    }
    catch(error) {
        done(error, false); //false: 검증이 안됐다
    }
}));
// local일때 email password 인증 체크
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => { //email, password: 사용자 입력값
    try {
        const user = await userModel.findOne({"local.email": email}); //local.email: db에 있는 email, email: 사용자email입력값
        if(!user){
            return done(null, false)
        }
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return done(null, false);
        }
        done(null, user); //됬을때 user로 return
    }
    catch(error) {
        done(error, false);
    }
}));
// LOCAL STRATEGY
// passport.use(new LocalStrategy({
//     usernameField: 'email'
// }, async (email, password, done) => {
//     try {
//         // Find the user given the email
//         const user = await userModel.findOne({ "local.email": email });
//
//         // If not, handle it
//         if (!user) {
//             return done(null, false);
//         }
//
//         // Check if the password is correct
//         const isMatch = await user.isValidPassword(password);
//         // If not, handle it
//         if (!isMatch) {
//             return done(null, false);
//         }
//         // Otherwise, return the user
//         done(null, user);
//     } catch(error) {
//         done(error, false);
//     }
//
// }));
