console.log("hello")


let currentParentSection;
let sectionsTemplate;
document.addEventListener("DOMContentLoaded", function () {
    currentParentSection = document.getElementById('gameArea')
    sectionsTemplate =  document.getElementById('sectionTemplate')
});

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'j':
            selectUpperLeft();
            break;
        case 'k':
            selectUpperRight()
            break;
        case 'l':
            selectLowerLeft()
            break;
        case ';':
            selectLowerRight()
            break;
        default:
            console.log('def')
    }
});

function selectSection(section) {
    const currentSections = currentParentSection.getElementsByClassName('section')
    for (let i = 0; i < currentSections.length; i++) {
        currentSections[i].classList.remove('red', 'green', 'blue', 'yellow')
    }

    section.innerHTML = sectionsTemplate.innerHTML;
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

