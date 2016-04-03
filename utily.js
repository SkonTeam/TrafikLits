var lodash = require('lodash');

module.exports.findInMatrix = function(mat, obj) {
  var x = -1;
  var y = -1;
  y = lodash.findIndex(mat, function(array) {
    x = lodash.findIndex(array, function(row) {
      return row === obj;
    })
    if (x != -1) return true;
    return false;
  })
  return {
    "x": x,
    "y": y
  }
};

module.exports.arraysExist = function (mat,array,idname,selector) {
  var self = this;
  var arePathsExisting = lodash.every(array, function(obj) {
    var objCoord = self.findInMatrix(mat, selector.toString() + obj[idname.toString()].toString());
    console.log('Path : ' + obj[idname.toString()] + ' Coord : ' + JSON.stringify(objCoord));
    if (objCoord.x != -1 && objCoord.y != -1) return true
    return false
  })
  return arePathsExisting;
};

module.exports.pushToArray = function (array,obj) {
  if(array.constructor == Array){
    array.push(obj);
  }else{
    if (array === '0') {
      array = [obj];
    }
  }
  return array;
}

// TODO: Check for edge cases 
module.exports.moveToExit = function (matrix,PathObj) {
  var self = this;
  var PathZero = PathObj;
  var PathZeroName = 'L' + PathZero.pathNum.toString();
  var PathZeroExitName = 'E' + PathZero.exitNum.toString();
  var PathZero_coord = self.findInMatrix(matrix, PathZeroName);
  var PathZeroExit_coord = self.findInMatrix(matrix, PathZeroExitName);

  //console.log('Path Coord : ' + toJson(PathZero_coord) + ' Exit Coord : ' + toJson(PathZeroExit_coord));
  var movX = PathZero_coord.x;
  var movY = PathZero_coord.y;
  if (PathZero_coord.x != PathZeroExit_coord.x && PathZero_coord.y != PathZeroExit_coord.y) {
    //Move on the X axis
    if(PathZero_coord.x < PathZeroExit_coord.x){
      while (movX != PathZeroExit_coord.x) {
        movX++;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
    if(PathZero_coord.x > PathZeroExit_coord.x){
      while (movX != PathZeroExit_coord.x) {
        movX--;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
    //Move on the Y axis
    if (PathZero_coord.y < PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY++;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
    if (PathZero_coord.y > PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY--;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
  }
  //Move straight
  if (PathZero_coord.x == PathZeroExit_coord.x) {
    if (PathZero_coord.y < PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY++;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
    if (PathZero_coord.y > PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY--;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
  }
  if (PathZero_coord.y == PathZeroExit_coord.y) {
    if(PathZero_coord.x < PathZeroExit_coord.x){
      while (movX != PathZeroExit_coord.x) {
        movX++;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
    if(PathZero_coord.x > PathZeroExit_coord.x){
      while (movX != PathZeroExit_coord.x) {
        movX--;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX],PathZeroName);
      }
    }
  }
  return matrix;
};