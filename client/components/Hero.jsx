'use client';

const Hero = () => (
    <section className="sm:px-12 xs:px-4 px-8 sm:pt-16 xs:pt-8 pt-12 pb-4 ">
        <div className="2xl:max-w-[1280px] w-full flex flex-col flex-wrap">            
            <h1 className="text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
            Wikifoodia
            </h1>
            <p className="font-normal sm:text-[18px] md:text-[24px]">
            Upload an image of a dish that you want to know about and <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer font-bold">Foodia</span> will bring the details for you
            </p>
        </div>
    </section>
);

export default Hero;