const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

// Routes

// search
app.get("/", function(req, res){
    res.render("index");
})

// results
app.get("/results", function(req, res){
    // Define api request query
    let query = req.query.search;
    let url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";

    request(url, function(error, response, body){
        if (error){
            console.log("There was an error :-(")
            console.log(error)
            res.send(error)
        } else {
            if (response.statusCode == 200){
                let data = JSON.parse(body)
                console.log(data)
                let context = {
                    data: data
                }
                res.render("results", context)
            } else {
                res.send(response.statusCode)
            }
        }
    });
})

// Start the application
app.listen(3000, function(){
    console.log("The application is running at http://localhost:3000!")
})
