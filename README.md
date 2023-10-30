# StubberPro (nome temporaneo)

Stubber-Pro è uno strumento progettato per aiutare gli sviluppatori a gestire, catturare e simulare chiamate HTTP  in progetti basati su Node.js. Sia che stiate sviluppando un'applicazione front-end o un servizio back-end, Stubber-Pro offre funzionalità pratiche come la cattura di chiamate, la memorizzazione delle risposte e la simulazione. Con un'interfaccia front-end integrata, che ne facilita la gestione. Stubber-Pro punta a essere un compagno affidabile nel processo di sviluppo, facilitando sviluppo, testing e debug.


# Casi d'uso:

Desidero offrirvi una panoramica più dettagliata riguardo le potenzialità e le motivazioni dietro a Stubber-Pro. Presentando alcuni casi d'uso concreti, spero di illustrarvi le situazioni e le esigenze che mi hanno spinto ad iniziare lo sviluppo di questo strumento. Buona lettura!

## Caso d'Uso: Ripristino Rapidamente il Funzionamento del Mio Progetto Angular con Stubber-Pro

Sto lavorando al mio progetto Angular, eseguendo il server di sviluppo sulla porta `localhost:4200`. Tutto sta procedendo senza intoppi, finché improvvisamente inizio a ricevere risposte d'errore dal back-end. Questi errori potrebbero:
  - ostacolare la mia produttività 
  - rallentare il mio flusso di lavoro
  - perdita di pazienza
  - risalita della bile

Fortunatamente, mi ricordo di aver installato Stubber-Pro precedentemente. Questo strumento ha silenziosamente e diligentemente registrato in memoria tutte le chiamate HTTP fatte fino a quel momento.

Decido quindi di aprire l'interfaccia grafica di Stubber-Pro, navigando all'indirizzo `localhost:4200/stubber-pro/admin`. Una volta all'interno, trovo un'interfaccia intuitiva e ben organizzata. Senza perdere tempo, clicco su un pulsante chiaramente etichettato per attivare le risposte mockate basate sulle chiamate registrate precedentemente.

In un attimo, Stubber-Pro prende il comando, utilizzando le risposte registrate come mock per le mie chiamate HTTP. Torno immediatamente al mio lavoro, senza alcuna interruzione, nonostante il malfunzionamento del back-end.

Grazie a Stubber-Pro, sono stato in grado di continuare a lavorare sul mio progetto Angular senza alcun intoppo, garantendo una continua efficienza e produttività nel mio flusso di sviluppo.

## Caso d'Uso: Utilizzo di Stubber-Pro per Garantire Consistenza nei Test Grafici con Cypress dopo una Migrazione

Mentre lavoro al mio progetto, prendo la decisione di fare una migrazione significativa a livello di UI: sostituire la libreria Angular-Material con PrimeNg. Dopo aver effettuato tutti i cambiamenti necessari, controllo e noto con soddisfazione che non ci sono errori di compilazione.

Tuttavia, la vera sfida è verificare che la nuova UI sia consistente con quella vecchia e che non ci siano differenze grafiche indesiderate. Per fare ciò, decido di utilizzare la funzione di comparazione grafica offerta da Cypress. Questo strumento, molto utile, cattura screenshot prima e dopo la migrazione, confrontando automaticamente le differenze.

Ma ecco che sorge un problema inaspettato: i dati ritornati dal BE sono molto differenti e di conseguenza ci sono molte differenze grafiche. 

Fortunatamente, avevo installato Stubber-Pro, che aveva diligentemente registrato le chiamate durante l'esecuzione dei test prima della migrazione. Attraverso l'interfaccia grafica di Stubber-Pro, ho salvato queste chiamate in locale e, dopo la migrazione, ho potuto riutilizzarle come dati mockati. In questo modo, posso rieseguire i test con Cypress avendo la certezza che qualsiasi differenza grafica rilevata sia dovuta esclusivamente alla migrazione delle librerie e non a variazioni nei dati.

Grazie alla combinazione di Cypress e Stubber-Pro, sono in grado di condurre un'analisi accurata e affidabile del mio progetto post-migrazione, garantendo che la UI sia esattamente come desidero.

## Struttura del Progetto:

Nel concepire Stubber-Pro, ho voluto dare priorità alla modularità e all'accessibilità. L'obiettivo era rendere il progetto facilmente modificabile e intuitivo per chiunque avesse esperienza con TypeScript e Angular.

Ecco come è organizzato Stubber-Pro:

1. **Monorepo NX**: Ho scelto di utilizzare un monorepo NX per garantire una gestione integrata e fluida delle diverse componenti del progetto.
2. **Libreria Stubber-Pro**: Questa è la spina dorsale del sistema, progettata per catturare, memorizzare e simulare le chiamate HTTP.
3. **Interfaccia Amministrativa (FE Angular)**: Una piattaforma front-end realizzata in Angular che consente agli utenti di gestire e controllare le funzionalità di Stubber-Pro in modo visivo e intuitivo.
4. **Progetto Dimostrativo (Angular + BE JsonServer)**: Ho incluso anche un progetto esemplificativo, composto da un'applicazione Angular e un back-end JsonServer, per permettere agli utenti di testare e comprendere al meglio le capacità della libreria.

Con questa struttura, spero di aver fornito uno strumento robusto e allo stesso tempo flessibile, che possa essere facilmente adattato e ampliato secondo le esigenze specifiche degli sviluppatori.

Certo, ecco il testo in formato Markdown (MD) relativo a quella risposta:

# Strumenti Simili

Sì, ci sono diversi software e librerie che forniscono funzionalità simili, specialmente nel contesto dello sviluppo e del testing. Alcuni di questi includono:

- **WireMock**: Un simulatore di servizi HTTP flessibile per testare in modo isolato.
- **Nock**: Una soluzione per simulare chiamate HTTP in Node.js, utile per testare API e servizi web.
- **Sinon**: Fornisce spies, stubs e mocks per JavaScript, aiutando gli sviluppatori a creare test più robusti.
- **Mirage JS**: Utile per mockare API in applicazioni JavaScript, in particolare in progetti Ember e React.
- **json-server**: Crea un falso REST API in pochi secondi basato su un file JSON.

Questi strumenti hanno le loro forze e debolezze, e la scelta dipende spesso dalle specifiche esigenze e preferenze di uno sviluppatore. 

Tuttavia, l'obiettivo di **Stubber-Pro** è di fornire una soluzione integrata e flessibile che possa soddisfare molte delle esigenze comuni nello sviluppo e nel testing.


# Istruzioni per l'Installazione e Uso:

### 1. Installa le dipendenze:
```shell
npm i
```

### 2. Compila e installa localmente la libreria:

Questo genera un file `.tgz` (ad esempio: `jucasoft-stubber-pro-0.0.1.tgz`) e lo installa come `optionalDependencies`.

```shell
npm run build-library
```

### 3. Avvia JsonServer:
```shell
npm run json-server
```

### 4. Esegui l'istanza locale dell'app Angular di test:
```shell
npm run server:dev:angular-to-test-library
```

### 5. Monitoraggio delle Chiamate:
- Apri [http://localhost:4200](http://localhost:4200) nel browser.
- visualizzerai una pagina completamente bianca con scritto ``aaaaaaa``
- Accedi al tab di monitoraggio della rete e aggiorna la pagina per visualizzare le chiamate che l'applicazione esegue in automatico.

### 6. Gestione delle Chiamate con Stubber-Pro:
- Accedi all'interfaccia amministrativa su [http://localhost:4200/stubber-pro/admin/](http://localhost:4200/stubber-pro/admin/).
- Funzionalità:
  - Visualizza chiamate memorizzate.
  - Esporta/Importa database di chiamate.
  - Aggiorna elenco chiamate.
  - Gestisci versioni.
  - Dettagli delle colonne:
    - **KEY**: Identificativo univoco della chiamata.
    - **created at**: Timestamp del salvataggio.
    - **active**: Attiva/disattiva risposta memorizzata.
    - **status**: Simula risposte o errori.
    - **Actions**: Modifica, cancella, ecc.
