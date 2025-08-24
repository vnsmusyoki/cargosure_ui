import { Outlet,Link } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Default Layout</h1>
        <Outlet />
      </main>
    </>
  );
}