
class ida_node{
    
    constructor(x,y,wall){
        this.x =x;
        this.y =y;
        this.wall = wall;
        this.f = Number.MAX_VALUE;
        this.g =  Number.MAX_VALUE;
        this.h =Number.MAX_VALUE;
        this.tested = false;
        this.closed = false;
        this.parent = null;
      //  this.time_ = 10; //need to be checked
    }
    
    iswall(){
        return this.wall === 0;
    }
    
}


class ida_graph{
    
    constructor(gridIn,diagonal_,dont,weight,time_,trackRecursion){
        this.dont = dont;
        this.diagonal = diagonal_;
        this.grid =[];
        this.weight = weight;
        this.trackRec = trackRecursion;
        this.timeLimit=time_;
        for(var x= 0; x<gridIn.length; x++) {
            this.grid[x] = [];
            for(var y = 0, row = gridIn[x]; y<row.length; y++){
                var node = new ida_node(x,y,row[y]);
                this.grid[x][y] = node;
            }
        }
    }
    cost(a, b) {
            return (a.x === b.x || a.y === b.y) ? 1 : Math.sqrt(2);
        }
    
      search(start_, g, cutoff, route, depth){
            nodevisited++;
            
            if (this.timeLimit > 0 &&
                new Date().getTime() - startTime > this.timeLimit * 1000) {
                return Infinity;
            } 
            
            switch(x){
                case "Manhattan":
                hScore = manhattan(start_, end_); 
                    break;

                case "Euclidiean":
                hScore=Euclidiean(start_,end_);
                    break;

                case "Octile":
                hScore=Octile(start_,end_);
                    break;

                case "Chebysev":
                hScore=Chebysev(start_,end_);
                    break;
       } 
            
            
            
            var f = g + hScore * this.weight;
            
            if (f > cutoff) {
                return f;
            }
            
            if (start_ == end_) {
                route[depth] = [start_.x, start_.y];
                return start_;
            }

            var min,nbr,t;
            var neighbors = neighborss(start_,this.grid,this.diagonal,this.dont);
            
            for(var i=0, min=Infinity; nbr<neighbors[i]; ++i){
                
                if (this.trackRecursion) {
            
                    nbr.retainCount = nbr.retainCount + 1 || 1;               ///////////////////////////////

                    if(nbr.tested !== true) {                                                ////////////
                        nbr.tested = true;
                    }
                }
                
                t = this.search(nbr, g + cost(start_, neighbour), cutoff, route, depth + 1);
                
                if (t instanceof ida_node) {
                    route[depth] = [start_.x, start_.y];
                    return t;
                }
                
                if (this.trackRecursion && (--nbr.retainCount) === 0) {
                    nbr.tested = false;
                }
                
                 if (t < min) {
                    min = t;
                 }
                
            }
            
            return min;


        }
        
        
    
    idasearch(graph,start_,end_,x) {
        
        //START PART
        
        var nodevisited = 0;
        var hScore;
        var startTime = new Date().getTime();
        
        
        
        //MIDDLE PART
       
 
    
        //END PART
        
       var cutoff;
       switch(x){
          case "Manhattan":
            hScore = manhattan(start_, end_); 
          //console.log(hScore);
          break;

          case "Euclidiean":
            hScore=Euclidiean(start_,end_);
          break;

          case "Octile":
            hScore=Octile(start_,end_);
          break;

          case "Chebysev":
            hScore=Chebysev(start_,end_);
          break;

       } 
        
     cutoff = hScore;
        
    var j, route, t;

    for (j = 0; true; ++j) {

        route = [];
        t = this.search(start_, 0, cutoff, route, 0);

        if (t === Infinity) {
            return [];
        }

        if (t instanceof ida_node) {
            return route;
        }
        
        cutOff = t;
    }

    return [];
    
    }
    
    
}