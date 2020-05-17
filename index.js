let selected = null;
let hovered = null;
const bookmarks = document.getElementById("bookmarks");


const dragStart = (e) => {

    //specify target to be allowed to move
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    selected = e.target;
}

const onDragOver = (e) => {

    e.preventDefault();
    hovered = e.target;

    if (isBefore(selected, e.target)) {
        //e.target.parentNode.insertBefore(selected, e.target)
        e.target.style.borderRadius = "0px"
        e.target.style.borderLeft = "1.5px solid"
    } else {
        //e.target.parentNode.insertBefore(selected, e.target.nextSibling)
        e.target.style.borderRadius = "0px"
        e.target.style.borderRight = "1.5px solid"
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
        //Go through previousSiblings and hovered target is one of them
         for (current = item1.previousSibling; current; current = current.previousSibling) {
            if (current === item2) return true;
        } 
    }
    return false;
}

const onDrop = (e) => {
    e.target.style.borderRadius = "12px"
    e.target.style.border = "none";

    //Check if selected bookmark is before or after the one getting dropped on
    if (isBefore(selected, e.target)) {
        e.target.parentNode.insertBefore(selected, e.target)
    } else {
        e.target.parentNode.insertBefore(selected, e.target.nextSibling)
    }

}

//Clear variables
const dragEnd = () => {

    selected = null;
    hovered = null;
}

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
    li.setAttribute('ondragstart','dragStart(event)');
    li.setAttribute('ondragleave','onDragLeave(event)');
    li.setAttribute('ondragover','onDragOver(event)');
    li.setAttribute('ondragend','dragEnd()');
    li.setAttribute('ondrop','onDrop(event)');
    li.draggable = true;
    ul.appendChild(li);
    document.getElementById("newBookmark").value = "";
}