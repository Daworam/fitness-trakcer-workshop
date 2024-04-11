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
    
  }catch(error){
    console.log(error);
  }
};

getOneActivity(1);
module.exports = {
  createActivity,
  getActivities,
}