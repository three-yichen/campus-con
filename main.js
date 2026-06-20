const ITEMS = [
  "早八",
  "逃课",
  "图书馆自习",
  "食堂高峰排队",
  "抢课失败",
  "抢课成功",
  "小组作业背锅",
  "凌晨赶 ddl",
  "期末周极限求生",
  "绩点焦虑发作",
  "奖学金申请",
  "社团活动",
  "学生会/组织工作",
  "参加竞赛",
  "实习",
  "考研/保研焦虑",
  "论文格式大战",
  "课堂展示硬撑",
  "答辩",
  "宿舍夜聊",
  "校园恋爱",
  "操场散步",
  "校医院开药",
  "体测渡劫",
  "军训",
  "打印店赛博救命",
  "校园卡丢失",
  "外卖进校",
  "讲座签到速通",
  "毕业照"
];

const LEVELS = [
  { value: 0, label: "没经历" },
  { value: 1, label: "浅尝一下" },
  { value: 2, label: "正在经历" },
  { value: 3, label: "深度体验" },
  { value: 4, label: "刻进 DNA" }
];

const TITLE_RULES = [
  { min: 0, title: "大学新手村" },
  { min: 20, title: "校园观察员" },
  { min: 40, title: "普通大学生" },
  { min: 60, title: "期末周幸存者" },
  { min: 80, title: "大学生活制霸者" },
  { min: 95, title: "校园传说" }
];

const TAG_RULES = [
  { tag: "ddl追逐者", items: ["凌晨赶 ddl", "期末周极限求生", "小组作业背锅"], minScore: 7 },
  { tag: "图书馆游民", items: ["图书馆自习", "论文格式大战", "课堂展示硬撑"], minScore: 7 },
  { tag: "绩点焦虑体", items: ["绩点焦虑发作", "奖学金申请", "考研/保研焦虑"], minScore: 7 },
  { tag: "校园活动家", items: ["社团活动", "学生会/组织工作", "讲座签到速通"], minScore: 7 },
  { tag: "青春叙事主角", items: ["宿舍夜聊", "校园恋爱", "操场散步"], minScore: 7 },
  { tag: "生存技能点满", items: ["校医院开药", "校园卡丢失", "打印店赛博救命", "外卖进校"], minScore: 9 },
  { tag: "卷王预备役", items: ["参加竞赛", "实习", "奖学金申请"], minScore: 7 }
];

const MAP_AREAS = [
  {
    name: "校门广场",
    items: ["军训", "早八", "抢课失败", "抢课成功"]
  },
  {
    name: "教学楼",
    items: ["课堂展示硬撑", "期末周极限求生", "小组作业背锅", "答辩", "凌晨赶 ddl"]
  },
  {
    name: "图书馆",
    items: ["图书馆自习", "论文格式大战", "绩点焦虑发作", "考研/保研焦虑"]
  },
  {
    name: "食堂生活区",
    items: ["食堂高峰排队", "外卖进校", "打印店赛博救命", "校园卡丢失"]
  },
  {
    name: "宿舍区",
    items: ["宿舍夜聊", "逃课", "校园恋爱"]
  },
  {
    name: "诗与远方",
    items: ["体测渡劫", "操场散步", "实习", "参加竞赛", "毕业照"]
  },
  {
    name: "支线任务",
    items: ["社团活动", "学生会/组织工作", "奖学金申请", "讲座签到速通", "校医院开药"]
  }
];

const STORAGE_KEY = "campus-conquest-state";
const THEME_STORAGE_KEY = "campus-conquest-theme";
const FOOTER_TEXT = "不是所有人都能绩点制霸，但每个人都可以期末周幸存。";
const DEFAULT_PERSONALITY_TAG = "普通大学生";
const DOMINATED_LEVEL = 3;
const MAX_PERSONALITY_TAGS = 3;
const EMPTY_DOMINATED_TEXT = "还在新手村探索中";
const EMPTY_STRONGEST_AREA_TEXT = "还在新手村入口";
const EMPTY_WEAKEST_AREA_TEXT = "还没正式开图";
const SHARE_IMAGE_FILE_NAME = "campus-conquest-report.png";
const SHARE_TITLE = "大学生制霸";
const COPY_SHARE_TITLE = "我的大学生制霸报告";
const SHARE_SUBTITLE = "一张图看看我的大学副本进度。";
const POSTER_KICKER = "CAMPUS LIFE REPORT";
const POSTER_MAP_TITLE = "我的大学生活版图";
const TITLE_SUMMARIES = {
  "大学新手村": "刚进校门，地图还很新。",
  "校园观察员": "校园地图开始亮起来了。",
  "普通大学生": "普通但不简单，副本正在推进。",
  "期末周幸存者": "期末周幸存者，正在稳定通关。",
  "大学生活制霸者": "大学生活制霸者，副本完成度很高。",
  "校园传说": "校园传说级选手，基本全图点亮。"
};
const MAX_LEVEL = Math.max(...LEVELS.map((level) => level.value));
const MAX_SCORE = ITEMS.length * MAX_LEVEL;
const THEMES = [
  {
    id: "butter",
    name: "期末周奶黄",
    bg: "#f6f0dd",
    paper: "#fffaf0",
    ink: "#27312d",
    muted: "#64695d",
    accent: "#c86d3a",
    accentSoft: "#ecd48d",
    button: "#49694f",
    tag: "#f4e6b6"
  },
  {
    id: "mint",
    name: "操场薄荷绿",
    bg: "#edf4e8",
    paper: "#fbfdf7",
    ink: "#20322c",
    muted: "#5d7167",
    accent: "#d26647",
    accentSoft: "#cfe3b8",
    button: "#3f7158",
    tag: "#dbeed7"
  },
  {
    id: "latte",
    name: "图书馆拿铁",
    bg: "#f3eadf",
    paper: "#fff9f2",
    ink: "#352a25",
    muted: "#76665e",
    accent: "#b86a45",
    accentSoft: "#e7cfaf",
    button: "#6a584c",
    tag: "#efe1ce"
  },
  {
    id: "night",
    name: "宿舍夜谈蓝",
    bg: "#e9eef4",
    paper: "#fbfcff",
    ink: "#243043",
    muted: "#61708a",
    accent: "#cf7054",
    accentSoft: "#d8e0ef",
    button: "#445f87",
    tag: "#dde7f7"
  },
  {
    id: "tomato",
    name: "青春番茄红",
    bg: "#f7ebe4",
    paper: "#fffaf5",
    ink: "#352721",
    muted: "#7a655d",
    accent: "#cf5a3b",
    accentSoft: "#f0c6a1",
    button: "#9c5842",
    tag: "#f6dfd0"
  },
  {
    id: "sage",
    name: "打印店灰绿",
    bg: "#eef0e7",
    paper: "#fcfcf7",
    ink: "#2b312c",
    muted: "#697068",
    accent: "#b86f4f",
    accentSoft: "#d9decf",
    button: "#56695d",
    tag: "#e3e7d7"
  }
];
const ITEM_INDEX_MAP = ITEMS.reduce((map, item, index) => {
  map[item] = index;
  return map;
}, {});

let selectedLevels = Array(ITEMS.length).fill(0);
let expandedAreaName = null;
let currentTheme = THEMES[0];

function getItemIndex(item) {
  return Object.prototype.hasOwnProperty.call(ITEM_INDEX_MAP, item) ? ITEM_INDEX_MAP[item] : -1;
}

function getLevelByValue(value) {
  return LEVELS.find((level) => level.value === value) || LEVELS[0];
}

function getThemeById(themeId) {
  return THEMES.find((theme) => theme.id === themeId) || null;
}

function pickRandomTheme(excludedId) {
  const availableThemes = THEMES.filter((theme) => theme.id !== excludedId);
  const themePool = availableThemes.length > 0 ? availableThemes : THEMES;
  const themeIndex = Math.floor(Math.random() * themePool.length);
  return themePool[themeIndex];
}

function applyTheme(theme) {
  currentTheme = theme;

  applyThemeVariables(document.documentElement, theme);
  renderSharePoster();
}

function saveTheme(themeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch (error) {
    setCopyStatus("当前浏览器无法保存主题皮肤。");
  }
}

function initializeTheme() {
  let theme = null;

  try {
    theme = getThemeById(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (error) {
    theme = null;
  }

  if (!theme) {
    theme = pickRandomTheme();
    saveTheme(theme.id);
  }

  applyTheme(theme);
}

function switchTheme() {
  const nextTheme = pickRandomTheme(currentTheme ? currentTheme.id : "");
  applyTheme(nextTheme);
  saveTheme(nextTheme.id);
  setCopyStatus(`已切换为「${nextTheme.name}」皮肤。`);
}

function renderItems() {
  const grid = document.getElementById("itemsGrid");

  grid.innerHTML = ITEMS.map((item, index) => {
    const currentValue = selectedLevels[index];
    const currentLevel = getLevelByValue(currentValue);

    return `
      <article class="item-card" data-index="${index}">
        <div class="item-card__head">
          <h3>${item}</h3>
          <span class="item-level-text" id="itemLevelText${index}">${currentLevel.label}</span>
        </div>
        <div class="level-options" role="radiogroup" aria-label="${item}">
          ${LEVELS.map((level) => {
            const isSelected = level.value === currentValue;

            return `
              <button
                class="level-button${isSelected ? " is-selected" : ""}"
                type="button"
                data-index="${index}"
                data-value="${level.value}"
                aria-pressed="${isSelected}"
                aria-label="${item}：${level.label}"
                title="${item}：${level.label}"
              >
                <span class="level-number">${level.value}</span>
              </button>
            `;
          }).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function getCurrentResult() {
  const totalScore = selectedLevels.reduce((sum, value) => sum + value, 0);
  const rate = MAX_SCORE === 0 ? 0 : Math.round((totalScore / MAX_SCORE) * 100);
  const checkedCount = selectedLevels.filter((value) => value > 0).length;

  return {
    totalScore,
    rate,
    checkedCount,
    title: getTitleByRate(rate)
  };
}

function getTitleByRate(rate) {
  return TITLE_RULES.reduce((matchedTitle, rule) => {
    return rate >= rule.min ? rule.title : matchedTitle;
  }, TITLE_RULES[0].title);
}

function getTitleSummary(title) {
  return TITLE_SUMMARIES[title] || TITLE_SUMMARIES[TITLE_RULES[0].title];
}

function getPersonalityTags() {
  return TAG_RULES.map((rule, index) => {
    const score = rule.items.reduce((sum, item) => {
      const itemIndex = getItemIndex(item);
      return sum + (itemIndex === -1 ? 0 : selectedLevels[itemIndex]);
    }, 0);

    return {
      tag: rule.tag,
      score,
      index,
      minScore: rule.minScore
    };
  })
    .filter((matchedRule) => matchedRule.score >= matchedRule.minScore)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, MAX_PERSONALITY_TAGS)
    .map((matchedRule) => matchedRule.tag);
}

function getDominatedItemsText() {
  const dominatedItems = ITEMS.filter((_, index) => selectedLevels[index] >= DOMINATED_LEVEL);
  const previewCount = 6;

  if (dominatedItems.length === 0) {
    return EMPTY_DOMINATED_TEXT;
  }

  if (dominatedItems.length > previewCount) {
    return `${dominatedItems.slice(0, previewCount).join("、")} 等 ${dominatedItems.length} 项`;
  }

  return dominatedItems.join("、");
}

function getAreaStatus(rate) {
  if (rate === 0) {
    return "未探索";
  }

  if (rate < 25) {
    return "刚开图";
  }

  if (rate < 50) {
    return "探索中";
  }

  if (rate < 75) {
    return "接近制霸";
  }

  return "已制霸";
}

function getAreaTone(rate) {
  if (rate === 0) {
    return "empty";
  }

  if (rate <= 24) {
    return "low";
  }

  if (rate <= 49) {
    return "mid";
  }

  if (rate <= 74) {
    return "high";
  }

  return "peak";
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return entities[character] || character;
  });
}

function applyThemeVariables(target, theme) {
  if (!target || !theme) {
    return;
  }

  target.style.setProperty("--theme-bg", theme.bg);
  target.style.setProperty("--theme-paper", theme.paper);
  target.style.setProperty("--theme-ink", theme.ink);
  target.style.setProperty("--theme-muted", theme.muted);
  target.style.setProperty("--theme-accent", theme.accent);
  target.style.setProperty("--theme-accent-soft", theme.accentSoft);
  target.style.setProperty("--theme-button", theme.button);
  target.style.setProperty("--theme-tag", theme.tag);
  target.style.setProperty("--theme-line", "rgba(31, 49, 49, 0.16)");
  target.style.setProperty("--theme-panel", theme.paper);
  target.style.setProperty("--theme-panel-strong", theme.paper);
}

function getPosterData() {
  const result = getCurrentResult();
  const personalityTags = getPersonalityTags();
  const strongestArea = getStrongestArea();
  const weakestArea = getWeakestArea();
  const areaStats = getAreaStats();

  return {
    rate: result.rate,
    checkedCount: result.checkedCount,
    title: result.title,
    titleSummary: getTitleSummary(result.title),
    personalityTags: personalityTags.length > 0 ? personalityTags : [DEFAULT_PERSONALITY_TAG],
    strongestArea,
    weakestArea,
    themeName: (currentTheme || THEMES[0]).name,
    areaStats,
    footerText: FOOTER_TEXT
  };
}

function getPosterAreaText(area, fallbackText) {
  return area ? `${area.name} ${area.rate}%` : fallbackText;
}

function renderPosterMapMarkup(data) {
  return `
    <div class="poster-map" aria-label="${POSTER_MAP_TITLE}">
      <div class="poster-map__grid">
        ${data.areaStats.map((area) => {
          const isStrongest = data.strongestArea && data.strongestArea.name === area.name;

          return `
            <article class="poster-map__node poster-map__node--${area.index + 1}${isStrongest ? " is-strongest" : ""}" data-tone="${area.tone}">
              <strong class="poster-map__name">${escapeHtml(area.name)}</strong>
              <span class="poster-map__rate">${area.rate}%</span>
              ${isStrongest ? '<span class="poster-map__badge">最强</span>' : ""}
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderPosterMarkup(data, mode) {
  const titleIdAttribute = mode === "preview" ? ' id="shareTitle"' : "";

  return `
    <article class="share-poster share-poster--${mode}" aria-label="分享结果卡片">
      <div class="share-poster__top">
        <p class="share-poster__kicker">${POSTER_KICKER}</p>
        <h2${titleIdAttribute}>${SHARE_TITLE}</h2>
        <p class="share-poster__subtitle">${SHARE_SUBTITLE}</p>
      </div>

      <div class="share-poster__hero">
        <div class="share-poster__metric">
          <span class="share-poster__label">制霸率</span>
          <strong class="share-poster__rate">${data.rate}%</strong>
          <p class="share-poster__meta">${data.checkedCount}/${ITEMS.length} 项已点亮</p>
        </div>
        <div class="share-poster__title-box">
          <span class="share-poster__label">称号</span>
          <strong>${escapeHtml(data.title)}</strong>
        </div>
      </div>

      <p class="share-poster__summary">${escapeHtml(data.titleSummary)}</p>

      <section class="share-poster__section">
        <div class="share-poster__section-head">
          <h3>${POSTER_MAP_TITLE}</h3>
        </div>
        ${renderPosterMapMarkup(data)}
      </section>

      <section class="share-poster__section share-poster__section--tags">
        <h3>人格标签</h3>
        <div class="share-tags">
          ${data.personalityTags.map((tag) => `<span class="share-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </section>

      <div class="share-poster__pill-row">
        <div class="share-poster__pill-card">
          <h3>最强副本</h3>
          <p class="share-strongest-area share-strongest-area--title">${escapeHtml(getPosterAreaText(data.strongestArea, EMPTY_STRONGEST_AREA_TEXT))}</p>
        </div>
        <div class="share-poster__pill-card">
          <h3>待通关副本</h3>
          <p class="share-strongest-area">${escapeHtml(getPosterAreaText(data.weakestArea, EMPTY_WEAKEST_AREA_TEXT))}</p>
        </div>
      </div>

      <p class="share-poster__theme">皮肤：${escapeHtml(data.themeName)}</p>
      <p class="share-poster__footer">${escapeHtml(data.footerText)}</p>
    </article>
  `;
}

function renderSharePoster() {
  const sharePosterContainer = document.getElementById("sharePosterContainer");

  if (!sharePosterContainer) {
    return;
  }

  sharePosterContainer.innerHTML = renderPosterMarkup(getPosterData(), "preview");
}

function getItemVisualState(item) {
  const itemIndex = getItemIndex(item);
  const level = itemIndex === -1 ? 0 : selectedLevels[itemIndex];

  if (level <= 0) {
    return {
      level: 0,
      state: "locked",
      label: "未点亮"
    };
  }

  if (level <= 2) {
    return {
      level,
      state: "explored",
      label: "已探索"
    };
  }

  return {
    level,
    state: "dominated",
    label: "已制霸"
  };
}

function getAreaStats() {
  return MAP_AREAS.map((area, index) => {
    const totalScore = area.items.reduce((sum, item) => {
      const itemIndex = getItemIndex(item);
      return sum + (itemIndex === -1 ? 0 : selectedLevels[itemIndex]);
    }, 0);
    const maxScore = area.items.length * MAX_LEVEL;
    const rate = maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);
    const clearedCount = area.items.reduce((count, item) => {
      const itemIndex = getItemIndex(item);
      return count + (itemIndex !== -1 && selectedLevels[itemIndex] > 0 ? 1 : 0);
    }, 0);

    return {
      ...area,
      index,
      totalScore,
      maxScore,
      rate,
      clearedCount,
      status: getAreaStatus(rate),
      tone: getAreaTone(rate)
    };
  });
}

function getStrongestArea() {
  const strongestArea = getAreaStats().reduce((bestArea, area) => {
    if (!bestArea) {
      return area;
    }

    if (area.rate > bestArea.rate) {
      return area;
    }

    if (area.rate === bestArea.rate && area.totalScore > bestArea.totalScore) {
      return area;
    }

    return bestArea;
  }, null);

  if (!strongestArea || strongestArea.rate === 0) {
    return null;
  }

  return strongestArea;
}

function getWeakestArea() {
  const weakestArea = getAreaStats().reduce((worstArea, area) => {
    if (!worstArea) {
      return area;
    }

    if (area.rate < worstArea.rate) {
      return area;
    }

    if (area.rate === worstArea.rate && area.totalScore < worstArea.totalScore) {
      return area;
    }

    return worstArea;
  }, null);

  if (!weakestArea || weakestArea.rate === 100) {
    return null;
  }

  return weakestArea;
}

function getPreferredExpandedAreaName(areaStats) {
  if (expandedAreaName && areaStats.some((area) => area.name === expandedAreaName)) {
    return expandedAreaName;
  }

  return null;
}

function renderAreaChips(items) {
  return items.map((item) => {
    const itemState = getItemVisualState(item);
    const levelLabel = getLevelByValue(itemState.level).label;

    return `
      <li class="campus-chip campus-chip--${itemState.state}" title="${item} · ${levelLabel}">
        <span class="campus-chip__dot" aria-hidden="true"></span>
        <span class="campus-chip__name">${item}</span>
      </li>
    `;
  }).join("");
}

function renderCampusNode(area, strongestArea) {
  const isStrongest = strongestArea && strongestArea.name === area.name;

  return `
    <article class="campus-node campus-node--${area.index + 1}${isStrongest ? " is-strongest" : ""}" data-tone="${area.tone}">
      <div class="campus-node__topline">
        <span class="campus-node__badge">区域 ${area.index + 1}</span>
        <span class="campus-node__rate">${area.rate}%</span>
      </div>
      <h3>${area.name}</h3>
      <p class="campus-node__meta">${area.clearedCount}/${area.items.length} 项已点亮</p>
      <div class="campus-node__progress" aria-label="${area.status}">
        <span style="width: ${area.rate}%"></span>
      </div>
      <p class="campus-node__status">${area.status}</p>
    </article>
  `;
}

function renderCampusMap() {
  const mapAreas = document.getElementById("mapAreas");

  if (!mapAreas) {
    return;
  }

  const areaStats = getAreaStats();
  const strongestArea = getStrongestArea();

  mapAreas.innerHTML = `
    <div class="campus-map__frame">
      <div class="campus-map__grid">
        ${areaStats.map((area) => renderCampusNode(area, strongestArea)).join("")}
      </div>
    </div>
  `;
}

function updateCampusMap() {
  renderCampusMap();
}

function renderAreaDetails() {
  const areaDetails = document.getElementById("areaDetails");

  if (!areaDetails) {
    return;
  }

  const areaStats = getAreaStats();
  const expandedName = getPreferredExpandedAreaName(areaStats);

  areaDetails.innerHTML = `
    <div class="section-head section-head--stacked area-details__head">
      <h3>区域详情</h3>
      <p class="section-subtitle">点击展开查看每个区域的具体项目。</p>
    </div>
    <div class="area-details__grid">
      ${areaStats.map((area) => `
        <details class="area-detail-card area-detail-card--${area.tone}" data-area-name="${area.name}"${area.name === expandedName ? " open" : ""}>
          <summary class="area-detail-card__summary">
            <span class="area-detail-card__lead">
              <span class="area-detail-card__dot" aria-hidden="true"></span>
              <span class="area-detail-card__name">${area.name}</span>
            </span>
            <span class="area-detail-card__stats">
              <span class="area-detail-card__status">${area.status}</span>
              <span class="area-detail-card__count">${area.clearedCount}/${area.items.length}</span>
              <span class="area-detail-card__rate">${area.rate}%</span>
              <span class="area-detail-card__chevron" aria-hidden="true"></span>
            </span>
          </summary>
          <ul class="area-detail-card__chips">
            ${renderAreaChips(area.items)}
          </ul>
        </details>
      `).join("")}
    </div>
  `;

  areaDetails.querySelectorAll(".area-detail-card").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        expandedAreaName = detail.dataset.areaName || null;

        areaDetails.querySelectorAll(".area-detail-card[open]").forEach((openDetail) => {
          if (openDetail !== detail) {
            openDetail.open = false;
          }
        });

        return;
      }

      if ((detail.dataset.areaName || "") === expandedAreaName) {
        expandedAreaName = null;
      }
    });
  });
}

function updateAreaDetails() {
  renderAreaDetails();
}

function updateResult() {
  const result = getCurrentResult();

  document.getElementById("scoreValue").textContent = result.totalScore;
  document.getElementById("maxScoreValue").textContent = MAX_SCORE;
  document.getElementById("checkedValue").textContent = `${result.checkedCount}/${ITEMS.length}`;
  document.getElementById("rateValue").textContent = `${result.rate}%`;
  document.getElementById("titleValue").textContent = result.title;
  document.getElementById("resultSummary").textContent = getTitleSummary(result.title);
  document.getElementById("progressFill").style.width = `${result.rate}%`;
  updateCampusMap();
  updateAreaDetails();
  renderSharePoster();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedLevels));
  } catch (error) {
    setCopyStatus("当前浏览器无法保存本地进度。");
  }
}

function loadState() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return Array(ITEMS.length).fill(0);
    }

    const parsedValue = JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return Array(ITEMS.length).fill(0);
    }

    return ITEMS.map((_, index) => {
      const value = Number(parsedValue[index]);
      return LEVELS.some((level) => level.value === value) ? value : 0;
    });
  } catch (error) {
    return Array(ITEMS.length).fill(0);
  }
}

function resetState() {
  selectedLevels = Array(ITEMS.length).fill(0);
  expandedAreaName = null;
  renderItems();
  updateResult();
  saveState();
  setCopyStatus("已重新生成空白版本。");
}

function copyShareText() {
  const posterData = getPosterData();
  const shareText = `${COPY_SHARE_TITLE}\n制霸率：${posterData.rate}%\n称号：${posterData.title}\n人格标签：${posterData.personalityTags.join(" / ")}\n最强副本：${getPosterAreaText(posterData.strongestArea, EMPTY_STRONGEST_AREA_TEXT)}\n待通关副本：${getPosterAreaText(posterData.weakestArea, EMPTY_WEAKEST_AREA_TEXT)}\n深度体验项目：${getDominatedItemsText()}\n皮肤：${posterData.themeName}\n${posterData.footerText}`;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopyStatus("文案已复制，可以去分享了。");
      })
      .catch(() => {
        copyShareTextFallback(
          shareText,
          "文案已复制，可以去分享了。",
          "自动复制失败，请手动复制弹窗中的文案。"
        );
      });
    return;
  }

  copyShareTextFallback(
    shareText,
    "文案已复制，可以去分享了。",
    "当前浏览器不支持 Clipboard API，请手动复制弹窗中的文案。"
  );
}

function copyShareTextFallback(text, successMessage, failureMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textarea);

  if (copied) {
    setCopyStatus(successMessage);
    return;
  }

  setCopyStatus(failureMessage);
  window.prompt("请手动复制：", text);
}

function createExportPoster() {
  const posterData = getPosterData();
  const exportPoster = document.createElement("div");

  exportPoster.className = "export-poster";
  exportPoster.setAttribute("aria-hidden", "true");
  exportPoster.style.position = "fixed";
  exportPoster.style.left = "-9999px";
  exportPoster.style.top = "0";
  exportPoster.style.width = "720px";
  applyThemeVariables(exportPoster, currentTheme || THEMES[0]);
  exportPoster.innerHTML = renderPosterMarkup(posterData, "export");

  return exportPoster;
}

function downloadShareImage() {
  if (typeof window.html2canvas !== "function") {
    setCopyStatus("本地 html2canvas 未加载，请放置 vendor/html2canvas.min.js；当前可长按或截图保存分享卡片。");
    return;
  }

  setCopyStatus("正在生成海报...");
  const exportPoster = createExportPoster();
  document.body.appendChild(exportPoster);

  window.html2canvas(exportPoster, {
    backgroundColor: currentTheme && currentTheme.bg ? currentTheme.bg : "#f6f0dd",
    scale: 2,
    useCORS: false,
    allowTaint: true,
    logging: true,
    foreignObjectRendering: false
  })
    .then((canvas) => {
      try {
        const imageDataUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imageDataUrl;
        downloadLink.download = SHARE_IMAGE_FILE_NAME;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setCopyStatus("海报已保存。");
      } catch (error) {
        console.error("Export download failed:", error);
        console.error(error);
        setCopyStatus("生成海报失败，请查看控制台错误，或截图保存。");
      }
    })
    .catch((error) => {
      console.error("html2canvas export poster failed:", error);
      console.error(error);
      setCopyStatus("生成海报失败，请查看控制台错误，或截图保存。");
    })
    .finally(() => {
      exportPoster.remove();
    });
}

function updateItemSelection(index, value) {
  selectedLevels[index] = value;

  const card = document.querySelector(`.item-card[data-index="${index}"]`);
  const levelText = document.getElementById(`itemLevelText${index}`);

  if (!card || !levelText) {
    return;
  }

  levelText.textContent = getLevelByValue(value).label;

  card.querySelectorAll(".level-button").forEach((button) => {
    const isSelected = Number(button.dataset.value) === value;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function setCopyStatus(message) {
  document.getElementById("copyStatus").textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  selectedLevels = loadState();
  renderItems();
  updateResult();

  document.getElementById("itemsGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".level-button");

    if (!button) {
      return;
    }

    const index = Number(button.dataset.index);
    const value = Number(button.dataset.value);

    updateItemSelection(index, value);
    updateResult();
    saveState();
    setCopyStatus("");
  });

  document.getElementById("resetButton").addEventListener("click", resetState);
  document.getElementById("copyButton").addEventListener("click", copyShareText);
  document.getElementById("downloadButton").addEventListener("click", downloadShareImage);
  document.getElementById("themeButton").addEventListener("click", switchTheme);
});
