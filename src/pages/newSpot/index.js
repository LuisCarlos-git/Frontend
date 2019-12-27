import React,{ useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';

import './style.css'

export default function New({ history }) {
    const [ thumbnail, setThumbinail ] = useState(null)
    const [ company, setCompany ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ techs, setTechs ] = useState('');

    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault();
        

        const data = new FormData();
        const user_id = localStorage.getItem('user');
        
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        const response = await api.post('/spots', data, { headers: { user_id }})
        console.log(response);
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file"onChange={event => setThumbinail(event.target.files[0])}/>
                <img src={camera}alt="select image"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                type="text"
                id="company"
                placeholder="Nome da sua emopresa..."
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS *</label>
            <input
                id="techs"
                placeholder="Usam quais tecnologias ?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor da diaria *</label>
            <input
                
                id="price"
                placeholder="Preço da diaria..."
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button className="btn" type="submit">Cadastrar</button>
        </form>
    );
}