import { Link } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { handleSignIn, user: currentUser, setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Check if the user logged in,
    if (currentUser) return;

    // Handle Login
    try {
      const { user } = await handleSignIn(email, password);
      setUser(user);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <Breadcrumbs currentPage={"Login"} />
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleLogin}>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" name="email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" name="password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              {/* Login Button */}
              <button className="btn btn-neutral mt-4" type="submit">
                Login
              </button>
              {/* Registration link */}
              <div className="flex gap-1.5 mt-3">
                <span>Don't have an account?</span>
                <Link to={"/register"} className="hover:font-medium transition">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
