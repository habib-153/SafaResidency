import ParallaxSection from "../../Shared/Parallax";


const Event = () => {
    return (
        <div>
            <ParallaxSection backgroundImage={'https://th.bing.com/th/id/R.124cb862812ee486fa646d39df61624b?rik=z4h1pFITurWx1g&pid=ImgRaw&r=0'} />
            <div className="max-w-screen-3xl text-center my-4 md:mt-6">
                <h1>Events</h1>
                <p className="line"></p>
                <h1 className="text-3xl">
                    Start Planning Your Meetings or Events Here
                </h1>
                <p className="text-base my-3">
                    Tell us about your event, and we&apos;ll plan it together
                </p>

                <div className="flex flex-col md:flex-row  justify-center gap-6">
                    <div>
                        <p className="line max-w-48"></p>
                        <p className="text-3xl">
                            1000 SQ MT
                        </p>
                        <p>
                            Event Space
                        </p>
                    </div>
                    <div>
                        <p className="line max-w-48"></p>
                        <p className="text-3xl">
                            50
                        </p>
                        <p>
                            Capacity Space
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Event;