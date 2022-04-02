import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Package.css";
import axiosObj from '../../axiosObj';

const Package = ({ data, token }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        axiosObj.post('/orders', JSON.stringify({ package_id: id }), { headers: { Authorization: `Bearer ${token}` } })
            .then(({data}) => {
                const order = data.data;
                navigate(`/orders/${order.id}`);

            })
            .catch(err => console.log(err))
    }
    return (
        <div className="col-4 card mb-1" onClick={() => handleClick(data.id)}>
            <div className="position-relative d-flex flex-column align-items-center m-1 p-3">
                {data.tags ? <div className="tag">Popular</div> : null}
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