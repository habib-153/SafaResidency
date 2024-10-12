import { FcQuestions } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-tailwind/react'
const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto text-center">
          <FcQuestions className="mx-auto mb-4 w-24 h-24 text-gray-400" />

          <h1 className="mb-3 text-4xl font-bold text-gray-800 dark:text-gray-200">
            Something Went Wrong
          </h1>

          <p className="mb-6 text-lg text-gray-500 dark:text-gray-400">
            Oops! The page you&apos;re looking for seems to have vanished into
            thin air.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="font-semibold"
              color="black"
              size="lg"
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Need assistance?{" "}
            <Button
              className="font-medium"
              color="primary"
              variant="light"
              onClick={() => router.push("/contact")}
            >
              Contact Support
            </Button>
          </p>
        </div> */}
      </div>

      {/* Optional: Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary-200 to-primary-500 opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
// const Error = () => {
//     return (
//         <div className="pl-14">
//             <h2 className="text-3xl">
//                 Sorry, we can&apos;t find the page you requested.
//             </h2>
//             <p>
//                 The page you are looking for might be removed or  no longer available in Safa Residency
//             </p>
//         </div>
//     );
// };

// export default Error;
