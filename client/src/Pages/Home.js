import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color={"black"}
          align="center"
        >
          Face Chat
        </Text>
      </Box>

      <Box bg={"white"} w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Log In</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            {/* Login Component */}
            <TabPanel>
              <Login />
            </TabPanel>

            {/* Signup Component */}
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
