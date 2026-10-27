let tasks = JSON.parse(localStorage.getItem("taskgroup")) || [];

function save() {
    localStorage.setItem("taskgroup", JSON.stringify(tasks));
}

function addTask() {
    const member = document.getElementById("member").value;
    const task = document.getElementById("task").value;

    if (!member || !task) {
        alert("Nama anggota dan tugas harus diisi!");
        return;
    }

    tasks.push({
        member: member,
        task: task,
        status: "Belum selesai"
    });

    save();
    displayTasks();

    document.getElementById("member").value = "";
    document.getElementById("task").value = "";
}

function changeStatus(index) {
    tasks[index].status =
        tasks[index].status === "Belum selesai"
        ? "Selesai"
        : "Belum selesai";

    save();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    save();
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>👤 ${item.member}</h3>
            <p>${item.task}</p>

            <div class="status">
                Status: ${item.status}
            </div>

            <button onclick="changeStatus(${index})">
                Ubah Status
            </button>

            <button class="delete"
                onclick="deleteTask(${index})">
                Hapus
            </button>
        `;

        list.appendChild(card);
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(() => console.log("Service Worker aktif"))
            .catch((error) => console.error("Service Worker gagal:", error));
    });
}

displayTasks();