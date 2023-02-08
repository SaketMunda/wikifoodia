import Link from "next/link";
import styles from "../styles";

export default function Home() {
  return (
    <div className='bg-secondary-white'>
      <div className='gradient-03 z-0'/>
      <div className="container max-w-full sm:p-16 xs:p-8 p-12">
        <div className="border border-red-500 flex flex-col">
          <div id='title-description' className="border border-green-500">
            <span className="relative text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Wikifoodia</span>
            <p className="font-bold text-[24px] text-white">Upload an image of a dish and <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Foodia</span> will predict the name of the dish</p> 
          </div>
          <div id='content'>
            <div className='border border-blue-500'>
              <p className="text-gray-500">What is Foodia ?</p>
              <p></p>
            </div>       
          </div>  
        </div>
      </div>
      <div id='footer' className="relative flex justify-center items-center">
        <p>Built by a <Link href="https://twitter.com/iSaketMunda" className="text-blue-500">Human</Link> with a 🫰🏼</p>    
      </div>  
      {/* <div className={`${styles.yPaddings} sm:pl-16 pl-16 border flex flex-col h-auto`} id='main-window'>
        <div id='title-description' className="border basis-1/4">
          <span className="relative text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Wikifoodia</span>
          <p className="font-bold text-[24px] text-white">Upload an image of a dish and <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Foodia</span> will predict the name of the dish</p> 
        </div>
        <div id='content' className="flex flex-row flex-wrap border basis-1/2">
          <div className={`${styles.yPaddings} border`}>
            <p className="text-gray-500">What is Foodia ?</p>
            <p></p>
          </div>       
        </div>                   
      </div>
                           */}
    </div>
  );
}
