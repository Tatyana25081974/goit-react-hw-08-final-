import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, setNumberFilter } from '../../redux/filters/slice';
import { selectFilterName, selectFilterNumber } from '../../redux/filters/selectors';

import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const name = useSelector(selectFilterName);
  const number = useSelector(selectFilterNumber);

  const handleChangeName = (event) => {
    dispatch(setNameFilter(event.target.value)); // міняємо тільки ім'я
  };

  const handleChangeNumber = (event) => {
    dispatch(setNumberFilter(event.target.value)); // міняємо тільки номер
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.subtitle}>Пошук контактів</h2>

      <div className={css.inputsWrapper}>
        <label className={css.label}>
          Ім'я:
          <input
            className={css.input}
            type="text"
            value={name}
            onChange={handleChangeName}
            placeholder="Введіть ім'я"
          />
        </label>

        <label className={css.label}>
          Номер телефону:
          <input
            className={css.input}
            type="text"
            value={number}
            onChange={handleChangeNumber}
            placeholder="Введіть номер телефону"
          />
        </label>
      </div>
    </div>
  );
}
