import { NextResponse } from 'next/server';
import { runKeepAlivePing } from '@/lib/keepAlive';

export async function GET(request: Request) {
  // 1. 从请求头中获取授权信息
  const authHeader = request.headers.get('authorization');

  // 2. 验证密钥是否匹配
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // 如果不匹配，返回 401 Unauthorized 错误
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  // 3. 如果密钥正确，执行数据库插入操作
  try {
    const results = await runKeepAlivePing();
    // 返回成功的结果
    return NextResponse.json({ success: true, results });
  } catch (error) {
    // 如果过程中出错，返回 500 错误
    return NextResponse.json({ success: false, message: 'An error occurred.' }, { status: 500 });
  }
}