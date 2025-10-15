<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>$EGGS — Vote</title>

  <!-- Farcaster frame meta (helps some embed systems) -->
  <meta name="fc:frame" content="vNext" />
  <meta property="og:title" content="$EGGS Sentiment Vote" />
  <meta property="og:description" content="Is $EGGS Bullish or Bearish? Vote below 👇" />

  <style>
    :root{
      --bg:#070812; --card:#0f1724; --muted:#93a0b0; --accent:#06b6d4;
      color:#e6eef6; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    }
    html,body{height:100%;margin:0;background:linear-gradient(180deg,#04050a 0%, #0b1220 100%);display:flex;align-items:center;justify-content:center;}
    .card{width:92vw; max-width:420px; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02)); border-radius:14px; padding:18px; box-shadow:0 8px 30px rgba(2,6,23,0.7);}
    h1{margin:6px 0 4px;font-size:20px;text-align:center}
    p.sub{margin:0 0 14px;color:var(--muted); text-align:center;}
    .buttons{display:flex;gap:10px;}
    button{flex:1;padding:12px;border-radius:10px;border:0;font-weight:700;cursor:pointer}
    button.bull{background:linear-gradient(90deg,#0ea5a1,#06b6d4); color:#041014}
    button.bear{background:linear-gradient(90deg,#ef4444,#fb923c); color:#fff}
    .thanks{display:none;margin-top:12px;padding:10px;border-radius:8px;background:#06111a;text-align:center;color:var(--accent);font-weight:700}
    .credit{margin-top:12px;font-size:12px;color:var(--muted);text-align:center}
    .share{display:flex;gap:8px;justify-content:center;margin-top:10px}
    .smallbtn{padding:8px 10px;border-radius:8px;border:0;background:#101826;color:#fff;cursor:pointer}
  </style>
</head>
<body>
  <main class="card" role="main" aria-labelledby="title">
    <h1 id="title">What’s your $EGGS prediction?</h1>
    <p class="sub">$EGGS community—what do you think? Vote to show your sentiment!</p>

    <div class="buttons" role="group" aria-label="vote">
      <button id="btnBull" class="bull">🐂 Bullish</button>
      <button id="btnBear" class="bear">🐻 Bearish</button>
    </div>

    <div class="thanks" id="thanks">Thanks for voting! 🚀</div>

    <div class="share">
      <button id="copyLink" class="smallbtn">Copy frame link</button>
      <button id="openShare" class="smallbtn">Share (Tweet)</button>
    </div>

    <div class="credit">Made by @bargs</div>
  </main>

<script>
  // client-side only: no backend, just show thanks and disable repeat-click
  const btnBull = document.getElementById('btnBull');
  const btnBear = document.getElementById('btnBear');
  const thanks = document.getElementById('thanks');
  const copyBtn = document.getElementById('copyLink');
  const openShare = document.getElementById('openShare');

  async function onVote(choice){
    // show thanks, disable buttons
    btnBull.disabled = true; btnBear.disabled = true;
    thanks.style.display = 'block';
    // small local store to avoid double-clicks
    try { localStorage.setItem('eggs_vote', choice); } catch(e){}
    setTimeout(()=>{ thanks.style.display = 'none'; }, 2200);
  }

  btnBull.addEventListener('click', ()=> onVote('bullish'));
  btnBear.addEventListener('click', ()=> onVote('bearish'));

  copyBtn.addEventListener('click', async ()=>{
    try {
      await navigator.clipboard.writeText(location.href);
      copyBtn.textContent = 'Copied!';
      setTimeout(()=> copyBtn.textContent = 'Copy frame link', 1500);
    } catch(e){
      alert('Copy failed — copy URL manually.');
    }
  });

  openShare.addEventListener('click', ()=>{
    const text = encodeURIComponent('$EGGS community—what do you think? Vote below 👇');
    const url = encodeURIComponent(location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  });

  // if already voted, disable
  try {
    const v = localStorage.getItem('eggs_vote');
    if(v){ btnBull.disabled=true; btnBear.disabled=true; }
  } catch(e){}
</script>
</body>
</html>