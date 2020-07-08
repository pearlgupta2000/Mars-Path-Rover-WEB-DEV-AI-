
function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
  
include('interactive2.js');
//include('node.js');  
 var width = window.outerWidth;
    var height = window.outerHeight;
    var columnNumber = Math.floor(width/34.55);
    var rowNumber = Math.floor(height/34.55);

function createGrid() {
   
    for (var rows = 0; rows < rowNumber; rows++) {
        for (var columns = 0; columns < columnNumber; columns++) {
			var t = rows + "," + columns;
            $("#container").append("<div class='grid' id= "+ rows + "," + columns + " ondragenter='funy("+rows+","+columns+")' ondragstart='defineClass("+rows+","+columns+")' ondrop='clearClass()' onclick='click_obs("+rows+","+columns+")' ondragleave='moveout("+rows+","+columns+")' ></div>");
			
        };
    };
    $(".grid").width('34.55');
    $(".grid").height('34.55');
 
    document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("start", "start");
    document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("end","end");
    document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid end_");
    document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class", "grid start_");                                            //added
};



var Grid=[];        // contain 0 and 1
 
for(var i=0;i<rowNumber;i++){
	Grid[i]=new Array[columnNumber];
};

for(var i=0 ; i<rowNumber ; i++){
	for(var j=0;j<columnNumber;j++){
		 var object = _.filter(obstacles, function(obj){
                    return obj.x === i && obj.y ===j;
                })
		if(object.length == 0){		
		    Grid[i][j]=0;
		}
		else{
		    Grid[i][j]=1;
		}
	}
}

function hide_ins(){
	document.getElementById("instructions").style.display="none";
};

var id=1;

function close(){
	if(id==1){
		document.getElementById("mydrop").classList.toggle("show");	
	}
	else if(id==2){
		document.getElementById("mydrop2").classList.toggle("show");	
	}
	else if(id==3){
		document.getElementById("mydrop3").classList.toggle("show");	
	}
	else if(id==4){
		document.getElementById("mydrop4").classList.toggle("show");	
	}
	else if(id==5){
		document.getElementById("mydrop5").classList.toggle("show");	
	}
	else if(id==6){
		document.getElementById("mydrop6").classList.toggle("show");	
	}
	else if(id==7){
		document.getElementById("mydrop7").classList.toggle("show");	
	}
	else if(id==8){
		document.getElementById("mydrop8").classList.toggle("show");	
	}
	else{
		return;
	}
}

var algo_selected="A*";

function A_algo(){
	close();
document.getElementById("mydrop").classList.toggle("show");	
id=1;
algo_selected="A*";

}	
function IDA_algo(){
	close();
	document.getElementById("mydrop2").classList.toggle("show");
	id=2;
	algo_selected="IDA*";
}
function BFS_algo(){
	close();
	document.getElementById("mydrop3").classList.toggle("show");
	id=3;
	algo_selected="BreadthFS";
}
function BtFS_algo(){
	close();
	document.getElementById("mydrop4").classList.toggle("show");
	id=4;
	algo_selected="BestFS";
}

function DJK_algo(){
	close();
	document.getElementById("mydrop5").classList.toggle("show");
	id=5;
	algo_selected="DJK";
}
function JPS_algo(){
	close();
	document.getElementById("mydrop6").classList.toggle("show");
	id=6;
	algo_selected="JPS";
}

function OJPS_algo(){
	close();
	document.getElementById("mydrop7").classList.toggle("show");
	id=7;
	algo_selected="OJPS";
}
function T_algo(){
	close();
	document.getElementById("mydrop8").classList.toggle("show");
	id=8;
	algo_selected="Trace";
}

function start_search(){
	
	switch(algo_selected){
		
		case "A*":
		   aStarSearch(Grid[rowNumber][columnNumber],startpnt,endpnt);
		   break;
		case "IDA*":
              
             break;
		case "BreadthFS":
              
             break;	 
		case "BestFS":
              
             break;
        case "DJK":
              
             break;
        case "JPS":
              
             break;	
         case "OJPS":
              
             break;		
         case "Trace":
              
             break;				 
	}
	
}

