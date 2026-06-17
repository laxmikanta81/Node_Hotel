const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');
const bcrypt = require('bcrypt');
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Person.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
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