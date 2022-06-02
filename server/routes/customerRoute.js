const express = require("express");
const customerModel = require("../models/customer.model");
const app = express();

app.get("/customer", async (request, response) => {
  response.send("hello")
    const users = await customerModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
    
    
  });
app.post("/signup-cus", async (request, response) => {
    const user = new customerModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
module.exports = app;