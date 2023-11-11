import { useState } from 'react';
import * as H from './style';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from 'src/utils/api';
import 'react-toastify/dist/ReactToastify.css';
import ModalError from 'src/components/modalError';

// Crie um schema Yup correspondente à sua interface FormType
const schema = yup.object().shape({
  firstCurrency: yup
    .string()
    .transform((value, originalValue) => {
      // Remova todos os espaços em branco da string original
      if (originalValue) {
        return originalValue.replace(/\s/g, '');
      }
      return value;
    })
    .trim()
    .required('Preencha'),
  secondCurrency: yup
    .string()
    .transform((value, originalValue) => {
      // Remova todos os espaços em branco da string original
      if (originalValue) {
        return originalValue.replace(/\s/g, '');
      }
      return value;
    })
    .trim()
    .required('Preencha '),
  firstSelect: yup.string().trim(),
  secondSelect: yup.string().trim()
});
type FormType = yup.InferType<typeof schema>;
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormType>({
    resolver: yupResolver(schema)
  });
  const [firstRecentCript, setFirstRecentCript] = useState<string[]>([]);
  const [secondRecentCript, setSecondRecentCript] = useState<string[]>([]);
  const [currencyFirstCript, setCurrencyFirstCript] = useState('');
  const [currencySecondCript, setCurrencySecondCript] = useState('');
  const [firstValueCript, setFirstValueCript] = useState(0);
  const [secondValueCript, setSecondValueCript] = useState(0);
  const onSubmit: SubmitHandler<FormType> = async data => {
    data.firstCurrency = data.firstCurrency.toUpperCase();
    data.secondCurrency = data.secondCurrency.toUpperCase();

    setCurrencyFirstCript(data.firstCurrency);
    setCurrencySecondCript(data.secondCurrency);
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

    try {
      const response = await binance(data);
      if (response === 'ok') {
        setTimeout(() => {
          binance(data);
        }, 30000);
      } else {
        console.error('[ERROR] Erro na segunda chamada');
      }
    } catch (error) {
      console.error('Erro na chamada binance:', error);
    }
  };
  const binance = async (crypts: FormType) => {
    const crypt = crypts.firstCurrency + crypts.secondCurrency;
    console.log(crypts);

    try {
      const response = await api.get('/price', {
        params: {
          symbol: crypt
        }
      });
      const data = response.data.price;
      const secondValueString = data;
      const fixedNumber = parseFloat(secondValueString);
      fixedNumber.toFixed(2);
      setSecondValueCript(fixedNumber);
      setFirstValueCript(1);
      return 'ok';
    } catch (error) {
      if (error) {
        setShowModal(true);
        return error;
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
      <ModalError setShowModal={setShowModal} showModal={showModal} />
      <H.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <H.Title>Convertendo moedas digitais</H.Title>
        <H.CurrencyContainer>
          <H.InputContainer>
            <H.InputLabel>Escolha a moeda desejada</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input
                placeholder={errors?.firstCurrency?.message}
                type="text"
                {...register('firstCurrency')}
              />

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
            <H.CurrencyContainer>
              <H.ValueSpan>
                {firstValueCript}
                {currencyFirstCript}
              </H.ValueSpan>
            </H.CurrencyContainer>
          </H.InputContainer>
          <H.ArrowIcon />
          <H.InputContainer>
            <H.InputLabel>Escolha a moeda desejada</H.InputLabel>
            <H.CurrencyContainer>
              <H.Input
                type="text"
                {...register('secondCurrency')}
                placeholder={errors?.secondCurrency?.message}
              />

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
            <H.CurrencyContainer>
              <H.ValueSpan>
                {secondValueCript}
                {currencySecondCript}
              </H.ValueSpan>
            </H.CurrencyContainer>
          </H.InputContainer>
        </H.CurrencyContainer>
        <H.SubmitButton value="Converter" type="submit" />
      </H.FormContainer>
    </H.Container>
  );
}
