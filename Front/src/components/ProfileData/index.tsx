import React from 'react';
import './style.css'
import Icon from '/src/assets/Icon.png'

const ProfileData: React.FC = () => {
    return (
        <div className='containerProfile'>
            <div className='userContent'>
                <img src={Icon} alt="" />
                <div className='contentProfile'>
                    <h4>Ziriguidunho Pipocante</h4>
                    <li>apê 82 </li>
                    <li>user@mail.com</li>
                    <li>00 publicações</li></div>
            </div>
            <div className='buttonProfile'>
                <button className='buttonEdit' type="button">editar perfil</button>
            </div>
        </div>
    );
};

export default ProfileData;