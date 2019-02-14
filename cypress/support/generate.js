import faker from 'faker';

export const generateUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: '1234'
});

export const generateUsers = (quantity) => {
  const generatedUsers = [];

  for (let i = 0; i < quantity; i++) {
    const user = generateUser();
    generatedUsers.push(user);
  }

  return generatedUsers;
};
