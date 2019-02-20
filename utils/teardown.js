use barbelith-db;
show collections;
db.users.remove({});
db.sessions.remove({});
db.posts.remove({});
