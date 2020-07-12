
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
		
         return pathTo(dest); //returning parent
    }
     
     var neighbors = neighborss(current,this.grid,this.diagonal,this.dont); 
	 
	 for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
		//document.getElementById(neighbor.x + ',' + neighbor.y).setAttribute("class","grid neighbor_");
		if(neighbor.isWall()){
			continue;
		}
		
		if(!neighbor.visited){
			neighbor.parent=current;
			neighbor.visited=true;
			if(neighbor.dist > current.dist + 1){
				neighbor.dist=current.dist + 1;
				queue.push(neighbor);
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


            if(neighbor.isWall() || neighbor.closed){
                continue;
            }


            if(neighbor.visited){
                if(neighbor.by===dest){
                    return newPath(take,neighbor);
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
      var take1 = endlist.shift();
      take1.closed=true;
   
        var neighbors = neighborss(take1,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
       
		if(neighbor.isWall() || neighbor.closed){
			continue;
		}
		
		if(neighbor.visited){
            if(neighbor.by===src){
                return newPath(neighbor,take1);
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
    
    

