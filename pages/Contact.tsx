import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '일반문의',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
    setFormData({ name: '', phone: '', email: '', category: '일반문의', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">상담 및 문의</h1>
        <p className="text-gray-400">궁금하신 점을 남겨주시면 친절하게 안내해 드리겠습니다.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">연락처 안내</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">방문상담</h3>
                  <p className="text-gray-600">경기도 용인시 기흥구 중부대로 358-1, 3층</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">이메일</h3>
                  <p className="text-gray-600">ygf2024@naver.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">운영시간</h3>
                  <p className="text-gray-600">평일 09:00 - 18:00<br/>(점심시간 12:00 - 13:00)</p>
                  <p className="text-gray-400 text-sm mt-1">토/일/공휴일 휴무</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">온라인 문의</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">이름</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:border-primary" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">연락처</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:border-primary" 
                    placeholder="010-0000-0000"
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">이메일</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:border-primary" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">문의 유형</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:border-primary"
                >
                  <option>일반문의</option>
                  <option>회원가입</option>
                  <option>법률상담</option>
                  <option>교육신청</option>
                  <option>기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">내용</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="w-full border rounded-lg p-3 focus:outline-none focus:border-primary" 
                  required
                ></textarea>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="privacy" required className="rounded text-primary focus:ring-primary" />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  <a href="#" className="underline">개인정보 수집 및 이용</a>에 동의합니다.
                </label>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-[#004a7c] transition-colors shadow-lg">
                문의하기
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
