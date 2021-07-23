import './home.css';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tasksBD, setTasksBD] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const saveTask = async () => {
    const task = await axios.post('http://localhost:3333/todo', {
      title,
      description,
      date,
    });
    getTasks();
    alert('Salvo com sucesso');
  };

  const getTasks = async () => {
    const tasks = await axios.get('http://localhost:3333/todo');
    setTasksBD(tasks.data);
  };

  const updateTask = async (id, status) => {
    await axios.put(`http://localhost:3333/todo/${id}`, {
      status: !status,
    });
    getTasks();
  };

  return (
    <div className="container-home">
      <div className="subcontainer-home">
        <div className="container-left">
          <h1>Task List</h1>
          <p>
            Junte-se a mais de meio milhão de usuários e gerencie sua rotina!
          </p>
          <div className="container-form">
            <input
              placeholder="Título"
              onChange={(txt) => setTitle(txt.target.value)}
            />
            <textarea
              placeholder="Descrição"
              onChange={(txt) => setDescription(txt.target.value)}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(txt) => setDate(txt)}
            />
            <button onClick={saveTask} className="btn-save">
              Salvar
            </button>
          </div>
        </div>
        <ul className="container-right">
          {tasksBD.map((item) => {
            const formattedDate = moment(item.date).format('DD/MM/yyy');
            return (
              <li key={item._id}>
                <div>
                  <Link to={`/details/${item._id}`}>
                    <h2
                      style={
                        item.status ? {} : { textDecoration: 'line-through' }
                      }
                    >
                      {item.title}
                    </h2>
                    <h3>{formattedDate}</h3>
                    <h3>{item.description}</h3>
                  </Link>
                </div>
                <button onClick={() => updateTask(item._id, item.status)}>
                  <FaCheck size={22} color="#1a1a1a" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
