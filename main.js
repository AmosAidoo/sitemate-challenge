const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const messageBox = document.querySelector("#messageBox")

function buttonEventListener(buttonName){
  return () => {
    const dialog = new Dialog(`This is ${buttonName} button dialog!`, buttonName);
    dialog.show()
      .confirm(()=> {
        messageBox.innerText = `${buttonName} dialog confirm clicked!`
      })
      .cancel(()=> {
        messageBox.innerText = `${buttonName} dialog cancel clicked!`
      })
  }
}

button1.addEventListener("click", buttonEventListener("Money"))
button2.addEventListener("click", buttonEventListener("Work"))
button3.addEventListener("click", buttonEventListener("Growth"))
