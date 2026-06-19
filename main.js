const ITEMS = [
  "早八",
  "逃课",
  "图书馆自习",
  "食堂排队",
  "抢课失败",
  "抢课成功",
  "小组作业",
  "通宵赶 ddl",
  "期末周复习",
  "绩点焦虑",
  "奖学金申请",
  "社团活动",
  "学生会/组织工作",
  "参加竞赛",
  "实习",
  "考研/保研焦虑",
  "写论文",
  "课程展示/汇报",
  "答辩",
  "宿舍夜聊",
  "校园恋爱",
  "操场散步",
  "校医院",
  "体测",
  "军训",
  "打印店救命",
  "校园卡丢失",
  "外卖进校",
  "讲座签到",
  "毕业照"
];

const LEVELS = [
  { value: 0, label: "没体验" },
  { value: 1, label: "体验过" },
  { value: 2, label: "熟练" },
  { value: 3, label: "痛苦精通" },
  { value: 4, label: "已经麻木" }
];

const TITLE_RULES = [
  { min: 0, title: "大学新手村" },
  { min: 20, title: "校园观察员" },
  { min: 40, title: "普通大学生" },
  { min: 60, title: "期末周幸存者" },
  { min: 80, title: "大学生活制霸者" },
  { min: 95, title: "校园传说" }
];

const STORAGE_KEY = "campus-conquest-state";
const FOOTER_TEXT = "不是所有人都能绩点制霸，但每个人都可以期末周幸存。";
const MAX_LEVEL = Math.max(...LEVELS.map((level) => level.value));
const MAX_SCORE = ITEMS.length * MAX_LEVEL;

let selectedLevels = Array(ITEMS.length).fill(0);

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
              >
                <span class="level-number">${level.value}</span>
                <span class="level-label">${level.label}</span>
              </button>
            `;
          }).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function updateResult() {
  const totalScore = selectedLevels.reduce((sum, value) => sum + value, 0);
  const rate = MAX_SCORE === 0 ? 0 : Math.round((totalScore / MAX_SCORE) * 100);
  const checkedCount = selectedLevels.filter((value) => value > 0).length;
  const title = getTitleByRate(rate);

  document.getElementById("scoreValue").textContent = totalScore;
  document.getElementById("maxScoreValue").textContent = MAX_SCORE;
  document.getElementById("checkedValue").textContent = `${checkedCount}/${ITEMS.length}`;
  document.getElementById("rateValue").textContent = `${rate}%`;
  document.getElementById("titleValue").textContent = title;
  document.getElementById("progressFill").style.width = `${rate}%`;
}

function getTitleByRate(rate) {
  return TITLE_RULES.reduce((matchedTitle, rule) => {
    return rate >= rule.min ? rule.title : matchedTitle;
  }, TITLE_RULES[0].title);
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
  renderItems();
  updateResult();
  saveState();
  setCopyStatus("已重置所有项目。");
}

function copyShareText() {
  const rate = document.getElementById("rateValue").textContent;
  const title = document.getElementById("titleValue").textContent;
  const shareText = `我的大学生制霸率是 ${rate}，称号是「${title}」。\n${FOOTER_TEXT}`;

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopyStatus("已复制分享文案。");
      })
      .catch(() => {
        copyShareTextFallback(
          shareText,
          "已使用兼容方式复制分享文案。",
          "自动复制失败，请手动复制弹窗中的文案。"
        );
      });
    return;
  }

  copyShareTextFallback(
    shareText,
    "当前浏览器不支持 Clipboard API，已使用兼容方式复制。",
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

function getLevelByValue(value) {
  return LEVELS.find((level) => level.value === value) || LEVELS[0];
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
});
