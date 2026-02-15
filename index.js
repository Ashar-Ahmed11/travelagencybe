const express = require('express');
const app = express();
const port = process.env.PORT || 8000
var cors = require('cors')

const connectToMongoose = require('./db'); // if this connects to MongoDB
connectToMongoose();


app.use(express.json())
app.use(cors())

app.use("/api/user", require("./routes/user"))
app.use("/api/number", require("./routes/number"))
app.use("/api/auth", require("./routes/auth"))

app.get('/', (req, res) => {
  res.send('Hello, Backend running!');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});