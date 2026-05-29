const WORDS = {
  la: [
    "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
    "eiusmod","tempor","incididunt","labore","dolore","magna","aliqua","enim","ad","minim",
    "veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","commodo",
    "consequat","duis","aute","irure","reprehenderit","voluptate","velit","esse","cillum",
    "fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident",
    "culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","perspiciatis",
    "unde","omnis","iste","natus","accusantium","doloremque","laudantium","totam","rem",
    "aperiam","eaque","ipsa","quae","inventore","veritatis","quasi","architecto","beatae",
    "vitae","dicta","explicabo","nemo","ipsam","quia","voluptas","aspernatur","odit","fugit",
    "magni","dolores","eos","ratione","sequi","nesciunt","neque","porro","quisquam","dolorem",
    "adipisci","numquam","eius","modi","tempora","incidunt","magnam","quaerat","soluta"
  ],
  en: [
    "the","be","to","of","and","a","in","that","have","it","for","not","on","with","he",
    "as","you","do","at","this","but","his","by","from","they","we","say","her","she","or",
    "an","will","my","one","all","would","there","their","what","so","up","out","if","about",
    "who","get","which","go","me","when","make","can","like","time","no","just","him","know",
    "take","people","into","year","your","good","some","could","them","see","other","than",
    "then","now","look","only","come","its","over","think","also","back","after","use","two",
    "how","our","work","first","well","way","even","new","want","because","any","these",
    "give","day","most","between","need","large","often","hand","high","place","hold","great",
    "world","still","own","while","last","might","next","thing","both","point","small","number",
    "off","always","move","live","happen","show","around","form","three","set","put","end",
    "does","another","tell","why","let","something","here","turn","help","start","same",
    "find","long","down","side","been","few","since","came","where","right","ask","state"
  ],
  fi: [
    "ja","on","ei","se","hän","että","oli","mutta","kun","niin","olla","kaikki","jo",
    "sitten","vaan","vielä","joka","sinä","minä","mitä","tai","nyt","kuin","ennen","kaksi",
    "hyvin","uusi","tämä","voida","aika","saada","suuri","maa","mies","paljon","tulla","sama",
    "täytyy","ottaa","tehdä","paikka","kansa","asia","vuosi","tietää","sanoa","pitää","jälkeen",
    "myös","löytää","antaa","henkilö","päivä","työ","kaupunki","hyvä","pieni","mennä","nähdä",
    "käyttää","ilman","voi","elämä","maailma","sinulle","kysymys","tärkeä","aina","pitkä",
    "koti","jokainen","miten","miksi","osa","tapa","viime","nimi","kuulla","alla","koska",
    "täällä","kolme","lähellä","uudelleen","enemmän","vähemmän","tarvita","haluaa","ajatella",
    "odottaa","kirjoittaa","lukea","puhua","ymmärtää","tuntea","näyttää","lähteä","jäädä",
    "istua","seistä","nousta","laskea","avata","sulkea","katsoa","kuunnella","vastata","kertoa"
  ]
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWords(lang, count) {
  const pool = WORDS[lang];
  const result = [];
  while (result.length < count) {
    result.push(...shuffle(pool).slice(0, Math.min(pool.length, count - result.length)));
  }
  return result.slice(0, count);
}

function makeSentence(lang) {
  const words = pickWords(lang, rand(6, 18));
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const punct = Math.random() < 0.85 ? '.' : (Math.random() < 0.5 ? '!' : '?');
  return words.join(' ') + punct;
}

function makeParagraph(lang) {
  const sentences = [];
  for (let i = 0; i < rand(4, 8); i++) sentences.push(makeSentence(lang));
  return sentences.join(' ');
}

function generate() {
  const lang = document.getElementById('lang').value;
  const paras = [];
  for (let i = 0; i < 10; i++) paras.push(makeParagraph(lang));
  document.getElementById('output').value = paras.join('\n\n');
}

function copyText() {
  const text = document.getElementById('output').value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const fb = document.getElementById('copyFeedback');
    fb.classList.add('show');
    setTimeout(() => fb.classList.remove('show'), 1800);
  });
}

generate();
