CREATE TABLE IF NOT EXISTS users (
  id                     VARCHAR(60)  DEFAULT RANDOM_UUID() PRIMARY KEY,
  name                   VARCHAR      NOT NULL,
  email                  VARCHAR      NOT NULL,
  phone                  VARCHAR      NOT NULL
);
