let selected = null;
const bookmarks = document.getElementById("bookmarks");


const dragStart = (e) => {


    //specify target to be allowed to move
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    selected = e.target;
}

const dragOver = (e) => {

    if (e.target === bookmarks.lastElementChild.lastElementChild) {
        bookmarks.lastElementChild.appendChild(selected);

    } else if (isBefore(selected, e.target)) {
        //Check is selected bookmark is before or after bookmark being hovered over
        //e.target.parentNode.insertBefore(selected, e.target);
        if (e.target.nextElementSibling != null && e.target.nextElementSibling.nodeName === 'LI') {
            bookmarks.lastElementChild.insertBefore(selected, e.target);
        }

    } else {
        if (e.target.nextElementSibling != null && e.target.nextElementSibling.nodeName === 'LI') {


            if (e.target == bookmarks.lastElementChild.lastElementChild) {
                console.log("Last child")
            } else {
                bookmarks.lastElementChild.insertBefore(selected, e.target.nextElementSibling);
            }
        }

    }
}

const isBefore = (item1, item2) => {
    let cur;
    if (item2.parentNode === item1.parentNode) {
        for (cur = item1.previousSibling; cur; cur = cur.previousSibling) {

            if (cur === item2) return true;
        }
    }
    return false;
}

//Clear selected variable
const dragEnd = () => selected = null;