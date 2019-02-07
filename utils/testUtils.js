import faker from 'faker';

export const fakeUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});