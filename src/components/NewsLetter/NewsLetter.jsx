import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineHandRaised } from "react-icons/hi2";
import toast from "react-hot-toast";
const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank your subscribing our newsletter");
    const form = e.target;
    form.reset();
  };
  return (
    <div className="relative isolate overflow-hidden bg-base-100 py-16 sm:py-24 lg:py-32 border-2 border-primary  border-dotted rounded-2xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <form className="max-w-xl lg:max-w-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-base-content">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-base-content/60">
              Stay informed with our latest news updates and exclusive content delivered straight to
              your inbox. Get breaking news alerts and in-depth analysis of trending stories.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 -border-offset-1 placeholder:text-gray-500 focus:border focus:-border-offset-2 focus:border-primary sm:text-sm/6 border border-gray-300"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </div>
          </form>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/50 p-2 ring-1 ring-gray-200">
                <LuCalendarDays aria-hidden="true" className="size-6 text-base-content/60" />
              </div>
              <dt className="mt-4 text-base font-semibold text-base-content/80">Weekly articles</dt>
              <dd className="mt-2 text-sm sm:text-base/7 text-base-content/60">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis
                commodo amet.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/50 p-2 ring-1 ring-gray-200">
                <HiOutlineHandRaised aria-hidden="true" className="size-6 text-base-content/60" />
              </div>
              <dt className="mt-4 text-base font-semibold text-base-content/80">No spam</dt>
              <dd className="mt-2 text-sm sm:text-base/7 text-base-content/60">
                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate
                incididunt anim.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#FB2C36] to-[#e42a34] opacity-20"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
