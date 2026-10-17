CREATE table todos(
id SERIAL PRIMARY KEY,
title varchar(255) NOT NULL,
body TEXT NOT NULL DEFAULT '',
craeted_at timestamp NOT NULL default now(),
done VARCHAR(3) NOT NULL DEFAULT 'no' CHECK (done IN ('yes', 'no'))
);
