'use client';

import { useState } from 'react';
import { addKeepAlivePing } from './actions'; // 从 actions.ts 只导入函数
import type { InsertResult } from '@/lib/keepAlive'; // 从新的 keepAlive.ts 导入类型

export default function HomePage() {
  const [content, setContent] = useState<string>('');
  const [results, setResults] = useState<InsertResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResults([]); // 清空上次结果

    const formData = new FormData();
    formData.append('content', content || `Auto-ping @ ${new Date().toLocaleString()}`);

    const submissionResults = await addKeepAlivePing(formData);
    
    setResults(submissionResults);
    setIsSubmitting(false);
    setContent(''); // 提交后清空输入框
  };

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Supabase Keep-Alive Tool</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Enter some text and submit. It will be inserted into three different Supabase projects to keep them active.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter some text (optional)"
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            backgroundColor: isSubmitting ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Ping All Projects'}
        </button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Submission Results:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((result, index) => (
              <li key={index} style={{ 
                  padding: '10px', 
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: `1px solid ${result.success ? 'green' : 'red'}`,
                  backgroundColor: result.success ? '#e9f7ef' : '#fdecea'
                }}>
                <strong>{result.projectName}:</strong> 
                <span style={{ color: result.success ? 'green' : 'red' }}>
                  {result.success ? ' SUCCESS' : ' FAILED'}
                </span>
                <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#333' }}>{result.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}