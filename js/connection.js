const modeDevelop = window.location.port == '5500';
const trying = false;
const api = modeDevelop && trying  ? 'http://192.168.1.16:3000/api/' : 'https://registersapi.onrender.com/api/';