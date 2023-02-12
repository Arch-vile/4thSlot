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

});

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'Enter':
            start();
            break;
        case 'd':
            selectUpperLeft();
            break;
        case 'f':
            selectUpperRight()
            break;
        case 'j':
            selectLowerLeft()
            break;
        case 'k':
            selectLowerRight()
            break;
        case ' ':
            click()
            break;
        default:
            console.log('def')
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

function click() {
    const cursorLocation = currentParentSection.children[3].getBoundingClientRect()
    const targetLocation = target.getBoundingClientRect()

    if (cursorLocation.x >= targetLocation.x
        && cursorLocation.x <= targetLocation.right
        && cursorLocation.y >= targetLocation.y
        && cursorLocation.y <= targetLocation.bottom
    ) {
        console.log('Congrats')
    }

}

