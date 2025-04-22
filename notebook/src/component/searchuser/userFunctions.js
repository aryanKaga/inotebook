
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null; // Return null if cookie not found
    
}



export function sendConnection({ws,receiver,receiver_email}){
    let  token=getCookie('auth_token');
    ws.current.send(JSON.stringify({
        headers:token,
        type:"connection_request",
        to:receiver,
        email:receiver_email
    }))
}


