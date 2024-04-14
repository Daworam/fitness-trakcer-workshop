const express = require('express');
const app = express();
const { getActivities, createActivity, getOneActivity } = require('./db/activities.js');
const { getRoutines, createRoutine, getOneRoutine } = require('./db/routines.js');
const { createActivitiesRoutines } = require('./db/activities_routines.js');

const client = require('./db/client.js');
client.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/v1/activities', async (req, res, next) => {
  try{
    const allActivities = await getActivities();

    res.send(allActivities)
  }catch(error){
    next(error);
  }
});

app.get('/api/v1/activities/:id', async (req, res, next) => {
  const {id} = req.params;
  try{
    const oneActivity = await getOneActivity(id);

    res.send(oneActivity);
  }catch(error){
    next(error);
  }
});

app.get('/api/v1/routines', async (req, res, next) => {
  try{
    const allRoutines = await getRoutines();

    res.send(allRoutines)
  }catch(error){
    next(error);
  }
});

app.get('/api/v1/routines/:id', async (req, res, next) => {
  const {id} = req.params;
  try{
    const oneRoutine = await getOneRoutine(id);
    
    res.send(oneRoutine);
  }catch(error){
    next(error);
  }
})


app.post('/api/v1/activities', async (req, res, next) => {
  try{
    const { name, description } = req.body;
    const newActivity = await createActivity(name, description);
    res.send(newActivity);
  }catch(error){
    next(error);
  }
});

app.post('/api/v1/routines', async (req, res, next) => {
  try{
    const { name, is_public, goal } = req.body;
    const newRoutine = await createRoutine(name, is_public, goal);
    res.send(newRoutine);
  }catch(error){
    next(error);
  }
});

app.post('/api/v1/activities_routines', async (req, res, next) => {
  try{
    const { activity_id, routine_id, count } = req.body;
    const newActRout = await createActivitiesRoutines(activity_id, routine_id, count);
    res.send(newActRout);
  }catch(error){
    next(error);
  }
});

app.listen(8080, ()=>{
  console.log("fitness tracker listening on 8080")
});