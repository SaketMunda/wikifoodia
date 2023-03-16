'use client';
import Link from "next/link";

const About = () => (
    <section id='about' className="mt-10 mb-10 p-8 w-3/5 mx-auto bg-gray-800 rounded-xl shadow-lg items-center flex flex-col justify-center gap-3">
        <div>
            <p className="font-bold text-2xl">About Wiki-Foodia</p>
        </div>
        <div>
            <p className="text-left first-letter:text-5xl first-letter:font-bold">Foodia is a computer vision model which predicts the name of the dish by learning the features on the uploaded image.</p>            
            <br/>
            <p>The model is trained on the dataset of <a href="https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/" className="font-bold text-cyan-500">100+ dishes</a> leveraging the power of transfer learning using <a href="https://arxiv.org/abs/1905.11946" className="font-bold text-cyan-500">EfficientNetB0 Model</a>.</p>
            <br/>            
            <p>Accuracy is <span className="p-1 rounded-md bg-gray-700 mx-1">80%</span> after fine-tuning.</p>                           

            <br/><br/>            
            <p className="text-left first-letter:text-5xl first-letter:font-bold">Wiki-foodia combines the capabilities of <span className="font-bold text-cyan-500">Foodia</span>'s predictions on food images and based on Top 1 predicted label it requests <a href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis" className="font-bold text-cyan-500">ChatGPT-3.5 model</a> for generating history and recipe of the dish.</p>                           
        </div>        
    </section>
);

export default About;