require('../../../globals');
const taskService = require('./service');
const userService = require('../users/service');

describe('Task services', () => {
  let taskId;
  let userId;
  test('create a task and must return the same data', async () => {
    const dummyUserData = {
      email: 'createdbytask@mail.com',
      firstName: 'John',
      lastName: 'Doe',
    };
    const user = await userService.create(dummyUserData);

    const dummyTaskData = {
      name: 'Task 1 Test',
      description: 'Create a unit test',
      createdBy: user.id,
    };
    const task = await taskService.create(dummyTaskData);
    expect(dummyTaskData.name).toEqual(task.name);
    expect(dummyTaskData.description).toEqual(task.description);
    expect(dummyTaskData.createdBy).toEqual(task.createdBy);
    taskId = task.id;
    userId = user.id;
  });

  test('update a task with existing id and must return the updated details', async () => {
    const sDummyTaskData = {
      name: 'Task 1 Test v2',
      description: 'Create unit tests',
      priority: 'HIGH',
    };
    const task = await taskService.update({ ...sDummyTaskData, id: taskId });
    expect(sDummyTaskData.name).toEqual(task.name);
    expect(sDummyTaskData.description).toEqual(task.description);
    expect(sDummyTaskData.priority).toEqual(task.priority);
  });

  test('get a task by id', async () => {
    const sDummyTaskData = {
      name: 'Task 1 Test v2',
      description: 'Create unit test',
    };
    const task = await taskService.get(taskId);
    expect(sDummyTaskData.firstName).toEqual(task.firstName);
    expect(sDummyTaskData.lastName).toEqual(task.lastName);
  });

  test('delete a task', async () => {
    const task = await taskService.delete(taskId);
    await userService.delete(userId);
    expect(taskId).toEqual(task.id);
  });

  test('get a task by id that does not exists', async () => {
    await expect(async () => {
      await taskService.get(taskId);
    }).rejects.toThrowError(Error);
  });

  test('delete a task that does not exists, must return an error', async () => {
    await expect(async () => {
      await taskService.delete(taskId);
    }).rejects.toThrowError(Error);
  });
});
