import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ShieldCheck, Building2 } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

// CSS & Icon based Logo Component
const AssociationLogo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <div className={`${className} bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0 relative overflow-hidden border border-white/20`}>
    <Building2 className="text-white relative z-10 drop-shadow-md" size={24} strokeWidth={2} />
    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent/20 rounded-full blur-lg"></div>
  </div>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <AssociationLogo />
          <div className={`flex flex-col ${isScrolled ? 'text-gray-800' : 'text-white drop-shadow-md'}`}>
            <span className="font-bold text-lg leading-tight tracking-tight">(사)용인특례시</span>
            <span className="font-light text-sm tracking-widest group-hover:text-accent transition-colors">공동주택연합회</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-lg transition-colors hover:text-accent ${
                location.pathname === item.path 
                  ? 'text-accent font-bold' 
                  : isScrolled ? 'text-gray-700' : 'text-white/90 drop-shadow-sm'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all hover:bg-accent hover:border-accent hover:text-gray-900 ${
              isScrolled ? 'border-primary text-primary' : 'border-white text-white'
            }`}
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl">
          <nav className="flex flex-col p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-3 px-4 border-b border-gray-100 hover:bg-gray-50 ${
                  location.pathname === item.path ? 'text-primary font-bold' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin" className="py-3 px-4 text-gray-500 text-sm mt-2">
              관리자 로그인
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-700 pb-8">
          {/* Brand & Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <AssociationLogo className="h-12 w-12" />
              <span className="font-bold text-white text-lg">(사)용인특례시<br/>공동주택연합회</span>
            </div>
            <div className="text-sm text-gray-400 space-y-2 mb-4">
              <p>이사장: 한이남</p>
              <p>주소: (17064) 경기도 용인시 기흥구 중부대로 358-1, 3층</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <p>사업자등록번호: 877-82-00629</p>
                <p>법인등록번호: 134521-0006136</p>
              </div>
              <p>이메일: ygf2024@naver.com</p>
              <p className="text-accent font-medium">후원계좌: 농협은행 351-1379-557-93 (예금주: 한이남)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">연합회 소개</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">공지/소식</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>

           {/* Contact */}
           <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0" size={18} />
                <span>경기도 용인시 기흥구<br/>중부대로 358-1, 3층</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={18} />
                <span>ygf2024@naver.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>Copyright &copy; Yongin Special City Apartment Association. All Rights Reserved.</p>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <ShieldCheck size={14} />
            <span>이 사이트는 보안 연결(SSL)을 통해 보호받고 있습니다.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-white">
      <Header />
      <main className="flex-grow pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};