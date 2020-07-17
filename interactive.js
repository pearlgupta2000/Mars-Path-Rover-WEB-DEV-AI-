
function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
  
include('interactive2.js');
include('A_algorithm.js');
include('bfs.js');
include('binary_heap.js');
include('grid_nodes_.js');
include('dik.js');
include('best fs.js');


    
var visited_in_order=[];

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
	Grid[i]=new Array(columnNumber);
};



function make_grid(weight){

for(var i=0 ; i<rowNumber ; i++){
	for(var j=0;j<columnNumber;j++){
		 var object = _.filter(obstacles, function(obj){
                    return obj.x === i && obj.y ===j;
                })
		if(object.length == 0){		
		    Grid[i][j]=  weight ;
		}
		else{
		    Grid[i][j]=0;
		}
	}
}

}


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

var algo_selected = "A*";

function A_algo(){
	close();
document.getElementById("mydrop").classList.toggle("show");	
id=1;
algo_selected = "A*";

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

function clearWalls() {
    _.each(obstacles, function(obj) {
        document.getElementById( obj.x + ',' + obj.y).setAttribute("class", "grid");
   });
    obstacles = [];
	restart();
}



function restart(){
	for(var i=0;i<visited_in_order.length ;i++){
		var object = _.filter(obstacles, function(obj){
        return obj.x === visited_in_order[i].x && obj.y ===visited_in_order[i].y;
    })
	if(object.length == 0){
		document.getElementById(visited_in_order[i].x + ',' + visited_in_order[i].y).setAttribute("class","grid"); 
	}
	}
	document.getElementById(endpnt[0] + ',' + endpnt[1]).setAttribute("class","grid end_");
   visited_in_order=[];	

}


function start_search(){
	
	document.getElementById("start").innerHTML="Restart Search";
	restart();
	
	switch(algo_selected){
		
		case "A*":
		
		   w = document.getElementById("weight1").value;
		   make_grid(w);
		    var diagonal =  document.getElementById("a1").checked; 
            var bi = document.getElementById("a2").checked;
			var dont=document.getElementById("a3").checked;			
		   var graph = new Graph(Grid,diagonal,w,dont);

           var start = graph.grid[startpnt[0]][startpnt[1]];
           var end = graph.grid[endpnt[0]][endpnt[1]];
     
		   var xx=document.getElementsByName('path_A1'); 

          	 var x;  
			
			   for(var i=0;i<xx.length;i++){
				   if(xx[i].checked){
					  x=xx[i].value; 
					  break;
				   }
			   }
		
		   if(!bi){
           var result = graph.astarsearch(graph, start, end , x );   
		   }
		   else{
			   var result=graph.biastar(graph,start,end,x);
		   }
		   //alert(result);
		   break;

		case "IDA*":
              w = document.getElementById("weight2").value;
		     make_grid(w);
             var diagonal = document.getElementById("a4").checked;
             var dont = document.getElementById("a5").checked;
            var time_ = document.getElementById("weight").value;
            var trackRecursion = document.getElementById("a6").checked;
            var help =new ida_graph(Grid,diagonal,dont,w,time_,trackRecursion);
            
            
            var start_ = help.grid[startpnt[0]][startpnt[1]];
           var end_ = help.grid[endpnt[0]][endpnt[1]];
            
             var xx=document.getElementsByName('path_A2'); 

          	 var x;  
			
			   for(var i=0;i<xx.length;i++){
				   if(xx[i].checked){
					  x=xx[i].value; 
					  break;
				   }
			   }
            
            var result = help.idasearch(help,start_,end_,x);
            //alert(result.length);
     
             break;
		case "BreadthFS":
                make_grid(1);
				 var diagonal =  document.getElementById("a7").checked;  
                 var bi = document.getElementById('a8').checked;
				 var dont=document.getElementById("a9").checked;
                var helping = new helper(Grid,diagonal,dont);
                var source = helping.grid[startpnt[0]][startpnt[1]];
                var dest = helping.grid[endpnt[0]][endpnt[1]];
               
                if(!bi){
                var dist = helping.bfs(helping, source, dest);
                }
                else{
                    var dist=helping.bidirbst(helping,source,dest);
                }
               
            
                //alert(dist);
                break;	 
		case "BestFS":
               make_grid(1);
			    var diagonal =  document.getElementById("a10").checked; 
            var bi = document.getElementById("a11").checked;
			var dont=document.getElementById("a12").checked;			
		   var graph2 = new BestfsGraph(Grid,diagonal,dont);

           var start = graph2.grid[startpnt[0]][startpnt[1]];
           var end = graph2.grid[endpnt[0]][endpnt[1]];
      
		   var xx=document.getElementsByName('path_A3'); 

          	 var x;  
			
			   for(var i=0;i<xx.length;i++){
				   if(xx[i].checked){
					  x=xx[i].value; 
					  break;
				   }
			   }
			   
		  // alert(x);
		   if(!bi){
           var result = graph2.bestFS(graph2, start, end , x );   
		   }
		   else{
			   var result=graph2.biBestFS(graph2,start,end,x);
		   }
		   //alert(result);
			   
             break;
        case "DJK":
                make_grid(1);
			    var diagonal =  document.getElementById("a13").checked;  
                var bi=document.getElementById("a14").checked;
			    var dont=document.getElementById("a15").checked;
                var helping = new helper_dik(Grid,diagonal,dont);
                var source = helping.grid[startpnt[0]][startpnt[1]];
                var dest = helping.grid[endpnt[0]][endpnt[1]];
            if(!bi){
                var dist = helping.dijkishtras(helping, source, dest);
            }
            else{
                var dist=helping.bidirdik(helping,source,dest);
            }
            
               // alert(dist);
                break;	 
        case "JPS":
               make_grid(1);
             break;	
         case "OJPS":
               make_grid(1);
             break;		
         case "Trace":
               make_grid(1);
             break;				 
	}
	
}

async function pause_search(){
	//if(event){event.preventDefault();}
	//$('#start').eventPause('pause');
	 //$('.click_button').eventPause('pause');
	pause();
	
	document.getElementById("pause").innerHTML="Cancel Search";
	document.getElementById("start").innerHTML="Resume Search";
}