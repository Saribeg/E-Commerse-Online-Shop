import React, {Component} from 'react'
import {connect} from 'react-redux'



class OrdersHistory extends Component {



    render() {


        return (
            <>
                Orders History

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistory)