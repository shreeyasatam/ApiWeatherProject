const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")

    // res.send("server is up and running")
});

app.post("/", (req, res)=>{
    // console.log(req.body.cityName);
    console.log("post received")
    const city = req.body.cityName
    const unit = "metric"
    const appid = "4b80f62933ac5aec6cce2ce2c542f9b1"
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + appid
    https.get(url, (response)=>{
    // console.log(response.statusCode)

        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
        // console.log(weatherData);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
            const desctiption = weatherData.weather[0].description
            // console.log("Today's temperature is " + temp);
            // console.log();
            res.write(`<h1>Tempearture in ${city} is ${temp}  degree celcius</h1>`)
            res.write(`<h3>Weather Description is ${desctiption}<h3>`)
            res.write(`<img src=${imageURL}>`)
            res.send();
        })
    });
});


    





app.listen(3500, ()=>{
  
    console.log("Server is running on port 3500")
});