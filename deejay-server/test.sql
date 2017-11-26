SELECT rooms.id, users.id
FROM rooms
INNER JOIN users ON rooms.id = users.roomid;

SELECT rooms.id, users.id
FROM rooms
INNER JOIN users ON rooms.id = users.roomid
WHERE rooms.id = 21;


SELECT id, top_artists
FROM users
WHERE id = 11;

-- SELECT table1.column1, table2.column2...
-- FROM table1
-- INNER JOIN table2
-- ON table1.common_filed = table2.common_field;
