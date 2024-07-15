import React, { useState, useEffect } from "react";
import {
  databases,
  account,
  ID,
  Permission,
  Role,
  Query,
} from "../appwriteConfig";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        try {
          const response = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            [Query.equal("userId", user.$id)]
          );
          setTodos(response.documents);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };

      fetchTodos();
    }
  }, [user]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        ID.unique(),
        { task: newTodo, completed: false, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      setTodos([...todos, response]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo! " + error.message);
    }
  };

  const toggleTodo = async (todoId, completed) => {
    try {
      const response = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        todoId,
        { completed: !completed }
      );
      setTodos(
        todos.map((todo) => (todo.$id === response.$id ? response : todo))
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        todoId
      );
      setTodos(todos.filter((todo) => todo.$id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <div className="todo">
        <h2>Todo List</h2>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.$id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.$id, todo.completed)}
              />
              {todo.task}
              <button onClick={() => deleteTodo(todo.$id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
