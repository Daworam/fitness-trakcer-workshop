const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createActivitiesRoutines } = require('./activities_routines.js');

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        description TEXT
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        is_public BOOLEAN,
        goal TEXT
      );

      CREATE TABLE activities_routines (
        id SERIAL PRIMARY KEY,
        activity_id INTEGER REFERENCES activities(id),
        routine_id INTEGER REFERENCES routines(id),
        count INT
      );
    `)
  }catch(error){
    console.log(error);
  }
}

const dropTables = async () => {
  try{
    await client.query(`
      DROP TABLE IF EXISTS activities_routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  }catch(error){
    console.log(error)
  }
}

const syncAndSeed = async () => {
  await client.connect();
  console.log("connected to db");

  await dropTables();
  console.log("tables dropped");

  await createTables();
  console.log("tables created");

  const crunches = await createActivity('Crunches', 'An effective ab exercise');
  const pullUps = await createActivity('Pull-ups', 'an arm and back exercise');
  const squats = await createActivity('Squats', 'a leg exercise');
  console.log('activity created');

  const superAbs = await createRoutine('Super Abs', true, 'This is the goal for Super Abs');
  const superArms = await createRoutine('Super Arms', true, 'This is the goal for Super Arms');
  const superLegs = await createRoutine('Super Legs', false, 'This is the goal for Super Legs');
  console.log('routine created');

  await createActivitiesRoutines(crunches.id, superAbs.id, 10);
  await createActivitiesRoutines(pullUps.id, superArms.id, 15);
  await createActivitiesRoutines(squats.id, superLegs.id, 25);
  console.log('activity_routine created');

  await client.end();
  console.log("disconnected")

}

syncAndSeed();