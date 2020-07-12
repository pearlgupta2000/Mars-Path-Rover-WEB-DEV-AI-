
class helper{
    constructor(gridIn,diagonal,d){
        this.grid=[];
		this.diagonal=diagonal;
		this.dont=d;
        
		//alert(this.diagonal + " " + this.dont);
        for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
              var node =new _info_p(x, y,row[y]);
              this.grid[x][y] = node;
	    }
        }
        this.weight=1;
   
}
 


bfs(maze,src, dest) {

 //alert("inside");
  var queue = [];   
    

       var current;
  
    src.visited=true;
    src.parent=null;
	src.dist=0;
	//console.log(src);
    queue.push(src);
  // console.log(queue.length);
   
  while (queue.length>0) {
	  
    current = queue.shift();
   

    var m = current.x;
    var n = current.y;
	
       
      //  document.getElementById(current.x + ',' + current.y).setAttribute("class","grid current_");
      
    if (m === dest.x && n === dest.y){
		
         return pathTo(dest,this.weight); //returning parent
    }
     
     var neighbors = neighborss(current,this.grid,this.diagonal,this.dont); 
      
	 
	 for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
         var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;
		//document.getElementById(neighbor.x + ',' + neighbor.y).setAttribute("class","grid neighbor_");
		if(neighborGrid.isWall()){
			continue;
		}
		
		if(!neighborGrid.visited){
			neighborGrid.parent=current;
			neighborGrid.visited=true;
			if(neighborGrid.dist > current.dist + distance){
				neighborGrid.dist=current.dist + distance;
				queue.push(neighborGrid);
			}
			
		}
		
	 }
      
  
  }
  return 0;
}
  
    
    //bidir
bidirbst(maze,src,dest){
  var startlist = [];
  var endlist = [];
    

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
    while(startlist.length && endlist.length){
        
        var take= startlist.shift();
        take.closed = true;
        
        var neighbors = neighborss(take,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
            var neighbor = neighbors[i];
            var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;

            if(neighborGrid.isWall() || neighborGrid.closed){
                continue;
            }


            if(neighborGrid.visited){
                if(neighborGrid.by===dest){
                    return newPath(take,neighborGrid,this.weight);
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
      var take1 = endlist.shift();
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
            if(neighborGrid.by===src){
                return newPath(neighborGrid,take1,this.weight);
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
    
    

