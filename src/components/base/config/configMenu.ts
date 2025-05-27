import { Menu } from "../../../common/configMenu";

export interface IMenuTab {
  label: string;
  to: string;
}
export const MenuTabItem: IMenuTab[] = [
  {
    label: "Tools",
    to: Menu.URL_SPEAKING_PAGE,
  },
  {
    label: "Resources",
    to: Menu.URL_UPLOAD_SOURCE_PAGE,
  },
  {
    label: "Scholarship",
    to: Menu.URL_LECTURE_PAGE,
  },
  {
    label: "Class",
    to: Menu.URL_CLASSES_PAGE,
  },
];
