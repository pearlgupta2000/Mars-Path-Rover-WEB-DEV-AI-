

function getHeap() {
  return new BinaryHeap(function(node) {
    return node.dist;
  });
}
 

class helper_dik{
    constructor(gridIn,diagonal){
        this.grid=[];
		this.diagonal=diagonal;
        for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
              var node =new _info_p(x, y,row[y]);
              this.grid[x][y] = node;
	    }
        }
   
}

  dijkishtras(graph,src,dest){
	  
	   var openHeap = getHeap();
	   src.parent=null;
	   src.dist=0;
	   src.visisted=true;
	   openHeap.push(src);
	  var i=0;
	  while(openHeap.size() > 0){
	
	      i++;
		  var current=openHeap.pop();
		  current.closed=true;
		  
		  if(current.x === dest.x && current.y === dest.y){

			  //document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class", "grid start_");  
			  return pathTo(current);
		  }
		  
		  //document.getElementById(current.x + ',' + current.y).setAttribute("class","grid current_");
	
		
		  var neighbors=neighborss(current,this.grid,this.diagonal);
		  
		   for (var i = 0, il = neighbors.length; i < il; ++i) {
			   
			   var neighbor=neighbors[i];
			   
			   if(neighbor.isWall()){continue;}
			  // document.getElementById(neighbor.x + ',' + neighbor.y).setAttribute("class","grid neighbor_");
			   if(!neighbor.closed){
				   
				   if(current.dist + 1 < neighbor.dist){
					   neighbor.dist=current.dist+1;
					  neighbor.parent=current;
					  
					  if(neighbor.visited){
						  openHeap.rescoreElement(neighbor);
					  }
					  else{
						  openHeap.push(neighbor);
						   neighbor.visited=true;
					  }
					  
					 
				   }
				   
			   }
  
		   }
	  }
	  
  }	
  
  
}






 