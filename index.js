let gameArea;
let currentParentSection;
let sectionsTemplate;
let cursorTemplate;
let target;
document.addEventListener("DOMContentLoaded", function () {
    gameArea = document.getElementById('gameArea')
    currentParentSection = gameArea
    sectionsTemplate = document.getElementById('sectionTemplate')
    cursorTemplate = document.getElementById('cursorTemplate')
    target = document.getElementById('target')

    start();
});

document.addEventListener("click", (mouseEvent) => {
   clickMouse(mouseEvent.clientX, mouseEvent.clientY)
});

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'e':
            selectUpperLeft();
            break;
        case 'i':
            selectUpperRight()
            break;
        case 'f':
            selectLowerLeft()
            break;
        case 'j':
            selectLowerRight()
            break;
        case ' ':
            clickSpace()
            break;
        default:
            console.log(event.key)
    }
});

let startTime;

function start() {
    startTime = new Date();

    currentParentSection = gameArea
    currentParentSection.innerHTML = sectionsTemplate.innerHTML
    currentParentSection.getElementsByClassName('bottomRight')[0].innerHTML = cursorTemplate.innerHTML

    const targetSize = target.getBoundingClientRect()
    const gameAreaSize = gameArea.getBoundingClientRect()
    const targetMaxX = gameAreaSize.right-targetSize.width
    const targetMaxY = gameAreaSize.bottom-targetSize.height

    target.classList.remove('hidden')
    target.style.left = Math.random()*targetMaxX + 'px'
    target.style.top = Math.random()*targetMaxY + 'px'

}

const lapTimes = [];
function successHit() {
    const now = new Date();
    const lapTime = now-startTime
    lapTimes.push(lapTime)

    const average = lapTimes.reduce((previousValue, currentValue) => previousValue+currentValue)/lapTimes.length

    document.getElementById('timer').textContent = Math.floor(average) + 'ms'

    start()
}

function selectSection(section) {
    const currentSections = currentParentSection.getElementsByClassName('section')
    for (let i = 0; i < currentSections.length; i++) {
        currentSections[i].classList.remove('red', 'green', 'blue', 'yellow')
        currentSections[i].innerHTML = '';
    }

    section.innerHTML = sectionsTemplate.innerHTML;
    section.children[3].innerHTML = cursorTemplate.innerHTML
    currentParentSection = section;
}

function selectUpperLeft() {
    selectSection(currentParentSection.children[0]);
}

function selectUpperRight() {
    selectSection(currentParentSection.children[1]);
}

function selectLowerLeft() {
    selectSection(currentParentSection.children[2]);
}

function selectLowerRight() {
    selectSection(currentParentSection.children[3]);
}

function clickSpace() {
    const cursorLocation = currentParentSection.children[3].getBoundingClientRect()
    checkHit(cursorLocation.x, cursorLocation.y)
}

function clickMouse(x,y) {
   checkHit(x,y)
}


function checkHit(x,y) {
    const targetLocation = target.getBoundingClientRect()

    if (x >= targetLocation.x
        && x <= targetLocation.right
        && y >= targetLocation.y
        && y <= targetLocation.bottom
    ) {
        successHit()
    }
}

