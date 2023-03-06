'use client';
import Link from "next/link";

const About = () => (
    <section className="p-8 sm:w-full bg-gray-800 rounded-xl shadow-lg items-start flex flex-col justify-start gap-3 xl:h-[70vh]">
        <div>
            <p className="font-bold text-lg">Who is <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">Foodia</span> ?</p>
        </div>
        <div>
            <p className="text-left first-letter:text-5xl first-letter:font-bold">Foodia is a computer vision model which predicts the name of the dish by learning the features on the uploaded image.</p>
            <hr className="my-5 w-[20%]"/>
            <p>The model is trained on the dataset of <a href="https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/" className="font-bold text-cyan-500">100+ dishes</a> leveraging the power of transfer learning using <a href="https://arxiv.org/abs/1905.11946" className="font-bold text-cyan-500">EfficientNetB0 Model</a>.</p>
            <hr className="my-5 w-[20%]"/>
            <p>Accuracy is <span className="p-1 rounded-md bg-gray-700 mx-1">80%</span> after fine-tuning.</p>                           
        </div>        
    </section>
);

export default About;