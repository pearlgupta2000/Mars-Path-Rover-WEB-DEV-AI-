

class _gridNode_{
	
	constructor(x,y,wall){
		this.x = x;
        this.y = y;
        this.wall = wall;
	    this.f = Number.MAX_VALUE;
        this.g =  Number.MAX_VALUE;
        this.h =Number.MAX_VALUE;
        this.visited = false;
        this.closed = false;
        this.parent = null;
	}
	
	getCost(fromNeighbor){
  
  if(fromNeighbor.x + 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.wall*1.41421;
	}else if(fromNeighbor.x + 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.wall*1.41421;
	}else if(fromNeighbor.x - 1 === this.x && fromNeighbor.y + 1 === this.y){
  return this.wall*1.41421;
	}else if(fromNeighbor.x - 1 === this.x && fromNeighbor.y - 1 === this.y){
  return this.wall*1.41421;
	}else{
	return this.wall;
	}
	
  return this.weight;
	}
	
	isWall(){
		 return this.wall === 0;
	}
	
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
	

getHeap() {
  return new BinaryHeap(function(nodeA) {
    return nodeA.f ;
  });
}

astarsearch(graph, start, end, x ) {
   
   var t0=performance.now();
	var t1;
 
 
    var openHeap = graph.getHeap();
    var hScore;
	
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(start, end); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(start,end);
	  break;
	  
	  case "Octile":
	  hScore=Octile(start,end);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(start,end);
      break;

    } 
      end.h=0;
    start.g=0;
	start.f=hScore;
	start.h=hScore;
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
     
	 var gScore=currentNode.g + neighbor.getCost(currentNode);   // ((neighbor.x - currentNode.x === 0 || neighbor.y - currentNode.y === 0) ? 1 : Math.sqrt(2))
		
		
		
	if(!neighbor.visited || gScore < neighbor.g){
		
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
      
       
			neighbor.h= (hScore);
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