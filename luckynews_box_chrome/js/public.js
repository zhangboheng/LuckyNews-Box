// Get LocalStorage Information
let getLocalStorageFavourite = localStorage.getItem('favouriteNews');
let getLocalStorageLanguage = localStorage.getItem('language');
let getLocalStorageTotalLimits = localStorage.getItem('totalLimits');
let getLocalStorageOrderSettings = localStorage.getItem('orderSettings');
let getLocalStorageAllUrls = localStorage.getItem('apiArr');
let getLocalStorageBlackList = localStorage.getItem('blackList');
let getLocalStorageFavouriteList = localStorage.getItem('favouriteList');
let getLocalStoragememoryMode = localStorage.getItem('memoryMode');
let getLocalStorageDarkMode = localStorage.getItem('darkMode');
let getLocalStorageMemoryNewsList = localStorage.getItem('memoryNewsList');
let getLocalStorageStyleFontSize = localStorage.getItem('styleFontSize');
let getLocalStorageStyleFontColor = localStorage.getItem('styleFontColor');
let getLocalStorageScrollNewsList = localStorage.getItem('scrollNewsList');
// Get All Urls Array
let urlsArr = [];
// Insert All Info To Array
let newsArr = [];
let newsFavouriteArr = [];
// Export Favourite News List
let newsInfoBox = [];
let newsAll = [];
// Test Click Or Double Click Timer
let clickTimer = null;

// Get Current Date
function getCurrentDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  let day = currentDate.getDate().toString().padStart(2, '0');
  return year + month + day;
}

// News Tab Public Show Tips
function showNewsNotingTips() {
  $('#newsList').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' });
  if (getLocalStorageLanguage === 'zh-CN') {
    $('#newsList ul').append(`<li style="text-align:center">什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。</li>`);
  } else if (getLocalStorageLanguage === 'zh-TW') {
    $('#newsList ul').append(`<li style="text-align:center">什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。</li>`);
  } else if (getLocalStorageLanguage === 'en') {
    $('#newsList ul').append(`<li style="text-align:center">Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.</li>`);
  } else if (getLocalStorageLanguage === 'jp') {
    $('#newsList ul').append(`<li style="text-align:center">何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。</li>`);
  }
}
// Favourite Tab Public Show Tips
function showFavouriteNotingTips() {
  $('#favouriteList').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' });
  getLocalStorageLanguage = localStorage.getItem('language');
  if (getLocalStorageLanguage === 'zh-CN') {
    $('#favouriteList ul').append(`<li style="text-align:center">什么都没有，请收藏你的第一篇新闻。</li>`);
  } else if (getLocalStorageLanguage === 'zh-TW') {
    $('#favouriteList ul').append(`<li style="text-align:center">什麼都沒有，請收藏你的第一篇新聞。</li>`);
  } else if (getLocalStorageLanguage === 'en') {
    $('#favouriteList ul').append(`<li style="text-align:center">Nothing For You, Please Bookmark Your First News.</li>`);
  } else if (getLocalStorageLanguage === 'jp') {
    $('#favouriteList ul').append(`<li style="text-align:center">何もありません。最初のニュースをブックマークしてください。</li>`);
  }
}
// Random Password Method
function generateRandomPassword(length) {
  var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var password = '';
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet.charAt(randomIndex);
  }
  return password;
}
// Fisher-Yates shuffle algorithm
function shuffleArray(randomArr) {
  for (var i = randomArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = randomArr[i];
    randomArr[i] = randomArr[j];
    randomArr[j] = temp;
  }
  return randomArr;
}
// Normalize URL
function normalizeURL(url, full_url) {
  if (url.startsWith('//')) {
    url = new URL(full_url).protocol + url;
  }

  if (url.startsWith('/')) {
    url = new URL(full_url).origin + url;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  return url;
}
// Export JSON Public Method
function downloadJSON(content, fileName) {
  let currentTime = getCurrentDate();
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
  let downloadAnchor = $('<a></a>')
    .attr('href', dataStr)
    .attr('download', fileName + `_${currentTime}` + '.json')
    .appendTo('body');
  downloadAnchor[0].click();
  downloadAnchor.remove();
}
// Get Select All Checkbox Status
function getSelectAllCheckboxStatus(_tableId, _selectAllName) {
  let checkTrueOrFalse = []
  $(`#${_tableId} input[type="checkbox"]:gt(0)`).each(function () {
    if (!$(this).is(':checked')) {
      $(`.${_selectAllName}`).prop('checked', false);
      return false;
    } else {
      checkTrueOrFalse.push($(this).is(':checked'));
    }
  });
  if (checkTrueOrFalse.length == $(`#${_tableId} input[type="checkbox"]:gt(0)`).length && checkTrueOrFalse.length != 0) {
    $(`.${_selectAllName}`).prop('checked', true);
  } else {
    $(`.${_selectAllName}`).prop('checked', false);
  }
}
// API, DOM and RSS Rules Checkbox Select All Or Not Public Methods
function checkboxSelectAllRules(_checkboxclass, _tableId) {
  $(`.${_checkboxclass}`).change(function () {
    var isChecked = $(this).is(':checked');
    $(`#${_tableId} input[type="checkbox"]`).prop('checked', isChecked);
    toStorageUrls();
  });
}
// API, DOM and RSS Rules Name Search Public Methods
function searchRulesNamePublic(_searchBtn, _searchValue, _searchId) {
  let nameRulesSearchBtn = document.getElementById(_searchBtn);
  let nameRulesSearch = document.getElementById(_searchValue);
  nameRulesSearchBtn.addEventListener("click", function () {
    let filter = nameRulesSearch.value.toLowerCase();
    let table = document.getElementById(_searchId);
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      let name = rows[i].getElementsByTagName("td")[1];
      if (name) {
        let textValue = name.getElementsByTagName("input")[0].value.toLowerCase();
        if (textValue.indexOf(filter) > -1) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  });
}
// Click Keyboard Enter to Search Public Methods
function keyboardEnterSearch(_id) {
  const searchButton = document.getElementById(_id);
  document.addEventListener("keydown", function (event) {
      if (event.key === 'Enter') {
          searchButton.click();
      }
  });
}
// Check Top Or Bottom Button Valid
function updateButtonState(_sharp) {
  $(`#${_sharp} tr`).each(function() {
    let moveUpButton = $(this).find('.move-up');
    let moveDownButton = $(this).find('.move-down');
    if ($(this).prev('tr').length == 0) {
      moveUpButton.hide();
    } else {
      moveUpButton.show();
    }
    if ($(this).next('tr').length == 0) {
      moveDownButton.hide();
    } else {
      moveDownButton.show();
    }
  });
}