import { type FormEvent, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { logoutUser } from "../../store/authSlice";
import { setSearchQuery } from "../../store/gallerySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./Header.module.scss";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const storedQuery = useAppSelector((s) => s.gallery.searchQuery);
  const urlQuery = searchParams.get("q") ?? "";
  const [input, setInput] = useState(() => urlQuery || storedQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const profileHref = user ? "/profile?page=1" : "/login";

  useEffect(() => {
    const onDocumentClick = () => setMenuOpen(false);
    document.addEventListener("click", onDocumentClick);

    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    dispatch(setSearchQuery(trimmed));
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}&page=1`);
    } else {
      navigate("/?page=1");
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      setMenuOpen((open) => !open);
      return;
    }
    navigate("/login");
  };

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logoutUser());
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/?page=1" className={styles.logo}>
          Unsplash
        </Link>
        <search className={styles.searchForm}>
          <form onSubmit={onSubmit}>
            <label htmlFor="search-input" className="sr-only">
              Search photos
            </label>
            <div className={styles.searchField}>
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Search</title>
                <path
                  fill="currentColor"
                  d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8.707 13.293-3.757-3.757a1 1 0 0 0-1.414 1.414l3.757 3.757a1 1 0 0 0 1.414-1.414Z"
                />
              </svg>
              <input
                id="search-input"
                type="search"
                className={styles.searchInput}
                placeholder="Search photos and illustrations"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
            </div>
          </form>
        </search>
        <nav className={styles.authNav} aria-label="Account">
          {user ? (
            <>
              <Link to="/profile?page=1" className={styles.authLink}>
                Collection
              </Link>
              <span className={styles.userName}>
                {`${user.firstName} ${user.lastName}`.trim()}
              </span>
            </>
          ) : null}

          <div className={styles.profileMenuWrap}>
            <Link
              to={profileHref}
              onClick={handleMenuClick}
              className={
                isAuthPage
                  ? `${styles.profileButton} ${styles.profileButtonActive}`
                  : styles.profileButton
              }
              aria-label={user ? "Open profile menu" : "Log in"}
              aria-expanded={user ? menuOpen : undefined}
            >
              <svg
                className={styles.profileIcon}
                viewBox="0 0 64 64"
                aria-hidden="true"
                focusable="false"
              >
                <title>Profile</title>
                <g
                  transform="translate(0,64) scale(0.1,-0.1)"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M260 629 c-38 -15 -88 -68 -101 -107 -40 -120 83 -249 203 -213 82 25 139 115 124 195 -8 44 -59 104 -103 122 -37 16 -87 17 -123 3z" />
                  <path d="M160 228 c-69 -42 -111 -106 -113 -174 l-2 -49 275 0 275 0 -2 49 c-2 68 -44 132 -113 174 -52 31 -58 32 -160 32 -102 0 -108 -1 -160 -32z" />
                </g>
              </svg>
            </Link>

            {user && menuOpen ? (
              <div
                className={styles.profileMenu}
                role="menu"
                aria-label="Profile menu"
              >
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
