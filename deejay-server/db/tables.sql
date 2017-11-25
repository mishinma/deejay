CREATE TABLE rooms (
	id  SERIAL  PRIMARY KEY,
	url  VARCHAR(100)  NOT NULL  UNIQUE,
	seed_tracks  JSON,
	seed_artists  JSON
);


CREATE TABLE users (
	id  SERIAL  PRIMARY KEY,
	roomid   INT  REFERENCES  rooms,
	top_tracks    JSON,
	top_artists   JSON
);


-- CREATE TABLE rooms (
-- 	id  SERIAL  PRIMARY KEY,
-- 	url  VARCHAR(100)  NOT NULL  UNIQUE,
-- 	hostid  VARCHAR(100) NOT NULL,
-- 	seed_tracks  JSON,
-- 	seed_artists  JSON
-- );
--
-- ALTER TABLE rooms ADD CONSTRAINT rooms_hostid_fkey FOREIGN KEY (hostid)  REFERENCES  users (id);
