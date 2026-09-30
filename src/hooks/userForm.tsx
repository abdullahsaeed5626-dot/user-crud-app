import React, { useState } from "react";

interface Props {
  onAddUser: (name: string) => void;
  isDarkMode?: boolean;
}

export default function UserForm({ onAddUser, isDarkMode }: Props) {
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setValidationError("Please enter a valid user name.");
      return;
    }

    setValidationError("");
    onAddUser(trimmedName);
    setName("");
  };

  return (
    <div
      className={`card border-0 shadow-sm mb-4 ${
        isDarkMode ? "bg-dark text-white border-secondary" : "bg-white"
      }`}
    >
      <div className="card-body p-3 p-md-4">
        <h5
          className={`card-title mb-3 fw-bold text-uppercase fs-7 tracking-wide ${
            isDarkMode ? "text-light" : "text-muted"
          }`}
        >
          Add New User
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-2 align-items-start">
            <div className="col-12 col-sm-8 col-md-9">
              <input
                type="text"
                className={`form-control form-control-lg ${
                  isDarkMode
                    ? "bg-secondary text-white border-dark placeholder-white-50"
                    : ""
                } ${validationError ? "is-invalid" : ""}`}
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (validationError) setValidationError("");
                }}
              />
              {validationError && (
                <div className="invalid-feedback d-block mt-1">
                  {validationError}
                </div>
              )}
            </div>
            <div className="col-12 col-sm-4 col-md-3 d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2"
              >
                <span>+</span> Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
