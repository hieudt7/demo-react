import React from 'react'
import PropTypes from 'prop-types'
import { Link, IndexLink } from 'react-router'

import config from 'config/app'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <footer>
      <div className="f-content clearfix">
        <div className="footer-left">
            <img className="f-logo-desktop" src="https://cdn.vn.garenanow.com/web/fo3/fo4/home-page/images/partner.jpg"
                alt=""/>
            <img className="f-logo-mb" src="https://cdn.vn.garenanow.com/web/fo3/fo4/home-page/images/mobile/partner.jpg"
                alt=""/>
        </div>
        <div className="footer-center">© 201&#8203;7&#8203; Electronic Arts Inc. EA, EA SPORTS, and the EA SPORTS logo
            are trademarks of Electronic Arts Inc. Official FIFA licensed product. © FIFA name and FIFA's Official
            Licensed Product Logo are copyrights and/or trademarks of FIFA. All rights reserved. Manufactured under
            license by Electronic Arts Inc. The use of real player names and likenesses is authorized by FIFPro
            Commercial Enterprises BV. The Premier League Logo © The Football Association Premier League Limited
            2018. The Premier League Logo is a trademark of the Football Association Premier League Limited which
            is registered in the UK and other jurisdictions. The Premier League Club logos are copyright works and
            registered trademarks of the respective Clubs. All are used with the kind permission of their
            respective owners. Manufactured under license from the Football Association Premier League Limited. No
            association with nor endorsement of this product by any player is intended or implied by the license
            granted by the Football Association Premier League Limited to Electronic Arts. All other trademarks are
            the property of their respective owners.
        </div>
        <div className="footer-right hide-on-mobile">
          <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/home-page/images/18.jpg" alt=""/>
        </div>
      </div>
  </footer>
    )
  }
}
