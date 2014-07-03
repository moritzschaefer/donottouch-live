$.post('/', {}, function(data) {
    $('#render').mousemove(function(event) {
        var canvasOffset=$("#render").offset();
        var offsetX=canvasOffset.left;
        var offsetY=canvasOffset.top;

        mouseX=parseInt(event.clientX-offsetX);
        mouseY=parseInt(event.clientY-offsetY);
    });
    // saves id globally
    id=data['id'];
    console.log(data);
    // now set interval to update everything
    setInterval(function() {
        updatePosition();
        updateCanvas();
    }, 100);
}, "json");

function updatePosition() {
    // only send if in canvas
    if($('#render').is(':hover')) {
        var pos = {x: mouseX, y: mouseY};
        $.ajax({
                url: '/'+id,
                type: 'PUT',
                data: pos,
                dataType: 'json',
                success: function(result) {
                    //nop
                }
        });
    }
}

function updateCanvas() {
    var canvas = $('#render')[0];
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $.get('/', function(data) {
        data.forEach(function(element, index) {
            // print element
            ctx.fillRect(element.x, element.y, 6,6);
        });
    }, 'json')

}

