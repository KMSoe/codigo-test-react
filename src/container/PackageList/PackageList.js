import React, { useEffect, useState } from 'react';
import Package from '../../components/Package/Package';
import axiosObj from '../../axiosObj';

const List = (props) => {
    let [packages, setPackages] = useState([]);

    useEffect(() => {
        axiosObj.get(`http://localhost:8000/api/packages`, { headers: { Authorization: `Bearer ${props.token}` } })
            .then(({ data }) => {
                setPackages(data.data.pack_list);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-stretch">
                {
                    packages.map(element => <Package key={element.id} token={props.token} data={element} />)
                }
            </div>
        </div>
    );
}

export default List;