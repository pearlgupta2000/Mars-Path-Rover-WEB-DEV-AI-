
class _gridNode_{
	
	constructor(x,y,weight){
		this.x = x;
        this.y = y;
        this.weight = weight;
	    this.f = Number.MAX_VALUE;
        this.g = Number.MAX_VALUE;
        this.h = Number.MAX_VALUE;
        this.visited = false;
        this.closed = false;
        this.parent = null;
	}
	
	getCost(fromNeighbor){
		 // Take diagonal weight into consideration.
  if (fromNeighbor && fromNeighbor.x - 1 != this.x && fromNeighbor.y + 1 != this.y) {
    return this.weight*1.41421;    ///// 0.7071;   
  }
  else if (fromNeighbor && fromNeighbor.x + 1 != this.x && fromNeighbor.y + 1 != this.y) {
    return this.weight*1.41421;    ///// 0.7071;   
  }
  else if (fromNeighbor && fromNeighbor.x - 1 != this.x && fromNeighbor.y - 1 != this.y) {
    return this.weight*1.41421;    ///// 0.7071;   
  }
  else if (fromNeighbor && fromNeighbor.x + 1 != this.x && fromNeighbor.y - 1  != this.y) {
    return this.weight*1.41421;    ///// 0.7071;   
  }
  else {
  return this.weight;
  }
}
	
	isWall(){
		 return this.weight === 0;
	}
	
}





class  BinaryHeap{
	constructor(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
   }


    sinkDown(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {

      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  }
  
  
   bubbleUp(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
  

    push(element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
	//console.log(this.content.length);
  }


    pop(){
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  }
  
   remove(node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  }
  
  
  size() {
    return this.content.length;
  }
  
  
  rescoreElement(node) {
    this.sinkDown(this.content.indexOf(node));
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
 // }
 
function cleanNode(node) {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }


class Graph{
	
	constructor(gridIn,diagonal_,options){
		options = options || {};
      this.nodes = [];
      this.diagonal = diagonal_;         
      this.grid = [];
  
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];
    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new _gridNode_(x, y, row[y]);
      this.grid[x][y] = node;
      this.nodes.push(node);
	}
   }
   
   //  console.log(this.grid);
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
	 
 // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1]);
    }	 
	  // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1]);
    }
	
	// Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1]);
    }
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1]);
    }

   
  }

  return ret;
	}
		
	
	
  astarsearch(graph, start, end, x ,options) {
   
   var t0=performance.now();
	var t1;
    options = options || {};
  //  var heuristic = options.heuristic || heuristics.manhattan;
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

 
    start.g=0;
	start.visited=true;
    openHeap.push(start);
    //console.log(openHeap);
	var k=0;
	 
    while (openHeap.size() > 0) {
       
      var currentNode = openHeap.pop();
	  
	  
	  console.log(currentNode.f);



      if (currentNode.x === end.x && currentNode.y === end.y) {
		  t1=performance.now();
		alert(t1-t0 + "ms");
		 alert(k);
	//	document.getElementById("").setAttribute("class","about");
        return pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighborss(currentNode);


     //  console.log(neighbors.length);
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
         k++;                                                      ///////operations
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);               
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
		  
		  
          neighbor.h = neighbor.h || r;                             
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
         
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




