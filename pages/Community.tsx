
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NOTICE_DATA } from '../constants.ts';
import { Post } from '../types.ts';
import { Search, FileText, Calendar, User, Image as ImageIcon, X, ExternalLink } from 'lucide-react';

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Load posts
    const savedPosts = localStorage.getItem('association_posts');
    const allPosts = savedPosts ? JSON.parse(savedPosts) : NOTICE_DATA;
    setPosts(allPosts);

    // 2. Check if there's an ID in the URL to open a specific post
    const params = new URLSearchParams(location.search);
    const postId = params.get('id');
    if (postId) {
      const post = allPosts.find((p: Post) => p.id === parseInt(postId));
      if (post) {
        if (post.link) {
          window.open(post.link, '_blank');
          // Remove the ID from URL without refreshing
          navigate('/community', { replace: true });
        } else {
          setSelectedPost(post);
        }
      }
    }
  }, [location, navigate]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = (post: Post) => {
    if (post.link) {
      window.open(post.link, '_blank');
    } else {
      setSelectedPost(post);
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    // Clear URL params if any
    if (location.search.includes('id=')) {
      navigate('/community', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">공지/소식</h1>
          <p className="text-gray-400">연합회의 공지사항과 주요 소식을 알려드립니다.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">전체 게시글 ({filteredPosts.length})</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="제목 또는 분류 검색" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm w-full md:w-80 transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-bold border-t border-gray-200">
                <tr>
                  <th className="py-4 px-4 text-center w-16">No.</th>
                  <th className="py-4 px-4 text-center w-24">분류</th>
                  <th className="py-4 px-4">제목</th>
                  <th className="py-4 px-4 text-center w-24 hidden md:table-cell">작성자</th>
                  <th className="py-4 px-4 text-center w-32">작성일</th>
                  {/* Removed View Count Column Header */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post, idx) => (
                  <tr 
                    key={post.id} 
                    onClick={() => handlePostClick(post)}
                    className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-4 text-center text-gray-400">{filteredPosts.length - idx}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        post.category === '공지' ? 'bg-red-50 text-red-600' : 
                        post.category === '행사' ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                            {post.title}
                          </span>
                          {post.imageUrl && (
                            <span className="text-gray-400 flex items-center">
                              <ImageIcon size={14} />
                            </span>
                          )}
                          {post.link && (
                            <span className="text-blue-400 flex items-center">
                              <ExternalLink size={14} />
                            </span>
                          )}
                        </div>
                        <div className="md:hidden flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1"><User size={12}/>{post.author}</span>
                          <span className="flex items-center gap-1"><Calendar size={12}/>{post.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell font-medium">{post.author}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{post.date}</td>
                    {/* Removed View Count Data Cell */}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPosts.length === 0 && (
              <div className="py-32 text-center text-gray-400 flex flex-col items-center gap-3">
                <FileText size={48} className="text-gray-200" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                  selectedPost.category === '공지' ? 'bg-red-50 text-red-600' : 
                  selectedPost.category === '행사' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {selectedPost.category}
                </span>
                <span className="text-gray-400 text-sm">{selectedPost.date}</span>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedPost.title}
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <User size={16} />
                  <span>작성자: {selectedPost.author}</span>
                </div>
                {/* Removed View Count from Modal Detail */}
              </div>

              {selectedPost.imageUrl && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                  <img src={selectedPost.imageUrl} alt="첨부 이미지" className="w-full h-auto object-cover" />
                </div>
              )}

              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap min-h-[200px]">
                {selectedPost.content || "상세 내용이 없습니다."}
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex justify-center">
              <button 
                onClick={closeModal}
                className="px-10 py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
