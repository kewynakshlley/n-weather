const geocode = require("./services/geocode");
const forecast = require("./services/forecast");

forecast(-71.0596, 42.3605, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

geocode("Boston", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})
