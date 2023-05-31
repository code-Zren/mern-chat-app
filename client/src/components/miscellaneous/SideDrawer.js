import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/ChatLogics";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please input something in search",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);

      // Fetching Users
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occurred",
        description: "Failed to Load Search Results",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      // Fetching Chats
      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching the chat/s",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Flex
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* Search Icon and Tooltip */}
        <Box>
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button variant="ghost" onClick={onOpen}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search User
              </Text>
            </Button>
          </Tooltip>
        </Box>

        {/* FaceChat Title */}
        <Box>
          <Text fontSize="2xl" fontFamily="Work sans">
            Face Chat
          </Text>
        </Box>

        <Box>
          <div>
            <Menu>
              {/* Notification Bell */}
              <MenuButton p={1}>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* Avatar */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar cursor="pointer" name={user.name} src={user.pic} />
              </MenuButton>

              {/* Toggle List */}
              <MenuList>
                {/* Profile */}
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>

                <MenuDivider />
                {/* Log Out */}
                <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>

        {/* Left Drawer */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              {/* Search Field and Go Button */}
              <HStack d="flex" pb={2}>
                <Box>
                  <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button pl={2} onClick={handleSearch}>
                    Go
                  </Button>
                </Box>
              </HStack>

              {/* Search Result for Users */}
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

export default SideDrawer;
