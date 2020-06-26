const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function checkRepo(request,response,next){



  if ( repositorieIndex < 0 ) {
    return response.status(400).json({ error: 'The requested repositorie was not found' })
  }
  
}

const repositories = [];
const like = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs = []} = request.body;

  const repositorie = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs = [] } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if ( repositorieIndex < 0 ) {
    return response.status(400).json({ error: 'The requested repositorie was not found' })
  };

  const repositorie = {id, title, url, techs, likes: repositories[repositorieIndex].likes} ;

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
  
});

app.delete("/repositories/:id", (request, response,) => {
  const { id } =  request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    
  if ( repositorieIndex < 0 ) {
    return response.status(400).json({ error: 'The requested repositorie was not found' });
  };

  repositories.splice(repositorieIndex);

  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
    
  if ( repositorieIndex < 0 ) {
    return response.status(400).json({ error: 'The requested repositorie was not found' })
  };

  repositories[repositorieIndex].likes += 1;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
