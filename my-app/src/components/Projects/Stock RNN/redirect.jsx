import { useEffect } from "react";
const RedirectPage = () => {
    useEffect(() => {
      window.location.replace('https://github.com/arnaudm2282/soaring_gale');
    }, [])
  
    // Render some text when redirecting
    // You can use a loading gif or something like that
    return <div className="term">
      <h3 className="title">Redirecting...</h3>
    </div>
  }
  
  
  
export default RedirectPage;