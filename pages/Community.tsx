import React from 'react';
import { NOTICE_DATA } from '../constants.ts';
import { Search, ExternalLink, Download } from 'lucide-react';

export const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header - Matched with About page style */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">공지/소식</h1>
          <p className="text-gray-400">협회의 공지사항과 주요 소식을 알려드립니다.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">전체 게시글</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm w-full md:w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-t border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-center w-16">No.</th>
                  <th className="py-3 px-4 text-center w-24">분류</th>
                  <th className="py-3 px-4">제목</th>
                  <th className="py-3 px-4 text-center w-24 hidden md:table-cell">작성자</th>
                  <th className="py-3 px-4 text-center w-32">작성일</th>
                  <th className="py-3 px-4 text-center w-20 hidden md:table-cell">조회</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {NOTICE_DATA.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-center text-gray-500">{post.id}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.category === '공지' ? 'bg-red-50 text-red-600' : 
                        post.category === '행사' ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {post.link ? (
                        <a 
                          href={post.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline flex items-center gap-1 group"
                        >
                          {post.title}
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-primary" />
                        </a>
                      ) : (
                        <span className="cursor-pointer hover:text-primary hover:underline">
                          {post.title}
                          {post.id % 2 === 0 && <Download size={14} className="inline ml-2 text-gray-400" />}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-500 hidden md:table-cell">{post.author}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{post.date}</td>
                    <td className="py-3 px-4 text-center text-gray-500 hidden md:table-cell">{post.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};