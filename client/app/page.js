'use client';
import { useState } from "react";
import { UploadImage, Prediction, Hero, About, History, Recipe } from '../components';
import Link from "next/link";

export default function Home() {

  const [isLoading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState({labels:[], probs:[]}); 

  const [history, setHistory] = useState('');
  const [historyLoading, setHistoryLoading] = useState(false); 
  
  const [recipe, setRecipe] = useState('');
  const [recipeLoading, setRecipeLoading] = useState(false);


  return (    
    <div>
      <div className='gradient-04 z-0'/>         
      <Hero/>                  
      <div className='relative px-10 2xl:min-w-full w-full'>
         <div className="2xl:max-h-[75vh] gap-4 flex 2xl:flex-row flex-col">          
          <UploadImage setPredictions={setPredictions} setLoading={setLoading} setHistory={setHistory} setHistoryLoading={setHistoryLoading} setRecipe={setRecipe} setRecipeLoading={setRecipeLoading} />
          <Prediction predictions={predictions} isLoading={isLoading}/>
        </div>   
      </div>
      <div className="relative px-10">
        <History predictions={predictions} isLoading={isLoading} history={history} historyLoading={historyLoading}/>
        <div className='gradient-04 z-0'/>      
        <Recipe predictions={predictions} isLoading={isLoading} recipe={recipe} recipeLoading={recipeLoading}/>
      </div>
      <About/>                    
      {/* <div className='gradient-04 z-0'/>  */}
      <div className="relative flex justify-center p-2">
          <p>Built by a <Link href="https://twitter.com/iSaketMunda" className="font-bold hover:underline text-cyan-500">Human</Link> with a 🫰🏼</p>    
      </div> 
    </div>
    
)};

