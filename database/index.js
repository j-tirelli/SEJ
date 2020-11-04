const Message = require('./Message.js');
const User = require('./User.js');

const Login = (name, callback) => {
  let userId;
  return User.find({ name })
    .then((result) => {
      if (result.length === 0) {
        let newUser = new User({ name });
        return newUser.save()
          .then( (result) => {
            return {name, id: result.id};
          } )
          .catch(logErrorToConsole);
      } else {
        return {name, id: result[0].id};
      }
    })
    .catch(logErrorToConsole);
};

const GetAllMessages = () => {
  return Message.find({}).populate('user')
    .then( chat => chat )
    .catch(logErrorToConsole);
};

const logErrorToConsole = (error) => {
  console.error(error);
};

module.exports = {
  Login,
  GetAllMessages,
  logErrorToConsole
};