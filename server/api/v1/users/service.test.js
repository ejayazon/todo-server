require('../../../globals');
const userService = require('./service');

describe('User services', () => {
  let userId;
  test('create a user and must return the same data', async () => {
    const dummyUserData = {
      email: 'userthatmustbedelete@mail.com',
      firstName: 'John',
      lastName: 'Doe',
    };
    const user = await userService.create(dummyUserData);
    expect(dummyUserData.email).toEqual(user.email);
    expect(dummyUserData.firstName).toEqual(user.firstName);
    expect(dummyUserData.lastName).toEqual(user.lastName);
    userId = user.id;
  });

  test('create a user with existing email and must return an error', async () => {
    const dummyUserData = {
      email: 'userthatmustbedelete@mail.com',
      firstName: 'John',
      lastName: 'Doe',
    };
    await expect(async () => {
      await userService.create(dummyUserData);
    }).rejects.toThrowError(Error);
  });

  test('update a user with existing email and must return the updated details', async () => {
    const sDummyUserData = {
      firstName: 'John2',
      lastName: 'Doe2',
    };
    const user = await userService.update({ ...sDummyUserData, id: userId });
    expect(sDummyUserData.firstName).toEqual(user.firstName);
    expect(sDummyUserData.lastName).toEqual(user.lastName);
  });

  test('get a user by id', async () => {
    const sDummyUserData = {
      firstName: 'John2',
      lastName: 'Doe2',
    };
    const user = await userService.get(userId);
    expect(sDummyUserData.firstName).toEqual(user.firstName);
    expect(sDummyUserData.lastName).toEqual(user.lastName);
  });

  test('delete a user', async () => {
    const user = await userService.delete(userId);
    expect(userId).toEqual(user.id);
  });

  test('get a user by id that does not exists', async () => {
    await expect(async () => {
      await userService.get(userId);
    }).rejects.toThrowError(Error);
  });

  test('delete a user that does not exists, must return an error', async () => {
    await expect(async () => {
      await userService.delete(userId);
    }).rejects.toThrowError(Error);
  });
});
