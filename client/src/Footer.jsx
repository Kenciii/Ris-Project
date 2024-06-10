import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
    <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Company Info</h5>
              <p>Mobilko</p>
              <p>Address, City</p>
              <p>Phone: (893) 039-5839</p>
            </div>
            <div className="col-md-4">
              <h5>Useful Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul>
                <li><a href="https://twitter.com/">Twitter</a></li>
                <li><a href="https://www.facebook.com/">Facebook</a></li>
                <li><a href="https://www.instagram.com/">Instagram</a></li>
              </ul>
            </div>
            <span><p>© 2024 Mobilko. All rights reserved.</p></span>
          </div>
        </div>
      </footer>
  
    )
  }
}

export default Footer