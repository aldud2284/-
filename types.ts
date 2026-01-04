export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  category: string;
  views: number;
  content?: string;
  imageUrl?: string;
  link?: string;
}

export interface BusinessItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}

export interface OrganizationMember {
  role: string;
  name: string;
  description?: string;
}