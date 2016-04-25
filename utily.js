var lodash = require('lodash');

module.exports.findInMatrix = function(mat, obj) {
  var x = -1;
  var y = -1;
  y = lodash.findIndex(mat, function(array) {
    x = lodash.findIndex(array, function(row) {
      return row === obj;
    });
    return x != -1;

  });
  return {
    "x": x,
    "y": y
  }
};

module.exports.arraysExist = function (mat,array,idname,selector) {
  var self = this;
  return lodash.every(array, function (obj) {
    var objCoord = self.findInMatrix(mat, selector.toString() + obj[idname.toString()].toString());
    console.log('Path : ' + obj[idname.toString()] + ' Coord : ' + JSON.stringify(objCoord));
    return (objCoord.x != -1 && objCoord.y != -1);

  });
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
};

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
  var tempMovX;
  var tempMovY;
    if (PathZero_coord.x != PathZeroExit_coord.x && PathZero_coord.y != PathZeroExit_coord.y) {
      //Move on the X axis
      if (PathZero_coord.x < PathZeroExit_coord.x) {
        tempMovX = movX;
        tempMovY = movY;
        while (movX != PathZeroExit_coord.x) {
          movX++;
          if (matrix[movY][movX] === '-1') {
            movX = tempMovX;
            movY = tempMovY;
            break;
          }
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      if (PathZero_coord.x > PathZeroExit_coord.x) {
        tempMovX = movX;
        tempMovY = movY;
        while (movX != PathZeroExit_coord.x) {
          movX--;
          if (matrix[movY][movX] === '-1') {
            movX = tempMovX;
            movY = tempMovY;
            break;
          }
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      if (PathZero_coord.y < PathZeroExit_coord.y) {
        tempMovX = movX;
        tempMovY = movY;
        while (movY != PathZeroExit_coord.y) {
          movY++;
          if (matrix[movY][movX] === '-1') {
            movX = tempMovX;
            movY = tempMovY;
            break;
          }
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      //Move on the Y axis
      if (PathZero_coord.y > PathZeroExit_coord.y) {
        tempMovX = movX;
        tempMovY = movY;
        while (movY != PathZeroExit_coord.y) {
          movY--;
          if (matrix[movY][movX] === '-1') {
            movX = tempMovX;
            movY = tempMovY;
            break;
          }
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
    }
    //Move straight
    if (PathZero_coord.x == PathZeroExit_coord.x) {
      if (PathZero_coord.y < PathZeroExit_coord.y) {
        while (movY != PathZeroExit_coord.y) {
          movY++;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      if (PathZero_coord.y > PathZeroExit_coord.y) {
        while (movY != PathZeroExit_coord.y) {
          movY--;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
    }
    if (PathZero_coord.y == PathZeroExit_coord.y) {
      if (PathZero_coord.x < PathZeroExit_coord.x) {
        while (movX != PathZeroExit_coord.x) {
          movX++;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      if (PathZero_coord.x > PathZeroExit_coord.x) {
        while (movX != PathZeroExit_coord.x) {
          movX--;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
    }
    if(movY == PathZeroExit_coord.y && movX != PathZeroExit_coord.x - 1){
      if (movX < PathZeroExit_coord.x) {
        while (movX != PathZeroExit_coord.x) {
          movX++;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
      if (movX > PathZeroExit_coord.x) {
        while (movX != PathZeroExit_coord.x) {
          movX--;
          matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
        }
      }
    }
  if(movX == PathZeroExit_coord.x && movY != PathZeroExit_coord.y - 1){
    if (movY < PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY++;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
      }
    }
    if (movY > PathZeroExit_coord.y) {
      while (movY != PathZeroExit_coord.y) {
        movY--;
        matrix[movY][movX] = self.pushToArray(matrix[movY][movX], PathZeroName);
      }
    }
  }
  return matrix;
};

module.exports.extractConflicts = function (matrix, lane) {
  lodash.each(matrix,function (oneRow) {
    
  })
}