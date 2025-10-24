import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import "./AddBlog.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AddBlog = () => {
  const [slugValue, setSlugValue] = useState(null);
  const [readOnlyValue, setReadOnlyValue] = useState(true);
  const [featureBannerPost, setFeatureBannerPost] = useState("NO");

  const { user } = useAuth();

  // Slug Handler
  const handleSlug = (e) => {
    const title = e.target.value;
    const slug = title.split(" ").join("-");
    setSlugValue(slug);
    setReadOnlyValue(true);
  };

  // Slug editing button handler
  const handleEditSlug = () => {
    setReadOnlyValue(false);
  };

  // Form submit handler
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="my-6 bg-gradient-to-b from-gray-100 shadow md:w-2/3 mx-auto lg:p-5 md:p-3 p-2">
      <h1 className="text-3xl text-center mb-3 font-medium">Add New Post</h1>
      <form className="fieldset add-blog" onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="label">Title</label>
            <input
              onChange={(e) => handleSlug(e)}
              type="text"
              className="input"
              placeholder="Enter your post title"
              name="blogTitle"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Slug</label>
            <div className="join">
              <input
                type="text"
                className={`input join-item ${!readOnlyValue ? "border-green-500" : ""}`}
                placeholder="Slug"
                disabled={readOnlyValue}
                name="slug"
                defaultValue={slugValue}
                onBlur={() => setReadOnlyValue(true)}
                required
              />
              <div className="tooltip" data-tip="Edit slug">
                <span className="btn join-item" onClick={handleEditSlug}>
                  <FaEdit className="text-2xl cursor-pointer" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="label">Cover Image</label>
            <input
              type="url"
              className="input"
              placeholder="Cover Image URL"
              name="photoURL"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Category</label>
            <select defaultValue="Choose a category" className="select w-full">
              <option>Choose a category</option>
              <option>Technology</option>
              <option>Travel</option>
              <option>Health & Wellness</option>
              <option>Business</option>
              <option>Food & Nutrition</option>
              <option>Finance</option>
              <option>Environment</option>
              <option>Productivity </option>
              <option>Lifestyle</option>
              <option>Education</option>
              <option>Lifestyle</option>
              <option>Generic</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label className="label">Short Description</label>
            <textarea
              className="textarea h-10"
              type="text"
              placeholder="Enter Short Description"
              name="shortDescription"
              required
            ></textarea>
          </div>
          <div className="col-span-2 flex flex-col">
            <label className="label">Description</label>
            <textarea
              className="textarea w-full h-[250px] max-h-[250px]"
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <div
              className="tooltip"
              data-tip="This post will be displayed in the breaking news section"
            >
              <label className="label cursor-help">Make It Breaking News? (optional)</label>
            </div>
            <select defaultValue="Pick a color" className="select w-full">
              <option>Choose option</option>
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
          <div className="tooltip" data-tip="This post will be displayed in the featured page">
            <div className="flex flex-col">
              <label className="label cursor-help">Feature Post (optional)</label>
              <select defaultValue="Pick a color" className="select w-full">
                <option>Choose option</option>
                <option>YES</option>
                <option>NO</option>
              </select>
            </div>
          </div>

          <div className="tooltip" data-tip="This post will be displayed on home banner">
            <div className="flex flex-col">
              <label className="label cursor-help">Feature It on Home Banner? (optional)</label>
              <select
                defaultValue="Pick a color"
                className="select w-full"
                onChange={(e) => setFeatureBannerPost(e.target.value)}
              >
                <option>Choose option</option>
                <option value={"YES"}>YES</option>
                <option value={"NO"}>NO</option>
              </select>
            </div>
          </div>

          <div className={`flex flex-col ${featureBannerPost !== "YES" && "hidden"}`}>
            <div className="tooltip" data-tip="Define the home banner order">
              <label className="label cursor-help">Banner Order (optional)</label>
            </div>

            <select
              defaultValue="Pick a color"
              disabled={featureBannerPost === "NO" && true}
              className={`select w-full`}
            >
              <option>Choose option</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="label">Tags. Ex: tech, business</label>
            <input
              type="text"
              className={`input`}
              placeholder="Comma separated tags"
              name="photoURL"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label">Author Name</label>
            <input
              autoComplete="off"
              type="text"
              className="input"
              defaultValue={user?.displayName}
              readOnly
              name="author_name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Email</label>
            <input
              autoComplete="off"
              type="email"
              className="input"
              defaultValue={user?.email}
              readOnly
              name="email"
              required
            />
          </div>
        </div>
        {/* Register button */}
        <div className="block">
          <button
            className="btn btn-neutral mt-4 w-full bg-red-500 hover:bg-red-600 transition text-white border-none outline-0"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
