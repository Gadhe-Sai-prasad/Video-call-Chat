import { Link } from "react-router-dom"
import "../App.css"
const Landing = () => {
  return (

    <>

      <div className='LandingPageContainer'>
        <nav>

          <div className='navHeader'><h2>Video call</h2>  </div>

          <div className="navlist"><p>Join as Guest </p>
            <p>Register</p>
            <div><button>Login</button></div>
          </div>

        </nav>
      


      <div className="LandingMainContainer">
        <div><h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

          <p>Cover a distance by Video Call </p>
          <div role="button">
             <Link t0={"/auth"} >Get Started</Link>
          </div>
         
          </div>
         
        <div>

          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
    </>
  )
}


export default Landing
