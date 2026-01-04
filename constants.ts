import { NavItem, Post, GalleryItem, OrganizationMember, BusinessItem } from './types.ts';

export const NAV_ITEMS: NavItem[] = [
  { label: '연합회 소개', path: '/about' },
  { label: '공지/소식', path: '/community' },
];

export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    title: '함께 사는 즐거움, 함께 만드는 행복',
    subtitle: '더 나은 공동체 문화를 선도하는 중심,\n(사)용인특례시 공동주택연합회입니다.',
  },
  {
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1920&q=80',
    title: '입주민과 함께, 행복한 용인',
    subtitle: '관(官)과 시민을 잇는 소통 창구로서\n최선을 다하겠습니다.',
  },
];

export const BUSINESS_DATA: BusinessItem[] = [
  {
    id: 1,
    title: '정책 제안 및 제도 개선',
    description: '공동주택 관리 관련 불합리한 법규 및 제도의 개선을 위해 지자체 및 정부에 적극적으로 정책을 제안합니다.',
    iconName: 'Scale',
  },
  {
    id: 2,
    title: '공동주택 관리 지원',
    description: '관리비 절감, 회계 투명성 확보, 시설물 유지보수 등 효율적인 공동주택 관리를 위한 자문과 지원을 제공합니다.',
    iconName: 'Building',
  },
  {
    id: 3,
    title: '입주민 역량 강화 교육',
    description: '입주자대표회의 구성원 및 입주민을 대상으로 공동주택 관리에 필요한 실무 교육과 소양 교육을 실시합니다.',
    iconName: 'GraduationCap',
  },
  {
    id: 4,
    title: '공동체 활성화 프로그램',
    description: '층간소음 줄이기 캠페인, 나눔 장터 등 입주민이 함께 참여하고 소통할 수 있는 다양한 프로그램을 운영합니다.',
    iconName: 'Users',
  },
];

export const NOTICE_DATA: Post[] = [
  { 
    id: 3, 
    category: '공지', 
    title: '2025년 12월 28일 용인특례시 공동주택연합회 임시총회 개최 [정관 변경 건]', 
    date: '2025-12-28', 
    author: '사무국', 
    views: 15 
  },
  { 
    id: 2, 
    category: '행사', 
    title: '2025년 12월 17일 송년회 행사 시상식', 
    date: '2025-12-17', 
    author: '사무국', 
    views: 42 
  },
  { 
    id: 1, 
    category: '소식', 
    title: '2025년 9월 용인시 공동주택연합회 개소식', 
    date: '2025-09-01', 
    author: '관리자', 
    views: 128,
    link: 'https://www.hapt.co.kr/news/articleView.html?idxno=166537'
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  { id: 4, title: '2025 송년회 시상식', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80', date: '2025-12-17' },
  { id: 1, title: '2024 송년의 밤', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80', date: '2024-12-20' },
  { id: 2, title: '봄맞이 대청소 캠페인', imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80', date: '2024-03-15' },
  { id: 3, title: '안전관리 교육 현장', imageUrl: 'https://images.unsplash.com/photo-1577896333050-59852b47a213?auto=format&fit=crop&w=400&q=80', date: '2024-04-05' },
];

export const ORGANIZATION_DATA: OrganizationMember[] = [
  { role: '이사장', name: '한이남', description: '현) (사)용인특례시 공동주택연합회 이사장' },
  { role: '수석부회장', name: '-', description: '' },
  { role: '감사', name: '-', description: '' },
];