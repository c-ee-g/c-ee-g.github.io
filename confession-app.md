---
layout: default
title: Confession App
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Examination of Conscience</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
  :root{
    --parchment: #f2e9d8;
    --parchment-dark: #e9dcc0;
    --ink: #2b2118;
    --ink-soft: #4a3c2c;
    --violet: #4b2142;
    --violet-deep: #331730;
    --gold: #a6822c;
    --gold-bright: #c9a24a;
    --rule: #c9b98f;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background: var(--parchment);
    background-image:
      radial-gradient(ellipse at top left, rgba(75,33,66,0.05), transparent 55%),
      radial-gradient(ellipse at bottom right, rgba(166,130,44,0.06), transparent 55%);
    color: var(--ink);
    font-family: 'EB Garamond', serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }
  .display{ font-family: 'Cormorant Garamond', serif; }

  /* ---------- Rosary progress bar ---------- */
  .beads-wrap{
    position: sticky; top: 0; z-index: 20;
    background: linear-gradient(180deg, var(--parchment) 70%, rgba(242,233,216,0));
    padding: 14px 16px 10px;
  }
  .beads{
    display:flex; align-items:center; justify-content:center; gap:5px; flex-wrap: wrap;
    max-width: 640px; margin: 0 auto;
  }
  .bead{
    width:10px; height:10px; border-radius:50%;
    background: var(--parchment-dark);
    border: 1px solid var(--rule);
    transition: background .4s ease, transform .3s ease, box-shadow .4s ease;
    flex: 0 0 auto;
  }
  .bead.lit{
    background: radial-gradient(circle at 35% 30%, var(--gold-bright), var(--gold) 70%);
    border-color: var(--gold);
    box-shadow: 0 0 6px rgba(166,130,44,0.6);
    transform: scale(1.2);
  }
  .beads-label{
    text-align:center; font-size: 12px; letter-spacing: .12em; text-transform: uppercase;
    color: var(--ink-soft); margin-top: 6px; opacity: .75;
  }

  /* ---------- Page shell ---------- */
  .page{ max-width: 640px; margin: 0 auto; padding: 8px 22px 90px; }

  header.hero{ text-align:center; padding: 18px 0 26px; }
  .cross{ font-size: 22px; color: var(--violet); opacity:.85; }
  h1.title{
    font-size: 40px; font-weight: 700; margin: 8px 0 2px; color: var(--violet-deep);
    letter-spacing: .01em;
  }
  .subtitle{
    font-style: italic; color: var(--ink-soft); font-size: 17px; margin: 0 0 14px;
  }
  .fleuron{ color: var(--gold); letter-spacing: .5em; font-size: 13px; margin: 10px 0 0; }

  .intro-note{
    font-size: 15px; line-height: 1.6; color: var(--ink-soft);
    border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
    padding: 14px 4px; margin: 4px 0 26px;
  }

  /* ---------- Prayer cards ---------- */
  .prayer-card{
    background: var(--parchment-dark);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--violet);
    border-radius: 3px;
    padding: 18px 20px;
    margin: 0 0 30px;
  }
  .prayer-card h2{
    font-family:'Cormorant Garamond',serif; font-size: 21px; margin: 0 0 8px;
    color: var(--violet-deep); font-weight:600;
  }
  .prayer-card p{ margin: 0 0 10px; line-height: 1.65; font-size: 16.5px; }
  .prayer-card p:last-child{ margin-bottom:0; }
  .prayer-card .latin{ font-style: italic; color: var(--ink-soft); font-size: 15px; }

  /* ---------- Section divider ---------- */
  .section-label{
    display:flex; align-items:center; gap:12px; margin: 8px 0 16px;
  }
  .section-label .line{ flex:1; height:1px; background: var(--rule); }
  .section-label span{
    font-size: 13px; letter-spacing:.15em; text-transform:uppercase; color: var(--gold);
    white-space: nowrap; font-weight: 600;
  }

  /* ---------- Reference card (non-tracked) ---------- */
  .ref-card{
    border: 1px solid var(--rule); border-radius: 4px; padding: 16px 18px;
    margin-bottom: 14px; background: rgba(255,255,255,0.3);
  }
  .ref-card h3{
    font-family:'Cormorant Garamond',serif; font-size: 17px; color: var(--violet-deep);
    margin: 0 0 8px; font-weight:600;
  }
  .ref-card ul{ margin:0; padding-left: 20px; }
  .ref-card li{ font-size: 14.5px; line-height: 1.6; margin-bottom: 3px; }
  .ref-card .virtue{ color: var(--gold); font-style: italic; }

  /* ---------- Group / accordion structure ---------- */
  .group-block{ margin-bottom: 14px; border: 1px solid var(--rule); border-radius: 5px; overflow:hidden; background: rgba(255,255,255,0.2); }
  .group-block:last-child{ margin-bottom: 0; }
  .group-label{
    display:flex; align-items:center; gap:10px; margin: 0;
    padding: 14px 16px; width:100%; text-align:left;
    background: transparent; border:none; cursor:pointer;
    font-family:'EB Garamond',serif;
  }
  .group-label:focus-visible{ outline: 2px solid var(--violet); outline-offset: -2px; }
  .group-label span:not(.group-chevron):not(.group-count){
    font-family:'Cormorant Garamond',serif; font-weight:600; font-size:18px;
    color: var(--violet-deep); white-space:nowrap; letter-spacing:.02em;
  }
  .group-chevron{
    font-size: 13px; color: var(--gold); transition: transform .25s ease; flex: 0 0 auto;
  }
  .group-block.open .group-chevron{ transform: rotate(90deg); }
  .group-label .line{ flex:1; height:1px; background: var(--rule); opacity:.6; }
  .group-count{
    font-size: 12px; color: var(--ink-soft); font-family:'EB Garamond',serif;
    white-space:nowrap; opacity:.8;
  }
  .group-body{
    max-height: 0; overflow: hidden; transition: max-height .4s ease;
  }
  .group-body{ padding: 0 12px 4px; }
  .group-body .commandment{ border-left:none; border-right:none; border-radius:0; margin-bottom:0; border-top:none; }
  .group-body .commandment + .commandment{ border-top: 1px dashed var(--rule); }
  .group-body > .commandment:first-child{ border-top: 1px solid var(--rule); }
  .group-body .commandment.flat{ border-top:none !important; }

  .commandment{
    border: 1px solid var(--rule);
    border-radius: 4px;
    margin-bottom: 12px;
    background: rgba(255,255,255,0.35);
    overflow: hidden;
    transition: border-color .3s ease;
  }
  .commandment.reviewed{ border-color: var(--gold); }
  .commandment-head{
    display:flex; align-items:center; gap:14px;
    padding: 14px 16px;
    cursor:pointer; user-select:none;
    background: transparent;
    border:none; width:100%; text-align:left;
    font-family:'EB Garamond',serif;
  }
  .commandment-head:focus-visible{ outline: 2px solid var(--violet); outline-offset: -2px; }
  .numeral{
    font-family:'Cormorant Garamond',serif; font-weight:700; font-size:19px;
    color: var(--gold); min-width: 34px;
  }
  .head-text{ flex:1; }
  .head-text .cname{ font-size: 16.5px; font-weight:600; color: var(--ink); line-height:1.3; }
  .head-text .cname .virtue-tag{ font-size:13px; font-style:italic; color: var(--ink-soft); font-weight:400; }
  .head-text .ccount{ font-size: 12.5px; color: var(--ink-soft); margin-top:2px; }
  .check-mark{
    font-size: 13px; color: var(--gold); opacity:0; transition: opacity .3s ease;
    margin-right: 4px;
  }
  .commandment.reviewed .check-mark{ opacity: 1; }
  .chevron{
    font-size: 13px; color: var(--ink-soft); transition: transform .25s ease;
    transform: rotate(0deg);
  }
  .commandment.open .chevron{ transform: rotate(180deg); }

  .commandment-body{
    max-height: 0; overflow: hidden; transition: max-height .35s ease;
  }
  .commandment-body.flat-body{ max-height:none !important; overflow:visible; }
  .commandment-inner{ padding: 0 18px 16px 18px; }
  .flat-body .commandment-inner{ padding: 10px 16px 14px; }
  .examen-item{
    display:flex; align-items:flex-start; gap:10px;
    padding: 8px 0; border-top: 1px dashed var(--rule);
    font-size: 15.5px; line-height:1.5;
  }
  .examen-item:first-child{ border-top:none; }
  .examen-item input[type=checkbox]{
    margin-top: 4px; width: 16px; height:16px; accent-color: var(--violet);
    flex: 0 0 auto; cursor:pointer;
  }
  .examen-item label{ cursor:pointer; }
  .examen-item.checked label{ color: var(--violet-deep); font-weight:600; }
  .examen-item .item-col{ flex:1; }
  .grave-mark{
    color: var(--violet); font-weight:700; margin-right:5px; font-size:14px;
  }
  .grave-row{ display:none; margin-top:6px; }
  .grave-row.show{ display:block; }
  .grave-toggle{
    display:none; align-items:center; background:none; border:1px dashed var(--rule);
    border-radius:14px; padding:4px 10px; font-family:'EB Garamond',serif; font-size:13px;
    color: var(--ink-soft); cursor:pointer;
  }
  .grave-toggle.show{ display:inline-flex; }
  .grave-toggle:hover{ border-color: var(--violet); color: var(--violet-deep); }
  .stepper{
    display:none; align-items:center; gap:8px;
  }
  .stepper.show{ display:flex; }
  .step-btn{
    width:26px; height:26px; border-radius:50%; border:1px solid var(--violet);
    background:transparent; color:var(--violet-deep); font-size:15px; line-height:1;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    font-family:'EB Garamond',serif;
  }
  .step-btn:hover{ background: rgba(75,33,66,0.08); }
  .step-btn.unmark{ border-color: var(--rule); color: var(--ink-soft); width:22px; height:22px; font-size:12px; margin-left:4px; }
  .step-count{
    min-width:18px; text-align:center; font-weight:600; color:var(--violet-deep); font-size:15px;
  }
  .step-word{ font-size:13px; color:var(--ink-soft); font-style:italic; }
  .grave-note{
    font-size: 13.5px; color: var(--ink-soft); line-height:1.6; margin: -10px 0 20px;
    font-style: italic;
  }

  /* ---------- Per-category note ---------- */
  .group-note{ padding: 12px 6px 14px; }
  .group-note-label{
    display:block; font-size: 12.5px; letter-spacing:.06em; text-transform:uppercase;
    color: var(--gold); margin-bottom: 6px; font-weight:600;
  }
  .group-note-input{
    width:100%; min-height: 44px; resize: none; overflow:hidden;
    border: 1px dashed var(--rule); border-radius: 4px; background: rgba(255,255,255,0.5);
    font-family:'EB Garamond',serif; font-size: 14.5px; color: var(--ink);
    padding: 8px 10px; line-height:1.5;
  }
  .group-note-input:focus{ outline:none; border-color: var(--violet); background: #fff; }
  .group-note-input::placeholder{ color: #9a8b70; font-style:italic; }

  /* ---------- Steps ---------- */
  .steps{ counter-reset: step; list-style:none; padding:0; margin: 0 0 30px; }
  .steps li{
    counter-increment: step;
    position: relative;
    padding: 4px 0 18px 42px;
    border-left: 1px solid var(--rule);
    margin-left: 14px;
    font-size: 15.5px; line-height:1.6;
  }
  .steps li:last-child{ border-left-color: transparent; padding-bottom:0; }
  .steps li::before{
    content: counter(step);
    position:absolute; left:-15px; top:0;
    width:28px; height:28px; border-radius:50%;
    background: var(--parchment); border: 1.5px solid var(--gold);
    color: var(--violet-deep); font-weight:600; font-family:'Cormorant Garamond',serif;
    font-size: 15px; display:flex; align-items:center; justify-content:center;
  }
  .steps li strong{ color: var(--violet-deep); }

  /* ---------- Completion banner ---------- */
  .completion{
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height .6s ease, opacity .6s ease;
  }
  .completion.show{ max-height: 2400px; opacity: 1; }
  .completion-inner{
    border: 1.5px solid var(--gold);
    border-radius: 6px;
    padding: 22px 20px;
    margin: 6px 0 34px;
    background: linear-gradient(180deg, rgba(201,162,74,0.10), rgba(201,162,74,0.03));
  }
  .completion-inner h2{
    font-family:'Cormorant Garamond',serif; font-size: 24px; color: var(--violet-deep);
    margin: 0 0 6px; text-align:center;
  }
  .completion-inner .sub{
    text-align:center; font-size: 14.5px; color: var(--ink-soft); margin: 0 0 18px;
    font-style: italic;
  }
  .tally{
    text-align:center; font-size: 14px; letter-spacing:.06em; text-transform:uppercase;
    color: var(--gold); margin-bottom: 16px; font-weight:600;
  }
  .actions{
    display:flex; gap: 10px; margin-top: 18px; flex-wrap: wrap;
  }
  .btn{
    flex: 1; min-width: 130px;
    font-family:'EB Garamond',serif; font-size: 15px; font-weight:600;
    padding: 11px 16px; border-radius: 5px; cursor:pointer;
    border: 1.5px solid var(--violet); background: var(--violet); color: var(--parchment);
    transition: background .2s ease, transform .15s ease;
    letter-spacing: .02em;
  }
  .btn:hover{ background: var(--violet-deep); }
  .btn:active{ transform: scale(0.98); }
  .btn.secondary{
    background: transparent; color: var(--violet-deep);
  }
  .btn.secondary:hover{ background: rgba(75,33,66,0.08); }

  /* ---------- footer note ---------- */
  .footnote{
    text-align:center; font-size: 13.5px; color: var(--ink-soft);
    font-style: italic; line-height:1.6; margin-top: 10px;
    border-top: 1px solid var(--rule); padding-top: 18px;
  }

  .reset-btn{
    display:block; margin: 26px auto 0; background: none; border: 1px solid var(--rule);
    color: var(--ink-soft); font-family:'EB Garamond',serif; font-size: 13.5px;
    padding: 8px 18px; border-radius: 20px; cursor: pointer; letter-spacing:.03em;
  }
  .reset-btn:hover{ border-color: var(--violet); color: var(--violet-deep); }

  /* ---------- printable area (screen: hidden off-canvas) ---------- */
  #printArea{ position: absolute; left: -9999px; top: 0; width: 600px; }

  @media print{
    body > *:not(#printArea){ display:none !important; }
    #printArea{ position: static !important; left:auto !important; width:auto !important; display:block !important; }
    #printArea{ font-family: 'EB Garamond', serif; color:#000; }
    #printArea h1{ font-family:'Cormorant Garamond',serif; font-size:26px; margin:0 0 2px; }
    #printArea .pdate{ font-size:13px; color:#333; margin:0 0 18px; }
    #printArea h2{ font-size:17px; margin: 20px 0 4px; }
    #printArea h3{ font-size:14.5px; margin: 12px 0 4px; border-bottom:1px solid #999; padding-bottom:2px; }
    #printArea ul{ margin:0 0 4px; padding-left: 20px; }
    #printArea li{ margin-bottom:4px; font-size:14px; }
    #printArea .pnote{ font-size:13px; font-style:italic; margin: 4px 0 4px 4px; }
    #printArea .ptotal{ margin-top:16px; font-weight:600; }
    #printArea .pact{ margin-top:22px; font-size:13.5px; line-height:1.6; border-top:1px solid #999; padding-top:12px; }
  }

  @media (prefers-reduced-motion: reduce){
    *{ transition: none !important; }
  }
</style>
</head>
<body>

<div class="beads-wrap">
  <div class="beads" id="beads"></div>
  <div class="beads-label" id="beadsLabel">0 reviewed</div>
</div>

<div class="page">

  <header class="hero">
    <div class="cross">✠</div>
    <h1 class="title display">Examination of Conscience</h1>
    <p class="subtitle">A quiet preparation for sacramental Confession</p>
    <div class="fleuron">· · ·</div>
  </header>

  <p class="intro-note">
    This is a private aid for prayer and self-examination — it does not replace, hear, or absolve confession.
    Only a validly ordained priest can absolve sins in the Sacrament of Penance. Open each section below and
    read it prayerfully; the progress bar above marks what you've reviewed.
  </p>

  <div class="prayer-card">
    <h2>Before You Begin</h2>
    <p class="latin">Reflect that this confession may be the last of your life.
      Therefore, prepare yourself for it as if you were lying sick upon your deathbed,
      and already at the brink of the grave. Ask God to give you the grace to make a good examination of conscience,
      the light to see your sins clearly, and the strength to make a sincere confession and to amend your life.
    </p>
    <p>O Holy Spirit, come in Thy mercy; enlighten my mind and strengthen my will that I may know my sins, humbly
      confess them, and sincerely amend my life.
      Mary, my mother, Refuge of Sinners, assist me in Thy intercession.</p>
  </div>

  <div class="section-label"><span>Examine Yourself</span><div class="line"></div></div>
  <p class="grave-note">A sin is mortal if there is grave matter, full knowledge, and deliberate consent. If you think a sin is mortal, mark it <span class="grave-mark">†</span> and note how many times it was committed, as best you recall, since mortal sins must be confessed in kind and number.</p>

  <div id="commandments"></div>

  <button type="button" class="reset-btn" id="completeBtn" style="margin:20px auto 0; border-color:var(--gold); color:var(--violet-deep);">I'm finished — show Act of Contrition</button>

  <div class="completion" id="completion">
    <div class="completion-inner">
      <h2 class="display">Your Examination Is Complete</h2>
      <p class="sub">Pray the Act of Contrition below, then bring your list with you.</p>
      <div class="tally" id="tally">0 items noted</div>
      <div class="prayer-card" style="margin-bottom:0;">
        <p>O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just
        punishments, but most of all because they offend Thee, my God, Who art all good and deserving of all my
        love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin.
        Amen.</p>
      </div>
      <div class="actions">
        <button class="btn" id="printBtn">Print my list</button>
        <button class="btn secondary" id="copyBtn">Copy my list</button>
      </div>
    </div>
  </div>

  <div class="section-label"><span>For Further Reflection</span><div class="line"></div></div>
  <div class="ref-card">
    <h3>The Four Sins that Cry to Heaven for Vengeance</h3>
    <ul>
      <li>Wilful murder</li>
      <li>The sin of Sodom</li>
      <li>Oppression of the poor</li>
      <li>Defrauding a laborer of his wages</li>
    </ul>
  </div>
  <div class="ref-card">
    <h3>The Seven Spiritual Works of Mercy</h3>
    <ul>
      <li>To admonish sinners</li>
      <li>To counsel the doubtful</li>
      <li>To instruct the ignorant</li>
      <li>To comfort the sorrowful</li>
      <li>To bear wrongs patiently</li>
      <li>To forgive all injuries</li>
      <li>To pray for the living and the dead</li>
    </ul>
  </div>
  <div class="ref-card" style="margin-bottom: 26px;">
    <h3>The Seven Corporal Works of Mercy</h3>
    <ul>
      <li>To feed the hungry</li>
      <li>To give drink to the thirsty</li>
      <li>To clothe the naked</li>
      <li>To harbor the harborless</li>
      <li>To visit the sick</li>
      <li>To ransom the captive</li>
      <li>To bury the dead</li>
    </ul>
  </div>

  <div class="section-label"><span>How Confession Is Made</span><div class="line"></div></div>
  <ol class="steps">
    <li><strong>Enter and kneel.</strong> Make the Sign of the Cross with the priest.</li>
    <li><strong>Greet the priest:</strong> "Bless me, Father, for I have sinned. It has been [time] since my last confession."</li>
    <li><strong>Confess your sins</strong> plainly, in kind and number as best you can recall — mortal sins first, then venial.</li>
    <li><strong>Listen</strong> to the priest's counsel and receive your penance.</li>
    <li><strong>Pray the Act of Contrition</strong>, aloud or silently as he directs.</li>
    <li><strong>Receive absolution</strong> as the priest prays the words of forgiveness over you.</li>
    <li><strong>Go in peace</strong> — and complete your penance promptly, in thanksgiving for God's mercy.</li>
  </ol>

  <button class="reset-btn" id="resetBtn">Reset examination</button>

  <p class="footnote">℣. Thanks be to God.<br>Deo gratias.</p>
</div>

<div id="printArea"></div>

<script>
const GROUPS = [
  { key: 'preliminary', title: 'Examination on Your Last Confession' },
  { key: 'commandments', title: 'The Ten Commandments of God' },
  { key: 'church', title: 'The Six Commandments of the Church' },
  { key: 'capital', title: 'The Seven Deadly Sins' },
  { key: 'accessory', title: "Being Accessory to Another's Sin" }
];

const DATA = [
  { group:"preliminary", flat:true, name:"Examination on Your Last Confession", items: [
      "I did not take sufficient pains to awaken contrition when I made my last confession.",
      "I omitted to confess a mortal sin, either intentionally or through forgetfulness.",
      "I neglected to say the penance imposed on me, or was so careless as to forget it.",
      "I have not carried out the resolutions I made at my last confession, or have paid no heed to them at all."
  ]},

  { mark:"I", group:"commandments", name: "I am the Lord thy God", items: [
      "I have doubted in matters of faith.",
      "I have despaired of God's mercy.",
      "I have believed in fortune-tellers, or consulted them.",
      "I have gone to places of worship belonging to other denominations.",
      "I have neglected my morning or night prayers.",
      "I have neglected religious duties or practices through motives of human respect.",
      "I have read books, papers, or periodicals of anti-Catholic or atheistic tendency.",
      "I have made use of superstitious practices.",
      "I have spoken with levity or irreverence of priests, religious, or sacred objects."
  ]},
  { mark:"II", group:"commandments", name: "Thou shalt not take the name of the Lord thy God in vain", items: [
      "I have taken the name of God in vain, or profaned anything relating to religion.",
      "I have sworn falsely, rashly, or in slight and trivial matters.",
      "I have cursed myself or others, so as to make them swear or blaspheme.",
      "I have angered others against God."
  ]},
  { mark:"III", group:"commandments", name: "Remember that thou keep holy the Sabbath day", items: [
      "I have missed Mass on a Sunday or holy day, or been willfully distracted during it.",
      "I have talked, gazed, or laughed in church.",
      "I have done, bought, sold, or commanded some servile work not of necessity on that day."
  ]},
  { mark:"IV", group:"commandments", name: "Honor thy father and thy mother", items: [
      "I have not honored my parents, superiors, and masters according to my duty.",
      "I have deceived them.",
      "I have disobeyed them."
  ]},
  { mark:"V", group:"commandments", name: "Thou shalt not kill", items: [
      "I have procured, desired, or hastened the death of anyone.",
      "I have borne hatred toward another.",
      "I have oppressed anyone.",
      "I have refused to speak to others, or injured them.",
      "I have not forgiven injuries, or desired revenge.",
      "I have used provoking language, or caused enmity between others."
  ]},
  { mark:"VI & IX", group:"commandments", name: "Thou shalt not commit adultery / covet thy neighbor's wife", items: [
      "I have been guilty of lascivious dressing.",
      "I have been in lewd company.",
      "I have read immodest books.",
      "I have been guilty of unchaste songs, discourses, words, or actions.",
      "I have willfully entertained impure thoughts or desires."
  ]},
  { mark:"VII", group:"commandments", name: "Thou shalt not steal", items: [
      "I have been guilty of stealing, or of deceit in buying or selling — in wares, prices, weights, or measures.",
      "I have willfully damaged another's goods, or negligently spoiled them."
  ]},
  { mark:"VIII", group:"commandments", name: "Thou shalt not bear false witness", items: [
      "I have borne false witness.",
      "I have called others injurious names.",
      "I have disclosed another's sins.",
      "I have flattered others.",
      "I have judged rashly."
  ]},
  { mark:"X", group:"commandments", name: "Thou shalt not covet thy neighbor's goods", items: [
      "I have coveted unjustly anything that belongs to another."
  ]},

  { group:"church", flat:true, name:"The Six Commandments of the Church", items: [
      "I have not heard Mass on Sundays and holy days of obligation.",
      "I have violated the fasts or abstinence appointed by the Church, or eaten flesh meat on a prohibited day.",
      "I have not gone to confession at least once a year.",
      "I have not received Holy Communion during Easter-time.",
      "I have failed to contribute to the support of my pastors.",
      "I have married outside the Church, within forbidden degrees of kindred, without witnesses, or at a forbidden time.",
      "I have sinned against some other commandment of the Church."
  ]},

  { mark:"✦", group:"capital", name: "Pride", virtue:"Humility", items: [
      "I have thought myself better than others.",
      "I have refused correction or advice out of pride.",
      "I have sought my own glory rather than God's."
  ]},
  { mark:"✦", group:"capital", name: "Covetousness", virtue:"Liberality", items: [
      "I have been excessively attached to money or possessions.",
      "I have been unwilling to share what I have with those in need."
  ]},
  { mark:"✦", group:"capital", name: "Lust", virtue:"Chastity", items: [
      "I have indulged disordered desire for pleasure.",
      "I have sought occasions that lead me toward this sin."
  ]},
  { mark:"✦", group:"capital", name: "Anger", virtue:"Meekness", items: [
      "I have given way to uncontrolled anger.",
      "I have nursed a grudge rather than forgiving."
  ]},
  { mark:"✦", group:"capital", name: "Gluttony", virtue:"Temperance", items: [
      "I have overindulged in food or drink.",
      "I have used food or drink to escape rather than to nourish."
  ]},
  { mark:"✦", group:"capital", name: "Envy", virtue:"Brotherly love", items: [
      "I have resented another's good fortune.",
      "I have been glad, even secretly, at another's misfortune."
  ]},
  { mark:"✦", group:"capital", name: "Sloth", virtue:"Diligence", items: [
      "I have been spiritually lazy, neglecting prayer out of laziness.",
      "I have put off my duties to God and to others through idleness."
  ]},

  { group:"accessory", flat:true, name:"Being Accessory to Another's Sin", items: [
      "I have been accessory to another's sin by counsel.",
      "I have been accessory to another's sin by command.",
      "I have been accessory to another's sin by consent.",
      "I have been accessory to another's sin by provocation.",
      "I have been accessory to another's sin by praise or flattery.",
      "I have been accessory to another's sin by concealment.",
      "I have been accessory to another's sin by partaking.",
      "I have been accessory to another's sin by silence.",
      "I have been accessory to another's sin by defense of the ill done."
  ]}
];

const state = { checked: {}, opened: {}, grave: {}, counts: {}, notes: {}, completedShown: false };

function checkedCountFor(ci){
  let n = 0;
  DATA[ci].items.forEach((_, ii) => { if(state.checked[ci+'-'+ii]) n++; });
  return n;
}

function openedCount(){
  let n = 0;
  DATA.forEach((_, ci) => { if(state.opened[ci]) n++; });
  return n;
}

function totalCheckedCount(){
  let n = 0;
  DATA.forEach((c, ci) => c.items.forEach((_, ii) => { if(state.checked[ci+'-'+ii]) n++; }));
  return n;
}

function renderBeads(){
  const lit = openedCount();
  document.getElementById('beadsLabel').textContent = lit + ' of ' + DATA.length + ' reviewed';
  document.querySelectorAll('.bead').forEach((b, i) => {
    b.classList.toggle('lit', i < lit);
  });
  updateGroupCounts();
}

function updateGroupCounts(){
  document.querySelectorAll('.group-block').forEach(gb => {
    const items = gb.querySelectorAll('.commandment');
    const reviewed = gb.querySelectorAll('.commandment.reviewed').length;
    const label = gb.querySelector('.group-count');
    if(label) label.textContent = reviewed + '/' + items.length;
  });
}

function buildBeads(){
  const wrap = document.getElementById('beads');
  wrap.innerHTML = '';
  DATA.forEach(() => {
    const d = document.createElement('div');
    d.className = 'bead';
    wrap.appendChild(d);
  });
}

function resizeGroupBody(groupBlock){
  if(!groupBlock.classList.contains('open')) return;
  const gb = groupBlock.querySelector('.group-body');
  gb.style.maxHeight = gb.scrollHeight + 'px';
}

function syncParentGroupHeight(el){
  const groupBlock = el.closest('.group-block');
  if(!groupBlock) return;
  resizeGroupBody(groupBlock);
}

function toggleAccordion(ci){
  const el = document.getElementById('cmd-'+ci);
  const body = el.querySelector('.commandment-body');
  const isOpen = el.classList.contains('open');
  if(isOpen){
    body.style.maxHeight = null;
    el.classList.remove('open');
  } else {
    el.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
  syncParentGroupHeight(el);
  if(!state.opened[ci]){
    state.opened[ci] = true;
    el.classList.add('reviewed');
    el.querySelector('.commandment-head').setAttribute('aria-expanded', String(!isOpen));
    renderBeads();
    checkCompletion();
  }
}

function updateCountLabel(ci){
  const n = checkedCountFor(ci);
  const el = document.querySelector('#cmd-'+ci+' .ccount');
  if(el) el.textContent = n === 0 ? 'Tap to examine' : (n + ' noted for confession');
}

function buildItemRow(c, ci, text, ii, body, wrap){
  const key = ci+'-'+ii;
  const row = document.createElement('div');
  row.className = 'examen-item';
  const id = 'chk-'+key;
  row.innerHTML =
    '<input type="checkbox" id="'+id+'">' +
    '<div class="item-col">' +
      '<label for="'+id+'">'+text+'</label>' +
      '<div class="grave-row">' +
        '<button type="button" class="grave-toggle"><span class="grave-mark">†</span>Mark mortal — note how many times</button>' +
        '<div class="stepper">' +
          '<button type="button" class="step-btn minus">\u2212</button>' +
          '<span class="step-count">1</span>' +
          '<button type="button" class="step-btn plus">+</button>' +
          '<span class="step-word">time(s)</span>' +
          '<button type="button" class="step-btn unmark">\u2715</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  const cb = row.querySelector('input');
  const graveRow = row.querySelector('.grave-row');
  const graveToggle = row.querySelector('.grave-toggle');
  const stepper = row.querySelector('.stepper');
  const stepCount = row.querySelector('.step-count');

  function setGrave(on){
    state.grave[key] = on;
    if(!state.counts[key]) state.counts[key] = 1;
    stepCount.textContent = state.counts[key];
    graveToggle.classList.toggle('show', !on);
    stepper.classList.toggle('show', on);
    if(state.completedShown) updateTally();
  }

  cb.addEventListener('change', () => {
    state.checked[key] = cb.checked;
    row.classList.toggle('checked', cb.checked);
    updateCountLabel(ci);
    graveRow.classList.toggle('show', cb.checked);
    if(!cb.checked){ setGrave(false); }
    else { graveToggle.classList.add('show'); stepper.classList.remove('show'); }
    if(body) body.style.maxHeight = body.scrollHeight + 'px';
    syncParentGroupHeight(wrap);
    if(state.completedShown) updateTally();
  });

  graveToggle.addEventListener('click', () => {
    setGrave(true);
    if(body) body.style.maxHeight = body.scrollHeight + 'px';
    syncParentGroupHeight(wrap);
  });
  row.querySelector('.unmark').addEventListener('click', () => {
    setGrave(false);
    if(body) body.style.maxHeight = body.scrollHeight + 'px';
    syncParentGroupHeight(wrap);
  });
  row.querySelector('.minus').addEventListener('click', () => {
    state.counts[key] = Math.max(1, (state.counts[key]||1) - 1);
    stepCount.textContent = state.counts[key];
    if(state.completedShown) updateTally();
  });
  row.querySelector('.plus').addEventListener('click', () => {
    state.counts[key] = (state.counts[key]||1) + 1;
    stepCount.textContent = state.counts[key];
    if(state.completedShown) updateTally();
  });

  return row;
}

function buildCommandments(){
  const root = document.getElementById('commandments');
  GROUPS.forEach(g => {
    const groupItems = DATA.map((c, ci) => ({ c, ci })).filter(x => x.c.group === g.key);
    if(!groupItems.length) return;

    const groupBlock = document.createElement('div');
    groupBlock.className = 'group-block';

    const heading = document.createElement('button');
    heading.type = 'button';
    heading.className = 'group-label';
    heading.setAttribute('aria-expanded', 'false');
    heading.innerHTML = '<span class="group-chevron">▸</span><span>'+g.title+'</span><div class="line"></div><span class="group-count"></span>';

    const groupBody = document.createElement('div');
    groupBody.className = 'group-body';

    heading.addEventListener('click', () => {
      const isOpen = groupBlock.classList.contains('open');
      if(isOpen){
        groupBody.style.maxHeight = null;
        groupBlock.classList.remove('open');
        heading.setAttribute('aria-expanded', 'false');
      } else {
        groupBlock.classList.add('open');
        heading.setAttribute('aria-expanded', 'true');
        groupBody.style.maxHeight = groupBody.scrollHeight + 'px';
        // flat groups (single list, no sub-accordion) count as reviewed once opened
        groupItems.forEach(({ c, ci }) => {
          if(c.flat && !state.opened[ci]){
            state.opened[ci] = true;
            const el = document.getElementById('cmd-'+ci);
            if(el) el.classList.add('reviewed');
          }
        });
        renderBeads();
        checkCompletion();
      }
    });

    groupBlock.appendChild(heading);
    groupBlock.appendChild(groupBody);

    groupItems.forEach(({ c, ci }) => {
      if(c.flat){
        const wrap = document.createElement('div');
        wrap.className = 'commandment flat';
        wrap.id = 'cmd-'+ci;
        const body = document.createElement('div');
        body.className = 'commandment-body flat-body';
        const inner = document.createElement('div');
        inner.className = 'commandment-inner';
        c.items.forEach((text, ii) => { inner.appendChild(buildItemRow(c, ci, text, ii, null, wrap)); });
        body.appendChild(inner);
        wrap.appendChild(body);
        groupBody.appendChild(wrap);
      } else {
        const wrap = document.createElement('div');
        wrap.className = 'commandment';
        wrap.id = 'cmd-'+ci;

        const head = document.createElement('button');
        head.className = 'commandment-head';
        head.type = 'button';
        head.setAttribute('aria-expanded','false');
        const virtueTag = c.virtue ? ' <span class="virtue-tag">— opposed by '+c.virtue+'</span>' : '';
        head.innerHTML =
          '<span class="numeral display">'+(c.mark||'')+'</span>' +
          '<span class="head-text"><div class="cname">'+c.name+virtueTag+'</div><div class="ccount">Tap to examine</div></span>' +
          '<span class="check-mark">✓</span>' +
          '<span class="chevron">▾</span>';
        head.addEventListener('click', () => toggleAccordion(ci));

        const body = document.createElement('div');
        body.className = 'commandment-body';
        const inner = document.createElement('div');
        inner.className = 'commandment-inner';

        c.items.forEach((text, ii) => { inner.appendChild(buildItemRow(c, ci, text, ii, body, wrap)); });

        body.appendChild(inner);
        wrap.appendChild(head);
        wrap.appendChild(body);
        groupBody.appendChild(wrap);
      }
    });

    // per-category note field
    const noteWrap = document.createElement('div');
    noteWrap.className = 'group-note';
    noteWrap.innerHTML = '<label class="group-note-label">Other thoughts</label><textarea class="group-note-input" placeholder="Anything else that comes to mind..." rows="1"></textarea>';
    const noteInput = noteWrap.querySelector('textarea');
    noteInput.value = state.notes[g.key] || '';
    const autosize = () => { noteInput.style.height = 'auto'; noteInput.style.height = noteInput.scrollHeight + 'px'; };
    noteInput.addEventListener('input', () => {
      state.notes[g.key] = noteInput.value;
      autosize();
      resizeGroupBody(groupBlock);
    });
    groupBody.appendChild(noteWrap);
    setTimeout(autosize, 0);

    root.appendChild(groupBlock);
  });
}

function updateTally(){
  const n = totalCheckedCount();
  document.getElementById('tally').textContent = n + (n === 1 ? ' item noted' : ' items noted');
}

function revealCompletion(){
  if(state.completedShown) return;
  state.completedShown = true;
  updateTally();
  const el = document.getElementById('completion');
  el.classList.add('show');
  const btn = document.getElementById('completeBtn');
  if(btn) btn.style.display = 'none';
  setTimeout(() => { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 250);
}

function checkCompletion(){
  if(state.completedShown) return;
  if(openedCount() === DATA.length){
    revealCompletion();
  }
}

document.getElementById('completeBtn').addEventListener('click', revealCompletion);

const ACT_OF_CONTRITION = "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.";

function collectGroupContent(g){
  const groupItems = DATA.map((c, ci) => ({ c, ci })).filter(x => x.c.group === g.key);
  const sections = [];
  groupItems.forEach(({ c, ci }) => {
    const picked = [];
    c.items.forEach((text, ii) => { const key = ci+'-'+ii; if(state.checked[key]) picked.push({ text, key }); });
    if(picked.length) sections.push({ name: c.name, picked });
  });
  const note = (state.notes[g.key] || '').trim();
  return { sections, note };
}

function buildTextList(){
  const lines = [];
  lines.push('Examination of Conscience');
  lines.push(new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' }));
  lines.push('');
  let total = 0;
  GROUPS.forEach(g => {
    const { sections, note } = collectGroupContent(g);
    if(!sections.length && !note) return;
    lines.push(g.title.toUpperCase());
    sections.forEach(sec => {
      if(sec.name !== g.title) lines.push('  ' + sec.name + ':');
      sec.picked.forEach(p => {
        let line = (sec.name !== g.title ? '    - ' : '  - ') + p.text;
        if(state.grave[p.key]){
          const n = state.counts[p.key] || 1;
          line += '  (mortal, x' + n + ')';
        }
        lines.push(line);
        total++;
      });
    });
    if(note) lines.push('  Other thoughts: ' + note);
    lines.push('');
  });
  lines.push('Total: ' + total + (total === 1 ? ' item noted' : ' items noted'));
  lines.push('');
  lines.push('Act of Contrition');
  lines.push(ACT_OF_CONTRITION);
  return lines.join('\n');
}

function escapeHTML(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildPrintHTML(){
  let total = 0;
  let sectionsHTML = '';
  GROUPS.forEach(g => {
    const { sections, note } = collectGroupContent(g);
    if(!sections.length && !note) return;
    sectionsHTML += '<h2>'+g.title+'</h2>';
    sections.forEach(sec => {
      if(sec.name !== g.title) sectionsHTML += '<h3>'+sec.name+'</h3>';
      sectionsHTML += '<ul>';
      sec.picked.forEach(p => {
        let line = p.text;
        if(state.grave[p.key]){
          const n = state.counts[p.key] || 1;
          line += ' <em>(mortal, &times;'+n+')</em>';
        }
        sectionsHTML += '<li>'+line+'</li>';
        total++;
      });
      sectionsHTML += '</ul>';
    });
    if(note) sectionsHTML += '<div class="pnote">Other thoughts: '+escapeHTML(note)+'</div>';
  });
  const dateStr = new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
  return (
    '<h1>Examination of Conscience</h1>' +
    '<div class="pdate">'+dateStr+'</div>' +
    sectionsHTML +
    '<div class="ptotal">Total: '+total+(total === 1 ? ' item noted' : ' items noted')+'</div>' +
    '<div class="pact"><strong>Act of Contrition</strong><br>'+ACT_OF_CONTRITION+'</div>'
  );
}

document.getElementById('printBtn').addEventListener('click', () => {
  document.getElementById('printArea').innerHTML = buildPrintHTML();
  window.print();
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = buildTextList();
  const btn = document.getElementById('copyBtn');
  const finish = (ok) => {
    const original = 'Copy my list';
    btn.textContent = ok ? 'Copied ✓' : 'Couldn\u2019t copy';
    setTimeout(() => { btn.textContent = original; }, 1800);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(() => finish(true)).catch(() => finish(false));
  } else {
    try{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      finish(true);
    } catch(e){ finish(false); }
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.querySelectorAll('.examen-item input[type=checkbox]').forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.examen-item').forEach(r => r.classList.remove('checked'));
  document.querySelectorAll('.grave-row').forEach(r => r.classList.remove('show'));
  document.querySelectorAll('.grave-toggle').forEach(b => b.classList.remove('show'));
  document.querySelectorAll('.stepper').forEach(s => s.classList.remove('show'));
  document.querySelectorAll('.step-count').forEach(s => { s.textContent = '1'; });
  document.querySelectorAll('.group-note-input').forEach(t => { t.value = ''; t.style.height = 'auto'; });
  document.querySelectorAll('.commandment').forEach((el) => {
    el.classList.remove('open', 'reviewed');
    const b = el.querySelector('.commandment-body:not(.flat-body)');
    if(b) b.style.maxHeight = null;
    const h = el.querySelector('.commandment-head');
    if(h) h.setAttribute('aria-expanded', 'false');
  });
  DATA.forEach((c, ci) => updateCountLabel(ci));
  document.querySelectorAll('.group-block').forEach(gb => {
    gb.classList.remove('open');
    gb.querySelector('.group-body').style.maxHeight = null;
    gb.querySelector('.group-label').setAttribute('aria-expanded', 'false');
  });
  state.checked = {};
  state.opened = {};
  state.grave = {};
  state.counts = {};
  state.notes = {};
  state.completedShown = false;
  document.getElementById('completion').classList.remove('show');
  const completeBtn = document.getElementById('completeBtn');
  if(completeBtn) completeBtn.style.display = '';
  renderBeads();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

buildBeads();
buildCommandments();
document.getElementById('beadsLabel').textContent = '0 of ' + DATA.length + ' reviewed';
renderBeads();
</script>

</body>
</html>
