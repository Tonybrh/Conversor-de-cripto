import styled from 'styled-components';
import { BiSolidError } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
interface OverlayProps {
  show: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  color: white;
`;
export const ModalContainer = styled.div`
  background-color: #000;
  width: 40%;
  height: 300px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  position: absolute;
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;
export const ModalTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: c;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
export const ModalIconError = styled(BiSolidError)`
  color: white;
  width: 90px;
  height: 90px;
`;
export const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  position: absolute;
  left: 15px;
  top: 30px;
  cursor: pointer;
`;
export const CloseIcon = styled(AiOutlineClose)`
  width: 30px;
  height: 30px;
  color: #fff;
`;
