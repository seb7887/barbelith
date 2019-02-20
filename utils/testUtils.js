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

export const generateUsers = quantity => {
  const generatedUsers = [];

  for (let i = 0; i < quantity; i++) {
    const user = {
      _id: `${i}`,
      name: `test${i}`,
      avatar: faker.image.avatar()
    };
    generatedUsers.push(user);
  }

  return generatedUsers;
};

export const generateComments = quantity => {
  const generatedComments = [];

  for (let i = 0; i < quantity; i++) {
    const comment = {
      _id: faker.random.uuid().toString(),
      postedBy: {
        _id: '7',
        name: 'test',
        avatar: faker.image.avatar()
      },
      text: faker.lorem.text()
    };
    generatedComments.push(comment);
  }
  return generatedComments;
};

export const fakePost = () => ({
  _id: '7',
  postedBy: {
    _id: '7',
    name: 'test',
    avatar: faker.image.avatar()
  },
  createdAt: faker.date.recent().toString(),
  text: faker.lorem.text(),
  image: faker.image.avatar(),
  likes: ['7'],
  comments: []
});
