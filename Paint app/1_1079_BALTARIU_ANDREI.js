
const canvas = document.getElementById("panza");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
let globalTool='';
let canvasX = canvas.offsetLeft;
let canvasY = canvas.offsetTop;
var isHoldEllipse = false;
var isHoldSpiral = false;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);

//BUTTONS
let btnCircle = document.querySelector('#btnCircle');
btnCircle.addEventListener('click', function(e)
  {
    draw, globalTool = 'isCircle';
  });

let btnBrush = document.querySelector('#btnBrush');
btnBrush.addEventListener('click', function(e)
  {
    draw, globalTool = 'isBrush';
  });

let btnRect = document.querySelector('#btnRect');
btnRect.addEventListener('click', function(e)
  {
    draw, globalTool = 'isRect';
  });

let btnDownload = document.querySelector('#btnDownload');
btnDownload.addEventListener('click', function(e)
  {
    let anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "image.PNG";
    anchor.click();
  });

let btnCanvasBg = document.querySelector('#btnCanvasBg');
btnCanvasBg.addEventListener('click', function(e)
  {
    ctx.fillStyle = document.getElementById("canvasColor").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

let btnClearCanvas = document.querySelector('#btnClearCanvas');
btnClearCanvas.addEventListener('click', function(e)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let btnCanvasSize = document.querySelector('#btnCanvasSize');
btnCanvasSize.addEventListener('click', function(e)
{
  canvas.width = document.getElementById("W").value;
  canvas.height = document.getElementById("H").value;
});

let btnEllipse = document.querySelector('#btnEllipse');
btnEllipse.addEventListener('click', function(e)
{
  draw, globalTool = 'isEllipse';
});

let btnSpiral = document.querySelector('#btnSpiral');
btnSpiral.addEventListener('click', function(e)
{
  draw, globalTool = 'isSpiral';
})
//END OF BUTTONS

function reposition(event) 
{
  coord.x = event.clientX - canvasX;
  coord.y = event.clientY - canvasY;
}

function start(event) 
{
  document.addEventListener("mousemove", draw);
  reposition(event);
}

function stop() 
{
  document.removeEventListener("mousemove", draw);
}

function drawLine()
{
  ctx.beginPath();
  ctx.lineWidth = document.getElementById("penSize").value;
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("penColor").value;
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

function drawCircle()
{
  ctx.beginPath();
  ctx.fillStyle = document.getElementById("penColor").value;
  ctx.arc(coord.x, coord.y, document.getElementById("shapeSize").value, 0, Math.PI * 2);
  ctx.fill();
}

function drawRect()
{
  rectWidth = document.getElementById("rectWidth").value;
  rectHeight = document.getElementById("rectHeight").value;
  lineWidth = document.getElementById("shapeSize").value;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = document.getElementById("penColor").value;
  ctx.strokeRect(coord.x, coord.y, rectWidth, rectHeight);
  ctx.fill();
}

function drawEllipse()
{
  canvas.addEventListener('mouseup', function(e)
  {
    isHoldEllipse = false;
  });

  canvas.addEventListener('mousedown', function(e)
  {
    lastMouseX = parseInt(e.clientX - canvasX);
    lastMouseY = parseInt(e.clientY - canvasY);
    isHoldEllipse = true;
  });

  canvas.addEventListener('mousemove', function(e)
    {
      mouseX = parseInt(e.clientX - canvasX);
      mouseY = parseInt(e.clientY - canvasY);
    
      if (isHoldEllipse)
      {
        //ctx.clearRect(lastMouseX, lastMouseY, mouseX, mouseY);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.beginPath();
    
        var scaleX = 1 * ((mouseX - lastMouseX) / 2);
        var scaleY = 1 * ((mouseY - lastMouseY) / 2);
        ctx.scale(scaleX, scaleY);
    
        var centerX = (lastMouseX / scaleX) + 1;
        var centerY = (lastMouseY / scaleY) + 1;
        ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);

        ctx.restore();
        ctx.strokeStyle = document.getElementById("penColor").value;
        ctx.lineWidth =  document.getElementById("shapeSize").value / 2;
        ctx.stroke();
      }
      else
      {
        document.querySelector('#btnEllipse').removeEventListener('mousemove', drawEllipse);
      }
    });
}

function drawSpiral()
{
  canvas.addEventListener('mouseup', function(e)
  {
    isHoldSpiral = false;
  });

  canvas.addEventListener('mousedown', function(e)
  {
    lastMouseX = parseInt(e.clientX - canvasX);
    lastMouseY = parseInt(e.clientY - canvasY);
    isHoldSpiral = true;
  });

  canvas.addEventListener('mousemove', function(e)
    {
      mouseX = parseInt(e.clientX - canvasX);
      mouseY = parseInt(e.clientY - canvasY);
    
      if (isHoldSpiral)
      {
        ctx.save();
        ctx.beginPath();
    
        var scaleX = 1 * ((mouseX - lastMouseX) / 2);
        var scaleY = 1 * ((mouseY - lastMouseY) / 2);
        ctx.scale(scaleX, scaleY);
    
        var centerX = (lastMouseX / scaleX) + 1;
        var centerY = (lastMouseY / scaleY) + 1;
        ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);

        ctx.restore();
        ctx.strokeStyle = document.getElementById("penColor").value;
        ctx.lineWidth =  document.getElementById("shapeSize").value / 2;
        ctx.stroke();
      }
      else
      {
        document.querySelector('#btnEllipse').removeEventListener('mousemove', drawSpiral);
      }
    });
}

function draw() 
{
  switch(globalTool)
  {
    case '':
      globalTool='isBrush'
      break;
    case 'isBrush':
      drawLine();
      break;
    case 'isCircle':
      drawCircle();
      break;
    case 'isRect':
      drawRect();
      break;
    case 'isEllipse':
      drawEllipse();
      break;
    case 'isSpiral':
      drawSpiral();
      break;
  }
}