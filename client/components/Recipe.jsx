'use client';
import { useState } from "react";

const Recipe = ({predictions, isLoading, recipe, recipeLoading }) => {

    // default prediction
    let label = 'grilled_salmon';
    // default history replace with already loaded history of grilled_salmon
    let localRecipe  = "As an AI language model, I don't have taste buds to give you a recipe. Here is a recipe for Grilled Salmon Dish that you could try -\n\nIngredients:\n\n- 4 salmon fillets\n- 2 tablespoons of olive oil\n- Salt and black pepper, to taste\n- 2 tablespoons of honey\n- 2 tablespoons of soy sauce\n- 2 garlic cloves, minced\n- 1 tablespoon of grated ginger\n- Lemon wedges, for serving\n- Fresh parsley, chopped (optional)\n\nInstructions:\n\n1. Preheat the grill to medium-high heat.\n\n2. In a small bowl, whisk together the olive oil, honey, soy sauce, garlic and ginger.\n\n3. Season the salmon fillets with salt and black pepper on both sides.\n\n4. Brush the honey sauce on both sides of the salmon fillets.\n\n5. Place the fillets on the grill and cook for 4-5 minutes on each side or until the fish flakes easily with a fork.\n\n6. Serve with lemon wedges and chopped parsley (optional) on top.\n\nEnjoy your delicious grilled salmon!";   
    
    // once we get the prediction, call the chatgpt api
    if (predictions.labels.length > 0)
    {
        label = predictions.labels[0]; 
    }
    if(recipe) {
        localRecipe = recipe;
    }

    if (isLoading) 
    {
        return (
            <section className="my-10 mx-auto p-8 bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center items-center gap-4 h-[70vh]">              
                <div className="flex justify-center items-center"><svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg></div>         
            </section>
        )            
    }
    else {
        return (
            <section className="my-10 p-8 mx-auto bg-gray-800 rounded-xl shadow-lg items-start flex flex-col justify-start gap-3 min-h-[50vh]">
            <div>
                <p className="font-bold text-2xl">Recipe of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"> {label}</span></p>            
            </div>
            <hr className="my-2 w-full border-cyan-500"/>
            {recipeLoading? (
                <>
                <p>ChatGPT is generating recipe for {label}.... <span><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg></span></p>
                </>
            ) : 
            (
                <>
                <div>
                    {localRecipe.split('\n').map((text, i) =>
                    (
                        <>
                        <span className="text-left" key={i}>{text}</span>  
                        <br/>
                        </>                        
                    )
                    )}
                
                </div>       
                </>
                
            )}
            
        </section>
        );  
    }
      
};

export default Recipe;