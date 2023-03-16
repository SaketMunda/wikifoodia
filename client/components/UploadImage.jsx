'use client';

import { useState } from "react";

const UploadImage = ({setPredictions, setLoading, setHistory, setHistoryLoading, setRecipe, setRecipeLoading}) => {

    const defaultImgUrl = "/grilled-salmon.jpeg";
    const [imageSrc, setImageSrc] = useState();
    const [uploadFile, setUploadFile] = useState();    

    /**
     * handleOnChange
     * @description Triggers when the file input changes (ex: when a file is selected)
     */
    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function(onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadFile(undefined);
        }

        if (changeEvent.target.files.length > 0){
            reader.readAsDataURL(changeEvent.target.files[0]);
        }        
    }

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    async function handleOnSubmit(event) {
        event.preventDefault();
        // set loaders for prediction
        setLoading(true);

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }            

        // write here the logic for calling the food vision api to make prediction
        const alive_endpoint = process.env.NEXT_PUBLIC_HOST + '/alive'; // endpoint to check if server is up

        const predict_endpoint = process.env.NEXT_PUBLIC_HOST + '/predict'; // endpoint to predict        

        const response = await fetch(predict_endpoint, {
            method: 'POST',
            body: formData
        }).then(r=> r.json());

        //console.log(response);

        let responsePredictions = {};

        if (response.status_code==200){
            responsePredictions = {labels:response.labels, probs:response.probs};
            setPredictions(predictions=> (
                {
                    ...predictions,
                    ...responsePredictions
                }
            ));

            // After prediction make this empty        
            setLoading(false);

            // set history and recipe loading true
            setHistoryLoading(true);       
            setRecipeLoading(true);

            const detail_endpoint = process.env.NEXT_PUBLIC_HOST + '/detail'; // endpoint to predict        

            // Make call for History
            const historyRes = await fetch(detail_endpoint, {
                method:'POST',
                body: JSON.stringify({                    
                    label: response.labels[0],
                    send: "history"
                }),
                headers: {
                    'Content-Type':'application/json'
                },
            }).then(r=> r.json());            

            if (historyRes.error) {                
                setHistory('Unfortunately OpenAI APIs are not responding. Try again later!')
            }
            else {                                  
                setHistory(historyRes.text.content) 
            }
        
            // set loading false
            setHistoryLoading(false);        

            // // Make call for Recipe
            const recipeRes = await fetch(detail_endpoint, {
                method:'POST',
                body: JSON.stringify({                  
                    label: response.labels[0],
                    send: "recipe"
                }),
                headers: {
                    'Content-Type':'application/json'
                },
            }).then(r=> r.json());
           
            if (recipeRes.error) {                
                setRecipe('Unfortunately OpenAI APIs are not responding. Try again later!')
            }
            else {            
                setRecipe(recipeRes.text.content) 
            }

            setRecipeLoading(false);

        }        
        
        setUploadFile();
    }


    return (                            
            <section className="p-8 sm:w-full bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center gap-2 xl:h-[70vh]">            
                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>    
                <div className="flex justify-center items-start h-[50vh]">
                {
                    <img src={!imageSrc? defaultImgUrl : imageSrc} className="rounded-lg w-auto h-full object-fit"/>           
                }
                </div>            
                <div className="max-h-10 mt-5">
                    <p>
                        <input 
                            type="file" 
                            name="file" 
                            className="block w-full text-md text-white file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-800"/>
                    </p>                                    
                </div>
                <div className="flex max-h-12 justify-center items-center">
                {imageSrc && !uploadFile && (
                    <button className="text-lg w-32 h-12 bg-clip-button bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white font-semibold">Predict 🪄</button>
                )}
                </div>
                </form> 
            </section>       
                        
    )    
};

export default UploadImage;