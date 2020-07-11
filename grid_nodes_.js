
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


function Diagonal(opt) {
    opt = opt || {};
	console.log(opt);
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;
    console.log(this.diagonalMovement);
    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
	return this.diagonalMovement;
}

var DiagonalMovement = {
    Always: 1,
    Never: 2,
    IfAtMostOneObstacle: 3,
    OnlyWhenNoObstacles: 4
};



function neighborss(gridNode,grid_,diagonalMovement){
		 var ret = [];
  var x = gridNode.x;
  var y = gridNode.y;
  var grid = grid_;
  
    var s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false;


   // North -->
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
	s2 = true;
  }// East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
	 s1 = true;
  }
  
   // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
	s3 = true;
  }
    // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
	s0=true;
  } 
  
  
    if (diagonalMovement === DiagonalMovement.Never) {
        return ret;
    }

    if (diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } else{
		 throw new Error('Incorrect value of diagonalMovement');
	}
   

  
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1] && d0) {
      ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1] && d1) {
      ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1] && d3) {
      ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1] && d2) {
      ret.push(grid[x + 1][y + 1]);
    
  }

  return ret;
	}
		 
