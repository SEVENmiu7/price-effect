/* 正式时段配置：修改后提交 Git 并重新部署，所有电脑将读取同一版本。 */
window.PRICE_TIME_TABLES = {
  version: "2026-07-21.1",
  regions: {
    changsha: {
      name: "长沙",
      tables: {
        "2026-06": {
          defaultOrder: ["00:00-06:00|晚谷", "12:00-14:00|中谷", "06:00-12:00|平"],
          periods: [
            { name: "晚谷", start: "00:00", end: "06:00", tone: 2 },
            { name: "平", start: "06:00", end: "12:00", tone: 5 },
            { name: "中谷", start: "12:00", end: "14:00", tone: 1 },
            { name: "平", start: "14:00", end: "16:00", tone: 5 },
            { name: "峰", start: "16:00", end: "24:00", tone: 4 }
          ]
        },
        "2026-07": {
          defaultOrder: ["00:00-06:00|晚谷", "06:00-12:00|平", "12:00-14:00|中谷"],
          periods: [
            { name: "晚谷", start: "00:00", end: "06:00", tone: 2 },
            { name: "平", start: "06:00", end: "12:00", tone: 5 },
            { name: "中谷", start: "12:00", end: "14:00", tone: 1 },
            { name: "平", start: "14:00", end: "16:00", tone: 5 },
            { name: "峰", start: "16:00", end: "20:00", tone: 4 },
            { name: "尖", start: "20:00", end: "24:00", tone: 3 }
          ]
        }
      }
    },
    jiangxi: {
      name: "江西",
      tables: {
        "2026-06": {
          defaultOrder: ["12:00-14:00|深谷", "01:00-05:00|低谷", "00:00-01:00|平"],
          periods: [
            { name: "平", start: "00:00", end: "01:00", tone: 5 },
            { name: "低谷", start: "01:00", end: "05:00", tone: 2 },
            { name: "平", start: "05:00", end: "11:30", tone: 5 },
            { name: "低谷", start: "11:30", end: "12:00", tone: 2 },
            { name: "深谷", start: "12:00", end: "14:00", tone: 1 },
            { name: "低谷", start: "14:00", end: "14:30", tone: 2 },
            { name: "平", start: "14:30", end: "16:00", tone: 5 },
            { name: "高峰", start: "16:00", end: "22:00", tone: 4 },
            { name: "平", start: "22:00", end: "24:00", tone: 5 }
          ]
        },
        "2026-07": {
          defaultOrder: ["00:00-01:00|平", "01:00-05:00|低谷", "12:00-14:00|深谷"],
          periods: [
            { name: "平", start: "00:00", end: "01:00", tone: 5 },
            { name: "低谷", start: "01:00", end: "05:00", tone: 2 },
            { name: "平", start: "05:00", end: "11:30", tone: 5 },
            { name: "低谷", start: "11:30", end: "12:00", tone: 2 },
            { name: "深谷", start: "12:00", end: "14:00", tone: 1 },
            { name: "低谷", start: "14:00", end: "14:30", tone: 2 },
            { name: "平", start: "14:30", end: "17:00", tone: 5 },
            { name: "高峰", start: "17:00", end: "20:30", tone: 4 },
            { name: "尖峰", start: "20:30", end: "22:30", tone: 3 },
            { name: "高峰", start: "22:30", end: "23:00", tone: 4 },
            { name: "平", start: "23:00", end: "24:00", tone: 5 }
          ]
        }
      }
    }
  }
};
