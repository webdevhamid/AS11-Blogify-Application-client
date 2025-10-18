import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { handleSignIn, user: currentUser, setUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      setLoading(false);
      navigate(location?.state ? location?.state : "/");
      console.log(user);
      toast.success(`Logged In Successfully!`);
    } catch (err) {
      setLoading(false);
      toast.error(err.code);
    }
  };
  return (
    <div>
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleLogin}>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" name="email" required />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                required
              />
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
