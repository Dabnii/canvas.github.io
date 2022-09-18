const circleTool = document.getElementById("circle");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.lineJoin = "round";
let isPainting = false;
let isFilling = false;
let circleDrawing = false;

// let restore_array=[];
//undo_lastpath를 위한 선언
// 마지막 패스에서 끝내야 하기 때문
// let index = -1; 
//마지막 어레이에서 하나 지우는 것 POP과 비슷할듯


function onMove(event) {
  if (isPainting) {
    if(isPainting){}
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}


function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function clearCanvas(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
}

function onFileChange(event) {
  const file = event.target.files[0];
  //이 함수가 실행되면 우선 input에 있는 파일을 읽어와 0번의 파일을 읽음 (1개의 파일 읽기만 가능) (array임)
  const url = URL.createObjectURL(file);
  //메모리에 업로드 된 유저의 이미지를 url을 통하여 접근함 
  //img태그의 src 속성을 브라우저에서 불러온 url로 설정
  const image = new Image(); // = 앞과 같은 코드임! document.createElement("img")
  image.src = url;
  image.onload = function () {
    //이미지 load가 끝나면 ctx.drawImage메소드 호출
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //이미지를 불러와 0,0 자리에 그려줌 
    fileInput.value = null;
    //파일을 비워줌 
    //다른 파일을 추가하고 싶으면 버튼을 다시 눌러주면 됨
    //즉 이미지 위에 이미지를 얹는 것 
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();

}

function drawingCircle(){
  if (!isPainting) {
    ctx.arcTo( 400, 400, 100, 0, 2 * Math.PI);
    ctx.fill();
    }
}

//써클 버튼을 누르면 동그라미 모드가 켜진다
//캔버스위에 클릭 후 '드래그'를 하면 원이 생긴다
//드래그 하면 패가 생긴다
//마우스를 떼면 패스가 끝난다

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
// destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
//이벤트 리스너를 추가 하여 변화가 생기면, onFileChange라는 함수가 실행 됨
saveBtn.addEventListener("click", onSaveClick);
circleTool.addEventListener("click", drawingCircle);



//hhhhhhhmmmmmmmmmmmmmmm

// const cPushArray = new Array();
// const cStep = -1;

// function cPush() {
//   cStep++;
//   if (cStep < cPushArray.length) { cPushArray.length = cStep; }
//   cPushArray.push(document.getElementById('myCanvas').toDataURL());
//   console.log('AAAA')
// }

// function cUndo() {
//   if (cStep > 0) {
//       cStep--;
//       let canvasPic = new Image();
//       canvasPic.src = cPushArray[cStep];
//       canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
//   }  console.log('BBBB')

// }

// function cRedo() {
//   if (cStep < cPushArray.length-1) {
//       cStep++;
//       let canvasPic = new Image();
//       canvasPic.src = cPushArray[cStep];
//       canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
//   }   console.log('CCCC')
// }

