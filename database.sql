
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"("id" SERIAL PRIMARY KEY, 
"username" VARCHAR(80) UNIQUE NOT NULL,
 "password" VARCHAR(1000) NOT NULL,
 "is_coach" BOOLEAN, "bio" VARCHAR(300), 
 "goals" VARCHAR(300), 
 "email" VARCHAR(50);
 
CREATE TABLE "skill" ("id" SERIAL PRIMARY KEY,
  "title" VARCHAR(80),
  "url" VARCHAR(300),
  "favorite" BOOLEAN DEFAULT FALSE
  "author" VARCHAR(80),
  "description" VARCHAR (200));
 
CREATE TABLE "user_skill"("id" SERIAL PRIMARY KEY,
     "user_id" INT REFERENCES "user"("id"),
     "skill_id" INT REFERENCES "skill"("id"),
     "coach_notes" VARCHAR(400),
     "skater_notes" VARCHAR(400));

CREATE TABLE "category"("id" SERIAL PRIMARY KEY,
     "name" VARCHAR(50));

CREATE TABLE "skill_category"("id" SERIAL PRIMARY KEY,
     "skill_id" INT REFERENCES "skill"("id"),
     "category_id" INT REFERENCES "category"("id"));

INSERT INTO "category" ("name") VALUES('hockey stop')
    ('plow stop'), ('agility'), ('edges'), ('toe stop'),
    ('backwards'), ('transition'), ('crossover'), ('stride'),
    ('stutter/stepping'), ('stance'), ('power slide'),
    ('other stop'), ('contact'), ('lateral movement'), ('jump'),
    ('juke'), ('cut'), ('weave'), ('level change'), 
    ('single foot'), ('assist'), ('spread eagle'); 

CREATE TABLE "user_footage" 
     ( "id" SERIAL PRIMARY KEY, 
          "added_by" VARCHAR(100),
          "user_skill_id" INT REFERENCES "user_skill", 
          "url" VARCHAR(500), 
          "notes" VARCHAR(500) 
     );
