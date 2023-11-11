import * as M from './style';

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
export default function ModalError({ showModal, setShowModal }: ModalProps) {
  return (
    <M.Overlay show={showModal}>
      <M.ModalContainer>
        <M.CloseButton onClick={() => setShowModal(false)}>
          <M.CloseIcon />
        </M.CloseButton>
        <M.ModalTitle>
          {' '}
          <M.ModalIconError />
          Selecione um par válido{' '}
        </M.ModalTitle>
      </M.ModalContainer>
    </M.Overlay>
  );
}
