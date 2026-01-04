import React, { useState } from 'react';
import { Target, Users, Heart } from 'lucide-react';
import chairmanPhoto from '../assets/chairman.jpg';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intro' | 'purpose' | 'org' | 'location'>('intro');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">연합회 소개</h1>
          <p className="text-gray-400">투명하고 살기 좋은 공동주택 문화를 만들어갑니다.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {[
            { id: 'intro', label: '이사장 인사말' },
            { id: 'purpose', label: '설립목적 & 비전' },
            { id: 'org', label: '연혁 & 조직도' },
            { id: 'location', label: '오시는 길' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex-1 sm:flex-none whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        {activeTab === 'intro' && (
          <div className="animate-fade-in bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="w-full md:w-1/3 shrink-0">
                      <div className="aspect-[3/4] rounded-lg shadow-inner overflow-hidden">
                         <img src={chairmanPhoto} alt="이사장 한이남" className="w-full h-full object-cover" />
                      </div>
                   </div>
                   <div className="flex-1">
                      <h2 className="text-3xl font-bold text-primary mb-6">입주민과 함께, 행복한 용인을 만들어 가겠습니다.</h2>
                      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                        <p>
                           안녕하십니까?<br/>
                           <strong>(사)용인특례시 공동주택연합회</strong>를 찾아주신 여러분을 진심으로 환영합니다.
                        </p>
                        <p>
                           우리 용인특례시는 인구 110만 명에 육박하는 거대 도시로 성장하였으며, 대다수의 시민이 공동주택에 거주하고 있습니다. 이에 발맞춰 저희 연합회는 시민들의 쾌적한 주거 생활을 지원하고 위상을 높이기 위해, 2024년 3월 비영리 사단법인으로 새롭게 출범하여 기존 사업들을 더욱 체계적으로 이어가고 있습니다.
                        </p>
                        <ul className="list-none space-y-4 pl-0">
                           <li className="flex gap-3">
                              <span className="text-primary font-bold shrink-0">첫째,</span>
                              <span><strong>소통과 화합의 가교가 되겠습니다.</strong> 우리는 관(官)과 시민을 잇는 소통 창구로서, 쾌적한 주거 환경을 위한 기반 시설과 공동 이용 시설 확충에 앞장서겠습니다.</span>
                           </li>
                           <li className="flex gap-3">
                              <span className="text-primary font-bold shrink-0">둘째,</span>
                              <span><strong>합리적인 대안을 제시하는 정책 파트너가 되겠습니다.</strong> 공동주택 대표자들과 머리를 맞대고 시민의 목소리를 취합하여, 보다 효과적이고 합리적인 관리 방안을 도출하겠습니다.</span>
                           </li>
                           <li className="flex gap-3">
                              <span className="text-primary font-bold shrink-0">셋째,</span>
                              <span><strong>선진 주거 문화를 이끌겠습니다.</strong> 층간소음 등 이웃 간의 갈등을 해소하고, 환경 지킴이 활동과 봉사 활동을 통해 선진 문화 정착에 일조하겠습니다.</span>
                           </li>
                        </ul>
                        <p className="mt-4">
                           "함께 행복한 세상을 만들기 위해 노력하자"는 슬로건처럼, 생활의 중심에서 활동하는 비영리단체로서의 본분을 잃지 않고 삶의 질을 향상시키는 봉사단체로서 여러분과 변함없이 함께 나아가겠습니다.
                        </p>
                        <p>감사합니다.</p>
                      </div>
                      <div className="mt-12 text-right">
                        <p className="font-bold text-gray-800 text-sm">2025년 12월</p>
                        <p className="font-bold text-gray-800">(사)용인특례시 공동주택연합회 이사장</p>
                        <p className="text-2xl font-serif mt-2 text-primary">한 이 남</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'purpose' && (
          <div className="space-y-12 animate-fade-in">
             {/* Purpose */}
             <div className="bg-white p-12 rounded-2xl shadow-sm border-l-8 border-primary flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0">
                   <Target size={64} className="text-primary" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-gray-800 mb-3">설립 목적</h3>
                   <p className="text-xl text-gray-600 leading-relaxed font-medium">
                      공동주택 입주민이 겪는 공동체의 문제를 주체적으로 해결하고,<br className="hidden md:block" /> 
                      이웃과 더불어 사는 건강한 단체 활동을 영위함을 목적으로 합니다.
                   </p>
                </div>
             </div>

             {/* Vision */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { icon: Users, title: '지역 현안 해결', desc: '지역 사회와 공동주택의 주요 문제를 함께 고민하고 해결합니다.' },
                   { icon: Heart, title: '문화·복지 선도', desc: '지역민의 삶의 질 향상을 위한 복지 및 문화 활동을 주도합니다.' },
                   { icon: Target, title: '나눔의 봉사 실천', desc: '밝고 건강한 사회를 지향하며 이웃 사랑과 봉사를 실천합니다.' },
                ].map((item, idx) => (
                   <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <item.icon size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-500 break-keep">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'org' && (
          <div className="space-y-12 animate-fade-in">
             {/* History */}
             <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold mb-10 text-center">연혁</h2>
                <div className="relative border-l-2 border-gray-200 ml-4 md:ml-1/2 space-y-12">
                   {[
                      { date: '2025. 12', desc: '사업자등록 정정 신고 (세금계산서 발행 가능)' },
                      { date: '2025. 09', desc: '사무실 소재지 이전 (용인시 기흥구 중부대로 358-1, 3층)' },
                      { date: '2024. 03', desc: '사단법인 용인시 공동주택연합회 법인 설립' },
                      { date: '2018. 12', desc: '용인시 공동주택 총 연합회 발족' },
                   ].map((item, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-0">
                         {/* Dot */}
                         <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm md:left-1/2 md:-ml-[9px]"></div>
                         
                         <div className={`flex flex-col md:flex-row gap-2 md:gap-16 ${idx % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                            <div className="md:w-1/2 font-bold text-xl text-primary">{item.date}</div>
                            <div className="md:w-1/2 text-gray-700 font-medium">{item.desc}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Organization Chart */}
             <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">조직도</h2>
                
                <div className="min-w-[800px] flex flex-col items-center">
                   {/* Top: Chairman */}
                   <div className="mb-12">
                      <div className="bg-primary text-white w-64 py-4 rounded-lg text-center shadow-lg">
                         <div className="text-sm opacity-80 mb-1">이사장 (대표이사)</div>
                         <div className="font-bold text-xl">한 이 남</div>
                      </div>
                   </div>

                   {/* Level 2: Directors / Advisors / Senior VP / Auditor */}
                   <div className="flex justify-center gap-8 mb-12 w-full relative">
                      {/* Connection Lines */}
                      <div className="absolute top-0 left-1/2 -ml-px w-px h-8 bg-gray-300 -mt-12"></div>
                      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gray-300 -mt-4"></div>
                      
                      {/* Left Group */}
                      <div className="flex flex-col gap-4">
                         <div className="bg-secondary text-white px-6 py-2 rounded text-center font-bold text-sm">이사회</div>
                         <div className="bg-[#8bc34a] text-white px-6 py-2 rounded text-center font-bold text-sm">고문단</div>
                         <div className="bg-[#8bc34a] text-white px-6 py-2 rounded text-center font-bold text-sm">자문단</div>
                      </div>

                      {/* Center: Senior VP */}
                      <div className="flex flex-col items-center relative">
                         <div className="absolute top-0 w-px h-8 bg-gray-300 -mt-8"></div>
                         <div className="bg-[#00bcd4] text-white w-48 py-3 rounded-lg text-center font-bold shadow-md z-10">
                            수석부회장
                         </div>
                         <div className="w-px h-8 bg-gray-300"></div>
                         
                         {/* Secretariat */}
                         <div className="bg-[#0277bd] text-white w-56 py-4 rounded-lg text-center shadow-md z-10">
                            <div className="font-bold text-lg">사무국</div>
                            <div className="text-xs opacity-90">(대외협력본부)</div>
                         </div>
                      </div>

                      {/* Right: Auditor */}
                      <div className="flex flex-col relative">
                         <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 -mt-8"></div>
                         <div className="bg-gray-400 text-white w-32 py-3 rounded-lg text-center font-bold shadow-md">
                            감사
                         </div>
                      </div>
                   </div>

                   {/* Level 3: Committees */}
                   <div className="w-full flex justify-between gap-4 mb-12 relative px-8">
                      <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 -mt-4"></div>
                      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gray-300 mt-4"></div>

                      {['소통·정보위원회', '대민·봉사위원회', '공동주택 운영위원회', '법제 위원회'].map((comm, idx) => (
                         <div key={idx} className="flex flex-col items-center flex-1 relative mt-4">
                             <div className="w-px h-4 bg-gray-300 mb-2"></div>
                             <div className="bg-orange-300 text-white w-full py-3 rounded text-center font-bold text-sm shadow-sm">
                                {comm}
                             </div>
                         </div>
                      ))}
                   </div>

                   {/* Level 4: Branches */}
                   <div className="w-full flex justify-center gap-12 relative">
                      <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 -mt-8"></div>
                      <div className="absolute top-0 left-[25%] right-[25%] h-px bg-gray-300 mt-0"></div>

                      {[
                         { name: '수지구 지회', count: '224단지' },
                         { name: '기흥구 지회', count: '259단지' },
                         { name: '처인구 지회', count: '128단지' }
                      ].map((branch, idx) => (
                         <div key={idx} className="flex flex-col items-center relative mt-4 w-40">
                             <div className="w-px h-4 bg-gray-300 mb-0 -mt-4"></div>
                             <div className="bg-orange-200 text-gray-800 w-full py-2 rounded-t text-center font-bold shadow-sm">
                                {branch.name}
                             </div>
                             <div className="bg-orange-100 text-gray-800 w-full py-1 rounded-b text-center text-sm font-medium">
                                {branch.count}
                             </div>
                         </div>
                      ))}
                   </div>

                </div>
             </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
             <h2 className="text-3xl font-bold mb-8">오시는 길</h2>
             
             {/* Map Placeholder */}
             <div className="bg-gray-200 w-full h-[400px] rounded-xl mb-8 flex items-center justify-center relative overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80" alt="Map Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
               <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl text-center">
                 <p className="text-gray-500 mb-2">지도 API 연동 영역</p>
                 <p className="font-bold text-lg">경기도 용인시 기흥구 중부대로 358-1, 3층</p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <h3 className="font-bold text-xl text-primary">주소</h3>
                 <p className="text-gray-600">(17064) 경기도 용인시 기흥구 중부대로 358-1, 3층</p>
               </div>
               <div className="space-y-4">
                 <h3 className="font-bold text-xl text-primary">연락처</h3>
                 <ul className="text-gray-600 list-none space-y-2">
                   <li><span className="font-medium w-20 inline-block">이메일:</span> ygf2024@naver.com</li>
                 </ul>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};