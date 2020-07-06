
<<<<<<< HEAD
//obstacles
=======
/**function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
  
include('interactive.js');**/
//include('node.js');


>>>>>>> e3de31bd4c76bf5c4d45226cd11c5085aa9ef5b1

var obstacles=[];
var classToAdd = "";
var isAlreadyObstacled = false;

var Grid=[];



 var startpnt = [9,12];
 var endpnt = [9,19];
 
function funy(x,y){
    if(isAlreadyObstacled) {
        obstacles = _.without(obstacles, _.findWhere(obstacles, {
            x: x,
            y: y
        }));
    } else {
	
       if(obstacles.length > 0) {
			
	/**		 var ob = _.filter(obstacles, function(obj){                      //added
                return (obj.x === startpnt[0] && obj.y ===startpnt[1]) || (obj.x === endpnt[0] && obj.y ===endpnt[1]);
            })
			if(ob.length() > 0) {
				return;
			}
		**/	
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
	classToAdd = "";
    isAlreadyObstacled = false;
}

function clearWalls() {
    _.each(obstacles, function(obj) {
        document.getElementById( obj.x + ',' + obj.y).setAttribute("class", "grid");
   });
    obstacles = [];
}

<<<<<<< HEAD
//obstacles end


var startpnt = [9,12];
var endpnt = [9,19];
=======
function click_obs(x,y) {
  var arr=[x,y];
 
  /** var ob = _.filter(obstacles, function(obj){                      //added
                return (obj.x === startpnt[0] && obj.y ===startpnt[1]) || (obj.x === endpnt[0] && obj.y ===endpnt[1]);
            })
			if(ob.length() > 0) {
				return;
			} **/
		
	var object = _.filter(obstacles, function(obj){
                return obj.x === x && obj.y ===y;
            })
    if( object.length == 0) {
                obstacles.push({x:x, y:y});
            }
        
	else{
		 obstacles = _.without(obstacles, _.findWhere(obstacles, {
            x: x,
            y: y
		 } ));
		
	}
	document.getElementById( x + ',' + y).classList.toggle("clr");	
};




function helper(i){
	//if(i=='0'){alert("hey tom");}
    if(i==='1'){
		
		//alert(i);
		document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class", "grid");
		document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("start", "");
		var id=$(this).attr('id');
		var splited=id.split(",");
		startpnt=[splited[0],splited[1]]; 

		var object = _.filter(obstacles, function(obj){
                return obj.x === startpnt[0] && obj.y ===startpnt[1];
        })
		
		if(object.length() > 0) {
			i='0';
			return;
		}
	
		document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("start", "start");
		document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class", "grid start_");
	i='0';
	}
	if(i==='2'){
			 document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class", "grid");
			 		document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("end", "");
		var id=$(this).attr('id');
	 
	var splited=id.split(",");
	endpnt=[splited[0],splited[1]];  
	var object = _.filter(obstacles, function(obj){
                return obj.x === endpnt[0] && obj.y ===endpnt[1];
            })
		if(object.length() > 0) {
			i='0';
			return;
		}
		document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("end", "end");
		document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid end_");
		i='0';
	}
}



















>>>>>>> e3de31bd4c76bf5c4d45226cd11c5085aa9ef5b1
