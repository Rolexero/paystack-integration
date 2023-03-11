const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
require("dotenv").config();
app.use(cors());

app.get("/initialize", function(req, res) {
    const params = JSON.stringify({
        email: req.query.email,
        amount: req.query.amount * 100,
        metadata: {
            custom_field: {
                full_name: req.query.full_name,
            },
        },
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
            });
        })
        .on("error", (error) => {
            console.error(error);
        });

    reqPaystack.write(params);
    reqPaystack.end();
});

app.get("/verify", function(req, res) {
    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: `/transaction/verify/${req.query.verification_id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}`,
        },
    };

    const reqVerify = https
        .request(options, (resVerify) => {
            let data = "";

            resVerify.on("data", (chunk) => {
                data += chunk;
            });

            resVerify.on("end", () => {
                res.send(data);
            });
        })
        .on("error", (error) => {
            console.error(error);
        });

    reqVerify.end();
});

app.get("/list_transaction", function(req, res) {
    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction",
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_KEY}`,
        },
    };

    const list_transaction = https
        .request(options, (resListTransaction) => {
            let data = "";

            resListTransaction.on("data", (chunk) => {
                data += chunk;
            });

            resListTransaction.on("end", () => {
                res.send(data);
                console.log(JSON.parse(data));
            });
        })
        .on("error", (error) => {
            console.error(error);
        });

    list_transaction.end();
});

app.listen(3004, () => console.log("app running"));