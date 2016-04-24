var lodash = require('lodash');
var fs = require('fs');
var schema = require('./validation');
var utily = require('./utily');

function toJson(obj) {
  return JSON.stringify(obj,null,2);
}
var IntersectionInstance = JSON.parse(fs.readFileSync('paths_definition.json', 'utf8'))

var PathsArray = IntersectionInstance.Paths;
var ExitsArray = IntersectionInstance.Exits;

console.log(schema.validate(IntersectionInstance));

console.log('Paths : ' + JSON.stringify(PathsArray, null, 2));
console.log('Exits : ' + JSON.stringify(ExitsArray, null, 2));

var matInter = {
  matrixIntersection: [
    ['-1', 'L9', 'L8', 'E3', '-1', '-1'],
    ['-1', '0', '0', '0', '0', 'L7'],
    ['L1', '0', '0', '0', '0', 'L6'],
    ['L2', '0', '0', '0', '0', 'E2'],
    ['L3', '0', '0', '0', '0', '-1'],
    ['-1', 'E1', '-1', 'L4', 'L5', '-1']
  ]
};

var matrix = matInter.matrixIntersection;

console.log('Matrix :' + toJson(matInter));

var coordObj = utily.findInMatrix(matrix, 'E1');

console.log('X : ' + coordObj.x + ' Y : ' + coordObj.y);

var arePathsExisting = utily.arraysExist(matrix,ExitsArray,'exitNum','E');

console.log('Paths existing : ' + arePathsExisting);

lodash.each(PathsArray,function (onePath) {
  matrix = utily.moveToExit(matrix,onePath);
});
console.log(matrix);
