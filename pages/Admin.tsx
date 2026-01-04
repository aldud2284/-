import React, { useState } from 'react';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Users, PenTool, Save } from 'lucide-react';
import { NOTICE_DATA } from '../constants';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login Simulation
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'admin' && loginPw === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다. (Demo: admin/admin)');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">Y</div>
            <h1 className="text-2xl font-bold text-gray-800">관리자 로그인</h1>
            <p className="text-gray-500">Demo Account: admin / admin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
              <input 
                type="text" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input 
                type="password" 
                value={loginPw}
                onChange={(e) => setLoginPw(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-[#004a7c] transition-colors">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">Y</div>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
            { id: 'posts', icon: FileText, label: '게시물 관리' },
            { id: 'gallery', icon: ImageIcon, label: '갤러리 관리' },
            { id: 'design', icon: PenTool, label: '디자인 설정' },
            { id: 'settings', icon: Settings, label: '시스템 설정' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-4 py-2"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-xl text-gray-800">
            {activeTab === 'dashboard' && '대시보드 개요'}
            {activeTab === 'posts' && '게시물 관리'}
            {activeTab === 'gallery' && '갤러리 관리'}
            {activeTab === 'design' && '테마 및 디자인 설정'}
            {activeTab === 'settings' && '환경 설정'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="text-sm text-right">
               <p className="font-bold text-gray-800">최고관리자</p>
               <p className="text-xs text-gray-500">최근 접속: 2024.05.20</p>
             </div>
             <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: '오늘 방문자', value: '1,234', color: 'bg-blue-500' },
                { label: '신규 게시글', value: '12', color: 'bg-green-500' },
                { label: '답변 대기', value: '5', color: 'bg-amber-500' },
                { label: '회원 단체', value: '150', color: 'bg-purple-500' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <div className={`h-1 w-full mt-4 rounded ${stat.color} opacity-20`}>
                    <div className={`h-full w-[70%] rounded ${stat.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">전체선택</button>
                  <button className="px-3 py-1 bg-white border rounded text-sm text-red-500 hover:bg-red-50">삭제</button>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-[#004a7c] text-sm font-bold">
                  + 새 글 작성
                </button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-gray-600 font-bold border-b">
                  <tr>
                    <th className="p-4 w-10"><input type="checkbox" /></th>
                    <th className="p-4">제목</th>
                    <th className="p-4 w-32">작성자</th>
                    <th className="p-4 w-32">날짜</th>
                    <th className="p-4 w-20">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {NOTICE_DATA.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="p-4"><input type="checkbox" /></td>
                      <td className="p-4">{post.title}</td>
                      <td className="p-4">{post.author}</td>
                      <td className="p-4">{post.date}</td>
                      <td className="p-4">
                        <button className="text-primary hover:underline">수정</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl">
              <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
                * 이곳에서 설정한 값은 웹사이트 전체에 실시간으로 반영됩니다. (Demo 모드: 실제 저장은 되지 않음)
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">기본 색상 설정</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label>Primary Color</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">#005A94</span>
                        <div className="w-8 h-8 rounded border bg-[#005A94] cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-gray-300"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label>Secondary Color</label>
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-500">#2E8B57</span>
                         <div className="w-8 h-8 rounded border bg-[#2E8B57] cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-gray-300"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label>Accent Color</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">#FFC107</span>
                        <div className="w-8 h-8 rounded border bg-[#FFC107] cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">폰트 및 레이아웃</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">기본 폰트</label>
                      <select className="w-full border p-2 rounded">
                        <option>Noto Sans KR (기본)</option>
                        <option>Pretendard</option>
                        <option>Nanum Gothic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">헤더 스타일</label>
                      <div className="flex gap-2">
                        <button className="flex-1 border p-2 rounded bg-gray-100 text-sm font-bold border-primary text-primary">Sticky (고정)</button>
                        <button className="flex-1 border p-2 rounded bg-white text-sm text-gray-500 hover:bg-gray-50">Static (일반)</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-[#004a7c] transition-colors">
                  <Save size={18} /> 설정 저장하기
                </button>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {(activeTab === 'gallery' || activeTab === 'settings') && (
             <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
               <Settings size={48} className="mb-4 opacity-20" />
               <p>해당 기능 관리 페이지 준비중입니다.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};
