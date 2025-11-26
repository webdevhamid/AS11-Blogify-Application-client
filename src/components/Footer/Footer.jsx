import { Link } from "react-router";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="bg-base-100">
      <div className="footer container mx-auto sm:footer-horizontal text-base-content p-10 py-20">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/add-blog" className="link link-hover">
            Add Blog
          </Link>
          <Link to="/all-blogs" className="link link-hover">
            All Blogs
          </Link>
          <Link to="/featured-blogs" className="link link-hover">
            Featured Blogs
          </Link>
          <Link to="/wishlist" className="link link-hover">
            Wishlists
          </Link>
          <Link to="/my-blogs" className="link link-hover">
            My Blogs
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="sm:w-80 w-full">
            <label>Enter your email address</label>
            <div className="join mt-2">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item focus:outline-0 focus:border-primary"
              />
              <button className="btn btn-primary shadow-none">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Footer;
