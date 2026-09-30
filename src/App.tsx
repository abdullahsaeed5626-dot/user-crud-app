import { useState, useEffect } from "react";
import useUsers from "./hooks/useUsers";
import type { User } from "./services/user-service";
import userService from "./services/user-service";
import UserForm from "./hooks/userForm";

const LOCAL_STORAGE_USERS_KEY = "persisted_users";
const LOCAL_STORAGE_FAVS_KEY = "persisted_favorites";
const LOCAL_STORAGE_THEME_KEY = "app_theme";
const LOCAL_STORAGE_DELETED_KEY = "persisted_deleted_ids";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  const [theme, setTheme] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as "light" | "dark") ||
      "light",
  );

  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavs = localStorage.getItem(LOCAL_STORAGE_FAVS_KEY);
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Sync users state with localStorage whenever users change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleFavorite = (userId: number) => {
    setFavorites((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const addUser = (userName: string) => {
    const localId = Date.now();
    const newUser = { id: localId, name: userName };

    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);

    userService.create({ id: 0, name: userName }).catch((err) => {
      setError(err.message || "Failed to create user on server.");
    });
  };

  const deleteUser = (userToDelete: User) => {
    // 1. Remove user from React state immediately
    const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
    setUsers(updatedUsers);

    // 2. Persist updated user list to localStorage
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedUsers));

    // 3. Track deleted ID in localStorage so mock API never brings it back
    const deletedIds: number[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_DELETED_KEY) || "[]",
    );
    if (!deletedIds.includes(userToDelete.id)) {
      localStorage.setItem(
        LOCAL_STORAGE_DELETED_KEY,
        JSON.stringify([...deletedIds, userToDelete.id]),
      );
    }

    // 4. Remove from favorites if present
    setFavorites((prev) => prev.filter((id) => id !== userToDelete.id));

    // 5. Fire fake DELETE request to JSONPlaceholder if it's an original API user (1-10)
    if (userToDelete.id >= 1 && userToDelete.id <= 10) {
      userService.delete(userToDelete.id).catch(() => {
        // Silently catch so local delete stays intact
      });
    }
  };

  const updateUser = (userToUpdate: User) => {
    const updatedUsers = users.map((u) =>
      u.id === userToUpdate.id ? { ...u, name: u.name + " (Updated)" } : u,
    );

    setUsers(updatedUsers);

    if (userToUpdate.id >= 1 && userToUpdate.id <= 10) {
      userService
        .update({ ...userToUpdate, name: userToUpdate.name + " (Updated)" })
        .catch(() => {
          // Silently catch so local update stays intact
        });
    }
  };

  const favoriteUsers = users.filter((u) => favorites.includes(u.id));
  const displayedUsers = activeTab === "all" ? users : favoriteUsers;
  const isDarkMode = theme === "dark";

  return (
    <div
      className="min-vh-100 d-flex flex-column transition-all"
      style={{
        backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
        color: isDarkMode ? "#f8fafc" : "#0f172a",
      }}
    >
      <header
        className={`py-3 px-4 shadow-sm border-bottom ${
          isDarkMode ? "bg-dark border-secondary" : "bg-white border-light"
        }`}
      >
        <div
          className="container-fluid max-width-lg d-flex align-items-center justify-content-between p-0"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="h4 mb-0 fw-bold">User Directory</h1>

          <div className="d-flex align-items-center gap-2">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === "all"
                    ? isDarkMode
                      ? "btn-light fw-semibold"
                      : "btn-dark fw-semibold"
                    : isDarkMode
                      ? "btn-outline-light"
                      : "btn-outline-secondary"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All ({users.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  activeTab === "favorites"
                    ? isDarkMode
                      ? "btn-light fw-semibold"
                      : "btn-dark fw-semibold"
                    : isDarkMode
                      ? "btn-outline-light"
                      : "btn-outline-secondary"
                }`}
                onClick={() => setActiveTab("favorites")}
              >
                ⭐ Favorites ({favoriteUsers.length})
              </button>
            </div>

            <button
              className={`btn btn-sm ${
                isDarkMode ? "btn-outline-warning" : "btn-outline-dark"
              }`}
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="p-3 p-md-4 flex-grow-1">
        <div className="container-fluid" style={{ maxWidth: "800px" }}>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show shadow-sm"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}

          {activeTab === "all" && (
            <UserForm onAddUser={addUser} isDarkMode={isDarkMode} />
          )}

          <div
            className={`card border-0 shadow-sm ${
              isDarkMode ? "bg-dark text-white" : "bg-white"
            }`}
          >
            <div
              className={`card-header py-3 border-0 d-flex justify-content-between align-items-center ${
                isDarkMode ? "bg-dark" : "bg-white"
              }`}
            >
              <h5
                className={`mb-0 fw-bold text-uppercase fs-7 tracking-wide ${
                  isDarkMode ? "text-light" : "text-muted"
                }`}
              >
                {activeTab === "all" ? "Active Records" : "Favorite Users"}
              </h5>
              {isLoading && (
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>

            <div className="card-body p-0">
              {isLoading && users.length === 0 ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary my-2"
                    role="status"
                  ></div>
                  <p className="text-muted mb-0">Fetching records...</p>
                </div>
              ) : displayedUsers.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p className="mb-0">
                    {activeTab === "all"
                      ? "No users found. Add one above!"
                      : "No favorite users added yet."}
                  </p>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {displayedUsers.map((user) => {
                    const isFav = favorites.includes(user.id);
                    return (
                      <li
                        key={user.id}
                        className={`list-group-item p-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 ${
                          isDarkMode
                            ? "bg-dark text-white border-secondary"
                            : ""
                        }`}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                              isDarkMode
                                ? "bg-secondary text-white"
                                : "bg-secondary-subtle text-dark"
                            }`}
                            style={{
                              width: "40px",
                              height: "40px",
                              flexShrink: 0,
                            }}
                          >
                            {user.name.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <span className="fw-semibold d-block">
                              {user.name}
                            </span>
                            <small
                              className={
                                isDarkMode ? "text-light-50" : "text-muted"
                              }
                            >
                              ID: #{user.id}
                            </small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 align-self-end align-self-sm-center">
                          <button
                            className={`btn btn-sm d-flex align-items-center gap-1 ${
                              isFav
                                ? "btn-warning text-dark fw-semibold"
                                : isDarkMode
                                  ? "btn-outline-light"
                                  : "btn-outline-warning text-dark"
                            }`}
                            onClick={() => toggleFavorite(user.id)}
                            title={
                              isFav
                                ? "Remove from Favorites"
                                : "Add to Favorites"
                            }
                          >
                            {isFav ? "★ Favorite" : "☆ Favorite"}
                          </button>
                          <button
                            className={`btn btn-sm d-flex align-items-center gap-1 ${
                              isDarkMode
                                ? "btn-outline-light"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() => updateUser(user)}
                          >
                            ✏️ Update
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            onClick={() => deleteUser(user)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
