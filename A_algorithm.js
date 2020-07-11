
class _gridNode_{
	
	constructor(x,y,weight){
		this.x = x;
        this.y = y;
        this.weight = weight;
	 /*   this.f = Number.MAX_VALUE;
        this.g = Number.MAX_VALUE;
        this.h = Number.MAX_VALUE;
        this.visited = false;
        this.closed = false;
        this.parent = null;*/
	}
	
	getCost(fromNeighbor){
		 // Take diagonal weight into consideration.
  
  if(fromNeighbor.x + 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.weight*1.41421;
	}
	
	if(fromNeighbor.x + 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.weight*1.41421;
	}
	if(fromNeighbor.x - 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.weight*1.41421;
	}
	if(fromNeighbor.x - 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.weight*1.41421;
	}
	/**if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
    return this.weight * 1.41421;
  }*/
	return this.weight;
	}
	isWall(){
		 return this.weight === 0;
	}
	
}








function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent) {
	 // alert(curr.parent);
	 document.getElementById(curr.x + ',' + curr.y).setAttribute("class" ,"grid path");
    path.unshift(curr);
    curr = curr.parent;
  }
 document.getElementById(node.x + ',' + node.y).setAttribute("class","grid end_");
  return path;
}

function getHeap() {
  return new BinaryHeap(function(node) {
    return node.f;
  });
}
 
 
// heuristics: {
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


function cleanNode(node) {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }

class Graph{
	
	constructor(gridIn,diagonal_,weight,options){
		options = options || {};
      this.nodes = [];
      this.diagonal = diagonal_;          //!!options.diagonal
      this.grid = [];
      this.weight=weight;
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];
    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new _gridNode_(x, y, row[y]);
      this.grid[x][y] = node;
      this.nodes.push(node);
	}
   }
 //  init();
 this.dirtyNodes = [];
  for (var i = 0; i < this.nodes.length; i++) {
  cleanNode(this.nodes[i]);
   //  console.log(this.grid);
   }
	}
	

  
 
cleanDirty () {
  for (var i = 0; i < this.dirtyNodes.length; i++) {
    cleanNode(this.dirtyNodes[i]);
  }
  this.dirtyNodes = [];
};

markDirty(node) {
  this.dirtyNodes.push(node);
};

	
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
		
	
	
  astarsearch(graph, start, end, x ,options) {
   
   var t0=performance.now();
	var t1;
    options = options || {};
 graph.cleanDirty();
    var closest = options.closest || false;
  
    var openHeap = getHeap();
   var closestNode = start; // set the start node to be the closest if required

   //alert(option);
  switch(x){
	  case "manhattan":
	  start.h = manhattan(start, end); 
      break;
	  
	  case "Euclidiean":
	  start.h=Euclidiean(start,end);
	  break;
	  
	  case "Octile":
	  start.h=Octile(start,end);
	  break;
	  
	  case "Chebysev":
	  start.h=Euclidiean(start,end);
      break;

  } 
    graph.markDirty(start);
 
    start.g=0;
	start.f=start.g+start.h;
	start.visited=true;
    openHeap.push(start);
    //console.log(openHeap);
	var k=0;
	 
    while (openHeap.size() > 0) {
       
      var currentNode = openHeap.pop();

      if (currentNode.x === end.x && currentNode.y === end.y) {
		  t1=performance.now();
		//  alert("i is " + i + "&& ans is found");
		alert(t1-t0 + "ms");
		 alert(k);
	//	document.getElementById("").setAttribute("class","about");
        return pathTo(currentNode);
      }

      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighborss(currentNode);
 
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
         k++;                                                      ///////operations
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);                     /////////////////////////////////////////////////////////
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {

          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
		  
		  var r;
	 switch(x){
	  case "manhattan":
	  r = manhattan(neighbor, end); 
      break;
	  
	  case "Euclidiean":
	  r=Euclidiean(neighbor,end);
	  break;
	  
	  case "Octile":
	  r=Octile(neighbor,end);
	  break;
	  
	  case "Chebysev":
	  r=Euclidiean(neighbor,end);
      break;

  } 
		/**if(this.diagonal){
			neighbor.h=this.weight*r;
		}*/
		//else{
          neighbor.h = neighbor.h || this.weight*r;     
		//}
		  		
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          if (closest) {
            // If the neighbour is closer than the current closestNode or if it's equally close but has
            // a cheaper path than the current closest node then it becomes the closest node
            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
			//i++;
			//console.log(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    if (closest) {
      return pathTo(closestNode);
    } 

    // No result was found - empty array signifies failure to find path.
    return [];
  }
}




