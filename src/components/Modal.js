import React from 'react'
import { showErrorWithCode } from './common'
export default ({ children, show, closeHandler, customClass, customEffect }) =>
  <React.Fragment>
    <div className={`modal ${show ? 'show' : ''} ${customClass ? customClass : ''}`}>
      <div className={`modal-dialog ${customEffect ? customEffect : 'animated fadeInDown'}`}>
        <div className="modal-block">
          <div className="modal-content">
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div onClick={closeHandler} className={`modal-backdrop animated fade ${show ? 'show' : ''}`}></div>
    </div>
  </React.Fragment>