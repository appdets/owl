import { io } from "socket.io-client";

class Owl {
  _socket = null;
  _channel = null;
  _callbacks = {
      connect: null,
      disconnect: null,
      receive: null,
      error: null,
  };

  call = (callback, arg = null) => {
      if (this._callbacks[callback]) {
          this._callbacks[callback](arg);
      }
  };

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

  connect(callback) {
      this._callbacks.connect = callback;
  }

  disconnect(callback) {
      this._callbacks.disconnect = callback;
  }

  receive(callback) {
      this._callbacks.receive = callback;
  }

  error(callback) {
      this._callbacks.error = callback;
  }

  send(data) {
      this._socket.emit("send", data);
  }

  broadcast(data) {
      this._socket.emit("broadcast", data);
  }

  to(userId, data) {
      this._socket.emit("to", userId, data);
  }
}

export default Owl;