# OWL never sleeps!
Tiny flagship real time web push notification / message service based on WebSocket. It works on cross browser, cross platform and cross environment. So, waiting for?

# Usages
- [x] Real-time notification
- [x] Purchase alert
- [x] Web alert
- [x] Send LIVE notice
- [x] Live CHAT
- [x] Audio call
- [x] Video call
- [x] Screen shares
- [x] Reverse sharing (Live to Local)
# Get Started

`ES6`
```bash
npm i -D owl-client
```

`Play with CDN`
```html
<script src="https://owl.appdets.com/owl.js"></script>
```

[JSDeliver]()
```html
<script src="https://owl.appdets.com/owl.js"></script>
```


## Authentication

`ES6`
```js
// ES6
import Owl from 'owl-client';

// Non-module / CDN
const Owl = window.Owl;

// authenticate
const publicKey = "YOUR_PUBLIC_KEY;" // just received messages
const privateKey = "YOUR_PRIVATE_KEY"; // also can send messages

const msg = new Owl(publicKey);
```

## Send your first message

```js
msg.send('Hello world');

// or 

msg.send({
    type: "msg",
    text: "This is a JSON message"
})
```

## Receive your first message

```js
msg.message((msg) => {
    console.log(msg)
    // Hello world
});

//or 

msg.on("message", (msg) => {
    console.log(msg)
    // Hello world
});
```

## Other events 
```js
msg.ready((data) => {
    // Owl is ready to send or receive data
});
```

## Mainstream socket methods

Owl supports mainstream socket events like

```js
msg.on("connect", () => {
    // Owl connected
});
```

**List of the events** 
 

`connect`

`connect_error`

`disconnect`

`error`

`ping`

`reconnect`

`reconnection_attempt`

`reconnect_error`

`reconnect_failed`



# Debug

You can turn on debugging mode by using this method
```js
// turn on debugging mode
msg.debug();

// or 

msg.debug(false); // will stop debugging
```

# Send message using REST API

You can also send message using REST API following the method bellow

`Using CURL` 
```bash
curl https://owl.appdets.com/api -a 
   -H "Accept: application/json"
   -H "Authorization: Bearer {YOUR_PRIVATE_KEY}"
   -d "{\"message\": \"hello world\"}" 
```

`Using JavaScript` 
```js
(async function(){
    const privateKey = "YOUR_PRIVATE_KEY"
    const req = await fetch('https://owl.appdets.com/api', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + privateKey
        },
        body: JSON.stringify({  message: "Hello world" })
    }) 

    const res = await req.json()
    console.log(res)
    // {
    // 	"success": true,
    // 	"message": "Message sent"
    // }
})()
```

`Using WordPress` 
```php
$private_key = "YOUR_PRIVATE_KEY";

$response = wp_remote_post('https://owl.appdets.com/api', [
    "headers" => [ 
        "Content-Type" =>
         "application/json",
        "Authorization" => "Bearer " . $private_key
    ],
    "body" => [
        "message" => "hello world"
    ]
]); 

$responseBody = json_decode(wp_remote_retrieve_body( $response )); 
 
```


-----

# Get your Keys!
This is on beta mode, so you have to apply for keys before you start. 

Please send a request mail to `jafrandev@gmail.com` with your proper explanation, like what and why you would like to use Owl for your purpose? 

Here is a shortlist of question that we need from you;
- [x] What is your profession?
- [x] Why you would like to use Owl?
- [x] What is the basic cases of your usages?
- [x] How often you will send/receive data? Like *`N`* per day. 
- [x] What is the maximum estimated byte size of your each message?

 
# Contribution?
Ops, currently, contribution on this project is OFF. But you have any suggestion, please send us email at `jafrandev@gmail.com`