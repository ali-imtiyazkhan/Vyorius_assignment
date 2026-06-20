const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

const tasks = [];
let nextId = 1;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("sync:tasks", tasks);

  socket.on("task:create", (data) => {
    const task = {
      id: nextId++,
      title: data.title,
      column: data.column || "todo",
      priority: data.priority || "Medium",
      category: data.category || "Feature",
      attachments: [],
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    io.emit("task:created", task);
  });

  socket.on("task:update", (data) => {
    const task = tasks.find((t) => t.id === data.id);
    if (!task) return;
    if (data.title !== undefined) task.title = data.title;
    if (data.priority !== undefined) task.priority = data.priority;
    if (data.category !== undefined) task.category = data.category;
    if (data.attachments !== undefined) task.attachments = data.attachments;
    io.emit("task:updated", task);
  });

  socket.on("task:move", (data) => {
    const task = tasks.find((t) => t.id === data.id);
    if (!task) return;
    task.column = data.column;
    io.emit("task:moved", task);
  });

  socket.on("task:delete", (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return;
    tasks.splice(index, 1);
    io.emit("task:deleted", id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
