"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var offset = vec2(0.0, 0.5);
var offsetLoc;
var scale = 1.0;
var scaleLoc;


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  0.5 ),
        vec2(  -0.5,  0 ),
        vec2( 0.5,  0 ),
        vec2(  0, -0.5 )
    ];


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation( program, "theta" );
    offsetLoc = gl.getUniformLocation( program, "offset" ); 
    scaleLoc = gl.getUniformLocation( program, "scale" ); 
    render();
};


function render() {

    setTimeout(function() {
        requestAnimFrame(render);
        gl.clear( gl.COLOR_BUFFER_BIT );

        theta += 0.1;
        gl.uniform1f( thetaLoc, theta );
        offset = vec2(0.0, 0.5);
        var fo = flatten(offset);
        gl.uniform2f(offsetLoc,fo[0], fo[1]);
        scale = 1.0; 
        gl.uniform1f(scaleLoc,scale);
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );    

        offset = vec2(0.0, -0.5);
        fo = flatten(offset);
        gl.uniform2f(offsetLoc,fo[0], fo[1]);
        scale = 0.5; 
        gl.uniform1f(scaleLoc,scale);
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );    
    }, 50);
}