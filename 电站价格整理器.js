
const REGION_CONFIGS={changsha:{name:"长沙",defaultOrder:["00:00-06:00|晚谷","12:00-14:00|中谷","06:00-12:00|平"],periods:[{name:"晚谷",start:"00:00",end:"06:00",tone:2},{name:"平",start:"06:00",end:"12:00",tone:5},{name:"中谷",start:"12:00",end:"14:00",tone:1},{name:"平",start:"14:00",end:"16:00",tone:5},{name:"峰",start:"16:00",end:"24:00",tone:4}]},jiangxi:{name:"江西",defaultOrder:["12:00-14:00|深谷","01:00-05:00|低谷","00:00-01:00|平"],periods:[{name:"平",start:"00:00",end:"01:00",tone:5},{name:"低谷",start:"01:00",end:"05:00",tone:2},{name:"平",start:"05:00",end:"11:30",tone:5},{name:"低谷",start:"11:30",end:"12:00",tone:2},{name:"深谷",start:"12:00",end:"14:00",tone:1},{name:"低谷",start:"14:00",end:"14:30",tone:2},{name:"平",start:"14:30",end:"16:00",tone:5},{name:"高峰",start:"16:00",end:"22:00",tone:4},{name:"平",start:"22:00",end:"24:00",tone:5}]}};const SAMPLES={"actual-fast":`00:00-05:59
快电价
0.7200
0.4200
0.3000
已降0.20元/度
VIP价
0.6400
0.4200
0.2200
06:00-11:59
快电价
1.0500
0.8100
0.2400
已降0.16元/度
VIP价
0.9860
0.8100
0.1760
12:00-13:59
快电价
0.7200
0.4200
0.3000
VIP价
0.6400
0.4200
0.2200
14:00-15:59
快电价
1.0500
0.8100
0.2400
VIP价
0.9860
0.8100
0.1760
16:00-23:59
快电价
1.4400
1.2000
0.2400
VIP价
1.3760
1.2000
0.1760`,"actual-diamond":`00:00-06:00
黑钻会员价
0.6463
0.4200
0.2263
挂牌价
0.7300
0.4200
0.3100
06:00-12:00
充电单价
1.0700
0.8100
0.2600
12:00-14:00
黑钻会员价
0.7120
0.4200
0.2920
挂牌价
0.8200
0.4200
0.4000
14:00-16:00
充电单价
1.0700
0.8100
0.2600
16:00-24:00
充电单价
1.4500
1.2000
0.2500`,"actual-huazi":`00:00-06:00
华自价
0.37
0.29
0.66
VIP价
0.37
0.23
0.60
06:00-12:00
华自价
0.68
0.29
0.97
VIP价
0.68
0.23
0.91
12:00-14:00
华自价
0.37
0.36
0.73
VIP价
0.37
0.32
0.69
14:00-16:00
华自价
0.68
0.29
0.97
VIP价
0.68
0.23
0.91
16:00-18:00
华自价
1.00
0.29
1.29
VIP价
1.00
0.25
1.25
18:00-22:00
华自价
1.00
0.29
1.29
VIP价
1.00
0.25
1.25
22:00-24:00
华自价
1.00
0.29
1.29
VIP价
1.00
0.25
1.25`,"actual-three":`00:00-06:00
会员价
0.6400
0.3900
0.2500
活动价
0.7450
0.3900
0.3550
站点价
0.9400
0.3900
0.5500`,"history-mixed":`00:00-06:00
闪联价
0.49
0.33
0.16
VIP价
0.47
0.33
0.14
闪联价
0.82
0.66
0.16
06:00-12:00
VIP价
0.80
0.66
0.14
闪联价
0.49
0.33
0.16
12:00-14:00
VIP价
0.47
0.33
0.14`,"history-formula":`06:00~12:00
0.6565
0.1500
0.8065元/度
12:00~14:00
0.3208
0.2000
0.5208元/度
00:00~06:00
0.3208
0.2000
0.5208元/度`,"history-cross":`电站价
YKC价
会员价
02:30~24:00
当前时段
0.8800
0.8800
0.8695
电费
0.6190
0.6190
0.6190
服务费
0.2610
0.2610
0.2505最高优惠5元
00:00~02:30
0.8800
0.8800
0.8695
电费
0.6190
0.6190
0.6190
服务费
0.2610
0.2610
0.2505最高优惠5元`};
const regressionRow = (period, member, nonMember, status) => ({ period, member, nonMember, status });
const missingRegressionRow = period => regressionRow(period, "", "", "missing");
const REGRESSION_SAMPLES = {
  "actual-fast": {
    id: "actual-fast",
    name: "实际截图转录：快电价 / VIP 价",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["actual-fast"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.6400", "0.7200", "ok"),
      regressionRow("06:00-12:00", "0.9860", "1.0500", "ok"),
      regressionRow("12:00-14:00", "0.6400", "0.7200", "ok"),
      regressionRow("14:00-16:00", "0.9860", "1.0500", "ok"),
      regressionRow("16:00-24:00", "1.3760", "1.4400", "ok")
    ]
  },
  "actual-diamond": {
    id: "actual-diamond",
    name: "实际截图转录：黑钻会员价 / 挂牌价",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["actual-diamond"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.6463", "0.7300", "ok"),
      regressionRow("06:00-12:00", "1.0700", "1.0700", "review"),
      regressionRow("12:00-14:00", "0.7120", "0.8200", "ok"),
      regressionRow("14:00-16:00", "1.0700", "1.0700", "review"),
      regressionRow("16:00-24:00", "1.4500", "1.4500", "review")
    ]
  },
  "actual-huazi": {
    id: "actual-huazi",
    name: "实际截图转录：华自价 / VIP 价",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["actual-huazi"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.6000", "0.6600", "ok"),
      regressionRow("06:00-12:00", "0.9100", "0.9700", "ok"),
      regressionRow("12:00-14:00", "0.6900", "0.7300", "ok"),
      regressionRow("14:00-16:00", "0.9100", "0.9700", "ok"),
      regressionRow("16:00-24:00", "1.2500", "1.2900", "review")
    ]
  },
  "actual-three": {
    id: "actual-three",
    name: "实际截图转录：三个价格取最低两个",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["actual-three"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.6400", "0.7450", "ok"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "history-mixed": {
    id: "history-mixed",
    name: "历史样例：价格组前后混排",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["history-mixed"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.4700", "0.4900", "ok"),
      regressionRow("06:00-12:00", "0.8000", "0.8200", "ok"),
      regressionRow("12:00-14:00", "0.4700", "0.4900", "ok"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "history-formula": {
    id: "history-formula",
    name: "历史样例：电费 + 服务费 = 总价",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["history-formula"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.5208", "0.5208", "review"),
      regressionRow("06:00-12:00", "0.8065", "0.8065", "review"),
      regressionRow("12:00-14:00", "0.5208", "0.5208", "review"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "history-cross": {
    id: "history-cross",
    name: "历史样例：跨多个目标时段",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: SAMPLES["history-cross"],
    expectedRows: [
      regressionRow("00:00-06:00", "0.8695", "0.8800", "review"),
      regressionRow("06:00-12:00", "0.8695", "0.8800", "ok"),
      regressionRow("12:00-14:00", "0.8695", "0.8800", "ok"),
      regressionRow("14:00-16:00", "0.8695", "0.8800", "ok"),
      regressionRow("16:00-24:00", "0.8695", "0.8800", "ok")
    ]
  },
  "new-etu-three-prices": {
    id: "new-etu-three-prices",
    name: "新电途：三种价格与孤立时间",
    mode: "newEtu",
    region: "changsha",
    month: "2026-06",
    input: `会员价
0.6535
00:00
活动价
0.7585
06:00
新电途站点价
0.9200
会员价
0.9635
06:00
1.0685
活动价
12:00
新电途站点价
1.2300
最低时段
会员价
0.6535
12:00
活动价
0.7585
14:00
新电途站点价
0.9200`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.6535", "0.7585", "ok"),
      regressionRow("06:00-12:00", "0.9635", "1.0685", "ok"),
      regressionRow("12:00-14:00", "0.6535", "0.7585", "ok"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "new-etu-trailing-label": {
    id: "new-etu-trailing-label",
    name: "新电途：后置标签与同行内容",
    mode: "newEtu",
    region: "changsha",
    month: "2026-06",
    input: `00:00
会员价
0.6260
新电途站点价0.6800
06:00
06:00
会员价
0.9300
0.9800
新电途站点价
12:00
12:00
会员价
0.6420
14:00新电途站点价0.7000`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.6260", "0.6800", "ok"),
      regressionRow("06:00-12:00", "0.9300", "0.9800", "ok"),
      regressionRow("12:00-14:00", "0.6420", "0.7000", "ok"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "new-etu-single-price": {
    id: "new-etu-single-price",
    name: "新电途：单一价格与孤立时间",
    mode: "newEtu",
    region: "changsha",
    month: "2026-06",
    input: `00:00
新电途站点价
0.6000
06:00
06:00
新电途站点价
0.8800
12:00
最低时段
12:00
新电途站点价
0.6000
14:00`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.6000", "0.6000", "review"),
      regressionRow("06:00-12:00", "0.8800", "0.8800", "review"),
      regressionRow("12:00-14:00", "0.6000", "0.6000", "review"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "precision-five-decimals": {
    id: "precision-five-decimals",
    name: "价格精度：五位小数保留",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.65350
非会员价
0.75855`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.65350", "0.75855", "review"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "precision-fifth-digit-distinct": {
    id: "precision-fifth-digit-distinct",
    name: "价格精度：第五位差异不得合并",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.65351
非会员价
0.65359`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.65351", "0.65359", "review"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "general-cross-period-conflict": {
    id: "general-cross-period-conflict",
    name: "通用规则：跨截图时段价格冲突",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `16:00-18:00
非会员价
1.2900
1.0000
0.2900
会员价
1.2500
1.0000
0.2500
18:00-22:00
非会员价
1.2500
1.0000
0.2500
会员价
1.2000
1.0000
0.2000
22:00-24:00
非会员价
1.1500
1.0000
0.1500
会员价
1.1000
1.0000
0.1000`,
    expectedRows: [
      missingRegressionRow("00:00-06:00"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      regressionRow("16:00-24:00", "", "", "review")
    ]
  },
  "general-low-service-fee": {
    id: "general-low-service-fee",
    name: "通用规则：低于 0.1 的服务费",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.7000
0.6500
0.0500
非会员价
0.8000
0.7500
0.0500`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.7000", "0.8000", "ok"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "general-adjusted-formula-order": {
    id: "general-adjusted-formula-order",
    name: "通用规则：四数字调整公式换序",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价0.7000
服务费0.3000
优惠金额0.1000
电费0.5000
非会员价0.8000
优惠金额0.1000
电费0.6000
服务费0.3000`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.7000", "0.8000", "ok"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "general-adjusted-formula-ambiguous": {
    id: "general-adjusted-formula-ambiguous",
    name: "通用规则：无标签四数字保持缺失",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.5000
0.7000
0.3000
0.1000
非会员价
0.6000
0.8000
0.3000
0.1000`,
    expectedRows: [
      missingRegressionRow("00:00-06:00"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "general-duplicate-identical": {
    id: "general-duplicate-identical",
    name: "通用规则：重复时段内容一致",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.7000
0.5000
0.2000
非会员价
0.8000
0.5000
0.3000
00:00-06:00
会员价
0.7000
0.5000
0.2000
非会员价
0.8000
0.5000
0.3000`,
    expectedRows: [
      regressionRow("00:00-06:00", "0.7000", "0.8000", "ok"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  },
  "general-duplicate-conflict": {
    id: "general-duplicate-conflict",
    name: "通用规则：重复时段价格冲突",
    mode: "general",
    region: "changsha",
    month: "2026-06",
    input: `00:00-06:00
会员价
0.7000
0.5000
0.2000
非会员价
0.8000
0.5000
0.3000
00:00-06:00
会员价
0.7500
0.5000
0.2500
非会员价
0.8500
0.5000
0.3500`,
    expectedRows: [
      regressionRow("00:00-06:00", "", "", "review"),
      missingRegressionRow("06:00-12:00"),
      missingRegressionRow("12:00-14:00"),
      missingRegressionRow("14:00-16:00"),
      missingRegressionRow("16:00-24:00")
    ]
  }
};
for (const sample of Object.values(REGRESSION_SAMPLES)) SAMPLES[sample.id] = sample.input;
const PARSE_MODES = {
  general: "通用平台",
  newEtu: "新电途"
};
const INTERNAL_SAMPLE_KEY="didichangsha";const regionSelect=document.getElementById("regionSelect");const effectiveMonth=document.getElementById("effectiveMonth");const rawInput=document.getElementById("rawInput");const sampleSelect=document.getElementById("sampleSelect");const resultBody=document.getElementById("resultBody");const noticeStack=document.getElementById("noticeStack");const copyPreview=document.getElementById("copyPreview");const copyLabels=document.getElementById("copyLabels");const auditBody=document.getElementById("auditBody");const commonOnlyToggle=document.getElementById("commonOnlyToggle");const commonModal=document.getElementById("commonModal");const copyModal=document.getElementById("copyModal");const modalOverlay=document.getElementById("modalOverlay");const rulePopover=document.getElementById("rulePopover");const helpDrawer=document.getElementById("helpDrawer");let resultRows=[];let parsedSections=[];const STORAGE_KEY="price-workbench-team-v02";const regionSelectionState={};let copyDraft=null;const HELP_SECTIONS=[{id:"basic",badge:"A",title:"基础设置",summary:"地区和月份：选择对应的时段配置",body:`<ul><li>全天时段：查看当天完整的峰谷划分</li><li>粘贴查价文本：怎样保留有效内容</li></ul>`},{id:"rules",badge:"B",title:"规则与常用设置",summary:"常用时段：保存、重新设置和清除",body:`<ul><li>价格如何选取：会员价和非会员价的规则</li></ul>`},{id:"output",badge:"C",title:"核对与输出",summary:"修改与复制：调整价格和输出顺序",body:`<ul><li>查看识别明细：检查截图时段和原始价格</li></ul>`}];
let lastAnalysedText = "";
let lastAnalysedMode = "general";
let clearUndoText = "";
let clearUndoTimer = 0;
const layerHideTimers = new WeakMap();
let layerReturnFocus = null;

const TIME_TABLE_DATA = window.PRICE_TIME_TABLES || {
version: "内置兼容配置",
regions: Object.fromEntries(Object.entries(REGION_CONFIGS).map(([key, config]) => [key, { name: config.name, tables: { "2026-06": { defaultOrder: config.defaultOrder, periods: config.periods } } }]))
};
function availableMonths(regionKey) {
return Object.keys(TIME_TABLE_DATA.regions[regionKey]?.tables || {}).sort().reverse();
}
function activateTimeTable(regionKey, month) {
const region = TIME_TABLE_DATA.regions[regionKey];
const table = region?.tables?.[month];
if (!region || !table) return false;
REGION_CONFIGS[regionKey] = { name: region.name, defaultOrder: [...table.defaultOrder], periods: table.periods.map(period => ({ ...period })) };
delete regionSelectionState[regionKey];
return true;
}
function populateRegionOptions(selectedKey) {
Object.entries(TIME_TABLE_DATA.regions).forEach(([key, region]) => {
const month = availableMonths(key)[0];
const table = region.tables[month];
REGION_CONFIGS[key] = { name: region.name, defaultOrder: [...table.defaultOrder], periods: table.periods.map(period => ({ ...period })) };
});
regionSelect.innerHTML = Object.entries(TIME_TABLE_DATA.regions).map(([key, region]) => `<option value="${escapeHtml(key)}">${escapeHtml(region.name)}</option>`).join("");
if (selectedKey && TIME_TABLE_DATA.regions[selectedKey]) regionSelect.value = selectedKey;
}
function populateMonthOptions(regionKey, selectedMonth) {
const months = availableMonths(regionKey);
effectiveMonth.innerHTML = months.map(month => `<option value="${month}">${formatMonthLabel(month)}</option>`).join("");
effectiveMonth.value = months.includes(selectedMonth) ? selectedMonth : (months[0] || "");
activateTimeTable(regionKey, effectiveMonth.value);
}
function formatMonthLabel(value) {
const [year, month] = String(value || "").split("-");
return year && month ? `${year}年${month}月` : "选择月份";
}
function updateConfigSummary() {
const summary = document.getElementById("configSummaryText");
if (!summary) return;
summary.textContent = `${REGION_CONFIGS[regionSelect.value].name} · ${formatMonthLabel(effectiveMonth.value)}`;
}
function closeTopMenus(immediate = false) {
document.querySelectorAll(".top-popover").forEach(menu => {
if (menu.hidden) {
menu.classList.remove("is-visible");
menu.inert = true;
return;
}
hideAnimatedLayer(menu, immediate);
});
document.querySelectorAll("#configSummaryBtn, #moreBtn").forEach(button => button.setAttribute("aria-expanded", "false"));
}
function toggleTopMenu(menuId, buttonId) {
const menu = document.getElementById(menuId);
const button = document.getElementById(buttonId);
const willOpen = menu.hidden || !menu.classList.contains("is-visible");
if (!willOpen) {
closeTopMenus();
return;
}
closeTopMenus(true);
showAnimatedLayer(menu);
button.setAttribute("aria-expanded", "true");
}
function bindCompactWorkspaceEvents() {
const detailFold = document.querySelector(".detail-fold");
if (detailFold && !detailFold.dataset.bound) {
detailFold.dataset.bound = "true";
detailFold.addEventListener("toggle", () => {
const title = detailFold.querySelector(":scope > summary strong");
const note = detailFold.querySelector(".detail-fold-note");
if (title) title.textContent = detailFold.open ? "收起详细明细" : "展开详细明细";
if (note) note.textContent = detailFold.open ? "明细已展开 · 点击可收起" : "默认收起 · 展开后可查看识别依据";
});
}
const compactIssueBtn = document.getElementById("compactIssueBtn");
if (compactIssueBtn && !compactIssueBtn.dataset.bound) {
compactIssueBtn.dataset.bound = "true";
compactIssueBtn.addEventListener("click", () => {
if (problemMode) exitProblemMode(); else enterProblemMode();
});
}
const configButton = document.getElementById("configSummaryBtn");
if (configButton && !configButton.dataset.bound) {
configButton.dataset.bound = "true";
configButton.addEventListener("click", event => { event.stopPropagation(); toggleTopMenu("configPopover", "configSummaryBtn"); });
}
const moreButton = document.getElementById("moreBtn");
if (moreButton && !moreButton.dataset.bound) {
moreButton.dataset.bound = "true";
moreButton.addEventListener("click", event => { event.stopPropagation(); toggleTopMenu("moreMenu", "moreBtn"); });
}
const ruleTopButton = document.getElementById("ruleTopBtn");
if (ruleTopButton && !ruleTopButton.dataset.bound) {
ruleTopButton.dataset.bound = "true";
ruleTopButton.addEventListener("click", () => {
closeTopMenus();
if (!rulePopover.hidden) closeLayers(); else openLayer(rulePopover, false);
});
}
document.querySelectorAll("[data-more-action]").forEach(button => {
if (button.dataset.bound) return;
button.dataset.bound = "true";
button.addEventListener("click", () => {
if (button.dataset.moreAction === "timetable") { closeTopMenus(); openTimeTableEditor(); return; }
const target = { common: "commonSettingsBtn", copy: "copySettingsBtn", export: "exportExcelBtn", help: "helpBtn", samples: "unlockSamplesBtn" }[button.dataset.moreAction];
closeTopMenus();
document.getElementById(target)?.click();
});
});
if (!document.body.dataset.topMenuBound) {
document.body.dataset.topMenuBound = "true";
document.addEventListener("pointerdown", event => {
if (!event.target.closest(".top-popover, #configSummaryBtn, #moreBtn")) closeTopMenus();
});
}
}
function setupCompactWorkspace() {
if (document.body.classList.contains("compact-html")) {
document.getElementById("helpBtn")?.setAttribute("hidden", "");
document.getElementById("sampleLock")?.setAttribute("hidden", "");
bindCompactWorkspaceEvents();
updateConfigSummary();
rawInput.focus();
return;
}
const topbar = document.querySelector(".topbar");
const topActions = topbar.querySelector(".top-actions");
const regionControl = document.querySelector(".region-control");
const monthControl = document.querySelector(".month-control");
const helpButton = document.getElementById("helpBtn");
topActions.innerHTML = `<button type="button" class="top-action-button" id="configSummaryBtn" aria-haspopup="true" aria-expanded="false">${svgIcon("calendar", "icon icon-sm")}<span id="configSummaryText"></span>${svgIcon("chevron-down", "icon icon-sm")}</button><button type="button" class="top-action-button" id="ruleTopBtn">${svgIcon("sliders", "icon icon-sm")}当前取价规则</button><button type="button" class="top-action-button" id="moreBtn" aria-haspopup="true" aria-expanded="false">${svgIcon("plus", "icon icon-sm")}更多设置</button>`;
const configPopover = document.createElement("div");
configPopover.className = "top-popover config-popover";
configPopover.id = "configPopover";
configPopover.hidden = true;
configPopover.append(regionControl, monthControl);
const moreMenu = document.createElement("div");
moreMenu.className = "top-popover more-menu";
moreMenu.id = "moreMenu";
moreMenu.hidden = true;
moreMenu.innerHTML = `<button type="button" data-more-action="export">导出 Excel</button><button type="button" data-more-action="timetable">时段表管理</button><button type="button" data-more-action="help">使用说明</button><button type="button" data-more-action="samples">内部样例</button>`;
topbar.append(configPopover, moreMenu, helpButton);
helpButton.hidden = true;
document.getElementById("sampleLock").hidden = true;
moreMenu.appendChild(document.getElementById("sampleTools"));
document.querySelector(".brand-divider")?.remove();
document.querySelector(".brand-subtitle")?.remove();
document.querySelector(".workflow")?.setAttribute("hidden", "");
const inputPanel = document.querySelector(".input-panel");
inputPanel.querySelector(".panel-title h2").textContent = "粘贴价格文本";
inputPanel.querySelector(".panel-title .icon")?.remove();
const inputActions = inputPanel.querySelector(".input-actions");
inputActions.insertBefore(document.getElementById("clearBtn"), inputActions.firstChild);
document.getElementById("clearBtn").className = "clear-button";
document.getElementById("analyseBtn").innerHTML = `${svgIcon("sparkles", "icon icon-sm")}整理价格`;
const resultPanel = document.querySelector(".result-panel");
const resultHeader = resultPanel.querySelector(".result-header");
resultHeader.querySelector("h2").textContent = "复制结果";
resultHeader.querySelector(".ai-pill")?.remove();
resultHeader.querySelector(".result-summary")?.remove();
resultHeader.querySelector(".detail-jump")?.remove();
const copyConsole = resultPanel.querySelector(".copy-console");
resultPanel.insertBefore(copyConsole, resultPanel.querySelector(".detail-section"));
copyConsole.querySelector(".copy-console-head strong").textContent = "当前复制内容";
copyConsole.appendChild(document.getElementById("copyBtn"));
const coreSection = document.createElement("section");
coreSection.className = "core-price-section";
coreSection.id = "corePriceSection";
coreSection.hidden = true;
coreSection.innerHTML = `<div class="core-price-head"><h3>核心价格</h3><span>可直接修改，复制内容会同步更新</span></div><div class="core-price-grid" id="corePriceGrid"></div>`;
copyConsole.insertAdjacentElement("afterend", coreSection);
const compactIssue = document.createElement("div");
compactIssue.className = "compact-issue-banner";
compactIssue.id = "compactIssueBanner";
compactIssue.hidden = true;
compactIssue.setAttribute("role", "alert");
compactIssue.setAttribute("aria-live", "assertive");
compactIssue.innerHTML = `<div class="compact-issue-main"><div class="compact-issue-heading"><span class="compact-issue-mark" aria-hidden="true">!</span><div><strong id="compactIssueTitle">发现待核对项</strong><span id="compactIssueText">请逐项确认后再复制。</span></div></div><button type="button" id="compactIssueBtn">开始处理</button></div><div class="compact-issue-list" id="compactIssueList" role="list" aria-label="待核对问题"></div>`;
copyConsole.insertAdjacentElement("afterend", compactIssue);
compactIssue.insertAdjacentElement("afterend", coreSection);
const detailSection = resultPanel.querySelector(".detail-section");
const detailFold = document.createElement("details");
detailFold.className = "detail-fold";
detailFold.innerHTML = `<summary>展开详细明细${svgIcon("chevron-down", "icon icon-sm")}</summary>`;
detailSection.replaceWith(detailFold);
detailFold.appendChild(detailSection);
const auditDetails = document.getElementById("auditDetails");
if (auditDetails) detailFold.appendChild(auditDetails);
bindCompactWorkspaceEvents();
updateConfigSummary();
rawInput.focus();
}
function periodId(period){return`${period.start}-${period.end}|${period.name}`;}
function readPreferences(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")||{};}catch{return{};}}
function writePreferences(value){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(value));}catch{/*本地存储不可用时仍可单次使用*/}}const storedPreferences=readPreferences();
let currentParseMode = PARSE_MODES[storedPreferences.parseMode] ? storedPreferences.parseMode : "general";
function validPeriodIds(regionKey){return new Set(REGION_CONFIGS[regionKey].periods.map(periodId));}
function getRegionSelection(regionKey=regionSelect.value){if(regionSelectionState[regionKey])return regionSelectionState[regionKey];const config=REGION_CONFIGS[regionKey];const valid=validPeriodIds(regionKey);const saved=storedPreferences.regions?.[regionKey];const savedSelected=Array.isArray(saved?.selected)?saved.selected.filter(id=>valid.has(id)):[];const savedOrder=Array.isArray(saved?.order)?saved.order.filter(id=>valid.has(id)):[];const selected=savedSelected.length?savedSelected:[...config.defaultOrder];const order=[...savedOrder.filter(id=>selected.includes(id)),...selected.filter(id=>!savedOrder.includes(id))];regionSelectionState[regionKey]={selected,order,hasCustom:Boolean(saved),showCommonOnly:saved?saved.showCommonOnly!==false:false,priceOrder:saved?.priceOrder==="member-first"?"member-first":"nonmember-first"};return regionSelectionState[regionKey];}
function persistGeneralPreferences(){const next=readPreferences();next.lastRegion=regionSelect.value;next.effectiveMonth=effectiveMonth.value;next.parseMode=currentParseMode;writePreferences(next);}
function persistRegionState(regionKey=regionSelect.value){const next=readPreferences();const state=getRegionSelection(regionKey);next.lastRegion=regionKey;next.effectiveMonth=effectiveMonth.value;next.regions=next.regions||{};next.regions[regionKey]={selected:[...state.selected],order:[...state.order],showCommonOnly:state.showCommonOnly,priceOrder:state.priceOrder};writePreferences(next);}
function saveCurrentPreference(){const checked=[...document.querySelectorAll('#commonPeriodChoices input[type="checkbox"]:checked')].map(input=>input.value);if(!checked.length){window.alert("请至少选择一个常用时段");return;}const state=getRegionSelection();state.selected=checked;state.order=[...state.order.filter(id=>checked.includes(id)),...checked.filter(id=>!state.order.includes(id))];state.hasCustom=true;state.showCommonOnly=true;resultRows.forEach(row=>{row.selected=checked.includes(periodId(row.period));});persistRegionState();closeLayers();renderResults();noticeStack.insertAdjacentHTML("afterbegin",`<div class="notice">已保存 ${REGION_CONFIGS[regionSelect.value].name} 的常用时段。新文本会继续使用此设置。</div>`);}
function restoreRegionPreset(){const config=REGION_CONFIGS[regionSelect.value];const current=getRegionSelection();regionSelectionState[regionSelect.value]={selected:[...config.defaultOrder],order:[...config.defaultOrder],hasCustom:true,showCommonOnly:true,priceOrder:current.priceOrder};resultRows.forEach(row=>{row.selected=config.defaultOrder.includes(periodId(row.period));});persistRegionState();renderCommonChoices();renderResults();}
function clearPersonalPreference(){const config=REGION_CONFIGS[regionSelect.value];const current=getRegionSelection();regionSelectionState[regionSelect.value]={selected:[...config.defaultOrder],order:[...config.defaultOrder],hasCustom:false,showCommonOnly:false,priceOrder:current.priceOrder};const next=readPreferences();if(next.regions)delete next.regions[regionSelect.value];writePreferences(next);resultRows.forEach(row=>{row.selected=config.defaultOrder.includes(periodId(row.period));});closeLayers();renderResults();noticeStack.insertAdjacentHTML("afterbegin",`<div class="notice">已清除个人设置，当前显示 ${config.name} 的全部时段。</div>`);}
function toMin(text){const[h,m]=text.split(":").map(Number);return h*60+m;}
function preprocessGeneralText(text){return String(text||"");}
const NEW_ETU_DECORATIVE_LINE_PATTERN=/^最低时段$/;
function scanNewEtuTimeLayout(lines){
  const isolated=[];
  const ranges=[];
  const rangePattern=/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/g;
  const timePattern=/(?<!\d)([01]?\d|2[0-4]):([0-5]\d)(?!\d)/g;
  lines.forEach((line,lineIndex)=>{
    const occupied=[];
    for(const match of line.matchAll(rangePattern)){
      const range=normTime(match[0]);
      if(!range)continue;
      occupied.push([match.index,match.index+match[0].length]);
      ranges.push({...range,lineIndex,startIndex:match.index,endIndex:match.index+match[0].length});
    }
    for(const match of line.matchAll(timePattern)){
      const startIndex=match.index;
      const endIndex=startIndex+match[0].length;
      if(occupied.some(([start,end])=>startIndex>=start&&endIndex<=end))continue;
      const hour=Number(match[1]);
      const minute=Number(match[2]);
      if(hour===24&&minute!==0)continue;
      isolated.push({id:`${lineIndex}:${startIndex}`,lineIndex,startIndex,endIndex,minutes:hour*60+minute,label:`${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}`});
    }
  });
  return{isolated,ranges};
}
function splitNewEtuBoundarySegments(tokens){
  const segments=[];
  let current=[];
  for(const token of tokens){
    if(current.length&&token.minutes<current[current.length-1].minutes){
      const previous=current[current.length-1];
      if(previous.minutes!==1440||token.minutes!==0)return[];
      segments.push(current);
      current=[];
    }
    current.push(token);
  }
  if(current.length)segments.push(current);
  return segments;
}
function isPairedNewEtuBoundaryLayout(tokens){
  if(tokens.length<2||tokens.length%2!==0)return false;
  for(let index=0;index<tokens.length;index+=2){
    if(tokens[index].minutes>=tokens[index+1].minutes)return false;
    if(index>0&&tokens[index-1].minutes!==tokens[index].minutes)return false;
  }
  return true;
}
function buildNewEtuBoundaryCandidates(tokens){
  if(isPairedNewEtuBoundaryLayout(tokens)){
    const pairs=[];
    for(let index=0;index<tokens.length;index+=2)pairs.push({start:tokens[index],end:tokens[index+1]});
    return pairs;
  }
  const runs=[];
  for(const token of tokens){
    const previous=runs[runs.length-1];
    if(previous&&previous.minutes===token.minutes)previous.tokens.push(token);
    else runs.push({minutes:token.minutes,tokens:[token]});
  }
  const pairs=[];
  for(let index=0;index<runs.length-1;index++){
    const start=runs[index].tokens[runs[index].tokens.length-1];
    const end=runs[index+1].tokens[0];
    if(start.minutes<end.minutes)pairs.push({start,end});
  }
  return pairs;
}
function hasNewEtuPriceEvidence(lines,startToken,endToken){
  const content=lines.slice(startToken.lineIndex,endToken.lineIndex+1).join("\n");
  return/\d+\.\d{1,6}/.test(content);
}
function classifyNewEtuRange(candidate,existingRanges){
  const exact=existingRanges.some(range=>range.start===candidate.start.minutes&&range.end===candidate.end.minutes);
  if(exact)return"duplicate";
  const overlaps=existingRanges.some(range=>range.end>candidate.start.minutes&&range.start<candidate.end.minutes);
  return overlaps?"conflict":"new";
}
function rebuildNewEtuTimeRanges(lines,layout){
  const replacements=new Map();
  const removals=new Set();
  const candidates=splitNewEtuBoundarySegments(layout.isolated).flatMap(buildNewEtuBoundaryCandidates);
  for(const candidate of candidates){
    if(!hasNewEtuPriceEvidence(lines,candidate.start,candidate.end))continue;
    const classification=classifyNewEtuRange(candidate,layout.ranges);
    if(classification==="conflict")continue;
    if(classification==="duplicate"){
      removals.add(candidate.start.id);
      removals.add(candidate.end.id);
      continue;
    }
    replacements.set(candidate.start.id,`${candidate.start.label}-${candidate.end.label}`);
    removals.delete(candidate.start.id);
    if(!replacements.has(candidate.end.id))removals.add(candidate.end.id);
  }
  const tokensByLine=new Map();
  for(const token of layout.isolated){
    if(!replacements.has(token.id)&&!removals.has(token.id))continue;
    if(!tokensByLine.has(token.lineIndex))tokensByLine.set(token.lineIndex,[]);
    tokensByLine.get(token.lineIndex).push(token);
  }
  return lines.map((original,lineIndex)=>{
    let line=original;
    const tokens=(tokensByLine.get(lineIndex)||[]).sort((a,b)=>b.startIndex-a.startIndex);
    for(const token of tokens){
      const replacement=replacements.get(token.id)||"";
      line=`${line.slice(0,token.startIndex)}${replacement}${line.slice(token.endIndex)}`;
    }
    return line.trim();
  }).filter(line=>line&&!NEW_ETU_DECORATIVE_LINE_PATTERN.test(line));
}
function preprocessNewEtuText(text){
  const lines=preprocessGeneralText(text).replace(/\r\n?/g,"\n").split("\n").map(line=>line.trim()).filter(Boolean);
  const layout=scanNewEtuTimeLayout(lines);
  if(layout.isolated.length<2)return lines.filter(line=>!NEW_ETU_DECORATIVE_LINE_PATTERN.test(line)).join("\n");
  return rebuildNewEtuTimeRanges(lines,layout).join("\n");
}
function preprocessInput(text,mode=currentParseMode){return mode==="newEtu"?preprocessNewEtuText(text):preprocessGeneralText(text);}
function normalizeRawText(text){return String(text||"").replace(/\r/g,"\n").replace(/：/g,":").replace(/[～~—–至]/g,"-").replace(/(\d{1,2}:\d{2})\s*\n\s*-\s*\n?\s*(\d{1,2}:\d{2})/g,"$1-$2").replace(/(\d{1,2}:\d{2})\s*-\s*\n\s*(\d{1,2}:\d{2})/g,"$1-$2");}
function parseLines(text){return normalizeRawText(text).split("\n").map(line=>line.trim()).filter(Boolean);}
function normTime(text){const normalized=String(text||"").replace(/：/g,":").replace(/[～~—–至]/g,"-");const match=normalized.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);if(!match)return null;const startH=Number(match[1]);const startM=Number(match[2]);const endH=Number(match[3]);const endM=Number(match[4]);if(startH>24||endH>24||startM>59||endM>59)return null;const start=startH*60+startM;let end=endH*60+endM;if(endM===59)end+=1;if(end===0&&start>0)end=1440;return{start,end,label:`${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}-${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`};}
function extractTimeItems(lines){const timeItems=[];lines.forEach((line,index)=>{const time=normTime(line);if(time)timeItems.push({index,...time,rawLine:line});});return timeItems;}
const MIN_PRICE_DECIMALS = 4;
const MAX_PRICE_DECIMALS = 6;
const PRICE_EQUAL_TOLERANCE = 0.000005;
const FORMULA_TOLERANCE = 0.00005;
function rawDecimalPlaces(value) {
  const match = String(value ?? "").trim().match(/\.(\d+)/);
  return match ? match[1].length : 0;
}
function normalizePricePrecision(decimalPlaces) {
  const value = Number.isFinite(Number(decimalPlaces)) ? Number(decimalPlaces) : MIN_PRICE_DECIMALS;
  return Math.min(MAX_PRICE_DECIMALS, Math.max(MIN_PRICE_DECIMALS, value));
}
function formatPrice(value, decimalPlaces = MIN_PRICE_DECIMALS) {
  if (value === "" || value === null || value === undefined || !Number.isFinite(Number(value))) return "";
  return Number(value).toFixed(normalizePricePrecision(decimalPlaces));
}
function getPriceTokens(line,minValue=0.000001){if(normTime(line))return[];return[...String(line).matchAll(/(?<![-－])\b\d+(?:\.\d{1,6})\b/g)].map(match=>({value:Number(match[0]),raw:match[0],decimalPlaces:rawDecimalPlaces(match[0])})).filter(token=>token.value>=minValue&&token.value<=3);}
function getPositiveNumbers(line,minValue=0.000001){return getPriceTokens(line,minValue).map(token=>token.value);}
function isNumericOnlyLine(line){const normalized=String(line).replace(/[元度\s/]/g,"");return/^\d+(?:\.\d{1,6})$/.test(normalized);}
function isIgnoreLabel(line){return/电费|服务费|优惠金额|最高优惠|立减|已减|已降|补贴|省\d|当前时间|更新时间/.test(line);}
function isPriceLabel(line){if(isIgnoreLabel(line)||normTime(line))return false;return/会员|VIP|黑钻|优惠价|挂牌价|电站价|站点价|快电价|闪联价|华自价|YKC价|原价|折扣价|专享|活动价|充电单价|充电总价|合计|应付金额|当前价|收费金额/.test(line);}
function pricesEqual(a,b){return Math.abs(a-b)<=PRICE_EQUAL_TOLERANCE;}
function formulaNearlyEqual(a,b){return Math.abs(a-b)<=FORMULA_TOLERANCE;}
function formulaTotal(window){if(window.length===3){if(formulaNearlyEqual(window[0]+window[1],window[2]))return{total:window[2],index:2,kind:"sum"};if(formulaNearlyEqual(window[1]+window[2],window[0]))return{total:window[0],index:0,kind:"sum"};if(formulaNearlyEqual(window[0]+window[2],window[1]))return{total:window[1],index:1,kind:"sum"};}if(window.length===4){if(formulaNearlyEqual(window[0]+window[1]-window[2],window[3]))return{total:window[3],index:3,kind:"adjusted"};if(formulaNearlyEqual(window[1]+window[2]-window[3],window[0]))return{total:window[0],index:0,kind:"adjusted"};}return null;}
function findFormulaResolution(prices){const matches=[];for(let size of[4,3]){for(let start=0;start+size<=prices.length;start++){const relation=formulaTotal(prices.slice(start,start+size));if(relation&&relation.total>=0.25&&relation.total<=3)matches.push({...relation,index:start+relation.index});}}const totals=uniqueSorted(matches.map(item=>item.total));if(totals.length!==1)return null;const match=matches.find(item=>pricesEqual(item.total,totals[0]));return{...match,total:totals[0]};}
function collectGroupNumbers(lines,startIndex){const tokens=[];let endIndex=startIndex-1;for(let i=startIndex;i<lines.length;i++){if(normTime(lines[i])||isPriceLabel(lines[i])||isIgnoreLabel(lines[i]))break;const lineTokens=getPriceTokens(lines[i]);if(lineTokens.length)tokens.push(...lineTokens);endIndex=i;}return{endIndex,prices:tokens.map(token=>token.value),tokens};}
function collectExplicitComponents(lines,startIndex){
  const result={electricity:[],service:[],adjustment:[]};
  const adjustmentPattern=/优惠金额|最高优惠|立减|已减|已降|补贴/;
  let kind="";
  for(let i=startIndex;i<lines.length;i++){
    const line=lines[i];
    if(normTime(line)||isPriceLabel(line))break;
    if(/电费/.test(line))kind="electricity";
    else if(/服务费/.test(line))kind="service";
    const adjustmentMatch=line.match(adjustmentPattern);
    if(adjustmentMatch){
      const adjustmentIndex=adjustmentMatch.index||0;
      const precedingTokens=getPriceTokens(line.slice(0,adjustmentIndex));
      if(kind&&kind!=="adjustment"&&precedingTokens.length)result[kind].push(...precedingTokens.map(token=>token.value));
      kind="adjustment";
      const adjustmentTokens=getPriceTokens(line.slice(adjustmentIndex));
      if(adjustmentTokens.length)result.adjustment.push(...adjustmentTokens.map(token=>token.value));
      continue;
    }
    const numbers=getPositiveNumbers(line);
    if(kind&&numbers.length)result[kind].push(...numbers);
    else if(isIgnoreLabel(line)&&!/电费|服务费/.test(line))kind="";
  }
  return result;
}
function createPriceGroup(label,start,end,rawPrices,componentEvidence={electricity:[],service:[],adjustment:[]},rawPriceTokens=[]){return{label,start,end,rawPrices:[...rawPrices],rawPriceTokens:rawPriceTokens.length?[...rawPriceTokens]:rawPrices.map(value=>({value,raw:String(value),decimalPlaces:rawDecimalPlaces(value)})),componentEvidence,prices:[],priceDetails:[],total:null,totalIndex:-1,totalPrecision:MIN_PRICE_DECIMALS,evidence:"unresolved",needsReview:false,conflict:false,warnings:[],formulaStatus:"unknown",totalSource:"unresolved",rawPriceCount:rawPrices.length};}
function parsePriceGroups(lines){const groups=[];let i=0;while(i<lines.length){if(normTime(lines[i])){i++;continue;}if(isIgnoreLabel(lines[i])){i++;while(i<lines.length&&!normTime(lines[i])&&!isPriceLabel(lines[i]))i++;continue;}if(isPriceLabel(lines[i])){const sameLineTokens=getPriceTokens(lines[i]);const collected=collectGroupNumbers(lines,i+1);const rawPriceTokens=[...sameLineTokens,...collected.tokens];const rawPrices=rawPriceTokens.map(token=>token.value);if(rawPrices.length){groups.push(createPriceGroup(lines[i],i,collected.endIndex,rawPrices,collectExplicitComponents(lines,collected.endIndex+1),rawPriceTokens));}else{let timeIndex=-1;for(let j=i+1;j<lines.length;j++){if(isPriceLabel(lines[j]))break;if(normTime(lines[j])){timeIndex=j;break;}}if(timeIndex!==-1){const afterTime=collectGroupNumbers(lines,timeIndex+1);if(afterTime.prices.length){groups.push(createPriceGroup(lines[i],timeIndex+1,afterTime.endIndex,afterTime.prices,collectExplicitComponents(lines,afterTime.endIndex+1),afterTime.tokens));i=Math.max(afterTime.endIndex+1,i+1);continue;}}}i=Math.max(collected.endIndex+1,i+1);continue;}if(getPositiveNumbers(lines[i]).length){const collected=collectGroupNumbers(lines,i);if(collected.prices.length)groups.push(createPriceGroup("未标注价格组",i,collected.endIndex,collected.prices,collectExplicitComponents(lines,collected.endIndex+1),collected.tokens));i=collected.endIndex+1;continue;}i++;}return groups;}
function extractPriceGroups(lines){return parsePriceGroups(lines).map((group,index)=>({...group,id:`price-group-${index+1}`,normalizedLabel:normalizeLabel(group.label)}));}
function dominantTotalIndex(groups,minVotes,minRatio){const votes=new Map();for(const group of groups){if(group.evidence!=="formula"||group.totalIndex<0)continue;votes.set(group.totalIndex,(votes.get(group.totalIndex)||0)+1);}const ranked=[...votes.entries()].sort((a,b)=>b[1]-a[1]);if(!ranked.length)return-1;const totalVotes=ranked.reduce((sum,item)=>sum+item[1],0);return ranked[0][1]>=minVotes&&ranked[0][1]/totalVotes>=minRatio?ranked[0][0]:-1;}
function priceDetailForRawIndex(group,index){const token=group.rawPriceTokens?.[index];return{value:group.rawPrices[index],raw:token?.raw??String(group.rawPrices[index]),decimalPlaces:token?.decimalPlaces??rawDecimalPlaces(group.rawPrices[index])};}
function uniquePriceDetails(details){const sorted=details.filter(detail=>Number.isFinite(Number(detail?.value))).map(detail=>({...detail,value:Number(detail.value),decimalPlaces:detail.decimalPlaces??rawDecimalPlaces(detail.raw)})).sort((a,b)=>a.value-b.value);const unique=[];for(const detail of sorted){const previous=unique[unique.length-1];if(previous&&pricesEqual(previous.value,detail.value)){if(normalizePricePrecision(detail.decimalPlaces)>normalizePricePrecision(previous.decimalPlaces))unique[unique.length-1]=detail;}else unique.push(detail);}return unique;}
function setGroupPriceDetails(group,indexes){group.priceDetails=uniquePriceDetails(indexes.map(index=>priceDetailForRawIndex(group,index)));group.prices=group.priceDetails.map(detail=>detail.value);if(group.totalIndex>=0)group.totalPrecision=priceDetailForRawIndex(group,group.totalIndex).decimalPlaces;else if(group.priceDetails.length===1)group.totalPrecision=group.priceDetails[0].decimalPlaces;}
function groupDisplayPrecision(group){return Math.max(MIN_PRICE_DECIMALS,...(group.rawPriceTokens||[]).map(token=>token.decimalPlaces||0));}
function resolvePriceGroupTotals(groups){
for(const group of groups){
group.rawPriceCount=group.rawPrices.length;group.formulaStatus="unknown";group.totalSource="unresolved";group.priceDetails=[];
const electricity=group.componentEvidence.electricity;const service=group.componentEvidence.service;const adjustment=group.componentEvidence.adjustment||[];const hasAdjustment=adjustment.length>0;
if(electricity.length&&service.length){
const checkedCount=Math.min(group.rawPrices.length,electricity.length,service.length,...(hasAdjustment?[adjustment.length]:[]));const validatedIndexes=[];
for(let index=0;index<checkedCount;index++){const componentTotal=electricity[index]+service[index]-(hasAdjustment?adjustment[index]:0);if(formulaNearlyEqual(componentTotal,group.rawPrices[index]))validatedIndexes.push(index);}
if(validatedIndexes.length){setGroupPriceDetails(group,validatedIndexes);group.total=group.prices.length===1?group.prices[0]:null;group.evidence="parallel-formula";group.totalSource="parallel-formula";group.formulaStatus=validatedIndexes.length<checkedCount?"partial":"passed";if(validatedIndexes.length<group.rawPrices.length){group.formulaStatus="partial";group.needsReview=true;group.conflict=true;group.warnings.push(hasAdjustment?"部分显示总价与电费、服务费及优惠调整后的结果不一致。":"部分显示总价与对应电费、服务费之和不一致。");}continue;}
if(checkedCount===1){const componentSum=electricity[0]+service[0]-(hasAdjustment?adjustment[0]:0);group.total=group.rawPrices[0];group.totalIndex=0;setGroupPriceDetails(group,[0]);group.evidence="explicit-component-conflict";group.totalSource="explicit-component-conflict";group.formulaStatus="conflict";group.needsReview=true;group.conflict=true;group.warnings.push(hasAdjustment?`总价 ${formatPrice(group.total,group.totalPrecision)} 与电费、服务费及优惠调整后的结果 ${formatPrice(componentSum,groupDisplayPrecision(group))} 不一致。`:`总价 ${formatPrice(group.total,group.totalPrecision)} 与电费、服务费之和 ${formatPrice(componentSum,groupDisplayPrecision(group))} 不一致。`);continue;}
}
const formula=findFormulaResolution(group.rawPrices);if(!formula)continue;group.total=formula.total;group.totalIndex=formula.index;setGroupPriceDetails(group,[formula.index]);group.evidence="formula";group.totalSource="formula";group.formulaStatus="passed";
}
for(const group of groups){
if(group.prices.length)continue;
if(group.rawPrices.length===1){const value=group.rawPrices[0];if(value>=0.25&&value<=3){group.total=value;group.totalIndex=0;setGroupPriceDetails(group,[0]);group.evidence="single";group.totalSource="single";group.needsReview=true;group.warnings.push("价格组只有一个数字，无法校验组成项");}continue;}
const sameLabel=groups.filter(item=>normalizeLabel(item.label)===normalizeLabel(group.label)&&item.rawPrices.length===group.rawPrices.length);const sameShape=groups.filter(item=>item.rawPrices.length===group.rawPrices.length);let templateIndex=dominantTotalIndex(sameLabel,2,.67);if(templateIndex<0)templateIndex=dominantTotalIndex(sameShape,3,.75);
if(templateIndex>=0&&templateIndex<group.rawPrices.length){const value=group.rawPrices[templateIndex];if(value>=0.25&&value<=3){group.total=value;group.totalIndex=templateIndex;setGroupPriceDetails(group,[templateIndex]);group.evidence="document-template";group.totalSource="document-template";group.needsReview=true;group.warnings.push("只能根据同一文本的数字位置推断总价。");if(group.rawPrices.length===3){const components=group.rawPrices.filter((_,index)=>index!==templateIndex);if(!formulaNearlyEqual(components[0]+components[1],value)){group.formulaStatus="conflict";group.conflict=true;group.warnings.push(`总价 ${formatPrice(value,group.totalPrecision)} 与组成项之和 ${formatPrice(components[0]+components[1],groupDisplayPrecision(group))} 不一致。`);}}}}
}
for(const group of groups){if(!group.prices.length&&group.rawPrices.length){group.needsReview=true;group.totalSource="unresolved";group.warnings.push("无法从价格组中确认唯一总价");}}
return groups;
}
function isUnlabeledGroup(group){return!group.label||group.label.includes("未标注");}
function normalizeLabel(label){return String(label||"").replace(/\s+/g,"").trim();}const UNLABELED_TEMPLATE="__UNLABELED__";
function previousTimeForGroup(timeItems,position){let result=null;for(const item of timeItems){if(item.index<position)result=item;else break;}return result;}
function nextTimeForGroup(timeItems,position){return timeItems.find(item=>item.index>position)||null;}
function enrichPriceGroupsWithTimeContext(groups,timeItems){return groups.map(group=>{const previousTime=previousTimeForGroup(timeItems,group.start);const nextTime=nextTimeForGroup(timeItems,group.end);return{...group,previousTimeIndex:previousTime?.index??null,nextTimeIndex:nextTime?.index??null,distanceToPreviousTime:previousTime?group.start-previousTime.index:null,distanceToNextTime:nextTime?nextTime.index-group.end:null};});}
function hasLeadingUnlabeledGroups(timeItems,groups){return timeItems.some(timeItem=>groups.some(group=>isUnlabeledGroup(group)&&group.start>timeItem.index&&group.start-timeItem.index<=3));}
function inferLabelTemplate(groups,timeItems){const labels=groups.filter(group=>!isUnlabeledGroup(group)).map(group=>normalizeLabel(group.label));const hasLeadingUnlabeled=hasLeadingUnlabeledGroups(timeItems,groups);const uniqueLabels=[...new Set(labels)];if(hasLeadingUnlabeled&&uniqueLabels.length===1&&labels.length>=2)return[UNLABELED_TEMPLATE,uniqueLabels[0]];if(labels.length<4)return[];for(let size=2;size<=Math.min(4,Math.floor(labels.length/2));size++){const template=labels.slice(0,size);if(new Set(template).size!==template.length)continue;let matches=0;for(let i=0;i<labels.length;i++)if(labels[i]===template[i%size])matches++;if(matches/labels.length>=.75)return hasLeadingUnlabeled?[UNLABELED_TEMPLATE,...template]:template;}return[];}
function labelIndexInTemplate(group,template){if(isUnlabeledGroup(group))return template.findIndex(item=>item===UNLABELED_TEMPLATE);return template.findIndex(item=>item===normalizeLabel(group.label));}
function assignGroupsByTemplate(timeItems,groups,template){const byTimeIndex=new Map(timeItems.map(item=>[item.index,[]]));const used=new Set();for(let t=0;t<timeItems.length;t++){const prevTimeIndex=t?timeItems[t-1].index:-1;const current=timeItems[t];const nextTimeIndex=t<timeItems.length-1?timeItems[t+1].index:Infinity;const selected=[];const selectedLabels=new Set();const tryTake=(group,source)=>{const templateIndex=labelIndexInTemplate(group,template);if(templateIndex===-1||selectedLabels.has(templateIndex)||used.has(group))return false;selected.push({...group,source});selectedLabels.add(templateIndex);used.add(group);return selectedLabels.size===template.length;};const beforeGroups=groups.filter(group=>!used.has(group)&&!isUnlabeledGroup(group)&&group.start>prevTimeIndex&&group.end<current.index);for(const group of beforeGroups)if(tryTake(group,"前置价格组"))break;const afterGroups=groups.filter(group=>!used.has(group)&&!isUnlabeledGroup(group)&&group.start>current.index&&group.start<nextTimeIndex);for(const group of afterGroups)if(tryTake(group,"后置价格组"))break;if(selected.length)byTimeIndex.set(current.index,selected);}return{byTimeIndex,used};}
function buildProvisionalGroupsByTime(timeItems,groups){const template=inferLabelTemplate(groups,timeItems);if(template.length){const templated=assignGroupsByTemplate(timeItems,groups,template);for(const group of groups){if(templated.used.has(group)||!isUnlabeledGroup(group))continue;const owner=previousTimeForGroup(timeItems,group.start)||nextTimeForGroup(timeItems,group.end);if(owner&&!(templated.byTimeIndex.get(owner.index)||[]).length)templated.byTimeIndex.get(owner.index).push({...group,source:"未标注价格组"});}return templated.byTimeIndex;}const byTimeIndex=new Map(timeItems.map(item=>[item.index,[]]));for(const group of groups){const prev=previousTimeForGroup(timeItems,group.start);const next=nextTimeForGroup(timeItems,group.end);let owner=prev||next;if(prev&&next){const prevDistance=group.start-prev.index;const nextDistance=next.index-group.end;owner=prevDistance<=2?prev:(nextDistance<prevDistance?next:prev);}if(owner)byTimeIndex.get(owner.index).push({...group,source:prev&&next&&owner===next?"前置价格组":"后置价格组"});}return byTimeIndex;}
function majorityValue(values,fallback){if(!values.length)return{value:fallback,count:0,ratio:0};const counts=new Map();for(const value of values)counts.set(value,(counts.get(value)||0)+1);const ranked=[...counts.entries()].sort((a,b)=>b[1]-a[1]);return{value:ranked[0][0],count:ranked[0][1],ratio:ranked[0][1]/values.length};}
function profileDirection(groups,timeItem){const directions=groups.map(group=>group.start>timeItem.index?"after-time":(group.end<timeItem.index?"before-time":"unknown")).filter(direction=>direction!=="unknown");if(!directions.length)return"unknown";const unique=new Set(directions);return unique.size===1?directions[0]:"mixed";}
function buildDocumentProfile(timeItems,groups){
const emptyProfile={majorityGroupCount:0,majorityLabelSequence:[],majorityRawPriceShape:[],majorityTotalIndexByLabel:{},majorityDirection:"unknown",confidence:0,structureStrength:"none",timeCount:timeItems.length,evidenceCount:0,rawLabelSequence:groups.map(group=>group.normalizedLabel||normalizeLabel(group.label)),examples:[]};
if(!timeItems.length)return emptyProfile;
const groupsByTime=buildProvisionalGroupsByTime(timeItems,groups);
const examples=timeItems.map(timeItem=>{const sectionGroups=groupsByTime.get(timeItem.index)||[];return{timeIndex:timeItem.index,timeLabel:timeItem.label,groupCount:sectionGroups.length,labelSequence:sectionGroups.map(group=>group.normalizedLabel||normalizeLabel(group.label)),rawPriceShape:sectionGroups.map(group=>group.rawPriceCount??group.rawPrices.length),direction:profileDirection(sectionGroups,timeItem)};});
const evidenceExamples=examples.filter(example=>example.groupCount>0);
const groupCountMajority=majorityValue(evidenceExamples.map(example=>example.groupCount),0);
const labelMajority=majorityValue(evidenceExamples.map(example=>JSON.stringify(example.labelSequence)),"[]");
const shapeMajority=majorityValue(evidenceExamples.map(example=>JSON.stringify(example.rawPriceShape)),"[]");
const knownDirections=evidenceExamples.map(example=>example.direction).filter(direction=>direction!=="unknown");
const directionMajority=majorityValue(knownDirections,"unknown");
let majorityDirection=directionMajority.value;
if(knownDirections.length&&majorityDirection!=="mixed"&&directionMajority.ratio<.67)majorityDirection="mixed";
const totalIndexesByLabel=new Map();
for(const group of groups){const label=group.normalizedLabel||normalizeLabel(group.label);if(!label||group.totalIndex<0)continue;if(!totalIndexesByLabel.has(label))totalIndexesByLabel.set(label,[]);totalIndexesByLabel.get(label).push(group.totalIndex);}
const majorityTotalIndexByLabel={};
for(const[label,indexes]of totalIndexesByLabel)majorityTotalIndexByLabel[label]=majorityValue(indexes,-1).value;
const confidenceParts=[groupCountMajority.ratio,labelMajority.ratio,shapeMajority.ratio];
if(knownDirections.length)confidenceParts.push(directionMajority.ratio);
const confidence=confidenceParts.length?Number((confidenceParts.reduce((sum,value)=>sum+value,0)/confidenceParts.length).toFixed(3)):0;
let structureStrength="none";
if(evidenceExamples.length===2)structureStrength="weak";
else if(evidenceExamples.length>=3)structureStrength=groupCountMajority.ratio>=.67&&labelMajority.ratio>=.67&&shapeMajority.ratio>=.67?"strong":"weak";
return{majorityGroupCount:groupCountMajority.value,majorityLabelSequence:JSON.parse(labelMajority.value),majorityRawPriceShape:JSON.parse(shapeMajority.value),majorityTotalIndexByLabel,majorityDirection,confidence,structureStrength,timeCount:timeItems.length,evidenceCount:evidenceExamples.length,rawLabelSequence:groups.map(group=>group.normalizedLabel||normalizeLabel(group.label)),examples};
}
function scoreAssignmentCandidate(candidate,group,targetTime,documentProfile){let score=0;const reasons=[];let hardInvalid=false;if(candidate.relation==="unassigned"){score-=10;reasons.push("价格组保持未归属");return{...candidate,score,hardInvalid,reasons};}if(!targetTime){return{...candidate,score:-Infinity,hardInvalid:true,reasons:["目标时间不存在"]};}if(isIgnoreLabel(group.label)){hardInvalid=true;reasons.push("电费、服务费、优惠或补贴不能作为总价价格组");}const label=group.normalizedLabel||normalizeLabel(group.label);const expectedLabels=documentProfile.majorityLabelSequence||[];if(expectedLabels.includes(label)){score+=3;reasons.push("符合多数标签序列");}if(group.formulaStatus==="passed"){score+=5;reasons.push("总价公式成立");}else if(group.formulaStatus==="partial"){score+=1;reasons.push("总价公式部分成立");}else if(group.formulaStatus==="conflict"){score-=7;reasons.push("总价公式冲突");}if(group.totalSource==="document-template"){score-=2;reasons.push("总价依赖文档模板推断");}const expectedTotalIndex=documentProfile.majorityTotalIndexByLabel?.[label];if(expectedTotalIndex!==undefined&&group.totalIndex===expectedTotalIndex){score+=2;reasons.push("总价位置符合多数结构");}if(documentProfile.majorityDirection!=="unknown"&&documentProfile.majorityDirection!=="mixed"){if(candidate.relation===documentProfile.majorityDirection){score+=3;reasons.push("符合主要排列方向");}else{score-=2;reasons.push("不符合主要排列方向");}}const distance=candidate.relation==="after-time"?group.distanceToPreviousTime:group.distanceToNextTime;if(Number.isFinite(distance)){const distanceScore=Math.max(-2,3-distance*.35);score+=distanceScore;reasons.push("按与时间锚点的距离计分");}if(group.previousTimeIndex!==null&&group.nextTimeIndex!==null){score-=1;reasons.push("价格组位于两个时间锚点之间");}return{...candidate,score:Number(score.toFixed(3)),hardInvalid,reasons};}
function buildAssignmentCandidates(groups,timeItems,documentProfile){const timeByIndex=new Map(timeItems.map(item=>[item.index,item]));return groups.flatMap(group=>{const raw=[{groupId:group.id,targetTimeIndex:group.previousTimeIndex,relation:"after-time"},{groupId:group.id,targetTimeIndex:group.nextTimeIndex,relation:"before-time"},{groupId:group.id,targetTimeIndex:null,relation:"unassigned"}];const unique=new Map();for(const candidate of raw){const key=String(candidate.targetTimeIndex);if(candidate.targetTimeIndex!==null&&!timeByIndex.has(candidate.targetTimeIndex))continue;if(!unique.has(key))unique.set(key,scoreAssignmentCandidate(candidate,group,timeByIndex.get(candidate.targetTimeIndex),documentProfile));}return[...unique.values()];});}
function scoreCompletedAssignment(state,timeItems,groups,documentProfile){let score=state.score;const expectedCount=documentProfile.majorityGroupCount||0;const expectedLabels=documentProfile.majorityLabelSequence||[];const expectedShape=documentProfile.majorityRawPriceShape||[];for(const timeItem of timeItems){const assigned=state.byTime.get(timeItem.index)||[];if(expectedCount){const difference=Math.abs(assigned.length-expectedCount);score+=difference===0?6:-difference*4;if(!assigned.length)score-=6;}const labels=assigned.map(item=>item.group.normalizedLabel||normalizeLabel(item.group.label));const shapes=assigned.map(item=>item.group.rawPriceCount??item.group.rawPrices.length);for(let index=0;index<Math.min(labels.length,expectedLabels.length);index++)score+=labels[index]===expectedLabels[index]?2:-1;for(let index=0;index<Math.min(shapes.length,expectedShape.length);index++)score+=shapes[index]===expectedShape[index]?1:0;const duplicateCount=labels.length-new Set(labels).size;score-=duplicateCount*7;}return Number(score.toFixed(3));}
function findBestAssignmentPlan(candidates,groups,timeItems,documentProfile){const candidatesByGroup=new Map(groups.map(group=>[group.id,candidates.filter(candidate=>candidate.groupId===group.id)]));const timeOrder=new Map(timeItems.map((item,index)=>[item.index,index]));let states=[{choices:[],byTime:new Map(timeItems.map(item=>[item.index,[]])),score:0,lastTarget:-1}];for(const group of groups){const nextStates=[];for(const state of states){for(const candidate of candidatesByGroup.get(group.id)||[]){if(candidate.hardInvalid)continue;const targetOrder=candidate.targetTimeIndex===null?state.lastTarget:timeOrder.get(candidate.targetTimeIndex);if(candidate.targetTimeIndex!==null&&targetOrder<state.lastTarget)continue;const byTime=new Map([...state.byTime].map(([key,value])=>[key,[...value]]));let incremental=candidate.score;if(candidate.targetTimeIndex!==null){const assigned=byTime.get(candidate.targetTimeIndex);const label=group.normalizedLabel||normalizeLabel(group.label);if(assigned.some(item=>(item.group.normalizedLabel||normalizeLabel(item.group.label))===label))incremental-=7;const expectedCount=documentProfile.majorityGroupCount||0;if(expectedCount&&assigned.length<expectedCount)incremental+=2;else if(expectedCount&&assigned.length>=expectedCount)incremental-=4;assigned.push({group,candidate});}nextStates.push({choices:[...state.choices,candidate],byTime,score:state.score+incremental,lastTarget:candidate.targetTimeIndex===null?state.lastTarget:targetOrder});}}states=nextStates.sort((a,b)=>b.score-a.score).slice(0,512);if(!states.length)break;}const ranked=states.map(state=>({...state,finalScore:scoreCompletedAssignment(state,timeItems,groups,documentProfile)})).sort((a,b)=>b.finalScore-a.finalScore);const best=ranked[0]||{choices:[],byTime:new Map(timeItems.map(item=>[item.index,[]])),finalScore:0};const second=ranked.find(state=>state.choices.some((choice,index)=>choice.targetTimeIndex!==best.choices[index]?.targetTimeIndex));const ambiguous=Boolean(second&&best.finalScore-second.finalScore<=1);const warning="存在多个近似最优归属方案，请对照截图确认。";const affectedTimes=new Set();if(ambiguous){for(let index=0;index<best.choices.length;index++){if(best.choices[index]?.targetTimeIndex===second.choices[index]?.targetTimeIndex)continue;if(best.choices[index]?.targetTimeIndex!==null)affectedTimes.add(best.choices[index].targetTimeIndex);if(second.choices[index]?.targetTimeIndex!==null)affectedTimes.add(second.choices[index].targetTimeIndex);}}const byTimeIndex=new Map(timeItems.map(item=>[item.index,[]]));for(const[timeIndex,items]of best.byTime){for(const item of items){const needsAmbiguousReview=ambiguous&&affectedTimes.has(timeIndex);const assignmentWarnings=needsAmbiguousReview?[warning]:[];byTimeIndex.get(timeIndex).push({...item.group,source:item.candidate.relation==="before-time"?"前置价格组":"后置价格组",assignmentScore:item.candidate.score,assignmentAmbiguous:needsAmbiguousReview,needsReview:item.group.needsReview||needsAmbiguousReview,warnings:[...new Set([...item.group.warnings,...assignmentWarnings])]});}}return{byTimeIndex,planScore:best.finalScore,ambiguous,warnings:ambiguous?[warning]:[]};}
function assignGroupsToSections(timeItems,groups){const documentProfile=buildDocumentProfile(timeItems,groups);const candidates=buildAssignmentCandidates(groups,timeItems,documentProfile);const plan=findBestAssignmentPlan(candidates,groups,timeItems,documentProfile);plan.byTimeIndex.planScore=plan.planScore;plan.byTimeIndex.ambiguous=plan.ambiguous;plan.byTimeIndex.warnings=plan.warnings;plan.byTimeIndex.documentProfile=documentProfile;return plan.byTimeIndex;}
function buildSectionReviewMeta(groups,documentProfile){const actualGroupCount=groups.length;const majorityGroupCount=documentProfile.majorityGroupCount||0;const warnings=[];const hasStrongStructure=documentProfile.structureStrength==="strong";if(hasStrongStructure&&majorityGroupCount&&actualGroupCount!==majorityGroupCount)warnings.push(`当前时段识别到 ${actualGroupCount} 个价格组，多数时段为 ${majorityGroupCount} 个。`);const actualLabels=new Set(groups.map(group=>group.normalizedLabel||normalizeLabel(group.label)));const expectedLabels=hasStrongStructure?(documentProfile.majorityLabelSequence||[]).filter(label=>label&&label!==UNLABELED_TEMPLATE&&!label.includes("未标注")):[];const missingLabels=[...new Set(expectedLabels.filter(label=>!actualLabels.has(label)))];if(hasStrongStructure&&missingLabels.length)warnings.push(`当前时段缺少多数结构中的 ${missingLabels.join("、")}。`);return{needsReview:warnings.length>0,warnings,actualGroupCount,majorityGroupCount,missingLabels,structureStrength:documentProfile.structureStrength};}
function uniqueSorted(prices){const sorted=prices.map(Number).filter(Number.isFinite).sort((a,b)=>a-b);const unique=[];for(const price of sorted){if(!unique.length||!pricesEqual(unique[unique.length-1],price))unique.push(price);}return unique;}
function sameResolvedGroups(leftGroups,rightGroups){if(leftGroups.length!==rightGroups.length)return false;for(let index=0;index<leftGroups.length;index++){const left=leftGroups[index];const right=rightGroups[index];if((left.normalizedLabel||normalizeLabel(left.label))!==(right.normalizedLabel||normalizeLabel(right.label)))return false;const leftPrices=left.priceDetails||[];const rightPrices=right.priceDetails||[];if(leftPrices.length!==rightPrices.length)return false;for(let priceIndex=0;priceIndex<leftPrices.length;priceIndex++)if(!pricesEqual(leftPrices[priceIndex].value,rightPrices[priceIndex].value))return false;}return true;}
function sectionVariant(section){return{label:section.label,priceDetails:section.priceDetails,prices:section.prices,groups:section.groups};}
function parseSections(text,mode=currentParseMode){
const lines=parseLines(preprocessInput(text,mode));
const timeItems=extractTimeItems(lines);
const groups=resolvePriceGroupTotals(enrichPriceGroupsWithTimeContext(extractPriceGroups(lines),timeItems));
const documentProfile=buildDocumentProfile(timeItems,groups);
const groupsByTime=assignGroupsToSections(timeItems,groups);
const sections=timeItems.map((timeItem,pos)=>{const nextTimeIndex=pos<timeItems.length-1?timeItems[pos+1].index:lines.length;const sectionGroups=groupsByTime.get(timeItem.index)||[];const priceDetails=uniquePriceDetails(sectionGroups.flatMap(group=>group.priceDetails||[]));return{...timeItem,priceDetails,prices:priceDetails.map(detail=>detail.value),groups:sectionGroups,raw:lines.slice(timeItem.index,nextTimeIndex)};});
const merged=new Map();
for(const section of sections){
const key=`${section.start}-${section.end}`;
if(!merged.has(key)){merged.set(key,{...section,duplicates:1,duplicateConflict:false,duplicateVariants:[sectionVariant(section)]});continue;}
const current=merged.get(key);
current.duplicates+=1;
current.duplicateVariants.push(sectionVariant(section));
if(!sameResolvedGroups(current.groups,section.groups))current.duplicateConflict=true;
}
const result=[...merged.values()];
for(const section of result){
const meta=buildSectionReviewMeta(section.groups,documentProfile);
if(section.duplicateConflict){meta.needsReview=true;meta.warnings.push(`截图时段 ${section.label} 重复出现，且价格内容不一致，请对照原始文本确认。`);}
section.meta=meta;
}
result.documentProfile=documentProfile;
return result;
}
function priceLabelRole(label){const text=normalizeLabel(label);if(/非会员/.test(text))return{role:"nonMember",strength:"explicit"};if(/VIP|会员|黑钻|专享/.test(text))return{role:"member",strength:"explicit"};if(/挂牌价|原价|标准价/.test(text))return{role:"nonMember",strength:"experience"};return{role:"unknown",strength:"none"};}
function findLabelPriceConflict(groups){const members=groups.filter(group=>group.total!==null&&priceLabelRole(group.label).role==="member");const nonMembers=groups.filter(group=>group.total!==null&&priceLabelRole(group.label).role==="nonMember");for(const memberGroup of members){for(const nonMemberGroup of nonMembers){if(memberGroup.total>nonMemberGroup.total&&!pricesEqual(memberGroup.total,nonMemberGroup.total))return`${memberGroup.label}高于${nonMemberGroup.label}，名称含义与会员价高低规则冲突。`;}}return"";}
function sectionPricePair(section){const priceDetails=uniquePriceDetails(section.priceDetails?.length?section.priceDetails:section.prices.map(value=>({value,decimalPlaces:MIN_PRICE_DECIMALS})));if(!priceDetails.length)return null;const memberDetail=priceDetails[0];const nonMemberDetail=priceDetails.length===1?memberDetail:priceDetails[1];return{section,priceDetails,prices:priceDetails.map(detail=>detail.value),member:memberDetail.value,nonMember:nonMemberDetail.value,memberPrecision:memberDetail.decimalPlaces,nonMemberPrecision:nonMemberDetail.decimalPlaces};}
function joinReviewNotes(notes){const unique=[...new Set(notes.map(note=>String(note||"").trim()).filter(Boolean))];if(!unique.length)return"";return`${unique.map(note=>note.replace(/[。；]+$/g,"")).join("；")}。`;}
function appendSectionReviewNotes(section,notes){let needsReview=false;const groups=section.groups||[];const unresolvedGroups=groups.filter(group=>group.rawPrices?.length&&!group.prices?.length);const reviewGroups=groups.filter(group=>group.needsReview||group.conflict);for(const group of reviewGroups){needsReview=true;for(const warning of group.warnings)notes.push(`${group.label}：${warning}`);}if(unresolvedGroups.length){needsReview=true;notes.push(`${unresolvedGroups.map(group=>group.label).join("、")}：OCR 缺少关键数字，无法确认唯一总价。`);}if(section.meta?.needsReview){needsReview=true;notes.push(...section.meta.warnings);}const labelConflict=findLabelPriceConflict(groups);if(labelConflict){needsReview=true;notes.push(labelConflict);}return needsReview;}
function formatSectionPair(item){return`${item.section.label} 为 ${formatPrice(item.member,item.memberPrecision)}/${formatPrice(item.nonMember,item.nonMemberPrecision)}`;}
function chooseForTarget(sections,target){
const start=toMin(target.start);const end=toMin(target.end);
const matched=sections.filter(section=>section.end>start&&section.start<end);
const duplicateConflicts=matched.filter(section=>section.duplicateConflict);
if(duplicateConflicts.length){const notes=[];for(const section of duplicateConflicts)notes.push(...(section.meta?.warnings||[]));return{member:"",nonMember:"",memberPrecision:MIN_PRICE_DECIMALS,nonMemberPrecision:MIN_PRICE_DECIMALS,matched,available:[],best:null,status:"review",note:joinReviewNotes(notes)};}
const available=matched.map(sectionPricePair).filter(Boolean);
if(!available.length)return{member:"",nonMember:"",memberPrecision:MIN_PRICE_DECIMALS,nonMemberPrecision:MIN_PRICE_DECIMALS,matched,available,status:"missing",note:"未识别到可信总价，电费和服务费不会作为总价兜底"};
const ranked=[...available].sort((a,b)=>a.member-b.member||a.nonMember-b.nonMember);
const best=ranked[0];
const notes=[];let needsReview=false;
for(const item of available)if(appendSectionReviewNotes(item.section,notes))needsReview=true;
if(best.prices.length===1){needsReview=true;notes.push("只有一个可信总价，会员价和非会员价暂按同价处理。");}
if(matched.length>1){
needsReview=true;
const reference=available[0];
const hasMissingPair=available.length!==matched.length;
const hasDifferentPairs=available.some(item=>!pricesEqual(item.member,reference.member)||!pricesEqual(item.nonMember,reference.nonMember));
if(hasMissingPair||hasDifferentPairs){
const details=matched.map(section=>{const item=available.find(candidate=>candidate.section===section);return item?formatSectionPair(item):`${section.label} 未识别到完整价格`;});
notes.push(`一个系统时段匹配多个截图时段，且价格不一致：${details.join("；")}，请人工确认。`);
return{member:"",nonMember:"",memberPrecision:MIN_PRICE_DECIMALS,nonMemberPrecision:MIN_PRICE_DECIMALS,matched,available,best:null,status:"review",note:joinReviewNotes(notes)};
}
notes.push("一个系统时段匹配多个截图时段，已合并相同价格，请核对。");
}
if(!needsReview)notes.push("总价公式成立，结构与归属正常，已按价格从低到高确定会员价和非会员价。");
return{member:best.member,nonMember:best.nonMember,memberPrecision:best.memberPrecision,nonMemberPrecision:best.nonMemberPrecision,matched,available,best,status:needsReview?"review":"ok",note:joinReviewNotes(notes)};
}
function regressionPeriodId(period) {
  return `${period.start}-${period.end}`;
}
function getRegressionConfig(sample) {
  const table = TIME_TABLE_DATA.regions[sample.region]?.tables?.[sample.month];
  if (table) return { periods: table.periods.map(period => ({ ...period })) };
  return REGION_CONFIGS[sample.region] || null;
}
function formatRegressionPrice(value, decimalPlaces = MIN_PRICE_DECIMALS) {
  return formatPrice(value, decimalPlaces);
}
function regressionPriceMatches(expected, actual, actualPrecision) {
  if (expected === "") return actual === "";
  if (actual === "" || !Number.isFinite(Number(actual))) return false;
  return Math.abs(Number(expected) - Number(actual)) <= 0.0000005 && formatRegressionPrice(actual, actualPrecision) === expected;
}
function compareRegressionRow(expected, actual) {
  const differences = [];
  if (!actual) {
    differences.push({ field: "时段", expected: expected.period, actual: "未生成", reason: "整理结果中没有生成该目标时段。" });
    return differences;
  }
  if (!regressionPriceMatches(expected.member, actual.member, actual.memberPrecision)) {
    differences.push({ field: "会员价", expected: expected.member || "空", actual: formatRegressionPrice(actual.member, actual.memberPrecision) || "空", reason: actual.note || "会员价与业务预期不一致。" });
  }
  if (!regressionPriceMatches(expected.nonMember, actual.nonMember, actual.nonMemberPrecision)) {
    differences.push({ field: "非会员价", expected: expected.nonMember || "空", actual: formatRegressionPrice(actual.nonMember, actual.nonMemberPrecision) || "空", reason: actual.note || "非会员价与业务预期不一致。" });
  }
  if (expected.status !== actual.status) {
    differences.push({ field: "状态", expected: expected.status, actual: actual.status, reason: actual.note || "状态与业务预期不一致。" });
  }
  return differences;
}
function runRegressionSample(sample) {
  const config = getRegressionConfig(sample);
  if (!config) {
    return { id: sample.id, name: sample.name, mode: sample.mode, passed: false, differences: [{ period: "配置", field: "地区与月份", expected: `${sample.region}/${sample.month}`, actual: "不存在", reason: "样例引用的地区或月份配置不存在。" }], actualRows: [] };
  }
  const sections = parseSections(sample.input, sample.mode);
  const actualRows = config.periods.map(period => ({
    period: regressionPeriodId(period),
    ...chooseForTarget(sections, period)
  }));
  const actualByPeriod = new Map(actualRows.map(row => [row.period, row]));
  const differences = sample.expectedRows.flatMap(expected => compareRegressionRow(expected, actualByPeriod.get(expected.period)).map(difference => ({ period: expected.period, ...difference })));
  return {
    id: sample.id,
    name: sample.name,
    mode: sample.mode,
    region: sample.region,
    month: sample.month,
    passed: differences.length === 0,
    differences,
    expectedRows: sample.expectedRows,
    actualRows: actualRows.map(row => ({ period: row.period, member: row.member, memberPrecision: row.memberPrecision, nonMember: row.nonMember, nonMemberPrecision: row.nonMemberPrecision, status: row.status, note: row.note })),
    sectionCount: sections.length
  };
}
function runAllRegressionSamples() {
  const results = Object.values(REGRESSION_SAMPLES).map(runRegressionSample);
  const passed = results.filter(result => result.passed).length;
  return { total: results.length, passed, failed: results.length - passed, results };
}
function renderRegressionReport(report) {
  const container = document.getElementById("sampleRegressionReport");
  if (!container) return;
  container.hidden = false;
  const failures = report.results.filter(result => !result.passed);
  const summaryClass = report.failed ? "has-failures" : "all-passed";
  const failureHtml = failures.length ? failures.map(result => {
    const differences = result.differences.map(difference => `<li><span>${escapeHtml(difference.period)} · ${escapeHtml(difference.field)}</span><small>预期：${escapeHtml(difference.expected)}；实际：${escapeHtml(difference.actual)}</small><small>原因：${escapeHtml(difference.reason)}</small></li>`).join("");
    return `<details><summary>${escapeHtml(result.name)}<span>${result.differences.length} 项差异</span></summary><ul>${differences}</ul></details>`;
  }).join("") : `<p>全部样例均符合当前业务预期。</p>`;
  container.className = `sample-regression-report ${summaryClass}`;
  container.innerHTML = `<div class="sample-regression-summary"><strong>共 ${report.total} 个样例，通过 ${report.passed} 个，失败 ${report.failed} 个</strong><span>${report.failed ? "失败项保留为后续规则修复依据" : "全部通过"}</span></div>${failureHtml}`;
}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
let hasAnalysed = false;
let problemMode = false;
function svgIcon(name, className = "icon") {
return `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}
function periodIconName(period) {
if (period.tone === 4 || period.tone === 3 || /峰|尖/.test(period.name)) return "peak";
if (/谷/.test(period.name) && period.tone === 1) return "valley";
if (/谷/.test(period.name)) return "moon";
return "flat";
}
function formatMonthLabel(value) {
const match = String(value || "").match(/^(\d{4})-(\d{2})$/);
return match ? `${match[1]}年${match[2]}月` : "未设置";
}
function rowDisplayStatus(row) {
if (row.edited && row.member !== "" && row.nonMember !== "") return "ok";
if (row.status === "review") return "review";
if (row.member === "" || row.nonMember === "") return "missing";
return row.status;
}
function rowPricePrecision(row, kind) {
const stored = row[`${kind}Precision`];
return stored ?? rawDecimalPlaces(row[kind]);
}
function formatRowPrice(row, kind) {
return row[kind] === "" ? "" : formatPrice(row[kind], rowPricePrecision(row, kind));
}
function updateRowPrice(row, kind, rawValue) {
row[kind] = rawValue;
row[`${kind}Precision`] = rawDecimalPlaces(rawValue);
}
function getIssueReason(row) {
const displayStatus = rowDisplayStatus(row);
if (displayStatus === "review") return row.note || "当前价格需要对照原始文本确认。";
if (displayStatus === "missing") return "未识别到该时段价格，需要手动补充。";
return "";
}
function renderDashboardSummary() {
const total = resultRows.length;
const recognized = resultRows.filter(row => rowDisplayStatus(row) === "ok").length;
const review = resultRows.filter(row => rowDisplayStatus(row) === "review").length;
const missing = Math.max(total - recognized - review, 0);
const progress = total ? recognized / total * 360 : 0;
const recognitionCards = document.getElementById("recognitionCards");
recognitionCards.style.setProperty("--period-count", Math.max(total, 1));
recognitionCards.innerHTML = resultRows.map(row => {
const mainPrice = row.member !== "" ? formatRowPrice(row, "member") : (row.nonMember !== "" ? formatRowPrice(row, "nonMember") : "待补");
const member = row.member !== "" ? formatRowPrice(row, "member") : "待补";
const nonMember = row.nonMember !== "" ? formatRowPrice(row, "nonMember") : "待补";
return `<article class="recognition-card"><div class="recognition-card-top"><span class="period-glyph tone-${row.period.tone}">${svgIcon(periodIconName(row.period), "icon icon-sm")}</span><strong>${escapeHtml(row.period.name)}</strong></div><div class="range">${row.period.start}—${row.period.end}</div><div class="card-price">${escapeHtml(mainPrice)}<small>元/度</small></div><div class="card-dual">会员 ${member} · 非会员 ${nonMember}</div></article>`;
}).join("");
document.getElementById("statusRing").style.setProperty("--progress", `${progress}deg`);
document.getElementById("statusRingValue").textContent = recognized;
document.getElementById("recognizedCount").textContent = recognized;
document.getElementById("reviewCount").textContent = review;
document.getElementById("missingCount").textContent = missing;
document.getElementById("recognizedInfo").textContent = `识别出 ${parsedSections.length || recognized} 个时段`;
const missingMembers = resultRows.filter(row => row.member === "").length;
document.getElementById("memberInfo").textContent = missingMembers ? `${missingMembers} 个时段缺少会员价` : "会员价信息完整";
document.getElementById("effectiveMonthInfo").textContent = `生效月份：${formatMonthLabel(effectiveMonth.value)}`;
document.getElementById("regionInfo").textContent = `地区：${REGION_CONFIGS[regionSelect.value].name}`;
document.getElementById("resultSummary").textContent = parsedSections.length
? `已识别 ${parsedSections.length} 个截图时段，需核对 ${review + missing} 项`
: `已载入 ${total} 个时段，等待整理`;
}
function renderSchedule() {
const config = REGION_CONFIGS[regionSelect.value];
const month = effectiveMonth.value || "未设置";
document.getElementById("scheduleTitle").textContent = `${config.name}全天时段`;
document.getElementById("scheduleMeta").textContent = month;
document.getElementById("timeline").innerHTML = config.periods.map(period => {
const width = (toMin(period.end) - toMin(period.start)) / 1440 * 100;
const shortStart = period.start.replace(":00", "");
const shortEnd = period.end.replace(":00", "");
return `<div class="timeline-segment tone-${period.tone}" style="width:${width}%" title="${period.start}-${period.end}${period.name}"><span>${escapeHtml(period.name)}<br><small>${shortStart}—${shortEnd}</small></span></div>`;
}).join("");
document.getElementById("scheduleList").innerHTML = config.periods.map(period => `<div class="schedule-chip"><strong>${escapeHtml(period.name)}</strong><span class="mono">${period.start}-${period.end}</span></div>`).join("");
if (!resultRows.length) renderEmptyRows();
}
function renderEmptyRows() {
const config = REGION_CONFIGS[regionSelect.value];
const selection = getRegionSelection();
hasAnalysed = false;
problemMode = false;
resultRows = config.periods.map((period, index) => ({ index, period, selected: selection.selected.includes(periodId(period)), member: "", nonMember: "", matched: [], available: [], status: "missing", note: "等待识别", edited: false }));
parsedSections = [];
renderResults();
renderAudit();
noticeStack.innerHTML = `<div class="notice">已载入 ${config.name} ${config.periods.length} 个全天时段。粘贴完整文本后会自动整理。</div>`;
if (!rawInput.value.trim()) setInputWorkbenchState("idle");
}
function analyse() {
const text = rawInput.value.trim();
if (!text) {
renderEmptyRows();
noticeStack.innerHTML = `<div class="notice danger">请先粘贴 OCR 文本，或载入一个回归样例。</div>`;
setInputWorkbenchState("idle");
return;
}
parsedSections = parseSections(text,currentParseMode);
hasAnalysed = true;
problemMode = false;
const config = REGION_CONFIGS[regionSelect.value];
const selection = getRegionSelection();
resultRows = config.periods.map((period, index) => ({ index, period, selected: selection.selected.includes(periodId(period)), edited: false, ...chooseForTarget(parsedSections, period) }));
renderResults();
renderNotices();
renderAudit();
lastAnalysedText = rawInput.value;
lastAnalysedMode = currentParseMode;
setInputWorkbenchState("analysed");
}
function renderCorePrices() {
const section = document.getElementById("corePriceSection");
const grid = document.getElementById("corePriceGrid");
if (!section || !grid) return;
section.hidden = !hasAnalysed;
if (!hasAnalysed) {
grid.innerHTML = "";
return;
}
const rows = orderedSelectedRows();
grid.innerHTML = rows.length ? rows.map(row => {
const displayStatus = rowDisplayStatus(row);
const isProblem = displayStatus !== "ok";
const statusLabel = displayStatus === "missing" ? "缺失" : "需核对";
const issueIcon = displayStatus === "missing" ? "alert-circle" : "peak";
return `<div class="core-price-row ${isProblem ? `core-issue core-issue-${displayStatus}` : ""}" data-row-index="${row.index}"><div class="core-period"><strong>${escapeHtml(row.period.name)}<span>（${row.period.start}—${row.period.end}）</span></strong>${isProblem ? `<span class="core-status ${displayStatus}">${svgIcon(issueIcon, "icon icon-sm")}${statusLabel}</span>` : ""}</div><label><span>非会员价</span><input class="core-price-input ${row.nonMember === "" ? "field-missing" : ""}" data-kind="nonMember" inputmode="decimal" value="${formatRowPrice(row,"nonMember")}" placeholder="${row.nonMember === "" ? "缺失" : "待核对"}"></label><label><span>会员价</span><input class="core-price-input ${row.member === "" ? "field-missing" : ""}" data-kind="member" inputmode="decimal" value="${formatRowPrice(row,"member")}" placeholder="${row.member === "" ? "缺失" : "待核对"}"></label>${isProblem ? `<div class="core-price-issue ${displayStatus}">${svgIcon(issueIcon, "icon icon-sm")}<span>${escapeHtml(getIssueReason(row))}</span></div>` : ""}</div>`;
}).join("") : `<div class="core-price-empty">当前没有选择复制时段，请在上方“复制设置”中选择常用时段。</div>`;
grid.querySelectorAll(".core-price-row").forEach(element => {
const row = resultRows[Number(element.dataset.rowIndex)];
element.querySelectorAll(".core-price-input").forEach(input => {
input.addEventListener("input", event => {
updateRowPrice(row, event.target.dataset.kind, event.target.value.trim());
row.edited = true;
updateCopyPreview();
renderDashboardSummary();
updateIssueControls();
renderNotices();
});
input.addEventListener("change", renderResults);
});
});
}
function renderResults() {
const state = getRegionSelection();
const problemRows = hasAnalysed ? resultRows.filter(row => rowDisplayStatus(row) !== "ok") : [];
if (problemMode && !problemRows.length) problemMode = false;
const visibleRows = problemMode ? problemRows : (state.showCommonOnly ? resultRows.filter(row => row.selected) : resultRows);
resultBody.innerHTML = visibleRows.map(row => {
const matched = row.matched.length ? row.matched.map(item => item.label).join("、") : "—";
const candidates = row.available.length ? uniquePriceDetails(row.available.flatMap(item => item.priceDetails||[])).map(detail => formatPrice(detail.value,detail.decimalPlaces)).join("/") : "—";
const displayStatus = rowDisplayStatus(row);
const isProblem = hasAnalysed && displayStatus !== "ok";
const statusClass = row.edited && !isProblem ? "manual" : displayStatus;
const statusText = row.edited && !isProblem ? "人工修改" : ({ ok: "已识别", review: "需核对", missing: "缺失" }[displayStatus] || "待处理");
const reason = getIssueReason(row);
return `<tr data-row-index="${row.index}" data-period-id="${escapeHtml(periodId(row.period))}" class="${row.edited?"edited ":""}${isProblem?`issue-row issue-${displayStatus}`:""}">
<td><div class="row-control"><span class="row-number">${row.index + 1}</span><input type="checkbox" class="row-select" ${row.selected ? "checked" : ""} aria-label="选择${escapeHtml(row.period.name)}${row.period.start}-${row.period.end}"></div></td>
<td class="period-cell"><strong><span class="period-glyph tone-${row.period.tone}">${svgIcon(periodIconName(row.period), "icon icon-sm")}</span>${escapeHtml(row.period.name)}</strong><span>${row.period.start}—${row.period.end}</span></td>
<td class="source-cell mono">${row.period.start}—${row.period.end}</td>
<td class="source-cell mono" title="${escapeHtml(matched)}｜${escapeHtml(candidates)}">${escapeHtml(candidates)}</td>
<td><input class="price-input" data-kind="nonMember" inputmode="decimal" value="${formatRowPrice(row,"nonMember")}" aria-label="${escapeHtml(row.period.name)}非会员价"></td>
<td><input class="price-input" data-kind="member" inputmode="decimal" value="${formatRowPrice(row,"member")}" aria-label="${escapeHtml(row.period.name)}会员价"></td>
<td><span class="status ${statusClass}" title="${escapeHtml(row.note)}">${statusText}</span>${isProblem?`<span class="issue-reason">${escapeHtml(reason)}</span>`:""}</td>
</tr>`;
}).join("");
bindResultEvents();
updateCopyPreview();
renderCorePrices();
renderVisibilityControls();
renderDashboardSummary();
updateIssueControls();
}
function bindResultEvents() {
resultBody.querySelectorAll("tr").forEach(tr => {
const row = resultRows[Number(tr.dataset.rowIndex)];
tr.querySelector(".row-select").addEventListener("change", event => {
row.selected = event.target.checked;
const state = getRegionSelection();
const id = periodId(row.period);
if (row.selected) {
if (!state.selected.includes(id)) state.selected.push(id);
if (!state.order.includes(id)) state.order.push(id);
} else {
state.selected = state.selected.filter(item => item !== id);
state.order = state.order.filter(item => item !== id);
}
state.hasCustom = true;
persistRegionState();
renderResults();
});
tr.querySelectorAll(".price-input").forEach(input => input.addEventListener("input", event => {
updateRowPrice(row, event.target.dataset.kind, event.target.value.trim());
row.edited = true;
tr.classList.add("edited");
const chip = tr.querySelector(".status");
const displayStatus = rowDisplayStatus(row);
chip.className = `status ${displayStatus === "ok" ? "manual" : displayStatus}`;
chip.textContent = displayStatus === "ok" ? "人工修改" : (displayStatus === "review" ? "需核对" : "缺失");
updateCopyPreview();
renderDashboardSummary();
updateIssueControls();
renderNotices();
}));
tr.querySelectorAll(".price-input").forEach(input => input.addEventListener("change", () => {
renderResults();
}));
});
}
function renderNotices() {
const notices = [];
if (!parsedSections.length) notices.push({ type: "danger", text: "没有识别到时段，请检查OCR文本中的时间格式。" });
const issues = getProblemRows();
if (!issues.length && parsedSections.length) notices.push({ type: "", text: `已整理 ${parsedSections.length} 个截图时段，当前复制内容完整。` });
noticeStack.innerHTML = notices.map(item => `<div class="notice ${item.type}">${escapeHtml(item.text)}</div>`).join("");
}
function renderAudit() {
if (!hasAnalysed || !parsedSections.length) {
auditBody.innerHTML = `<div class="raw-text-empty">整理价格后，这里会按时段显示识别到的全部原始价格。</div>`;
return;
}
auditBody.innerHTML = `<div class="source-period-list">${parsedSections.map((section, sectionIndex) => {
const groups = section.groups || [];
const groupMarkup = groups.length ? groups.map(group => {
const rawPrices = group.rawPrices || [];
const pricesMarkup = rawPrices.length ? rawPrices.map((price, index) => {
const isTotal = group.totalIndex >= 0 ? group.totalIndex === index : (group.total !== null && pricesEqual(price, group.total));
const precision = group.rawPriceTokens?.[index]?.decimalPlaces ?? group.totalPrecision;
return `<span class="source-price ${isTotal ? "source-price-total" : ""}">${formatPrice(price,precision)}${isTotal ? "<small>采用</small>" : ""}</span>`;
}).join("") : `<span class="source-price source-price-missing">未识别到数字</span>`;
const warning = group.warnings?.length ? `<p class="source-group-warning">${escapeHtml(group.warnings.join("；"))}</p>` : "";
return `<div class="source-price-group"><div class="source-group-head"><strong>${escapeHtml(group.label || "未标注价格组")}</strong>${group.total !== null ? `<span>识别总价 ${formatPrice(group.total,group.totalPrecision)}</span>` : `<span class="source-unresolved">总价待核对</span>`}</div><div class="source-price-values">${pricesMarkup}</div>${warning}</div>`;
}).join("") : `<div class="source-price-group source-group-empty">该时段未识别到价格组。</div>`;
return `<article class="source-period-card"><header><span class="source-period-index">${sectionIndex + 1}</span><strong>${escapeHtml(section.label || "原始时段")}</strong><small>${groups.length} 个价格组</small></header>${groupMarkup}</article>`;
}).join("")}</div>`;
auditBody.closest("details")?.setAttribute("open", "");
}
function renderVisibilityControls() {
const state = getRegionSelection();
const total = resultRows.length || REGION_CONFIGS[regionSelect.value].periods.length;
const selectedCount = resultRows.filter(row => row.selected).length;
const hiddenCount = state.showCommonOnly ? Math.max(total - selectedCount, 0) : 0;
commonOnlyToggle.checked = state.showCommonOnly;
document.getElementById("visiblePeriodMeta").textContent = state.showCommonOnly ? `已显示 ${selectedCount} 个常用时段` : `已显示全部 ${total} 个时段`;
document.getElementById("hiddenPeriodMeta").textContent = hiddenCount ? `已收起 ${hiddenCount} 个时段` : "";
const expandButton = document.getElementById("expandHiddenBtn");
expandButton.hidden = !hiddenCount;
document.getElementById("expandHiddenText").textContent = `展开另外 ${hiddenCount} 个时段`;
}
function getProblemRows() {
return hasAnalysed ? resultRows.filter(row => rowDisplayStatus(row) !== "ok") : [];
}
function getSelectedProblemRows() {
return hasAnalysed ? orderedSelectedRows().filter(row => rowDisplayStatus(row) !== "ok") : [];
}
function updateIssueControls() {
const issues = getProblemRows();
const selectedRows = orderedSelectedRows();
const selectedIssues = getSelectedProblemRows();
const unselectedIssueCount = Math.max(issues.length - selectedIssues.length, 0);
const missing = issues.filter(row => rowDisplayStatus(row) === "missing").length;
const review = issues.length - missing;
const issueButton = document.getElementById("issueActionBtn");
issueButton.hidden = !issues.length;
issueButton.textContent = missing ? `处理 ${issues.length} 个问题` : `处理需核对项 ${review}`;
const banner = document.getElementById("issueModeBanner");
banner.hidden = !problemMode || !issues.length;
document.getElementById("issueModeText").textContent = `共 ${issues.length} 项，请逐项检查后再复制。`;
const copyButton = document.getElementById("copyBtn");
const canCopy = hasAnalysed && selectedRows.length > 0;
copyButton.disabled = !canCopy;
copyButton.classList.toggle("primary", canCopy && !selectedIssues.length);
copyButton.classList.toggle("has-issues", canCopy && selectedIssues.length > 0);
const copyLabel = !hasAnalysed ? "暂无可复制结果" : (!selectedRows.length ? "请先选择时段" : (selectedIssues.length ? "确认仍要复制" : "复制结果"));
copyButton.innerHTML = `${svgIcon("copy")} ${copyLabel}`;
const compactBanner = document.getElementById("compactIssueBanner");
if (compactBanner) {
compactBanner.hidden = !hasAnalysed || !issues.length;
compactBanner.classList.remove("info-only");
compactBanner.setAttribute("role", "alert");
compactBanner.setAttribute("aria-live", "assertive");
document.getElementById("compactIssueTitle").textContent = selectedIssues.length
? `发现 ${selectedIssues.length} 个待核对项`
: `另有 ${issues.length} 个时段待核对`;
document.getElementById("compactIssueText").textContent = selectedIssues.length
? `请逐项确认后再复制${unselectedIssueCount ? `；另有 ${unselectedIssueCount} 个未选时段存在问题` : ""}。`
: "这些时段未包含在本次复制中，仍建议完成核对。";
const listedIssues = selectedIssues.length ? selectedIssues : issues;
document.getElementById("compactIssueList").innerHTML = listedIssues.map(row => {
const displayStatus = rowDisplayStatus(row);
const statusLabel = displayStatus === "missing" ? "缺失" : "需核对";
const issueIcon = displayStatus === "missing" ? "alert-circle" : "peak";
return `<div class="compact-issue-row ${displayStatus}" role="listitem"><span class="compact-row-icon">${svgIcon(issueIcon, "icon icon-sm")}</span><strong>${escapeHtml(row.period.name)}</strong><small>${row.period.start}—${row.period.end}</small><span class="compact-row-reason">${escapeHtml(getIssueReason(row))}</span><em>${statusLabel}</em></div>`;
}).join("");
document.getElementById("compactIssueBtn").textContent = problemMode ? "查看全部" : (selectedIssues.length ? "开始处理" : "查看问题");
}
}
function revealDetail(targetId = "issueModeBanner") {
const detailFold = document.querySelector(".detail-fold");
if (detailFold) detailFold.open = true;
requestAnimationFrame(() => {
const target = document.getElementById(targetId) || detailFold;
target?.scrollIntoView({ behavior: "smooth", block: "center" });
});
}
function enterProblemMode() {
if (!getProblemRows().length) return;
problemMode = true;
renderResults();
revealDetail("issueModeBanner");
}
function exitProblemMode() {
problemMode = false;
renderResults();
revealDetail("resultBody");
}
function renderCommonChoices() {
const state = getRegionSelection();
const config = REGION_CONFIGS[regionSelect.value];
document.getElementById("commonPeriodChoices").innerHTML = config.periods.map(period => {
const id = periodId(period);
return `<label class="period-choice"><input type="checkbox" value="${escapeHtml(id)}" ${state.selected.includes(id) ? "checked" : ""}><span><strong>${escapeHtml(period.name)}</strong><small>${period.start}—${period.end}</small></span></label>`;
}).join("");
document.getElementById("restorePreferenceBtn").textContent = `恢复${config.name}默认`;
}
function orderedSelectedRows() {
const state = getRegionSelection();
const selectedIds = resultRows.filter(row => row.selected).map(row => periodId(row.period));
const orderedIds = [...state.order.filter(id => selectedIds.includes(id)), ...selectedIds.filter(id => !state.order.includes(id))];
return orderedIds.map(id => resultRows.find(row => periodId(row.period) === id)).filter(Boolean);
}
function priceItems(row, priceOrder = getRegionSelection().priceOrder) {
const member = { kind: "member", label: `${row.period.name}会员价`, value: row.member };
const nonMember = { kind: "nonMember", label: `${row.period.name}非会员价`, value: row.nonMember };
return priceOrder === "member-first" ? [member, nonMember] : [nonMember, member];
}
function previewData(rows, priceOrder) {
const groups = rows.map(row => ({
name: row.period.name,
range: `${row.period.start}—${row.period.end}`,
tone: row.period.tone,
status: rowDisplayStatus(row),
reason: getIssueReason(row),
items: priceItems(row, priceOrder).map(item => ({
label: item.label.replace(row.period.name, ""),
value: item.value === "" ? "" : formatRowPrice(row, item.kind)
}))
}));
const items = groups.flatMap(group => group.items);
return {
labels: items.map(item => item.label),
values: items.map(item => item.value),
groups
};
}
function selectedValues() {
return previewData(orderedSelectedRows(), getRegionSelection().priceOrder).values.map(value => value || "待核对");
}
function isCustomCopyOrder(order, rows) {
const selectedIds = rows.map(row => periodId(row.period));
const defaults = REGION_CONFIGS[regionSelect.value].defaultOrder;
const workingOrder = [...defaults.filter(id => selectedIds.includes(id)), ...selectedIds.filter(id => !defaults.includes(id))];
return order.join("|") !== workingOrder.join("|");
}
function renderPreviewElements(labelsElement, valuesElement, data, emptyText) {
const groups = data.groups || [];
const columnCount = Math.max(groups.length, 1);
labelsElement.style.setProperty("--copy-count", columnCount);
valuesElement.style.setProperty("--copy-count", columnCount);
labelsElement.innerHTML = "";
valuesElement.innerHTML = groups.length
? groups.map(group => {
const isProblem = group.status && group.status !== "ok";
const statusLabel = group.status === "missing" ? "缺失" : "需核对";
const issueIcon = group.status === "missing" ? "alert-circle" : "peak";
return `<section class="copy-period-group tone-${group.tone} ${isProblem ? `copy-issue copy-issue-${group.status}` : ""}"><header><span>${escapeHtml(group.name)}</span><div><small>${escapeHtml(group.range)}</small>${isProblem ? `<em class="copy-status ${group.status}">${svgIcon(issueIcon, "icon icon-sm")}${statusLabel}</em>` : ""}</div></header><div class="copy-period-prices">${group.items.map(item => `<span class="copy-price-tile ${item.value === "" ? "empty-copy-value" : ""}"><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.value || (group.status === "missing" ? "缺失" : "待核对"))}</strong></span>`).join("")}</div>${isProblem ? `<div class="copy-period-issue ${group.status}">${svgIcon(issueIcon, "icon icon-sm")}<span>${escapeHtml(group.reason)}</span></div>` : ""}</section>`;
}).join("")
: `<span class="copy-empty-state">${escapeHtml(emptyText)}</span>`;
}
function moveCopyDraft(id, direction) {
if (!copyDraft) return;
const index = copyDraft.order.indexOf(id);
const target = index + direction;
if (index < 0 || target < 0 || target >= copyDraft.order.length) return;
[copyDraft.order[index], copyDraft.order[target]] = [copyDraft.order[target], copyDraft.order[index]];
renderCopySettings();
}
function updateCopyPreview() {
const rows = orderedSelectedRows();
const state = getRegionSelection();
const data = hasAnalysed ? previewData(rows, state.priceOrder) : { labels: [], values: [] };
renderPreviewElements(copyLabels, copyPreview, data, hasAnalysed ? "未选择任何时段" : "粘贴文本后，这里会显示可复制结果。");
document.getElementById("copyRuleText").textContent = `${state.priceOrder === "member-first" ? "会员价" : "非会员价"}在前 · ${isCustomCopyOrder(state.order, rows) ? "自定义顺序" : "按工作顺序"}`;
}
function renderCopySettings() {
if (!copyDraft) return;
document.querySelectorAll("#priceOrderOptions button").forEach(button => button.classList.toggle("active", button.dataset.priceOrder === copyDraft.priceOrder));
const rows = copyDraft.order.map(id => resultRows.find(row => periodId(row.period) === id)).filter(row => row?.selected);
document.getElementById("copyOrderList").innerHTML = rows.length ? rows.map(row => {
const id = periodId(row.period);
return `<div class="copy-order-item"><div><strong>${escapeHtml(row.period.name)}　${row.period.start}—${row.period.end}</strong><small>会员 ${row.member === "" ? "待补" : formatRowPrice(row,"member")}　非会员 ${row.nonMember === "" ? "待补" : formatRowPrice(row,"nonMember")}</small></div><div class="copy-order-arrows"><button type="button" data-copy-move="-1" data-period-id="${escapeHtml(id)}" aria-label="向前移动">↑</button><button type="button" data-copy-move="1" data-period-id="${escapeHtml(id)}" aria-label="向后移动">↓</button></div></div>`;
}).join("") : `<div class="notice warn">请先设置至少一个常用时段。</div>`;
const draftData = hasAnalysed ? previewData(rows, copyDraft.priceOrder) : { labels: [], values: [] };
renderPreviewElements(document.getElementById("copyDraftLabels"), document.getElementById("copyDraftPreview"), draftData, hasAnalysed ? "未选择任何时段" : "整理完成后，这里会显示可复制内容。");
document.getElementById("copyDraftRuleText").textContent = `${copyDraft.priceOrder === "member-first" ? "会员价" : "非会员价"}在前 · ${isCustomCopyOrder(copyDraft.order, rows) ? "自定义顺序" : "按工作顺序"}`;
document.querySelectorAll("[data-copy-move]").forEach(button => button.addEventListener("click", () => moveCopyDraft(button.dataset.periodId, Number(button.dataset.copyMove))));
}
function openCopySettings() {
const state = getRegionSelection();
const selectedIds = resultRows.filter(row => row.selected).map(row => periodId(row.period));
copyDraft = {
priceOrder: state.priceOrder,
order: [...state.order.filter(id => selectedIds.includes(id)), ...selectedIds.filter(id => !state.order.includes(id))]
};
renderCopySettings();
openLayer(copyModal, true);
}
function saveCopySettings() {
if (!copyDraft) return;
const state = getRegionSelection();
state.priceOrder = copyDraft.priceOrder;
state.order = [...copyDraft.order];
state.hasCustom = true;
persistRegionState();
closeLayers();
updateCopyPreview();
updateIssueControls();
const settingButton = document.getElementById("copySettingsBtn");
settingButton?.classList.remove("setting-saved");
if (settingButton) void settingButton.offsetWidth;
settingButton?.classList.add("setting-saved");
setTimeout(() => settingButton?.classList.remove("setting-saved"), 1200);
}
function positionRulePopover() {
if (rulePopover.hidden) return;
const buttonRect = (document.getElementById("ruleTopBtn") || document.getElementById("ruleBtn")).getBoundingClientRect();
const gap = 10;
const edge = 12;
const popoverWidth = rulePopover.offsetWidth;
const popoverHeight = rulePopover.offsetHeight;
let left = buttonRect.left;
let top = buttonRect.bottom + gap;
if (top + popoverHeight > window.innerHeight - edge && buttonRect.top - popoverHeight - gap >= edge) {
top = buttonRect.top - popoverHeight - gap;
}
left = Math.min(left, window.innerWidth - popoverWidth - edge);
left = Math.max(edge, left);
top = Math.max(edge, Math.min(top, window.innerHeight - popoverHeight - edge));
rulePopover.style.left = `${left}px`;
rulePopover.style.top = `${top}px`;
rulePopover.style.right = "auto";
}
function getLayerElements() {
return [commonModal, copyModal, rulePopover, helpDrawer, modalOverlay, document.getElementById("timeTableEditor")].filter(Boolean);
}
function showAnimatedLayer(element) {
window.clearTimeout(layerHideTimers.get(element));
layerHideTimers.delete(element);
element.inert = false;
element.hidden = false;
requestAnimationFrame(() => element.classList.add("is-visible"));
}
function hideAnimatedLayer(element, immediate = false) {
window.clearTimeout(layerHideTimers.get(element));
layerHideTimers.delete(element);
element.classList.remove("is-visible");
element.inert = true;
if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
element.hidden = true;
return;
}
const timer = window.setTimeout(() => {
if (!element.classList.contains("is-visible")) element.hidden = true;
layerHideTimers.delete(element);
}, 230);
layerHideTimers.set(element, timer);
}
function hideAllLayers(immediate = false) {
getLayerElements().forEach(element => hideAnimatedLayer(element, immediate));
}
function handleLayerKeydown(event) {
if (event.key === "Escape") {
if (document.querySelector(".pretty-select.open")) return;
closeTopMenus();
closeLayers();
return;
}
if (event.key !== "Tab" || modalOverlay.hidden) return;
const activeLayer = getLayerElements().find(element => element !== modalOverlay && element.classList.contains("is-visible"));
if (!activeLayer) return;
const focusable = [...activeLayer.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')].filter(element => !element.hidden && element.getClientRects().length);
if (!focusable.length) return;
const first = focusable[0];
const last = focusable.at(-1);
if (event.shiftKey && document.activeElement === first) {
event.preventDefault();
last.focus();
} else if (!event.shiftKey && document.activeElement === last) {
event.preventDefault();
first.focus();
}
}
function openLayer(element, withOverlay) {
const currentFocus = document.activeElement;
const currentTopMenu = currentFocus instanceof HTMLElement ? currentFocus.closest(".top-popover") : null;
const topMenuReturnFocus = currentTopMenu?.id === "moreMenu" ? document.getElementById("moreBtn") : currentTopMenu?.id === "configPopover" ? document.getElementById("configSummaryBtn") : null;
hideAllLayers(true);
layerReturnFocus = topMenuReturnFocus || (currentFocus instanceof HTMLElement && currentFocus !== document.body ? currentFocus : null);
showAnimatedLayer(element);
if (withOverlay) showAnimatedLayer(modalOverlay);
document.body.classList.toggle("layer-active", withOverlay);
document.querySelector(".app-shell").inert = withOverlay;
document.body.style.overflow = withOverlay ? "hidden" : "";
if (element === rulePopover) requestAnimationFrame(positionRulePopover);
requestAnimationFrame(() => {
const focusTarget = element.querySelector("[data-autofocus]") || element.querySelector('[autofocus], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]');
focusTarget?.focus({ preventScroll: true });
});
}
function closeLayers() {
const returnFocus = layerReturnFocus;
hideAllLayers(false);
document.body.classList.remove("layer-active");
document.querySelector(".app-shell").inert = false;
document.body.style.overflow = "";
layerReturnFocus = null;
window.setTimeout(() => returnFocus?.focus({ preventScroll: true }), 230);
}
function renderHelpLinks() {
document.getElementById("helpLinks").innerHTML = HELP_SECTIONS.map(section => `<details class="help-topic" open><summary><span class="help-topic-badge">${escapeHtml(section.badge)}</span><span class="help-topic-copy"><strong>${escapeHtml(section.title)}</strong><span>${escapeHtml(section.summary)}</span></span>${svgIcon("chevron-down", "icon icon-sm")}</summary><div class="help-topic-body">${section.body}</div></details>`).join("");
}
function showHelpOverview() {
document.getElementById("helpOverview").hidden = false;
document.getElementById("helpDetail").hidden = true;
document.getElementById("helpDrawerTitle").textContent = "使用说明";
}
function showHelpDetail(id) {
const section = HELP_SECTIONS.find(item => item.id === id);
if (!section) return;
document.getElementById("helpOverview").hidden = true;
document.getElementById("helpDetail").hidden = false;
document.getElementById("helpDrawerTitle").textContent = section.title;
document.getElementById("helpDetailBody").innerHTML = `<h3>${escapeHtml(section.title)}</h3>${section.body}`;
}
async function copySelected() {
if (!hasAnalysed) {
noticeStack.innerHTML = `<div class="notice warn">请先完成整理，再复制结果。</div>`;
return;
}
const text = selectedValues().join("\t");
if (!text) return;
try {
await navigator.clipboard.writeText(text);
} catch {
const helper = document.createElement("textarea");
helper.value = text;
document.body.appendChild(helper);
helper.select();
document.execCommand("copy");
helper.remove();
}
const button = document.getElementById("copyBtn");
const original = button.innerHTML;
button.innerHTML = `${svgIcon("check")}已复制`;
setTimeout(() => button.innerHTML = original, 1200);
}
function updateInputCount() {
document.getElementById("inputCount").textContent = rawInput.value.length.toLocaleString("zh-CN");
}
function setInputWorkbenchState(state) {
const inputPanel = document.querySelector(".input-panel");
const stateText = document.getElementById("inputStateText");
const analyseButton = document.getElementById("analyseBtn");
if (inputPanel) inputPanel.dataset.inputState = state;
if (stateText) stateText.textContent = ({ idle: "等待粘贴", dirty: "内容已修改", analysed: "已完成整理" })[state] || "等待粘贴";
if (analyseButton) {
const label = state === "dirty" && lastAnalysedText ? "重新整理" : "整理价格";
analyseButton.innerHTML = `${svgIcon("sparkles", "icon icon-sm")}<span>${label}</span>`;
}
}
function hideClearUndo() {
const toast = document.getElementById("undoToast");
window.clearTimeout(clearUndoTimer);
clearUndoTimer = 0;
clearUndoText = "";
if (toast) toast.hidden = true;
}
function showClearUndo(text) {
const toast = document.getElementById("undoToast");
window.clearTimeout(clearUndoTimer);
clearUndoText = text;
if (toast) toast.hidden = false;
clearUndoTimer = window.setTimeout(hideClearUndo, 5000);
}
function clearRawInput() {
const previousText = rawInput.value;
if (!previousText) {
rawInput.focus();
return;
}
rawInput.value = "";
lastAnalysedText = "";
lastAnalysedMode = currentParseMode;
updateInputCount();
renderEmptyRows();
showClearUndo(previousText);
rawInput.focus();
}
function undoClearRawInput() {
const restoredText = clearUndoText;
if (!restoredText) return;
hideClearUndo();
rawInput.value = restoredText;
updateInputCount();
analyse();
rawInput.focus();
}
function exportResults() {
const rows = orderedSelectedRows();
if (!rows.length) return;
const header = ["时段", "时段范围", "会员价", "非会员价", "状态"];
const body = rows.map(row => [
row.period.name,
`${row.period.start}-${row.period.end}`,
formatRowPrice(row, "member"),
formatRowPrice(row, "nonMember"),
row.edited ? "人工修改" : ({ ok: "已识别", review: "需核对", missing: "缺失" }[row.status] || "待处理")
]);
const csv = [header, ...body].map(line => line.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `电站价格-${REGION_CONFIGS[regionSelect.value].name}-${effectiveMonth.value||"未设置"}.csv`;
document.body.appendChild(link);
link.click();
URL.revokeObjectURL(link.href);
link.remove();
}
regionSelect.addEventListener("change", () => {
closeLayers();
populateMonthOptions(regionSelect.value, effectiveMonth.value);
persistGeneralPreferences();
renderSchedule();
updateConfigSummary();
if (rawInput.value.trim()) analyse(); else renderEmptyRows();
});
document.querySelector(".region-control").addEventListener("click", event => {
if (regionSelect.dataset.prettySelect === "true") return;
if (event.target === regionSelect) return;
try { regionSelect.showPicker?.(); } catch { regionSelect.focus(); }
});
document.querySelector(".month-control").addEventListener("click", () => {
if (effectiveMonth.dataset.prettySelect === "true") return;
try { effectiveMonth.showPicker?.(); } catch { effectiveMonth.focus(); }
});
effectiveMonth.addEventListener("change", () => { activateTimeTable(regionSelect.value, effectiveMonth.value); persistGeneralPreferences(); renderSchedule(); if (rawInput.value.trim()) analyse(); else renderEmptyRows(); updateConfigSummary(); });
document.getElementById("unlockSamplesBtn").addEventListener("click", () => {
const key = window.prompt("请输入内部样例密钥");
if (key === INTERNAL_SAMPLE_KEY) {
document.getElementById("sampleLock").hidden = true;
document.getElementById("sampleTools").hidden = false;
document.getElementById("samplePicker").hidden = false;
const sampleSection = document.querySelector(".sample-menu-section");
sampleSection?.classList.add("unlocked");
const sampleNote = sampleSection?.querySelector(".sample-menu-head small");
if (sampleNote) sampleNote.textContent = "已通过内部密钥验证";
const verifyButton = sampleSection?.querySelector('[data-more-action="samples"]');
if (verifyButton) verifyButton.hidden = true;
const moreMenu = document.getElementById("moreMenu");
if (moreMenu) {
moreMenu.hidden = false;
document.getElementById("moreBtn")?.setAttribute("aria-expanded", "true");
}
} else if (key !== null) {
window.alert("密钥不正确");
}
});
document.getElementById("loadSampleBtn").addEventListener("click", () => {
const sample = REGRESSION_SAMPLES[sampleSelect.value];
if (!sample) return;
setParseMode(sample.mode,{reanalyse:false});
if (REGION_CONFIGS[sample.region]) {
regionSelect.value = sample.region;
populateMonthOptions(sample.region, sample.month);
activateTimeTable(sample.region, sample.month);
renderSchedule();
updateConfigSummary();
}
rawInput.value = sample.input;
updateInputCount();
closeTopMenus();
analyse();
});
document.getElementById("runAllSamplesBtn")?.addEventListener("click", () => {
renderRegressionReport(runAllRegressionSamples());
});
document.getElementById("analyseBtn").addEventListener("click", analyse);
document.getElementById("resetResultBtn")?.addEventListener("click", analyse);
document.querySelectorAll(".parse-mode-switch [data-parse-mode]").forEach(button=>button.addEventListener("click",()=>setParseMode(button.dataset.parseMode)));
document.getElementById("clearBtn").addEventListener("click", clearRawInput);
document.getElementById("undoClearBtn")?.addEventListener("click", undoClearRawInput);
rawInput.addEventListener("input", () => {
updateInputCount();
renderAudit();
if (clearUndoText && rawInput.value) hideClearUndo();
if (!rawInput.value.trim()) setInputWorkbenchState("idle");
else if (rawInput.value !== lastAnalysedText || currentParseMode !== lastAnalysedMode) setInputWorkbenchState("dirty");
else setInputWorkbenchState("analysed");
});
rawInput.addEventListener("paste", () => { setTimeout(() => { updateInputCount(); analyse(); }, 0); });
rawInput.addEventListener("keydown", event => {
if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
event.preventDefault();
analyse();
}
});
document.getElementById("detailJumpBtn")?.addEventListener("click", () => {
revealDetail("auditDetails");
});
document.getElementById("addPeriodBtn").addEventListener("click", () => { renderCommonChoices(); openLayer(commonModal, true); });
document.getElementById("exportExcelBtn").addEventListener("click", exportResults);
document.getElementById("issueActionBtn").addEventListener("click", enterProblemMode);
document.getElementById("showAllRowsBtn").addEventListener("click", exitProblemMode);
commonOnlyToggle.addEventListener("change", () => {
const state = getRegionSelection();
state.showCommonOnly = commonOnlyToggle.checked;
state.hasCustom = true;
persistRegionState();
renderResults();
});
document.getElementById("expandHiddenBtn").addEventListener("click", () => {
const state = getRegionSelection();
state.showCommonOnly = false;
state.hasCustom = true;
persistRegionState();
renderResults();
});
document.getElementById("commonSettingsBtn").addEventListener("click", () => {
renderCommonChoices();
openLayer(commonModal, true);
});
document.getElementById("savePreferenceBtn").addEventListener("click", saveCurrentPreference);
document.getElementById("restorePreferenceBtn").addEventListener("click", restoreRegionPreset);
document.getElementById("clearPreferenceBtn").addEventListener("click", clearPersonalPreference);
document.getElementById("copySettingsBtn").addEventListener("click", openCopySettings);
document.querySelectorAll("#priceOrderOptions button").forEach(button => button.addEventListener("click", () => {
if (!copyDraft) return;
copyDraft.priceOrder = button.dataset.priceOrder;
renderCopySettings();
}));
document.getElementById("saveCopySettingsBtn").addEventListener("click", saveCopySettings);
document.getElementById("copyBtn").addEventListener("click", copySelected);
document.getElementById("ruleBtn").addEventListener("click", () => {
if (!rulePopover.hidden) closeLayers();
else openLayer(rulePopover, false);
});
document.addEventListener("pointerdown", event => {
if (!rulePopover.hidden && !rulePopover.contains(event.target) && !document.getElementById("ruleBtn").contains(event.target) && !document.getElementById("ruleTopBtn")?.contains(event.target)) closeLayers();
});
window.addEventListener("resize", positionRulePopover);
window.addEventListener("scroll", positionRulePopover, true);
document.getElementById("helpBtn").addEventListener("click", () => {
showHelpOverview();
openLayer(helpDrawer, true);
});
document.getElementById("helpBackBtn").addEventListener("click", showHelpOverview);
document.querySelectorAll("[data-close-layer]").forEach(button => button.addEventListener("click", closeLayers));
modalOverlay.addEventListener("click", closeLayers);
document.addEventListener("keydown", handleLayerKeydown);
const SCROLL_JUMP_POSITION_KEY = "price-workbench-scroll-jump-v01";
function setupScrollJumpControls() {
const configs = [
{ target: document.querySelector(".copy-scroll"), axis: "x", id: "copy-preview" },
{ target: document.querySelector(".table-wrap"), axis: "x", id: "price-table" },
{ target: auditBody, axis: "y", id: "source-detail" }
].filter(config => config.target);
let savedPositions = {};
try { savedPositions = JSON.parse(localStorage.getItem(SCROLL_JUMP_POSITION_KEY) || "{}"); } catch {}
const savePosition = (id, value) => {
savedPositions[id] = value;
try { localStorage.setItem(SCROLL_JUMP_POSITION_KEY, JSON.stringify(savedPositions)); } catch {}
};
configs.forEach(config => {
const { target, axis, id } = config;
if (target.closest(".scroll-jump-zone")) return;
const zone = document.createElement("div");
zone.className = `scroll-jump-zone scroll-jump-zone-${axis}`;
const control = document.createElement("div");
control.className = "scroll-jump-control";
control.dataset.axis = axis;
control.hidden = true;
const startLabel = axis === "x" ? "一键滚动到最左" : "一键滚动到顶部";
const endLabel = axis === "x" ? "一键滚动到最右" : "一键滚动到底部";
control.innerHTML = `<button type="button" data-scroll-edge="start" aria-label="${startLabel}" title="${startLabel}">${axis === "x" ? "⇤" : "⇡"}</button><span class="scroll-jump-handle" role="button" tabindex="0" aria-label="拖动滚动按钮；双击恢复默认位置" title="拖动调整位置；双击恢复默认位置">⠿</span><button type="button" data-scroll-edge="end" aria-label="${endLabel}" title="${endLabel}">${axis === "x" ? "⇥" : "⇣"}</button>`;
target.parentNode.insertBefore(zone, target);
zone.append(target, control);
const startButton = control.querySelector('[data-scroll-edge="start"]');
const endButton = control.querySelector('[data-scroll-edge="end"]');
const handle = control.querySelector(".scroll-jump-handle");
const maxScroll = () => axis === "x" ? target.scrollWidth - target.clientWidth : target.scrollHeight - target.clientHeight;
const currentScroll = () => axis === "x" ? target.scrollLeft : target.scrollTop;
const updateState = () => {
const maximum = Math.max(maxScroll(), 0);
control.hidden = maximum <= 2;
const current = currentScroll();
startButton.disabled = current <= 2;
endButton.disabled = current >= maximum - 2;
};
const scrollToEdge = edge => {
const value = edge === "start" ? 0 : Math.max(maxScroll(), 0);
target.scrollTo(axis === "x" ? { left: value, behavior: "smooth" } : { top: value, behavior: "smooth" });
};
startButton.addEventListener("click", () => scrollToEdge("start"));
endButton.addEventListener("click", () => scrollToEdge("end"));
target.addEventListener("scroll", updateState, { passive: true });
target.addEventListener("input", () => requestAnimationFrame(updateState));
const applyPosition = (left, top, persist = false) => {
const inset = 6;
const maxLeft = Math.max(zone.clientWidth - control.offsetWidth - inset, inset);
const maxTop = Math.max(zone.clientHeight - control.offsetHeight - inset, inset);
const nextLeft = Math.min(Math.max(left, inset), maxLeft);
const nextTop = Math.min(Math.max(top, inset), maxTop);
control.style.left = `${nextLeft}px`;
control.style.top = `${nextTop}px`;
control.style.right = "auto";
control.style.bottom = "auto";
control.style.transform = "none";
if (persist) savePosition(id, { x: nextLeft / Math.max(zone.clientWidth - control.offsetWidth, 1), y: nextTop / Math.max(zone.clientHeight - control.offsetHeight, 1) });
};
const restoreDefault = () => {
delete savedPositions[id];
try { localStorage.setItem(SCROLL_JUMP_POSITION_KEY, JSON.stringify(savedPositions)); } catch {}
control.style.removeProperty("left");
control.style.removeProperty("top");
control.style.removeProperty("right");
control.style.removeProperty("bottom");
control.style.removeProperty("transform");
};
let dragState = null;
handle.addEventListener("pointerdown", event => {
event.preventDefault();
const rect = control.getBoundingClientRect();
const zoneRect = zone.getBoundingClientRect();
dragState = { pointerId: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, zoneLeft: zoneRect.left, zoneTop: zoneRect.top };
handle.setPointerCapture(event.pointerId);
control.classList.add("is-dragging");
});
handle.addEventListener("pointermove", event => {
if (!dragState || event.pointerId !== dragState.pointerId) return;
applyPosition(event.clientX - dragState.zoneLeft - dragState.offsetX, event.clientY - dragState.zoneTop - dragState.offsetY);
});
handle.addEventListener("pointerup", event => {
if (!dragState || event.pointerId !== dragState.pointerId) return;
dragState = null;
control.classList.remove("is-dragging");
const left = control.offsetLeft;
const top = control.offsetTop;
const maxLeft = Math.max(zone.clientWidth - control.offsetWidth, 0);
const maxTop = Math.max(zone.clientHeight - control.offsetHeight, 0);
const edges = [{ left: 6, top, d: left }, { left: maxLeft - 6, top, d: maxLeft - left }, { left, top: 6, d: top }, { left, top: maxTop - 6, d: maxTop - top }];
const nearest = edges.sort((a, b) => a.d - b.d)[0];
applyPosition(nearest.left, nearest.top, true);
});
handle.addEventListener("pointercancel", () => {
dragState = null;
control.classList.remove("is-dragging");
});
handle.addEventListener("dblclick", restoreDefault);
handle.addEventListener("keydown", event => {
if (event.key === "Home") { event.preventDefault(); restoreDefault(); return; }
const movement = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[event.key];
if (!movement) return;
event.preventDefault();
const rect = control.getBoundingClientRect();
const zoneRect = zone.getBoundingClientRect();
applyPosition(rect.left - zoneRect.left + movement[0], rect.top - zoneRect.top + movement[1], true);
});
requestAnimationFrame(() => {
const saved = savedPositions[id];
if (saved) applyPosition(saved.x * Math.max(zone.clientWidth - control.offsetWidth, 1), saved.y * Math.max(zone.clientHeight - control.offsetHeight, 1));
updateState();
});
new ResizeObserver(() => { requestAnimationFrame(() => { const saved = savedPositions[id]; if (saved) applyPosition(saved.x * Math.max(zone.clientWidth - control.offsetWidth, 1), saved.y * Math.max(zone.clientHeight - control.offsetHeight, 1)); updateState(); }); }).observe(target);
new MutationObserver(() => requestAnimationFrame(updateState)).observe(target, { childList: true, subtree: true, characterData: true });
});
}
function enhancePrettySelect(select, options = {}) {
if (!select || select.dataset.prettySelect === "true") return select?.closest(".pretty-select");
select.dataset.prettySelect = "true";
select.classList.add("pretty-select-native");
const wrapper = document.createElement("div");
wrapper.className = `pretty-select${options.compact ? " pretty-select-compact" : ""}${options.tone ? " pretty-select-tone" : ""}`;
wrapper.innerHTML = `<button type="button" class="pretty-select-trigger" aria-haspopup="listbox" aria-expanded="false"><span class="pretty-select-value"></span><span class="pretty-select-arrow" aria-hidden="true"></span></button><div class="pretty-select-menu" role="listbox" hidden></div>`;
select.insertAdjacentElement("afterend", wrapper);
const trigger = wrapper.querySelector(".pretty-select-trigger");
const value = wrapper.querySelector(".pretty-select-value");
const menu = wrapper.querySelector(".pretty-select-menu");
let closeTimer = 0;
const close = (immediate = false) => {
if (menu.hidden && !wrapper.classList.contains("open")) return;
window.clearTimeout(closeTimer);
menu.classList.remove("is-visible");
menu.inert = true;
trigger.setAttribute("aria-expanded", "false");
wrapper.classList.remove("open");
if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
menu.hidden = true;
return;
}
closeTimer = window.setTimeout(() => {
if (!wrapper.classList.contains("open")) menu.hidden = true;
}, 170);
};
const open = () => {
window.clearTimeout(closeTimer);
document.querySelectorAll(".pretty-select.open").forEach(item => {
if (item !== wrapper) item.dispatchEvent(new CustomEvent("close-pretty-select"));
});
menu.hidden = false;
menu.inert = false;
trigger.setAttribute("aria-expanded", "true");
wrapper.classList.add("open");
requestAnimationFrame(() => menu.classList.add("is-visible"));
};
const render = () => {
const selected = select.options[select.selectedIndex];
const selectedText=selected?.textContent?.trim()||"请选择";
if (options.tone && selected) value.innerHTML = `<span class="editor-tone-dot tone-${escapeHtml(selected.value)}" aria-hidden="true"></span><span>${escapeHtml(selectedText)}</span>`;
else value.textContent = selectedText;
trigger.title=selectedText;
trigger.setAttribute("aria-label",`${select.getAttribute("aria-label")||"选择项"}：${selectedText}`);
menu.innerHTML = [...select.options].map(option => `<button type="button" class="pretty-select-option${option.selected ? " selected" : ""}" role="option" aria-selected="${option.selected}" data-value="${escapeHtml(option.value)}" title="${escapeHtml(option.textContent.trim())}"><span class="pretty-select-option-label">${options.tone ? `<span class="editor-tone-dot tone-${escapeHtml(option.value)}" aria-hidden="true"></span>` : ""}<span>${escapeHtml(option.textContent)}</span></span><span class="pretty-select-check">✓</span></button>`).join("");
};
trigger.addEventListener("click", event => {
event.stopPropagation();
if (menu.hidden || !wrapper.classList.contains("open")) open(); else close();
});
trigger.addEventListener("keydown", event => {
if (event.key === "ArrowDown") {
event.preventDefault();
open();
menu.querySelector('.pretty-select-option[aria-selected="true"]')?.focus();
}
});
menu.addEventListener("click", event => {
const option = event.target.closest(".pretty-select-option");
if (!option) return;
select.value = option.dataset.value;
select.dispatchEvent(new Event("change", { bubbles: true }));
render();
close();
});
select.addEventListener("change", render);
new MutationObserver(render).observe(select, { childList: true, subtree: true });
wrapper.addEventListener("close-pretty-select", () => close());
document.addEventListener("click", event => { if (!wrapper.contains(event.target)) close(); });
document.addEventListener("keydown", event => {
if (event.key !== "Escape" || !wrapper.classList.contains("open")) return;
event.stopPropagation();
close();
trigger.focus();
});
render();
return wrapper;
}
function normalizeClockValue(value) {
const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
if (digits.length === 3) return `0${digits[0]}:${digits.slice(1)}`;
if (digits.length === 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
return value;
}
function isValidClockValue(value, allow24 = false) {
const match = /^(\d{2}):(\d{2})$/.exec(String(value || ""));
if (!match) return false;
const hour = Number(match[1]);
const minute = Number(match[2]);
if (minute > 59) return false;
if (hour === 24) return allow24 && minute === 0;
return hour >= 0 && hour < 24;
}
function enhanceTimeInput(input, options = {}) {
if (!input || input.dataset.timePicker === "true") return input?.closest(".time-picker-field");
input.dataset.timePicker = "true";
input.setAttribute("role", "combobox");
input.setAttribute("aria-autocomplete", "none");
input.setAttribute("aria-expanded", "false");
const wrapper = document.createElement("div");
wrapper.className = "time-picker-field";
const menuId = `time-picker-${Math.random().toString(36).slice(2, 9)}`;
const menu = document.createElement("div");
menu.id = menuId;
menu.className = "time-picker-menu";
menu.setAttribute("role", "listbox");
menu.hidden = true;
input.setAttribute("aria-controls", menuId);
const toggle = document.createElement("button");
toggle.type = "button";
toggle.className = "time-picker-toggle";
toggle.setAttribute("aria-label", `选择${options.allow24 ? "结束" : "开始"}时间`);
toggle.setAttribute("tabindex", "-1");
toggle.innerHTML = svgIcon("clock", "icon icon-sm");
input.insertAdjacentElement("beforebegin", wrapper);
wrapper.append(input, toggle, menu);
const timeOptions = [];
for (let minutes = 0; minutes < 24 * 60; minutes += 30) {
const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
const minute = String(minutes % 60).padStart(2, "0");
timeOptions.push(`${hour}:${minute}`);
}
if (options.allow24) timeOptions.push("24:00");
menu.innerHTML = timeOptions.map(time => `<button type="button" class="time-picker-option" role="option" aria-selected="false" data-value="${time}">${time}</button>`).join("");
const optionButtons = [...menu.querySelectorAll(".time-picker-option")];
let activeIndex = -1;
const setActive = index => {
const visibleIndexes = optionButtons.map((button, buttonIndex) => button.hidden ? -1 : buttonIndex).filter(buttonIndex => buttonIndex >= 0);
if (!visibleIndexes.length) return;
const requestedIndex = Math.max(0, Math.min(index, optionButtons.length - 1));
activeIndex = visibleIndexes.includes(requestedIndex) ? requestedIndex : visibleIndexes.reduce((nearest, buttonIndex) => Math.abs(buttonIndex - requestedIndex) < Math.abs(nearest - requestedIndex) ? buttonIndex : nearest, visibleIndexes[0]);
optionButtons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === activeIndex));
optionButtons[activeIndex]?.scrollIntoView({ block: "nearest" });
};
const close = () => {
menu.hidden = true;
input.setAttribute("aria-expanded", "false");
wrapper.classList.remove("open", "open-up");
activeIndex = -1;
};
const open = () => {
document.querySelectorAll(".time-picker-field.open").forEach(field => {
if (field !== wrapper) field.dispatchEvent(new CustomEvent("close-time-picker"));
});
const minValue = options.getMinValue?.();
const minMinutes = isValidClockValue(minValue) ? toMin(minValue) : null;
optionButtons.forEach(button => { button.hidden = minMinutes !== null && toMin(button.dataset.value) <= minMinutes; });
const selectedIndex = optionButtons.findIndex(button => !button.hidden && button.dataset.value === input.value);
optionButtons.forEach(button => button.setAttribute("aria-selected", String(button.dataset.value === input.value)));
menu.hidden = false;
input.setAttribute("aria-expanded", "true");
wrapper.classList.add("open");
const rect = wrapper.getBoundingClientRect();
wrapper.classList.toggle("open-up", window.innerHeight - rect.bottom < 240 && rect.top > 240);
setActive(selectedIndex >= 0 ? selectedIndex : 0);
};
const choose = value => {
input.value = value;
input.dispatchEvent(new Event("change", { bubbles: true }));
close();
input.focus();
};
wrapper.addEventListener("close-time-picker", close);
toggle.addEventListener("click", event => {
event.stopPropagation();
if (menu.hidden) open(); else close();
input.focus();
});
input.addEventListener("click", open);
input.addEventListener("keydown", event => {
if (event.key === "ArrowDown" || event.key === "ArrowUp") {
event.preventDefault();
if (menu.hidden) open();
else {
const direction = event.key === "ArrowDown" ? 1 : -1;
let nextIndex = activeIndex + direction;
while (optionButtons[nextIndex]?.hidden) nextIndex += direction;
setActive(nextIndex);
}
return;
}
if (event.key === "Enter" && !menu.hidden && activeIndex >= 0) {
event.preventDefault();
choose(optionButtons[activeIndex].dataset.value);
return;
}
if (event.key === "Escape") {
event.stopPropagation();
close();
}
});
input.addEventListener("blur", () => {
setTimeout(() => {
input.value = normalizeClockValue(input.value);
if (!wrapper.contains(document.activeElement)) close();
}, 0);
});
menu.addEventListener("mousedown", event => {
const option = event.target.closest(".time-picker-option");
if (!option) return;
event.preventDefault();
choose(option.dataset.value);
});
document.addEventListener("click", event => { if (!wrapper.contains(event.target)) close(); });
return wrapper;
}
function openTimeTableEditor() {
let editor = document.getElementById("timeTableEditor");
if (!editor) {
editor = document.createElement("section");
editor.id = "timeTableEditor";
editor.className = "modal time-table-editor";
editor.hidden = true;
editor.setAttribute("role", "dialog");
editor.setAttribute("aria-modal", "true");
editor.innerHTML = `<header class="editor-header"><div><div class="editor-kicker">${svgIcon("sliders", "icon icon-sm")}<span>内部工具</span></div><h2>时段表管理</h2></div><button type="button" class="icon-button editor-close" data-close-layer aria-label="关闭">${svgIcon("close")}</button></header><div class="editor-access" id="editorAccess"><div class="editor-access-heading">${svgIcon("lock", "icon")}<span>内部密钥</span></div><label class="editor-key-field"><span class="editor-key-label">内部密钥</span><input id="editorKey" data-autofocus type="password" autocomplete="off" aria-describedby="editorAccessNote editorKeyError" placeholder="请输入内部样例密钥"></label><button type="button" class="primary" id="editorUnlock">进入管理</button><p class="editor-access-note" id="editorAccessNote">${svgIcon("shield", "icon icon-sm")}<span>仅限授权内部成员使用</span></p><p id="editorKeyError" role="alert" hidden>密钥不正确，请重新输入。</p></div><div id="editorContent" hidden><div class="editor-sections"><section class="editor-section editor-basic-section"><h3 class="editor-section-title">基础信息</h3><div class="editor-config-row"><div class="editor-meta"><label><span>地区标识</span><input id="editorRegionKey" placeholder="例如 hubei"></label><label><span>地区名称</span><input id="editorRegionName" placeholder="例如 湖北"></label><label><span>生效月份</span><span class="editor-month-field">${svgIcon("calendar", "icon icon-sm")}<input id="editorMonth" type="text" inputmode="numeric" maxlength="7" placeholder="2026-06"></span></label></div><span class="editor-config-divider" aria-hidden="true"></span><div class="editor-toolbar"><button type="button" id="editorLoadCurrent">${svgIcon("download", "icon icon-sm")}载入当前配置</button><button type="button" id="editorNew">${svgIcon("file", "icon icon-sm")}空白新建</button></div></div></section><section class="editor-section editor-period-section"><div class="editor-section-top"><div class="editor-section-heading"><h3 class="editor-section-title">时段列表</h3><p>名称可自定义，颜色同步到复制结果卡片顶边。</p></div><button type="button" class="editor-add-button" id="editorAddPeriodInline">${svgIcon("plus", "icon icon-sm")}添加时段</button></div><div class="editor-period-table"><div class="editor-period-head" aria-hidden="true"><span>时段名称</span><span>开始</span><span></span><span>结束</span><span>价格级别 / 结果色</span><span>常用</span><span>操作</span></div><div class="editor-periods" id="editorPeriods"></div></div><div class="editor-feedback" id="editorFeedback"><span>需覆盖 00:00—24:00，时段不可重叠。</span></div></section></div><div class="modal-footer editor-footer"><button type="button" id="editorValidate">${svgIcon("check", "icon")}检查时段表</button><button type="button" class="primary" id="editorExport">${svgIcon("download", "icon")}导出正式配置</button></div></div>`;
document.body.appendChild(editor);
const rows = editor.querySelector("#editorPeriods");
const addRow = (period = { name: "平", start: "00:00", end: "24:00", tone: 5 }, selected = false) => {
const row = document.createElement("div");
row.className = "editor-period-row";
row.innerHTML = `<label class="editor-name-field"><span class="editor-field-caption">时段名称</span><input data-field="name" aria-label="时段名称，可自定义" value="${escapeHtml(period.name)}"></label><input data-field="start" aria-label="开始时间" type="text" inputmode="numeric" maxlength="5" value="${period.start}" placeholder="00:00"><span class="editor-range-separator" aria-hidden="true">–</span><input data-field="end" aria-label="结束时间" type="text" inputmode="numeric" maxlength="5" value="${period.end}" placeholder="24:00"><select data-field="tone" aria-label="价格级别与复制结果卡片顶边颜色"><option value="1">深谷</option><option value="2">低谷</option><option value="5">平段</option><option value="4">高峰</option><option value="3">尖峰</option></select><label class="editor-common"><input data-field="common" type="checkbox" ${selected ? "checked" : ""}><span>常用</span></label><button type="button" class="editor-remove" aria-label="删除时段">${svgIcon("trash", "icon icon-sm")}</button>`;
row.querySelector('[data-field="tone"]').value = String(period.tone || 5);
const toneField = enhancePrettySelect(row.querySelector('[data-field="tone"]'), { compact: true, tone: true });
toneField?.classList.add("editor-tone-field");
if (toneField) toneField.dataset.fieldLabel = "价格级别";
const startInput = row.querySelector('[data-field="start"]');
const startField = enhanceTimeInput(startInput);
startField?.classList.add("editor-start-field");
if (startField) startField.dataset.fieldLabel = "开始";
const endField = enhanceTimeInput(row.querySelector('[data-field="end"]'), { allow24: true, getMinValue: () => startInput.value });
endField?.classList.add("editor-end-field");
if (endField) endField.dataset.fieldLabel = "结束";
row.querySelector(".editor-remove").addEventListener("click", () => row.remove());
rows.appendChild(row);
};
const loadConfig = (regionKey = regionSelect.value, month = effectiveMonth.value) => {
const region = TIME_TABLE_DATA.regions[regionKey];
const table = region?.tables?.[month];
editor.querySelector("#editorRegionKey").value = regionKey;
editor.querySelector("#editorRegionName").value = region?.name || "";
editor.querySelector("#editorMonth").value = month;
rows.innerHTML = "";
(table?.periods || []).forEach(period => addRow(period, table.defaultOrder.includes(periodId(period))));
};
const collect = () => {
const periods = [...rows.children].map(row => ({ name: row.querySelector('[data-field="name"]').value.trim(), start: row.querySelector('[data-field="start"]').value, end: row.querySelector('[data-field="end"]').value.trim(), tone: Number(row.querySelector('[data-field="tone"]').value), common: row.querySelector('[data-field="common"]').checked }));
return { key: editor.querySelector("#editorRegionKey").value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ""), name: editor.querySelector("#editorRegionName").value.trim(), month: editor.querySelector("#editorMonth").value, periods };
};
const validate = data => {
const errors = [];
if (!data.key || !data.name || !/^\d{4}-\d{2}$/.test(data.month)) errors.push("请填写地区标识、地区名称和生效月份");
if (!data.periods.length) errors.push("至少添加一个时段");
const ordered = [...data.periods].sort((a, b) => toMin(a.start) - toMin(b.start));
ordered.forEach((period, index) => { if (!period.name || !isValidClockValue(period.start) || !isValidClockValue(period.end, true) || toMin(period.end) <= toMin(period.start)) errors.push(`第 ${index + 1} 个时段内容或时间不合法`); if (index && toMin(period.start) !== toMin(ordered[index - 1].end)) errors.push(`${ordered[index - 1].end} 与 ${period.start} 之间存在遗漏或重叠`); });
if (ordered.length && (ordered[0].start !== "00:00" || ordered.at(-1).end !== "24:00")) errors.push("时段表必须完整覆盖 00:00—24:00");
if (!data.periods.some(period => period.common)) errors.push("至少选择一个默认常用时段");
return [...new Set(errors)];
};
const unlockEditor = () => { const ok = editor.querySelector("#editorKey").value === INTERNAL_SAMPLE_KEY; editor.querySelector("#editorKeyError").hidden = ok; if (ok) { editor.classList.add("is-unlocked"); editor.querySelector("#editorAccess").hidden = true; editor.querySelector("#editorContent").hidden = false; loadConfig(); } };
editor.querySelector("#editorUnlock").addEventListener("click", unlockEditor);
editor.querySelector("#editorKey").addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); unlockEditor(); } });
editor.querySelector("#editorLoadCurrent").addEventListener("click", () => loadConfig());
editor.querySelector("#editorNew").addEventListener("click", () => { editor.querySelector("#editorRegionKey").value = ""; editor.querySelector("#editorRegionName").value = ""; editor.querySelector("#editorMonth").value = ""; rows.innerHTML = ""; addRow(); });
const addEmptyPeriod = () => addRow({ name: "平", start: "00:00", end: "24:00", tone: 5 });
editor.querySelector("#editorAddPeriodInline").addEventListener("click", addEmptyPeriod);
editor.querySelector("#editorValidate").addEventListener("click", () => { const errors = validate(collect()); const feedback = editor.querySelector("#editorFeedback"); feedback.className = `editor-feedback ${errors.length ? "error" : "success"}`; feedback.textContent = errors.length ? errors.join("；") : "检查通过，可以导出正式配置。"; });
editor.querySelector("#editorExport").addEventListener("click", () => { const data = collect(); const errors = validate(data); if (errors.length) { editor.querySelector("#editorFeedback").textContent = errors.join("；"); editor.querySelector("#editorFeedback").className = "editor-feedback error"; return; } const output = JSON.parse(JSON.stringify(TIME_TABLE_DATA)); output.version = new Date().toISOString().slice(0, 16).replace("T", " "); output.regions[data.key] = output.regions[data.key] || { name: data.name, tables: {} }; output.regions[data.key].name = data.name; const periods = data.periods.map(({ common, ...period }) => period); output.regions[data.key].tables[data.month] = { defaultOrder: data.periods.filter(period => period.common).map(period => periodId(period)), periods }; const blob = new Blob([`/* 正式时段配置：提交 Git 并重新部署后生效。 */\nwindow.PRICE_TIME_TABLES = ${JSON.stringify(output, null, 2)};\n`], { type: "text/javascript;charset=utf-8" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "时段配置.js"; link.click(); URL.revokeObjectURL(link.href); });
editor.querySelectorAll("[data-close-layer]").forEach(button => button.addEventListener("click", closeLayers));
}
openLayer(editor, true);
}
setupCompactWorkspace();
document.getElementById("configPopover")?.insertAdjacentHTML("afterbegin", `<div class="top-menu-heading"><strong>地区与月份</strong><span>正式配置版本 ${escapeHtml(TIME_TABLE_DATA.version)}</span></div>`);
document.getElementById("moreMenu")?.insertAdjacentHTML("afterbegin", `<div class="top-menu-heading"><strong>更多设置</strong><span>导出、说明与内部工具</span></div>`);
setupScrollJumpControls();
renderHelpLinks();
function renderParseMode(){document.querySelectorAll(".parse-mode-switch [data-parse-mode]").forEach(button=>{const active=button.dataset.parseMode===currentParseMode;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});document.body.dataset.parseMode=currentParseMode;}
function setParseMode(mode,{persist=true,reanalyse=true}={}){if(!PARSE_MODES[mode])return;const changed=currentParseMode!==mode;currentParseMode=mode;renderParseMode();if(persist)persistGeneralPreferences();if(changed&&reanalyse&&rawInput.value.trim())analyse();}
window.PriceWorkbench = { parseSections, chooseForTarget, buildDocumentProfile, buildAssignmentCandidates, scoreAssignmentCandidate, findBestAssignmentPlan, preprocessInput, setParseMode, runRegressionSample, runAllRegressionSamples, PARSE_MODES, REGRESSION_SAMPLES, REGION_CONFIGS };
const startupParams = new URLSearchParams(window.location.search);
const startupRegion = startupParams.get("region");
populateRegionOptions(startupRegion || storedPreferences.lastRegion || "changsha");
if (startupRegion && REGION_CONFIGS[startupRegion]) regionSelect.value = startupRegion;
else if (storedPreferences.lastRegion && REGION_CONFIGS[storedPreferences.lastRegion]) regionSelect.value = storedPreferences.lastRegion;
populateMonthOptions(regionSelect.value, startupParams.get("month") || storedPreferences.effectiveMonth || "2026-06");
enhancePrettySelect(regionSelect);
enhancePrettySelect(effectiveMonth);
enhancePrettySelect(sampleSelect);
renderParseMode();
lastAnalysedMode=currentParseMode;
updateConfigSummary();
updateInputCount();
renderSchedule();
renderEmptyRows();
