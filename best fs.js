

class node3{

constructor(x,y,wall){
	this.x=x;
	this.y=y;
	this.wall=wall;
	this.parent=null;
	this.f=Number.MAX_VALUE;
	this.g=Number.MAX_VALUE;
	this.h=Number.MAX_VALUE;
	this.closed=false;
	this.visited=false;
}

isWall(){
		 return this.wall === 0;
	}
	
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



class BestfsGraph{
	
	constructor(gridIn,diagonal_,dont){
		this.dont=dont;
      this.diagonal = diagonal_;         
      this.grid = [];
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];
    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new node3(x, y, row[y]);
      this.grid[x][y] = node;

	}
   }
}


getHeap() {
  return new BinaryHeap(function(nodeA) {
    return nodeA.f ;
  });
}
 

bestFS(graph,start,end,x){
	
	var heap=graph.getHeap();
	
	start.g=0;
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
	start.h=hScore;
	start.parent=null;
	start.f=start.h+start.g;
	start.visited=true;
	heap.push(start);
	
	//dest.h=0;
	while(heap.size() > 0){
		
		var t0=performance.now(),t1;
		var current=heap.pop();
		
		if(current.x===end.x && current.y===end.y){
			t1=performance.now();
			alert(t1-t0);
			return pathTo(current);
		}
		
		current.closed=true;
		
		  var neighbors = neighborss(current,this.grid,this.diagonal,this.dont);
    //var neighbors = graph.neighborsb(currentNode);
	   
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        
		
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }
     
	 var gScore=current.g + ((neighbor.x - current.x === 0 || neighbor.y - current.y === 0) ? 1 : Math.sqrt(2));  
		
		
		
			neighbor.parent=current;
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
			 heap.push(neighbor);	
           }
		  		else{
					heap.rescoreElement(neighbor);
				}
			
		


  }
		
		
	}
	return [];
	
}


biBestFS(graph,start,end,x){
	
	
	var heap=graph.getHeap();
	var endlist=graph.getHeap();
	
	start.g=0;
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
	start.h=hScore;
	start.parent=null;
	start.f=start.h+start.g;
	start.visited=true;
	start.by=start;
	heap.push(start);
	
	
	end.g=0;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(end, start); 
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
	end.parent=null;
	end.f=end.h+end.g;
	end.visited=true;
	end.by=end;
	endlist.push(end);
	
	while(heap.size() > 0 && endlist.size() > 0){
		
		var current=heap.pop();
		
		current.closed=true;
		
		  var neighbors = neighborss(current,this.grid,this.diagonal,this.dont);
    
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        
		
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }
     
	    
		if(neighbor.visited){
			if(neighbor.by===end){
				return newPath(current,neighbor);
			}
			continue;
		} 
		
	 var gScore=current.g + ((neighbor.x - current.x === 0 || neighbor.y - current.y === 0) ? 1 : Math.sqrt(2));  
		
		
		
			neighbor.parent=current;
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
             neighbor.by=start;
           if(!neighbor.visited){            
            neighbor.visited=true;
			 heap.push(neighbor);	
           }
		  		else{
					heap.rescoreElement(neighbor);
				}
  }
  
    var current2=endlist.pop();
		
		current2.closed=true;
		
		  var neighbors = neighborss(current2,this.grid,this.diagonal,this.dont);
    
      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
        
		
        if (neighbor.closed || neighbor.isWall()) {
          continue;
        }
     
	    
		if(neighbor.visited){
			if(neighbor.by===start){
				return newPath(neighbor,current2);
			}
			continue;
		} 
		
	 var gScore=current2.g + ((neighbor.x - current2.x === 0 || neighbor.y - current2.y === 0) ? 1 : Math.sqrt(2));  
		
		
		
			neighbor.parent=current2;
			neighbor.g=gScore;
			
			 var hScore;
	 switch(x){
	  case "Manhattan":
	  hScore = manhattan(neighbor, start); 
	  //console.log(hScore);
      break;
	  
	  case "Euclidiean":
	  hScore=Euclidiean(neighbor,start);
	  break;
	  
	  case "Octile":
	  hScore=Octile(neighbor,start);
	  break;
	  
	  case "Chebysev":
	  hScore=Chebysev(neighbor,start);
      break;

    } 
      
           neighbor.by=end;
			neighbor.h= (hScore);
			 var fScore=neighbor.h + neighbor.g;
             neighbor.f=fScore;

           if(!neighbor.visited){            
            neighbor.visited=true;
			 endlist.push(neighbor);	
           }
		  		else{
					endlist.rescoreElement(neighbor);
				}
	
  }
		
	
	}
	return [];

}

}
