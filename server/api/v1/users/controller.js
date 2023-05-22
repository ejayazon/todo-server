const { promiseController } = require('../../utils');

const get = promiseController((req) => {
  const userDummy = {
    name: 'Elton',
    nickname: 'Ejay',
  };
  return userDummy;
});

module.exports = {
  get,
};
