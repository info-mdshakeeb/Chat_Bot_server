const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const port = process.env.PORT

//muddileware :
app.use(cors());
app.use(express.json());

//test
app.get('/', (res, req) => {
    req.send('node is open')
})
//configaration of open ai :

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);


app.post('/s', async (req, res) => {
    const prompt = req.body.prompt
    // console.log(prompt);
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.send({ bot: response.data.choices[0].text })
    } catch (error) {
        console.log(error);
        res.send({ error })
    }

})


app.listen(port,
    () =>
        console.log(process.env.PORT, "port is open")
)
