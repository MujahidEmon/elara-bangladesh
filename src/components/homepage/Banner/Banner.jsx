import { getBanners } from "@/actions/server/banners";
import BannerSlider from "./BannerSlider";

const Banner = async () => {
  const banners = await getBanners();
  return <BannerSlider banners={banners} />;
};

export default Banner;