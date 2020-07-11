

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
	  //var i=0;
	  while(openHeap.size() > 0){
	
	      //i++;
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
    
    
    
    //adding bidir
bidirdik(maze,src,dest){
  var startlist =getHeap();
  var endlist = getHeap();
    

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
     
        var neighbors = neighborss(take,this.grid,this.diagonal); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
            var neighbor = neighbors[i];


            if(neighbor.isWall() || neighbor.closed){
                continue;
            }


            if(neighbor.visited){
                
                 if(neighbor.dist > take.dist + 1){
                neighbor.dist=take.dist + 1;
                     neighbor.parent=take;
                     neighbor.by=src;
                     startlist.rescoreElement(neighbor);
                 }
                
                
                if(neighbor.by===dest){
                    return newPath(take,neighbor);
                   // var pathA=pathTo(dest);
    //                neighbor.parent=null;
    //                var pathB=pathTo(neighbor);
    //                return pathA.concat(pathB);
                }
                continue;
            }
            
            

           neighbor.parent=take;
           neighbor.visited=true;
           neighbor.by=src;
           if(neighbor.dist > take.dist + 1){
                neighbor.dist=take.dist + 1;
                startlist.push(neighbor);
           }
			
       }
		
	 
          //woring on END NODE
    
    
    //popping node
      var take1 = endlist.pop();
      take1.closed=true;
//        var m1 = take.x;
//        var n1 = take.y;

        var neighbors = neighborss(take1,this.grid,this.diagonal); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
       
		if(neighbor.isWall() || neighbor.closed){
			continue;
		}
		
		if(neighbor.visited){
            
            if(neighbor.dist > take1.dist + 1){
				neighbor.dist=take1.dist + 1;
                neighbor.parent=take1;
                neighbor.by=dest;
                endlist.rescoreElement(neighbor);
            }
            
            if(neighbor.by===src){
                return newPath(neighbor,take1);
             //   var pathA=pathTo(neighbor);
//                neighbor.parent=null;
//                var pathB=pathTo(dest);
//                return pathA.concat(pathB);
            }
			continue;
		}
         
            neighbor.parent=take1;
			neighbor.visited=true;
            neighbor.by=dest;
			if(neighbor.dist > take1.dist + 1){
				neighbor.dist=take1.dist + 1;
				endlist.push(neighbor);
			}
		
	 }
 
        
        
    }
    

    
    
    return 0;
}

    
  
  
}






 