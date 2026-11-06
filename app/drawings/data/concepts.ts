// What a click explains: [what it is, why it matters]. Keyed by the id given to hint().
export const concepts: Record<string, [what: string, why: string]> = {
  // 3.2 · The need behind the need
  'nb-stones': [
    'A dashboard graveyard: reports that exist but that almost nobody opens.',
    'More than 600 on Tableau, about one in ten used regularly. The need was never more dashboards.',
  ],
  'nb-queue': [
    'A bottleneck: the one stage that limits what a whole system can produce.',
    'Requests arrived faster than a small team could answer them. Working harder would not have cleared the queue.',
  ],
  'nb-seats': [
    'Self-service analytics: teams build their own analyses from prepared Data, without waiting for a Data team.',
    'It removes the queue. I took active analysis producers from 2 to 25.',
  ],
  'nb-binder': [
    'A passenger-care plan: what each person does for passengers when service is disrupted.',
    'A plan for each of 42 stations stays on paper until people on the ground can carry it out.',
  ],
  'nb-agent': [
    'The people working in the station, with passengers, during a disruption.',
    'They were the need behind the plans. I gave them the tools and information to act.',
  ],
  'nb-board': [
    'Information screens on the platforms.',
    'A passenger who knows what is happening can decide what to do next.',
  ],
  'nb-assess': [
    'An indicator: a measure followed over time against a target.',
    'Without one, nobody could tell whether a plan was carried out or whether the equipment did its job.',
  ],
  'nb-iv': [
    'An automated Data test: a check that runs by itself and says whether Data meets a rule.',
    '525 run every day, in place of manual controls.',
  ],
  'nb-patient': [
    'The Data the whole company relies on to decide and operate.',
    'Data can be unwell long before a report shows a symptom. That is why its health must be watched.',
  ],
  'nb-thermo': [
    'A single test: one question about one table at one moment.',
    'It was what I was asked for. One reading does not say how the patient is.',
  ],
  'nb-monitor': [
    'Data observability: continuously knowing the state of Data and where it degrades.',
    'It was the need behind the request for tests: seeing Data health as a whole, with its trends.',
  ],
  'nb-oncall': [
    'Notify: sending the alert to the team that can act on it.',
    'Qualified and prioritised alerts get treated quickly.',
  ],

  'nb-platform': [
    'A Data Platform: the place where a company’s Data is collected, modelled and made available.',
    'Teams cannot build their own analyses without prepared Data to start from.',
  ],
  'nb-metabase': [
    'Metabase: a BI tool made for people who do not write SQL.',
    'I chose a tool the teams could use themselves.',
  ],
  'nb-training': [
    'A short training on the Data and on the BI tool.',
    'A tool alone changes nothing: people have to be able to use it.',
  ],
  'nb-line': [
    'RER C: a Paris-region rail line, here with its 42 stations.',
    'This was the network the care plans had to work on, with trains running.',
  ],
  'nb-source': [
    'What is happening on the line during a disruption, and what to do about it.',
    'People on the ground can act only if it reaches them in time.',
  ],
  'nb-prov': [
    'Companies that provide the welcome service for passengers.',
    'They are with passengers, so they need the same information and tools as staff.',
  ],
  'nb-auth': [
    'Local authorities around each station.',
    'A disruption spills outside the station, so they are part of the response.',
  ],
  'nb-speak': ['Spoken announcements in stations.', 'They reach passengers who are not looking at a board.'],
  'nb-detect': [
    'Detect: spotting that something in the Data is wrong.',
    'Nothing can be treated before it is seen.',
  ],
  'nb-qualify': [
    'Qualify: deciding what an alert means and whether it is real.',
    'An alert nobody trusts gets ignored.',
  ],
  'nb-prio': ['Prioritise: ranking anomalies by what they put at risk.', 'Teams treat what matters first.'],
  'nb-govern': [
    'Govern: who owns what, and how the rules evolve.',
    'It keeps the platform working once it is shared across observability domains.',
  ],
  's-users': [
    'The teams who read and build analyses, without writing SQL.',
    'They are the reason the whole chain exists.',
  ],
  'e-grad': ['The end of the three-year degree.', 'Graduation expected in 2028.'],
  'e-sub-0': [
    'Computer Science: how software and machines work.',
    'The formal base under what I learned on the job.',
  ],
  'e-sub-1': [
    'Big Data: processing Data too large for one machine.',
    'The scale of the systems I want to work on next.',
  ],
  'e-sub-2': [
    'Machine Learning: algorithms that learn from Data.',
    'The theory behind what I first learned in practice.',
  ],

  // 3.3 · One Data system
  's-red': [
    'Redshift: Amazon’s cloud Data warehouse.',
    'Where the raw Data sat at the start: my starting point at FoodChéri.',
  ],
  's-pump': [
    'Ingestion: copying Data from source systems into the warehouse.',
    'Building every connector would have used the team’s time. After an audit, I selected a ready-made tool.',
  ],
  's-plant': [
    'A SQL model: a query, kept as code, that turns raw tables into a usable table.',
    'It puts the business logic in one place, so every team reads the same definitions.',
  ],
  's-tower': [
    'BigQuery: Google Cloud’s Data warehouse.',
    'It holds the curated tables the company builds on.',
  ],
  's-tap': [
    'Metabase: a BI tool made for people who do not write SQL.',
    'After a short training, teams could build their own analyses.',
  ],
  's-in-0': [
    'New records: rows that did not exist at the last run.',
    'Incremental logic must add them without reprocessing everything.',
  ],
  's-in-1': [
    'Updated records: rows that changed after being loaded.',
    'They must replace the old version, or the figures drift.',
  ],
  's-in-2': [
    'Late arrivals: events that reach the platform after their time window.',
    'Ignored, they silently falsify past figures.',
  ],
  's-raw': [
    'Raw layer: Data as it arrives, untransformed.',
    'Kept apart from curated Data, so any model can be rebuilt from the source.',
  ],
  's-df': [
    'Dataform: Google Cloud’s SQL transformation tool, equivalent to dbt.',
    'It runs nearly all the models as code, with incremental logic adapted to the ingestion.',
  ],
  's-tests': [
    'A reusable test: one Data check written once and applied to many tables.',
    'The same control is not rewritten each time. This was my first step into observability.',
  ],
  's-orch': [
    'Orchestration runs models in the right order. A tag policy groups the ones managed together.',
    'The logic becomes safer to change and easier to maintain.',
  ],
  's-cur': [
    'Curated layer: cleaned, modelled Data, ready to be read.',
    'It is what BI and AI consume. I moved its availability from daily toward hourly.',
  ],
  's-looker': [
    'Looker: Google Cloud’s BI platform.',
    'It gives the business access to curated Data, with shared definitions.',
  ],
  's-vertex': [
    'Vertex AI: Google Cloud’s platform for deploying AI models.',
    'AI uses read the same curated Data as BI.',
  ],
  'o-dbt': [
    'dbt Core: an open-source tool to write and run SQL transformations as code.',
    'The tests plug into the models where they already live: no redesign.',
  ],
  'o-marts': [
    'A data mart: tables shaped for one business use, here in Snowflake.',
    'It is what the business reads, so it is what must be protected.',
  ],
  'o-sensors': [
    'Elementary: an open-source observability tool for dbt, which stores and reports test results.',
    '525 automated tests a day: a sensor on every section.',
  ],
  'o-leak': [
    'A Data anomaly: a value, a volume or a delay outside what is expected.',
    'Caught before a business report shows it, it costs a fix, not a wrong decision.',
  ],
  'o-room': [
    'A common alert model: one way to detect, qualify and prioritise, for every observability domain.',
    'Without it, each team has its own rules and alerts cannot be compared.',
  ],
  'o-teams': [
    'The people who own the Data and act on its alerts.',
    'They get alerts worth acting on, and the trends that show where to focus.',
  ],

  // 4.1 · Logistics
  'lg-wh': [
    'A flow is what moves. Stock is what waits between two movements.',
    'Stock costs money while it waits, so every flow is a decision about what to hold.',
  ],
  'lg-air': [
    'Air freight: the fastest mode, and the most expensive per tonne.',
    'It shows the trade-off at its sharpest: speed against cost.',
  ],
  'lg-rail': [
    'Rail freight: heavy loads on fixed paths, on a network shared with others.',
    'Capacity must be secured in advance. This is the mode I then worked on at SNCF.',
  ],
  'lg-road': [
    'Road haulage: door-to-door delivery.',
    'The most flexible mode, and the last link of most chains.',
  ],
  'lg-river': [
    'Inland waterways: barges carrying large volumes at low speed.',
    'Low cost per tonne, but it only goes where the water goes.',
  ],
  'lg-sea': [
    'Maritime freight: containers across oceans.',
    'Very low cost per tonne over long distances, and slow.',
  ],
  'lg-promise': [
    'The service promise: delivered on time, at the agreed cost.',
    'It decides the mode, the stock and the route. The chain is built backwards from it.',
  ],
  'm-intern': [
    'A placement inside a company’s operations.',
    'The lessons met real constraints and real counterparts.',
  ],
  'm-cost': [
    'Cost control: knowing what each step of a chain costs.',
    'Every choice has a price, so time and money go on the same scale.',
  ],
  'm-law': [
    'Transport law: the rules on contracts, liability and each mode.',
    'A plan that breaks a rule does not run, however good it is.',
  ],
  'm-nego': [
    'Negotiation: reaching an agreement with a carrier or a client.',
    'What a chain needs is usually held by someone else. It has to be obtained.',
  ],
  'm-lang': [
    'Working languages for international transport.',
    'Goods cross borders, and so do the conversations about them.',
  ],
  'give-promise': [
    'The commitment made to the person waiting: what arrives, where, when.',
    'I arrange every decision backwards from it. At SNCF: a train at a given place and hour. In Data: the right Data, on time, for the people who decide.',
  ],
  'give-chain': [
    'Every link from origin to destination, taken as one system.',
    'A problem rarely shows where it starts. That is why I built monitoring that catches a Data anomaly before a business report shows it.',
  ],
  'give-limit': [
    'What cannot be changed in the time available: works, rules, capacity, budget.',
    'A plan that ignores one fails on the ground. My freight requests had to get through works and competing demands.',
  ],
  'give-trade': [
    'Arbitrating between speed and cost: the faster option costs more.',
    'No option is free, so I ask what the need really requires. With Data: how fresh must it be, and at what cost?',
  ],
  'give-obtain': [
    'Reaching an agreement with the party who holds what is needed.',
    'What I need is rarely mine to command. At VFLI, I convinced other companies to make a locomotive or a driver available.',
  ],

  // 4.2 · Self-taught, then Jedha
  'l-window': [
    'Self-teaching: learning outside any programme, on my own time.',
    'From 2019, in the evenings: how I started moving toward Data.',
  ],
  'l-python': ['Python: a general-purpose programming language.', 'The language of Data work.'],
  'l-sql': ['SQL: the language for querying databases.', 'Data lives in tables, and SQL is how you read it.'],
  'l-stats': [
    'Statistics: methods to describe Data and reason under uncertainty.',
    'It says whether a pattern is real or chance.',
  ],
  'l-laptop': [
    'Practice: a goal, a method and repetition on real exercises.',
    'A Data skill holds only once it has been practised.',
  ],
  'camp-0': [
    'Python: a general-purpose programming language.',
    'The language of Data work: the rest of the climb is built on it.',
  ],
  'camp-1': ['Exploring Data, then showing it in charts.', 'You cannot model what you have not read.'],
  'camp-2': [
    'Machine learning: algorithms that learn patterns from Data to predict or classify.',
    'Knowing how to evaluate a model tells you when it is worth using.',
  ],
  'camp-3': [
    'Deep learning: machine learning with neural networks.',
    'The method behind work on images, text and other unstructured Data.',
  ],
  'camp-4': [
    'Data engineering: building the pipelines that bring Data to where it is used.',
    'Every model depends on it.',
  ],
  'camp-5': [
    'A full case, from the question to the delivered answer.',
    'It tests the whole chain, end to end.',
  ],
  cert: [
    'A state-recognised certification: Data Science Developer, from Jedha.',
    'About 450 intensive hours that turned self-teaching into a qualification.',
  ],
  beneath: [
    'The pipelines and the Data quality every model relies on.',
    'A model is only as reliable as its input. This is where my move toward Data Engineering began.',
  ],
  'q-who': ['The decision someone has to take.', 'Starting here avoids building an answer nobody needs.'],
  'q-prob': [
    'A question turned into something measurable: a target, the Data, a success metric.',
    'A question that cannot be tested cannot be answered.',
  ],
  'q-test': [
    'A model with its metric and its known limits.',
    'An answer given without its limits can mislead the person deciding.',
  ],
  'q-ship': [
    'Delivery: the answer in the hands of the people who use it.',
    'A model nobody uses solves nothing.',
  ],
  'led-path': [
    'Jedha’s certified Data Science Developer programme.',
    'The step between self-teaching and a Data job.',
  ],
  'led-food': [
    'My first Data job, in FoodChéri’s Data team.',
    'Real users, from ingestion to self-service analytics.',
  ],
  'led-date': ['February 2021: the start of my Data career.', 'The move from operations to Data.'],

  // 4.3 · EFREI
  'e-work': [
    'Production: systems people rely on every day. Mine: Data Platforms, models and observability.',
    'I built them first and learned on the job, so I wanted to know what holds them up.',
  ],
  'e-props': [
    'Foundations: the software and systems knowledge beneath applied Data work.',
    'Experienced engineers at Heetch showed me how much rests on them.',
  ],
  'e-torch': [
    'EFREI: the engineering school most of them had studied at.',
    'That is why I enrolled in its engineering programme.',
  ],
  'e-eng': [
    'Experienced engineers I worked with at Heetch.',
    'They showed me how much rests on software and systems foundations.',
  ],
  'e-work2': ['Applying at Verisure what I study at EFREI.', 'What I learn goes straight into what I build.'],
  'e-y-0': ['First year of the engineering degree.', 'Done.'],
  'e-y-1': ['Second year of three.', 'In progress.'],
  'e-y-2': ['Final year.', 'Graduation expected in 2028.'],
  'e-crane': [
    'EFREI: an engineering school. My degree covers Computer Science, Big Data and Machine Learning.',
    'It lays formal foundations under my production work.',
  ],
  'e-app': [
    'Apprenticeship: a degree taken alongside a job in a company.',
    'I keep working on real systems while I study.',
  ],
  'e-work3': [
    'The production work standing on these foundations.',
    'Each block strengthens what I already build.',
  ],
  'e-b0': [
    'How to solve a problem step by step and write it as software.',
    'Software that holds starts here.',
  ],
  'e-b1': ['How Data is modelled, stored and queried.', 'A Data Platform depends on it at every layer.'],
  'e-b2': [
    'How machines and networks run programs and exchange information.',
    'It is what everything else runs on.',
  ],
  'e-b3': [
    'Computing and storage used as a service, at scale.',
    'My platforms run there, so I want to know what is under the service.',
  ],
  'e-b4': [
    'Processing Data too large for one machine by distributing it.',
    'It is the scale of the systems I want to work on next.',
  ],
  'e-b5': ['Algorithms that learn from Data.', 'The theory behind what I first learned in practice.'],

  // 5 · Why Europe
  'eu-sat': [
    'A space system: satellites and the ground stations that receive their Data. Shown: three of ESA’s stations, at Kiruna, Redu and Cebreros.',
    'It generates and moves Data at scale: the systems I want to work on next.',
  ],
  childhood: [
    'The stars, the universe and everything still unknown.',
    'An interest older than any job: why this field and not another.',
  ],
  exploration: [
    'Exploration: going where nobody has been. ESA’s JUICE probe, launched in 2023, is due at Jupiter in 2031.',
    'It is the part of space that has pulled me forward since childhood.',
  ],
  scifi: [
    'Science fiction: stories of what could come next.',
    'Where the interest started, long before I worked on any system.',
  ],
  larger: [
    'A mission: many people, across many disciplines, serving one goal.',
    'It is the kind of work I want: larger than one person.',
  ],
  'chain-0': [
    'Generate: instruments in orbit measure and produce the Data.',
    'Everything downstream depends on what they capture. It is upstream of my experience.',
  ],
  'chain-1': [
    'Transport: the downlink sends Data from the spacecraft to ground stations.',
    'Contact windows and bandwidth decide what arrives. It is upstream of my experience.',
  ],
  'chain-2': [
    'Process: ground systems turn the received Data into products.',
    'Data processing is where my experience sits today.',
  ],
  'chain-3': [
    'Use: operations, science and services rely on those products.',
    'Data use is where my experience sits today.',
  ],
  'chain-today': [
    'Where my work has been so far: where Data is processed and used.',
    'It is my starting point, not prior space experience.',
  ],
  upstream: [
    'Upstream: the production systems that generate and move Data, before anyone uses it.',
    'The part I want to understand and build next.',
  ],
  'tr-net': [
    'The rail network as a live system: trains keep moving while decisions are taken.',
    'A decision taken late or in the wrong place affects everything downstream.',
  ],
  'tr-cap': [
    'Securing the network capacity freight customers need.',
    'It taught me to keep a request alive for years, through works and competing demands.',
  ],
  'tr-rec': [
    'Getting trains running again after an unexpected event.',
    'Day and night, I had to obtain an answer while the system kept moving.',
  ],
  'tr-care': [
    'Taking care of passengers when service is disrupted.',
    'I learned to make a plan usable by the people on the ground.',
  ],
  'tr-people': [
    'Regional teams and station staff: those who carry out the decision.',
    'An answer that does not reach them changes nothing.',
  ],
  'tr-plat': [
    'A Data Platform: one place where Data is collected, modelled and made available to everyone.',
    'FoodChéri’s first one. Every team starts from the same Data and the same definitions.',
  ],
  'tr-tool': [
    'Choosing Metabase, a BI tool made for people who do not write SQL.',
    'The choice of tool decides who can work with the Data.',
  ],
  'tr-train': [
    'Teaching teams to use the Data and the tool.',
    'A tool alone changes nothing: people have to be able to use it.',
  ],
  'tr-support': [
    'Helping teams when they get stuck.',
    'It keeps them building analyses instead of going back to a queue.',
  ],
  'tr-users': [
    'People who actively build their own analyses.',
    'I took them from 2 to 25. The capability no longer rests on two people.',
  ],
  'tr-team-0': [
    'A team reading its own daily figures. Example: operations.',
    'It sees a problem the same day, without asking anyone.',
  ],
  'tr-team-1': ['A team comparing its volumes. Example: supply.', 'It can plan from Data it opens itself.'],
  'tr-team-2': [
    'A team splitting results by segment. Example: marketing.',
    'It can test a question as soon as it has one.',
  ],
  'tr-team-3': [
    'A team following a trend over time. Example: finance.',
    'Everyone reads the same figure, from the same source.',
  ],
  'tr-team-4': [
    'A team working from a shared table. Example: customer care.',
    'The answer is at hand when a customer is waiting.',
  ],
  'tr-team-5': [
    'A team exploring two measures together. Example: product.',
    'New questions do not wait in a queue.',
  ],
  'tr-answer': [
    'What people see: a dashboard, a figure, a model output.',
    'It is only as reliable as what sits beneath it.',
  ],
  'tr-logic': [
    'The SQL models that turn raw Data into usable tables, at Heetch.',
    'It is where a figure gets its meaning.',
  ],
  'tr-tests': [
    'Automated checks that Data meets a rule.',
    'A wrong figure gets caught before someone uses it.',
  ],
  'tr-orch': [
    'Running models in the right order, on schedule.',
    'It makes the logic safer to change and easier to maintain.',
  ],
  'tr-monitor': [
    'One way to follow Data health across observability domains, at Verisure.',
    'Teams see the state of Data and its trends, not isolated results.',
  ],
  'tr-qualify': [
    'Deciding what an alert means and how urgent it is.',
    'An alert nobody trusts gets ignored.',
  ],
  'col-0': ['Generate: instruments in orbit produce the Data.', 'New to me: what I am moving toward.'],
  'col-1': ['Move: downlink and ground stations carry the Data.', 'New to me: what I am moving toward.'],
  'col-2': ['Process: ground systems turn Data into products.', 'My Data engineering applies here.'],
  'col-3': [
    'Use: operations, science and services rely on the products.',
    'My work on access to Data applies here.',
  ],
  'col-4': ['Operate: running the whole system, live.', 'My years of live decisions at SNCF apply here.'],
  'mx-0': [
    'SNCF: decisions inside a moving network, every day.',
    'A running system does not wait for a perfect answer.',
  ],
  'mx-1': [
    'FoodChéri: a Data Platform and BI every team could use.',
    'What I build has to work for other people.',
  ],
  'mx-2': [
    'Heetch and Verisure: transformation and observability beneath every answer.',
    'Reliable information is engineered, and I have done that work.',
  ],
  'mx-3': [
    'EFREI: what I am learning, toward the systems that generate and move Data.',
    'I have no prior space experience: this is how I close the gap.',
  ],
  'ring-0': [
    'Understanding: knowing how a system works from the inside.',
    'What Europe does not understand, it cannot judge or correct.',
  ],
  'ring-1': [
    'Operating: running a system with one’s own teams and tools.',
    'Control in daily use, not only on paper.',
  ],
  'ring-2': [
    'Relying on: being able to depend on a system in any circumstance.',
    'What independence means in practice.',
  ],
  sovereignty: [
    'Technological sovereignty: being able to build, run and depend on one’s own critical technology.',
    'It lets Europe act on its own choices.',
  ],
  'eu-rays': [
    'Europe’s positive influence: what its science, rules and technology bring beyond its borders.',
    'As a European citizen, I want to help preserve it.',
  ],
};
