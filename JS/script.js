let tasks = [];
let filterDate = "";

// Tambah task baru
function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    if (taskInput.value === "" || dateInput.value === "") {
        alert("Please enter a task and a date.");
    } else {
        tasks.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false,
        });
        renderTasks();
        taskInput.value = "";
        dateInput.value = "";
    }
}

// Hapus semua task
function removeAllTask() {
    tasks = [];
    renderTasks();
}

// Filter task berdasarkan tanggal
function toggleFilter() {
    const selectedDate = prompt("Masukkan tanggal (YYYY-MM-DD) untuk filter, kosongkan untuk menampilkan semua:");
    filterDate = selectedDate ? selectedDate : "";
    renderTasks();
}

function applyFilter() {
    const filterInput = document.getElementById("filter-date");
    filterDate = filterInput.value;
    renderTasks();
}

// Hapus satu task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
function cancelFilter() {
    filterDate = "";
    const filterInput = document.getElementById("filter-date");
    if (filterInput) filterInput.value = "";
    renderTasks();
}
// Fungsi untuk mengubah format tanggal
function formatDate(dateStr) {
    // dateStr: "YYYY-MM-DD"
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
}
// Render task ke halaman
function renderTasks() {
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";

    // Tampilkan pesan filter jika filter aktif
    if (filterDate) {
        const filterInfo = document.createElement("div");
        filterInfo.style.color = "#2563eb";
        filterInfo.style.fontWeight = "bold";
        filterInfo.style.marginBottom = "10px";
        filterInfo.textContent = `Menampilkan task hanya tanggal: ${formatDate(filterDate)}`;
        taskList.appendChild(filterInfo);
    }

    // Filter jika ada filterDate
    let filteredTasks = filterDate
        ? tasks.filter(task => task.date === filterDate)
        : tasks;

    // Urutkan berdasarkan tanggal (ascending)
    filteredTasks = filteredTasks.slice().sort((a, b) => a.date.localeCompare(b.date));

    if (filteredTasks.length === 0) {
        taskList.innerHTML += "<p>No tasks available</p>";
        return;
    }

    // Buat list task
    const ul = document.createElement("ul");
    ul.style.padding = "0";
    ul.style.margin = "0";
    ul.style.listStyle = "none";

    filteredTasks.forEach((task) => {
        const realIndex = tasks.indexOf(task);

        const li = document.createElement("li");
        li.className = "todo-item";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.background = "#fff";
        li.style.padding = "10px 8px";
        li.style.marginBottom = "8px";
        li.style.borderRadius = "6px";
        li.style.border = "1px solid #e5e7eb";

        // Kiri: tanggal dan judul
        const leftDiv = document.createElement("div");
        leftDiv.style.display = "flex";
        leftDiv.style.alignItems = "center";
        // Tanggal
        const dateSpan = document.createElement("span");
        dateSpan.style.color = "#6b7280";
        dateSpan.style.fontSize = "0.95rem";
        dateSpan.style.marginRight = "12px";
        dateSpan.textContent = formatDate(task.date); // <-- gunakan format baru
        // Judul
        const titleSpan = document.createElement("span");
        titleSpan.style.fontWeight = "600";
        titleSpan.textContent = task.title;
        titleSpan.style.color = "#374151";
        leftDiv.appendChild(dateSpan);
        leftDiv.appendChild(titleSpan);

        // Kanan: hanya tombol hapus
        const rightDiv = document.createElement("div");

        // Tombol hapus
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-red btn-inline";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            deleteTask(realIndex);
        };
        rightDiv.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        ul.appendChild(li);
    });

    taskList.appendChild(ul);
    // Tampilkan atau sembunyikan tombol Batal Filter
    const cancelBtn = document.getElementById("cancel-filter-btn");
    if (cancelBtn) {
        cancelBtn.style.display = filterDate ? "inline-block" : "none";
    }
}

// Render saat halaman dimuat
window.onload = renderTasks;