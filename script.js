const serverList = document.getElementById("serverList");

document.getElementById("contactBtn").addEventListener("click", () => {
    alert("Contact @solazr on discord");
});

function loadServers() {
    fetch("status.json")
        .then(response => response.json())
        .then(data => {
            serverList.innerHTML = "";
            const statusOrder = { online: 0, nuked: 1, offline: 2, disabled: 3 };
            data.sort((a, b) => statusOrder[a.st] - statusOrder[b.st]);
            data.forEach(server => {
                const div = document.createElement("div");
                div.classList.add("server", server.st);
                div.innerHTML = `
                    <span class="server-name">
                        ${server.name}
                        <div class="hover-box">
                            <p><strong>Players:</strong></p>
                            <p>${server.p ? server.p.replace(/, /g, "<br>") : "No players online"}</p>
                        </div>
                    </span><br>
                    Owner: ${server.owner}<br>
                    IP: ${server.ip}<br>
                    Port: ${server.port}
                `;
                serverList.appendChild(div);
            });
        })
        .catch(err => console.error(err));
}

loadServers();
setInterval(loadServers, 3000);
