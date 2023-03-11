const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
require("dotenv").config();
app.use(cors());

app.get("/initialize", function(req, res) {
    const params = JSON.stringify({
        email: "cust@email.com",
        amount: "10000",
    });

    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}`,
            "Content-Type": "application/json",
        },
    };

    const reqPaystack = https
        .request(options, (resPaystack) => {
            let data = "";

            resPaystack.on("data", (chunk) => {
                data += chunk;
            });

            resPaystack.on("end", () => {
                res.send(data);
                console.log(JSON.parse(data));
            });
        })
        .on("error", (error) => {
            console.error(error);
        });

    reqPaystack.write(params);
    reqPaystack.end();
});

app.listen(3004, () => console.log("app running"));