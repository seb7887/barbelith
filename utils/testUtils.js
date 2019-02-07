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
