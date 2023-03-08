import myKey from "./KhaltiKey";
// import fetch from 'fetch';

let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1554",
    "productName": "test app",
    "productUrl": "https://127.0.0.1:5173",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log(payload);

            let data = {
                token: payload.token,
                amount: payload.amount
            }

            let config = {
                headers: {
                    Authorization: myKey.secretKey,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'text/plain'
                }
            }

            fetch("https://khalti.com/api/v2/payment/verify/", {
                method: 'POST',
                mode: 'no-cors',
                // caches: 'no-cache',
                withCredentials: true,
                credentials: 'same-origin',
                body: JSON.stringify(data),
                headers: config.headers
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};


export default config;