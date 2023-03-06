'use client';

import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Prediction = ({predictions, isLoading}) => {    
    
    // default predictions
    let labels = ['grilled_salmon', 'omelette', 'garlic_bread', 'pizza', 'lasagna'];    
    let probs =  [80.96, 11.7, 2.45, 2.29, 1.71];   

    if (predictions.labels.length > 0)
    {
        labels = predictions.labels;
        probs = predictions.probs;
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'Highest Probability',
            data: probs, // prediction probabilities
            backgroundColor: [
            'rgba(54, 162, 235, 0.2)', // cyan            
            'rgba(153, 102, 255, 0.2)', // purple           
            'rgba(75, 192, 192, 0.2)', // green 
            'rgba(255, 205, 86, 0.2)', // yellow                        
            'rgba(255, 99, 132, 0.2)' // red            
            ],
            borderColor: [
            'rgb(54, 162, 235)', // cyan            
            'rgb(153, 102, 255)', // purple     
            'rgb(75, 192, 192)', // green       
            'rgb(255, 205, 86)', // yellow            
            'rgb(255, 99, 132)', // red            
            ],
            borderWidth: 1
    }]};  

    if (isLoading) 
    {
        return (
            <section className="xl:col-span-2 p-8 sm:w-full bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center items-center gap-4 xl:h-[70vh]">              
                <div className="flex justify-center items-center"><svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg></div>         
            </section>
        )            
    }
    else {
        return (            
            <section className="xl:col-span-2 p-8 sm:w-full bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center items-center gap-4 xl:h-[70vh]">              
                <Bar 
                    data = {data}
                    options= {{
                        scales: {
                            y : {
                                beginAtZero: true
                            }
                        }
                    }}/>
                <div className="flex justify-center items-center p-2">
                    <span>Foodia's Prediction : <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500 cursor-pointer font-bold">{labels[0]}</span></span>
                </div>            
            </section>)
    }    
};

export default Prediction;