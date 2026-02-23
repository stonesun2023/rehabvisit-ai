# RehabVisit_AI 项目协作规范 v1.0

> **每次开工前必读**，确保协作一致性。
> 本规范基于「超级大脑项目协作规范 v1.1」升级定制，针对医疗产品、双角色用户、分阶段迁移架构做了专项补充。

---

## 一、角色分工

| 角色 | 负责人 | 职责 |
|------|--------|------|
| 产品决策者 | 你（康复医学科医生）| 需求提出、医疗内容审核、优先级排定、最终验收 |
| 总工程师 | Claude | 架构决策、任务拆解、指令撰写、代码审查、风险预判、AI提示词设计 |
| 执行 Agent | Cline | 按指令落地代码，不做架构决策，不修改医疗相关文案 |

**三条核心原则：**
1. **Claude 不亲自写代码，只给指令和做审查。**
2. **所有面向患者/家长的文案，必须经过你（医生）审核后才能上线。**
3. **Cline 遇到医疗内容相关的判断，停下来问，不自行发挥。**

---

## 二、工作流程

```
你提需求（医生语言描述即可）
  → Claude 分析，输出 Vibe Coding 指令
    → 你把指令交给 Cline 执行
      → 你把结果截图/报错反馈给 Claude
        → Claude 审查或调整指令
          → 循环直到完成
            → 涉及医疗文案 → 你审核 → 确认上线
```

**特别说明：** 你不需要读懂代码，只需要：
- 判断界面是否符合患者/家长的使用习惯
- 确认医疗相关内容的准确性
- 把你看到的问题用自然语言描述给 Claude

---

## 三、Vibe Coding 指令书写规范

### 3.1 格式要求

所有指令使用 **Markdown** 书写，便于 Cline（LLM）理解和执行。

### 3.2 标准四段式结构

```markdown
## 目标
一句话说清楚这个任务要达成什么。

## 定位
改哪个文件、找哪个函数/区域，越精确越好。
格式：先阅读 `[文件名]` 的 `[函数名/区域]`，再动手。

## 实现
核心逻辑描述，用自然语言 + 必要的伪代码。
代码片段只给关键逻辑，不给完整实现。

## 注意
- 坑和边界条件
- 不能动的地方
- 依赖关系
- 医疗安全红线（如有）
```

### 3.3 定位优先原则

**定位准确 > 描述详细。** 指令开头必须明确文件和函数位置，避免 Cline 猜测改错地方。

### 3.4 多任务指令规范

- **每个任务独立一组四段式**，不合并输出
- 任务之间用 `---` 分隔线隔开
- 每个任务标题编号明确：`## Task 1 · 登录页布局` 格式（编号+功能名）
- Cline **逐个执行**，完成一个汇报结果再执行下一个

### 3.5 医疗内容专项规范

涉及以下内容的指令，必须在「注意」段标注 `⚠️ 医疗内容，文案待医生审核`：
- AI 回答患者/家长问题的 System Prompt
- 康复计划解读的输出模板
- 异常情况判断的触发条件
- 任何直接展示给患者/家长的提示文字

### 3.6 禁止事项

- 指令不写完整代码（关键伪代码除外）
- 不在一条指令里塞多个不相关任务
- 不省略「注意」段，哪怕只有一条
- 不在实现段掺入分析内容，分析留在 Claude 与你的对话中
- **Cline 不得自行修改任何医疗文案，必须保留占位符等待审核**

---

## 四、当前对话窗口使用规范

- **Claude 的回复保持精简**，高价值工程决策优先，不用代码填充对话
- 需求讨论、架构分析、风险评估、AI 提示词设计 → 在此窗口进行
- 具体代码执行 → 交给 Cline，结果再反馈回来
- 如遇复杂问题，Claude 先给出分析和方案选项，你确认后再出指令
- **你反馈问题时**，描述"我看到了什么 / 期望看到什么"即可，不需要猜测技术原因

---

## 五、项目基础信息（快速参考）

### 5.1 仓库与部署

| 项目 | 信息 |
|------|------|
| **项目全名** | RehabVisit_AI（康复随访 AI）|
| **GitHub 仓库** | `https://github.com/stonesun2023/rehabvisit-ai` |
| **线上地址（MVP）** | https://stonesun2023.github.io/rehabvisit-ai/ |
| **本地测试** | `npx http-server . -p 8080 --cors` |
| **部署方式** | GitHub Pages（静态）→ 迁移后换 Vercel |
| **本地路径** | D:\Projects\S-rehabvisit-ai-0223\rehabvisit-ai |

> ⚠️ 建仓库时：仓库名用小写+连字符 `rehabvisit-ai`，开启 GitHub Pages，Source 选 `main` 分支 `/root` 目录。

### 5.2 技术栈（分阶段）

| 阶段 | 技术栈 | 时间目标 |
|------|--------|----------|
| **Phase 1（当前）** | 静态 HTML + Vanilla JS + Supabase JS SDK + GitHub Pages | 第1个月 MVP 上线 |
| **Phase 2（迁移）** | Next.js 14 + Supabase + Vercel + TailwindCSS | MVP 验证后启动 |
| **Phase 3（扩展）** | 微信小程序 + MCP 集成 + Agent 自动化 | 规模化阶段 |

### 5.3 文件结构（Phase 1）

```
rehabvisit-ai/
├── index.html              # 入口/登录页
├── doctor/
│   ├── dashboard.html      # 医生看板
│   ├── patient-add.html    # 添加患者
│   └── patient-detail.html # 患者详情+训练计划录入
├── patient/
│   ├── home.html           # 家长首页（今日任务）
│   ├── chat.html           # AI 问答页
│   └── progress.html       # 进展记录页
├── js/
│   ├── supabase-client.js  # Supabase 初始化（统一入口）
│   ├── auth.js             # 登录/注册/角色判断
│   ├── ai.js               # Claude API 调用封装
│   └── utils.js            # 公共工具函数
├── css/
│   └── main.css            # 全局样式（CSS 变量统一管理）
├── prompts/
│   └── system-prompts.js   # 所有 AI System Prompt（集中管理）
└── COLLABORATION_SPEC.md   # 本文档（放入仓库）
```

### 5.4 关键技术约定

| 约定项 | 规则 |
|--------|------|
| **CSS 变量** | 主色调用 `--primary-color`，危险色用 `--danger-color`，全局统一 |
| **Supabase 初始化** | 只在 `js/supabase-client.js` 中初始化一次，其他文件 import |
| **Claude API 调用** | 只在 `js/ai.js` 中封装，**API Key 存 Supabase Edge Function，绝不写在前端代码里** |
| **角色判断** | 登录后从 Supabase `user_metadata.role` 读取角色（`doctor` / `patient`），跳转对应页面 |
| **System Prompt** | 全部集中在 `prompts/system-prompts.js`，便于统一审核和迭代 |
| **本地存储 key** | 用户临时状态用 `rehab_` 前缀，如 `rehab_current_patient` |
| **手机适配** | 所有页面默认移动端优先，viewport meta 必须设置，最小可点击区域 44px |

### 5.5 Supabase 数据表（核心表结构）

```
users（由 Supabase Auth 管理）
  └── user_metadata: { role: 'doctor'|'patient', name: string }

patients（患者档案）
  ├── id, doctor_id, name, age, diagnosis, contact
  └── created_at

rehab_plans（康复计划）
  ├── id, patient_id, doctor_id
  ├── professional_content  -- 医生填写的专业版
  ├── family_content        -- AI 生成的家长版（医生审核后标记）
  ├── is_approved           -- 医生是否已审核家长版
  └── created_at, updated_at

daily_tasks（每日任务，从计划拆解）
  ├── id, plan_id, patient_id
  ├── task_name, description, frequency, duration
  └── sort_order

task_logs（打卡记录）
  ├── id, task_id, patient_id
  ├── completed_at, note, difficulty_level
  └── created_by

chat_logs（AI 对话记录）
  ├── id, patient_id, role（'user'|'assistant'）
  ├── content, created_at
  └── flagged_for_doctor  -- 需要医生关注的对话标记
```

### 5.6 环境变量（不得提交到 GitHub）

```
# .env.local（加入 .gitignore）
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
# Claude API Key 存 Supabase Edge Function，不在此配置
```

---

## 六、AI 安全红线（医疗产品专项）

这是本项目最重要的非技术规范，**任何情况下不得突破**：

### 6.1 Claude 必须拒绝的行为
- 做出或暗示医疗诊断
- 建议患者更改医生制定的治疗方案
- 对药物剂量给出具体建议
- 对儿童患者的体征变化给出"不需要就医"的判断

### 6.2 Claude 必须主动触发的行为
当 AI 检测到以下关键词/场景，**必须立即提示联系医生或就医**：
- 儿童：持续高烧（≥38.5°C超过24小时）、突然无法完成之前能做的动作、伤口红肿化脓
- 成人：训练后剧烈疼痛（非正常肌肉酸痛）、肢体突然麻木无力、头晕意识模糊

### 6.3 免责声明显示规则
- 每个页面底部固定显示免责声明
- AI 每次对话结束，如涉及医疗建议，必须附加免责提示
- 免责声明文案不得随意修改，需经你审核确认

---

## 七、提交规范

```
feat:     新功能（如 feat: 添加患者打卡功能）
fix:      Bug 修复（如 fix: 修复手机端登录按钮点击区域过小）
content:  医疗文案更新（如 content: 更新AI系统提示词 v2）
style:    样式调整（不影响功能）
refactor: 重构（如 refactor: 抽取 Supabase 初始化到独立文件）
docs:     文档更新
chore:    杂项（依赖、配置等）
```

---

## 八、每周节奏（第一个月冲刺期）

| 时间 | 你做什么 | Claude 做什么 |
|------|----------|---------------|
| 每周一 | 告知本周目标和上周遇到的问题 | 输出本周任务拆解和指令清单 |
| 开发中 | 执行指令、反馈结果、审核医疗文案 | 审查代码、调整指令、解答疑问 |
| 每周五 | 在手机上完整走一遍用户流程 | 根据反馈规划下周优先级 |

**第一个月里程碑：**

```
Week 1：环境搭建 + 登录注册跑通（医生/家长双角色）
Week 2：医生端核心——录入计划 + AI 生成家长版
Week 3：家长端核心——今日任务 + 打卡 + AI 问答
Week 4：内测上线——5-8个真实家长使用 + 收集反馈
```

---

## 九、规范更新机制

- 本文档版本号：`v1.0`
- 踩到新坑或发现新约定，**当天更新本文档**，不要靠记忆
- 小补充：直接修改并在行末注明日期
- 重大调整：升级版本号，在文档顶部写变更摘要
- **本文档是项目的「宪法」，Claude 每次开工前会重新阅读它**

---

## 十、快速启动检查清单（每次开工前过一遍）

```
□ GitHub 仓库已创建，本地已 clone
□ Supabase 项目已创建，数据表已建好
□ .gitignore 已包含 .env.local
□ Claude API Key 已配置到 Supabase Edge Function
□ Cline 已配置 Claude API，模型选 claude-sonnet-4-5
□ 本地 http-server 可以正常启动
□ 手机浏览器可以访问本地/线上页面
□ 本规范已阅读（哪怕扫一遍）
```

---

## 十一、产品决策备忘

| 日期 | 决策 | 备注 |
|------|------|------|
| 2026-02-23 | 登录方式当前用手机号伪邮箱（A方案） | 规模化后升级为真实手机号+短信验证码（B方案），需接入阿里云短信 |

---

*创建日期：2026-02-23 | v1.0 初始版本*
*基于「超级大脑项目协作规范 v1.1」升级，针对 RehabVisit_AI 医疗产品定制*
