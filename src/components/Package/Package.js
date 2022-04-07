import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Package.css";

const Package = ({ data }) => {
    const navigate = useNavigate();
    

    const handleClick = (id) => {
        navigate(`/packages/${id}/order`);
    }

    
    return (
        <div className="col-12 col-md-6 col-lg-4 card mb-1" onClick={() => handleClick(data.id)}>
            <div className="position-relative d-flex flex-column align-items-center m-1 p-3">
                {data.tags ? <div className="tag">Popular</div> : null}
                <img src={`http://localhost:8000/storage/packages/${data.image}`} className="pack-img" />
                <h5 className="mt-5">{data.name}</h5>
                <div className="circle text-white">{data.total_credit}</div>
                <div className="pack-detail mt-3">
                    <p>
                        {data.description}
                    </p>
                    <div className="mt-4 text-center">
                        <b>${data.price}</b><br />
                        <span className="text-muted">${data.estimate_price} per class</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Package;