var dragItem = document.querySelector("#item");
var container = document.querySelector("#container");
var target = document.querySelector("#target");
var scoreItem = document.querySelector("#myScore");
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
let score = 0;

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

const targetContext = target.getContext("2d");
const centerX = target.width / 2;
const centerY = target.height / 2;
const radius = 70;

targetContext.beginPath();
targetContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
targetContext.fillStyle = "#c3073f";
targetContext.fill();

spawnTarget(target);

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
    collision(dragItem, target);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function spawnTarget(target) {
  randomTop = getRandomNumber(0, winHeight) - 200;
  randomLeft = getRandomNumber(0, winWidth) - 200;
  if (randomTop < 200) {
    randomTop += 200;
  }
  if (randomLeft < 200) {
    randomLeft += 200;
  }

  setTimeout(() => {
    target.style.top = randomTop + "px";
    target.style.left = randomLeft + "px";
    target.style.display = "block";
  }, 700);

  return `${randomTop} ${randomLeft}`;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getLocationTop(elem) {
  return $(elem).offset().top;
}

function getLocationLeft(elem) {
  return $(elem).offset().left;
}

function collision(elem1, elem2) {
  var elem1 = $(elem1);
  var elem2 = $(elem2);

  var elem1Offset = elem1.offset();
  var elem1Width = elem1.width();
  var elem1Height = elem1.height();
  var elem1CenterX = elem1Offset.left + elem1Width / 2;
  var elem1CenterY = elem1Offset.top + elem1Height / 2;

  var elem2Offset = elem2.offset();
  var elem2Width = elem2.width();
  var elem2Height = elem2.height();
  var elem2CenterX = elem2Offset.left + elem2Width / 2;
  var elem2CenterY = elem2Offset.top + elem2Height / 2;

  if (
    (Math.abs(elem1CenterX - elem2CenterX) <= 30 &&
      Math.abs(elem1CenterY - elem2CenterY) <= 30) ||
    (Math.abs(elem2CenterX - elem1CenterX) <= 30 &&
      Math.abs(elem2CenterY - elem1CenterY) <= 30) ||
    (Math.abs(elem1CenterX - elem2CenterX) <= 30 &&
      Math.abs(elem2CenterY - elem1CenterY) <= 30) ||
    (Math.abs(elem2CenterX - elem1CenterX) <= 30 &&
      Math.abs(elem1CenterY - elem2CenterY) <= 30)
  ) {
    target.style.display = "none";
    spawnTarget(target);
    score++;
    scoreItem.innerHTML = score;
  }
}
