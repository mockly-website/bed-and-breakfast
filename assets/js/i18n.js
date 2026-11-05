/* Lingua: italiano (nel codice HTML) e inglese (qui).
   Ogni elemento con data-t ha il testo italiano nella pagina: senza JavaScript il sito resta in italiano.
   La scelta si ricorda con localStorage (non è un cookie e non lascia la tua macchina). */
(function () {
  'use strict';

  var EN = {
  "Salta al contenuto": "Skip to content",
  "Sito dimostrativo di Mockly: l'attività è inventata.": "Demo site by Mockly: the business is made up.",
  "Vuoi un sito così?": "Want a site like this?",
  "Inizio": "Home",
  "Camere": "Rooms",
  "Dintorni": "Around here",
  "Prenota": "Book",
  "Dove vuoi andare?": "Where to?",
  "la giornata": "the day",
  "tre, con vista": "three, with a view",
  "mare e storia": "sea and history",
  "le tue date": "your dates",
  "Info in due secondi": "Info in two seconds",
  "Prezzi": "Prices",
  "Da 85 € a notte, colazione compresa. Prezzo di esempio.": "From €85 a night, breakfast included. Example price.",
  "Orari": "Times",
  "Check-in dalle 15 alle 20. Partenza entro le 10:30. Orari di esempio.": "Check-in from 3 to 8 pm. Check-out by 10:30 am. Example times.",
  "Dove": "Where",
  "Via dell'Esempio 1, nel Sinis. Il luogo è immaginato.": "Via dell'Esempio 1, in the Sinis. The place is imagined.",
  "Contatti": "Contact",
  "Su WhatsApp, anche solo per una domanda.": "On WhatsApp, even for just one question.",
  "Controlla le date": "Check the dates",
  "Scrivi su WhatsApp": "Write on WhatsApp",
  "Il messaggio arriva a Mockly, che ha costruito questo sito. Nessuna prenotazione viene fatta davvero.": "The message goes to Mockly, who built this site. No booking is actually made.",
  "ore 5:52 · il mare è ancora rosa": "5:52 am · the sea is still pink",
  "Svegliarsi quando": "Wake up while",
  "il mare ha ancora": "the sea still has",
  "i colori <em>dell'alba.</em>": "the colours <em>of dawn.</em>",
  "Bed & breakfast in Sardegna, con tre camere a pochi minuti dalla spiaggia. La colazione si fa in terrazza.": "Bed &amp; breakfast in Sardinia, with three rooms a few minutes from the beach. Breakfast is on the terrace.",
  "Scorri: qui la giornata dura una pagina ↓": "Scroll: here a day lasts one page ↓",
  "colazione": "breakfast",
  "Alle 7:40 profuma di pane.": "At 7:40 it smells of bread.",
  "Ogni mattina, sul tavolo della terrazza: pane del forno del paese, ricotta, miele, marmellate, frutta di stagione e caffè.": "Every morning, on the terrace table: bread from the village bakery, ricotta, honey, jam, seasonal fruit and coffee.",
  "Si serve fino alle 10.": "Served until 10.",
  "Intolleranze? Dillo la sera prima.": "Intolerances? Tell us the evening before.",
  "Parti presto? Il cestino è pronto.": "Leaving early? The packed breakfast is ready.",
  "Cornetti caldi": "Warm croissants",
  "gira": "flip",
  "Cornetti? Dillo la sera prima: li ordiniamo.": "Croissants? Tell us the night before: we order them.",
  "La terrazza, ore 8": "The terrace, 8 am",
  "La colazione sul mare, fino alle 10.": "Breakfast by the sea, until 10.",
  "Frutta di stagione": "Seasonal fruit",
  "Di stagione: oggi limoni.": "In season: lemons today.",
  "la casa": "the house",
  "Tre camere. Una terrazza. <em>Nessuna fretta.</em>": "Three rooms. One terrace. <em>No rush.</em>",
  "Check-in dalle 15 alle 20. Arrivi prima? Lasci le valigie e ti offriamo un caffè.": "Check-in from 3 to 8 pm. Arriving earlier? Leave your bags and we'll offer you a coffee.",
  "le camere": "the rooms",
  "Dove dormi.": "Where you sleep.",
  "Vedi le camere": "See the rooms",
  "Matrimoniale · bagno privato · vista mare": "Double bed · private bathroom · sea view",
  "da": "from",
  "a notte (esempio)": "a night (example)",
  "Per 2 o 3 · pareti in pietra · fresca": "For 2 or 3 · stone walls · cool",
  "Matrimoniale · tetto in legno · lampada": "Double bed · wooden roof · lamp",
  "Scorri di lato": "Swipe sideways",
  "dintorni": "around here",
  "Il pomeriggio è tuo.": "The afternoon is yours.",
  "Una cala per il bagno, un nuraghe, un borgo sul mare. Sulla mappa disegnata a mano trovi tutto, con i minuti di esempio.": "A cove for a swim, a nuraghe, a village by the sea. On the hand-drawn map you'll find everything, with example minutes.",
  "Apri la mappa": "Open the map",
  "10 min · la cala": "10 min · the cove",
  "45 min · un nuraghe": "45 min · a nuraghe",
  "70 min · il borgo": "70 min · the village",
  "tramonto": "sunset",
  "Alle 18:45 si sale in terrazza.": "At 6:45 pm we go up to the terrace.",
  "Porta una maglia: dopo il tramonto il vento gira.": "Bring a sweater: after sunset the wind turns.",
  "22:00, la luna sul mare": "10 pm, the moon over the sea",
  "Resta anche stanotte.": "Stay tonight too.",
  "Ostro è il vento di mezzogiorno. Ha dato il nome alla casa.": "Ostro is the south wind. It gave the house its name.",
  "Sito dimostrativo realizzato da Mockly. L'attività è inventata.": "Demo site made by Mockly. The business is made up.",
  "Vuoi un sito così per il tuo lavoro?": "Want a site like this for your business?",
  "Scrivici su WhatsApp": "Write to us on WhatsApp",
  "Via dell'Esempio 1. Il luogo è immaginato nel Sinis, in Sardegna. Tempi e distanze sono di esempio.": "Via dell'Esempio 1. The place is imagined in the Sinis, in Sardinia. Times and distances are examples.",
  "Pagine": "Pages",
  "Onestà": "Honesty",
  "Prezzi, orari, disponibilità e camere sono di esempio. Nessuna recensione e nessun voto. Nessun cookie e nessuna statistica.": "Prices, times, availability and rooms are examples. No reviews and no ratings. No cookies and no analytics.",
  "Crediti delle foto": "Photo credits",
  "Foto di repertorio da Unsplash: non mostrano la struttura e non sempre sono state scattate in Sardegna.": "Stock photos from Unsplash: they don't show the property and weren't always taken in Sardinia.",
  "Casa Ostro, inizio": "Casa Ostro, home",
  "Menu principale": "Main menu",
  "Passa all'inglese": "Switch to Italian",
  "Apri il menu": "Open the menu",
  "Chiudi il menu": "Close the menu",
  "Lingua": "Language",
  "Chiudi": "Close",
  "Il mare all'alba, con il cielo rosa e l'acqua azzurra.": "The sea at dawn, with a pink sky and blue water.",
  "Due cornetti su un piatto bianco, accanto a un cappuccino.": "Two croissants on a white plate, next to a cappuccino.",
  "Due sedie e un tavolo su una terrazza, con il mare sullo sfondo.": "Two chairs and a table on a terrace, with the sea behind.",
  "Limoni su un tavolo davanti al mare.": "Lemons on a table in front of the sea.",
  "Le tre camere. Scorri di lato.": "The three rooms. Swipe sideways.",
  "Camera Alba: letto bianco e finestra luminosa.": "Alba room: white bed and a bright window.",
  "Camera Meriggio: parete in pietra e luce calda.": "Meriggio room: stone wall and warm light.",
  "Camera Sera: letto sotto una finestra inclinata, con una lampada accesa.": "Sera room: a bed under a tilted window, with a lamp on.",
  "Una cala con l'acqua turchese tra le rocce.": "A cove with turquoise water between the rocks.",
  "Un nuraghe di pietra su un prato.": "A stone nuraghe on a meadow.",
  "Un borgo sul mare visto dall'alto.": "A village by the sea seen from above.",
  "Il sole che tramonta dietro le montagne, sul mare.": "The sun setting behind the mountains, over the sea.",
  "La luna piena sul mare, di notte.": "The full moon over the sea, at night.",
  "Info rapide: prezzi, orari, dove siamo": "Quick info: prices, times, where we are",
  "Casa Ostro — bed & breakfast sul mare in Sardegna (sito dimostrativo)": "Casa Ostro — bed &amp; breakfast by the sea in Sardinia (demo site)",
  "Sito dimostrativo di Mockly per un bed & breakfast: una giornata dall'alba alla sera, tre camere, i dintorni e la richiesta di date su WhatsApp. L'attività è inventata.": "Demo site by Mockly for a bed &amp; breakfast: a day from dawn to evening, three rooms, the surroundings and a date request on WhatsApp. The business is made up.",
  "Tre camere, tre momenti del giorno.": "Three rooms, three moments of the day.",
  "Camere, foto e prezzi sono di esempio. Servono a farti vedere come può essere la pagina delle camere del tuo bed & breakfast.": "Rooms, photos and prices are examples. They show how the rooms page of your bed &amp; breakfast could look.",
  "camera 1": "room 1",
  "La più luminosa. Il sole entra alle sei.": "The brightest. The sun comes in at six.",
  "2 ospiti": "2 guests",
  "Letto matrimoniale": "Double bed",
  "Bagno privato": "Private bathroom",
  "Vista mare": "Sea view",
  "a notte, colazione compresa (esempio)": "a night, breakfast included (example)",
  "Finestra a est: ti svegli con la luce": "East-facing window: you wake up with the light",
  "Aria condizionata e zanzariera": "Air conditioning and mosquito net",
  "Phon, asciugamani e wi-fi": "Hairdryer, towels and wi-fi",
  "camera 2": "room 2",
  "Pietra, fresco e silenzio nelle ore calde.": "Stone, coolness and silence in the hot hours.",
  "2 o 3 ospiti": "2 or 3 guests",
  "Matrimoniale e singolo": "Double and single bed",
  "Vista sul cortile": "Courtyard view",
  "Pareti spesse: dentro si sta fresco": "Thick walls: it stays cool inside",
  "Al piano terra, senza scale": "On the ground floor, no stairs",
  "Ventilatore a soffitto e wi-fi": "Ceiling fan and wi-fi",
  "camera 3": "room 3",
  "La più raccolta. Tetto in legno, una lampada e il cielo dalla finestra.": "The coziest. Wooden roof, a lamp and the sky through the window.",
  "Finestra sul tetto": "Roof window",
  "Una finestra inclinata sul cielo": "A tilted window onto the sky",
  "Lampada da lettura da entrambi i lati": "Reading lamp on both sides",
  "Tende oscuranti per dormire fino a tardi": "Blackout curtains to sleep in",
  "Sempre compreso.": "Always included.",
  "Colazione": "Breakfast",
  "In terrazza, fino alle 10.": "On the terrace, until 10.",
  "Wi-fi": "Wi-fi",
  "In tutte le camere.": "In all rooms.",
  "Arrivo tardi": "Late arrival",
  "Check-in con codice, anche dopo le 20.": "Self check-in with a code, even after 8 pm.",
  "Partenza": "Check-out",
  "Entro le 10:30. Le valigie puoi lasciarle.": "By 10:30. You can leave your bags.",
  "Camera Alba: un letto bianco e una finestra luminosa.": "Alba room: a white bed and a bright window.",
  "Camera Meriggio: una parete in pietra e luce calda.": "Meriggio room: a stone wall and warm light.",
  "Camera Sera: un letto sotto una finestra inclinata e una lampada accesa.": "Sera room: a bed under a tilted window and a lamp on.",
  "Le camere — Casa Ostro (sito dimostrativo)": "Rooms — Casa Ostro (demo site)",
  "Tre camere con tre modi di svegliarsi: Alba, Meriggio e Sera. Camere, foto e prezzi sono di esempio. Sito dimostrativo di Mockly, l'attività è inventata.": "Three rooms with three ways to wake up: Alba, Meriggio and Sera. Rooms, photos and prices are examples. Demo site by Mockly, the business is made up.",
  "Cosa fare, a che ora.": "What to do, and when.",
  "Il Sinis è la penisola dove immaginiamo la casa. I minuti sono di esempio: ogni attività ha i suoi.": "The Sinis is the peninsula where we imagine the house. Minutes are examples: every activity has its own.",
  "Tutto": "All",
  "Mare e natura": "Sea and nature",
  "Storia": "History",
  "Borghi e cibo": "Villages and food",
  "Il Sinis": "The Sinis",
  "non in scala": "not to scale",
  "Tocca un segnaposto sulla mappa: qui compare la sua storia.": "Tap a pin on the map: its story appears here.",
  "Il diario del pomeriggio.": "The afternoon diary.",
  "Foto di repertorio": "Stock photo",
  "minuti di esempio": "example minutes",
  "Il paese": "The village",
  "Alle 7 il forno ha già il pane. In piazza c'è un bar, e si arriva a piedi.": "At 7 the bakery already has bread. There's a café in the square, and you can walk there.",
  "Vedi sulla mappa": "Show on the map",
  "Una cala per il bagno": "A cove for a swim",
  "Si scende dagli scogli. Acqua trasparente e pochi ombrelloni. Porta le scarpe da scoglio.": "You climb down the rocks. Clear water and few umbrellas. Bring water shoes.",
  "Lo stagno di Cabras": "The Cabras lagoon",
  "Acqua bassa e cielo largo. Con un po' di fortuna si vedono i fenicotteri rosa.": "Shallow water and a wide sky. With a bit of luck you'll see pink flamingos.",
  "Is Arutas, la spiaggia di quarzo": "Is Arutas, the quartz beach",
  "Non è sabbia: sono granelli di quarzo, chiari e rotondi. Si cammina a piedi nudi.": "It's not sand: it's grains of quartz, pale and round. You walk barefoot.",
  "Tharros": "Tharros",
  "Una città fondata dai Fenici, sul mare. Colonne, strade di pietra e una torre che guarda il golfo.": "A city founded by the Phoenicians, by the sea. Columns, stone streets and a tower that watches over the gulf.",
  "Il nuraghe Losa": "The Losa nuraghe",
  "Una torre di pietra costruita senza malta, più di tremila anni fa. Si entra, si sale, si guarda lontano.": "A stone tower built without mortar, more than three thousand years ago. You go in, climb up, look far away.",
  "Bosa": "Bosa",
  "Case colorate lungo il fiume Temo e un castello sopra. Il posto giusto per la cena.": "Coloured houses along the river Temo and a castle above. The right place for dinner.",
  "Il pomeriggio finisce sempre in terrazza.": "The afternoon always ends on the terrace.",
  "Mappa e luoghi": "Map and places",
  "Filtra i luoghi": "Filter the places",
  "Mappa disegnata a mano del Sinis, non in scala.": "Hand-drawn map of the Sinis, not to scale.",
  "Un cortile con una scala ad arco.": "A courtyard with an arched staircase.",
  "Colline verso il mare, con il cielo chiaro.": "Hills towards the sea, under a clear sky.",
  "Una spiaggia chiara con l'acqua azzurra.": "A pale beach with blue water.",
  "Il mare al tramonto, con le onde sulla riva.": "The sea at sunset, with waves on the shore.",
  "Dintorni — Casa Ostro (sito dimostrativo)": "Around here — Casa Ostro (demo site)",
  "Una mappa disegnata a mano con le cose da fare vicino a un bed & breakfast nel Sinis, in Sardegna. Distanze di esempio. Sito dimostrativo di Mockly, l'attività è inventata.": "A hand-drawn map with things to do near a bed &amp; breakfast in the Sinis, Sardinia. Example distances. Demo site by Mockly, the business is made up.",
  "prenota": "book",
  "Quando vuoi svegliarti qui?": "When do you want to wake up here?",
  "Scegli le date. Prezzi e disponibilità sono di esempio: servono a mostrarti come funziona.": "Choose the dates. Prices and availability are examples: they show you how it works.",
  "Le date": "The dates",
  "Arrivo e partenza": "Arrival and departure",
  "Notti": "Nights",
  "Occupato (esempio)": "Booked (example)",
  "La camera": "The room",
  "Matrimoniale · fino a 2 ospiti": "Double bed · up to 2 guests",
  "Per 2 o 3 · pareti in pietra": "For 2 or 3 · stone walls",
  "Matrimoniale · tetto in legno": "Double bed · wooden roof",
  "Prezzo a notte di esempio, basso periodo. Cambia con la stagione.": "Example price per night, low season. It changes with the season.",
  "Chi viene": "Who's coming",
  "Ospiti": "Guests",
  "Come ti chiami?": "What's your name?",
  "Vuoi dirci qualcosa? (facoltativo)": "Anything else? (optional)",
  "Scegli le date: qui compare il riepilogo.": "Choose the dates: the summary appears here.",
  "Questa è una dimostrazione. Il messaggio WhatsApp arriva a Mockly, che ha fatto il sito, e nessuna prenotazione viene fatta davvero.": "This is a demo. The WhatsApp message goes to Mockly, who made the site, and no booking is actually made.",
  "Chiedi disponibilità su WhatsApp": "Ask about availability on WhatsApp",
  "Il messaggio, se WhatsApp non si apre:": "The message, if WhatsApp doesn't open:",
  "Copia il messaggio": "Copy the message",
  "Mese precedente": "Previous month",
  "Mese successivo": "Next month",
  "Giorni del mese": "Days of the month",
  "Un ospite in meno": "One guest fewer",
  "Un ospite in più": "One guest more",
  "Arrivo tardi, siamo celiaci, c'è un cane…": "Late arrival, we're coeliac, there's a dog…",
  "Prenota — Casa Ostro (sito dimostrativo)": "Book — Casa Ostro (demo site)",
  "Scegli le date sul calendario e prepara una richiesta di disponibilità su WhatsApp. Prezzi e disponibilità sono di esempio. Sito dimostrativo di Mockly, l'attività è inventata.": "Pick the dates on the calendar and prepare an availability request on WhatsApp. Prices and availability are examples. Demo site by Mockly, the business is made up.",
  "pagina smarrita": "lost page",
  "Questa pagina si è persa nel buio.": "This page got lost in the dark.",
  "L'indirizzo non esiste, o è stato spostato. Da qui puoi ripartire.": "The address doesn't exist, or it has moved. You can start over from here.",
  "Torna all'inizio": "Back to the start",
  "Guarda le camere": "See the rooms",
  "Pagina non trovata — Casa Ostro (sito dimostrativo)": "Page not found — Casa Ostro (demo site)",
  "La pagina che cercavi non c'è. Torna all'inizio, guarda le camere o controlla le date. Sito dimostrativo di Mockly.": "The page you were looking for isn't here. Go back to the start, see the rooms or check the dates. Demo site by Mockly.",
  "Foto non disponibile": "Photo not available"
};

  /* Frasi che il codice compone da solo: calendario, riepilogo, messaggio WhatsApp. */
  var DYN = {
    it: {
      locale: 'it-IT',
      hintStart: 'Tocca il giorno di arrivo.',
      hintEnd: 'Ora tocca il giorno di partenza.',
      hintOk: function (n, a, b) { return n + (n === 1 ? ' notte' : ' notti') + ': dal ' + a + ' al ' + b + '.'; },
      errTaken: 'In quel periodo c\'è una notte occupata (esempio). Prova altre date.',
      errStartTaken: 'Quella notte è occupata (esempio). Scegli un altro giorno di arrivo.',
      errLong: 'Per più di 14 notti scrivici: facciamo un prezzo apposta.',
      errDates: 'Scegli prima il giorno di arrivo e quello di partenza.',
      errName: 'Scrivi come ti chiami.',
      sumTitle: 'Il tuo riepilogo',
      room: 'Camera', dates: 'Date', nights: 'Notti', guests: 'Ospiti', total: 'Totale di esempio',
      maxGuests: function (n) { return 'Questa camera ospita fino a ' + n + (n === 1 ? ' persona.' : ' persone.'); },
      busy: 'Sto aprendo WhatsApp…',
      ready: 'Messaggio pronto. Se WhatsApp non si è aperto, copialo qui sotto.',
      copied: 'Copiato.',
      copyFail: 'Non riesco a copiare da solo: seleziona il testo e copialo.',
      avail: 'disponibile', taken: 'notte occupata (esempio)', past: 'giorno passato', sel: 'selezionato',
      msg: function (o) {
        return 'DIMOSTRAZIONE: sito di Casa Ostro (attività inventata, fatto da Mockly).\n' +
          'Richiesta di esempio: camera ' + o.room + ', dal ' + o.a + ' al ' + o.b + ' (' + o.n + (o.n === 1 ? ' notte' : ' notti') + '), ' +
          o.g + (o.g === 1 ? ' ospite' : ' ospiti') + '.\n' +
          'Prezzo di esempio: ' + o.total + ' €.\n' +
          'Nome: ' + o.name + '.' + (o.note ? '\nNote: ' + o.note : '') + '\n' +
          'Questo messaggio arriva a Mockly: nessuna prenotazione è stata fatta.';
      }
    },
    en: {
      locale: 'en-GB',
      hintStart: 'Tap your arrival day.',
      hintEnd: 'Now tap your departure day.',
      hintOk: function (n, a, b) { return n + (n === 1 ? ' night' : ' nights') + ': from ' + a + ' to ' + b + '.'; },
      errTaken: 'One of those nights is booked (example). Try other dates.',
      errStartTaken: 'That night is booked (example). Pick another arrival day.',
      errLong: 'For more than 14 nights, write to us: we make a special price.',
      errDates: 'Pick your arrival and departure days first.',
      errName: 'Please write your name.',
      sumTitle: 'Your summary',
      room: 'Room', dates: 'Dates', nights: 'Nights', guests: 'Guests', total: 'Example total',
      maxGuests: function (n) { return 'This room sleeps up to ' + n + (n === 1 ? ' person.' : ' people.'); },
      busy: 'Opening WhatsApp…',
      ready: 'Message ready. If WhatsApp did not open, copy it below.',
      copied: 'Copied.',
      copyFail: 'I cannot copy it for you: select the text and copy it.',
      avail: 'available', taken: 'booked night (example)', past: 'past day', sel: 'selected',
      msg: function (o) {
        return 'DEMO: Casa Ostro website (made-up business, built by Mockly).\n' +
          'Example request: ' + o.room + ' room, from ' + o.a + ' to ' + o.b + ' (' + o.n + (o.n === 1 ? ' night' : ' nights') + '), ' +
          o.g + (o.g === 1 ? ' guest' : ' guests') + '.\n' +
          'Example price: ' + o.total + ' €.\n' +
          'Name: ' + o.name + '.' + (o.note ? '\nNotes: ' + o.note : '') + '\n' +
          'This message goes to Mockly: no booking has been made.';
      }
    }
  };

  var KEY = 'ostro-lang';
  var lang = 'it';
  var missing = [];

  function norm(s) { return s.replace(/\s+/g, ' ').trim().replace(/&amp;/g, '&'); }
  function plain(s) { return s.replace(/&amp;/g, '&'); }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* senza memoria: va bene lo stesso */ } }

  function initial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'it') return q;
    return stored() === 'en' ? 'en' : 'it';
  }

  var dict = {};
  Object.keys(EN).forEach(function (k) { dict[norm(k)] = EN[k]; });

  function apply(next) {
    lang = next === 'en' ? 'en' : 'it';
    var en = lang === 'en';
    document.documentElement.lang = lang;
    missing = [];

    [].forEach.call(document.querySelectorAll('[data-t]'), function (el) {
      var first = el.__it === undefined;
      if (first) el.__it = el.innerHTML;
      if (first && !en) return;
      var k = norm(el.__it);
      if (en && dict[k] === undefined) missing.push(k);
      el.innerHTML = en && dict[k] !== undefined ? dict[k] : el.__it;
    });

    [].forEach.call(document.querySelectorAll('[data-ta]'), function (el) {
      el.__ita = el.__ita || {};
      el.getAttribute('data-ta').split(',').forEach(function (a) {
        if (el.__ita[a] === undefined) el.__ita[a] = el.getAttribute(a) || '';
        var k = norm(el.__ita[a]);
        if (en && dict[k] === undefined) missing.push(k);
        el.setAttribute(a, en && dict[k] !== undefined ? plain(dict[k]) : el.__ita[a]);
      });
    });

    var title = document.querySelector('title');
    if (title.__it === undefined) title.__it = title.textContent;
    var tk = norm(title.__it);
    title.textContent = en && dict[tk] ? plain(dict[tk]) : title.__it;
    [].forEach.call(document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]'), function (m) {
      if (m.__it === undefined) m.__it = m.getAttribute('content');
      var k = norm(m.__it);
      m.setAttribute('content', en && dict[k] ? plain(dict[k]) : m.__it);
    });

    [].forEach.call(document.querySelectorAll('[data-lang-toggle]'), function (b) { b.textContent = en ? 'IT' : 'EN'; });
    [].forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    if (en && missing.length && window.console) console.warn('Frasi senza traduzione:', missing);
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.Ostro = {
    apply: apply,
    initial: initial,
    remember: store,
    get lang() { return lang; },
    get d() { return DYN[lang]; },
    t: function (it) { var k = norm(it); return lang === 'en' && dict[k] !== undefined ? plain(dict[k]) : it; },
    missing: function () { return missing.slice(); }
  };
})();
