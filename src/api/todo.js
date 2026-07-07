export const getTodo = async () => {
  const response = await fetch(
    "https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos?page=1&limit=20&sort_by=created_at&sort_order=desc",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const createTodo = async (todoData) => {
  const response = await fetch(
    "https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(todoData),
    },
  );

  if (!response.ok) {
    console.log("Status:", response.status);
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(
    `https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos/${id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
};

export const updateTodo = async (id, todoData) => {
  const response = await fetch(
    `https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(todoData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error("Failed to update todo");
  }

  return response.json();
};