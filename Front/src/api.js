const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5116";

// Backend returns everything as strings (see DTO_PlayerStats_Return),
// so we normalize to numbers here for the whole app to work with.
function normalize(dto) {
  return {
    clicks: Number(dto.clicks ?? dto.Clicks ?? 0),
    money: Number(dto.money ?? dto.Money ?? 0),
    autoclickLvl: Number(dto.autoclick_lvl ?? dto.Autoclick_lvl ?? 0),
    multiplierLvl: Number(dto.multiplier_lvl ?? dto.Multiplier_lvl ?? 0),
  };
}

async function request(path, method) {
  const res = await fetch(`${BASE_URL}${path}`, { method });

  if (!res.ok) {
    // Backend upgrade endpoints return a ProblemDetails body on 400 (e.g. max level)
    let detail = "Помилка запиту";
    try {
      const problem = await res.json();
      detail = problem.detail || problem.title || detail;
    } catch {
      /* body wasn't JSON, ignore */
    }
    throw new Error(detail);
  }

  return normalize(await res.json());
}

export const getStats = () => request("/Stats", "GET");
export const sendClick = () => request("/Click", "POST");
export const upgradeAutoclick = () => request("/Upgrades/Autoclick", "POST");
export const upgradeMultiplier = () => request("/Upgrades/Multiplier", "POST");
