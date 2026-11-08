// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)
const express = require('express')
const app = express()
const port = '3000'

app.get('/greet', (req, res) => {
    res.status(200).json({
        msg: `hi from get endpoint ${new Date().toISOString()}`
    })
})
app.listen(port)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)
app.get('/greet/:name', (req, res) => {
    const NAME = req.params.name
    console.log(`i got name: ${NAME}`)
    res.status(200).json({ msg: `got name: ${NAME}` })
})


app.get('/test', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/greet/Bob');
        const data = await response.json()

       if (data.msg.includes("Bob")) {
            res.status(200).json({ result: 'ok' });
        } else {
            res.status(200).json({ result: 'fail' });
        }    
    } catch (error) {
        console.error("Fetch failed:", error);
        res.status(500).json({ error: 'Internal fetch failed' });
    }

})


// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

app.use(express.json())
app.post('/action', async (req, res) => {
    if (!req.body || (req.body.action !== "joke" && req.body.action !== "cat fact")) {
        return res.status(400).json({ msg: 'body is malformed' }); 
    }
    try{
    if (req.body.action == "joke")
    { const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&safe-mode')
        const data = await response.json()
        const jokeInUppercase = data.joke.toUpperCase();
        return res.status(200).json({ joke: jokeInUppercase })}
    else if (req.body.action == "cat fact")
    {  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', { headers: { "x-api-key": process.env.CAT_API_KEY }})
        const data = await response.json()
        return res.status(200).json({length: data.length})}
}catch (error) {
        console.error("Action handler failed:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
