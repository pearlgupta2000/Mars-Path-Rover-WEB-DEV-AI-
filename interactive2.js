var obstacles=[];

function funy(x,y){
    var arr=[x,y];
	obstacles.push(arr);
//	alert(arr);
	document.getElementById( x + ',' + y).classList.toggle("clr");
}



