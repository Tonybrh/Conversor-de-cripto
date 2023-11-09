import { useState } from 'react';
import * as H from './style';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from 'src/utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface FormType {
  firstCurrency: string;
  secondCurrency: string;
  firstValue: string;
  secondValue: string;
  firstSelect: string;
  secondSelect: string;
}

export default function Home() {
  const { register, handleSubmit, setValue } = useForm<FormType>();
  const [loading, setLoading] = useState(false);
  const [firstRecentCript, setFirstRecentCript] = useState<string[]>([]);
  const [secondRecentCript, setSecondRecentCript] = useState<string[]>([]);
  const onsubmit: SubmitHandler<FormType> = async data => {
    data.firstCurrency = data.firstCurrency.toUpperCase();
    data.secondCurrency = data.secondCurrency.toUpperCase();
    if (!secondRecentCript.includes(data.secondCurrency)) {
      const updatedSecondRecentCript = [
        data.secondCurrency,
        ...secondRecentCript
      ];
      if (secondRecentCript.length > 4) {
        updatedSecondRecentCript.pop();
      }
      setSecondRecentCript(updatedSecondRecentCript);
    }
    if (!firstRecentCript.includes(data.firstCurrency)) {
      const updatedFirstRecentCript = [data.firstCurrency, ...firstRecentCript];
      if (firstRecentCript.length > 4) {
        updatedFirstRecentCript.pop();
      }
      setFirstRecentCript(updatedFirstRecentCript);
    }
    setLoading(true);

    try {
      await binance(data);
    } catch (error) {
      console.error('Erro na chamada binance:', error);
    } finally {
      setLoading(false);
    }
    if (!loading) {
      setTimeout(() => {
        binance(data);
      }, 30000);
    }
  };
  const binance = async (crypts: FormType) => {
    const crypt = crypts.firstCurrency + crypts.secondCurrency;
    try {
      const response = await api.get('/price', {
        params: {
          symbol: crypt
        }
      });
      const data = response.data.price;
      const secondValueString = data;

      setValue('firstValue', '1');
      setValue('secondValue', secondValueString);
      setLoading(false);
    } catch (error) {
      if (error) {
        toast.error('Selecione um par válido');
      }
      console.log(error);
    }
  };
  const handleFirstOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue('firstCurrency', value);
  };
  const handleSecondOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue('secondCurrency', value);
  };

  return (
    <H.Container>
      <ToastContainer />
      <H.FormContainer onSubmit={handleSubmit(onsubmit)}>
        <H.Title>Convertendo moedas digitais</H.Title>
        <H.CurrencyContainer>
          <H.InputContainer>
            <H.InputLabel>Escolha a moeda desejada</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input type="text" {...register('firstCurrency')} />
              {firstRecentCript.length > 0 && (
                <H.SelectInput
                  {...register('firstSelect')}
                  onChange={handleFirstOption}
                >
                  {firstRecentCript.map((cript, index) => (
                    <H.SelectOption value={cript} key={index}>
                      {cript}
                    </H.SelectOption>
                  ))}
                </H.SelectInput>
              )}
            </H.CurrencyContainer>
            <H.InputLabel>Valor</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input type="text" {...register('firstValue')} />
            </H.CurrencyContainer>
          </H.InputContainer>
          <H.ArrowIcon />
          <H.InputContainer>
            <H.InputLabel>Escolha a moeda desejada</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input type="text" {...register('secondCurrency')} />
              {secondRecentCript.length > 0 && (
                <H.SelectInput
                  {...register('secondSelect')}
                  onChange={handleSecondOption}
                >
                  {secondRecentCript.map((cript, index) => (
                    <H.SelectOption key={index}>{cript}</H.SelectOption>
                  ))}
                </H.SelectInput>
              )}
            </H.CurrencyContainer>
            <H.InputLabel>Valor</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input type="text" {...register('secondValue')} />
            </H.CurrencyContainer>
          </H.InputContainer>
        </H.CurrencyContainer>
        <H.SubmitButton value="Converter" type="submit" />
      </H.FormContainer>
    </H.Container>
  );
}
