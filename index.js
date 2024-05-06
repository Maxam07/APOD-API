import express from "express";
import axios from "axios";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('./public'));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set('views, __dirname + ./views');

// API KEY AUTHORIZATION FROM NASA https://api.nasa.gov/
const yourAPIkey = "MUd0cY2A5pCMikTtnb65hAIh24LpPAR4Bdp1H5if";

// NASA APOD API 
const Apod_API = "https://api.nasa.gov/planetary/apod?";

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(Apod_API + `api_key=${yourAPIkey}`);
        console.log("Working");
        const finalRes = result.data;
        res.render('index', { finalRes }); 
    } catch (error) {
        const message = "Failed to make request";
        console.error(message);
        res.render('index', { error: message });
    }
});

app.listen(port, () => {
    console.log(`Server Listening to ${port}`);
});
