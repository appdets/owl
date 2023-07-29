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
<script src="//unpkg.com/owl-client" async></script>
```

## Authentication

`ES6`
```js
// ES6
import Owl from 'owl-client';

// Non-module / CDN
const Owl = window.Owl;

const msg = Owl.init('yourChannelName')
```

## What is channel
Channel is kinda group chat or chat room. You will connect through the channel name your defined. All the data are passes through your channel.

## Send your first message

## Send message to everyone in the channel
```js
msg.send('Hello world');

// or 

msg.send({
    type: "msg",
    text: "This is a JSON message"
})
```

### Broadcast message to everyone except the sender
```js
msg.broadcast({
    type: "msg",
    text: "This is a JSON message"
})
```

### Send message to specific user
```js
msg.to( 
    user, 
    { type: "msg", text: "This is a JSON message" }
    )
```

## Receive your first message

```js
msg.receive((msg) => {
    console.log('Just received', msg)
});
```

## Other events 
```js
msg.connect((data) => {
    // Owl is connected
});
```


**List of all events** 
 

`connect`

`disconnect`

`error`

`receive`


# Send message using REST API

You can also send message using REST API following the method bellow

`Using CURL` 
```bash
curl https://air.appdets.com/send -a 
   -H "Accept: application/json"
   -d "{\"channel\": \"yourChannelName\", \"message\": \"hello world\"}" 
```

`Using JavaScript` 
```js
(async function(){
    const req = await fetch('https://air.appdets.com/send', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel: "yourChannelName",  message: "Hello world" })
    }) 

    const res = await req.json()
    console.log(res)
    // {
    // 	"success": true,
    // }
})()
```

`Using WordPress` 
```php

$response = wp_remote_post('https://air.appdets.com/send', [
    "headers" => [ 
        "Content-Type" =>
        
        "application/json",
    ],
    "body" => [
        "channel" => "yourChannelName",
        "message" => "hello world"
    ]
]); 

$responseBody = json_decode(wp_remote_retrieve_body( $response )); 
 
```


-----

# Early Bird Access!
This is on beta mode, so you have to apply for access before you start. 

Please send a request mail to `jafrandev@gmail.com` with your proper explanation, like what and why you would like to use Owl for your purpose? 

Here is a shortlist of question that we need from you;
- [x] What is your profession?
- [x] Why you would like to use Owl?
- [x] What is the basic cases of your usages?
- [x] How often you will send/receive data? Like *`N`* per day. 
- [x] What is the maximum estimated byte size of your each message?

 
# Contribution?
Ops, currently, contribution on this project is OFF. But you have any suggestion, please send us email at `jafrandev@gmail.com`