module.exports = app => {
    const categoryContents = require("../controller/categoryContent.controller");
  
    var router = require("express").Router();
  
    // Create a new categoryContents
    router.post("/", categoryContents.create);
  
    // Retrieve all categoryContents
    router.get("/", categoryContents.findAll);
    
    // Retrieve a single categoryContents with id
    router.get("/:id", categoryContents.findOne);
  
    // Update a categoryContents with id
    router.put("/:id", categoryContents.update);
  
    // Delete a categoryContents with id
    router.delete("/:id", categoryContents.delete);
  
    app.use('/api/categoryContents', router);
  };