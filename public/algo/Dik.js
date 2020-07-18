

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
	
	  var t0=performance.now(),t1;
	   var openHeap = graph.getHeap();
	   src.parent=null;
	   src.dist=0;
	   src.visisted=true;
	   openHeap.push(src);
	  var k=0;
	  while(openHeap.size() > 0){
	
	      //i++;
		  var current=openHeap.pop();
		  current.closed=true;
		  
		  if(current.x === dest.x && current.y === dest.y){
             var opt = pathTo(current,this.weight);
			 t1=performance.now();
		     var time=t1-t0;
             var length = opt.len; 
		     length=length.toFixed(2);
		     time=time.toFixed(4);
		     
			 animate(visited_in_order,opt.arr,dest,src);  
		    
		    
		    document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
         return;
		  }
		  
		  var neighbors=neighborss(current,this.grid,this.diagonal,this.dont);
		  
		   for (var i = 0, il = neighbors.length; i < il; ++i) {
			   
			   var neighbor=neighbors[i];
               var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;
			   
			         if(neighborGrid.closed || neighborGrid.isWall()){continue;}
		
				   if(current.dist + distance < neighborGrid.dist){
					   neighborGrid.dist=current.dist+distance;
					  neighborGrid.parent=current;
					  
					  
					      
					  if(neighborGrid.visited){
						  openHeap.rescoreElement(neighborGrid);
					  }
					  else{
						   visited_in_order.push(neighborGrid); 
                          neighborGrid.visited=true;
						  openHeap.push(neighborGrid);
					  }
				   }
		   }
	  }
time=performance.now()-t0;
time=time.toFixed(4);
animate(visited_in_order,[],end,start);
document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms";
return [];	  
  }	
    
    
    
bidirdik(maze,src,dest){
	
	
	 var t0=performance.now(),t1;
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
    

    
   var k=0;
    while(startlist.size() > 0 && endlist.size() > 0){
        
        var take= startlist.pop();
        take.closed = true;

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
						 t1=performance.now();
						 var opt=newPath(take,neighborGrid,this.weight);  
		 var time=t1-t0;
         var length = opt.len;
		  length=length.toFixed(2);
		 time=time.toFixed(4);
		 
		  animate(visited_in_order,opt.arr,dest,src);
		 
		 document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
		 return;
                }   
                continue;
            }
            
              // if(!neighborGrid.visited){
			   visited_in_order.push(neighborGrid);// }
           neighborGrid.parent=take;
           neighborGrid.visited=true;
           neighborGrid.by=src;
           if(neighborGrid.dist > take.dist + distance){
                neighborGrid.dist=take.dist + distance;
                startlist.push(neighborGrid);
           }
			
       }
		
	 
      var take1 = endlist.pop();
      take1.closed=true;

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
					 t1=performance.now();
		 var time=t1-t0;
         var opt =  newPath(neighborGrid,take1,this.weight);
               var length=opt.len;
		  length=length.toFixed(2);
		 time=time.toFixed(4);
            animate(visited_in_order,opt.arr,dest,src);    
		 document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
		 return;
               
            }
			continue;
		}
         
		  //if(!neighborGrid.visited){
			   visited_in_order.push(neighborGrid);// }
            neighborGrid.parent=take1;
			neighborGrid.visited=true;
            neighborGrid.by=dest;
			if(neighborGrid.dist > take1.dist + distance){
				neighborGrid.dist=take1.dist + distance;
				endlist.push(neighborGrid);
			}
		
	 }
 
        
        
    }
    

 time=performance.now()-t0;
time=time.toFixed(4);
animate(visited_in_order,[],end,start);
document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms"+ "\nOperations : ";
return [];	   
    
}

    
  
  

}






 