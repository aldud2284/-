import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, NOTICE_DATA } from '../constants.ts';

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md animate-fade-in-up break-keep">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light drop-shadow-sm max-w-2xl animate-fade-in-up delay-100 break-keep whitespace-pre-line leading-relaxed">
                {slide.subtitle}
              </p>
              <Link 
                to="/about"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg animate-fade-in-up delay-200"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
        
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronRight size={32} />
        </button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-accent w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-4">공지/소식</h2>
                <Link to="/community" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm">
                  더보기 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {NOTICE_DATA.slice(0, 4).map((post) => (
                  <Link key={post.id} to={`/community`} className="flex items-center justify-between group py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className={`text-xs px-2 py-1 rounded font-medium shrink-0 ${
                        post.category === '공지' ? 'bg-red-50 text-red-600' : 
                        post.category === '행사' ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-gray-700 font-medium truncate group-hover:text-primary transition-colors">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm shrink-0">{post.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">여러분의 참여가 더 나은 주거 환경을 만듭니다</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            공동주택 관리의 전문성 확보와 입주민 권익 보호,<br />
            (사)용인특례시 공동주택연합회가 앞장서겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:ygf2024@naver.com" className="bg-accent hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1">
              이메일 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};