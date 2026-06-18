const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
const bcrypt = require('bcrypt');
passport.use(new LocalStrategy(async (Username, password, done) => {
  try {
    console.log('recived credential',Username,password)
    const user = await Person.findOne({ username:Username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isPasswordMatch =user.password === password ? true : false;
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (error) {
    return done(error);
  }
}));


module.exports=passport;