import { IconName } from "../components/ui/Icon/Icon";

export type SidebarItem = {
  label: string;
  icon: IconName;
  path: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};