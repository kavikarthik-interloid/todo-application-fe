import { BASE_URL, DEFAULT_HEADERS } from "../api/config";

export const getTodos = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/?page=1&limit=20&sort_by=created_at&sort_order=desc`,
      {
        method: "GET",
        headers: DEFAULT_HEADERS,
      },
    );
    const getResponse = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to get data",
      };
    }
    return getResponse;
  } catch (error) {
    console.log(error, "error");
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(todoData),
    });
    const createResponse = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to get data",
      };
    }
    return createResponse;
  } catch (error) {
    console.log(error, "error");
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(todoData),
    });
    const updateResponse = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to get data",
      };
    }
    return updateResponse;
  } catch (error) {
    console.log(error, "error");
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: DEFAULT_HEADERS,
    });
    const deleteResponse = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to get data",
      };
    }
    return deleteResponse;
  } catch (error) {
    console.log(error, "error");
  }
};

export const updateTodoStatus = async (id, todoData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: "PATCH",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(todoData),
    });
    const updateStatusResponse = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to get data",
      };
    }
    return updateStatusResponse;
  } catch (error) {
    console.log(error, "error");
  }
};
