import App from "./App";

export async function doPost(url, params) {
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify( params )
        })
        const data = await response.json();
        if (!response.ok) {
            if(typeof data !== 'undefined') {
                if(typeof data.code !== 'undefined' && data.code === 1001){
                    alert(data.msg);
                    localStorage.clear();
                    window.location.reload(false);
                }
            }
            console.log("Network response was not ok");
        }
        
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
  
  
  