
//obstacles

var obstacles=[];
var classToAdd = "";
var isAlreadyObstacled = false;

function funy(x,y){
    if(isAlreadyObstacled) {
        obstacles = _.without(obstacles, _.findWhere(obstacles, {
            x: x,
            y: y
        }));
    } else {
        if(obstacles.length > 0) {
            var object = _.filter(obstacles, function(obj){
                return obj.x === x && obj.y ===y;
            })
            if(_.isUndefined(object) || object.length == 0) {
                obstacles.push({x:x, y:y});
            }
        } else {
            obstacles.push({x:x, y:y});
        }
        
    }
    document.getElementById( x + ',' + y).setAttribute("class", classToAdd);
};

function defineClass(x,y) {
    if(obstacles.length >0) {
	    var object = _.filter(obstacles, function(obstacle) {
			return obstacle.x === x && obstacle.y === y;
        });
        if(_.isUndefined(object) || object.length == 0) {
            isAlreadyObstacled = false;
        } else {
            isAlreadyObstacled = true;
        }
    } else {
        isAlreadyObstacled = false;
    }
	if(isAlreadyObstacled) {
		classToAdd = "grid"
	} else  {
		classToAdd = "grid clr"
	}
    funy(x,y);
}

function clearClass() {
	classToAdd = [];
    isAlreadyObstacled = false;
}

function clearWalls() {
    _.each(obstacles, function(obj) {
        document.getElementById( obj.x + ',' + obj.y).setAttribute("class", "grid");
   });
    obstacles = [];
}

//obstacles end


var startpnt = [9,12];
var endpnt = [9,19];