
import CarouselSlide from "../components/home/CarouselSlide";
import Category from "../components/home/Category";
import DealsHot from "../components/home/DealsHot";
import Featured from "../components/home/Featured";
import NewArrival from "../components/home/NewArrival";
import Recommend from "../components/home/Recommend";
import TopFooter from "../components/home/TopFooter";
import TopSearch from "../components/home/TopSearch";
import AppLayout from "../components/layout/AppLayout";

const IndexPage = () => {
  return (
    <main>
      <CarouselSlide />
      <DealsHot />
      <TopSearch />
      <Featured />
      <NewArrival />
      <Category />
      <Recommend />
      <TopFooter />
      
      
    </main>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;
