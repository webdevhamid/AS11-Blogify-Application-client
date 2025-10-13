import { Link } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Register = () => {
  return (
    <div>
      <Breadcrumbs currentPage={"Register"} />
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <label className="label">First Name</label>
              <input type="text" className="input" placeholder="First Name" />
              <label className="label">Last Name</label>
              <input type="text" className="input" placeholder="Last Name" />
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />

              <button className="btn btn-neutral mt-4">Login</button>
              {/* Registration link */}
              <div className="flex gap-1.5 mt-3">
                <span>Already have an account?</span>
                <Link to={"/login"} className="hover:font-medium transition">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
