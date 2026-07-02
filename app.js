const attractions = [
  ["Central Park", "免费｜上午短项目"],
  ["Top of the Rock", "$46+｜需预约"],
  ["Williamsburg", "免费｜适合晚上"],
  ["Coney Island / Luna Park", "$79.90｜周五优先"],
  ["SoHo + West Village", "免费｜逛街拍照"],
  ["Brooklyn Bridge + DUMBO", "免费｜返程日前半天"],
];

const choices = document.querySelector("#attractionChoices");
const form = document.querySelector("#tripForm");
const result = document.querySelector("#result");
const copyButton = document.querySelector("#copyButton");

function renderChoices() {
  choices.innerHTML = attractions
    .map(
      ([name, meta], index) => `
        <label class="choice">
          <input type="checkbox" value="${name}" ${index < 6 ? "checked" : ""} />
          <div>
            <strong>${index + 1}. ${name}</strong>
            <span>${meta}</span>
          </div>
        </label>
      `,
    )
    .join("");
}

function value(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function selectedAttractions() {
  return [...choices.querySelectorAll("input:checked")].map((input) => input.value);
}

function buildDraft(event) {
  event.preventDefault();
  const picked = selectedAttractions();
  const destination = value("destination");
  const travelers = value("travelers");
  const relationship = value("relationship");
  const dates = value("dates");
  const hotel = value("hotel");
  const flight = value("flight");
  const notes = value("notes");

  const lines = [
    `# ${destination}旅行攻略草稿`,
    "",
    "## 基础信息",
    `- 人数/关系：${travelers}人，${relationship}`,
    `- 日期：${dates}`,
    `- 我的出发地：${value("myOrigin")}`,
    `- 对方出发地：${value("partnerOrigin")}`,
    `- 酒店：${hotel}`,
    `- 航班偏好：${flight}`,
    "",
    "## 已选景点",
    ...picked.map((item, index) => `${index + 1}. ${item}`),
    "",
    "## 自动生成规则",
    "- 酒店已确定后，直接生成完整攻略，不再让用户补发“算/生成”。",
    "- 餐厅默认不固定，只预留吃饭时间、区域和预算。",
    "- 若景点太多排不下，提示需要删除几个，并复现已选项目。",
    "- 完整攻略输出后询问是否满意；满意后再询问是否导出攻略。",
    "",
    "## 行程草稿",
    "Day 1：抵达 + 轻松夜逛，安排低体力路线。",
    "Day 2：上午短项目；下午若对方有课则安排 solo/休息；晚上安排预约类景点。",
    "Day 3：游乐场或远距离项目优先放在周五。",
    "Day 4：逛街、街区、咖啡、拍照。",
    "Day 5：退房寄存行李 + 低风险半日路线 + 晚班机返程。",
    "",
    "## 备注",
    notes || "无",
    "",
    "## 下一步",
    "把这份草稿发给 Codex，让它联网复核价格、航班、酒店位置、门票和交通时间，然后生成小时级最终攻略。",
  ];

  result.textContent = lines.join("\n");
}

async function copyDraft() {
  await navigator.clipboard.writeText(result.textContent);
  copyButton.textContent = "已复制";
  setTimeout(() => {
    copyButton.textContent = "复制草稿";
  }, 1400);
}

renderChoices();
form.addEventListener("submit", buildDraft);
copyButton.addEventListener("click", copyDraft);
