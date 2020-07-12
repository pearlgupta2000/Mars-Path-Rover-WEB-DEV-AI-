

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
        return pathTo(currentNode,this.weight);
      }
     
      var neighbors = neighborss(currentNode,this.grid,this.diagonal,this.dont);
        
    //var neighbors = graph.neighborsb(currentNode);
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        var distance = neighbor.distance;
       var neighborGrid = neighbor.grid;
		
        if (neighborGrid.closed || neighborGrid.isWall()) {
          continue;
        }
     
	 var gScore=currentNode.g + distance;
		
		
		
	if(!neighborGrid.visited || gScore < neighborGrid.g){
		
			neighborGrid.parent=currentNode;
			neighborGrid.g=gScore;
			
			 var hScore;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(neighborGrid,end); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(neighborGrid,end);
	  break;
	  
	  case "Octile":
	  hScore=Octile(neighborGrid,end);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(neighborGrid,end);
      break;

    } 
      
       
			neighborGrid.h= (hScore);
			 var fScore=neighborGrid.h + neighborGrid.g;
             neighborGrid.f=fScore;

           if(!neighborGrid.visited){            
            neighborGrid.visited=true;
			 openHeap.push(neighborGrid);	
           }
		  		else{
					openHeap.rescoreElement(neighborGrid);
				}
			
		}


  }
}
return [];
}
  
  
biastar(graph,start,end,x){
    
    var openHeap = graph.getHeap();
    var endlist=graph.getHeap();
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
      
    start.g=0;
	start.f=hScore;
	start.h=hScore;
	start.visited=true;
	start.parent=null;
    start.by=start;
    openHeap.push(start);
    
end.by=end;
    end.parent=null;
    end.g=0;
    
    switch(x){
	  case "Manhattan":
	  hScore = manhattan(end,start); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(end,start);
	  break;
	  
	  case "Octile":
	  hScore=Octile(end,start);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(end,start);
      break;

    } 
    end.h=hScore;
    end.f=hScore;
    end.visited=true;
    endlist.push(end);
   
	//var k=0;
	 
    while (openHeap.size() > 0 && endlist.size() > 0) {
       
      var currentNode = openHeap.pop();
      currentNode.closed = true;
      
     
      var neighbors = neighborss(currentNode,this.grid,this.diagonal,this.dont);
        
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        var distance = neighbor.distance;
       var neighborGrid = neighbor.grid;
		
        if (neighborGrid.closed || neighborGrid.isWall()) {
          continue;
        }
		
		if(neighborGrid.visited){
			if(neighborGrid.by===end){
				return newPath(currentNode,neighborGrid,this.weight);
			}
			continue;
		} 
     
	 var gScore=currentNode.g + distance;
		
		
		
	if(!neighborGrid.visited || gScore < neighborGrid.g){
		
			neighborGrid.parent=currentNode;
			neighborGrid.g=gScore;
			
			 var hScore;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(neighborGrid,end); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(neighborGrid,end);
	  break;
	  
	  case "Octile":
	  hScore=Octile(neighborGrid,end);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(neighborGrid,end);
      break;

    } 
      
       
			neighborGrid.h= (hScore);
			 var fScore=neighborGrid.h + neighborGrid.g;
             neighborGrid.f=fScore;
             neighborGrid.by=start;
           if(!neighborGrid.visited){            
            neighborGrid.visited=true;
			 openHeap.push(neighborGrid);	
           }
		  		else{
					openHeap.rescoreElement(neighborGrid);
				}
			
		}


  }
        
        var currentNode2 = endlist.pop();
      currentNode2.closed = true;
     
       neighbors = neighborss(currentNode2,this.grid,this.diagonal,this.dont);
     
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        var distance = neighbor.distance;
       var neighborGrid = neighbor.grid;
		
        if (neighborGrid.closed || neighborGrid.isWall()) {
          continue;
        }
		
		if(neighborGrid.visited){
			if(neighborGrid.by===start){
				return newPath(neighborGrid,currentNode2,this.weight);
			}
			continue;
		} 
		
     
	 var gScore=currentNode2.g + distance;
		
		
		
	if(!neighborGrid.visited || gScore < neighborGrid.g){
		
			neighborGrid.parent=currentNode2;
			neighborGrid.g=gScore;
			
			 var hScore;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(neighborGrid,start); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(neighborGrid,start);
	  break;
	  
	  case "Octile":
	  hScore=Octile(neighborGrid,start);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(neighborGrid,start);
      break;

    } 
      
       neighborGrid.by=end;
			neighborGrid.h= (hScore);
			 var fScore=neighborGrid.h + neighborGrid.g;
             neighborGrid.f=fScore;

           if(!neighborGrid.visited){            
            neighborGrid.visited=true;
			 endlist.push(neighborGrid);	
           }
		  		else{
					endlist.rescoreElement(neighborGrid);
				}
			
		}


  }
        
        
        
}
return [];
    
}




}