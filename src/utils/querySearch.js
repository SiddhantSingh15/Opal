import config from "../config";

class QuerySearch {
  /** Add a search parameter
   */
  addSearchParam = (params, setParams, type, id, value) => {
    switch (type) {
      case "tag":
        let newTags = [id];
        if (params.has("tags")) {
          const prev = JSON.parse(decodeURIComponent(params.get("tags")));
          prev.push(id);
          newTags = prev;
        }
        this.updateParam(
          params,
          setParams,
          "tags",
          encodeURIComponent(JSON.stringify(newTags))
        );
        break;
      case "field":
        this.updateParam(params, setParams, id, value);
        break;
      default:
        throw new Error("Unsupported parameter type");
    }
    window.location = window.location.href;
  };

  /** Add a search parameter
   */
  removeSearchParam = (params, setParams, type, id, value) => {
    switch (type) {
      case "tag":
        if (!params.has("tags"))
          throw new Error("tag being removed doesn't exist");
        const prev = JSON.parse(decodeURIComponent(params.get("tags")));
        const newTags = prev.filter((tagID) => tagID !== id);
        this.updateParam(
          params,
          setParams,
          "tags",
          newTags.length > 0 ? encodeURIComponent(JSON.stringify(newTags)) : ""
        );
        break;
      case "field":
        if (!params.has(id))
          throw new Error("field being removed doesn't exist");
        this.updateParam(params, setParams, id, "");
        break;
      default:
        throw new Error("Unsupported parameter type");
    }
    window.location = window.location.href;
  };

  /** Update one query parameter without changing others
   * @param {str} value updating to. If value = '', then remove the field
   */
  updateParam = (params, setParams, key, value) => {
    const query = value ? { [key]: value } : {};

    for (const p of config.VALID_FIELDS.concat("tags")) {
      if (p !== key && params.has(p)) {
        query[p] = params.get(p);
      }
    }

    setParams(query);
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
