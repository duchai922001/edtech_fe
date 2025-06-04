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
    label: "Set FlashCard",
    to: Menu.URL_CREATE_FLASHCARD_PAGE,
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
