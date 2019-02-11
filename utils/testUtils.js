import faker from 'faker';

export const validUser = () => ({
  name: 'kingmob',
  email: 'king@mob.com',
  password: 'km1234'
});

export const fakeUser = () => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockedUser = () => ({
  _id: '7',
  avatar: '/static/images/avatar.jpg',
  createdAt: '2019-02-1234',
  email: faker.internet.email(),
  followers: ['1', '2', '3'],
  following: ['3'],
  name: 'Test',
  updatedAt: '2019-02-1234'
});

export const updatedUser = () => ({
  _id: '7',
  name: 'kingmob',
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  about: faker.lorem.text()
});
