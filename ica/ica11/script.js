function displayMessage(msgText, msgType) {
    const body = document.body;

    const panel = document.createElement("div");
    panel.setAttribute("class", "msgBox");
    body.appendChild(panel);

    const msg = document.createElement("p");
    msg.textContent = msgText;
    panel.appendChild(msg);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "x";
    panel.appendChild(closeBtn);

    closeBtn.addEventListener("click", () =>
    panel.parentNode.removeChild(panel),
    );

    if (msgType === "warning") {
        msg.style.backgroundImage = "url(warning.png)";
        panel.style.backgroundColor = "red";
    } 
    else if (msgType === "chat") {
        msg.style.backgroundImage = "url(chat.png)";
        panel.style.backgroundColor = "aqua";
    } 
    else {
        msg.style.paddingLeft = "20px";
    }
}

const btn = document.querySelector("button");

btn.addEventListener("click", displayRandomMessage);

function displayRandomMessage() {
    let randomNumber = Math.floor(Math.random() * 4);
    if(randomNumber == 0) {
        displayMessage("Your inbox is almost full — delete some mails", "warning");
    }
    else if(randomNumber == 1) {
        displayMessage("Brian: Hi there, how are you today?", "chat");
    }
    else if(randomNumber == 2) {
        displayMessage("Your mom", "warning");
    }
    else if(randomNumber == 3) {
        displayMessage("yeehaw", "chat");
    }
    else {
        displayMessage("Congrats, you broke my random message chooser.", "warning");
    }
}
