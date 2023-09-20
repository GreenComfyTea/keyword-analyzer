const keywordListApiUrl = "https://app.yourprinthouse.eu/api/amazon/keyResult";
const keywordListApiUrlEncoded = encodeURI(keywordListApiUrl);

var keywordTable;

const phoneCaseString = " phone case";
const getKeywordSuggestionRecursivelyString = "Get Keyword Suggestions Recursively";

const inputData = {
	keywords: "",
	userID: "",
	userToken: "",
	appendKeywords: true,
	appendTable: true,
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

const keywordsElement = document.getElementById("keywords");
const userIdElement = document.getElementById("userID");
const userTokenElement = document.getElementById("userToken");

const appendKeywordsElement = document.getElementById("appendKeywords");
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

	if(inputData.keywords) {
		localStorage.keywords = inputData.keywords;
	}

	if(inputData.userID) {
		localStorage.userID = inputData.userID;
	}

	if(inputData.userToken) {
		localStorage.userToken = inputData.userToken;
	}

	if(inputData.appendKeywords || inputData.appendKeywords === false) {
		console.log("saving appendKeywords: ", inputData.appendKeywords);
		localStorage.appendKeywords = inputData.appendKeywords;
	}

	if(inputData.appendTable || inputData.appendTable === false) {
		console.log("saving appendTable: ", inputData.appendTable);
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

	const keywords = localStorage.keywords;
	const userID = localStorage.userID;
	const userToken = localStorage.userToken;
	const appendKeywordsString = localStorage.appendKeywords;
	const appendTableString = localStorage.appendTable;
	const conversionRate = localStorage.conversionRate;
	const timeLimit = localStorage.timeLimit;
	const minViews = localStorage.minViews;
	const minCompetition = localStorage.minCompetition;
	const minPotentialViews = localStorage.minPotentialViews;
	const minPotentialBuyers = localStorage.minPotentialBuyers;

	if(keywords) {
		inputData.keywords = keywords;
		keywordsElement.value = keywords;
	}

	if(userID) {
		inputData.userID = userID;
		userIdElement.value = userID;
	}

	if(userToken) {
		inputData.userToken = userToken;
		userTokenElement.value = userToken;
	}

	if(appendKeywordsString) {
		const appendKeywords = JSON.parse(appendKeywordsString);
		inputData.appendKeywords = appendKeywords;
		appendKeywordsElement.value.checked = appendKeywords;
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
	appendKeywordsElement.disabled = !appendKeywordsElement.disabled;
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

async function getAssociatedKeywords(keyword) {
	console.log(keyword);

	const postData = { "keyword": keyword };
	const keywordsObject = await getJsonPost(keywordListApiUrlEncoded, postData);

	if (keywordsObject === undefined) {
		return [];
	}

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

	if (!inputDataCopy.keywords || !inputDataCopy.userID || !inputDataCopy.userToken) {
		return;
	}

	toggleInput();

	inputDataCopy.keywords = inputDataCopy.keywords.trim().toLowerCase();

	if(!inputDataCopy.appendTable) {
		keywordTable.clear().draw();
	}
	
	let keywordQueue = inputDataCopy.keywords.split("\n");

	while(keywordQueue.length > 0) {
		let processingKeyword = keywordQueue.pop().trim().toLowerCase();
		
		const associatedKeywords = await getAssociatedKeywords(processingKeyword);
		associatedKeywords.push(processingKeyword);

		for (let associatedKeyword of associatedKeywords) {
			associatedKeyword = associatedKeyword.trim().toLowerCase().replace(phoneCaseString, "");

			let isDuplicate = false;

			keywordTable.rows().every(function (rowIndex, tableLoop, rowLoop) {
				let tableKeywordInfo = this.data();
				if (associatedKeyword === tableKeywordInfo.name) {
					isDuplicate = true;
					return false;
				}
			});

			if(isDuplicate) {
				continue;
			}

			if(inputDataCopy.appendKeywords) {
				associatedKeyword = `${associatedKeyword}${phoneCaseString}`;
			}

			const associatedKeywordInfoObject = await getKeywordInfo(inputDataCopy, associatedKeyword);

			const potentialViews = associatedKeywordInfoObject.views / associatedKeywordInfoObject.competition;
			const potentialBuyers = potentialViews * inputDataCopy.conversionRate;

			const associatedKeywordInfo = {
				name: associatedKeywordInfoObject.keyword.trim().toLowerCase().replace(phoneCaseString, ""),
				views: associatedKeywordInfoObject.views,
				competition: associatedKeywordInfoObject.competition,
				potentialViews: potentialViews.toFixed(1),
				potentialBuyers: potentialBuyers.toFixed(1),
			};

			console.log(associatedKeywordInfo);

			if(associatedKeywordInfo.views < inputDataCopy.minViews
			|| associatedKeywordInfo.competition < inputDataCopy.minCompetition
			|| associatedKeywordInfo.potentialViews < inputDataCopy.minPotentialViews
			|| associatedKeywordInfo.potentialBuyers < inputDataCopy.minPotentialBuyers) {

				continue;
			}

			keywordTable.row.add(associatedKeywordInfo).draw();
		};
	}

	toggleInput();
}

async function getKeywordSuggestionsRecursively() {
	const inputDataCopy = structuredClone(inputData);

	if (!inputDataCopy.keywords || !inputDataCopy.userID || !inputDataCopy.userToken) {
		return;
	}

	toggleInput();

	inputDataCopy.keywords = inputDataCopy.keywords.trim().toLowerCase();

	if(!inputDataCopy.appendTable) {
		keywordTable.clear().draw();
	}

	
	let keywordQueue = inputDataCopy.keywords.split("\n");
	let processedKeywords = [];

	const timeLimitMS = 60 * 1000 * inputDataCopy.timeLimit;

	const startTime = Date.now();
	let currentTime = Date.now();

	const timer = setInterval(() => {
		currentTime = Date.now();
		
		const timLeftMS = timeLimitMS - (currentTime - startTime);
		if (timLeftMS > 0) {
			const timeLeftTotalSec = timLeftMS / 1000;
			const timeLeftMin = Math.floor(timeLeftTotalSec / 60);
			const timeLeftSec = (timeLeftTotalSec - 60 * timeLeftMin);

			const timeLeftMinString = timeLeftMin.toString().padStart(2, "0");
			const timeLeftSecString = timeLeftSec.toFixed(0).padStart(2, "0");

			getKeywordSuggestionsRecursivelyButtonElement.innerText = `${getKeywordSuggestionRecursivelyString} (${timeLeftMinString}:${timeLeftSecString})`;
		}
	}, 500);

	while(keywordQueue.length > 0
	&& currentTime - startTime < timeLimitMS) {
		let processingKeyword = keywordQueue.pop().trim().toLowerCase();

		processedKeywords.push(processingKeyword);
		
		const associatedKeywords = await getAssociatedKeywords(processingKeyword);
		associatedKeywords.push(processingKeyword);

		for (let associatedKeyword of associatedKeywords) {
			associatedKeyword = associatedKeyword.trim().toLowerCase().replace(phoneCaseString, "");

			let isDuplicate = false;

			keywordTable.rows().every(function (rowIndex, tableLoop, rowLoop) {
				let tableKeywordInfo = this.data();
				if (associatedKeyword === tableKeywordInfo.name) {
					isDuplicate = true;
					return false;
				}
			});

			if(isDuplicate) {
				continue;
			}

			if(inputDataCopy.appendKeywords) {
				associatedKeyword = `${associatedKeyword}${phoneCaseString}`;
			}

			const associatedKeywordInfoObject = await getKeywordInfo(inputDataCopy, associatedKeyword);

			if (associatedKeywordInfoObject === undefined) {
				continue;
			}

			const potentialViews = associatedKeywordInfoObject.views / associatedKeywordInfoObject.competition;
			const potentialBuyers = potentialViews * inputDataCopy.conversionRate;

			const associatedKeywordInfo = {
				name: associatedKeywordInfoObject.keyword.trim().toLowerCase().replace(phoneCaseString, ""),
				views: associatedKeywordInfoObject.views,
				competition: associatedKeywordInfoObject.competition,
				potentialViews: potentialViews.toFixed(1),
				potentialBuyers: potentialBuyers.toFixed(1),
			};

			console.log(associatedKeywordInfo);

			if(associatedKeywordInfo.views < inputDataCopy.minViews
			|| associatedKeywordInfo.competition < inputDataCopy.minCompetition
			|| associatedKeywordInfo.potentialViews < inputDataCopy.minPotentialViews
			|| associatedKeywordInfo.potentialBuyers < inputDataCopy.minPotentialBuyers) {

				continue;
			}

			if(!processedKeywords.includes(associatedKeywordInfo.name)) {
				keywordQueue.push(associatedKeywordInfo.name);
			}

			keywordTable.row.add(associatedKeywordInfo).draw();
		};
	}

	toggleInput();
	clearInterval(timer);
	getKeywordSuggestionsRecursivelyButtonElement.innerText = getKeywordSuggestionRecursivelyString;
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

function onInputKeywords(value) {
	inputData.keywords = value;
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

function onInputAppendKeywords(value) {
	inputData.appendKeywords = value;
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