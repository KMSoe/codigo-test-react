import React, { useEffect, useState } from 'react';
import Package from '../../components/Package/Package';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';

const PackageList = (props) => {

    useEffect(() => {
        props.loadPackages().then(res => { }).catch(err => { })
    }, [])

    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-stretch">
                {
                    props.packages.map(element => <Package key={element.id} token={props.token} data={element} />)
                }
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        packages: state.pack.packages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPackages: () => dispatch(actions.loadPackages())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);