export type SidebarItem = {
  label: string;
  icon: string;
  path: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};