const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Conectado a la BBDD: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( (response) => {
    console.log("First promise in process.");
    return Recipe.create({
      title: "Apple Pie",
      level: "Easy Peasy",
      ingredients: ["Flour", "Butter", "Apples", "Sugar", "Eggs", "Cinnammon", "Nutmeg"],
      cuisine: "German",
      dishType: "dessert",
      image: "http://imgfz.com/i/Wd4gMEp.jpeg",
      duration: 45,
      creator: "Sarah Jane Calvo"
    });
  })
  .then( (response) => {
    console.log("Recipe added!")
    console.log("Second promise in process.")
    return Recipe.insertMany(data)
  })
  .then( (response) => {
    console.log("Recipes (array) added!")
    console.log("Third promise in process.")
    response.forEach( (element) => {
      console.log(element.title)
    })
  })
  .then( (response) => {
    console.log("Titles printed!")
    console.log("Fourth promise in process.")
    return Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, { duration: 100 } )
  })
  .then( (response) => {
    console.log("Success!")
    console.log("Duration updated!")
    console.log("Fifth promise in process.")
    return Recipe.deleteOne( {title: "Carrot Cake"}  )
  })
  .then( (response) => {
    console.log("Success!")
    console.log("Sixth promise in process.")
    mongoose.connection.close()
  })
  .catch( (error) => {
    console.error('Error connecting to the database', error);
  });
