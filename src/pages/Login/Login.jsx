import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { handleSignIn, user: currentUser, setUser, setLoading, handleGoogleSignIn } = useAuth();
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
      navigate(location?.state ? location?.state : "/");
    } catch (err) {
      setLoading(false);
      toast.error(err.code);
    }
  };

  // Google Sign-in handler
  const handleGoogle = async () => {
    const { user } = await handleGoogleSignIn();
    setUser(user);
    navigate(location?.state ? location?.state : "/");
    console.log(user);
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
              {/* Google */}
              <button
                className="btn bg-white text-black border-[#e5e5e5] mt-3"
                onClick={handleGoogle}
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
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
