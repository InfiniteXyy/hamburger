import faker from 'faker';
import ElizaBot from 'elizabot';

export const Me = {
  username: faker.name.findName(),
  avatar: faker.image.avatar(),
};

export const friends = [0, 1, 2, 3, 4, 5, 6].map((i) => {
  const user = {
    id: i,
    isTyping: false,
    username: faker.name.lastName(),
    avatar: faker.image.avatar(),
    title: faker.lorem.words(2),
  };
  return {
    ...user,
    messages: generateMessage(user, faker.random.number({ min: 1, max: 5 })),
  };
});

function generateMessage(targetUser, amount) {
  const result = [];
  let isMe = faker.random.boolean();
  while (result.length < amount) {
    const user = isMe ? Me : targetUser;
    result.push({
      isMe,
      content: faker.lorem.sentence(4, 1),
      avatar: user.avatar,
    });
    isMe = !isMe;
  }
  return result;
}

const botMap = {};

export function responseMessage(friend, message) {
  let eliza;
  if (!botMap[friend.id]) {
    eliza = new ElizaBot();
    botMap[friend.id] = eliza;
    console.log(friend.username, 'init bot');
  } else {
    eliza = botMap[friend.id];
  }

  return {
    isMe: false,
    content: eliza.transform(message),
    avatar: friend.avatar,
  };
}
