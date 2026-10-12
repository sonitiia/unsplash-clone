import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/AuthForm/AuthForm.module.scss";
import { clearAuthError, registerUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useAppSelector((s) => s.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());

    const result = await dispatch(
      registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password,
      }),
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/profile");
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Join Unsplash</h1>
      <p className={styles.subtitle}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <div className={`${styles.field} ${styles.fieldHalf}`}>
            <label className={styles.label} htmlFor="register-first-name">
              First name
            </label>
            <input
              id="register-first-name"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
          </div>
          <div className={`${styles.field} ${styles.fieldHalf}`}>
            <label className={styles.label} htmlFor="register-last-name">
              Last name
            </label>
            <input
              id="register-last-name"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
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
          {status === "loading" ? "Creating account…" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
