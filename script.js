const keywordListApiUrl = "https://app.yourprinthouse.eu/api/amazon/keyResult";
const keywordListApiUrlEncoded = encodeURI(keywordListApiUrl);

var keywordTable;

const phone_case_string = " phone case";

const inputData = {
	keyword: "",
	userID: "",
	userToken: "",
	appendKeyword: true,
	appendTable: false,
	conversionRate: 0.005,
	timeLimit: 30,

	minViews: 10000,
	minCompetition: 50,
	minPotentialViews: 0,
	minPotentialBuyers: 0
};

const getJson = (url) => fetch(url, 
	{ method: "GET" }

).then(async (response) => {
	const contentType = response.headers.get("Content-Type");

	if (contentType.includes("text/plain")) {
		const text = await response.text();
		return text;

	} else if (contentType.includes("application/json")) {
		return await response.json();
	}

}).catch((error) => console.error(error));

const getJsonPost = (url, data) => fetch(url,
{
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(data),

}).then(async (response) => {
	const contentType = response.headers.get("Content-Type");

	if (contentType.includes("text/plain")) {
		const text = await response.text();
		return text;

	} else if (contentType.includes("application/json")) {
		return await response.json();
	}

}).catch((error) => console.error(error));

const keywordElement = document.getElementById("keyword");
const userIdElement = document.getElementById("userID");
const userTokenElement = document.getElementById("userToken");

const appendKeywordElement = document.getElementById("appendKeyword");
const appendTableElement = document.getElementById("appendTable");

const conversionRateElement = document.getElementById("conversionRate");
const conversionRateTextElement = document.getElementById("conversionRateText");

const timeLimitElement = document.getElementById("timeLimit");
const timeLimitTextElement = document.getElementById("timeLimitText");

const minViewsElement = document.getElementById("minViews");
const minViewsTextElement = document.getElementById("minViewsText");

const minCompetitionElement = document.getElementById("minCompetition");
const minCompetitionTextElement = document.getElementById("minCompetitionText");

const minPotentialViewsElement = document.getElementById("minPotentialViews");
const minPotentialViewsTextElement = document.getElementById("minPotentialViewsText");

const minPotentialBuyersElement = document.getElementById("minPotentialBuyers");
const minPotentialBuyersTextElement = document.getElementById("minPotentialBuyersText");

const getKeywordSuggestionsButtonElement = document.getElementById("getKeywordSuggestionsButton");
const getKeywordSuggestionsRecursivelyButtonElement = document.getElementById("getKeywordSuggestionsRecursivelyButton");

function saveUserDataToLocalStorage() {
	if (!localStorage) {
		return;
	}

	if(inputData.keyword) {
		localStorage.keyword = inputData.keyword;
	}

	if(inputData.userID) {
		localStorage.userID = inputData.userID;
	}

	if(inputData.userToken) {
		localStorage.userToken = inputData.userToken;
	}

	if(inputData.appendKeyword || inputData.appendKeyword === false) {
		localStorage.appendKeyword = inputData.appendKeyword;
	}

	if(inputData.appendTable || inputData.appendTable === false) {
		localStorage.appendTable = inputData.appendTable;
	}

	if(inputData.conversionRate) {
		localStorage.conversionRate = inputData.conversionRate;
	}

	if(inputData.timeLimit) {
		localStorage.timeLimit = inputData.timeLimit;
	}

	if(inputData.minViews) {
		localStorage.minViews = inputData.minViews;
	}

	if(inputData.minCompetition) {
		localStorage.minCompetition = inputData.minCompetition;
	}

	if(inputData.minPotentialViews) {
		localStorage.minPotentialViews = inputData.minPotentialViews;
	}

	if(inputData.minPotentialBuyers) {
		localStorage.minPotentialBuyers = inputData.minPotentialBuyers;
	}
}

function loadUserDataFromLocalStorage() {
	if (!localStorage) {
		return;
	}

	const keyword = localStorage.keyword;
	const userID = localStorage.userID;
	const userToken = localStorage.userToken;
	const appendKeywordString = localStorage.appendKeyword;
	const appendTableString = localStorage.appendTable;
	const conversionRate = localStorage.conversionRate;
	const timeLimit = localStorage.timeLimit;
	const minViews = localStorage.minViews;
	const minCompetition = localStorage.minCompetition;
	const minPotentialViews = localStorage.minPotentialViews;
	const minPotentialBuyers = localStorage.minPotentialBuyers;

	if(keyword) {
		inputData.keyword = keyword;
		keywordElement.value = keyword;
	}

	if(userID) {
		inputData.userID = userID;
		userIdElement.value = userID;
	}

	if(userToken) {
		inputData.userToken = userToken;
		userTokenElement.value = userToken;
	}

	if(appendKeywordString) {
		const appendKeyword = JSON.parse(appendKeywordString);
		inputData.appendKeyword = appendKeyword;
		appendKeywordElement.value.checked = appendKeyword;
	}

	if(appendTableString) {
		const appendTable = JSON.parse(appendTableString);
		inputData.appendTable = appendTable;
		appendTableElement.value.checked = appendTable;
	}

	if(conversionRate) {
		inputData.conversionRate = conversionRate;
		conversionRateElement.value = conversionRate;
		conversionRateTextElement.value = 100.0 * conversionRate;
	}

	if(timeLimit) {
		inputData.timeLimit = timeLimit;
		timeLimitElement.value = timeLimit;
		timeLimitTextElement.value = timeLimit;
	}

	if(minViews) {
		inputData.minViews = minViews;
		minViewsElement.value = minViews;
		minViewsTextElement.value = minViews;
	}

	if(minCompetition) {
		inputData.minCompetition = minCompetition;
		minCompetitionElement.value = minCompetition;
		minCompetitionTextElement.value = minCompetition;
	}

	if(minPotentialViews) {
		inputData.minPotentialViews = minPotentialViews;
		minPotentialViewsElement.value = minPotentialViews;
		minPotentialViewsTextElement.value = minPotentialViews;
	}

	if(minPotentialBuyers) {
		inputData.minPotentialBuyers = minPotentialBuyers;
		minPotentialBuyersElement.value = minPotentialBuyers;
		minPotentialBuyersTextElement.value = minPotentialBuyers;
	}
}

function toggleInput() {
	/*keywordElement.disabled = !keywordElement.disabled;
	userIdElement.disabled = !userIdElement.disabled;
	userTokenElement.disabled = !userTokenElement.disabled;
	appendKeywordElement.disabled = !appendKeywordElement.disabled;
	appendTableElement.disabled = !appendTableElement.disabled;
	conversionRateElement.disabled = !conversionRateElement.disabled;
	conversionRateTextElement.disabled = !conversionRateTextElement.disabled;
	timeLimitElement.disabled = !timeLimitElement.disabled;
	timeLimitTextElement.disabled = !timeLimitTextElement.disabled;
	minViewsElement.disabled = !minViewsElement.disabled;
	minViewsTextElement.disabled = !minViewsTextElement.disabled;
	minCompetitionElement.disabled = !minCompetitionElement.disabled;
	minCompetitionTextElement.disabled = !minCompetitionTextElement.disabled;
	minPotentialViewsElement.disabled = !minPotentialViewsElement.disabled;
	minPotentialViewsTextElement.disabled = !minPotentialViewsTextElement.disabled;
	minPotentialBuyersElement.disabled = !minPotentialBuyersElement.disabled;
	minPotentialBuyersTextElement.disabled = !minPotentialBuyersTextElement.disabled;*/
	getKeywordSuggestionsButtonElement.disabled = !getKeywordSuggestionsButtonElement.disabled;
	getKeywordSuggestionsRecursivelyButtonElement.disabled = !getKeywordSuggestionsRecursivelyButtonElement.disabled;
}

async function getKeywordList(keyword) {
	console.log(keyword);

	const postData = { "keyword": keyword };
	const keywordsObject = await getJsonPost(keywordListApiUrlEncoded, postData);
	const keywords = keywordsObject.tags;

	console.log(keywords);

	return keywords;
}

async function getKeywordInfo(inputDataCopy, keyword) {
	const keywordInfoApiUrl = `https://app.yourprinthouse.eu/api/amazon/getBubleIndex/${keyword}/${inputDataCopy.userID}/${inputDataCopy.userToken}`;
	const keywordInfoApiUrlEncoded = encodeURI(keywordInfoApiUrl);

	const keywordInfo = await getJson(keywordInfoApiUrlEncoded);

	return keywordInfo;
}

async function getKeywordSuggestions() {
	const inputDataCopy = structuredClone(inputData);

	if (!inputDataCopy.keyword || !inputDataCopy.userID || !inputDataCopy.userToken) {
		return;
	}

	toggleInput();

	inputDataCopy.keyword = inputDataCopy.keyword.trim().toLowerCase();

	if(!inputDataCopy.appendTable) {
		keywordTable.clear().draw();
	}

	const keywords = await getKeywordList(inputDataCopy.keyword);
	keywords.push(inputDataCopy.keyword);

	for (let keyword of keywords) {
		keyword = keyword.trim().toLowerCase().replace(phone_case_string, "");

		let isDuplicate = false;

		keywordTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
			let tableKeywordInfo = this.data();
			if (keyword === tableKeywordInfo.name) {
				isDuplicate = true;
				return false;
			}
		});

		if(isDuplicate) {
			continue;
		}

		if(inputDataCopy.appendKeyword) {
			keyword = `${keyword}${phone_case_string}`;
		}

		const keywordInfoObject = await getKeywordInfo(inputDataCopy, keyword);

		const potentialViews = keywordInfoObject.views / keywordInfoObject.competition;
		const potentialBuyers = potentialViews * inputDataCopy.conversionRate;

		const keywordInfo = {
			name: keywordInfoObject.keyword.trim().toLowerCase().replace(phone_case_string, ""),
			views: keywordInfoObject.views,
			competition: keywordInfoObject.competition,
			potentialViews: potentialViews.toFixed(1),
			potentialBuyers: potentialBuyers.toFixed(1),
		};

		console.log(keywordInfo);

		if(keywordInfo.views < inputDataCopy.minViews
		|| keywordInfo.competition < inputDataCopy.minCompetition
		|| keywordInfo.potentialViews < inputDataCopy.minPotentialViews
		|| keywordInfo.potentialBuyers < inputDataCopy.minPotentialBuyers) {

			continue;
		}

		keywordTable.row.add(keywordInfo).draw();
	};

	toggleInput();
}

async function getKeywordSuggestionsRecursively() {
	const inputDataCopy = structuredClone(inputData);

	if (!inputDataCopy.keyword || !inputDataCopy.userID || !inputDataCopy.userToken) {
		return;
	}

	toggleInput();

	inputDataCopy.keyword = inputDataCopy.keyword.trim().toLowerCase();

	if(!inputDataCopy.appendTable) {
		keywordTable.clear().draw();
	}

	
	let keywordQueue = [];
	let processedKeywords = [];

	keywordQueue.push(inputDataCopy.keyword);

	const timeLimitMS = 60 * 1000 * inputDataCopy.timeLimit

	const startTime = Date.now();
	let currentTime = Date.now();

	while(keywordQueue.length > 0
	&& currentTime - startTime < timeLimitMS) {
		const processingKeyword = keywordQueue.pop();
		processedKeywords.push(processingKeyword);
		
		const keywords = await getKeywordList(processingKeyword);
		keywords.push(inputDataCopy.keyword);

		for (let keyword of keywords) {
			keyword = keyword.trim().toLowerCase().replace(phone_case_string, "");

			let isDuplicate = false;

			keywordTable.rows().every(function (rowIndex, tableLoop, rowLoop) {
				let tableKeywordInfo = this.data();
				if (keyword === tableKeywordInfo.name) {
					isDuplicate = true;
					return false;
				}
			});

			if(isDuplicate) {
				continue;
			}

			if(inputDataCopy.appendKeyword) {
				keyword = `${keyword}${phone_case_string}`;
			}

			const keywordInfoObject = await getKeywordInfo(inputDataCopy, keyword);

			const potentialViews = keywordInfoObject.views / keywordInfoObject.competition;
			const potentialBuyers = potentialViews * inputDataCopy.conversionRate;

			const keywordInfo = {
				name: keywordInfoObject.keyword.trim().toLowerCase().replace(phone_case_string, ""),
				views: keywordInfoObject.views,
				competition: keywordInfoObject.competition,
				potentialViews: potentialViews.toFixed(1),
				potentialBuyers: potentialBuyers.toFixed(1),
			};

			console.log(keywordInfo);

			if(keywordInfo.views < inputDataCopy.minViews
			|| keywordInfo.competition < inputDataCopy.minCompetition
			|| keywordInfo.potentialViews < inputDataCopy.minPotentialViews
			|| keywordInfo.potentialBuyers < inputDataCopy.minPotentialBuyers) {

				continue;
			}

			if(!processedKeywords.includes(keywordInfo.name)) {
				keywordQueue.push(keywordInfo.name);
			}

			keywordTable.row.add(keywordInfo).draw();
		};

		currentTime = Date.now();
	}

	toggleInput();
}

const onReady = (callback) => {
	if (document.readyState != "loading") {
		callback();
	}
	else if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", callback);
	}
	else {
		document.attachEvent("onreadystatechange", function() {
			if (document.readyState == "complete") {
				callback();
			}
		});
	}
};

function onInputKeyword(value) {
	inputData.keyword = value;
	saveUserDataToLocalStorage();
}

function onInputUserId(value) {
	inputData.userID = value;
	saveUserDataToLocalStorage();
}

function onInputUserToken(value) {
	inputData.userToken = value;
	saveUserDataToLocalStorage();
}

function onInputAppendKeyword(value) {
	inputData.appendKeyword = value;
	saveUserDataToLocalStorage();
}

function onInputAppendTable(value) {
	inputData.appendTable = value;
	saveUserDataToLocalStorage();
}

function onInputConversionRate(value) {
	inputData.conversionRate = parseFloat(value);
	saveUserDataToLocalStorage();
	conversionRateTextElement.value = 100.0 * inputData.conversionRate;
}

function onInputConversionRateText(value) {
	inputData.conversionRate = value / 100.0;
	saveUserDataToLocalStorage();
	conversionRateElement.value = inputData.conversionRate;
}

function onInputTimeLimit(value) {
	inputData.timeLimit = parseFloat(value);
	saveUserDataToLocalStorage();
	timeLimitTextElement.value = inputData.timeLimit;
}

function onInputTimeLimitText(value) {
	inputData.timeLimit = value;
	saveUserDataToLocalStorage();
	timeLimitElement.value = inputData.timeLimit;
}

function onInputMinViews(value) {
	inputData.minViews = parseInt(value, 10);
	saveUserDataToLocalStorage();
	minViewsTextElement.value = inputData.minViews;
}

function onInputMinViewsText(value) {
	inputData.minViews = value;
	saveUserDataToLocalStorage();
	minViewsElement.value = inputData.minViews;
}

function onInputMinCompetition(value) {
	inputData.minCompetition = parseInt(value, 10);
	saveUserDataToLocalStorage();
	minCompetitionTextElement.value = inputData.minCompetition;
}

function onInputMinCompetitionText(value) {
	inputData.minCompetition = value;
	saveUserDataToLocalStorage();
	minCompetitionElement.value = inputData.minCompetition;
}

function onInputMinPotentialViews(value) {
	inputData.minPotentialViews = parseInt(value, 10);
	saveUserDataToLocalStorage();
	minPotentialViewsTextElement.value = inputData.minPotentialViews;
}

function onInputMinPotentialViewsText(value) {
	inputData.minPotentialViews = value;
	saveUserDataToLocalStorage();
	minPotentialViewsElement.value = inputData.minPotentialViews;
}

function onInputMinPotentialBuyers(value) {
	inputData.minPotentialBuyers = parseInt(value, 10);
	saveUserDataToLocalStorage();
	minPotentialBuyersTextElement.value = inputData.minPotentialBuyers;
}

function onInputMinPotentialBuyersText(value) {
	inputData.minPotentialBuyers = value;
	saveUserDataToLocalStorage();
	minPotentialBuyersElement.value = inputData.minPotentialBuyers;
}

onReady(() => { 
	loadUserDataFromLocalStorage();

	keywordTable = new DataTable('#keywordTable', {
		// options
		deferRender: true,
		lengthChange: true,
		autoWidth: true,
		paging: false,
		processing: true,
		serverSide: false,
		ordering: true,
		order: [[4, 'desc']],
		fixedHeader: {
			header: true,
			footer: false
		},
		columns: [
			{ data: "name" },
			{ data: "views" },
			{ data: "competition" },
			{ data: "potentialViews" },
			{ data: "potentialBuyers" }
		],
	});
});