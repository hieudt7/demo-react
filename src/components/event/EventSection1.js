import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from 'components/Modal'
import swal from "sweetalert2"
import moment from 'moment'
import Scrollbar from 'react-scrollbars-custom';
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
        }
    }
    handleClosePopup() {
        this.setState({ modal: null })
        $('body').removeClass('modal-open');
    }
    handleOpenPopup(modal) {
        this.setState({ modal: modal })
        $('body').addClass('modal-open');
    }

    componentDidMount() {
        if ($(window).width() < 1023) {
            this.setState({
              isMobile: true,
            })
          }
    }
    componentWillReceiveProps(nextProps) {
    }
    
    render() {
        const { modal, isMobile, mission_infos } = this.state
        return (
            <React.Fragment>
                <div></div>
            </React.Fragment>
        )
    }
}

export default EventSection1
