// ==UserScript==
// @name         Aliexpress Auto Message Deleter
// @website      https://github.com/cpawliuk/Aliexpress-Auto-Delete-Messages
// @version      1.1
// @description  Simple script to auto delete messages on Aliexpress.
// @author       Christopher Pawliuk
// @match        *://message.aliexpress.com/*
// @match        *://msg.aliexpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
// @grant        none
// ==/UserScript==

window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);

const newElement = document.createElement("div");
newElement.id = "script-ui";
newElement.style.color = "white";
newElement.style.backgroundColor = "black";
newElement.innerHTML = `<span>Running Aliexpress Message Delete Script -> Please Wait . . .</span>`;
document.getElementById("top-lighthouse").prepend(newElement);
window.scrollTo(0, 0);

addEventListener("load", function() { setTimeout(RunScript, 3000); }); // Set the timeout higher if needed due to the client side delay in loading the components.

function RunScript() {
    window.StartDeleting = () => {
        newElement.innerHTML = `<span>Running Aliexpress Message Delete Script -> Deleting Messages . . .</span>`;
        let messagesToDelete = Array.from(document.querySelectorAll(".btn-delete > svg > path"));
    
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
    newElement.innerHTML = `<span>Running Aliexpress Message Delete Script -> <button id="start-button" onClick="window.StartDeleting()">Start</button></span>`;
}