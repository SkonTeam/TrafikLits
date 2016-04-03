var Validator = require('jsonschema').Validator;

var v = new Validator()

var PathSchema = {
  "id": "/Path",
  "type": "object",
  "properties":{
    "pathNum": { "type" : "integer","required" : true },
    "exitNum": { "type" : "integer" , "required" : true },
    "position": { "enum": [ "right" , "left" , "top" , "bottom" ],"required" : true },
    "nbrOfVehicles":{ "type": "intger","required": true },
    "adjacentPaths": {
      "type":"array",
      "items": {
        "type":"object",
        "properties": {
          "pathNum" : { "type" : "integer","required" : true },
          "adjacency": { "enum" : ["right" , "left"], "required": true }
        }
      },
      "required" : true
    }
  }
}

var ExitSchema = {
  "id": "/Exit",
  "type": "object",
  "properties":{
    "exitNum": { "type" : "integer" , "required" : true },
    "position": { "enum": [ "right" , "left" , "top" , "bottom" ],"required" : true },
    "adjacentPaths": {
      "type":"array",
      "items": {
        "type":"object",
        "properties": {
          "pathNum" : { "type" : "integer","required" : true },
          "adjacency": { "enum" : ["right" , "left"], "required": true }
        }
      },
      "required" : true
    }
  }
}

var IntersectionSchema = {
  "id": "/Intersection",
  "type":"object",
  "properties": {
    "NbrOfPaths": {"type":"integer","required" : true},
    "NbrOfExits": { "type":"integer","required" : true},
    "Paths":{
      "type":"array",
      "items":{
        "$ref":"/Path"
      },
      "required" : true
    },
    "Exits":{
      "type":"array",
      "items":{
        "$ref":"/Exit"
      },
      "required" : true
    }
  }
}


v.addSchema(PathSchema,"/Path")
v.addSchema(ExitSchema,"/Exit")

module.exports.validate = function (jsonInst) {
  return v.validate(jsonInst,IntersectionSchema);
}
