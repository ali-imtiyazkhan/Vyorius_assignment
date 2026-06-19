import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const SERVER_URL = "http://localhost:5000";
const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];
const PRIORITIES = ["Low", "Medium", "High"];
const CATEGORIES = ["Bug", "Feature", "Enhancement"];

const COLORS = ["#FF8042", "#FFBB28", "#00C49F"];

function SortableTaskCard({ task, onDelete, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      {...attributes}
      {...listeners}
    >
      <div className="task-header">
        <strong>{task.title}</strong>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          &times;
        </button>
      </div>
      <div className="task-meta">
        <select
          value={task.priority}
          onChange={(e) => onUpdate(task.id, { priority: e.target.value })}
          onClick={(e) => e.stopPropagation()}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={task.category}
          onChange={(e) => onUpdate(task.id, { category: e.target.value })}
          onClick={(e) => e.stopPropagation()}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {task.attachments && task.attachments.length > 0 && (
        <div className="task-attachments">
          {task.attachments.map((file, i) => (
            <div key={i} className="attachment-item">
              {file.type.startsWith("image/") ? (
                <img src={file.url} alt={file.name} width="60" />
              ) : (
                <a href={file.url} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DroppableColumn({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="kanban-column"
      data-testid={`column-${id}`}
      style={{ background: isOver ? "#d0d4e0" : undefined }}
    >
      {children}
    </div>
  );
}

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskCategory, setNewTaskCategory] = useState("Feature");
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    const s = io(SERVER_URL);

    s.on("connect", () => setLoading(false));
    s.on("sync:tasks", (data) => {
      setTasks(data);
      setLoading(false);
    });
    s.on("task:created", (task) => {
      setTasks((prev) => [...prev, task]);
    });
    s.on("task:updated", (updated) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
      );
    });
    s.on("task:moved", (moved) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === moved.id ? { ...t, column: moved.column } : t))
      );
    });
    s.on("task:deleted", (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    });

    setSocket(s);
    return () => s.disconnect();
  }, []);

  const handleCreateTask = useCallback(() => {
    if (!newTaskTitle.trim() || !socket) return;
    socket.emit("task:create", {
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      category: newTaskCategory,
    });
    setNewTaskTitle("");
  }, [newTaskTitle, newTaskPriority, newTaskCategory, socket]);

  const handleDeleteTask = useCallback(
    (id) => {
      if (socket) socket.emit("task:delete", id);
    },
    [socket]
  );

  const handleUpdateTask = useCallback(
    (id, data) => {
      if (socket) socket.emit("task:update", { id, ...data });
    },
    [socket]
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overColumn = COLUMNS.find(
      (c) => c.id === over.id
    );

    const targetColumn = overColumn
      ? overColumn.id
      : tasks.find((t) => t.id === over.id)?.column;

    if (targetColumn && targetColumn !== activeTask.column) {
      if (socket) socket.emit("task:move", { id: activeTask.id, column: targetColumn });
    }
  };

  const getColumnTasks = (columnId) =>
    tasks.filter((t) => t.column === columnId);

  const chartData = COLUMNS.map((col) => ({
    name: col.title,
    count: getColumnTasks(col.id).length,
  }));

  const totalTasks = tasks.length;
  const doneCount = getColumnTasks("done").length;
  const completionPct = totalTasks ? Math.round((doneCount / totalTasks) * 100) : 0;

  const pieData = COLUMNS.map((col, i) => ({
    name: col.title,
    value: getColumnTasks(col.id).length,
    color: COLORS[i],
  }));

  if (loading) return <div className="loading">Connecting to server...</div>;

  return (
    <div className="kanban-container">
      <div className="add-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task title"
          data-testid="task-title-input"
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          data-testid="task-priority-select"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          data-testid="task-category-select"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleCreateTask} data-testid="add-task-btn">
          Add Task
        </button>
      </div>

      <div className="progress-section">
        <h3>Progress: {completionPct}% complete</h3>
        <div className="charts">
          <div className="chart" data-testid="bar-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart" data-testid="pie-chart">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-columns">
          {COLUMNS.map((col) => (
            <DroppableColumn key={col.id} id={col.id}>
              <h3 className="column-header">
                {col.title} ({getColumnTasks(col.id).length})
              </h3>
              <SortableContext
                items={getColumnTasks(col.id).map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="task-list" data-testid={`column-${col.id}-tasks`}>
                  {getColumnTasks(col.id).map((task) => (
                    <SortableTaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                      onUpdate={handleUpdateTask}
                    />
                  ))}
                </div>
              </SortableContext>
              <button
                className="upload-btn"
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = "image/*,.pdf";
                  fileInput.multiple = true;
                  fileInput.onchange = () => {
                    Array.from(fileInput.files).forEach((file) => {
                      const url = URL.createObjectURL(file);
                      if (socket) {
                        socket.emit("task:create", {
                          title: file.name,
                          priority: "Medium",
                          category: "Feature",
                          column: col.id,
                          attachments: [{ name: file.name, url, type: file.type }],
                        });
                      }
                    });
                  };
                  fileInput.click();
                }}
                data-testid={`upload-column-${col.id}`}
              >
                Upload file to {col.title}
              </button>
            </DroppableColumn>
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="task-card drag-overlay">
              {tasks.find((t) => t.id === activeId)?.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
