const local_strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize_passport(passport, get_user_by_username, get_user_by_id) {
    const authenticate_user =  async (username, password, done) => {
        const user = get_user_by_username(username)
        console.log('passport config', user)
        if (user == null) {
            return done(null, false, { message: 'No user with that name.'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null,false, { message: "Password is incorrect"})
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new local_strategy({ usernameField: 'username'}, authenticate_user))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { return done(null, get_user_by_id(id))
    })
    console.log("this function", get_user_by_id)
}

module.exports = initialize_passport