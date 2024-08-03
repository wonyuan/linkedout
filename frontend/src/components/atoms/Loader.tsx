import useLoading from "@context/loadingContext";
import { LoadingOverlay } from "@mantine/core";

const Loader = () => {
  const { loading } = useLoading();
  return <LoadingOverlay visible={loading} />;
};

export default Loader;