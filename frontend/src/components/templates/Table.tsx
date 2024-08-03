import { useMemo } from "react";
import { Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";


const Table = () => {
    const navigate = useNavigate();

    return (
        <Flex direction="column" gap="10px" sx={{ padding: "50px 50px", height: "100vh" }}>
            <Header
            title={headers.dashboard.title}
            desc={headers.dashboard.desc}
            handleAction={() => navigate("/profile")}
            />
            <Box sx={{ width: "100%" }}>

            </Box>
        </Flex>
    );
};

export default Table; 
