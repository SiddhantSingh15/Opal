// TODO: right now only searching for single field (only one govlaw)
/** Add search parameter.  */
const addSearchParam = (searchParams, setSearchParams, type, id, value) => {
  switch (type) {
    case "tag":
      let newTags = [id];
      if (searchParams.has("tag")) {
        const prev = JSON.parse(decodeURIComponent(searchParams.get("tags")));
        newTags = prev.push(id);
      }
      setSearchParams({ tags: encodeURIComponent(JSON.stringify(newTags)) });
      break;
    case "field":
      setSearchParams({ [id]: value });
      break;
    default:
      throw new Error("Unsupported parameter type");
  }
};

export default addSearchParam;
