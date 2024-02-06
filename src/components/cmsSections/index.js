import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { HomeHeroSection } from "./HomeHeroSection";
import { PageFAQDisplayQuestionSections } from "./PageFAQDisplayQuestionsSections";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
  PagefaqDisplayquestionSectionRecord: PageFAQDisplayQuestionSections,
  CommonSeoBlockRecord: SEOBlock,
  CommonMenuRecord: (props) => <Menu {...props}/>, 
  PagehomeHerosectionRecord: HomeHeroSection,
  CommonFooterRecord: (props) => <Footer {...props}/>
}
