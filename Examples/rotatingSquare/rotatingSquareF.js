"use strict";

var canvas;
var gl;
var theta = 0.0;


var program;

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
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    program.vertexPositionAttribute = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(program.vertexPositionAttribute);

    program.vertexColorAttribute = gl.getAttribLocation(program, "aVertexColor");
    gl.enableVertexAttribArray(program.vertexColorAttribute);

    program.thetaLoc = gl.getUniformLocation( program, "theta" );
    program.offsetLoc = gl.getUniformLocation( program, "offset" ); 
    program.scaleLoc = gl.getUniformLocation( program, "scale" ); 

    initBuffers();

    render();

    render();
};

function initBuffers()
{
     var vertices = [
        vec2(  0,  0.5 ),
        vec2(  -0.5,  0 ),
        vec2( 0.5,  0 ),
        vec2(  0, -0.5 )
    ];

    // Load the data into the GPU
    program.squarePositionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, program.squarePositionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
//    var vPosition = gl.getAttribLocation( program, "vPosition" );
//    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
//    gl.enableVertexAttribArray( vPosition );

    var red = [
         vec4(1.0,0.0,0.0,1.0),
         vec4(1.0,0.0,0.0,1.0),
         vec4(1.0,0.0,0.0,1.0),
         vec4(1.0,0.0,0.0,1.0)
    ];

    var green = [
         vec4(1.0,1.0,0.0,1.0),
         vec4(0.0,1.0,0.0,1.0),
         vec4(1.0,0.0,0.0,1.0),
         vec4(0.0,0.0,1.0,1.0)
    ];

    program.redVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, program.redVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(red), gl.STATIC_DRAW);

    program.greenVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, program.greenVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(green), gl.STATIC_DRAW);

//    var aVertexColor = gl.getAttribLocation( program, "aVertexColor" );
//    gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 0, 0);
//    gl.enableVertexAttribArray( aVertexColor );

   
}

function render() {

    var offset = vec2(0.0, 0.5);
    var scale = 1.0;

    setTimeout(function() {
        requestAnimFrame(render);
        gl.clear( gl.COLOR_BUFFER_BIT );

//Top
        theta += 0.1;
        gl.uniform1f( program.thetaLoc, theta );
        offset = vec2(0.0, 0.5);
        var fo = flatten(offset);
        gl.uniform2f(program.offsetLoc,fo[0], fo[1]);
        scale = 1.0; 
        gl.uniform1f(program.scaleLoc,scale);

//    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
//    gl.enableVertexAttribArray( vPosition );
        
        gl.bindBuffer(gl.ARRAY_BUFFER, program.squarePositionBuffer);
        gl.vertexAttribPointer(program.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, program.redVertexColorBuffer);
        gl.vertexAttribPointer(program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );    

        offset = vec2(0.0, -0.5);
        fo = flatten(offset);
        gl.uniform2f(program.offsetLoc,fo[0], fo[1]);
        scale = 0.5; 
        gl.uniform1f(program.scaleLoc,scale);

        gl.bindBuffer(gl.ARRAY_BUFFER, program.squarePositionBuffer);
        gl.vertexAttribPointer(program.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, program.greenVertexColorBuffer);
        gl.vertexAttribPointer(program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
//        gl.enableVertexAttribArray( program.aVertexColor );
    
 
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );    
    },200);
}
