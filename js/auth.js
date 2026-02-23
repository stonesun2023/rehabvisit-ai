// 登录 / 注册 / 角色判断（doctor | patient）
import { supabase } from './supabase-client.js'

// 确保 sessionStorage 中有患者信息
// 若丢失则从 Supabase 重新拉取，若未登录则跳转登录页
export async function ensurePatientSession() {
  // 1. 从 sessionStorage 读取
  let patient = null
  const patientStr = sessionStorage.getItem('rehab_current_patient')
  if (patientStr) {
    try {
      patient = JSON.parse(patientStr)
    } catch (e) {
      patient = null
    }
  }
  if (patient) return patient  // 有就直接返回

  // 2. 没有 → 先检查是否登录
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.location.href = '../index.html'
    return null
  }

  // 3. 登录了但 sessionStorage 丢失 → 从 Supabase 重新查询
  if (user.user_metadata?.role !== 'patient') {
    window.location.href = '../index.html'
    return null
  }

  const { data: patientData, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error || !patientData) {
    // 登录了但没有关联患者档案，跳回登录页
    window.location.href = '../index.html'
    return null
  }

  // 4. 恢复 sessionStorage
  sessionStorage.setItem('rehab_current_patient', JSON.stringify(patientData))
  return patientData
}