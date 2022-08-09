const api = 'asdasd';

const getData = async () => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
} 


const submitNewData = async (data) => {
    const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
}