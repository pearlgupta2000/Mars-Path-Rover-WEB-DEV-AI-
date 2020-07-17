
class helper{
    constructor(gridIn,diagonal,d){
        this.grid=[];
		this.diagonal=diagonal;
		this.dont=d;
        
        for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];
        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
              var node =new _info_p(x, y,row[y]);
              this.grid[x][y] = node;
	    }
        }
        this.weight=1;
   
}
 


bfs(maze,src, dest) {
  
  var queue = [];   
    var t0=performance.now(),t1;

       var current;
  
  src.closed=true;
    src.visited=true;
    src.parent=null;
	src.dist=0;

    queue.push(src);
  
   var k=0;
  while (queue.length>0) {
	  
    current = queue.shift();

    var m = current.x;
    var n = current.y;
	current.closed=true;
      
    if (m === dest.x && n === dest.y){
	
		t1=performance.now();
			var opt= pathTo(dest,this.weight); 
		 var time=t1-t0;
         var length =opt.len;
		 var operations = k;
		 length=length.toFixed(2);
		 time=time.toFixed(4);
		 animate(visited_in_order,opt.arr,dest,src);
		 document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms"+ "\nOperations : " +k;
         return;
    }
    
     var neighbors = neighborss(current,this.grid,this.diagonal,this.dont); 
      
	 
	 for (var i = 0, il = neighbors.length; i < il; ++i) {   
	
        var neighbor = neighbors[i];
         var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;
	
		if(neighborGrid.isWall()){
			continue;
		}
		
		
		if(!neighborGrid.visited){ 
           visited_in_order.push(neighborGrid);		
			neighborGrid.parent=current;
			neighborGrid.visited=true; k++;
			if(neighborGrid.dist > current.dist + distance){ 
				neighborGrid.dist=current.dist + distance;   k++;
				queue.push(neighborGrid);
			}
			
		}
		
	 }
      
  
  }
    
time=performance.now()-t0;
time=time.toFixed(4);
animate(visited_in_order,[],end,start);
document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms"+ "\nOperations : ";
return [];
}
  
    
    //bidir
bidirbst(maze,src,dest){
	var t0=performance.now(),t1;
  var startlist = [];
  var endlist = [];

    src.visited = true;
    src.dist=0;
    src.parent = null;
    src.by=src;
    //pushing STARTING NODE and end node in the list
    startlist.push(src);
    
    dest.visited = true;
    dest.dist=0;
    dest.parent = null;
    dest.by=dest;
    
    endlist.push(dest);
    

    var k=0;
    while(startlist.length && endlist.length){
        
        var take= startlist.shift();
        take.closed = true;
        
        var neighbors = neighborss(take,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
            var neighbor = neighbors[i];
            var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;

            if(neighborGrid.isWall() || neighborGrid.closed){
                continue;
            }


            if(neighborGrid.visited){
                if(neighborGrid.by===dest){
                    var opt= newPath(take,neighborGrid,this.weight);
					t1=performance.now();
		 var time=t1-t0;
         var length = opt.len;
		 //var operations = 
		 length=length.toFixed(2);
		 time=time.toFixed(4);
                    animate(visited_in_order,opt.arr,dest,src);
		 document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms"+ "\nOperations : " +k;
         return;
                  
                }
                continue;
            }
           visited_in_order.push(neighborGrid);
           neighborGrid.parent=take;
           neighborGrid.visited=true;
           neighborGrid.by=src;
           if(neighborGrid.dist > take.dist + distance){
                neighborGrid.dist=take.dist + distance;
                startlist.push(neighborGrid);
           }
			
       }
		
	 
          //woring on END NODE
    
    
    //popping node
      var take1 = endlist.shift();
      take1.closed=true;
   
        var neighbors = neighborss(take1,this.grid,this.diagonal,this.dont); 
	 
	    for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];
       var distance = neighbor.distance;
               var neighborGrid = neighbor.grid;
            
		if(neighborGrid.isWall() || neighborGrid.closed){
			continue;
		}
		
		if(neighborGrid.visited){
            if(neighborGrid.by===src){
                var opt=newPath(neighborGrid,take1,this.weight);
				t1=performance.now();
		 var time=t1-t0;
         var length =   opt.len;
		 //var operations = 
		 length=length.toFixed(2);
		 time=time.toFixed(4);
                animate(visited_in_order,opt.arr,dest,src);
		 document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms"+ "\nOperations : " +k;
         return;
             
            }
			continue;
		}
         visited_in_order.push(neighborGrid);
            neighborGrid.parent=take1;
			neighborGrid.visited=true;
            neighborGrid.by=dest;
			if(neighborGrid.dist > take1.dist + distance){
				neighborGrid.dist=take1.dist + distance;
				endlist.push(neighborGrid);
			}
		
	 }
 
        
        
    }
    

time=performance.now()-t0;
time=time.toFixed(4);
animate(visited_in_order,[],end,start);
document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms"+ "\nOperations : ";   
    return [];
}

    
}
    
    

