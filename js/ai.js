// GLM API 配置
export const GLM_API_KEY = '27b0c3b4495d41a7abd38c5666e09665.7UmdjwqfPcaHfoZO'
export const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

// GLM API 调用封装
export async function callGLM(messages, options = {}) {
  const response = await fetch(GLM_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GLM_API_KEY}`
    },
    body: JSON.stringify({
      model: 'glm-4-flash',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000
    })
  })

  if (!response.ok) {
    throw new Error(`API错误: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}