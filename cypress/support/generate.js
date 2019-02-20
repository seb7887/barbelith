import faker from 'faker';

const validName = () => {
  let name = '';

  while (name.length < 4 || name.length > 12) {
    name = faker.name.firstName();
  }

  return name;
}

export const generateUser = () => ({
  name: validName(),
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
