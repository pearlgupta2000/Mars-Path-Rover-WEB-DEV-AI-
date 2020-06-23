
function createGrid() {
    for (var rows = 0; rows < 26; rows++) {
        for (var columns = 0; columns < 54; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(34.55);
    $(".grid").height(34.55);
};



