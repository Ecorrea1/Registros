const developerMode = true;
let api = developerMode  ? 'http://localhost:3000/api/' : 'https://registersapi.onrender.com/api/';
const url = origin === "http://127.0.0.1:5500" || origin.includes('http://192.168.1.') ? "" : "/registros";

function urlAdaptive() {
    const urls = document.querySelectorAll('#url');
    urls.forEach( e => {
        const link = e.href.replace( origin, "" );
        if (link === "/login.html") e.innerHTML = user
        e.href = url + link;
    });
}


window.onload = setTimeout(() => urlAdaptive(), 500);