// ==UserScript==
// @name         Aliexpress Auto Message Deleter
// @website      https://github.com/cpawliuk/Aliexpress-Auto-Delete-Messages
// @version      1.0
// @description  Simple script to auto delete messages on Aliexpress.
// @author       Christopher Pawliuk
// @match        *://message.aliexpress.com/buyerMsgListNew*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @grant        none
// ==/UserScript==

window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);

const newElement = document.createElement("div");
newElement.id = "script-ui";
newElement.style.color = "white";
newElement.style.backgroundColor = "black";
newElement.innerHTML = `<b>Running Aliexpress Message Delete Script -> Please Wait . . .`;
document.getElementById("top-lighthouse").prepend(newElement);
window.scrollTo(0, 0);

addEventListener("load", setTimeout(RunScript, 3000)); // Set the timeout higher if needed due to the client side delay in loading the components.

function RunScript() {
    window.StartDeleting = () => {
        newElement.innerHTML = `<b>Running Aliexpress Message Delete Script -> Deleting Messages . . .`;
        let messagesToDelete = Array.from(document.querySelectorAll(".btn-delete > svg > path"));
    
        if (messagesToDelete.length < 1) {
            newElement.innerHTML = `<b>Running Aliexpress Message Delete Script -> All Messages Deleted`;
            return; // If the node list was empty then quit.
        }
    
        const event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        });
    
        messagesToDelete.forEach((item, i) => {
            i = i + 1;

            setTimeout(() => {
                item.dispatchEvent(event);

                setTimeout(() => {
                    try {
                        item.dispatchEvent(event);
                        document.querySelector(".im-button--mod-primary.window-confirm__dialog-btn-ok__im-button.im-button").click();
    
                        // Recheck for more due to certain messages being hidden based on scrollview and client side code.
                        if (i === messagesToDelete.length) {
                            window.StartDeleting();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }, 2000);
            },i * 3000);
        });
    };
    
    window.scrollTo(0, 0);
    newElement.innerHTML = `<b>Running Aliexpress Message Delete Script -> </b><button id="start-button" onClick="window.StartDeleting()">Start</button>`;
}