import { useMemo } from "react";
import { Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";
import UserCard from "@molecules/UserCard";
import TextCard from "@molecules/TextCard";

import api from "../../../api/axiosInstance";
import {useEffect, useState} from 'react';

// saved messages that you've sent already to people
// empty card for when messages aren't saved, can be copied easily
const Profile = () => {

    const [name, setName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [experiences, setExperiences] = useState<string[]>([]);
  
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts[1] || '';
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
    const navigate = useNavigate();

    const user = {
        name: name,
        email: email,
        desc: about,
        likes: ["hiking", "horror movies", "tech","machine learning", "full stack applications", "pair programming"],
        industry: "tech",
        url: "https://www.linkedin.com/in/johndoe",
    };
    
   
    const receiveUserData= async () => {
        try {
        const response = await api.get("/api/getLinkedInData");
        setName(response.data.name)
        setAbout(response.data.about);
        setExperiences(response.data.experiences);

        } catch (error) {
        console.error('Error logging in', error);
        }
    };


    //empty dependency array ensures this runs only once on mount
    useEffect(() => {
        receiveUserData();
    }, []); 
    

    return (
        <Flex direction="column" gap="10px" sx={{ padding: "50px 75px 75px 50px", height: "100vh" }}>
            <Header
            title={headers.home.title}
            desc={headers.home.desc}
            handleAction={() => navigate("/profile")}
            />
            <UserCard user={user} />
            <TextCard />
            
        </Flex>
    );
};

export default Profile; 
