

class helper_dik{
    constructor(gridIn,diagonal,dont){
        this.grid=[];
		this.diagonal=diagonal;
        this.weight=1;
		this.dont=dont;
        for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
              var node =new _info_p(x, y,row[y]);
              this.grid[x][y] = node;
	    }
        }
   
}
getHeap() {
  return new BinaryHeap(function(node) {
    return node.dist;
  });
}
 

  dijkishtras(graph,src,dest){
	  
	   var openHeap = graph.getHeap();
	   src.parent=null;
	   src.dist=0;
	   src.visisted=true;
	   openHeap.push(src);
	  //var i=0;
	  while(openHeap.size() > 0){
	
	      //i++;
		  var current=openHeap.pop();
		  current.closed=true;
		  
		  if(current.x === dest.x && current.y === dest.y){

			  //document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class", "grid start_");  
			  return pathTo(current,this.weight);
		  }
		  
		  //document.getElementById(current.x + ',' + current.y).setAttribute("class","grid current_");
	
		
		  var neighbors=neighborss(current,this.grid,this.diagonal,this.dont);
		  
		   for (var i = 0, il = neighbors.length; i < il; ++i) {
			   
			   var neighbor=neighbors[i];
               var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;
			   
			         if(neighborGrid.closed || neighborGrid.isWall()){continue;}
			  // document.getElementById(neighbor.x + ',' + neighbor.y).setAttribute("class","grid neighbor_");
			  
				   
				   if(current.dist + distance < neighborGrid.dist){
					   neighborGrid.dist=current.dist+distance;
					  neighborGrid.parent=current;
					  
					  if(neighborGrid.visited){
						  openHeap.rescoreElement(neighborGrid);
					  }
					  else{
                          neighborGrid.visited=true;
						  openHeap.push(neighborGrid);
					  }
				   }
		   }
	  }
	  
  }	
    
    
    
    //adding bidir
bidirdik(maze,src,dest){
  var startlist =maze.getHeap();
  var endlist = maze.getHeap();
    

    src.visited = true;
    src.dist=0;
    src.parent = null;
    src.by=src;
    //pushing STARTING NODE and end node in the list
    startlist.push(src);
    
    dest.visited = true;
    dest.dist=0;
    dest.parent = null;
    dest.by=dest;
    
    endlist.push(dest);
    

    
    //popping node 
    while(startlist.size() > 0 && endlist.size() > 0){
        
        var take= startlist.pop();
        take.closed = true;
//        var m = take.x;
//        var n = take.y;
     
        var neighbors = neighborss(take,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
                var neighbor=neighbors[i];
               var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;


            if(neighborGrid.isWall() || neighborGrid.closed){
                continue;
            }


            if(neighborGrid.visited){
                
                 if(neighborGrid.dist > take.dist + distance){
                     neighborGrid.dist=take.dist + distance;
                     neighborGrid.parent=take;
                     neighborGrid.by=src;
                     startlist.rescoreElement(neighborGrid);
                 }
                
                
                if(neighborGrid.by===dest){
                    return newPath(take,neighborGrid,this.weight);
                   // var pathA=pathTo(dest);
    //                neighbor.parent=null;
    //                var pathB=pathTo(neighbor);
    //                return pathA.concat(pathB);
                }
                continue;
            }
            
            

           neighborGrid.parent=take;
           neighborGrid.visited=true;
           neighborGrid.by=src;
           if(neighborGrid.dist > take.dist + distance){
                neighborGrid.dist=take.dist + distance;
                startlist.push(neighborGrid);
           }
			
       }
		
	 
          //woring on END NODE
    
    
    //popping node
      var take1 = endlist.pop();
      take1.closed=true;
//        var m1 = take.x;
//        var n1 = take.y;

        var neighbors = neighborss(take1,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        var distance = neighbor.distance;
       var neighborGrid = neighbor.grid;
       
		if(neighborGrid.isWall() || neighborGrid.closed){
			continue;
		}
		
		if(neighborGrid.visited){
            
            if(neighborGrid.dist > take1.dist + distance){
				neighborGrid.dist=take1.dist + distance;
                neighborGrid.parent=take1;
                neighborGrid.by=dest;
                endlist.rescoreElement(neighborGrid);
            }
            
            if(neighborGrid.by===src){
                return newPath(neighborGrid,take1,this.weight);
             //   var pathA=pathTo(neighbor);
//                neighbor.parent=null;
//                var pathB=pathTo(dest);
//                return pathA.concat(pathB);
            }
			continue;
		}
         
            neighborGrid.parent=take1;
			neighborGrid.visited=true;
            neighborGrid.by=dest;
			if(neighborGrid.dist > take1.dist + distance){
				neighborGrid.dist=take1.dist + distance;
				endlist.push(neighborGrid);
			}
		
	 }
 
        
        
    }
    

    
    
    return 0;
}

    
  
  
}






 