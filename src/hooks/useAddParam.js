import { useSearchParams } from "react-router-dom";

const useAddParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.keys);
};

export default useAddParam;
