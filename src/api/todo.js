import { supabase } from "../lib/supabase";

export const getTodos = async () => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
};

export const createTodo = async (todoData) => {
  const { data, error } = await supabase
    .from("todos")
    .insert(todoData)
    .select();

  if (error) {
    throw error;
  }
  return data;
};

export const updateTodo = async (id, todoData) => {
  const { id:cid, ...updatedData} = todoData
  const { data, error } = await supabase
    .from("todos")
    .update(updatedData)
    .eq("id", id)
    .select()
    .order("id", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const deleteTodo = async (id) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export const updateTodoStatus = async (id, todoData) => {
  const { data, error } = await supabase
    .from("todos")
    .update(todoData)
    .eq("id", id)
    .select();
  if (error) {
    throw error;
  }
  return data;
};
