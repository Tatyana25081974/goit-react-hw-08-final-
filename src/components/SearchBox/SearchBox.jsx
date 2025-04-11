import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filter/filterSlice';
import { selectFilter } from '../../redux/filter/filterSelectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.subtitle}>Пошук контакта</h2>

      <label className={css.label}>
        Пошук контактів за імʼям:
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Введіть ім'я"
        />
      </label>
    </div>
  );
}
