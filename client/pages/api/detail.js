import { Configuration, OpenAIApi } from 'openai';

// configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res){
    
    const {label, send} = req.body;    
    
    try {        

        // next: check first if the label's information exist in json, if not then call the openai api

        // format the request for gpt model
        let content = "";
        if (send=="recipe") {
            content = "What is the recipe for " + label.replace('_', ' ') + " dish";
        } else if (send=="history") {
            content = "What is the history of " + label.replace('_', ' ') + " dish";
        }
        if (content==""){
            return res.status(500).json({error:"Incorrect payload", result: ""});
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",                     
            messages: [{role: "user", content: content}],
        });  

        // next: after a successful openai api call, store the results into json file
        
        return res.status(200).json({error:"", result: completion.data.choices[0].message});

    } catch(err) {
        return res.status(500).json({error: err, result:""})
    }   
    
}
