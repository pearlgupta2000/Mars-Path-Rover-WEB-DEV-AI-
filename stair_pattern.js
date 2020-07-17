

function stairDemonstration() {
  let currentIdX = rowNumber - 1;
  let currentIdY = 0;
 var j=0;
  while (currentIdX > 0 && currentIdY < columnNumber) {
    let currentId = currentIdX + ',' + currentIdY;
   
    let currentHTMLNode = document.getElementById(currentId);
     if(endpnt[0] == currentIdX && endpnt[1]== currentIdY) continue;
	 if(startpnt[0] == currentIdX && startpnt[1]== currentIdY) continue;
	 
	 setTimeout(() => {
        currentHTMLNode.setAttribute("class","grid clr");
      }, 20* j);
	   obstacles.push({x:currentIdX , y:currentIdY});
	  j++;
    currentIdX--;
    currentIdY++;
  }
  while (currentIdX < rowNumber - 2 && currentIdY < columnNumber) {
    let currentId = currentIdX + ',' + currentIdY;
   
    let currentHTMLNode = document.getElementById(currentId);
    if(endpnt[0] == currentIdX && endpnt[1]== currentIdY) continue;
	if(startpnt[0] == currentIdX && startpnt[1]== currentIdY) continue;
	 
	  setTimeout(() => {
        currentHTMLNode.setAttribute("class","grid clr");
      }, 20* j);
	  obstacles.push({x:currentIdX , y:currentIdY});
    j++;
    currentIdX++;
    currentIdY++;
  }

}
