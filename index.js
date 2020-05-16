let selected = null;

const dragStart = (e) => {
    //specify target to be allowed to move
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', null);
    selected = e.target
}

const dragOver = (e) => {
    if (isBefore(selected, e.target)) {
        
        e.target.parentNode.insertBefore(selected, e.target)
    } else {
        if(e.target.nextElementSibling != null && e.target.nextElementSibling.nodeName === 'LI') {
            console.log("Haloo")
            e.target.parentNode.insertBefore(selected, e.target.nextSibling)
        }
       
    }
}

const isBefore = (item1, item2) => {
    let cur
    if (item2.parentNode === item1.parentNode) {
        for (cur = item1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === item2) return true
        }
    }
    return false;
}

//Clear selected variable
const dragEnd = () => selected = null;