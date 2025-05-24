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
    to: "/resources",
  },
  {
    label: "Scholarship",
    to: "/scholarship",
  },
  {
    label: "Class",
    to: "/class",
  },
];
