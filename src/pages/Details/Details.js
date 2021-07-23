import './details.css';
import { FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getTask();
  }, []);

  const notify = () =>
    toast('Atualizado com sucesso!', {
      type: 'success',
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
    });

  const getTask = async () => {
    const task = await axios.get(
      `https://task-list-back.herokuapp.com/todo/${id}`
    );
    setTitle(task.data.title);
    setDescription(task.data.description);
    const formattedDate = new Date(task.data.date);
    setDate(formattedDate);
  };

  const removeTask = async () => {
    await axios.delete(`https://task-list-back.herokuapp.com/todo/${id}`);
    alert('usuário deletado com sucesso!');
    history.push('/');
  };

  const updateTask = async () => {
    await axios.put(`https://task-list-back.herokuapp.com/todo/${id}`, {
      title,
      description,
      date,
    });
    history.push('/');
    notify();
  };

  return (
    <div className="container-details">
      <ToastContainer />
      <div className="subcontainer-details">
        <div className="container-header">
          <Link to="/">
            <FaArrowLeft />
            <span>Voltar</span>
          </Link>
        </div>
        <input
          value={title}
          placeholder="Título"
          onChange={(txt) => setTitle(txt.target.value)}
        />
        <textarea
          value={description}
          placeholder="Descrição"
          onChange={(txt) => setDescription(txt.target.value)}
        />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(txt) => setDate(txt)}
        />
        <div className="container-buttons">
          <button onClick={updateTask}>Salvar</button>
          <button onClick={removeTask}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
