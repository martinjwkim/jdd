CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    group_name text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE players {
    id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES users,
    player1 text NOT NULL,
    player2 text NOT NULL,
    player3 text NOT NULL,
    player4 text NOT NULL,
}

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    username text NOT NULL REFERENCES users,
    body text NOT NULL,
    played_at timestamp with time zone NOT NULL,
);
