import Navbar from "../../Components/NavBar/navbar";
import HeroSection from "../../Components/Hero/hero";
import Footer from "../../Components/Footer/Footer";
import BookingModal from "../../Components/BookingModal/BookingModal";

function Home() {

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Footer/>
      <BookingModal/>
    </div>
  );
}

export default Home;
