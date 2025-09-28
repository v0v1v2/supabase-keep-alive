'use server';

import { runKeepAlivePing, InsertResult } from '@/lib/keepAlive';

// 这个函数现在只是一个包装器，实际逻辑已移走
// 但保留它，这样你手动测试的页面仍然可以工作
export async function addKeepAlivePing(formData: FormData): Promise<InsertResult[]> {
  // 注意：我们这里调用了 runKeepAlivePing，它会自动生成随机字符串
  // 如果你还想使用手动输入的内容，需要稍微修改 runKeepAlivePing 函数，让它可以接收一个可选的 content 参数
  return runKeepAlivePing();
}