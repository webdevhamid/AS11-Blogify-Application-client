import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";

const Wishlist = () => {
  return (
    <div className="py-10">
      {/* Page Title */}
      <PageTitle title={"My Wishlist"} />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-sm md:table-md">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Post Title</th>
              <th className="hidden sm:block">Description</th>
              <th>Author</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td className="hidden sm:block">Quality Control Specialist</td>
              <td>Hamid</td>
              <td>Tech</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Details</Link>
                  <Link className="btn btn-xs btn-primary">Remove Wishlist</Link>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td className="hidden sm:block">Quality Control Specialist</td>
              <td>Hamid</td>
              <td>Tech</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Details</Link>
                  <Link className="btn btn-xs btn-primary">Remove Wishlist</Link>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td className="hidden sm:block">Quality Control Specialist</td>
              <td>Hamid</td>
              <td>Tech</td>
              <td>
                <div className="flex-col flex md:flex-row gap-2">
                  <Link className="btn btn-xs btn-primary">Details</Link>
                  <Link className="btn btn-xs btn-primary">Remove Wishlist</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
