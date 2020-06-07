CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    group_name text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    group_name text NOT NULL REFERENCES users,
    body text NOT NULL,
    played_at timestamp with time zone NOT NULL,
);
