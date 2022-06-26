import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="error-404">
      <h1>404</h1>
      <h4>Page Not Found</h4>
      <p>The page you are looking for does not seems to exist.</p>
      <Link className="btn" to="/">
        Go to Home
      </Link>
    </div>
  );
}
export default Error404;
