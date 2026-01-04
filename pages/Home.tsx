import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Bell, Calendar } from 'lucide-react';
import { HERO_SLIDES, NOTICE_DATA } from '../constants.ts';
import { Post } from '../types.ts';

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    
    // Load latest posts
    const savedPosts = localStorage.getItem('association_posts');
    if (savedPosts) {
      setLatestPosts(JSON.parse(savedPosts).slice(0, 4));
    } else {
      setLatestPosts(NOTICE_DATA.slice(0, 4));
    }

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider */}
      <section className="relative h-[600px] md:h-[750px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover scale-105 animate-[zoom_20s_infinite]"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in-up tracking-tight break-keep">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-10 font-light drop-shadow-lg max-w-3xl animate-fade-in-up delay-100 break-keep whitespace-pre-line leading-relaxed opacity-90">
                {slide.subtitle}
              </p>
              <Link 
                to="/about"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-2xl animate-fade-in-up delay-200 flex items-center gap-2"
              >
                연합회 자세히 보기 <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ))}
        
        <button onClick={prevSlide} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all border border-white/10 hidden md:block">
          <ChevronLeft size={36} />
        </button>
        <button onClick={nextSlide} className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all border border-white/10 hidden md:block">
          <ChevronRight size={36} />
        </button>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-4 h-4 rounded-full transition-all border-2 border-white/50 ${idx === currentSlide ? 'bg-accent border-accent w-12' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              
              {/* Left: Section Info */}
              <div className="md:w-1/3">
                <div className="inline-flex p-3 bg-blue-50 text-primary rounded-2xl mb-4">
                  <Bell size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">협회 공지 및<br/>주요 소식</h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  용인특례시 공동주택의 밝은 미래를 위한<br/>
                  연합회의 다양한 활동과 공지사항을 확인하세요.
                </p>
                <Link to="/community" className="inline-flex items-center gap-2 text-primary font-bold group">
                  전체 게시판 이동 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: Latest Posts */}
              <div className="md:w-2/3 w-full">
                <div className="grid grid-cols-1 gap-4">
                  {latestPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      to={`/community`} 
                      className="bg-gray-50 hover:bg-white hover:shadow-xl hover:border-blue-100 border border-transparent p-6 rounded-2xl transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4 overflow-hidden">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          post.category === '공지' ? 'bg-red-100 text-red-600' : 
                          post.category === '행사' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Bell size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">{post.category}</span>
                          <span className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors truncate max-w-xs md:max-w-md">
                            {post.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium shrink-0">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                    </Link>
                  ))}
                  {latestPosts.length === 0 && (
                    <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed">
                      등록된 소식이 없습니다.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">여러분의 참여가 더 나은 주거 환경을 만듭니다</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            (사)용인특례시 공동주택연합회는 입주민의 권익을 대변하고,<br className="hidden md:block"/> 
            효율적인 공동주택 관리 문화를 정착시키기 위해 오늘도 최선을 다하고 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:ygf2024@naver.com" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-2xl transform hover:-translate-y-1">
              협회에 문의하기
            </a>
            <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-xl transition-all border border-white/20 backdrop-blur-md">
              연합회 비전 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};