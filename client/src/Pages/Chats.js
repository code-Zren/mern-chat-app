import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";

const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <HStack
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="85vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </HStack>
    </div>
  );
};

export default Chats;
