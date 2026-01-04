import React from 'react';
import { Building, Scale, GraduationCap, Users, CheckCircle } from 'lucide-react';
import { BUSINESS_DATA } from '../constants';

const icons: Record<string, React.ReactNode> = {
  Building: <Building size={32} />,
  Scale: <Scale size={32} />,
  GraduationCap: <GraduationCap size={32} />,
  Users: <Users size={32} />,
};

export const Business: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-[#004a7c] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">주요 사업 안내</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            전문적인 지원과 교육을 통해<br />
            입주민의 삶의 질을 높이는 다양한 사업을 추진하고 있습니다.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BUSINESS_DATA.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {icons[item.iconName]}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {item.description}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                    <CheckCircle size={16} className="text-secondary shrink-0" />
                    <span>세부 사업 내용 상세 설명 {i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">업무 지원 절차</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gray-200 -z-0 -mt-8"></div>
            
            {[
              { step: '01', title: '신청 접수', desc: '전화 또는 온라인 신청' },
              { step: '02', title: '현황 분석', desc: '전문가 현장 방문' },
              { step: '03', title: '솔루션 제공', desc: '맞춤형 컨설팅' },
              { step: '04', title: '사후 관리', desc: '이행 점검 및 피드백' },
            ].map((proc, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md text-center relative z-10 w-full md:w-64">
                <div className="text-4xl font-black text-gray-100 mb-4">{proc.step}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{proc.title}</h3>
                <p className="text-gray-500 text-sm">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
