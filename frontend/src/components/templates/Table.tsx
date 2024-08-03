import { useMemo } from "react";
import { Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";
import TableRows from "@molecules/TableRows";


const Table = () => {
    const navigate = useNavigate();

    return (
        <Flex direction="column" gap="10px" sx={{ padding: "50px 75px 75px 50px", height: "100vh" }}>
            <Header
            title={headers.dashboard.title}
            desc={headers.dashboard.desc}
            handleAction={() => navigate("/profile")}
            />
            <TableRows />
        </Flex>
    );
};

export default Table; 
