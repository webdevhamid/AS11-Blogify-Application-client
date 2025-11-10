import { FaEdit } from "react-icons/fa";
import "./AddBlog.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import PageTitle from "../../components/PageTitle/PageTitle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddBlog = () => {
  const [slugValue, setSlugValue] = useState(null);
  const [readOnlyValue, setReadOnlyValue] = useState(true);
  const [featureBannerPost, setFeatureBannerPost] = useState("NO");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  // Post handler
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      // Add a new blog
      await axiosSecure.post(`/add-blog/${user?.email}`, formData);
    },
    onSuccess: async (data) => {
      console.log(data);
      // Redirect the user to the "My Blogs" page
      navigate("/my-blogs");

      // Return toast
      toast.success("Post successfully added 🎉");

      // Invalidating queries
      await queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Form submit handler
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const slug = form.slug.value;
    const coverImage = form.coverImage.value;
    const category = form.category.value;
    const excerpt = form.shortDescription.value;
    const description = form.description.value;
    const breakingNews = form.breakingNews.value === "YES" ? true : false;
    const featured = form.featurePost.value === "YES" ? true : false;
    const featuredBanner = form.featureBanner.value === "YES" ? true : false;
    const featuredOrder = featuredBanner !== true ? null : parseInt(form.bannerOrder.value);
    const tags = form.tags.value.trim("").split(", ");
    const authorName = user?.displayName;
    const authorEmail = user?.email;
    const userAvatar = user?.photoURL;
    const author = {
      name: authorName,
      avatar: userAvatar,
      email: authorEmail,
    };
    const publishedAt = new Date().toISOString();

    const postData = {
      title,
      slug,
      coverImage,
      category,
      excerpt,
      description,
      breakingNews,
      featured,
      featuredBanner,
      featuredOrder,
      tags,
      author,
      publishedAt,
    };
    try {
      // Add a new blog
      await mutateAsync(postData);
      // Remove form inputs
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10">
      <PageTitle title={"Add New Post"} />
      <div className="my-6 bg-gradient-to-b from-base-300 shadow md:w-2/3 mx-auto lg:p-5 md:p-3 p-2">
        <form className="fieldset add-blog" onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              {/* Title */}
              <label className="label">Title</label>
              <input
                onChange={(e) => handleSlug(e)}
                type="text"
                className="input"
                placeholder="Enter your post title"
                name="title"
                required
                autoComplete="on"
              />
            </div>
            {/* Post Slug */}
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
            {/* Cover Image */}
            <div className="flex flex-col">
              <label className="label">Cover Image</label>
              <input
                type="url"
                className="input"
                placeholder="Cover Image URL"
                name="coverImage"
                required
              />
            </div>
            {/* Category */}
            <div className="flex flex-col">
              <label className="label">Category</label>
              <select defaultValue="" required name="category" className="select w-full">
                <option value="" disabled>
                  Choose a category
                </option>
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
            {/* Short Description */}
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
            {/* Description */}
            <div className="col-span-2 flex flex-col">
              <label className="label">Description</label>
              <textarea
                className="textarea w-full h-[250px] max-h-[250px]"
                placeholder="Description"
                name="description"
                required
              ></textarea>
            </div>
            {/* Breaking News Option */}
            <div className="flex flex-col">
              <div
                className="tooltip"
                data-tip="This post will be displayed in the breaking news section"
              >
                <label className="label cursor-help">Make It Breaking News? (optional)</label>
              </div>
              <select defaultValue="NO" className="select w-full" name="breakingNews">
                <option>Choose option</option>
                <option>YES</option>
                <option>NO</option>
              </select>
            </div>
            {/* Feature post option */}
            <div className="flex flex-col">
              <div className="tooltip" data-tip="This post will be displayed in the featured page">
                <label className="label cursor-help">Feature Post (optional)</label>
              </div>
              <select defaultValue="NO" className="select w-full" name="featurePost">
                <option>Choose option</option>
                <option>YES</option>
                <option>NO</option>
              </select>
            </div>
            {/* Feature Post on Banner option  */}
            <div className="flex flex-col">
              <div className="tooltip" data-tip="This post will be displayed on home banner">
                <label className="label cursor-help">Feature It on Home Banner? (optional)</label>
              </div>
              <select
                defaultValue="NO"
                className="select w-full"
                onChange={(e) => setFeatureBannerPost(e.target.value)}
                name="featureBanner"
              >
                <option>Choose option</option>
                <option value={"YES"}>YES</option>
                <option value={"NO"}>NO</option>
              </select>
            </div>
            {/* Banner Order */}
            <div className={`flex flex-col ${featureBannerPost !== "YES" && "hidden"}`}>
              <div className="tooltip" data-tip="Set the banner order">
                <label className="label cursor-help">Banner Order</label>
              </div>

              <select
                disabled={featureBannerPost === "NO" && true}
                className={`select w-full`}
                name="bannerOrder"
                required
              >
                <option>Choose option</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            {/* Tags */}
            <div className="flex flex-col">
              <label className="label">Tags. Ex: tech, business</label>
              <input
                type="text"
                className={`input`}
                placeholder="Comma separated tags"
                name="tags"
                required
              />
            </div>
            {/* Author Name */}
            <div className="flex flex-col">
              <label className="label">Author Name</label>
              <input
                autoComplete="off"
                type="text"
                className="input cursor-not-allowed"
                defaultValue={user?.displayName}
                readOnly
                name="authorName"
                required
              />
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label className="label">Email</label>
              <input
                autoComplete="off"
                type="email"
                className="input cursor-not-allowed"
                defaultValue={user?.email}
                readOnly
                name="authorEmail"
                required
              />
            </div>
          </div>
          {/* Send button */}
          <div className="block">
            <button
              className="btn btn-neutral mt-4 w-full bg-primary hover:bg-red-600 transition text-white border-none outline-0"
              type="submit"
            >
              {isPending ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
