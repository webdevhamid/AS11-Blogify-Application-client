import { Link } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Login = () => {
  return (
    <div>
      <Breadcrumbs currentPage={"Login"} />
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
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
