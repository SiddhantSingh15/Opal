class SearchState {
	constructor() {
		this.documentAddress = "http://35.231.0.227:8000/api/v1/document/";
		this.tagIds = [],
		this.keywords = [],
		this.fields = {}
	}

	addSearchParams = (searchParams) => {
		searchParams.map(param => addParam(param))
	}

	addParam = (param) => {
		switch(param.type) {
			case "tag":
				this.tagIds.append(param.obj.id)
				break;
			case "search":
				this.keywords.append(param.obj)
				break;
			case "field":
				fields[param.id] = param.name;
				break;
			default:
				console.log("ERROR: processing search param not yet implimented")
		}
	}

	fetchAsync = async () => {
		try {
			const resultsResponse = await axios.post(documentAddress, {
				tags: this.tagIDs,
				keywords: this.keywords,
				fields: this.fields
			});
			this.setState({ results: resultsResponse.data.docs }, () => {
				this.fetchResultTagsAsync(resultsResponse.data.docs);
			});
		} catch (e) {
			console.log(e);
		}
		return resultsResponse
	}
}
  
export default SearchState;
  