import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let votes = { bullish: 0, bearish: 0 };

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="EGGS Sentiment Frame" />
        <meta property="og:image" content="https://frame-eggs.vercel.app/logo.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://frame-eggs.vercel.app/logo.png" />
        <meta property="fc:frame:button:1" content="🐣 Bullish (${votes.bullish})" />
        <meta property="fc:frame:button:2" content="🐻 Bearish (${votes.bearish})" />
        <meta property="fc:frame:post_url" content="https://frame-eggs.vercel.app/vote" />
      </head>
      <body>
        <h1>EGGS Token Frame</h1>
        <p>Choose your sentiment:</p>
      </body>
    </html>
  `);
});

app.post("/vote", (req, res) => {
  const action = req.body.untrustedData?.buttonIndex;
  if (action === 1) votes.bullish++;
  if (action === 2) votes.bearish++;
  res.redirect("/");
});

app.listen(port, () => console.log(`Frame server running on port ${port}`));
