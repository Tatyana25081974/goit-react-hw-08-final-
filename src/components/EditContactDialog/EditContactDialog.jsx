import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import { toast } from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function EditContactDialog({ open, onClose, id, initialName, initialNumber }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  const handleSave = async () => {
    try {
      await dispatch(updateContact({ id, updatedData: { name, number } })).unwrap();
      toast.success('Контакт успішно оновлено! 🎉');
      onClose();
    } catch  {
      toast.error('Помилка при оновленні контакту.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редагувати контакт</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Ім'я"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Номер телефону"
          type="text"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Скасувати
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
