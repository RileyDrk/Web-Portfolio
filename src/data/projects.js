/**
 * Projects — edit summaries here; add screenshots & snippets per project.
 * Screenshots: public/projects/<slug>/your-image.png OR src/assets/projects/<slug>/
 * src in each screenshot must match the real filename (case-sensitive on some hosts).
 */

export const projects = [
  {
    slug: "blokus",
    title: "Blokus",
    subtitle: "Desktop game remake · team of 4",
    description:
      "Rebuilt the Blokus board game in Java alongside three classmates—from game rules and turn logic to a playable UI—so pieces, collisions, and win conditions behave like the real tabletop experience.",
    overview:
      "We built this over four full iterations with three classmates in my Java class. The goal was to recreate Blokus as a desktop Swing game—from an empty board through legal placement, turn order, piece state, and win checking. The course also required design work alongside the runnable build: logical architecture, sequence, class, and related UML diagrams that show how the UI, controller, and domain model fit together. I contributed to game logic and computer-player heuristics; the diagrams below summarize the layered structure of the app and the click-to-place flow on the board.",
    tech: ["Java", "Swing", "OOP", "Game logic"],
    highlight: "Collaboration",
    icon: "blokus",
    screenshots: [
      {
        src: "projects/blokus/screenshot-1.png",
        alt: "Blokus default board at the start of a new game",
        caption:
          "Default board with corner start markers, player piece trays, and turn controls before the first move.",
      },
      {
        src: "projects/blokus/screenshot-2.png",
        alt: "Blokus board while placing a piece",
        caption:
          "Placing a piece: a selected shape from the tray with a preview on the grid before the move is confirmed.",
      },
      {
        src: "projects/blokus/logical-arch.png",
        alt: "Logical architecture diagram for the Blokus desktop application",
        caption:
          "Layered design: Swing presentation (frames, panels, saved-games dialog), application control (GameController and startup), domain model (board, pieces, players), and foundation services (graphics assets and saved games).",
      },
      {
        src: "projects/blokus/sequence-diagram.png",
        alt: "Sequence diagram for placing a piece after a board click",
        caption:
          "Click handling on GameBoard: validate placement with GameController, update Piece and Player state, repaint, then advance the turn.",
      },
    ],
    snippets: [
      {
        title: "Computer player move heuristic",
        language: "java",
        caption:
          "From Group 1 Iteration 4 (GameController.java): scores each legal move by piece size, board center, blocking rivals, and opening new corner attachment points.",
        code: `private double evaluateMove(MoveOption move, int playerIdx) {
    double score = 0;

    // copying it so we dont mess anything up till we actually wanna make the move
    Piece test = move.piece.copy();
    if (move.flipped) test.flip();
    for (int i = 0; i < move.rotations; i++) test.rotate();

    // just multiplies by the length so if its 5 length the piece is prefered but it still
    // will play a smaller piece if its a way better move
    score += test.getCells().length * 5;

    // added a small reward for going for the middle of the board
    int center = GameBoard.GRID_SIZE / 2;
    for (int[] cell : test.getCells()) {
        int row = move.row + cell[0];
        int col = move.col + cell[1];

        int dist = Math.abs(center - row) + Math.abs(center - col);
        score += (20 - dist);
    }

    // the blocking hueristic
    // made the bot maximize bloking since it more fun if its aggressive
    score += countBlockedCorners(move, test, playerIdx) * 15;

    // the new corners heuristic
    score += countNewCorners(move, test, playerIdx) * 3;

    return score;
}

private int countBlockedCorners(MoveOption move, Piece test, int playerIdx) {
    int blocked = 0;

    // gets the cells of a move then will check the diagonals and then checks to see if it blocks anyone
    // if it did it adds the to the blocked counter which we apply in the evaluate move function ( * 15 )
    for (int[] cell : test.getCells()) {
        int row = move.row + cell[0];
        int col = move.col + cell[1];

        int[][] diagonals = {{-1,-1},{-1,1},{1,-1},{1,1}};

        for (int[] d : diagonals) {
            int newrow = row + d[0];
            int newcol = col + d[1];

            if (newrow >= 0 && newrow < GameBoard.GRID_SIZE && newcol >= 0 && newcol < GameBoard.GRID_SIZE) {

                int occupant = board[newrow][newcol];

                if (occupant != 0 && occupant != players[playerIdx].getPlayerNum()) {
                    blocked++;
                }
            }
        }
    }
    return blocked;
}

private int countNewCorners(MoveOption move, Piece test, int playerIdx) {
    int newcorners = 0;

    // works almost identical to the bloking but just checks for if its empty and then adds to the newcorners score
    for (int[] cell : test.getCells()) {
        int row = move.row + cell[0];
        int col = move.col + cell[1];

        int[][] diagonals = {{-1,-1},{-1,1},{1,-1},{1,1}};

        for (int[] d : diagonals) {
            int newrow = row + d[0];
            int newcol = col + d[1];

            if (newrow >= 0 && newrow < GameBoard.GRID_SIZE && newcol >= 0 && newcol < GameBoard.GRID_SIZE && board[newrow][newcol] == 0) {
                newcorners++;
            }
        }
    }
    return newcorners;
}`,
      },
    ],
  },
  {
    slug: "fsae-dashboard-telemetry",
    title: "FSAE Dashboard & Telemetry",
    subtitle: "FormulaMUN electric vehicle software | 2026-present",
    description:
      "Developing the dashboard and telemetry software for FormulaMUN's electric vehicle, turning live CAN data into clear vehicle and driver information.",
    overview:
      "As a FormulaMUN software team member, I am developing a C++ dashboard for displaying vehicle data and driver information, alongside Python-based telemetry software that collects, processes, and displays live data from the CAN system. I also built a testing interface and reusable modules to support future vehicle integration and development.",
    tech: ["C++", "Python", "CAN", "Real-time data"],
    highlight: "FormulaMUN",
    icon: "telemetry",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    subtitle: "Live conditions in the browser",
    description:
      "A responsive weather dashboard built with React and Vite, styled with Tailwind CSS. Search locations, scan the current snapshot, and keep the layout comfortable on phone and desktop.",
    overview:
      "Hosted at weather.rileydrake.ca on an NGINX-backed deployment. The React and Vite front end geocodes city search, pulls multi-day forecast and environmental data from Open-Meteo, and keeps hourly charts and day summaries readable on phone and desktop.",
    tech: ["React", "Vite", "Tailwind CSS", "APIs"],
    github: "https://github.com/RileyDrk/Weather-Dashboard",
    demo: "https://weather.rileydrake.ca",
    highlight: "Solo build",
    icon: "weather",
    screenshots: [
      {
        src: "projects/weather-dashboard/screenshot-1.png",
        alt: "Weather Dashboard showing current conditions in St. John's, Newfoundland and Labrador, in dark mode",
        caption: "City search, saved locations, and current conditions including temperature, humidity, wind, and visibility.",
      },
    ],
    snippets: [
      {
        title: "Resilient Open-Meteo requests",
        language: "javascript",
        caption:
          "From App.jsx: shared fetch helper with abort timeouts and short backoff between retries before surfacing an error.",
        code: `async function fetchJsonWithRetry(url, retries = 2, timeoutMs = 10000) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(\`Request failed (\${response.status})\`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error("Request failed");
}`,
      },
      {
        title: "Ranked city search",
        language: "javascript",
        caption:
          "Open-Meteo geocode hits are merged and scored locally so queries like “St Johns Newfoundland” prefer the right settlement.",
        code: `function rankGeocodeResults(originalQuery, results) {
  const tokens = tokenizeGeoQuery(originalQuery);
  const origNorm = normalizeGeoMatchString(originalQuery);
  const scored = [];

  for (const item of results) {
    const haystack = [item.name, item.admin1, item.admin2, item.country].filter(Boolean).join(" ");
    const hayNorm = normalizeGeoMatchString(haystack);
    let score = 0;

    for (const token of tokens) {
      if (geoTokenHitsHaystack(token, hayNorm)) score += 28;
    }
    if (origNorm.length >= 4 && hayNorm.includes(origNorm)) score += 100;

    const population = Number(item.population) || 0;
    if (population > 0) score += Math.min(36, Math.log10(population + 1) * 7);

    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || (Number(b.item.population) || 0) - (Number(a.item.population) || 0));
  return scored.map(({ item }) => item);
}`,
      },
      {
        title: "Forecast load pipeline",
        language: "javascript",
        caption:
          "Search resolves to coordinates, then the forecast request runs with a request id so stale responses cannot overwrite newer searches.",
        code: `async function fetchWeather(searchTarget) {
  const requestId = ++latestRequestRef.current;
  const trimmedCity = String(searchTarget).trim();
  if (!trimmedCity) return;

  setError("");
  setIsLoading(true);

  try {
    const ranked = await fetchRankedGeocodeResults(trimmedCity);
    const location = ranked[0];
    if (!location) throw new Error("City not found. Try another name.");

    const weatherData = await fetchJsonWithRetry(
      \`https://api.open-meteo.com/v1/forecast?latitude=\${location.latitude}&longitude=\${location.longitude}&forecast_days=\${FORECAST_API_DAYS}&current=temperature_2m,apparent_temperature,relative_humidity_2m,windspeed_10m,weathercode&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,windspeed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,windspeed_10m_max,uv_index_max,sunrise,sunset&timezone=auto&temperature_unit=\${unit}\`
    );
    if (requestId !== latestRequestRef.current) return;

    setWeather(weatherData);
    setActiveCity(\`\${location.name}\${location.admin1 ? \`, \${location.admin1}\` : ""}\${location.country ? \`, \${location.country}\` : ""}\`);
    fetchEnvironmentalData(location.latitude, location.longitude, requestId);
  } catch {
    if (requestId !== latestRequestRef.current) return;
    setError("Unable to fetch weather right now. Please try again.");
    setWeather(null);
  } finally {
    if (requestId !== latestRequestRef.current) return;
    setIsLoading(false);
  }
}`,
      },
    ],
  },
  {
    slug: "a-star-search-ai",
    title: "A* Search & AI",
    subtitle: "Pathfinding algorithms | Winter 2026",
    description:
      "Implemented A* pathfinding with priority queues, open and closed lists, and heuristics for different movement costs and search strategies.",
    overview:
      "This artificial intelligence project focused on implementing and evaluating A* pathfinding. I worked with priority queues, open and closed lists, and heuristic approaches to compare how movement costs and search strategies affect results.",
    tech: ["Java", "A* Search", "Algorithms", "Heuristics"],
    highlight: "AI coursework",
    icon: "search",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    subtitle: "Responsive personal portfolio",
    description:
      "The website you are viewing: a responsive portfolio designed to showcase my work, skills, and development process through detailed project pages.",
    overview:
      "I built this portfolio as a central place for my work and as a project in its own right. The site is composed of reusable React components and data-driven content, making it straightforward to add projects without duplicating page layouts. Each project gets its own route for a fuller write-up, screenshots, links, and code examples while the main page stays focused and easy to browse.",
    tech: ["React", "JavaScript", "HTML", "CSS"],
    demo: "https://rileydrake.ca",
    highlight: "Personal site",
    icon: "portfolio",
  },
  {
    slug: "nginx-hosting-server",
    title: "NGINX Hosting Server",
    subtitle: "Self-managed multi-site hosting",
    description:
      "A self-managed NGINX server that deploys and serves this portfolio alongside my other web projects from one hosting environment.",
    overview:
      "I configured and maintain an Ubuntu server for websites, applications, and dedicated game servers. I manage NGINX, DNS, SSL certificates, port forwarding, SteamCMD, and AMP alongside deployment workflows for multiple projects.",
    tech: ["NGINX", "Ubuntu", "SSL", "SteamCMD"],
    highlight: "Infrastructure",
    icon: "server",
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

/** The home carousel follows project order, capped at ten; the archive shows all. */
export const homeProjects = projects.slice(0, 10)
