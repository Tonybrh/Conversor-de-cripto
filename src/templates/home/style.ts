import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const CurrencyContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-around;
`;
export const FormContainer = styled.form`
  background-color: #333333;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 350px;
  gap: 10px;
  position: relative;
  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;
export const Title = styled.h1`
  color: #f0b90b;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  gap: 10px;
`;
export const InputLabel = styled.label`
  color: white;
  text-align: center;
`;
export const Input = styled.input`
  border: 0;
  height: 20px;
  border-radius: 5px;
  width: 90%;
  padding-left: 10px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    display: none;
  }
`;
export const ArrowIcon = styled(BsArrowRight)`
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 145px;
  color: white;
`;
export const SelectInput = styled.select`
  width: 100%;
  border: none; /* Cor de fundo */ /* Cor do texto */
  border-radius: 5px; /* Cantos arredondados */
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
export const SelectOption = styled.option`
  /* Cor de fundo das opções */
  color: #f0b90b; /* Cor do texto das opções */
  cursor: pointer;
`;
export const SubmitButton = styled.input`
  background-color: #000; /* Cor de fundo */
  color: #f0b90b; /* Cor do texto */
  border: 0;
  font-size: 18px;
  width: 30%;
  height: 30px;
  align-self: center;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;
