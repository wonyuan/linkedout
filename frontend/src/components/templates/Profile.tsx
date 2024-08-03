import { useMemo } from "react";
import { Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";
import UserCard from "@molecules/UserCard";

const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    desc: "i'm interested in building full stack applications and machine learning! i'm here to meet the higher up 14 pairing around the corner of my life",
    likes: ["hiking", "horror movies", "tech","machine learning", "full stack applications", "pair programming"],
    industry: "tech",
    url: "https://www.linkedin.com/in/johndoe",
};

// saved messages that you've sent already to people
// empty card for when messages aren't saved, can be copied easily
const Profile = () => {
    const navigate = useNavigate();

    return (
        <Flex direction="column" gap="10px" sx={{ padding: "50px 75px 75px 50px", height: "100vh" }}>
            <Header
            title={headers.home.title}
            desc={headers.home.desc}
            handleAction={() => navigate("/profile")}
            />
            <UserCard user={user} />
        </Flex>
    );
};

export default Profile; 
