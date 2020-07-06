

/**function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
  
include('interactive.js');**/
//include('node.js');


var startpnt = [9,12];
var endpnt = [9,19];

var obstacles=[];
var classToAdd = "";
var isAlreadyObstacled = false;

var Grid=[];
var i = 0;

function funy(x,y, event){
    if(i===2) {
        if(obstacles.length>0) {
            var object = _.filter(obstacles, function(obj){
                    return obj.x === x && obj.y ===y;
                })
            if(_.isUndefined(object) || object.length == 0) {
                document.getElementById( x + ',' + y).setAttribute("class", "grid end_");
                $('div[end="end"]').each(function(i,el) {
                    $(el).removeAttr("end");
                });
                document.getElementById(x+","+y).setAttribute("end", "end");
                endpnt= [x,y];

            }
        } else {
            document.getElementById( x + ',' + y).setAttribute("class", "grid end_");
            $('div[end="end"]').each(function(i,el) {
                $(el).removeAttr("end");
            });
            document.getElementById(x+","+y).setAttribute("end", "end");
            endpnt= [x,y];
        }
        return;
    } else if(i===1) {
        if(obstacles.length > 0) {  
            var object = _.filter(obstacles, function(obj){
                return obj.x === x && obj.y ===y;
            })
            if(_.isUndefined(object) || object.length == 0) {
                document.getElementById( x + ',' + y).setAttribute("class", "grid start_");
                $('div[start="start"]').each(function(i,el) {
                    $(el).removeAttr("start");
                });
                document.getElementById(x+","+y).setAttribute("start", "start");
                startpnt= [x,y];
            }   
        } else {
            document.getElementById( x + ',' + y).setAttribute("class", "grid start_");
            $('div[start="start"]').each(function(i,el) {
                    $(el).removeAttr("start");
            });
            document.getElementById(x+","+y).setAttribute("start", "start");
            startpnt= [x,y];
        }
        return;
    } else {
        if(isAlreadyObstacled) {
            obstacles = _.without(obstacles, _.findWhere(obstacles, {
                x: x,
                y: y
            }));
        } else {
            if(startpnt[0]===x && startpnt[1] ===y ) {
                return;
            }

            if(endpnt[0]===x && endpnt[1] ===y ) {
                return;
            }
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
    }
};

function defineClass(x,y) {
    var start = document.getElementById(x+","+y).getAttribute("start");
    if(start==="start"){
        i = 1;
        document.getElementById(x+","+y).setAttribute("class","grid");
        return;
    }
    var end = document.getElementById(x+","+y).getAttribute("end");
    if(end==="end"){
        document.getElementById(x+","+y).setAttribute("class","grid");
        i = 2;
        return;
    }
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
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

function clearClass(event) {
    event.preventDefault();
    if(i!==0) {
        i=0;
        return;
    }
	classToAdd = "";
    isAlreadyObstacled = false;
}

function clearWalls() {
    _.each(obstacles, function(obj) {
        document.getElementById( obj.x + ',' + obj.y).setAttribute("class", "grid");
   });
    obstacles = [];
}

function moveout(x,y) {
    if(i===1 || i===2) {
       if(obstacles.length > 0) {
            var object = _.filter(obstacles, function(obj){
                return obj.x === x && obj.y ===y;
            })
            if(_.isUndefined(object) || object.length == 0) {
                document.getElementById( x + ',' + y).setAttribute("class", "grid");        
            }
        } else {
            document.getElementById( x + ',' + y).setAttribute("class", "grid");
        }
    }
}


function click_obs(x,y) {	
    if(startpnt[0]===x && startpnt[1] ===y ) {
        return;
    }

    if(endpnt[0]===x && endpnt[1] ===y ) {
        return;
    }
	var object = _.filter(obstacles, function(obj){
        return obj.x === x && obj.y ===y;
    })
    if( object.length == 0) {
        obstacles.push({x:x, y:y});
    } else{
        obstacles = _.without(obstacles, _.findWhere(obstacles, {
            x: x,
            y: y
        }));
		
    }
	document.getElementById( x + ',' + y).classList.toggle("clr");
};


