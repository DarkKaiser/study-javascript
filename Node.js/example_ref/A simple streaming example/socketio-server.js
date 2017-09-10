var io = require('socket.io').listen(8080);
var t;  // I usually don't like using global variables but hope it's ok for DEMO's purpose
 
function rnd() {
    var num=Math.floor(Math.random()*1000);
    return num;
}

io.sockets.on('connection', function (socket) {
    t=setInterval( function() {
        var n=rnd();
        socket.broadcast.emit('stream', {n:n.toString()});
    }, 100);
    socket.on('action', function (data) {
        console.log('received action');
        if(data.todo=='stop') {
            socket.broadcast.emit('stream', {n:'Stopped'});
            console.log('stopping timer now.');
            clearInterval(t);
        } else if(data.todo='run') {
            // the setInterval code definitely can
            // be combined/optimized with the one above
            // again for DEMO's sake I just leave it as is
            t=setInterval( function() {
                var n=rnd();
                socket.broadcast.emit('stream', {n:n.toString()});
            }, 4000);
        }
    });
});
