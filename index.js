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
//Graph coloring start
var lanesDone = [];
var conflictList = [];
var lanesConfs = {};
console.log("Conflict arrays :");
lodash.each(matrix,function (oneRow) {
  lodash.each(oneRow,function (item) {
    if(item.constructor == Array){
      if(item.length >1){
        conflictList.push(item);
        console.log(item);
      }
    }
  })
});
lodash.each(conflictList,function (confRow) {
  lodash.each(confRow,function (confItem) {
    if(lanesDone.indexOf(confItem) == -1)lanesDone.push(confItem);
    if(lanesConfs[confItem] == undefined){
      lanesConfs[confItem] = {
        laneName: confItem,
        confArray: [],
        degree: 0
      };
    }
    lodash.each(confRow,function (confItem2) {
      if(confItem2 != confItem && lanesConfs[confItem].confArray.indexOf(confItem2) == -1){
        lanesConfs[confItem].confArray.push(confItem2);
        lanesConfs[confItem].degree++;
      }
    });
  });
});
console.log(lanesConfs);
var sortedLanes = lodash.orderBy(lanesConfs,function (o) {
  return o.degree;
},['desc']);
console.log(sortedLanes);
lodash.each(sortedLanes,function (obj) {
  //TODO: group non conflicting lanes
});
