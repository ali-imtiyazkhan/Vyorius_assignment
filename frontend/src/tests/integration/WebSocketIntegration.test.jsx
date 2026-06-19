import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import KanbanBoard from "../../components/KanbanBoard";

const mockSocket = {
  on: vi.fn(),
  emit: vi.fn(),
  disconnect: vi.fn(),
};

vi.mock("socket.io-client", () => ({
  io: () => mockSocket,
}));

function triggerSocketEvent(event, data) {
  const handler = mockSocket.on.mock.calls.find(([e]) => e === event)?.[1];
  if (handler) act(() => handler(data));
}

function setupBoard() {
  render(<KanbanBoard />);
  triggerSocketEvent("connect");
  triggerSocketEvent("sync:tasks", []);
}

beforeEach(() => {
  vi.clearAllMocks();
});

test("loads tasks from server on sync:tasks", async () => {
  render(<KanbanBoard />);
  triggerSocketEvent("connect");
  triggerSocketEvent("sync:tasks", [
    { id: 1, title: "Task A", column: "todo", priority: "High", category: "Bug", attachments: [] },
    { id: 2, title: "Task B", column: "done", priority: "Low", category: "Feature", attachments: [] },
  ]);
  await waitFor(() => {
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });
});

test("adds task on task:created event", async () => {
  setupBoard();
  triggerSocketEvent("task:created", {
    id: 10,
    title: "New Task",
    column: "todo",
    priority: "Medium",
    category: "Feature",
    attachments: [],
  });
  await waitFor(() => {
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});

test("moves task on task:moved event", async () => {
  render(<KanbanBoard />);
  triggerSocketEvent("connect");
  triggerSocketEvent("sync:tasks", [
    { id: 5, title: "Movable", column: "todo", priority: "Low", category: "Enhancement", attachments: [] },
  ]);
  await waitFor(() => expect(screen.getByText("Movable")).toBeInTheDocument());
  triggerSocketEvent("task:moved", { id: 5, column: "done" });
  await waitFor(() => {
    const doneCol = screen.getByTestId("column-done-tasks");
    expect(doneCol.textContent).toContain("Movable");
  });
});

test("removes task on task:deleted event", async () => {
  render(<KanbanBoard />);
  triggerSocketEvent("connect");
  triggerSocketEvent("sync:tasks", [
    { id: 7, title: "Delete Me", column: "todo", priority: "High", category: "Bug", attachments: [] },
  ]);
  await waitFor(() => expect(screen.getByText("Delete Me")).toBeInTheDocument());
  triggerSocketEvent("task:deleted", 7);
  await waitFor(() => {
    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });
});

test("updates task on task:updated event", async () => {
  render(<KanbanBoard />);
  triggerSocketEvent("connect");
  triggerSocketEvent("sync:tasks", [
    { id: 3, title: "Update Me", column: "todo", priority: "Low", category: "Feature", attachments: [] },
  ]);
  await waitFor(() => expect(screen.getByText("Update Me")).toBeInTheDocument());
  triggerSocketEvent("task:updated", { id: 3, title: "Updated Title", priority: "High", category: "Bug" });
  await waitFor(() => {
    expect(screen.getByText("Updated Title")).toBeInTheDocument();
    expect(screen.queryByText("Update Me")).not.toBeInTheDocument();
  });
});

test("emits task:create on add button click", async () => {
  setupBoard();
  await waitFor(() => expect(screen.getByTestId("add-task-btn")).toBeInTheDocument());
  const input = screen.getByTestId("task-title-input");
  const addBtn = screen.getByTestId("add-task-btn");
  fireEvent.change(input, { target: { value: "My Task" } });
  fireEvent.click(addBtn);
  expect(mockSocket.emit).toHaveBeenCalledWith("task:create", expect.objectContaining({ title: "My Task" }));
});
