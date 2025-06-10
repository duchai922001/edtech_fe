import { Modal } from "antd";
interface ModalCustomProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
}
const ModalCustom = ({
  isOpen,
  onClose,
  onOk,
  title,
  children,
}: ModalCustomProps) => {
  return (
    <Modal title={title} onCancel={onClose} onOk={onOk} open={isOpen}>
      {children}
    </Modal>
  );
};

export default ModalCustom;
