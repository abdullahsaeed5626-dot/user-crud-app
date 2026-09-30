import { useEffect, useState } from "react";
import userService, { type User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const LOCAL_STORAGE_USERS_KEY = "persisted_users";
const LOCAL_STORAGE_DELETED_KEY = "persisted_deleted_ids";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (e) {
        console.error("Failed to parse local storage users", e);
      }
    }
    return [];
  });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsers && JSON.parse(savedUsers).length > 0) {
      return;
    }

    setLoading(true);
    const { request, cancel } = userService.getAll<User>();

    request
      .then((res) => {
        const deletedIds: number[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_DELETED_KEY) || "[]"
        );
        const filteredData = res.data.filter((u) => !deletedIds.includes(u.id));

        setUsers(filteredData);
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(filteredData));
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    
    return () => {
      cancel();
    };
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;