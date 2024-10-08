import { useEffect, useState } from "react";
import ParallaxSection from "../../Shared/Parallax";

const Dining = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/dining.json")
      .then((res) => res.json())
      .then((data) => setData(data.menu));
  }, []);
  console.log(data);

  const isEven = (id) => {
    return id % 2 == 0;
  };

  return (
    <section className="p-2">
      <ParallaxSection
        backgroundImage={
          "https://th.bing.com/th/id/R.19ef43a4b5c961a1f2d3467a7b48ef6d?rik=u39t2YqhRcL39A&pid=ImgRaw&r=0"
        }
      />
      <div className="max-w-screen-3xl text-center mt-6">
        <h1 className="text-base"> Dining at Safa Residency </h1>
        <p className="line"></p>
        <h1 className="text-xl md:text-3xl mb-6">
          Enjoy food and drinks at Safa Residency
        </h1>
        <div className="flex flex-wrap my-4 gap-3">
          {data.map((item, index) => (
            <div className="container mx-auto space-y-12" key={index}>
              <div
                className={`flex flex-col overflow-hidden rounded-md shadow-sm  ${
                  isEven(index) ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <img 
                  src={item?.image}
                  alt=""
                  className="max-h-80 animateZoom dark:bg-gray-500 group relative object-cover overflow-hidden hover:transition duration-300 ease-in-out hover:scale-105 lg:w-1/2"
                />

                <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50 text-start text-sm md:text-base">
                  <div className="md:flex justify-between">
                    <div>
                      <div className="md:flex justify-between">
                        <h3 className="text-xl md:text-2xl "> {item?.name}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="mb-2 p-2  flex-wrap rounded-lg mr-4 lg:mr-6 ">
                    {" "}
                    {item?.description}{" "}
                  </p>
                  <div className="flex gap-5">
                    <span className="mb-2 p-2  first-line:rounded-lg mr-4 lg:mr-6">
                      {" "}
                      {item?.date}{" "}
                    </span>
                    <span className="mb-2 p-2  first-line:rounded-lg mr-4 lg:mr-6">
                      {" "}
                      {item?.time}{" "}
                    </span>
                  </div>

                  {/* <NavLink to={`/details/${_id}`}>
                                        <Button size="lg" className="md:w-1/3 bg-primary border border-primary test-white">View Details
                                        </Button>
                                    </NavLink> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dining;
