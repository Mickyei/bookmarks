let selected = null;
let item = null;

const menu = document.querySelector(".menu");
let menuVisible = false;

//Toggles the context menu visible and hidden
const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
};

//Set position of menu
const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu('show');
};

const bookmarks = document.getElementById("bookmarkList");
bookmarks.addEventListener("click", e => {
    toggleMenu("none");
});

//Sets position of menu. Also checks if a bookmark is clicked and makes delete available accordingly.
bookmarks.addEventListener("contextmenu", e => {
    e.preventDefault();
    item = event.target.closest('.item');
    const deleteButton = document.getElementById("delete");
    if (item === null) {
        deleteButton.style.pointerEvents = "none";
        deleteButton.style.color = 'gray';
    } else {
        deleteButton.style.pointerEvents = "auto";
        deleteButton.style.color = 'black';
    }
    const origin = {
        left: e.pageX,
        top: e.pageY - 170
    };
    setPosition(origin);
    return false;
});

//Delete a bookmark
const deleteItem = () => {
    if (item != null) item.remove();
}

//Bring up a prompt to add a new bookmark
const addItem = () => {
    const promptText = prompt("Add a new bookmark:");
    if (promptText != null && promptText != "") {
        document.getElementById("newBookmark").value = promptText;
        addBookmark();
    }
}

//If contextmenu is visible, check if any clicks outside bookmarks list and hide menu
document.addEventListener('click', function(event) {
    if(menuVisible) {
        const isClickInside = bookmarks.contains(event.target);
        if (!isClickInside) {
          toggleMenu("none");
        }
    }
});

const dragStart = (e) => {
    //specify target to be allowed to move
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    selected = e.target;
}

const onDragOver = (e) => {
    e.preventDefault();
    if (selected != e.target) {
        //Add a solid line to where the bookmark will be dropped if dropped now
        if (isBefore(selected, e.target)) {
            e.target.style.borderTopLeftRadius = "0px"
            e.target.style.borderBottomLeftRadius = "0px"
            e.target.style.borderLeft = "1.5px solid"
        } else {
            e.target.style.borderTopRightRadius = "0px"
            e.target.style.borderBottomRightRadius = "0px"
            e.target.style.borderRight = "1.5px solid"
        }
    }
}

//Remove styling
const onDragLeave = (e) => {
    e.target.style.borderRadius = "12px"
    e.target.style.border = "none";
}

const isBefore = (item1, item2) => {
    let current;
    if (item2.parentNode === item1.parentNode) {
        //Go through previousSiblings and return true if hovered target is one of them
        for (current = item1.previousSibling; current; current = current.previousSibling) {
            if (current === item2) return true;
        }
    }
    return false;
}

//Insert selected bookmark to it's correct spot
const onDrop = (e) => {
    e.target.style.borderRadius = "12px"
    e.target.style.border = "none";
    if (isBefore(selected, e.target)) {
        e.target.parentNode.insertBefore(selected, e.target)
    } else {
        e.target.parentNode.insertBefore(selected, e.target.nextSibling)
    }
}

//Clear variables
const dragEnd = () => {
    selected = null;
}

//Create a new bookmark and append it to the list
const addBookmark = () => {
    const ul = document.getElementById("bookmarkList");
    const newBookmark = document.getElementById("newBookmark");
    const li = document.createElement("li");
    const icon = document.createElement("span");
    const text = document.createElement("span");
    icon.setAttribute('class', 'icon');
    text.textContent = ' ' + newBookmark.value;
    li.appendChild(icon);
    li.appendChild(text);
    li.setAttribute('class', 'item');
    li.setAttribute('ondragstart', 'dragStart(event)');
    li.setAttribute('ondragleave', 'onDragLeave(event)');
    li.setAttribute('ondragover', 'onDragOver(event)');
    li.setAttribute('ondragend', 'dragEnd()');
    li.setAttribute('ondrop', 'onDrop(event)');
    li.draggable = true;
    ul.appendChild(li);
    document.getElementById("newBookmark").value = "";
}