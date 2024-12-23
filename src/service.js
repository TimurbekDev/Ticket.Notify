// Define the API URL
const url = "https://eticket.railway.uz/api/v3/trains/availability/space/between/stations";

// Define request headers
const headers = {
    "accept": "application/json",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "uz",
    "cache-control": "no-cache",
    "connection": "keep-alive",
    "content-length": "160",
    "content-type": "application/json",
    "cookie": "_ga=GA1.1.1030661186.1734087178; G_ENABLED_IDPS=google; __stripe_mid=0e363071-1962-482e-8fcd-ed5c290808d607cdbd; XSRF-TOKEN=53dfa106-7c63-47af-ad52-e3ac37699706; mp_d7f79c10b89f9fa3026f2fb08d3cf36d_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A193bfa674b8536-0f7a33b6d344f6-26011851-144000-193bfa674b8536%22%2C%22%24device_id%22%3A%20%22193bfa674b8536-0f7a33b6d344f6-26011851-144000-193bfa674b8536%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D; _ga_K4H2SZ7MWK=GS1.1.1734992017.5.0.1734992017.0.0.0; __stripe_sid=7d98e67c-d3e0-4541-bca8-98dedda21412851954",
    "device-type": "BROWSER",
    "host": "eticket.railway.uz",
    "origin": "https://eticket.railway.uz",
    "pragma": "no-cache",
    "referer": "https://eticket.railway.uz/uz/pages/trains-page",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-xsrf-token": "53dfa106-7c63-47af-ad52-e3ac37699706"
  };
  
// Create the request payload
const payload = (date) => ({
    detailNumPlaces: 1,
    direction: [
        {
            depDate: date,
            fullday: true,
            type: "Forward",
        },
    ],
    showWithoutPlaces: 0,
    stationFrom: "2900000",
    stationTo: "2900885",
})

// Define the function to make the API request
export async function makeRequest(date) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload(date)),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(response);
        
        const data = await response.json();
        // console.log("Response Data:", data.express.direction);
        return data.express.direction
    } catch (error) {
        console.error("Error:", error);
    }
}
