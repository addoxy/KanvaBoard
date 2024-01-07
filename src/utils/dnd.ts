import { Active, Over } from "@dnd-kit/core";

export function getColumn(
  columns: Column[],
  event: Active | Over,
  type: string
) {
  if (type === "Column") {
    return columns.find((column) => column.id === event.id);
  }
  if (type === "Task") {
    return columns.find((column) =>
      column.tasks.find((task) => task.id === event.id)
    );
  }
}

export function getActiveColumnIndex(columns: Column[], activeColumn: Column) {
  return columns.findIndex((column) => column.id === activeColumn.id);
}

export function getOverColumnIndex(columns: Column[], overColumn: Column) {
  return columns.findIndex((column) => column.id === overColumn.id);
}

export function getActiveTaskIndex(activeColumn: Column, active: Active) {
  return activeColumn.tasks.findIndex((task) => task.id === active.id);
}

export function getOverTaskIndex(overColumn: Column, over: Over) {
  return overColumn.tasks.findIndex((task) => task.id === over.id);
}
