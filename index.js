const dragStart = (e) => {
//specify target to be allowed to move
console.log("Drag started");
e.dataTransfer.effectAllowed = 'move';
e.dataTransfer.setData('text/plain', e.target.id);
  }
