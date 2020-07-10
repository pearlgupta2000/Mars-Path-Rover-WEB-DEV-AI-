

class _info_p{
    constructor(x,y,wall){
        this.x=x;
        this.y=y;
		this.dist=Number.MAX_VALUE;
        this.visited=false;
        this.parent=null;
            this.wall=wall;
    }
    
   // g(){alert("p");}  
   isWall(){
	   return this.wall === 0;
   }
}



class helper{
    constructor(gridIn,diagonal){
         this.h=gridIn.length;
        this.w=gridIn[0].length;
        this.grid=[];
		this.diagonal=diagonal;
        for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
              let node =new _info_p(x, y,row[y]);
              this.grid[x][y] = node;
	    }
        }
   
}

 pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent !== null) {
	 // alert(curr.parent);
	 document.getElementById(curr.x + ',' + curr.y).setAttribute("class" ,"grid path");
    path.unshift(curr);
    curr = curr.parent;
  }
 document.getElementById(node.x + ',' + node.y).setAttribute("class","grid end_");
  return path;
}

 
neighborss(gridNode){
		 var ret = [];
  var x = gridNode.x;
  var y = gridNode.y;
  var grid = this.grid;


   // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }// East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }
  
   // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }
    // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  } 
   

  if (this.diagonal) {
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1]);
    }
  }

  return ret;
	}
		 
    
isValid(cell) {
  return (cell.x >= 0) && (cell.x < this.h) && (cell.y >= 0) && (cell.y < this.w) && this.grid[cell.x][cell.y] == 1 && !cell.visited; 
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
	//console.log(current);
    var m = current.x;
    var n = current.y;
	//console.log(m );
	//console.log(dest.x);
    if (m === dest.x && n === dest.y){
		//console.log(current.dist);
         return maze.pathTo(dest); //returning parent
    }
     
     var neighbors = maze.neighborss(current); 
	 
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
