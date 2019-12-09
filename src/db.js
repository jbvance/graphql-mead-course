import { DefaultDeserializer } from "v8";

const users = [
    {
      id: '1',
      name: 'Jason',
      email: 'jason@test.com',
      age: 44
    },
    {
      id: '2',
      name: 'Sarah',
      email: 'sarah@example.com'
    },
    {
      id: '3',
      name: 'Mike',
      email: 'mike@example.com'
    }
  ];
  
  // Demo post data
  const posts = [
    {
      id: '1',
      title: 'First Post',
      body: 'First Post Body',
      published: true,
      author: '1'
    },
    {
      id: '2',
      title: 'Second Post',
      body: 'Second Post Body',
      published: false,
      author: '1'
    },
    {
      id: '3',
      title: 'Third Post',
      body: 'Third Post Body',
      published: true,
      author: '2'
    }
  ];
  
  const comments = [
    {
      id: '101',
      text: 'comment 1',
      author: '1',
      post: '1'
    },
    {
      id: '102',
      text: 'comment 2',
      author: '1',
      post: '2'
    },
    {
      id: '103',
      text: 'comment 3',
      author: '2',
      post: '3'
    },
    {
      id: '104',
      text: 'comment 4',
      author: '3',
      post: '3'
    }
  ];

  const db = {
    users,
    posts,
    comments
  };

  export { db as default };