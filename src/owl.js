import { io } from "socket.io-client";

/**
 * Owl class representing a socket connection manager.
 */
class Owl {
    /**
     * Private property to store the socket instance.
     */
    _socket = null;

    /**
     * Private property to store the channel name.
     */
    _channel = null;

    /**
     * Private property to store callback functions for different socket events.
     */
    _callbacks = {
        connect: null,
        disconnect: null,
        receive: null,
        error: null,
    };

    /**
     * Calls the specified callback function with an optional argument.
     * @param {string} callback - The name of the callback function to call.
     * @param {*} arg - An optional argument to pass to the callback function.
     */
    call = (callback, arg = null) => {
        if (this._callbacks[callback]) {
            this._callbacks[callback](arg);
        }
    };

    /**
     * Initializes a new instance of the Owl class with the given channel.
     * @param {string} channel - The name of the channel to connect to.
     * @returns {Owl} The newly created Owl instance.
     * @throws {Error} If the channel is not provided or is not a valid string.
     */
    static init(channel = null) {
        if (!channel || typeof channel !== "string" || channel.length < 1) {
            throw new Error("Channel is required");
        }

        const owl = new Owl();
        owl._channel = channel;

        const socket = io("https://air.appdets.com", {
            query: {
                channel: channel,
            },
        });

        const payload = (socket) => ({
            connected: socket.connected,
            id: socket.id,
            channel: channel,
            others: {
                hostname: socket.io.opts.hostname,
                port: socket.io.opts.port,
                secure: socket.io.opts.secure,
            },
        });

        socket.on("connect", () => owl.call("connect", payload(socket)));
        socket.on("disconnect", () => owl.call("disconnect", payload(socket)));
        socket.on("receive", (msg) => owl.call("receive", msg));
        socket.on("error", (err) => owl.call("error", err));
        socket.on("connect_error", (err) => owl.call("error", err));
        socket.on("connect_timeout", (err) => owl.call("error", err));
        socket.on("reconnect_error", (err) => owl.call("error", err));
        socket.on("reconnect_failed", (err) => owl.call("error", err));
        socket.on("reconnect", (err) => owl.call("error", err));

        owl._socket = socket;
        return owl;
    }

    /**
     * Sets the callback function to handle the "connect" event.
     * @param {function} callback - The callback function to handle the "connect" event.
     */
    connect(callback) {
        this._callbacks.connect = callback;
    }

    /**
     * Sets the callback function to handle the "disconnect" event.
     * @param {function} callback - The callback function to handle the "disconnect" event.
     */
    disconnect(callback) {
        this._callbacks.disconnect = callback;
    }

    /**
     * Sets the callback function to handle the "receive" event.
     * @param {function} callback - The callback function to handle the "receive" event.
     */
    receive(callback) {
        this._callbacks.receive = callback;
    }

    /**
     * Sets the callback function to handle the "error" event.
     * @param {function} callback - The callback function to handle the "error" event.
     */
    error(callback) {
        this._callbacks.error = callback;
    }

    /**
     * Sends data through the socket using the "send" event.
     * @param {*} data - The data to send through the socket.
     */
    send(data) {
        this._socket.emit("send", data);
    }

    /**
     * Broadcasts data to all connected clients using the "broadcast" event.
     * @param {*} data - The data to broadcast to all connected clients.
     */
    broadcast(data) {
        this._socket.emit("broadcast", data);
    }

    /**
     * Sends data to a specific user identified by userId using the "to" event.
     * @param {string} userId - The ID of the user to send data to.
     * @param {*} data - The data to send to the specified user.
     */
    to(userId, data) {
        this._socket.emit("to", userId, data);
    }
}


export default Owl;