import React, { useState } from 'react';
import './Createpost.css';
import Header from '../header/Header';

function Createpost() {
    
    return (
        <div className='Createpost'>
            <Header/>
            <div className="createpost__body">
            This is create post:::
            </div>
        </div>
    )
}

export default Createpost;

{/* {src && <ReactCrop src={URL.createObjectURL(src)}  crop={crop} onChange={newCrop => setCrop(newCrop)} />}
<div className="CreateHeader">
    <input type="file" value={src} accept='image/*' onChange={e=>selectFile(e.target.files[0])}/>
    {crop && <img src={URL.createObjectURL(crop)} alt="img" />}
    <textarea />
</div> */}