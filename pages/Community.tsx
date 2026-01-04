import React, { useState, useEffect } from 'react';
import { NOTICE_DATA } from '../constants.ts';
import { Post } from '../types.ts';
// Added Image as ImageIcon to lucide-react imports
import { Search, ExternalLink, Download, FileText, Calendar, User, Eye, Image as ImageIcon } from 'lucide-react';

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('association_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(NOTICE_DATA);
    }
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <th className="py-4 px-4 text-center w-20 hidden md:table-cell">조회</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post, idx) => (
                  <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
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
                        </div>
                        {/* Summary for mobile */}
                        <div className="md:hidden flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1"><User size={12}/>{post.author}</span>
                          <span className="flex items-center gap-1"><Calendar size={12}/>{post.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell font-medium">{post.author}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{post.date}</td>
                    <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell">{post.views}</td>
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
    </div>
  );
};