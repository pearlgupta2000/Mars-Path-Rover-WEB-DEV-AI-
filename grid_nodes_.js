
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

function newPath(nodeA,nodeB,wt){
    var pathA = pathTo(nodeA,wt);
    var pathB = pathTo(nodeB,wt);
   document.getElementById(nodeA.x + ',' + nodeA.y).setAttribute("class","grid path");
    document.getElementById(nodeB.x + ',' + nodeB.y).setAttribute("class","grid path");
    
    return pathA+pathB+(1*wt);
}

function pathTo(node,wt) {
  var curr = node;
  var path = [];
    var final=0;
  while (curr.parent !== null) {
	 // alert(curr.parent);
      if((curr.parent.x + 1===curr.x && curr.parent.y + 1 ===curr.y) || (curr.parent.x + 1===curr.x && curr.parent.y - 1 ===curr.y) || (curr.parent.x - 1===curr.x && curr.parent.y + 1 ===curr.y) || (curr.parent.x - 1===curr.x && curr.parent.y - 1 ===curr.y) ){
          final = final + Math.sqrt(2) * wt;
      }
      else{
          final=final+(1*wt);
      }
      
	 document.getElementById(curr.x + ',' + curr.y).setAttribute("class" ,"grid path");
    path.unshift(curr);
    curr = curr.parent;
  }
 document.getElementById(node.x + ',' + node.y).setAttribute("class","grid end_");
 //alert(path.length);
  return final;
}


function neighborss(gridNode,grid_,diagonalMovement,corners){
		 var ret = [];
  var x = gridNode.x;
  var y = gridNode.y;
  var grid = grid_;
  
    var s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false;


   // North -->
  if (grid[x] && grid[x][y + 1] && grid[x][y+1].wall) {
    ret.push({"grid": grid[x][y + 1], "distance": 1});
	s1 = true;
  }// East
  if (grid[x + 1] && grid[x + 1][y] && grid[x + 1][y].wall) {
    ret.push({"grid": grid[x+1][y], "distance": 1});
	 s2 = true;
  }
  
   // West
  if (grid[x - 1] && grid[x - 1][y] && grid[x-1][y].wall) {
    ret.push({"grid": grid[x-1][y], "distance": 1});      
	s0 = true;
  }
    // South
  if (grid[x] && grid[x][y - 1] && grid[x][y-1].wall) {
    ret.push({"grid": grid[x][y-1], "distance": 1});
	s3=true;
  } 
  
  
    if (!diagonalMovement) {
        return ret;
    }

    if (diagonalMovement && !corners) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } 
	
	else{
		d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
		if(!s0){
			d0=false;
			d1=false;
		
		}
		if(!s1){
			d1=false;
			d2=false;
		}
		if(!s2){
			d3=false;
			d2=false;
		}
		if(!s3){
			d0=false;
			d3=false;
		}
	}

    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1] && d0) {
      ret.push({"grid": grid[x-1][y-1], "distance": Math.sqrt(2)});    
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1] && d3) {
      ret.push({"grid": grid[x+1][y-1], "distance": Math.sqrt(2)});
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1] && d1) {
      ret.push({"grid": grid[x-1][y+1], "distance": Math.sqrt(2)});
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1] && d2) {
      ret.push({"grid": grid[x+1][y+1], "distance": Math.sqrt(2)});
    }

    return ret;
}
		 
