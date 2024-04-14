const client = require('./client.js');

const createActivity = async (activityName, activityDescription) => {
  try{
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities (name, description)
    VALUES('${activityName}', '${activityDescription}')
    RETURNING *;
    `);
    return activity;
  }catch(error){
    console.log(error);
  }
};

const getActivities = async () => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);

    return rows;
  }catch(error){
    console.log(error);
  }
};

const getOneActivity = async (id) => {
  try{
    const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE id = ${id};
    `);

    return activity;
  }catch(error){
    console.log(error);
  }
};

const deleteActivity = async (id) => {
  try{
    const {rows} = await client.query(`
    DELETE FROM activities_routines
    WHERE id = ${id};
    
    DELETE FROM activities
    WHERE id = ${id};
    `);
  }catch(error){
    console.log(error);
  }
}

getOneActivity(1);
module.exports = {
  createActivity,
  getActivities,
  getOneActivity,
  deleteActivity
}