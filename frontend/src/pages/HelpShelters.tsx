import { Box } from "@mui/material";
import MainSection from "../components/MainSection";
import StatisticsSection from "../components/StatisticSection";
import HowItWorks from "../components/HowItWorks";
import ShelterRegistrationForm from "../components/RegistrationForm";
import SuccessStories from "../components/SuccessStories";

const HelpSheltersPage = () => {
  return (
    <Box>
      <MainSection />
      <StatisticsSection />
      <HowItWorks />
      <ShelterRegistrationForm />
      <SuccessStories />
    </Box>
  );
};



export default HelpSheltersPage;