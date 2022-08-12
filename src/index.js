// Importing client library
import { io } from "socket.io-client";

// Main class
class Owl {
  /**
   * Public Key will be used to received a message, it's a publishable key.
   */
  publicKey = null;

  /**
   * Private Key will be used to sign a message, it's a private key.
   */
  privateKey = null;

  /**
   * Debug mode, if true, it will print all the logs.
   */
  debug = false;

  /**
   *
   * @param {object} data
   * @returns this
   * @memberof Owls
   */

  constructor(data = {}) {
    /**
     * Checking if the protocol is https or http
     * */
    if (location.protocol !== "https:") {
      console.error(
        "Error: Owl works only on HTTPS, please use HTTPS protocol"
      );
      return;
    }

    /**
     * Sanitizes the data
     */
    if (typeof data === "string") {
      /**
       * If the data is a string, it will be used for public key
       */
      this.publicKey = data;
    } else {
      /**
       * If the data is an object, it will be used for private key and public key
       */
      this.publicKey = data.publicKey || null;
      this.privateKey = data.privateKey || null;

      /**
       * If the debug mode is true, it will print all the logs
       */
      this.debug = data.debug || false;
    }

    /**
     * Connecting to the servers
     */
    try {
      /*
       * Connecting to the server
       */

      this.connect();
    } catch (e) {

      /**
       * If the connection fails, it will print the errors
       */
      if (this.debug) {
        console.log(e);
      }
    }
  }

  /**
   * Connecting to the server
   */

  connect = () => {

    /**
     * Initializing the socket
     */
    const socket = io("//owl.appdets.com", {
      auth: {
        publicKey: this.publicKey,
        privateKey: this.privateKey,
      },
      transports: ["polling"],
    });

    /**
     * Assigning the socket to the this.socket
     */
    this.socket = socket;

    /**
     * Once the connection is established, other functions will be called
     */
    this.registerEvents();
  };


  /**
   * Registering the events
   */
  registerEvents = () => {
    [
      "message",
      "error",
      "connect",
      "disconnect",
      "reconnect",
      "reconnection_attempt",
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


  /**
   * Handling the events
   */
  callbacks = {};

  /**
   * 
   * @param {String} eventName 
   * @param {Function} handler 
   */

  on = (eventName, handler) => {
    if (!this.callbacks[eventName]) this.callbacks[eventName] = [];
    this.callbacks[eventName].push(handler);
  };

  /**
   * 
   * @param {String} eventName 
   * @param {Any} data 
   */
  emit = (eventName, data) => {
    for (const callback of this.callbacks[eventName]) {
      callback(data);
    }
  };


  /**
   * Triggers when a new message is received
   * @param {Function} callback 
   */
  message = (callback) => {
    this.on("message", callback);
  };

  /**
   * Triggers when the client is ready to receive messages
   * @param {Function} callback 
   */
  ready = (callback) => {
    this.on("ready", callback);
  };

  /**
   * Sends a message to the server
   * @param {Any} data 
   */

  send = (data) => {
    this.socket.emit("send", data);
  };

  /**
   * Events
   */
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

  /**
   * Handling the debug mode
   * @param {Boolean} debug 
   */
  debug = (debug = true) => {
    this.debug = debug;
  };
}

// Make the Owl available globally
window.Owl = Owl;

/**
 * Export the Owl class to be used in other files
 * @export
 * @class Owl
 * 
 */

export default Owl;


