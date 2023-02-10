'use client';

import { useState } from "react";

const UploadImage = ({setPredictions}) => {

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

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        formData.append('file', fileInput);

        // write here the logic for calling the food vision api to make prediction
        const response = await fetch('http://127.0.0.1/', {
            method: 'POST',
            body: formData
        }).then(r=> r.json());

        console.log(response);

        setPredictions(true);

        // After prediction make this empty
        setUploadFile();
    }


    return (
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>                        
            {
                <img src={!imageSrc? defaultImgUrl : imageSrc} className="rounded-lg object-fit w-auto h-4/5"/>           
            }            
            <div className="mt-4 flex max-h-10 justify-start items-center">                
                <p>
                    <input 
                        type="file" 
                        name="file" 
                        className="block w-full text-md text-white file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-800"/>
                </p>                
            </div>
            <div className="flex max-h-12 justify-center items-end mt-4">
            {imageSrc && !uploadFile && (
                <p>
                    <button className="text-lg w-32 h-12 bg-clip-button bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white font-semibold">Predict 🪄</button>
                </p>
            )}
            </div>
        </form>        
    )    
};

export default UploadImage;