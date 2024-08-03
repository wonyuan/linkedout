import { useMemo } from "react";
import { Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";


const Table = () => {
    const navigate = useNavigate();

    return (
        <Flex direction="row" gap="10px" sx={{ padding: "0 40px", height: "100vh" }}>
            <Header
            title={headers.dashboard.title}
            desc={headers.dashboard.desc}
            handleAction={() => navigate("/profile")}
            />
        </Flex>
    );
};

export default Table; 
