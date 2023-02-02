
import styles from "../styles";

export default function Home() {
  return (
    <div className='bg-secondary-white overflow-hidden'>
      <div className='gradient-03 z-0'/>                
      <section className={`${styles.yPaddings} sm:pl-16 pl-16`}>
        <span className="text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Wikifoodia
        </span>
        <div className="h-10">
          <p className="font-bold text-[24px] text-white">Upload an image of a dish and <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Foodia</span> will predict the name of the dish</p> 
        </div>        
        <p>
            What is Foodia ?
        </p>
      </section>       
    </div>
  );
}
