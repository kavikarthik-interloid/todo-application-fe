export const getTodos = async () => {
  try {
    const response = await fetch(
      "https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos?page=1&limit=20&sort_by=created_at&sort_order=desc",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      },
    );
    const listData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "failed to get Data",
      };
    }
    return listData;
  } catch (error) {
    console.log(error, "error");
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await fetch(
      "https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(todoData),
      },
    );
    const createData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "failed to get Data",
      };
    }
    return createData;
  } catch (error) {
    console.log(error, "error");
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(
      `https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(todoData),
      },
    );
    const updateTodo = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "failed to get Data",
      };
    }
    return updateTodo;
  } catch (error) {
    console.log(error, "error");
  }
};

export const DeleteTodo = async (id) => {
  try {
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
    const DeleteTodo = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "failed to get Data",
      };
    }
    return DeleteTodo;
  } catch (error) {
    console.log(error, "error");
  }
};

export const CompleteTodo = async (id, todoData) => {
  try {
    const response = await fetch(
      `https://cavity-pasture-purely.ngrok-free.dev/api/v1/todos/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(todoData),
      },
    );
    const CompleteTodo = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "failed to get Data",
      };
    }
    return CompleteTodo;
  } catch (error) {
    console.log(error, "error");
  }
};
