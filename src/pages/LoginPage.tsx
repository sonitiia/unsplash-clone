import { type FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../components/AuthForm/AuthForm.module.scss";
import { clearAuthError, loginUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/profile";
  const { status, error, user } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Welcome back.</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
        <button
          className={styles.submit}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className={styles.footer}>
        Don&apos;t have an account? <Link to="/register">Join</Link>
      </p>
    </div>
  );
}
