const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@email.com",
      },
      {
        name: "Jane Doe",
        email: "jane@email.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest",
        email: "guest@email.com",
      },
      {
        name: "Alan King",
        email: "alan@email.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Charles Deluvio",
        email: "charles@email.com",
      },
      {
        name: "Alan King",
        email: "alan@email.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Charles Deluvio",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "john@email.com",
      },
      {
        name: "Alan King",
        email: "alan@email.com",
      },
      {
        name: "Guest",
        email: "guest@email.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest",
      email: "guest@email.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@email.com",
      },
      {
        name: "Alan King",
        email: "alan@email.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "john@email.com",
      },
      {
        name: "Alan King",
        email: "alan@email.com",
      },
      {
        name: "Guest",
        email: "guest@email.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Crypto",
    groupAdmin: {
      name: "Guest",
      email: "guest@email.com",
    },
  },
];

module.exports = { chats };
