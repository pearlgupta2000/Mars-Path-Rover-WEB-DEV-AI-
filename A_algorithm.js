

class _gridNode_{
	
	constructor(x,y,wall){
		this.x = x;
        this.y = y;
        this.wall = wall;
	    this.f = Number.MAX_VALUE;
        this.g = Number.MAX_VALUE;
        this.h =Number.MAX_VALUE;
        this.visited = false;
        this.closed = false;
        this.parent = null;
	}
	
	getCost(fromNeighbor){
  
  if(fromNeighbor.x + 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.wall*1.41421;
	}
	
	if(fromNeighbor.x + 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.wall*1.41421;
	}
	if(fromNeighbor.x - 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.wall*1.41421;
	}
	if(fromNeighbor.x - 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.wall*1.41421;
	}
	
	return this.wall;
	
	}
	
	
	isWall(){
		 return this.wall === 0;
	}
	
}



function getHeap() {
  return new BinaryHeap(function(nodeA) {
    return nodeA.f ;
  });
}
 
 
function manhattan(pos0, pos1) {
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return d1 + d2;
}
	
	
function Euclidiean(pos0,pos1){
	var d1 = (pos1.x-pos0.x)*(pos1.x-pos0.x);
	var d2=   (pos1.y-pos0.y)*(pos1.y-pos0.y);
	return Math.sqrt(d1+d2);
}	

function Octile(pos0,pos1){
	var d1= Math.abs(pos1.x - pos0.x);
	var d2=  Math.abs(pos1.y - pos0.y);
	 var F = Math.SQRT2 - 1;
      return (d1 < d2) ? F * d1 + d2 : F * d2 + d1;         
}

function Chebysev(pos0,pos1){
	var d1= Math.abs(pos1.x-pos0.x);
	var d2= Math.abs(pos1.y-pos0.y);
	return Math.max(d1,d2);
}	



class Graph{
	
	constructor(gridIn,diagonal_,weight,dont){
		this.dont=dont;
      this.diagonal = diagonal_;         
      this.grid = [];
      this.weight=weight;
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];
    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new _gridNode_(x, y, row[y]);
      this.grid[x][y] = node;

	}
   }
}
	

neighborsb(node) {
  var ret = [];
  var x = node.x;
  var y = node.y;
  var grid = this.grid;

  // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }

  // East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }

  // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }

  // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
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

astarsearch(graph, start, end, x ) {
   
   var t0=performance.now();
	var t1;
 
 
    var openHeap = getHeap();
   
    start.g=0;
	start.f=0;
	start.h=0;
	start.visited=true;
	start.parent=null;
    openHeap.push(start);
   
	//var k=0;
	 
    while (openHeap.size() > 0) {
       
      var currentNode = openHeap.pop();
 currentNode.closed = true;
      if (currentNode.x === end.x && currentNode.y === end.y) {
		  t1=performance.now();
        return pathTo(currentNode);
      }
     
      var neighbors = neighborss(currentNode,this.grid,this.diagonal,this.dont);
    //var neighbors = graph.neighborsb(currentNode);
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        
		
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }
     
	 var gScore=currentNode.g +  ((neighbor.x - currentNode.x === 0 || neighbor.y - currentNode.y === 0) ? 1 : Math.sqrt(2));//neighbor.getCost(currentNode);
		
		
		
	if(!neighbor.visited || gScore<neighbor.g){
		
			neighbor.parent=currentNode;
			neighbor.g=gScore;
			 var hScore;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(neighbor, end); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(neighbor,end);
	  break;
	  
	  case "Octile":
	  hScore=Octile(neighbor,end);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(neighbor,end);
      break;

    } 
      
       
			neighbor.h= neighbor.h || (this.weight * hScore);
			 var fScore=neighbor.h + neighbor.g;
             neighbor.f=fScore;

           if(!neighbor.visited){            
            neighbor.visited=true;
			 openHeap.push(neighbor);	
           }
		  		else{
					openHeap.rescoreElement(neighbor);
				}
			
		}


  }
}
return [];
}
  
  
}




