
class _info_p{
    constructor(x,y,wall){
        this.x=x;
        this.y=y;
		this.dist=Number.MAX_VALUE;
        this.visited=false;
        this.parent=null;
		this.closed=false;
        this.by = null;
            this.wall=wall;
    }
    
    
   isWall(){
	   return this.wall === 0;
   }
}

function newPath(nodeA,nodeB){
    var pathA = pathTo(nodeA);
    var pathB = pathTo(nodeB);
   document.getElementById(nodeA.x + ',' + nodeA.y).setAttribute("class","grid path");
    document.getElementById(nodeB.x + ',' + nodeB.y).setAttribute("class","grid path");
    
    return pathA.concat(pathB);
}

function pathTo(node) {
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


function neighborss(gridNode,grid_,diag){
		 var ret = [];
  var x = gridNode.x;
  var y = gridNode.y;
  var grid = grid_;


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
   

  if (diag) {
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
		 
