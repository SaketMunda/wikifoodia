import Link from "next/link";
import styles from "../styles";

export default function Home() {
  return (
    <div className='bg-primary-black'>      
      <div className="container max-w-full sm:px-16 xs:px-8 px-12 sm:pt-16 xs:pt-8 pt-12 text-white">
        <div className="flex flex-col">
          <div id='title-description' className="basis-1/6">
            <span className="relative text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">Wikifoodia</span>
            <p className="font-normal text-[24px] text-white">Upload an image of a dish that you want to know about and <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer font-bold">Foodia</span> will predict the name of the dish</p> 
          </div>
          <div id='content' className="basis-10/12 grid grid-cols-5 gap-4">
            <div className='p-8 max-w-md bg-gray-800 rounded-xl shadow-lg items-start flex flex-col justify-start'>
              <p className="font-bold text-lg basis-1/12">What is <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Foodia</span> ?</p>
              <p className="leading-normal text-left first-letter:text-5xl first-letter:font-bold basis-1/4">Foodia is an image classification model trained on <a href="https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/" className="font-bold text-cyan-500">100+ dishes dataset</a> leveraging the power of transfer learning using <a href="https://arxiv.org/abs/1905.11946" className="font-bold text-cyan-500">EfficientNetB0 Model.</a></p>
              <p className="basis-1/3">Currently it's accuracy is <span className="font-bold">80%</span> after fine-tuning.</p>              
            </div>
            <div className='p-8 max-w-full bg-gray-800 rounded-xl shadow-lg col-span-2'>
              <p className="">Upload any image of a food</p>              
            </div>       
            <div className='p-8 max-w-full bg-gray-800 rounded-xl shadow-lg col-span-2'>
              <p className="">Predictions</p>              
            </div>              
          </div>  
          <div id='footer' className="flex justify-center pt-8 items-end basis-1/12">
            <p>Built by a <Link href="https://twitter.com/iSaketMunda" className="font-bold hover:underline text-cyan-500">Human</Link> with a 🫰🏼</p>    
          </div>  
        </div>
      </div> 
      <div className='gradient-04 z-0'/>     
    </div>
  );
}
