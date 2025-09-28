import { supabaseProject1, supabaseProject2, supabaseProject3 } from './supabaseClients';

// 定义返回结果的类型
export interface InsertResult {
  projectName: string;
  success: boolean;
  message: string;
}

// 随机字符串生成函数
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


// 核心的插入逻辑
export async function runKeepAlivePing(): Promise<InsertResult[]> {
  const content = `Automated daily ping with random string: ${generateRandomString(10)}`;

  const clients = [
    { name: 'Supabase Project 1', client: supabaseProject1 },
    { name: 'Supabase Project 2', client: supabaseProject2 },
    { name: 'Supabase Project 3', client: supabaseProject3 },
  ];

  const results = await Promise.allSettled(
    clients.map(item =>
      item.client.from('keep_alive_pings').insert({ content: content })
    )
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      if (result.value.error) {
        return {
          projectName: clients[index].name,
          success: false,
          message: `Error: ${result.value.error.message}`,
        };
      }
      return {
        projectName: clients[index].name,
        success: true,
        message: 'Data inserted successfully.',
      };
    } else {
      return {
        projectName: clients[index].name,
        success: false,
        message: `Failed to execute insert: ${result.reason.message}`,
      };
    }
  });
}