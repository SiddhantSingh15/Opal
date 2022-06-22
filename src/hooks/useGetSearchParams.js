import { useSearchParams } from "react-router-dom";

const VALID_FIELDS = ["title", "language", "type", "access", "date", "govlaw"];

/** Given the search url, gets the search params.
 * At the moment the search params are stored like this:
 * http://url/...path.../?tags=encoded_array&field1=value&field2=value.
 */
const useGetSearchParams = () => {
  const [params, setParams] = useSearchParams();

  let tags = [];
  if (params.has("tags"))
    tags = JSON.parse(decodeURIComponent(params.get("tags")));

  let fields = {};
  for (const [key, value] of params.entries()) {
    if (VALID_FIELDS.includes(key)) fields[key] = value;
  }

  return { tags, fields };
};

export default useGetSearchParams;
