'use client';
import { useState } from "react";
import { UploadImage, Prediction, Hero, About } from '../components';
import Link from "next/link";

export default function Home() {

  const [isLoading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState({labels:[], probs:[]});

  return (    
    <div> 
      <div className="flex justify-end p-2">
            <p>Built by a <Link href="https://twitter.com/iSaketMunda" className="font-bold hover:underline text-cyan-500">Human</Link> with a 🫰🏼</p>    
      </div>   
      <Hero/>                  
      <div className='px-10 2xl:min-w-full w-full'>
         <div className="xl:grid xl:grid-cols-5 max-h-[75vh] gap-4 xl:overflow-hidden flex flex-col">
          <About/>        
          <UploadImage setPredictions={setPredictions} setLoading={setLoading}/>
          <Prediction predictions={predictions} isLoading={isLoading}/>        
        </div>   
      </div>            
      <div className='gradient-04 z-0'/> 
    </div>
    
)};

