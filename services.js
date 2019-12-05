module.exports =
[
  {
    "name": "auth",
    "host": process.env.SERVICE_AUTH || "localhost",
    "port": "4010",
    "protocol": "http",
    "rootPath": "auth",
    "endpoints": [],
    "middleware": [
      "authentication"
    ]
  }

]
