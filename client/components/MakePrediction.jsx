'use client';

import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const MakePrediction = ({predictions}) => {    
    
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
            label: 'Highest Prediction',
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

    return (
        <div>            
            <span>Foodia predicted it's <b>{labels[0]}</b></span>
            <Bar 
                data = {data}
                options= {{
                    scales: {
                        y : {
                            beginAtZero: true
                        }
                    }
                }}/>
        </div>)
};

export default MakePrediction;