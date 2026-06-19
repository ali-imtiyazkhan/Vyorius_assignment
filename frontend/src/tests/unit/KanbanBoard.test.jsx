import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import KanbanBoard from "../../components/KanbanBoard";

vi.mock("socket.io-client", () => {
  let socket;
  const createSocket = () => {
    const emit = vi.fn();
    const on = vi.fn((event, cb) => {
      if (event === "connect") setTimeout(() => cb(), 0);
      if (event === "sync:tasks") setTimeout(() => cb([]), 0);
    });
    const disconnect = vi.fn();
    socket = { on, emit, disconnect };
    return socket;
  };
  return { io: createSocket };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test("renders Kanban board with all three columns", async () => {
  render(<KanbanBoard />);
  await waitFor(() => {
    expect(screen.getByTestId("column-todo")).toBeInTheDocument();
    expect(screen.getByTestId("column-in-progress")).toBeInTheDocument();
    expect(screen.getByTestId("column-done")).toBeInTheDocument();
  });
});

test("shows loading state before connection", () => {
  render(<KanbanBoard />);
  expect(screen.getByText("Connecting to server...")).toBeInTheDocument();
});

test("has input and add button for creating tasks", async () => {
  render(<KanbanBoard />);
  await waitFor(() => {
    expect(screen.getByTestId("task-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-task-btn")).toBeInTheDocument();
  });
});

test("has priority and category dropdowns in add form", async () => {
  render(<KanbanBoard />);
  await waitFor(() => {
    expect(screen.getByTestId("task-priority-select")).toBeInTheDocument();
    expect(screen.getByTestId("task-category-select")).toBeInTheDocument();
  });
});

test("displays progress section with charts", async () => {
  render(<KanbanBoard />);
  await waitFor(() => {
    expect(screen.getByText(/Progress:/)).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });
});

test("allows typing a task title", async () => {
  render(<KanbanBoard />);
  await waitFor(() => {
    const input = screen.getByTestId("task-title-input");
    fireEvent.change(input, { target: { value: "Test Task" } });
    expect(input.value).toBe("Test Task");
  });
});
