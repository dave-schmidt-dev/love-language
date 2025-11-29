import { useState, useMemo } from 'react';

const allQuestions = [
  // Words vs Service
  { a: { text: "Hearing 'I'm proud of you' after a long day", lang: "words" }, b: { text: "Coming home to find your errands already done", lang: "service" }, pair: "words-service" },
  { a: { text: "A handwritten note expressing appreciation", lang: "words" }, b: { text: "Having your coffee made exactly how you like it", lang: "service" }, pair: "words-service" },
  { a: { text: "Verbal encouragement before something difficult", lang: "words" }, b: { text: "Help with a project you've been dreading", lang: "service" }, pair: "words-service" },
  { a: { text: "Being told 'I believe in you' when you doubt yourself", lang: "words" }, b: { text: "A partner who remembers and acts on small preferences", lang: "service" }, pair: "words-service" },
  { a: { text: "Public acknowledgment of your accomplishments", lang: "words" }, b: { text: "Someone taking over your tasks when you're exhausted", lang: "service" }, pair: "words-service" },
  { a: { text: "Hearing specific reasons why they chose you", lang: "words" }, b: { text: "Your car maintained or your space cleaned without asking", lang: "service" }, pair: "words-service" },
  
  // Words vs Gifts
  { a: { text: "Hearing specific reasons why they love you", lang: "words" }, b: { text: "Receiving a book they knew you'd love", lang: "gifts" }, pair: "words-gifts" },
  { a: { text: "Compliments on your character, not just appearance", lang: "words" }, b: { text: "A surprise delivery to your workplace", lang: "gifts" }, pair: "words-gifts" },
  { a: { text: "Being told 'You handled that perfectly'", lang: "words" }, b: { text: "Something you'd been eyeing showing up unexpectedly", lang: "gifts" }, pair: "words-gifts" },
  { a: { text: "Regular verbal check-ins about your wellbeing", lang: "words" }, b: { text: "Thoughtful souvenirs from their travels", lang: "gifts" }, pair: "words-gifts" },
  
  // Words vs Time
  { a: { text: "Daily texts saying they're thinking of you", lang: "words" }, b: { text: "An uninterrupted evening together, phones away", lang: "time" }, pair: "words-time" },
  { a: { text: "Hearing 'I appreciate everything you do'", lang: "words" }, b: { text: "Hours of conversation without looking at the clock", lang: "time" }, pair: "words-time" },
  { a: { text: "A voicemail just to say they miss you", lang: "words" }, b: { text: "Dedicated weekly time together, no exceptions", lang: "time" }, pair: "words-time" },
  { a: { text: "Being introduced proudly to their friends", lang: "words" }, b: { text: "Their undivided attention during conversation", lang: "time" }, pair: "words-time" },
  
  // Words vs Touch
  { a: { text: "Hearing 'You're the best thing that happened to me'", lang: "words" }, b: { text: "A long embrace when you're feeling low", lang: "touch" }, pair: "words-touch" },
  { a: { text: "Love letters or meaningful texts", lang: "words" }, b: { text: "Physical affection initiated without prompting", lang: "touch" }, pair: "words-touch" },
  { a: { text: "Being told 'I'm lucky to have you'", lang: "words" }, b: { text: "Forehead kisses before sleep", lang: "touch" }, pair: "words-touch" },
  { a: { text: "Hearing them defend you to others", lang: "words" }, b: { text: "Your hands finding each other in a crowd", lang: "touch" }, pair: "words-touch" },
  
  // Service vs Gifts
  { a: { text: "Having dinner prepared after a hard day", lang: "service" }, b: { text: "A small gift that arrived just because", lang: "gifts" }, pair: "service-gifts" },
  { a: { text: "Waking up to breakfast in bed", lang: "service" }, b: { text: "A collection of photos from your time together", lang: "gifts" }, pair: "service-gifts" },
  { a: { text: "Someone handling logistics for your trip", lang: "service" }, b: { text: "A gift that required research and thought", lang: "gifts" }, pair: "service-gifts" },
  { a: { text: "Your laundry done and folded", lang: "service" }, b: { text: "Tickets to something you've wanted to see", lang: "gifts" }, pair: "service-gifts" },
  
  // Service vs Time
  { a: { text: "Someone researching solutions to your problem", lang: "service" }, b: { text: "A full day planned around activities you enjoy", lang: "time" }, pair: "service-time" },
  { a: { text: "Unexpected help with household tasks", lang: "service" }, b: { text: "Being the sole focus during shared activities", lang: "time" }, pair: "service-time" },
  { a: { text: "Having your appointments scheduled and managed", lang: "service" }, b: { text: "Slow mornings together with nowhere to be", lang: "time" }, pair: "service-time" },
  { a: { text: "Someone fixing something that's been bothering you", lang: "service" }, b: { text: "A weekend trip, just the two of you", lang: "time" }, pair: "service-time" },
  
  // Service vs Touch
  { a: { text: "Someone grabbing the heavier load without asking", lang: "service" }, b: { text: "Holding hands while walking together", lang: "touch" }, pair: "service-touch" },
  { a: { text: "Someone driving so you can rest", lang: "service" }, b: { text: "A spontaneous shoulder rub while you work", lang: "touch" }, pair: "service-touch" },
  { a: { text: "Meals prepped for your busy week", lang: "service" }, b: { text: "Pressed together on the couch during a movie", lang: "touch" }, pair: "service-touch" },
  { a: { text: "Having your phone charged when you forgot", lang: "service" }, b: { text: "Walking with arms around each other", lang: "touch" }, pair: "service-touch" },
  
  // Gifts vs Time
  { a: { text: "A surprise gift that shows they were thinking of you", lang: "gifts" }, b: { text: "Daily check-ins asking how you're really doing", lang: "time" }, pair: "gifts-time" },
  { a: { text: "A meaningful souvenir from their trip", lang: "gifts" }, b: { text: "Them canceling plans to be with you when needed", lang: "time" }, pair: "gifts-time" },
  { a: { text: "A subscription to something you love", lang: "gifts" }, b: { text: "Long phone calls when you're apart", lang: "time" }, pair: "gifts-time" },
  { a: { text: "Personalized items with sentimental value", lang: "gifts" }, b: { text: "Morning coffee together as a daily ritual", lang: "time" }, pair: "gifts-time" },
  
  // Gifts vs Touch
  { a: { text: "Surprise treats that show they know your tastes", lang: "gifts" }, b: { text: "Dancing together in the kitchen", lang: "touch" }, pair: "gifts-touch" },
  { a: { text: "Sentimental keepsakes from your relationship", lang: "gifts" }, b: { text: "Falling asleep tangled together", lang: "touch" }, pair: "gifts-touch" },
  { a: { text: "Something you'll use daily that they picked out", lang: "gifts" }, b: { text: "Absent-minded touch while talking—arm, shoulder, knee", lang: "touch" }, pair: "gifts-touch" },
  { a: { text: "A framed photo of a meaningful moment", lang: "gifts" }, b: { text: "A hand on your back guiding through a crowded room", lang: "touch" }, pair: "gifts-touch" },
  
  // Time vs Touch
  { a: { text: "Eye contact and presence during conversation", lang: "time" }, b: { text: "Sitting pressed together while reading separately", lang: "touch" }, pair: "time-touch" },
  { a: { text: "Weekly rituals that are just yours", lang: "time" }, b: { text: "A real hug when you see each other, not a quick one", lang: "touch" }, pair: "time-touch" },
  { a: { text: "Them putting down their phone when you enter", lang: "time" }, b: { text: "Feet tangled together under the table", lang: "touch" }, pair: "time-touch" },
  { a: { text: "Late night conversations about everything", lang: "time" }, b: { text: "Waking up intertwined", lang: "touch" }, pair: "time-touch" },
];

const languageData = {
  words: { name: "Words of Affirmation", core: "Language is your primary emotional interface. Unexpressed love registers as ambiguous or absent." },
  service: { name: "Acts of Service", core: "You read intention through action. Effort and initiative translate directly to devotion." },
  gifts: { name: "Receiving Gifts", core: "Objects carry meaning beyond their material value—they're proof of sustained attention." },
  time: { name: "Quality Time", core: "Presence is the gift. You measure love in undivided attention and chosen moments." },
  touch: { name: "Physical Touch", core: "Physical connection bypasses language entirely. Touch communicates what words approximate." },
};

const combinationInsights = {
  "words-service": "You need both the declaration and the demonstration. Words without follow-through feel hollow; actions without acknowledgment feel invisible.",
  "words-gifts": "Tangible tokens paired with verbal expression create your ideal: something to hold onto that came with words explaining why.",
  "words-time": "Presence amplified by expression. You want someone who shows up and tells you why they showed up. Silence during togetherness can feel like distance.",
  "words-touch": "You crave verbal intimacy and physical closeness—someone who can hold you and tell you what you mean to them simultaneously.",
  "service-gifts": "You're attuned to effort in all its forms—whether it manifests as doing or giving. You notice when someone's energy was spent on you.",
  "service-time": "Investment is your metric. You feel loved when someone allocates their finite resources—hours and effort—toward you.",
  "service-touch": "Care made physical. You respond to love that you can feel—whether through a helpful act or literal contact.",
  "gifts-time": "You want to be thought of when apart (gifts) and prioritized when together (time). Presence and remembrance form your dual requirements.",
  "gifts-touch": "The sensory and the symbolic. You appreciate love you can touch—whether it's a person or something they chose for you.",
  "time-touch": "Proximity is everything. You need physical presence in both senses: someone there, and someone close.",
};

const communicationTips = {
  words: "Tell partners explicitly: 'I need to hear it. Compliments, appreciation, reasons why—say them out loud, even when they feel obvious to you.'",
  service: "Tell partners explicitly: 'When you handle something I was dreading, that's love to me. Don't ask if I need help—just do it.'",
  gifts: "Tell partners explicitly: 'It's not about expense. When you bring me something that shows you were thinking of me, that's how I feel loved.'",
  time: "Tell partners explicitly: 'Put the phone away. I need your full attention—scheduled, protected time that's just for us.'",
  touch: "Tell partners explicitly: 'Reach for me. Don't wait for me to initiate—your hand on my back or a random hug means everything.'",
};

const lowScoreInsights = {
  words: "Verbal affirmation isn't your primary channel—you might find excessive praise uncomfortable or performative.",
  service: "You don't need tasks handled for you to feel loved. You may prefer autonomy over being taken care of.",
  gifts: "Material expressions don't carry much weight. Presence or action means more than objects.",
  time: "Constant togetherness isn't your requirement. You trust connection without needing to verify it through proximity.",
  touch: "Physical affection isn't essential to your sense of being loved. You experience intimacy through other channels.",
};

const pairs = ["words-service", "words-gifts", "words-time", "words-touch", "service-gifts", "service-time", "service-touch", "gifts-time", "gifts-touch", "time-touch"];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectBalancedQuestions() {
  const grouped = {};
  pairs.forEach(p => grouped[p] = allQuestions.filter(q => q.pair === p));
  
  const selected = [];
  // First pass: 2 from each pair (20 questions)
  pairs.forEach(pair => {
    const shuffled = shuffle(grouped[pair]);
    selected.push(...shuffled.slice(0, 2));
  });
  
  // Second pass: 1 more from 5 random pairs (25 total)
  const extraPairs = shuffle(pairs).slice(0, 5);
  extraPairs.forEach(pair => {
    const remaining = grouped[pair].filter(q => !selected.includes(q));
    if (remaining.length > 0) {
      selected.push(shuffle(remaining)[0]);
    }
  });
  
  return shuffle(selected).map(q => ({
    ...q,
    flipped: Math.random() > 0.5
  }));
}

export default function LoveLanguageQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ words: 0, service: 0, gifts: 0, time: 0, touch: 0 });
  const [headToHead, setHeadToHead] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(() => selectBalancedQuestions(), [quizKey]);

  const handleChoice = (lang, pair) => {
    setSelectedOption(lang);
    
    setHeadToHead(prev => ({
      ...prev,
      [pair]: {
        ...prev[pair],
        [lang]: (prev[pair]?.[lang] || 0) + 1
      }
    }));
    
    setTimeout(() => {
      setScores(prev => ({ ...prev, [lang]: prev[lang] + 1 }));
      
      if (currentQuestion < questions.length - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
          setSelectedOption(null);
          setTransitioning(false);
        }, 200);
      } else {
        setShowResults(true);
      }
    }, 150);
  };

  const restart = () => {
    setQuizKey(k => k + 1);
    setCurrentQuestion(0);
    setScores({ words: 0, service: 0, gifts: 0, time: 0, touch: 0 });
    setHeadToHead({});
    setShowResults(false);
    setSelectedOption(null);
    setTransitioning(false);
    setStarted(true);
  };

  const sortedResults = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([lang, score]) => ({ lang, score, ...languageData[lang] }));

  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const scoreRange = maxScore - minScore;
  const isFlat = scoreRange <= 3;
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const topTwo = sortedResults.slice(0, 2).map(r => r.lang).sort().join('-');
  const lowest = sortedResults[sortedResults.length - 1];

  const decisiveMatchups = Object.entries(headToHead)
    .map(([pair, results]) => {
      const langs = Object.keys(results);
      const pairLangs = pair.split('-');
      if (langs.length === 1) {
        const loser = pairLangs.find(l => l !== langs[0]);
        return { pair, winner: langs[0], loser, wins: results[langs[0]], losses: 0, total: results[langs[0]], decisive: true };
      }
      const [lang1, lang2] = langs;
      const total = results[lang1] + results[lang2];
      if (results[lang1] > results[lang2]) {
        return { pair, winner: lang1, loser: lang2, wins: results[lang1], losses: results[lang2], total, decisive: results[lang1] >= total * 0.75 };
      } else if (results[lang2] > results[lang1]) {
        return { pair, winner: lang2, loser: lang1, wins: results[lang2], losses: results[lang1], total, decisive: results[lang2] >= total * 0.75 };
      }
      return null;
    })
    .filter(m => m && m.decisive)
    .sort((a, b) => b.total - a.total);

  if (!started) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '480px', padding: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 16px 0' }}>Love Language Assessment</h1>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            25 forced-choice questions with balanced coverage across all language pairings. Each presents two scenarios—choose the one that would make you feel more loved.
          </p>
          <button
            onClick={() => setStarted(true)}
            style={{ padding: '14px 32px', background: '#c41e3a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '15px', cursor: 'pointer' }}
          >
            Begin
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const primary = sortedResults[0];
    const secondary = sortedResults[1];
    const dominance = primary.score - secondary.score;
    
    return (
      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Your Results</p>
          
          {isFlat ? (
            <>
              <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 16px 0', lineHeight: '1.3' }}>
                No Dominant Language
              </h1>
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', margin: '0 0 32px 0' }}>
                Your results are statistically flat—no single love language clearly dominates. This isn't a failure to categorize; it suggests you're either genuinely multilingual in how you receive love, or the framework doesn't map cleanly onto your emotional wiring. The head-to-head data below may reveal more nuanced preferences.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '32px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 12px 0', lineHeight: '1.2' }}>
                {primary.name}
              </h1>
              
              {dominance <= 2 && (
                <p style={{ fontSize: '14px', color: '#c41e3a', margin: '0 0 24px 0' }}>
                  with a strong secondary in {secondary.name}
                </p>
              )}
              
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', margin: '0 0 32px 0' }}>
                {primary.core}
              </p>

              <div style={{ background: '#fafafa', padding: '24px', borderRadius: '4px', marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0 0 12px 0' }}>Your combination profile</p>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.7', margin: 0 }}>
                  {combinationInsights[topTwo]}
                </p>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '24px', borderRadius: '4px', marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0 0 12px 0' }}>How to communicate this</p>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                  {communicationTips[primary.lang]}
                </p>
              </div>
            </>
          )}

          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.05em', color: '#999', textTransform: 'uppercase', marginBottom: '16px' }}>Distribution</p>
            {sortedResults.map((result, index) => (
              <div key={result.lang} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: index === 0 && !isFlat ? '#c41e3a' : '#1a1a1a' }}>
                    {result.name}
                  </span>
                  <span style={{ fontSize: '13px', color: '#999' }}>{result.score}/{questions.length}</span>
                </div>
                <div style={{ height: '3px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(result.score / maxScore) * 100}%`, background: index === 0 && !isFlat ? '#c41e3a' : '#ccc', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {decisiveMatchups.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', letterSpacing: '0.05em', color: '#999', textTransform: 'uppercase', marginBottom: '16px' }}>Head-to-head preferences</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {decisiveMatchups.slice(0, 4).map((matchup, i) => (
                  <div key={i} style={{ fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                    <span style={{ color: '#1a1a1a', fontWeight: '500' }}>{languageData[matchup.winner].name}</span>
                    <span style={{ color: '#999' }}> over </span>
                    <span style={{ color: '#666' }}>{languageData[matchup.loser].name}</span>
                    <span style={{ color: '#999' }}> — {matchup.wins} of {matchup.total}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lowest.score <= 2 && !isFlat && (
            <div style={{ borderTop: '1px solid #eee', paddingTop: '24px', marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', letterSpacing: '0.05em', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>What doesn't resonate</p>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                <strong style={{ color: '#444', fontWeight: '500' }}>{lowest.name}</strong>: {lowScoreInsights[lowest.lang]}
              </p>
            </div>
          )}

          <button
            onClick={restart}
            style={{ fontSize: '14px', color: '#c41e3a', background: 'none', border: 'none', cursor: 'pointer', padding: '0', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Take Again (New Questions)
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const optionA = q.flipped ? q.b : q.a;
  const optionB = q.flipped ? q.a : q.b;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: '#f0f0f0' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#c41e3a', transition: 'width 0.3s ease' }} />
      </div>

      <div 
        style={{ 
          maxWidth: '640px', 
          margin: '0 auto', 
          padding: '80px 24px',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease'
        }}
      >
        <div style={{ marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#999', textTransform: 'uppercase' }}>
            {currentQuestion + 1} of {questions.length}
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: '400', color: '#1a1a1a', margin: '8px 0 0 0' }}>
            Which would make you feel more loved?
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[optionA, optionB].map((option, i) => (
            <button
              key={`${currentQuestion}-${i}`}
              onClick={() => handleChoice(option.lang, q.pair)}
              style={{
                padding: '20px 24px',
                background: selectedOption === option.lang ? '#c41e3a' : '#fff',
                border: '1px solid',
                borderColor: selectedOption === option.lang ? '#c41e3a' : '#e0e0e0',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '15px',
                lineHeight: '1.5',
                color: selectedOption === option.lang ? '#fff' : '#1a1a1a',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { if (selectedOption !== option.lang) e.target.style.borderColor = '#c41e3a'; }}
              onMouseLeave={(e) => { if (selectedOption !== option.lang) e.target.style.borderColor = '#e0e0e0'; }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
