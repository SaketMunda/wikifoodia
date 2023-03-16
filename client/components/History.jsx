'use client';

const History = ({predictions, isLoading, history, historyLoading }) => {

    // default prediction
    let label = 'grilled_salmon';
    // default history replace with already loaded history of grilled_salmon
    let localHistory  = "As an AI language model, I don't have personal experiences or emotions, but I can give you some information on the history of the dish.\n\nGrilled salmon is a dish that has been enjoyed by people for centuries. The ancient Greeks and Romans both enjoyed fish cooked over an open flame. However, it was the Native Americans who were the first to truly embrace salmon as a food source.\n\nSalmon has been an important part of Native American diet and culture for thousands of years. They would catch salmon during the annual salmon runs and then smoke, grill or bake it to preserve it for the winter months. Salmon was so important to Native American culture that it became a symbol of fertility, life and renewal.\n\nIn the early 1800s, George Washington was served a dish of grilled salmon on a trip to New York. He was so impressed with the dish that he wrote about it in his diary. Over time, the dish became popular throughout the country and eventually became a staple of American cuisine.\n\nToday, grilled salmon is a popular dish all over the world. It is often served with various sides like grilled vegetables, rice, potatoes, or salads.  The dish is not only delicious but also a healthy and nutritious source of protein, Omega-3 fatty acids, vitamins, and minerals";
   
    // once we get the prediction, call the chatgpt api
    if (predictions.labels.length > 0)
    {
        label = predictions.labels[0]; 
    }

    if (history) {
        localHistory = history;
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
                <p className="font-bold text-2xl">History of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500"> {label}</span></p>            
            </div>
            <hr className="my-2 w-full border-cyan-500"/>
            {historyLoading? (
                <>
                <p>ChatGPT is generating history for {label}.... <span><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg></span></p>
                </>
            ) : 
            (
                <>
                <div>
                    {localHistory.split('\n').map((text, i) =>
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

export default History;