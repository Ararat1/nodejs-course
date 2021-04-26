"use strict";

const newCard = ({ _id, title: taskTitle, date }) => {
    // Elements
    let col = document.createElement("div");
    col.classList.add("col-12");

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("text-center");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("d-flex");
    cardBody.classList.add("flex-row");
    cardBody.classList.add("align-items-center");
    cardBody.classList.add("justify-content-around");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = taskTitle;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.innerText = "Delete";
    deleteBtn.id = _id;

    let cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("text-muted");
    cardFooter.innerText = date;

    // Struct
    col.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(deleteBtn);
    card.appendChild(cardFooter);

    return col;
}

window.addEventListener("load", (e) => {
    const form = document.querySelector("form#task");
    const cardsList = document.querySelector("section#tasks div.list");

    // Create
    // ----------------------------
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let taskObj = {
                task: e.target.task.value
            };

            let reqOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskObj)
            };

            fetch("/tasks", reqOptions)
                .then((res) => res.json())
                .then(({ error, task }) => {
                    if (error) {
                        console.log("Response error: ", error.message);
                        return;
                    }

                    cardsList.appendChild(newCard(task));
                })
                .catch((err) => console.log("Response error: ", err.message))
                .finally(() => e.target.reset());
        });
    }

    // Delete
    // ----------------------------
    cardsList.addEventListener("click", ({ target }) => {
        if (target.tagName === "BUTTON") {
            let query = {
                _id: target.id
            };

            let reqOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(query)
            };

            fetch("/tasks", reqOptions)
                .then((res) => res.json())
                .then(({ message }) => {
                    alert(message);
                    location.reload();
                })
                .catch((err) => alert(err.message));
        }
    });
});