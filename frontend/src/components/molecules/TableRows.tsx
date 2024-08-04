import { useState } from 'react';
import { Flex, Box, Badge } from '@mantine/core';
import Loader from '@atoms/Loader';
import RowItem from "@atoms/RowItem";
import ModalDetail from '@organisms/ModalDetail';
import { getProfessionals } from '@api/professionals';
import { useMemo } from "react";

import { useNavigate } from "react-router-dom";
import Header from "@molecules/Header";
import { headers } from "@constants/text";
import UserCard from "@molecules/UserCard";
import TextCard from "@molecules/TextCard";
import useLoading from "@context/loadingContext";

import api from "../../api/axiosInstance";

const profiles = await getProfessionals();

const mockUser = {
    name: "Gregory Lane",
}

const mockScore = {
  score: Array.from({ length: 19 }, () => Math.random()).sort((a, b) => b - a)
};


const TableRows = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [index, setIndex] = useState<number | null>(null);


  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [linkedinURL, setLinkedinURL] = useState<string>("");
  const [feature, setFeatures] = useState(null);
 

  const handleSearch = async (about:string) => {
    try {
      setLoading(true);
      const response = await api.post('/api/getFeatures', {about});
      setFeatures(response.data);
      setLoading(false);
      navigate('/home');

    } catch (error) {
      console.error('Error logging in', error);
      navigate('/');
    }
  };
  

  return (
    <Box >
      <Loader />
      <ModalDetail
          open={!!open}
          setClose={() => {
            setOpen(null);
            setIndex(null); 
          }}
          data={index !== null ? profiles?.professionals[index] : null}
        />
        <Badge size="lg">
            Matches
        </Badge>
        <Box
        sx={{
          border: '2px solid #E0E0E0',
          borderRadius: '10px',
          padding: '10px 20px 10px 20px',
          marginTop: '5px',
        }}
      >
        {profiles?.professionals.map((data:any, idx: number) => (
        <Flex
          direction="row"
          gap="8px"
          sx={{
          height: "100px",
          width: "100%",
          overflowY: "auto",
          marginTop: "10px",
          marginBottom: "10px",
          border: "1px #E0E0E0",
          padding: "12px",
          borderRadius: "7.5px",
          backgroundColor: "#F3F4F8",
          transition: 'box-shadow 0.3s, opacity 0.3s',
          '&:hover': {
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
            opacity: 0.95,
          },
        }}
        key={idx}
        >
          <RowItem 
            setOpen={() => {
              setOpen( profiles?.professionals); 
              setIndex(idx); 
            }}  
            data={data}
            mockScore={mockScore.score[idx]}/>
        </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default TableRows;