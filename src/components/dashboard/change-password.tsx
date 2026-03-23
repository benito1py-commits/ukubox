"use client";

import { useState } from "react";

export function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setMessage("Complete ambos campos");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Las claves no coinciden");
      return;
    }
    if (password.length < 6) {
      setMessage("La clave debe tener al menos 6 caracteres");
      return;
    }
    setMessage("Clave actualizada correctamente");
    setPassword("");
    setConfirmPassword("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="border border-border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Cambiar mi clave</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1.5">Clave Nueva</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-muted rounded-lg border-0 outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="••••••"
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5">Repita la Nueva clave</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="########"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("correctamente") ? "text-green-600" : "text-danger"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          Cambiar mi clave
        </button>
      </form>
    </div>
  );
}
