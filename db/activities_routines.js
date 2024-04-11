const client = require('./client.js');

const createActivitiesRoutines =  async (activity_id, routine_id, count) => {
  try{
    await client.query(`
      INSERT INTO activities_routines(activity_id, routine_id, count)
      VALUES('${activity_id}','${routine_id}','${count}');
    `);
  }catch(error){
    console.log(error);
  }
}

module.exports = {
  createActivitiesRoutines
}