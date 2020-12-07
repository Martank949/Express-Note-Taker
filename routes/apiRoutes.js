// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information 
//table data = notes data & wait list data = index data
// ===============================================================================

//var notesData = require("../public/notes");
//var indexData = require("../public/index");
var fs = require("fs");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // --------------------------------------------------------------------------
    app.get("/api/notes", function(req, res) {
        console.log("Hitting the log")
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            console.log(err, data)
            const parse = JSON.parse(data);
            console.log(parse);
            res.json(parse);
        })

    });
    //Hello World!

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------
    app.post("/api/notes", function(req, res) {

        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        console.log(req.body);
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            console.log(err, data)
                //Chad - do something Here to add a unique id to the new parsedData; universally unique id? UUID? npm package4
                //************************************************


            //********************************************test^ */
            //maybe Math.random?
            const parseData = JSON.parse(data);
            //parseData.id = "some unique id"
            parseData.push(req.body)
            fs.writeFile("./db/db.json", JSON.stringify(parseData), error => console.log(error));
            res.json(true);

        })
    });
    app.delete("/api/notes/:id", function(req, res) {
        console.log(req.params.id)
    })
};