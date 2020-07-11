
class helper{
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
	
    if (m === dest.x && n === dest.y){
		
         return pathTo(dest); //returning parent
    }
     
     var neighbors = neighborss(current,this.grid,this.diagonal); 
	 
	 for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
		
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

    
}
