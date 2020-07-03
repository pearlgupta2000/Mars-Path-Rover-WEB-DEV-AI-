//var p=0;
function createGrid() {
    for (var rows = 0; rows < 36; rows++) {
        for (var columns = 0; columns < 39; columns++) {
			var t = rows + "," + columns;
            $("#container").append("<div class='grid' id= "+ rows + "," + columns + " onclick=funy("+rows+","+columns+")></div>");
			//p++;
        };
    };
    $(".grid").width('34.55');
    $(".grid").height('34.55');
};


var id=1;

function close(){
	if(id==1){
		document.getElementById("mydrop").classList.toggle("show");	
	}
	else if(id==2){
		document.getElementById("mydrop2").classList.toggle("show");	
	}
	else if(id==3){
		document.getElementById("mydrop3").classList.toggle("show");	
	}
	else if(id==4){
		document.getElementById("mydrop4").classList.toggle("show");	
	}
	else if(id==5){
		document.getElementById("mydrop5").classList.toggle("show");	
	}
	else if(id==6){
		document.getElementById("mydrop6").classList.toggle("show");	
	}
	else if(id==7){
		document.getElementById("mydrop7").classList.toggle("show");	
	}
	else if(id==8){
		document.getElementById("mydrop8").classList.toggle("show");	
	}
	else{
		return;
	}
}

function A_algo(){
	close();
document.getElementById("mydrop").classList.toggle("show");	
id=1;

}	
function IDA_algo(){
	close();
	document.getElementById("mydrop2").classList.toggle("show");
	id=2;
}
function BFS_algo(){
	close();
	document.getElementById("mydrop3").classList.toggle("show");
	id=3;
}
function BtFS_algo(){
	close();
	document.getElementById("mydrop4").classList.toggle("show");
	id=4;
}

function DJK_algo(){
	close();
	document.getElementById("mydrop5").classList.toggle("show");
	id=5;
}
function JPS_algo(){
	close();
	document.getElementById("mydrop6").classList.toggle("show");
	id=6;
}

function OJPS_algo(){
	close();
	document.getElementById("mydrop7").classList.toggle("show");
	id=7;
}
function T_algo(){
	close();
	document.getElementById("mydrop8").classList.toggle("show");
	id=8;
}

