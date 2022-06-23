import { useDispatch } from "react-redux";
import actions from "../redux/actions";
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
        if (searchParams.has("tag")) {
          const prev = JSON.parse(decodeURIComponent(searchParams.get("tags")));
          newTags = prev.push(id);
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
}

export default new QuerySearch();
