-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country INTEGER REFERENCES countries ON DELETE CASCADE
);

CREATE TABLE airlines 
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline INTEGER REFERENCES airlines ON DELETE CASCADE,
  from_city INTEGER REFERENCES cities ON DELETE CASCADE,
  to_city INTEGER REFERENCES cities ON DELETE CASCADE
);

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE passengers_flight
(
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER REFERENCES passengers ON DELETE CASCADE,
  flight_id INTEGER REFERENCES flights ON DELETE CASCADE,
  seat TEXT NOT NULL
);

INSERT INTO countries (name)
VALUES ('United States'), ('Japan'), ('France'), ('UAE'), ('Brazil'), ('United Kingdom'), ('Mexico'), ('Morocco'), ('China'), ('Chile');

INSERT INTO cities (name, country)
VALUES 
  ('Washington DC', 1),
  ('Tokyo', 2),
  ('Los Angeles', 1),
  ('Seattle', 1),
  ('Paris', 3),
  ('Dubai', 4),
  ('New York', 1),
  ('Cedar Rapids', 1),
  ('Charlotte', 1),
  ('Sao Paolo', 5),
  ('London', 6),
  ('Las Vegas', 1),
  ('Mexico City', 7),
  ('Casablanca', 8),
  ('Beijing', 9),
  ('Charlotte', 1),
  ('Chicago', 1),
  ('New Orleans', 1),
  ('Santiago', 10);

INSERT INTO airlines (name)
VALUES ('United'), ('British Airways'), ('Delta'), ('TUI Fly Belgium'), ('Air China'), ('American Airlines'), ('Avianca Brasil');

INSERT INTO flights (departure, arrival, airline, from_city, to_city)
VALUES
  ('2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 4),
  ('2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 2, 11),
  ('2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 3, 12),
  ('2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 4, 13),
  ('2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 5, 14),
  ('2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 6, 15),
  ('2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 7, 16),
  ('2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 8, 17),
  ('2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 9, 18),
  ('2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 10, 19);

INSERT INTO passengers (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes');

INSERT INTO passengers_flight (passenger_id, flight_id, seat)
VALUES
  (1, 1, '33B'),
  (2, 2, '8A'),
  (3, 3, '12F'),
  (1, 4, '20A'),
  (4, 5, '23D'),
  (2, 6, '18C'),
  (5, 7, '9E'),
  (6, 8, '1A'),
  (5, 9, '32B'),
  (7, 10, '10D');


