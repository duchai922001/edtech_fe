import { Menu } from "../../../common/configMenu";

export interface IMenuTab {
  label: string;
  to: string;
}
export const MenuTabItem: IMenuTab[] = [
  {
    label: "Flashcards",
    to: Menu.URL_FLASH_CARD_PAGE,
  },
  {
    label: "Resources",
    to: Menu.URL_CLASSES_PAGE,
  },
  {
    label: "Scholarship",
    to: Menu.URL_SCHOLARSHIP,
  },
  {
    label: "Membership",
    to: Menu.URL_MEMBERSHIP,
  },
];
