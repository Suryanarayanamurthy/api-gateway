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
  },
  {
    "name": "project",
    "host": process.env.SERVICE_PROJECT ||"localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "project",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "company",
    "host": process.env.SERVICE_COMPANY ||"localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "company",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "channel",
    "host": process.env.SERVICE_CHANNEL || "localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "channel",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "user",
    "host": process.env.SERVICE_USER || "localhost",
    "port": "4011",
    "protocol": "http",
    "rootPath": "user",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "faq",
    "host": "localhost",
    "port": "4012",
    "protocol": "http",
    "rootPath": "faq",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "block",
    "host": "localhost",
    "port": "4012",
    "protocol": "http",
    "rootPath": "block",
    "middleware": [
      "authentication"
    ]
  },
  {
    "name": "theme",
    "host": "localhost",
    "port": "4012",
    "protocol": "http",
    "rootPath": "theme",
    "middleware": [
      "authentication"
    ]
  }
]