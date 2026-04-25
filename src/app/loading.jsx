import React from 'react';
import logo from './../../public/elogoBlack.png'
import Image from 'next/image';
const loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Image className='animate-pulse' src={logo} alt='elara-bangladesh' height={300} width={300}></Image>
        </div>
    );
};

export default loading;