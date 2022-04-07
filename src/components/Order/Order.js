import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axiosObj from '../../axiosObj';
import "./Order.css";

const Order = (props) => {
    const { id } = useParams();
    let [code, setCode] = useState('');
    let [discount, setDiscount] = useState(0);
    let [codeValid, setCodeValid] = useState(false);
    let [hasPromo, setHasPromo] = useState(false);
    let [promo, setPromo] = useState({});
    let [pack, setPack] = useState({});
    let [orderFinished, setOrderFinished] = useState(false);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadPackage(id);
        // Ask User to have Promotion code and set setHasPromo
        if (!orderFinished) {
            handleShow();
        }

    }, [id])

    const loadPackage = (id) => {
        axiosObj.get(`/packages/${id}`, { headers: { Authorization: `Bearer ${props.token}` } })
            .then(({ data }) => {
                setPack(data.data);
            })
            .catch(err => navigate("/packages"))
    }

    const checkCodeValid = (e) => {
        setCode(e.target.value);

        axiosObj.post(`/codes/check`, JSON.stringify({ code: e.target.value }), { headers: { Authorization: `Bearer ${props.token}` } })
            .then(({ data }) => {
                if (data.id) {
                    setCodeValid(true);
                    setPromo(data);
                }
            })
            .catch(err => console.log(err))
    }

    let gst = (pack.price * pack.gst_percent) / 100;
    let calDiscount = (pack.price * discount) / 100;
    let grantTotal = pack.price + gst - calDiscount;

    const submitPromoCode = () => {
        setDiscount(promo.discount);
    }

    const payOrder = () => {
        axiosObj.post(`/orders`, JSON.stringify({ package_id: pack.id, grant_total: grantTotal }), { headers: { Authorization: `Bearer ${props.token}` } })
            .then(({ data }) => {
                setOrderFinished(true);
            })
            .catch(err => console.log(err))
    }

    const cardHeader = orderFinished ? (<h6>Thank you!<br />You have successfully purchased a class pack!</h6>) : <h6>Class Pack Purchase Preview</h6>;

    const cardFooter = orderFinished ? null : (<div className="card-footer">
        <p>
            Please read all <span>terms & conditions before purchasing your YM Class or Class Pack</span>
        </p>
        <div className="d-flex justify-content-between">
            <Link to="/packages">Back</Link>
            <button className="btn btn-info rounded text-white" onClick={payOrder}>Pay Now</button>
        </div>

    </div>);

    return (

        <section className="container">
            <div className="card">
                <div className="card-header">
                    {
                        cardHeader
                    }
                </div>
                <div className="card-body px-5 py-3">
                    <div className="my-4">
                        <b>You have selected:</b>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <div className="d-flex justify-content-start">
                                <div className="circle text-white me-3">{pack.total_credit}</div>
                                <div>
                                    <h5>{pack.name}</h5>
                                    <span className="text-muted">Newbie get 1 class free!</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <b>${grantTotal}</b>
                        </div>
                    </div>
                    {hasPromo ?
                        <div className="d-flex col-12 col-md-6 mb-5">
                            <div className="position-relative">
                                <input placeholder="Promotion Code" className="form-control" onChange={checkCodeValid} value={code} />
                                {codeValid ? <span className="valid-symbol position-absolute"></span> : null}
                            </div>

                            <button className="btn btn-info text-white" disabled={!codeValid} onClick={submitPromoCode}>APPLY</button>
                        </div> : null}


                    <div className="order-info my-3 pt-4 border-top">
                        <ul>
                            <li className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>${pack.price}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                                <span>GST</span>
                                <span>${gst}</span>
                            </li>
                            {discount ?
                                <li className="d-flex justify-content-between">
                                    <span>Discount</span>
                                    <span>${calDiscount}</span>
                                </li> : null}
                            <li className="d-flex justify-content-between">
                                <span>Grant Total</span>
                                <span>${grantTotal}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {cardFooter}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you Have Promotion Code</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center"><Button className="me-5" variant="secondary" onClick={() => { setHasPromo(false); handleClose(); }}>
                    No
          </Button>
                    <Button variant="primary" onClick={() => { setHasPromo(true); handleClose(); }}>
                        Yes
          </Button></Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
          </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )

}
export default Order;