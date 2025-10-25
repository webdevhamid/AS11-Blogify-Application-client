import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";

const MyBlogs = () => {
  return (
    <div className="py-10">
      <PageTitle title={"My Blogs"} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Post Title</th>
              <th>Published At</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>
                <div className="flex gap-2">
                  <Link className="btn btn-xs btn-primary">Edit</Link>
                  <Link className="btn btn-xs btn-primary">Delete</Link>
                  <Link className="btn btn-xs btn-primary">View</Link>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBlogs;
