// import React, {Component} from 'react';
// import './Subscribe.scss'
// import axios from 'axios';
//
// class Subscribe extends Component {
//
//     subscribeMail = {};
//
//     sendMail = (e) => {
//         e.preventDefault();
//         axios.post('/subscribe', {subscribeMail})
//             .then(res => {
//                 console.log(res);
//                 console.log(res.data);
//             });
//
//     };
//
//     render() {
//
//         return (
//             <>
//                 <div className="subscribe-section">
//                     <h4 className="subscribe-text">Subscribe</h4>
//                     <p className="subscribe-info">Get the day’s top news stories<br/>delivered to your inbox</p>
//                     <form onSubmit={this.sendMail} className="input-form">
//                         <input id='subscribe-mail' className="input-email__text" type="email"
//                                placeholder="Enter your email here..."/>
//                         <input id='subscribe-btn' type="submit" className="subscribe-button" value='SUBSCRIBE'/>
//                     </form>
//                 </div>
//             </>
//         )
//     }
// }
//
// export default Subscribe;