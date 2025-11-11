import { Link, Navigate, useNavigate } from "react-router";
import useAuth from "./../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { handleSignUp, setUser, updateUserProfile, setLoading } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user && user?.email) return <Navigate to="/" />;

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Get all the input values
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photoURL.value;

    const validatePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!validatePassword.test(password))
      return toast.error(
        <p className="text-sm text-gray-600 mt-2">
          <strong>Password must include:</strong>
          <br />• Minimum <strong>6 characters</strong>
          <br />• At least <strong>one uppercase letter</strong>
          <br />• At least <strong>one number</strong>
          <br />• At least <strong>one special character</strong>
        </p>
      );

    // Register a new user
    try {
      const { user } = await handleSignUp(email, password);
      setUser(user);
      await updateUserProfile(firstName, lastName, photo);
      navigate("/");
      setLoading(false);
      toast.success("Account created successfully!");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      toast.error(err.code);
    }
  };

  return (
    <div>
      <div className="hero min-h-[calc(100vh-285px)]">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset" onSubmit={handleRegistration}>
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                name="firstName"
                required
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                name="lastName"
                required
              />
              <label className="label">Photo URL</label>
              <input
                type="url"
                className="input"
                placeholder="Photo URL"
                name="photoURL"
                required
              />
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
