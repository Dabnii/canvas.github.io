// draw buttons
const textBox = document.getElementById("text");
const textEnter = document.querySelector("#text-box button");
const font = document.getElementById("font");
const fontSize = document.getElementById("font-size");
const fontType = document.getElementById("font-type");
const pencil = document.getElementById("pencil");
const pencilFill = document.getElementById("pencil-fill");
const backgroundFill = document.getElementById("background-fill");
const squareBtn = document.getElementById("square");
const circleBtn = document.getElementById("circle");

// file buttons
const fileBtn = document.getElementById("file");
const saveBtn = document.getElementById("save");

// set color
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");

// main-canvas
const lineWidth = document.getElementById("line-width");
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.cursor = "url(src/cursors/pencil.cur), auto";

// brush preview canvas
const brushPreview = document.getElementById("brush__preview");
const brushValue = document.getElementById("brush-value");
const brushPreviewCtx = brushPreview.getContext("2d");
const PREVIEW_WIDTH = 180;
const PREVIEW_HEIGHT = 30;
brushPreview.width = PREVIEW_WIDTH;
brushPreview.height = PREVIEW_HEIGHT;
brushPreviewCtx.fillStyle = "white";
brushPreviewCtx.lineWidth = lineWidth.value;
previewDrawLine();

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

// 0: none(normal), 1: filling, 2: squarePadinting, 3: ciclePainting, 4: text
let mode = 0;

let isPainting = false;
let backgroundFilling = false;

let startX, startY;

onClickPencil();

function onMove(event) {
  if (isPainting) {
    if (mode === 2) {
      ctx.fillRect(
        startX,
        startY,
        event.offsetX - startX,
        event.offsetY - startY
      );
      return;
    } else if (mode === 3) {
      ctx.arc(startX, startY, event.offsetX - startX, 0, 2 * Math.PI);
      ctx.fill();
      return;
    } else if (mode === 0 || mode === 1) {
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      return;
    } else {
      return;
    }
  } else {
    ctx.moveTo(event.offsetX, event.offsetY);
  }
}

function startPainting(event) {
  isPainting = true;
  startX = event.offsetX;
  startY = event.offsetY;
}

function cancelPainting() {
  isPainting = false;
  if (mode === 1) {
    ctx.fill();
  }
  ctx.beginPath();
}

function previewDrawLine() {
  brushPreviewCtx.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
  brushPreviewCtx.moveTo(10, 15);
  brushPreviewCtx.lineTo(170, 15);
  brushPreviewCtx.stroke();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
  brushPreviewCtx.lineWidth = event.target.value;
  brushValue.innerText = event.target.value;
  previewDrawLine();
}

function onColorChange(event) {
  changeColor(event.target.value);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  changeColor(colorValue);
  color.value = colorValue;
}

function changeColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function onBackgroyndFillClick() {
  backgroundFilling = true;
  canvas.style.cursor = "url(src/cursors/paint.cur), auto";
}

function onCanvasClick(event) {
  // isPainting = false;
  if (backgroundFilling) {
    ctx.fillRect(0, 0, 800, 800);
    backgroundFilling = false;
  } else if (mode === 4) {
    const text = textBox.value;
    if (text !== "") {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = `${fontType.value} ${fontSize.value}px ${font.value}`;
      ctx.fillText(text, event.offsetX, event.offsetY);
      ctx.restore();
    }
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

function onEraseClick() {
  ctx.strokeStyle = "white";
  backgroundFilling = false;
  canvas.style.cursor = "url(src/cursors/eraser.cur), auto";
  mode = 0;
}

function onFileClick(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileBtn.value = null;
  };
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");

  a.href = url;
  a.download = "myDrawing.png";
  a.click();

  console.log("hello");
}

function onClickPencil() {
  mode = 0;
  canvas.style.cursor = "url(src/cursors/pencil.cur), auto";
}

function onClickPencilFill() {
  mode = 1;
  canvas.style.cursor = "url(src/cursors/brush.cur), auto";
}

function onClickSquare() {
  mode = 2;
  canvas.style.cursor = "crosshair";
}

function onClickCircle() {
  mode = 3;
  canvas.style.cursor = "crosshair";
}

function onClickTextEnter() {
  mode = 4;
  canvas.style.cursor = "url(src/cursors/text.cur), auto";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOption.forEach((color) => color.addEventListener("click", onColorClick));
backgroundFill.addEventListener("click", onBackgroyndFillClick);
fileBtn.addEventListener("change", onFileClick);
saveBtn.addEventListener("click", onSaveClick);
pencil.addEventListener("click", onClickPencil);
pencilFill.addEventListener("click", onClickPencilFill);
squareBtn.addEventListener("click", onClickSquare);
circleBtn.addEventListener("click", onClickCircle);
textEnter.addEventListener("click", onClickTextEnter);

destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
