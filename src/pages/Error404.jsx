import GoHome from '../components/GoHome';

function Error404() {
  return (
    <div className="error-404">
      <h1>404</h1>
      <h4>Page Not Found</h4>
      <p>The page you are looking for does not seems to exist.</p>
      <GoHome />
    </div>
  );
}
export default Error404;
