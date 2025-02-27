const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let posts = []; // In-memory posts storage

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const { category, title, description, imageUrl, audioUrl, date } = req.body;
  const newPost = {
    id: posts.length + 1,
    category,
    title,
    description,
    imageUrl,
    audioUrl,
    date,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== parseInt(id));
  res.status(200).json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
