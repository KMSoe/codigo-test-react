import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosObj from '../../axiosObj';

const Order = ({ token }) => {
    const { id } = useParams();
    let [code, setCode] = useState('');
    let [discount, setDiscount] = useState(0);
    let [, setCodeValid] = useState(false);
    let [hasPromo] = useState(false);
    let [order, setOrder] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axiosObj.get(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                setOrder(data.data);
            })
            .catch(err => console.log(err))
    }, [id])

    const handleChange = (e) => {
        setCode(e.target.value);
        axiosObj.get(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                if (data.id) {
                    setCodeValid(true);
                    setDiscount(data.discount);
                }
            })
            .catch(err => console.log(err))
    }

    const submitPromoCode = () => {
        let updatedTotal = order.grant_total - ((order.package.price * discount) / 100);
        axiosObj.patch(`/orders/${id}`, JSON.stringify({ grant_total: updatedTotal }), { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                setOrder(data.data);
            })
            .catch(err => console.log(err))
    }

    const backToHome = () => {
        navigate('/packages');
    }

    const payOrder = () => {
        axiosObj.post(`/transactions`, JSON.stringify({ order_id: order.id }), { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                console.log("success");
                navigate("/packages");
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="container">
            <div className="card">
                <div className="card-header">
                    <h6>{"Class Pack Purchase Preview".toUpperCase()}</h6>
                </div>
                <div className="card-body px-5 py-3">
                    <div className="my-4">
                        <b>You have selected:</b>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <div className="d-flex justify-content-start">
                                <div className="circle text-white me-3">{order.package.total_credit}</div>
                                <div>
                                    <h5>{order.package.name}</h5>
                                    <span className="text-muted">Newbie get 1 class free!</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <b>${order.grant_total}</b>
                        </div>
                    </div>
                    {hasPromo ?
                        <div className="d-flex col-12 col-md-6 mb-5">
                            <input placeholder="Promotion Code" className="form-control" onChange={handleChange} value={code} />
                            <button className="btn btn-info text-white" onClick={submitPromoCode}>APPLY</button>
                        </div> : null}


                    <div className="order-info my-3 pt-4 border-top">
                        <ul>
                            <li className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>${order.package.price}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>GST</span>
                                <span>${(order.package.price * order.package.gst_percent) / 100}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>Discount</span>
                                <span>$${(order.package.price * discount) / 100}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>Grant Total</span>
                                <span>${order.grant_total}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-header">
                    <p>
                        Please read all <span>terms & conditions before purchasing your YM Class or Class Pack</span>
                    </p>
                    <div className="d-flex justify-content-between">
                        <a href="#" role="button" onClick={backToHome}>Back</a>
                        <button className="btn btn-info rounded text-white" onClick={payOrder}>Pay Now</button>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Order;