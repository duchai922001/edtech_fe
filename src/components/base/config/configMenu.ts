import { Menu } from "../../../common/configMenu";

export interface IMenuTab {
  label: string;
  to: string;
}
export const MenuTabItem: IMenuTab[] = [
  {
    label: "Tools",
    to: "/tools",
  },
  {
    label: "Resources",
    to: Menu.URL_UPLOAD_SOURCE_PAGE,
  },
  {
    label: "Scholarship",
    to: "/scholarship",
  },
  {
    label: "Class",
    to: Menu.URL_CLASSES_PAGE,
  },
];
