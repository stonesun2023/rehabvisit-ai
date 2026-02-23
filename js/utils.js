// 公共工具函数

/**
 * 获取当前年周（格式：2026-W08）
 */
function getYearWeek() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return d.getFullYear() + '-W' + String(week).padStart(2, '0');
}

/**
 * 获取今天的日期字符串（格式：2026-02-23）
 */
function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * 提交打卡记录到 localStorage
 * @param {string} taskId - 任务ID
 * @param {string} taskName - 任务名称
 * @param {number} difficulty - 困难度：1=轻松，2=正常，3=有点吃力
 * @param {string} note - 备注（可选）
 */
function submitLog(taskId, taskName, difficulty, note) {
  const logs = JSON.parse(localStorage.getItem('rehab_task_logs') || '[]');
  logs.push({
    id: 'log_' + Date.now(),
    task_id: taskId,
    task_name: taskName,
    completed_at: new Date().toISOString(),
    difficulty: difficulty,
    note: note || '',
    week: getYearWeek()
  });
  localStorage.setItem('rehab_task_logs', JSON.stringify(logs));
}

/**
 * 获取今天的打卡记录
 * @returns {Array} 今天的打卡记录数组
 */
function getTodayLogs() {
  const logs = JSON.parse(localStorage.getItem('rehab_task_logs') || '[]');
  const today = getTodayStr();
  return logs.filter(log => log.completed_at.slice(0, 10) === today);
}

/**
 * 检查某任务今天是否已打卡
 * @param {string} taskId - 任务ID
 * @returns {boolean}
 */
function isTaskCompletedToday(taskId) {
  const todayLogs = getTodayLogs();
  return todayLogs.some(log => log.task_id === taskId);
}

/**
 * 获取某任务今天的打卡记录
 * @param {string} taskId - 任务ID
 * @returns {Object|null}
 */
function getTaskLogToday(taskId) {
  const todayLogs = getTodayLogs();
  return todayLogs.find(log => log.task_id === taskId) || null;
}

/**
 * 获取困难度对应的 emoji
 * @param {number} difficulty - 困难度
 * @returns {string}
 */
function getDifficultyEmoji(difficulty) {
  const emojis = { 1: '😊', 2: '😐', 3: '😓' };
  return emojis[difficulty] || '';
}

/**
 * 获取困难度对应的文字
 * @param {number} difficulty - 困难度
 * @returns {string}
 */
function getDifficultyText(difficulty) {
  const texts = { 1: '轻松', 2: '正常', 3: '有点吃力' };
  return texts[difficulty] || '';
}