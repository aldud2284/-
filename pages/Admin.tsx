import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, LogOut, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { NOTICE_DATA } from '../constants.ts';
import { Post } from '../types.ts';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'write'>('dashboard');
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  
  // Data State
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // Form State
  const [form, setForm] = useState({
    title: '',
    category: '공지',
    author: '관리자',
    content: '',
    imageUrl: ''
  });

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('association_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(NOTICE_DATA);
    }
  }, []);

  // Save to localStorage whenever posts change
  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('association_posts', JSON.stringify(newPosts));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === 'admin' && loginPw === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다. (admin/admin)');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      const updatedPosts = posts.map(p => 
        p.id === editingPost.id ? { ...p, ...form } : p
      );
      savePosts(updatedPosts);
      alert('게시글이 수정되었습니다.');
    } else {
      const newPost: Post = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        ...form,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      savePosts([newPost, ...posts]);
      alert('새 게시글이 등록되었습니다.');
    }
    resetForm();
    setActiveTab('posts');
  };

  const resetForm = () => {
    setForm({ title: '', category: '공지', author: '관리자', content: '', imageUrl: '' });
    setEditingPost(null);
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      category: post.category,
      author: post.author,
      content: post.content || '',
      imageUrl: post.imageUrl || ''
    });
    setActiveTab('write');
  };

  const deletePost = (id: number) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      const filtered = posts.filter(p => p.id !== id);
      savePosts(filtered);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full text-primary mb-4">
              <LayoutDashboard size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">통합 관리 시스템</h1>
            <p className="text-gray-500 text-sm mt-1">접속을 위해 관리자 인증이 필요합니다.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
              <input 
                type="text" 
                value={loginId} onChange={(e) => setLoginId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input 
                type="password"
                value={loginPw} onChange={(e) => setLoginPw(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="••••••"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary/90 transition-colors">
              관리자 로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-bold tracking-tight">관리자 센터</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => { setActiveTab('dashboard'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20}/> 대시보드
          </button>
          <button 
            onClick={() => { setActiveTab('posts'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText size={20}/> 게시물 관리
          </button>
          <button 
            onClick={() => { setActiveTab('write'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'write' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Plus size={20}/> 새 게시글 작성
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18}/> 시스템 로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'posts' && 'Post Management'}
              {activeTab === 'write' && (editingPost ? 'Edit Post' : 'Create New Post')}
            </h2>
            <p className="text-gray-500 mt-1">용인특례시 공동주택연합회 웹사이트 콘텐츠를 관리합니다.</p>
          </div>
          {activeTab === 'posts' && (
            <button 
              onClick={() => { setActiveTab('write'); resetForm(); }}
              className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              <Plus size={18} /> 새 글 작성
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">전체 게시글</div>
              <div className="text-4xl font-black text-primary">{posts.length}건</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">공지사항 비율</div>
              <div className="text-4xl font-black text-secondary">{Math.round((posts.filter(p => p.category === '공지').length / posts.length) * 100)}%</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">최근 작성일</div>
              <div className="text-4xl font-black text-accent">{posts[0]?.date || '-'}</div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                   <tr>
                     <th className="p-5 font-bold text-gray-600">분류</th>
                     <th className="p-5 font-bold text-gray-600">제목</th>
                     <th className="p-5 font-bold text-gray-600">작성일</th>
                     <th className="p-5 font-bold text-gray-600 text-right">관리</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {posts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-5">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            post.category === '공지' ? 'bg-red-50 text-red-600' : 
                            post.category === '행사' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {post.category}
                          </span>
                        </td>
                        <td className="p-5 font-medium text-gray-800">{post.title}</td>
                        <td className="p-5 text-gray-500">{post.date}</td>
                        <td className="p-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => startEdit(post)}
                              className="p-2 text-gray-400 hover:text-primary transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => deletePost(post.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             {posts.length === 0 && (
               <div className="p-20 text-center text-gray-400">등록된 게시글이 없습니다.</div>
             )}
          </div>
        )}

        {activeTab === 'write' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">분류</label>
                  <select 
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>공지</option>
                    <option>행사</option>
                    <option>소식</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">작성자</label>
                  <input 
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
                    placeholder="관리자"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                <input 
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary font-bold"
                  placeholder="제목을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">본문 내용</label>
                <textarea 
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={10}
                  className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="공지사항 내용을 상세히 작성하세요"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">사진 첨부</label>
                <div className="flex items-start gap-4">
                  <div className={`relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden transition-all ${form.imageUrl ? 'border-primary' : 'hover:border-primary'}`}>
                    {form.imageUrl ? (
                      <>
                        <img src={form.imageUrl} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:scale-110 transition-transform"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-gray-400">
                        <ImageIcon size={32} className="mx-auto mb-2" />
                        <span className="text-xs">사진 선택</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="text-sm text-gray-500 pt-2">
                    <p>• 권장 크기: 1200 x 800px</p>
                    <p>• 파일 형식: JPG, PNG, WEBP</p>
                    <p>• 최대 용량: 2MB (데모 환경)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => { setActiveTab('posts'); resetForm(); }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-primary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <Save size={18} /> {editingPost ? '정보 수정하기' : '게시글 등록하기'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};