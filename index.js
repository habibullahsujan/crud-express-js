const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/v1/user.routes");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1/users', userRouter)

app.get("/", (req, res) => {
  res.send("Server is live now.");
});

app.all('*', (req,res)=>{
    res.send('the route not found.')
})

app.listen(port, () => {
  console.log("server is live now.");
});
