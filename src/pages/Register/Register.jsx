import { Link } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useAuth from "./../../hooks/useAuth";

const Register = () => {
  const { handleSignUp, setUser, updateUserProfile } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Get all the input values
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photoURL.value;

    // Register a new user
    try {
      const { user } = await handleSignUp(email, password);
      if (user !== null) {
        setUser(user);
        updateUserProfile(firstName, lastName, photo);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Breadcrumbs currentPage={"Register"} />
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleRegistration}>
              <label className="label">First Name</label>
              <input type="text" className="input" placeholder="First Name" name="firstName" />
              <label className="label">Last Name</label>
              <input type="text" className="input" placeholder="Last Name" name="lastName" />
              <label className="label">Photo URL</label>
              <input type="url" className="input" placeholder="Photo URL" name="photoURL" />
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" name="email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" name="password" />
              {/* Register button */}
              <button className="btn btn-neutral mt-4" type="submit">
                Register
              </button>
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
