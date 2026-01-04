import React, { useState } from 'react';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, PenTool, Save } from 'lucide-react';
import { NOTICE_DATA } from '../constants.ts';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'admin' && loginPw === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다. (admin/admin)');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">관리자 로그인</h1>
            <p className="text-gray-500 text-sm">Demo: admin / admin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" placeholder="ID" 
              value={loginId} onChange={(e) => setLoginId(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <input 
              type="password" placeholder="PW" 
              value={loginPw} onChange={(e) => setLoginPw(e.target.value)}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700 font-bold">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-primary' : 'text-gray-400'}`}><LayoutDashboard size={20}/> 대시보드</button>
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'posts' ? 'bg-primary' : 'text-gray-400'}`}><FileText size={20}/> 게시물 관리</button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="p-6 text-gray-400 flex items-center gap-2"><LogOut size={18}/> 로그아웃</button>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-bold mb-6">{activeTab === 'dashboard' ? '대시보드' : '게시물 관리'}</h2>
        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                   <tr><th className="p-4">제목</th><th className="p-4">날짜</th></tr>
                </thead>
                <tbody>
                   {NOTICE_DATA.map(post => (
                      <tr key={post.id} className="border-b"><td className="p-4">{post.title}</td><td className="p-4">{post.date}</td></tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </main>
    </div>
  );
};