import { io } from "socket.io-client";

class Owl {
  publicKey = null;
  privateKey = null;
  debug = false;

  constructor(data = {}) {
    if (location.protocol !== "https:") {
      console.error(
        "Error: Owl works only on HTTPS, please use HTTPS protocol"
      );
      return;
    }
    if (typeof data === "string") {
      this.publicKey = data;
    } else {
      this.publicKey = data.publicKey || null;
      this.privateKey = data.privateKey || null;
    }
    try {
      this.connect();
    } catch (e) {
      if (this.debug) {
        console.log(e);
      }
    }
  }

  connect = () => {
    const socket = io("//owl.appdets.com", {
      auth: {
        publicKey: this.publicKey,
        privateKey: this.privateKey,
      },
      transports: ["polling"],
    });

    this.socket = socket;
    this.registerEvents();
  };

  registerEvents = () => {
    [
      "message",
      "error",
      "connect",
      "disconnect",
      "reconnect", 
      'reconnection_attempt',
      "reconnect_error",
      "reconnect_failed",
      "ping",
    ].forEach((event) => {
      this.socket.on(event, (data) => {
        try {
          this.emit(event, data);
        } catch (e) {}

        try {
          if (this.debug === true) this.events[event](data);
        } catch (e) {}
      });
    });
  };

  callbacks = {};

  on = (eventName, handler) => {
    if (!this.callbacks[eventName]) this.callbacks[eventName] = [];
    this.callbacks[eventName].push(handler);
  };

  emit = (eventName, data) => {
    for (const callback of this.callbacks[eventName]) {
      callback(data);
    }
  };

  message = (callback) => {
    this.on("message", callback);
  }; 
  ready = (callback) => {
    this.on("ready", callback);
  };

  send = (data) => {
    this.socket.emit("send", data);
  };

  events = {
    disconnect: () => {
      console.log("Disconnected from server");
    },
    connect: () => {
      console.log("Connected to server");
    },
    reconnect: () => {
      console.log("Reconnected to server");
    },
    reconnection_attempt: () => {
      console.log("Attempting to reconnect to server");
    },
    reconnect_error: () => {
      console.log("Reconnection error");
    },
    reconnect_failed: () => {
      console.log("Reconnection failed");
    },
    ping: () => {
      console.log("Ping");
    },
  };

  debug = (debug = true) => {
    this.debug = debug;
  };
}

window.Owl = Owl;
