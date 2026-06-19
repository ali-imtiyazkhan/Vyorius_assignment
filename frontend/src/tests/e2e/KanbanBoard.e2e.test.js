import { test, expect } from "@playwright/test";

test("User can add a task and see it on the board", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Real-time Kanban Board")).toBeVisible();
  const input = page.getByTestId("task-title-input");
  await input.fill("E2E Task");
  await page.getByTestId("add-task-btn").click();
  await expect(page.getByText("E2E Task")).toBeVisible();
});

test("User can see all three columns", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByTestId("column-todo")).toBeVisible();
  await expect(page.getByTestId("column-in-progress")).toBeVisible();
  await expect(page.getByTestId("column-done")).toBeVisible();
});

test("User can select priority and category when adding task", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const prioritySelect = page.getByTestId("task-priority-select");
  const categorySelect = page.getByTestId("task-category-select");
  await prioritySelect.selectOption("High");
  await categorySelect.selectOption("Bug");
  await expect(prioritySelect).toHaveValue("High");
  await expect(categorySelect).toHaveValue("Bug");
});

test("Progress charts are displayed", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByTestId("bar-chart")).toBeVisible();
  await expect(page.getByTestId("pie-chart")).toBeVisible();
});

test("Delete button exists on tasks", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const input = page.getByTestId("task-title-input");
  await input.fill("Deletable Task");
  await page.getByTestId("add-task-btn").click();
  await expect(page.getByText("Deletable Task")).toBeVisible();
  const deleteBtn = page.locator(".delete-btn").first();
  await expect(deleteBtn).toBeVisible();
});
