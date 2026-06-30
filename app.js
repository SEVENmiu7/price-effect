
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
0.2505最高优惠5元`};const INTERNAL_SAMPLE_KEY="didichangsha";const regionSelect=document.getElementById("regionSelect");const effectiveMonth=document.getElementById("effectiveMonth");const rawInput=document.getElementById("rawInput");const sampleSelect=document.getElementById("sampleSelect");const resultBody=document.getElementById("resultBody");const noticeStack=document.getElementById("noticeStack");const copyPreview=document.getElementById("copyPreview");const copyLabels=document.getElementById("copyLabels");const auditBody=document.getElementById("auditBody");const commonOnlyToggle=document.getElementById("commonOnlyToggle");const commonModal=document.getElementById("commonModal");const copyModal=document.getElementById("copyModal");const modalOverlay=document.getElementById("modalOverlay");const rulePopover=document.getElementById("rulePopover");const helpDrawer=document.getElementById("helpDrawer");let resultRows=[];let parsedSections=[];const STORAGE_KEY="price-workbench-team-v02";const regionSelectionState={};let copyDraft=null;const HELP_SECTIONS=[{id:"region",title:"地区和月份",summary:"选择对应的时段配置",body:`<p>先选择场站所在地区，再确认生效月份。地区决定全天时段和默认常用时段。</p><ul><li>月份用于标记当前配置，不参与价格计算。</li><li>长沙和江西分别保存常用时段与输出顺序。</li><li>每月时段发生调整时，只需更新地区配置。</li></ul>`},{id:"schedule",title:"全天时段",summary:"查看当天完整的峰谷划分",body:`<p>时间轴展示当前地区整天的时段划分。色块长度对应持续时间，用于快速核对。</p><p>如果截图时段跨越多个目标时段，结果会标记“需核对”。</p>`},{id:"input",title:"粘贴查价文本",summary:"怎样保留有效内容",body:`<p>粘贴 PixPin 从截图中识别出的完整文本。</p><ul><li>保留时间、价格名称和全部数字。</li><li>不要提前删减电费、服务费或总价。</li><li>“重新整理”会覆盖尚未保存的人工修改。</li><li>文本只在当前页面处理，不会上传。</li></ul>`},{id:"common",title:"常用时段",summary:"保存、重新设置和清除",body:`<p>常用时段用于减少表格占用，只显示日常需要填写的时段。</p><ul><li>首次保存后，页面默认开启“仅显示常用时段”。</li><li>点击“设置常用时段”可以重新选择。</li><li>“恢复地区默认”会载入预设时段。</li><li>“清除个人设置”会恢复显示全部时段。</li></ul>`},{id:"rule",title:"价格如何选取",summary:"会员价和非会员价的规则",body:`<p>系统先按截图时段整理价格，再从有效总价中取最低的两个不同价格。</p><ul><li>最低价作为会员价。</li><li>第二低价作为非会员价。</li><li>只有一个价格时，两项暂填相同值并标记“需核对”。</li><li>价格名称只用于辅助分组，不依赖平台名称。</li></ul>`},{id:"copy",title:"修改与复制",summary:"调整价格和输出顺序",body:`<p>识别结果可以直接修改。修改后，该行会标记“人工修改”。</p><ul><li>输出设置可以选择会员价或非会员价在前。</li><li>时段顺序可以用上下箭头调整。</li><li>设置按地区保存，下次直接使用。</li></ul>`},{id:"detail",title:"查看识别明细",summary:"检查截图时段和原始价格",body:`<p>识别明细会展示截图时段、识别到的价格和原始价格分组，方便排查错误。</p><ul><li>“已识别”仍建议对照截图核对。</li><li>“需核对”表示只有一个价格或匹配多个时段。</li><li>“缺失”表示没有找到可用价格，必须人工补录。</li></ul>`}];function periodId(period){return`${period.start}-${period.end}|${period.name}`;}function readPreferences(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")||{};}catch{return{};}}function writePreferences(value){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(value));}catch{/*本地存储不可用时仍可单次使用*/}}const storedPreferences=readPreferences();function validPeriodIds(regionKey){return new Set(REGION_CONFIGS[regionKey].periods.map(periodId));}function getRegionSelection(regionKey=regionSelect.value){if(regionSelectionState[regionKey])return regionSelectionState[regionKey];const config=REGION_CONFIGS[regionKey];const valid=validPeriodIds(regionKey);const saved=storedPreferences.regions?.[regionKey];const savedSelected=Array.isArray(saved?.selected)?saved.selected.filter(id=>valid.has(id)):[];const savedOrder=Array.isArray(saved?.order)?saved.order.filter(id=>valid.has(id)):[];const selected=savedSelected.length?savedSelected:[...config.defaultOrder];const order=[...savedOrder.filter(id=>selected.includes(id)),...selected.filter(id=>!savedOrder.includes(id))];regionSelectionState[regionKey]={selected,order,hasCustom:Boolean(saved),showCommonOnly:saved?saved.showCommonOnly!==false:false,priceOrder:saved?.priceOrder==="member-first"?"member-first":"nonmember-first"};return regionSelectionState[regionKey];}function persistGeneralPreferences(){const next=readPreferences();next.lastRegion=regionSelect.value;next.effectiveMonth=effectiveMonth.value;writePreferences(next);}function persistRegionState(regionKey=regionSelect.value){const next=readPreferences();const state=getRegionSelection(regionKey);next.lastRegion=regionKey;next.effectiveMonth=effectiveMonth.value;next.regions=next.regions||{};next.regions[regionKey]={selected:[...state.selected],order:[...state.order],showCommonOnly:state.showCommonOnly,priceOrder:state.priceOrder};writePreferences(next);}function saveCurrentPreference(){const checked=[...document.querySelectorAll('#commonPeriodChoices input[type="checkbox"]:checked')].map(input=>input.value);if(!checked.length){window.alert("请至少选择一个常用时段");return;}const state=getRegionSelection();state.selected=checked;state.order=[...state.order.filter(id=>checked.includes(id)),...checked.filter(id=>!state.order.includes(id))];state.hasCustom=true;state.showCommonOnly=true;resultRows.forEach(row=>{row.selected=checked.includes(periodId(row.period));});persistRegionState();closeLayers();renderResults();noticeStack.insertAdjacentHTML("afterbegin",`<div class="notice">已保存 ${REGION_CONFIGS[regionSelect.value].name} 的常用时段。新文本会继续使用此设置。</div>`);}function restoreRegionPreset(){const config=REGION_CONFIGS[regionSelect.value];const current=getRegionSelection();regionSelectionState[regionSelect.value]={selected:[...config.defaultOrder],order:[...config.defaultOrder],hasCustom:true,showCommonOnly:true,priceOrder:current.priceOrder};resultRows.forEach(row=>{row.selected=config.defaultOrder.includes(periodId(row.period));});persistRegionState();renderCommonChoices();renderResults();}function clearPersonalPreference(){const config=REGION_CONFIGS[regionSelect.value];const current=getRegionSelection();regionSelectionState[regionSelect.value]={selected:[...config.defaultOrder],order:[...config.defaultOrder],hasCustom:false,showCommonOnly:false,priceOrder:current.priceOrder};const next=readPreferences();if(next.regions)delete next.regions[regionSelect.value];writePreferences(next);resultRows.forEach(row=>{row.selected=config.defaultOrder.includes(periodId(row.period));});closeLayers();renderResults();noticeStack.insertAdjacentHTML("afterbegin",`<div class="notice">已清除个人设置，当前显示 ${config.name} 的全部时段。</div>`);}function toMin(text){const[h,m]=text.split(":").map(Number);return h*60+m;}function normalizeRawText(text){return String(text||"").replace(/\r/g,"\n").replace(/：/g,":").replace(/[～~—–至]/g,"-").replace(/(\d{1,2}:\d{2})\s*\n\s*-\s*\n?\s*(\d{1,2}:\d{2})/g,"$1-$2").replace(/(\d{1,2}:\d{2})\s*-\s*\n\s*(\d{1,2}:\d{2})/g,"$1-$2");}function normTime(text){const normalized=String(text||"").replace(/：/g,":").replace(/[～~—–至]/g,"-");const match=normalized.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);if(!match)return null;const startH=Number(match[1]);const startM=Number(match[2]);const endH=Number(match[3]);const endM=Number(match[4]);if(startH>24||endH>24||startM>59||endM>59)return null;const start=startH*60+startM;let end=endH*60+endM;if(endM===59)end+=1;if(end===0&&start>0)end=1440;return{start,end,label:`${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}-${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`};}function getPositiveNumbers(line,minValue=0.1){if(normTime(line))return[];return[...String(line).matchAll(/(?<![-－])\b\d+(?:\.\d{1,4})\b/g)].map(match=>Number(match[0])).filter(value=>value>=minValue&&value<=3);}function isNumericOnlyLine(line){const normalized=String(line).replace(/[元度\s/]/g,"");return/^\d+(?:\.\d{1,4})$/.test(normalized);}function isIgnoreLabel(line){return/电费|服务费|优惠金额|最高优惠|立减|已减|已降|补贴|省\d|当前时间|更新时间/.test(line);}function isPriceLabel(line){if(isIgnoreLabel(line)||normTime(line))return false;return/会员|VIP|黑钻|优惠价|挂牌价|电站价|站点价|快电价|闪联价|华自价|YKC价|原价|折扣价|专享|活动价|充电单价|当前价|收费金额/.test(line);}function nearlyEqual(a,b){return Math.abs(a-b)<0.0003;}function formulaTotal(window){if(window.length===3){if(nearlyEqual(window[0]+window[1],window[2]))return window[2];if(nearlyEqual(window[1]+window[2],window[0]))return window[0];if(nearlyEqual(window[0]+window[2],window[1]))return window[1];}if(window.length===4){if(nearlyEqual(window[0]+window[1]-window[2],window[3]))return window[3];if(nearlyEqual(window[1]+window[2]-window[3],window[0]))return window[0];}return null;}function normalizePriceCandidates(prices){const normalized=[];let i=0;while(i<prices.length){if(i+3<prices.length){const total=formulaTotal(prices.slice(i,i+4));if(total!==null){normalized.push(total);i+=4;continue;}}if(i+2<prices.length){const total=formulaTotal(prices.slice(i,i+3));if(total!==null){normalized.push(total);i+=3;continue;}}normalized.push(prices[i]);i++;}return normalized.filter(price=>price>=0.25&&price<=3);}function collectGroupNumbers(lines,startIndex){const prices=[];let endIndex=startIndex;for(let i=startIndex;i<lines.length;i++){if(normTime(lines[i])||(i!==startIndex&&(isPriceLabel(lines[i])||isIgnoreLabel(lines[i]))))break;const nums=getPositiveNumbers(lines[i]);if(nums.length)prices.push(...nums);endIndex=i;}return{endIndex,prices:normalizePriceCandidates(prices)};}function parsePriceGroups(lines){const groups=[];let i=0;while(i<lines.length){if(normTime(lines[i])){i++;continue;}if(isIgnoreLabel(lines[i])){i++;while(i<lines.length&&!normTime(lines[i])&&!isPriceLabel(lines[i]))i++;continue;}if(isPriceLabel(lines[i])){const sameLine=getPositiveNumbers(lines[i]);const collected=collectGroupNumbers(lines,i+1);const prices=normalizePriceCandidates([...sameLine,...collected.prices]);if(prices.length){groups.push({label:lines[i],start:i,end:collected.endIndex,prices});}else{let timeIndex=-1;for(let j=i+1;j<lines.length;j++){if(isPriceLabel(lines[j]))break;if(normTime(lines[j])){timeIndex=j;break;}}if(timeIndex!==-1){const afterTime=collectGroupNumbers(lines,timeIndex+1);if(afterTime.prices.length){groups.push({label:lines[i],start:timeIndex+1,end:afterTime.endIndex,prices:afterTime.prices});i=Math.max(afterTime.endIndex+1,i+1);continue;}}}i=Math.max(collected.endIndex+1,i+1);continue;}if(getPositiveNumbers(lines[i]).length){const collected=collectGroupNumbers(lines,i);if(collected.prices.length)groups.push({label:"未标注价格组",start:i,end:collected.endIndex,prices:collected.prices});i=collected.endIndex+1;continue;}i++;}return groups;}function isUnlabeledGroup(group){return!group.label||group.label.includes("未标注");}function normalizeLabel(label){return String(label||"").replace(/\s+/g,"").trim();}const UNLABELED_TEMPLATE="__UNLABELED__";function previousTimeForGroup(timeItems,position){let result=null;for(const item of timeItems){if(item.index<position)result=item;else break;}return result;}function nextTimeForGroup(timeItems,position){return timeItems.find(item=>item.index>position)||null;}function hasLeadingUnlabeledGroups(timeItems,groups){return timeItems.some(timeItem=>groups.some(group=>isUnlabeledGroup(group)&&group.start>timeItem.index&&group.start-timeItem.index<=3));}function inferLabelTemplate(groups,timeItems){const labels=groups.filter(group=>!isUnlabeledGroup(group)).map(group=>normalizeLabel(group.label));const hasLeadingUnlabeled=hasLeadingUnlabeledGroups(timeItems,groups);const uniqueLabels=[...new Set(labels)];if(hasLeadingUnlabeled&&uniqueLabels.length===1&&labels.length>=2)return[UNLABELED_TEMPLATE,uniqueLabels[0]];if(labels.length<4)return[];for(let size=2;size<=Math.min(4,Math.floor(labels.length/2));size++){const template=labels.slice(0,size);if(new Set(template).size!==template.length)continue;let matches=0;for(let i=0;i<labels.length;i++)if(labels[i]===template[i%size])matches++;if(matches/labels.length>=.75)return hasLeadingUnlabeled?[UNLABELED_TEMPLATE,...template]:template;}return[];}function labelIndexInTemplate(group,template){if(isUnlabeledGroup(group))return template.findIndex(item=>item===UNLABELED_TEMPLATE);return template.findIndex(item=>item===normalizeLabel(group.label));}function assignGroupsByTemplate(timeItems,groups,template){const byTimeIndex=new Map(timeItems.map(item=>[item.index,[]]));const used=new Set();for(let t=0;t<timeItems.length;t++){const prevTimeIndex=t?timeItems[t-1].index:-1;const current=timeItems[t];const nextTimeIndex=t<timeItems.length-1?timeItems[t+1].index:Infinity;const selected=[];const selectedLabels=new Set();const tryTake=(group,source)=>{const templateIndex=labelIndexInTemplate(group,template);if(templateIndex===-1||selectedLabels.has(templateIndex)||used.has(group))return false;selected.push({...group,source});selectedLabels.add(templateIndex);used.add(group);return selectedLabels.size===template.length;};const beforeGroups=groups.filter(group=>!used.has(group)&&!isUnlabeledGroup(group)&&group.start>prevTimeIndex&&group.end<current.index);for(const group of beforeGroups)if(tryTake(group,"前置价格组"))break;const afterGroups=groups.filter(group=>!used.has(group)&&!isUnlabeledGroup(group)&&group.start>current.index&&group.start<nextTimeIndex);for(const group of afterGroups)if(tryTake(group,"后置价格组"))break;if(selected.length)byTimeIndex.set(current.index,selected);}return{byTimeIndex,used};}function assignGroupsToSections(timeItems,groups){const template=inferLabelTemplate(groups,timeItems);if(template.length){const templated=assignGroupsByTemplate(timeItems,groups,template);for(const group of groups){if(templated.used.has(group)||!isUnlabeledGroup(group))continue;const owner=previousTimeForGroup(timeItems,group.start)||nextTimeForGroup(timeItems,group.end);if(owner&&!(templated.byTimeIndex.get(owner.index)||[]).length)templated.byTimeIndex.get(owner.index).push({...group,source:"未标注价格组"});}templated.byTimeIndex.template=template;return templated.byTimeIndex;}const byTimeIndex=new Map(timeItems.map(item=>[item.index,[]]));for(const group of groups){const prev=previousTimeForGroup(timeItems,group.start);const next=nextTimeForGroup(timeItems,group.end);let owner=prev||next;if(prev&&next){const prevDistance=group.start-prev.index;const nextDistance=next.index-group.end;owner=prevDistance<=2?prev:(nextDistance<prevDistance?next:prev);}if(owner)byTimeIndex.get(owner.index).push({...group,source:prev&&next&&owner===next?"前置价格组":"后置价格组"});}return byTimeIndex;}function uniqueSorted(prices){return[...new Set(prices.map(price=>Number(price).toFixed(4)))].map(Number).sort((a,b)=>a-b);}function parseSections(text){const lines=normalizeRawText(text).split("\n").map(line=>line.trim()).filter(Boolean);const timeItems=[];lines.forEach((line,index)=>{const time=normTime(line);if(time)timeItems.push({index,...time});});const groups=parsePriceGroups(lines);const groupsByTime=assignGroupsToSections(timeItems,groups);const sections=timeItems.map((timeItem,pos)=>{const nextTimeIndex=pos<timeItems.length-1?timeItems[pos+1].index:lines.length;const sectionGroups=groupsByTime.get(timeItem.index)||[];return{...timeItem,prices:uniqueSorted(sectionGroups.flatMap(group=>group.prices)),groups:sectionGroups,raw:lines.slice(timeItem.index,nextTimeIndex)};});const merged=new Map();for(const section of sections){const key=`${section.start}-${section.end}`;if(!merged.has(key))merged.set(key,{...section,duplicates:1});else{const current=merged.get(key);current.duplicates+=1;current.prices=uniqueSorted([...current.prices,...section.prices]);current.groups.push(...section.groups);}}return[...merged.values()];}function chooseForTarget(sections,target){const start=toMin(target.start);const end=toMin(target.end);const matched=sections.filter(section=>section.end>start&&section.start<end);const available=matched.map(section=>({section,prices:uniqueSorted(section.prices)})).filter(item=>item.prices.length);if(!available.length)return{member:"",nonMember:"",matched,available,status:"missing",note:"未识别到有效总价"};let best=available[0];for(const item of available)if(item.prices[0]<best.prices[0])best=item;const member=best.prices[0];const nonMember=best.prices.length===1?member:best.prices[1];const status=best.prices.length===1||matched.length>1?"review":"ok";const notes=[];if(best.prices.length===1)notes.push("只有一个总价，已按同价处理");if(matched.length>1)notes.push("命中多个实际时段，取最低会员价所在价格组");if(!notes.length)notes.push("已取最低两个有效总价");return{member,nonMember,matched,available,best,status,note:notes.join("；")};}function escapeHtml(value){return String(value??"").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
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
resultRows = config.periods.map((period, index) => ({ index, period, selected: selection.selected.includes(periodId(period)), member: "", nonMember: "", matched: [], available: [], status: "missing", note: "等待识别", edited: false }));
parsedSections = [];
renderResults();
noticeStack.innerHTML = `<div class="notice">已载入 ${config.name} ${config.periods.length} 个全天时段。粘贴 OCR 文本后点击“整理价格”。</div>`;
}
function analyse() {
const text = rawInput.value.trim();
if (!text) {
renderEmptyRows();
noticeStack.innerHTML = `<div class="notice danger">请先粘贴 OCR 文本，或载入一个回归样例。</div>`;
return;
}
parsedSections = parseSections(text);
const config = REGION_CONFIGS[regionSelect.value];
const selection = getRegionSelection();
resultRows = config.periods.map((period, index) => ({ index, period, selected: selection.selected.includes(periodId(period)), edited: false, ...chooseForTarget(parsedSections, period) }));
renderResults();
renderNotices();
renderAudit();
}
function renderResults() {
const state = getRegionSelection();
const visibleRows = state.showCommonOnly ? resultRows.filter(row => row.selected) : resultRows;
resultBody.innerHTML = visibleRows.map(row => {
const matched = row.matched.length ? row.matched.map(item => item.label).join("、") : "—";
const candidates = row.available.length ? uniqueSorted(row.available.flatMap(item => item.prices)).map(v => v.toFixed(4)).join("/") : "—";
const statusClass = row.edited ? "manual" : row.status;
const statusText = row.edited ? "人工修改" : ({ ok: "已识别", review: "需核对", missing: "缺失" }[row.status] || "待处理");
return `<tr data-row-index="${row.index}" data-period-id="${escapeHtml(periodId(row.period))}" class="${row.edited?"edited":""}${row.status==="missing"?"error-row":""}">
<td><input type="checkbox" class="row-select" ${row.selected ? "checked" : ""} aria-label="选择${escapeHtml(row.period.name)}${row.period.start}-${row.period.end}"></td>
<td class="period-cell"><strong>${escapeHtml(row.period.name)}</strong><span>${row.period.start}—${row.period.end}</span></td>
<td class="source-cell mono">${escapeHtml(matched)}</td>
<td class="source-cell mono">${escapeHtml(candidates)}</td>
<td><input class="price-input" data-kind="nonMember" inputmode="decimal" value="${row.nonMember!==""?Number(row.nonMember).toFixed(4):""}" aria-label="${escapeHtml(row.period.name)}非会员价"></td>
<td><input class="price-input" data-kind="member" inputmode="decimal" value="${row.member!==""?Number(row.member).toFixed(4):""}" aria-label="${escapeHtml(row.period.name)}会员价"></td>
<td><span class="status ${statusClass}" title="${escapeHtml(row.note)}">${statusText}</span></td>
</tr>`;
}).join("");
bindResultEvents();
updateCopyPreview();
renderVisibilityControls();
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
row[event.target.dataset.kind] = event.target.value.trim();
row.edited = true;
tr.classList.add("edited");
const chip = tr.querySelector(".status");
chip.className = "status manual";
chip.textContent = "人工修改";
updateCopyPreview();
}));
});
}
function renderNotices() {
const notices = [];
if (!parsedSections.length) notices.push({ type: "danger", text: "没有识别到时段，请检查OCR文本中的时间格式。" });
const missing = resultRows.filter(row => row.status === "missing").length;
const review = resultRows.filter(row => row.status === "review").length;
if (missing) notices.push({ type: "danger", text: `${missing} 个时段没有识别到价格，请人工补录。` });
if (review) notices.push({ type: "warn", text: `${review} 个时段需要核对，请对照截图后再复制。` });
if (!missing && !review && parsedSections.length) notices.push({ type: "", text: `已整理 ${parsedSections.length} 个截图时段，请对照截图完成最终核对。` });
noticeStack.innerHTML = notices.map(item => `<div class="notice ${item.type}">${escapeHtml(item.text)}</div>`).join("");
}
function renderAudit() {
if (!parsedSections.length) {
auditBody.innerHTML = `<div class="audit-item">没有可展示的识别记录。</div>`;
return;
}
auditBody.innerHTML = parsedSections.map(section => {
const groups = section.groups.length ? section.groups.map(group => `${group.label}：${group.prices.map(v => Number(v).toFixed(4)).join("/")}`).join("；") : "未识别到原始价格";
const duplicate = section.duplicates > 1 ? `；重复出现 ${section.duplicates} 次，已合并` : "";
return `<div class="audit-item"><strong class="mono">截图时段 ${escapeHtml(section.label)}</strong>｜识别到的价格：<span class="mono">${section.prices.map(v => v.toFixed(4)).join("/") || "无"}</span>${escapeHtml(duplicate)}<br>原始价格：${escapeHtml(groups)}</div>`;
}).join("");
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
const member = { label: `${row.period.name} · 会员`, value: row.member };
const nonMember = { label: `${row.period.name} · 非会员`, value: row.nonMember };
return priceOrder === "member-first" ? [member, nonMember] : [nonMember, member];
}
function selectedValues() {
return orderedSelectedRows().flatMap(row => priceItems(row).map(item => item.value)).map(value => value === "" ? "" : Number(value).toFixed(4));
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
const values = selectedValues();
const state = getRegionSelection();
const labels = rows.flatMap(row => priceItems(row, state.priceOrder).map(item => item.label));
const columnCount = Math.max(labels.length, 1);
copyLabels.style.setProperty("--copy-count", columnCount);
copyPreview.style.setProperty("--copy-count", columnCount);
copyLabels.innerHTML = labels.map(label => `<span>${escapeHtml(label)}</span>`).join("");
copyPreview.innerHTML = values.length
? values.map(value => `<span>${escapeHtml(value || "待补")}</span>`).join("")
: `<span>未选择任何时段</span>`;
document.getElementById("copyRuleText").textContent = `${state.priceOrder === "member-first" ? "会员价" : "非会员价"}在前 · 按工作顺序`;
}
function renderCopySettings() {
if (!copyDraft) return;
document.querySelectorAll("#priceOrderOptions button").forEach(button => button.classList.toggle("active", button.dataset.priceOrder === copyDraft.priceOrder));
const rows = copyDraft.order.map(id => resultRows.find(row => periodId(row.period) === id)).filter(row => row?.selected);
document.getElementById("copyOrderList").innerHTML = rows.length ? rows.map(row => {
const id = periodId(row.period);
return `<div class="copy-order-item"><div><strong>${escapeHtml(row.period.name)}　${row.period.start}—${row.period.end}</strong><small>会员 ${row.member === "" ? "待补" : Number(row.member).toFixed(4)}　非会员 ${row.nonMember === "" ? "待补" : Number(row.nonMember).toFixed(4)}</small></div><div class="copy-order-arrows"><button type="button" data-copy-move="-1" data-period-id="${escapeHtml(id)}" aria-label="向前移动">↑</button><button type="button" data-copy-move="1" data-period-id="${escapeHtml(id)}" aria-label="向后移动">↓</button></div></div>`;
}).join("") : `<div class="notice warn">请先设置至少一个常用时段。</div>`;
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
const gear = document.getElementById("copySettingsBtn");
gear.classList.remove("sparkle");
void gear.offsetWidth;
gear.classList.add("sparkle");
setTimeout(() => gear.classList.remove("sparkle"), 1500);
}
function openLayer(element, withOverlay) {
closeLayers();
element.hidden = false;
if (withOverlay) modalOverlay.hidden = false;
document.body.style.overflow = withOverlay ? "hidden" : "";
}
function closeLayers() {
[commonModal, copyModal, rulePopover, helpDrawer, modalOverlay].forEach(element => { element.hidden = true; });
document.body.style.overflow = "";
}
function renderHelpLinks() {
document.getElementById("helpLinks").innerHTML = HELP_SECTIONS.map(section => `<button type="button" class="help-link" data-help-id="${section.id}"><span><strong>${escapeHtml(section.title)}</strong><small>${escapeHtml(section.summary)}</small></span><b>›</b></button>`).join("");
document.querySelectorAll("[data-help-id]").forEach(button => button.addEventListener("click", () => showHelpDetail(button.dataset.helpId)));
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
const original = document.getElementById("copyBtn").textContent;
document.getElementById("copyBtn").textContent = "已复制";
setTimeout(() => document.getElementById("copyBtn").textContent = original, 1200);
}
regionSelect.addEventListener("change", () => {
closeLayers();
persistGeneralPreferences();
renderSchedule();
if (rawInput.value.trim()) analyse(); else renderEmptyRows();
});
effectiveMonth.addEventListener("change", () => { persistGeneralPreferences(); renderSchedule(); });
document.getElementById("unlockSamplesBtn").addEventListener("click", () => {
const key = window.prompt("请输入内部样例密钥");
if (key === INTERNAL_SAMPLE_KEY) {
document.getElementById("sampleLock").hidden = true;
document.getElementById("sampleTools").hidden = false;
} else if (key !== null) {
window.alert("密钥不正确");
}
});
document.getElementById("loadSampleBtn").addEventListener("click", () => { rawInput.value = SAMPLES[sampleSelect.value]; analyse(); });
document.getElementById("analyseBtn").addEventListener("click", analyse);
document.getElementById("resetResultBtn").addEventListener("click", analyse);
document.getElementById("clearBtn").addEventListener("click", () => { rawInput.value = ""; renderEmptyRows(); });
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
document.getElementById("helpBtn").addEventListener("click", () => {
showHelpOverview();
openLayer(helpDrawer, true);
});
document.getElementById("helpBackBtn").addEventListener("click", showHelpOverview);
document.querySelectorAll("[data-close-layer]").forEach(button => button.addEventListener("click", closeLayers));
modalOverlay.addEventListener("click", closeLayers);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLayers(); });
renderHelpLinks();
window.PriceWorkbench = { parseSections, chooseForTarget, REGION_CONFIGS };
const startupParams = new URLSearchParams(window.location.search);
const startupRegion = startupParams.get("region");
if (startupRegion && REGION_CONFIGS[startupRegion]) regionSelect.value = startupRegion;
else if (storedPreferences.lastRegion && REGION_CONFIGS[storedPreferences.lastRegion]) regionSelect.value = storedPreferences.lastRegion;
if (storedPreferences.effectiveMonth && !startupParams.get("month")) effectiveMonth.value = storedPreferences.effectiveMonth;
if (startupParams.get("month")) effectiveMonth.value = startupParams.get("month");
renderSchedule();
renderEmptyRows();

