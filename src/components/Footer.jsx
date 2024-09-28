import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className='container-fluid bg-success p-5 '>
        <div className='row'>
            <div className="col-md-4">
                <h4 className='text-light' ><FontAwesomeIcon icon={faLayerGroup} />Project Fair</h4>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione fugiat adipisci itaque velit nisi error impedit vel nulla, tempore quasi non aut maiores quod natus dolorem eveniet ipsa, magni explicabo.</p>
            </div>


            <div className="col-md-2 mt-5 mt-md-0">
                <div>
                    <h4 className='text-light'>Links</h4>
                    <Link to={'/'}><p style={{color:'black'}}>Home</p></Link>
                    <Link to={'/project'}><p style={{color:'black'}}>Project</p></Link>
                    <Link to={'/dashboard'}><p style={{color:'black'}}>Dashboard</p></Link>
                </div>
            </div>

            <div className="col-md-2 mt-5 mt-md-0">
                <div>
                    <h4 className='text-light'>Guides</h4>
                    <p>React</p>
                    <p>Bootstrap</p>
                    <p>Bootswatch</p>
                </div>
            </div>

            <div className="col-md-4 mt-5 mt-md-0">
                <h4 className='text-light'>Conatact Us</h4>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <input type="text" placeholder='email Id' className='form-control rounded-0' />
                    <button className='btn btn-warning rounded-0'>Subscribe</button>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-3 '>
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                <FontAwesomeIcon icon={faFacebook} size="2x"/>
                <FontAwesomeIcon icon={faInstagram} size="2x"/>
                <FontAwesomeIcon icon={faXTwitter} size="2x"/>
                <FontAwesomeIcon icon={faLinkedin} size="2x"/>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Footer