let currentUser = null;

const bannedWords = ["n-word"];
const dangerPatterns = ["i am going to murder", "i will kill"];

function login() {
    const user = document.getElementById("username").value;
    if (!user) return alert("Enter username");
    currentUser = user;
    document.getElementById("currentUser").innerText = "User: " + user;
    document.getElementById("authScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function logout() { location.reload(); }

function showSection(id) {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function moderate(text) {
    const lower = text.toLowerCase();

    for (let word of bannedWords) {
        if (lower.includes(word)) {
            saveReport(text);
            return false;
        }
    }

    for (let phrase of dangerPatterns) {
        if (lower.includes(phrase)) {
            saveReport(text);
            return false;
        }
    }

    return true;
}

function saveReport(content) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push({ user: currentUser, content: content });
    localStorage.setItem("reports", JSON.stringify(reports));
}

function createPost() {
    const text = document.getElementById("postText").value;
    if (!moderate(text)) return alert("Post reported");

    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<b>${currentUser}</b><p>${text}</p>
    <button onclick="like(this)">Like</button>
    <div class="comments">
        <input type="text" placeholder="Comment">
        <button onclick="addComment(this)">Send</button>
    </div>`;
    document.getElementById("posts").appendChild(div);
}

function like(btn) {
    btn.innerText = "Liked";
}

function addComment(btn) {
    const input = btn.previousElementSibling;
    if (!moderate(input.value)) return alert("Comment reported");

    const c = document.createElement("div");
    c.className = "comment";
    c.innerText = currentUser + ": " + input.value;
    btn.parentElement.appendChild(c);
    input.value = "";
}

function sendMessage() {
    const msg = document.getElementById("chatMessage").value;
    if (!moderate(msg)) return alert("Message reported");

    const div = document.createElement("div");
    div.className = "comment";
    div.innerText = currentUser + ": " + msg;
    document.getElementById("chatBox").appendChild(div);
}

function uploadVideo() {
    alert("Video upload demo only");
}

function uploadSong() {
    const title = document.getElementById("songTitle").value;
    const artist = document.getElementById("artistName").value;
    const file = document.getElementById("audioUpload").files[0];
    if (!file) return alert("Upload 30s preview only");

    const url = URL.createObjectURL(file);

    const div = document.createElement("div");
    div.className = "musicPost";
    div.innerHTML = `
        <b>${title} - ${artist}</b>
        <audio controls>
            <source src="${url}">
        </audio>
        <button onclick="like(this)">Like</button>
        <div class="comments">
            <input type="text" placeholder="Comment">
            <button onclick="addComment(this)">Send</button>
        </div>
    `;
    document.getElementById("musicFeed").appendChild(div);
}

function submitGame() {
    const link = document.getElementById("gameLink").value;
    const div = document.createElement("div");
    div.innerHTML = `<a href="${link}" target="_blank">Play Game</a> (Pending Review)`;
    document.getElementById("gamesList").appendChild(div);
}

function viewReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const list = document.getElementById("reportList");
    list.innerHTML = "";
    reports.forEach(r => {
        list.innerHTML += `<div class="comment"><b>${r.user}</b>: ${r.content}</div>`;
    });
}
