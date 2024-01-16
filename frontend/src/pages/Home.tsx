import { Flex } from "@mantine/core";
import AuthOverlay from "../components/AuthOverlay";
import ProfileSettings from "../components/ProfileSettings";
import ProtectedRoutes from "../components/ProtectedRoutes";
import RoomList from "../components/RoomList";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";
import AddChatroom from "../components/AddChatroom";
import JoinRoomOrChatwindow from "../components/JoinRoomOrChatwindow";

const Home = () => {
  return (
    <MainLayout>
      <div
        style={{
          position: "absolute",
        }}
      >
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
        <ProtectedRoutes>
          <AddChatroom />
          <Flex direction={{ base: "column", md: "row" }}>
            <RoomList />
            <JoinRoomOrChatwindow />
          </Flex>
        </ProtectedRoutes>
      </div>
    </MainLayout>
  );
};
export default Home;
