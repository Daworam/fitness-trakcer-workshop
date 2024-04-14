const client = require('./client.js');

const createRoutine = async (routineName, routinePublic, routineGoal) => {
  try{
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines (name, is_public, goal)
      VALUES('${routineName}', '${routinePublic}', '${routineGoal}')
      RETURNING *;
    `);
    return routine;
  }catch(error){
    console.log(error);
  }
};

const getRoutines = async () => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);

    return rows;
  }catch(error){
    console.log(error);
  }
};

const getOneRoutine = async (id) => {
  try{
    const { rows: [ routine ]} = await client.query(`
    SELECT * FROM routines
    WHERE id = ${id};
    `);
    return routine;
  }catch(error){
    console.log(error);
  }
}

const deleteRoutine = async (id) => {
  try{
    const {rows} = await client.query(`
    DELETE FROM activities_routines
    WHERE id = ${id};
    
    DELETE FROM routines
    WHERE id = ${id};
    `);
  }catch(error){
    console.log(error);
  }
}

module.exports = {
  createRoutine,
  getRoutines,
  getOneRoutine,
  deleteRoutine
}