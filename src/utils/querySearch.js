import config from "../config";
import { addTag } from "../redux/searchSlice";

class QuerySearch {
  /** Add a search parameter
   * @param {function} reduxDispatch dispatcher for adding to redux state
   */
  addSearchParam = (
    searchParams,
    setSearchParams,
    type,
    id,
    value,
    reduxDispatch
  ) => {
    switch (type) {
      case "tag":
        let newTags = [id];
        if (searchParams.has("tags")) {
          const prev = JSON.parse(decodeURIComponent(searchParams.get("tags")));
          prev.push(id);
          newTags = prev;
        }
        reduxDispatch(addTag({ id, value })); /* Add to redux */
        setSearchParams({ tags: encodeURIComponent(JSON.stringify(newTags)) });
        break;
      case "field":
        setSearchParams({ [id]: value });
        break;
      default:
        throw new Error("Unsupported parameter type");
    }
  };

  removeLatestTag = () => {
    alert("removing latest tag");
  };

  tagNotSearched = (searchParams, tagID) => {
    if (!searchParams.has("tags")) return true;

    const tags = JSON.parse(decodeURIComponent(searchParams.get("tags")));
    return !tags.includes(tagID);
  };

  /** Given the search url, gets the search params.
   * At the moment the search params are stored like this:
   * http://url/...path.../?tags=encoded_array&field1=value&field2=value.
   */
  getSearchParams = (params) => {
    let tags = [];
    if (params.has("tags"))
      tags = JSON.parse(decodeURIComponent(params.get("tags")));

    let fields = {};
    for (const [key, value] of params.entries()) {
      if (config.VALID_FIELDS.includes(key)) fields[key] = value;
    }

    return { tags, fields };
  };
}

export default new QuerySearch();
