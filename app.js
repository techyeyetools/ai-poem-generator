import { config } from "dotenv"
config()

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))

import { Configuration, OpenAIApi } from "openai"


import express from 'express';
const app = express();
const port =  3000;

// replace with your preferred GPT model

// set up the OpenAI API client

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

// serve the HTML file when the user visits the website

// app.get('/', function(req, res) {
//   const filePath = path.join(__dirname, 'index.html');
//   res.sendFile(filePath);
// });


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index")
})
app.get("/contact", (req, res) => {
  res.render("contact")
})
app.get("/about", (req, res) => {
  res.render("about")
})
app.get("/terms", (req, res) => {
  res.render("terms")
})
app.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy")
})

// handle the API request to generate a poem
app.get('/generate', async function(req, res) {
  const topic = req.query.topic;

  // generate the poem using the GPT model
  const prompt = `Write a poem about ${topic}. in easy to understand english language. poem should be unique.`;
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  })

  // extract the generated text from the API response
  const poem = response.data.choices[0].message.content

  // send the generated poem back to the user
  res.send(poem);
});

// start the server
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
