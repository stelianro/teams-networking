function getTeamsRequest() {
    return fetch("http://localhost:3000/teams-json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((r) => {
        return r.json();
    });
}

function createTeamsRequest(team) {
    return fetch("http://localhost:3000/teams-json/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
    }).then((r) => r.json());
}

function getTeamAsHTML(team) {
    return `<tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.name}</td>
        <td>${team.url}</td>
        <td></td>
    </tr>`;
}
function showTemas(teams) {
    const html = teams.map(getTeamAsHTML);
    $("table tbody").innerHTML = html.join("");
}

function $(selector) {
    return document.querySelector(selector);
}

function formSubmit(e) {
    e.preventDefault();
    console.warn(e);

    const promotion = $("#promotion").value;
    const members = $("#members").value;
    const name = $("#name").value;
    const url = $("#url").value;

    const team = {
        promotion: promotion,
        members: members,
        name: name,
        url: url,
    };

    createTeamsRequest(team).then((status) => {
        console.info("status", status);
        window.location.reload();
    });
}

function initEvents() {
    $("#editForm").addEventListener("submit", formSubmit);
}

getTeamsRequest().then((teams) => {
    showTemas(teams);
});

initEvents();
