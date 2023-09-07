// Get LocalStorage Information
let getLocalStorageFavourite = localStorage.getItem('favouriteNews');
let getLocalStorageLanguage = localStorage.getItem('language');
let getLocalStorageTotalLimits = localStorage.getItem('totalLimits');
let getLocalStorageOrderSettings = localStorage.getItem('orderSettings');
let getLocalStorageAllUrls = localStorage.getItem('apiArr');
let getLocalStorageBlackList = localStorage.getItem('blackList');
let getLocalStoragememoryMode = localStorage.getItem('memoryMode');
let getLocalStorageDarkMode = localStorage.getItem('darkMode');
let getLocalStorageMemoryNewsList = localStorage.getItem('memoryNewsList');
let getLocalStorageStyleFontSize = localStorage.getItem('styleFontSize');
let getLocalStorageStyleFontColor = localStorage.getItem('styleFontColor');
// Get All Urls Array
let urlsArr = [];
// Insert All Info To Array
let newsArr = [];
let newsFavouriteArr = []; // Export Favourite News List
let newsInfoBox = [];
let newsAll = []; // Export News List
let failedUrls = [];

$(document).ready(function () { // Set Default Settings
    getDefault();
    // Change Menu Tabs Function
    chnangeMenu();
    // Settings Effect
    settingsEffect();
    // Set API Rules Check
    apiRulesCheck();
});

// Set Default Settings
function getDefault() { // Get Default Language
    if (!getLocalStorageLanguage) {
        localStorage.setItem('language', 'en');
    }
    // Get Default Total Limits
    if (!getLocalStorageTotalLimits) {
        localStorage.setItem('totalLimits', '50');
    }
    // Get Default Order Sittings
    if (!getLocalStorageOrderSettings) {
        localStorage.setItem('orderSettings', 'default');
    } else {
        if (getLocalStorageOrderSettings === 'short') {
            $('#short').prop('checked', true);
        } else if (getLocalStorageOrderSettings === 'long') {
            $('#long').prop('checked', true);
        } else if (getLocalStorageOrderSettings === 'random') {
            $('#random').prop('checked', true);
        } else {
            $('#default').prop('checked', true);
        }
    }
    // Get Default Style Font Size
    if (!getLocalStorageStyleFontSize) {
        localStorage.setItem('styleFontSize', '14');
        getLocalStorageStyleFontSize = localStorage.getItem('styleFontSize');
        $("#slider input").val(getLocalStorageStyleFontSize);
        $("#sliderValue").text(getLocalStorageStyleFontSize);
        $("#sliderValue").css('font-size', getLocalStorageStyleFontSize + 'px');
    }
    // Get Default Style Font Color
    if (!getLocalStorageStyleFontColor) {
        localStorage.setItem('styleFontColor', 'rgb(0, 0, 0)');
    }
    // Get Dark Mode Button Status
    if (getLocalStorageDarkMode === 'open') {
        $('#darkModeSwitch').prop('checked', true);
        $('html').addClass('dark-mode');
    }
    // Get Favourite News List
    if (!getLocalStorageFavourite) {
        getLocalStorageFavourite = [];
        newsFavouriteArr = getLocalStorageFavourite;
        localStorage.setItem('favouriteNews', JSON.stringify(getLocalStorageFavourite));
    }
    // Update All Local Storage
    updateAllLocalStorage();
    $('#editTotal').val(getLocalStorageTotalLimits);
    $('#blacklistFilter').val(getLocalStorageBlackList);
    if (!getLocalStoragememoryMode) {
        $('#memoryMode').prop('checked', false);
        localStorage.setItem('memoryMode', 'close');
        showNewsNotingTips()
    } else {
        if (getLocalStoragememoryMode === "open") {
            $('#memoryMode').prop('checked', true);
            $('.tabcontent:first').css({ 'display': 'block' });
            if (getLocalStorageMemoryNewsList) {
                $(".switch input").prop('checked', true);
                let parseNewsList = JSON.parse(getLocalStorageMemoryNewsList);
                // Filter Default News Items List and Favourite items List
                if (JSON.parse(getLocalStorageFavourite).length > 0) {
                    parseNewsList = parseNewsList.filter(function (value, index) {
                        return JSON.parse(getLocalStorageFavourite).map(x => x.title).indexOf(value.title) === -1;
                    });
                }
                // Export Table use
                newsAll = parseNewsList;
                // Set Total News
                $('#totalNews').text(parseNewsList.length);
                for (let i = 0; i < parseNewsList.length; i++) {
                    $('#newsList ul').append(`<li><div><span>${i + 1 + '.'
                        }</span><a style="color:${getLocalStorageStyleFontColor}" href="${parseNewsList[i].links
                        }"  target="_blank">${parseNewsList[i].title
                        }</a></div><div><button class="newsfavourite">+</button></div></li>`);
                }
            } else {
                showNewsNotingTips();
            }
        } else {
            $('#memoryMode').prop('checked', false);
            showNewsNotingTips();
        }
    }
    $("#slider input").val(getLocalStorageStyleFontSize);
    $("#sliderValue").text(getLocalStorageStyleFontSize);
    $("#sliderValue").css('font-size', getLocalStorageStyleFontSize + 'px');
    getSettingRulesList();
}

// Change Menu Tabs Function
function chnangeMenu() { // Default First Tabs High Lighting Show
    $('.tablinks:eq(0)').addClass('active');
    $('.tabcontent:eq(1)').hide();
    $('.tablinks').click(function (e) {
        let paramId = $(this).attr("id");
        $('#' + paramId + 'List').show();
        $('#' + paramId + 'List').siblings().not('.tab').hide();
        paramId === 'news' ? $('#tools').show() : $('#tools').hide();
        if (paramId === 'favourite') {
            $('#favouritetools').show();
            // Update Favourite News List
            updateFavouriteNewsList();
        } else {
            $('.tabcontent:eq(1)').hide();
            $('#favouritetools').hide();
        }
        paramId === 'favourite' ? $('.tabcontent:eq(1)').show() : $('.tabcontent:eq(1)').hide();
        $('.tablinks').removeClass('active');
        $(this).addClass('active');
        $(".settingflow").hide();
        if (paramId == 'settings') {
            $(".settingflow:first").show();
            $('.tabsettings').removeClass('active');
            // Default First Settings High Lighting Show
            $('.tabsettings:eq(0)').addClass('active');
            $(".settingflow:first").show();
            $('.tabsettings').click(function (e) {
                let paramId = $(this).attr("id");
                $('#' + paramId + 'List').show();
                $('#' + paramId + 'List').siblings().not('.columntab').hide();
                $('.tabsettings').removeClass('active');
                $(this).addClass('active');
            });
        }
    });
}

// Settings Effect
function settingsEffect() { // Change Total Limits
    $("#editTotal").on("blur", function () {
        let value = parseInt($(this).val());
        if (value === "" || isNaN(value) || value < 10) {
            $(this).val(10);
        }
        localStorage.setItem('totalLimits', parseInt($(this).val()));
    });
    // Change Blacklist Filter Value
    $('#blacklistFilter').on("blur", function () {
        localStorage.setItem('blackList', $(this).val());
    });
    // Check Memory Mode if or not
    $('#memoryMode').on('change', function () {
        if ($(this).is(':checked')) {
            localStorage.setItem('memoryMode', 'open');
        } else {
            localStorage.setItem('memoryMode', 'close');
        }
    });
    // Check Dark Mode if or not
    $('#darkModeSwitch').on('change', function () {
        if ($(this).is(':checked')) {
            localStorage.setItem('darkMode', 'open');
            $('html').addClass('dark-mode');
        } else {
            localStorage.setItem('darkMode', 'close');
            $('html').removeClass('dark-mode');
        }
    });
    // Select Check Radio
    $("input[name='order_settings']").on("change", function () {
        let selectedValue = $("input[name='order_settings']:checked").val();
        localStorage.setItem('orderSettings', selectedValue);
    });
    // Accordion Style
    $(".accordion").click(function () {
        $(this).toggleClass("target");
        let panel = $(this).next();
        panel.slideToggle();
        panel.css("max-height", panel[0].scrollHeight + "px");
    });
    // Slider Effect
    $("#slider input").on("change", function () {
        let value = $(this).val();
        $("#sliderValue").text(value);
        $("#sliderValue").css('font-size', value + 'px');
        localStorage.setItem('styleFontSize', value);
        $('#newsList ul li').css('font-size', value + 'px');
        $('#favouriteList ul li').css('font-size', value + 'px');
    });
    $('#newsList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
    $('#favouriteList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
    // Font Color Effect
    $(".coloroption").click(function () {
        let backgroundColor = $(this).css("background-color");
        localStorage.setItem('styleFontColor', backgroundColor);
        $('#newsList ul li').css('color', backgroundColor);
        $('#newsList ul li a').css('color', backgroundColor);
        $('#favouriteList ul li').css('color', backgroundColor);
        $('#favouriteList ul li a').css('color', backgroundColor);
    });
    $('#newsList ul li').css('color', getLocalStorageStyleFontColor);
    $('#newsList ul li a').css('color', getLocalStorageStyleFontColor);
    $('#favouriteList ul li').css('color', getLocalStorageStyleFontColor);
    $('#favouriteList ul li a').css('color', getLocalStorageStyleFontColor);
}

// Get News List
function init() {
    let loadingTips = layer.load(); // Set loading Tips
    let checkedUrls = urlsArr.filter(item => item.checked);
    $('#newsList ul').empty();
    for (let i = 0; i < checkedUrls.length; i++) {
        let request = $.ajax({ url: checkedUrls[i].url, method: "GET" });
        newsArr.push(request);
    }
    $.when(...newsArr).then(function (...response) {
        if (!Array.isArray(response[0]) || typeof response[0] === 'string') {
            if (response[1] === 'success') {
                for (let i = 0; i < checkedUrls.length; i++) {
                    if (checkedUrls[i].type === 'API') {
                        if (checkedUrls[i].name === $('#zhihu').val()) {
                            let arr = response[0].data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].target.title.trim(),
                                    links: `https://www.zhihu.com/question/${arr[j].target.id
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#tencent').val()) {
                            let arr = response[0].data.list;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].title.trim(),
                                    links: `${arr[j].url
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#toutiao').val()) {
                            let arr = response[0].data.data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].title.trim(),
                                    links: `https://www.toutiao.com/article/${arr[j].item_id
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#weibo').val()) {
                            let arr = response[0].data.cards[0].card_group;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].desc.trim(),
                                    links: `${arr[j].scheme
                                        }`
                                })
                            }
                        }
                    } else if (checkedUrls[i].type === 'DOM') {
                        if (checkedUrls[i].name === $(`#${checkedUrls[i].name.replace(/\s+/g, '')
                            }`).val()) {
                            let htmlFull = $.parseHTML(response[0]);
                            let $articles = $(htmlFull).find(`${checkedUrls[i].rules
                                }`);
                            $articles.each(function () { // Some Webistes a tag not start with https or http
                                let paramName = `${$(this).attr('href')
                                    }`.indexOf('/') === 0 ? `${$(this).attr('href')
                                    }` : `/${$(this).attr('href')
                                    }`;
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + $(this).text().trim(),
                                    links: new URL(checkedUrls[i].url).origin + paramName
                                });
                            });
                        }
                    } else {
                        if (checkedUrls[i].name === $(`#${checkedUrls[i].name.replace(/\s+/g, '')
                            }`).val()) {
                            let $xml = $(response[0]);
                            $xml.find("item").each(function () {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + $(this).find("title").text().trim(),
                                    links: $(this).find("link").text()
                                })
                            });
                        }
                    }
                }
            } else {
                for (let i = 0; i < checkedUrls.length; i++) {
                    if (getLocalStorageLanguage === 'zh-CN') {
                        newsInfoBox.push({
                            title: `请检查 ${checkedUrls[i].name
                                } 源，无法接收到信息了。`, links: '#'
                        })
                    } else if (getLocalStorageLanguage === 'zh-TW') {
                        newsInfoBox.push({
                            title: `請檢查 ${checkedUrls[i].name
                                } 源，無法接收到資訊了。`, links: '#'
                        })
                    } else if (getLocalStorageLanguage === 'en') {
                        newsInfoBox.push({
                            title: `Please Check ${checkedUrls[i].name
                                } Source，Can't Get Infomation.`, links: '#'
                        })
                    }
                }
            }
        } else {
            for (let i = 0; i < response.length; i++) {
                if (response[i][1] === 'success') {
                    if (checkedUrls[i].type === 'API') {
                        if (checkedUrls[i].name == $('#zhihu').val()) {
                            let arr = response[i][0].data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].target.title.trim(),
                                    links: `https://www.zhihu.com/question/${arr[j].target.id
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name == $('#tencent').val()) {
                            let arr = response[i][0].data.list;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].title.trim(),
                                    links: `${arr[j].url
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#toutiao').val()) {
                            let arr = response[i][0].data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].title.trim(),
                                    links: `https://www.toutiao.com/article/${arr[j].item_id
                                        }`
                                })
                            }
                        }
                        if (checkedUrls[i].name == $('#weibo').val()) {
                            let arr = response[i][0].data.cards[0].card_group;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + arr[j].desc.trim(),
                                    links: `${arr[j].scheme
                                        }`
                                })
                            }
                        }
                    } else if (checkedUrls[i].type === 'DOM') {
                        if (checkedUrls[i].name === $(`#${checkedUrls[i].name.replace(/\s+/g, '')
                            }`).val()) {
                            let htmlFull = $.parseHTML(response[i][0]);
                            let $articles = $(htmlFull).find(`${checkedUrls[i].rules
                                }`);
                            $articles.each(function (index, val) {
                                let paramName = `${$(this).attr('href')
                                    }`.indexOf('/') === 0 ? `${$(this).attr('href')
                                    }` : `/${$(this).attr('href')
                                    }`;
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + $(this).text().trim(),
                                    links: new URL(checkedUrls[i].url).origin + paramName
                                });
                            })
                        }
                    } else {
                        if (checkedUrls[i].name === $(`#${checkedUrls[i].name.replace(/\s+/g, '')
                            }`).val()) {
                            let $xml = $(response[i][0]);
                            $xml.find("item").each(function () {
                                newsInfoBox.push({
                                    title: `【${checkedUrls[i].name
                                        }】` + $(this).find("title").text().trim(),
                                    links: $(this).find("link").text()
                                })
                            });
                        }
                    }
                } else {
                    for (let i = 0; i < checkedUrls.length; i++) {
                        if (getLocalStorageLanguage === 'zh-CN') {
                            newsInfoBox.push({
                                title: `请检查 ${checkedUrls[i].name
                                    } 源，无法接收到信息了。`, links: '#'
                            })
                        } else if (getLocalStorageLanguage === 'zh-TW') {
                            newsInfoBox.push({
                                title: `請檢查 ${checkedUrls[i].name
                                    } 源，無法接收到資訊了。`, links: '#'
                            })
                        } else if (getLocalStorageLanguage === 'en') {
                            newsInfoBox.push({
                                title: `Please Check ${checkedUrls[i].name
                                    } Source，Can't Get Infomation.`, links: '#'
                            })
                        }
                    }
                }
            }
        }
    }).done(response => {
        $('.tabcontent:first').css({ 'display': 'block' });
        layer.close(loadingTips); // Close Loading Tips
        let realLengthNewsInfoBox = newsInfoBox.slice(0, getLocalStorageTotalLimits);
        if (realLengthNewsInfoBox.length == 0) {
            layer.close(loadingTips); // Close Loading Tips
            showNewsNotingTips();
        } else {
            if (getLocalStorageOrderSettings === 'short') {
                realLengthNewsInfoBox = realLengthNewsInfoBox.sort((x, y) => x.title.length - y.title.length);
            } else if (getLocalStorageOrderSettings === 'long') {
                realLengthNewsInfoBox = realLengthNewsInfoBox.sort((x, y) => y.title.length - x.title.length);
            } else if (getLocalStorageOrderSettings === 'random') {
                realLengthNewsInfoBox = shuffleArray(realLengthNewsInfoBox);
            }
            // Set Regular Expression filter news list
            if (getLocalStorageBlackList) {
                const regex = new RegExp(`${getLocalStorageBlackList}`, 'g');
                realLengthNewsInfoBox = realLengthNewsInfoBox.filter(item => !item.title.match(regex));
            }
            // Filter Default News Items List and Favourite items List
            if (JSON.parse(getLocalStorageFavourite).length > 0) {
                realLengthNewsInfoBox = realLengthNewsInfoBox.filter(function (value, index) {
                    return JSON.parse(getLocalStorageFavourite).map(x => x.title).indexOf(value.title) === -1;
                });
            }
            // Export Table use
            newsAll = realLengthNewsInfoBox;
            $('#totalNews').text(realLengthNewsInfoBox.length); // Set Total News
            for (let i = 0; i < realLengthNewsInfoBox.length; i++) {
                $('#newsList ul').append(`<li><div><span>${i + 1 + '.'
                    }</span><a style="color:${getLocalStorageStyleFontColor}" href="${realLengthNewsInfoBox[i].links
                    }"  target="_blank">${realLengthNewsInfoBox[i].title
                    }</a></div><div><button class="newsfavourite">+</button></div></li>`);
            }
        }
        $('#newsList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
        $('#newsList ul li').css('color', getLocalStorageStyleFontColor);
        if (getLocalStoragememoryMode === "open") {
            localStorage.setItem('memoryNewsList', JSON.stringify(realLengthNewsInfoBox));
        } else {
            localStorage.removeItem('memoryNewsList');
        }
    }).fail(response => {
        layer.close(loadingTips); // Close Loading Tips
        $('.tabcontent:first').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' })
        if (getLocalStorageLanguage === 'zh-CN') {
            layer.msg('有订阅源状态发生错误，请及检查后再尝试')
            $('#newsList ul').append(`<li style="text-align:center">什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。</li>`);
        } else if (getLocalStorageLanguage === 'zh-TW') {
            layer.msg('有訂閱源狀態發生錯誤，請及檢查後再嘗試')
            $('#newsList ul').append(`<li style="text-align:center">什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。</li>`);
        } else if (getLocalStorageLanguage === 'en') {
            layer.msg('There is an error in the source status, please check and try again')
            $('#newsList ul').append(`<li style="text-align:center">Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.</li>`);
        }
        $('#newsList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
        $('#newsList ul li').css('color', getLocalStorageStyleFontColor);
    });
}

// News Tab Public Show Tips
function showNewsNotingTips() {
    $('.tabcontent:first').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' })
    if (getLocalStorageLanguage === 'zh-CN') {
        $('#newsList ul').append(`<li style="text-align:center">什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。</li>`);
    } else if (getLocalStorageLanguage === 'zh-TW') {
        $('#newsList ul').append(`<li style="text-align:center">什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。</li>`);
    } else if (getLocalStorageLanguage === 'en') {
        $('#newsList ul').append(`<li style="text-align:center">Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.</li>`);
    }
}

// Favourite Tab Public Show Tips
function showFavouriteNotingTips() {
    $('.tabcontent:eq(1)').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' })
    if (getLocalStorageLanguage === 'zh-CN') {
        $('#favouriteList ul').append(`<li style="text-align:center">什么都没有，请收藏你的第一篇新闻。</li>`);
    } else if (getLocalStorageLanguage === 'zh-TW') {
        $('#favouriteList ul').append(`<li style="text-align:center">什麼都沒有，請收藏你的第一篇新聞。</li>`);
    } else if (getLocalStorageLanguage === 'en') {
        $('#favouriteList ul').append(`<li style="text-align:center">Nothing For You, Please Bookmark Your First News.</li>`);
    }
}

// Switch Check Button
$(".switch input").on("change", function () {
    let isChecked = $(this).is(":checked");
    if (isChecked) {
        updateAllLocalStorage();
        getSettingRulesList();
        init();
    } else {
        updateAllLocalStorage(); // Update Local Storage
        $('#totalNews').text('0');
        $('#newsList ul').empty();
        $('.tabcontent:first').css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' })
        if (getLocalStorageLanguage === 'zh-CN') {
            $('#newsList ul').append(`<li style="text-align:center">什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。</li>`);
        } else if (getLocalStorageLanguage === 'zh-TW') {
            $('#newsList ul').append(`<li style="text-align:center">什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。</li>`);
        } else if (getLocalStorageLanguage === 'en') {
            $('#newsList ul').append(`<li style="text-align:center">Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.</li>`);
        }
        $('#newsList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
        $('#newsList ul li').css('color', getLocalStorageStyleFontColor);
    }
    urlsArr = [];
    newsArr = [];
    newsInfoBox = [];
    newsAll = [];
});

// Search News List
$("#searchBtn").on('click', function () {
    let keywords = $('#nameItem').val();
    const endwords = keywords.toUpperCase();
    const parentUl = document.getElementById("newsList");
    const childLi = parentUl.getElementsByTagName('li');
    for (let i = 0; i < childLi.length; i++) {
        let txtValue = childLi[i].textContent || childLi[i].innerText;
        if (txtValue.toUpperCase().indexOf(endwords) > -1) {
            childLi[i].style.display = "";
        } else {
            childLi[i].style.display = "none";
        }
    }
});

// Search Favourite List
$("#searchFavouriteBtn").on('click', function () {
    let keywords = $('#nameFavouriteItem').val();
    const endwords = keywords.toUpperCase();
    const parentUl = document.getElementById("favouriteList");
    const childLi = parentUl.getElementsByTagName('li');
    for (let i = 0; i < childLi.length; i++) {
        let txtValue = childLi[i].textContent || childLi[i].innerText;
        if (txtValue.toUpperCase().indexOf(endwords) > -1) {
            childLi[i].style.display = "";
        } else {
            childLi[i].style.display = "none";
        }
    }
});

// Click Keyboard Enter to Search
const searchButton = document.getElementById("searchBtn");
document.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Click Keyboard Enter to Search
const searchFavouriteButton = document.getElementById("searchFavouriteBtn");
document.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        searchFavouriteButton.click();
    }
});

// Export News List
const exportExcel = document.getElementById("exportExcel");
exportExcel.addEventListener("click", function () {
    try {
        const headers = Object.keys(newsAll[0]);
        let csv = headers.join(",") + "\n";
        newsAll.forEach(row => {
            let values = headers.map(header => row[header]);
            csv += values.join(",") + "\n";
        });
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "news.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) { // Get Language Storage Again
        let exportLocalStorageLanguage = localStorage.getItem('language');
        if (exportLocalStorageLanguage === 'zh-CN') {
            layer.msg('导出什么都没有，你点击开始按钮了吗？')
        } else if (exportLocalStorageLanguage === 'zh-TW') {
            layer.msg('導出什麼都沒有，你點擊啟動按鈕了嗎？')
        } else if (exportLocalStorageLanguage === 'en') {
            layer.msg('There is nothing for you, do you click start button?')
        }
    }
});
// Export Favourite News List
const exportFavouriteExcel = document.getElementById("exportFavouriteExcel");
exportFavouriteExcel.addEventListener("click", function () {
    try {
        const headers = Object.keys(newsFavouriteArr[0]);
        let csv = headers.join(",") + "\n";
        newsFavouriteArr.forEach(row => {
            let values = headers.map(header => row[header]);
            csv += values.join(",") + "\n";
        });
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "news.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) { // Get Language Storage Again
        let exportLocalStorageLanguage = localStorage.getItem('language');
        if (exportLocalStorageLanguage === 'zh-CN') {
            layer.msg('导出什么都没有')
        } else if (exportLocalStorageLanguage === 'zh-TW') {
            layer.msg('導出什麼都沒有')
        } else if (exportLocalStorageLanguage === 'en') {
            layer.msg('There is nothing for you')
        }
    }
});

// Update All LocalStorage Infomation
function updateAllLocalStorage() {
    getLocalStorageFavourite = localStorage.getItem('favouriteNews');
    getLocalStorageLanguage = localStorage.getItem('language');
    getLocalStorageTotalLimits = localStorage.getItem('totalLimits');
    getLocalStorageOrderSettings = localStorage.getItem('orderSettings');
    getLocalStorageAllUrls = localStorage.getItem('apiArr');
    getLocalStorageBlackList = localStorage.getItem('blackList');
    getLocalStoragememoryMode = localStorage.getItem('memoryMode');
    getLocalStorageStyleFontSize = localStorage.getItem('styleFontSize');
    getLocalStorageStyleFontColor = localStorage.getItem('styleFontColor');
}

// Update Favourite News List
function updateFavouriteNewsList() {
    $('#favouriteList ul').empty();
    let favouriteArr;
    try {
        favouriteArr = JSON.parse(getLocalStorageFavourite);
    } catch (e) {
        favouriteArr = getLocalStorageFavourite;
    }
    if (favouriteArr.length > 0) {
        $('.tabcontent:eq(1)').css("display", "block");
        $('#totalFavouriteNews').text(favouriteArr.length)
        newsFavouriteArr = favouriteArr;
        for (let i = 0; i < favouriteArr.length; i++) {
            $('#favouriteList ul').append(`<li><div><span>${i + 1 + '.'
                }</span><a style="color:${getLocalStorageStyleFontColor}" href="${favouriteArr[i].links
                }"  target="_blank">${favouriteArr[i].title
                }</a></div><div><button class="removenewsfavourite">-</button></div></li>`);
        }
    } else {
        newsFavouriteArr = [];
        showFavouriteNotingTips();
    }
    $('#favouriteList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
    $('#favouriteList ul li').css('color', getLocalStorageStyleFontColor);
}

// Set API Rules Check
function apiRulesCheck() {
    let savedState = localStorage.getItem('checkboxState');
    if (savedState) {
        let state = JSON.parse(savedState);
        $('.checkbox').each(function (index) {
            $(this).prop('checked', state[index]);
        });
    }
}

// Listen .sourcename Value Change
$(document).on('click', '.sourcename', function () {
    $(this).closest('tr').find('.checkbox').prop('checked', false);
});

// Listen .sourcelink Value change
$(document).on('click', '.sourcelink', function () {
    $(this).closest('tr').find('.checkbox').prop('checked', false);
});

// Listen .ruleselement Value Change
$(document).on('click', '.ruleselement', function () {
    $(this).closest('tr').find('.checkbox').prop('checked', false);
});

// Set Dom Rules Click Add
$(document).on('click', '.sourceadd', function () {
    let rowCount = $('#domList tr').length;
    let randomPassword = generateRandomPassword(12)
    if (rowCount === 2) {
        $('#domList').append(`
            <tr>
                <td><input type="checkbox" class="checkbox" name="${randomPassword + 'checkbox'
            }"></td>
                <td><input type="text" value="" name="${randomPassword + 'name'
            }" placeholder="Luckydesigner" class="sourcename"></td>
                <td><input type="text" value="" name="${randomPassword + 'link'
            }" placeholder="https://www.luckydesigner.space/" class="sourcelink"></td>
                <td><input type="text" value="" name="${randomPassword + 'rules'
            }" placeholder="article h2 a" class="ruleselement"></td>
                <td><span class="sourcestatus">-</span></td>
                <td><span class="sourcestype">DOM</span></td>
                <td><input type="button" class="sourcedel" value="-" name="${randomPassword + 'del'
            }" title="Delete"></td>
            </tr>    
        `);
    } else {
        $('#domList .checkbox:last').each(function () {
            let sourceName = $(this).closest('tr').find('.sourcename:first').val();
            let sourceLink = $(this).closest('tr').find('.sourcelink:first').val();
            let elements = $(this).closest('tr').find('.ruleselement:first').val();
            if (sourceName && sourceLink && elements) {
                $('#domList').append(`
                    <tr>
                        <td><input type="checkbox" class="checkbox" name="${randomPassword + 'checkbox'
                    }"></td>
                        <td><input type="text" value="" name="${randomPassword + 'name'
                    }" placeholder="Luckydesigner" class="sourcename"></td>
                        <td><input type="text" value="" name="${randomPassword + 'link'
                    }" placeholder="https://www.luckydesigner.space/" class="sourcelink"></td>
                        <td><input type="text" value="" name="${randomPassword + 'rules'
                    }" placeholder="article h2 a" class="ruleselement"></td>
                        <td><span class="sourcestatus">-</span></td>
                        <td><span class="sourcestype">DOM</span></td>
                        <td><input type="button" class="sourcedel" value="-" name="${randomPassword + 'del'
                    }" title="Delete"></td>
                    </tr>    
                `);
            } else {
                let sourceAddLocalStorageLanguage = localStorage.getItem('language');
                if (sourceAddLocalStorageLanguage === 'zh-CN') {
                    layer.msg('请输入 name, link 和 elements')
                } else if (sourceAddLocalStorageLanguage === 'zh-TW') {
                    layer.msg('請輸入 name, link 和 elements')
                } else if (sourceAddLocalStorageLanguage === 'en') {
                    layer.msg('please input name, link and elements')
                }
            }
        });
    }
    $('.panel').css("max-height", $('#domList')[0].scrollHeight + 16 + "px");
});

// Set RSS Rules Click Add
$(document).on('click', '.sourceaddrss', function () {
    let rowCount = $('#rssList tr').length;
    let randomPassword = generateRandomPassword(12);
    if (rowCount === 2) {
        $('#rssList').append(`
            <tr>
                <td><input type="checkbox" class="checkbox" name="${randomPassword + 'checkbox'
            }"></td>
                <td><input type="text" value="" name="${randomPassword + 'name'
            }" placeholder="Luckydesigner" class="sourcename"></td>
                <td><input type="text" value="" name="${randomPassword + 'link'
            }" placeholder="https://www.luckydesigner.space/feed" class="sourcelink"></td>
                <td><input type="text" value="-" name="${randomPassword + 'rules'
            }" placeholder="-" class="ruleselement" disabled></td>
                <td><span class="sourcestatus">-</span></td>
                <td><span class="sourcestype">RSS</span></td>
                <td><input type="button" class="sourcedelrss" value="-" name="${randomPassword + 'del'
            }" title="Delete"></td>
            </tr>
        `);
    } else {
        $('#rssList .checkbox:last').each(function () {
            let sourceName = $(this).closest('tr').find('.sourcename:first').val();
            let sourceLink = $(this).closest('tr').find('.sourcelink:first').val();
            let elements = $(this).closest('tr').find('.ruleselement:first').val();
            if (sourceName && sourceLink && elements) {
                $('#rssList').append(`
                    <tr>
                        <td><input type="checkbox" class="checkbox" name="${randomPassword + 'checkbox'
                    }"></td>
                        <td><input type="text" value="" name="${randomPassword + 'name'
                    }" placeholder="Luckydesigner" class="sourcename"></td>
                        <td><input type="text" value="" name="${randomPassword + 'link'
                    }" placeholder="https://www.luckydesigner.space/feed" class="sourcelink"></td>
                        <td><input type="text" value="-" name="${randomPassword + 'rules'
                    }" placeholder="-" class="ruleselement" disabled></td>
                        <td><span class="sourcestatus">-</span></td>
                        <td><span class="sourcestype">RSS</span></td>
                        <td><input type="button" class="sourcedelrss" value="-" name="${randomPassword + 'del'
                    }" title="Delete"></td>
                    </tr>
                `);
            } else {
                let sourceAddRssLocalStorageLanguage = localStorage.getItem('language');
                if (sourceAddRssLocalStorageLanguage === 'zh-CN') {
                    layer.msg('请输入 name 和 link')
                } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                    layer.msg('請輸入 name 和 link')
                } else if (sourceAddRssLocalStorageLanguage === 'en') {
                    layer.msg('please input name and link')
                }
            }
        });
    }
    $('.panel').css("max-height", $('#rssList')[0].scrollHeight + 16 + "px");
});

// Test API Link Valid
$(document).on('click', '.testbtnapi', function () {
    $('.sourcelink').each(function () {
        let link = $(this).val();
        let request = $.ajax({ url: link, method: "GET" });
        request.done(function () {
            if (link === 'https://api.zhihu.com/topstory/hot-lists/total') {
                $('#zhihuStatus').text('success');
            } else if (link === 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=finance&srv_id=pc&offset=0&limit=100&strategy=1&ext=   {%22pool%22:[%22hot%22],%22is_filter%22:2,%22check_type%22:true}') {
                $('#tencentStatus').text('success');
            } else if (link === 'https://www.toutiao.com/api/pc/feed/?category=news_hot') {
                $('#toutiaoStatus').text('success');
            } else if (link === 'https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot') {
                $('#weiboStatus').text('success');
            }
            toStorageUrls();
        });
        request.fail(function () {
            if (link === 'https://api.zhihu.com/topstory/hot-lists/total') {
                $('#zhihuStatus').text('fail');
            } else if (link === 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=finance&srv_id=pc&offset=0&limit=100&strategy=1&ext={%22pool%22:[%22hot%22],%22is_filter%22:2,%22check_type%22:true}') {
                $('#tencentStatus').text('fail');
            } else if (link === 'https://www.toutiao.com/api/pc/feed/?category=news_hot') {
                $('#toutiaoStatus').text('fail');
            } else if (link === 'https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot') {
                $('#weiboStatus').text('fail');
            }
            toStorageUrls();
        })
    });
});

// Test DOM Link Valid
$(document).on('click', '.testbtn', function () {
    $('#domList .sourcelink').each(function () {
        let link = $(this).val();
        let closestTr = $(this).closest('tr');
        if (link) {
            let request = $.ajax({
                url: link,
                method: "GET"
            });
            request.done(function (res) {
                closestTr.find('.sourcestatus:first').text('success');
                toStorageUrls();
            });
            request.fail(function (err) {
                closestTr.find('.sourcestatus:first').text('fail');
                toStorageUrls();
            })
        } else {
            let sourceAddRssLocalStorageLanguage = localStorage.getItem('language');
            if (sourceAddRssLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入至少一个DOM订阅源')
            } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入至少一個DOM訂閱源')
            } else if (sourceAddRssLocalStorageLanguage === 'en') {
                layer.msg('Please Add Least One DOM Source')
            }
        }
    });
});

// Test RSS Link Valid
$(document).on('click', '.testbtnrss', function () {
    $('#rssList .sourcelink').each(function () {
        let link = $(this).val();
        let closestTr = $(this).closest('tr');
        if (link) {
            let request = $.ajax({
                url: link,
                method: "GET"
            });
            request.done(function () {
                closestTr.find('.sourcestatus:first').text('success');
                toStorageUrls();
            });
            request.fail(function () {
                closestTr.find('.sourcestatus:first').text('fail');
                toStorageUrls();
            })
        } else {
            let sourceAddRssLocalStorageLanguage = localStorage.getItem('language');
            if (sourceAddRssLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入至少一个RSS订阅源')
            } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入至少一個RSS訂閱源')
            } else if (sourceAddRssLocalStorageLanguage === 'en') {
                layer.msg('Please Add Least One RSS Source')
            }
        }
    });
});

// Set Checkbox If Checked Or Not
$(document).on('change', '.checkbox', function () {
    toStorageUrls()
});

// Set Delete DOM This Line If Or Not
$(document).on('click', '.sourcedel', function (e) {
    $(this).closest('tr').remove();
    toStorageUrls();
});

// Set Delete RSS Line If Or Not
$(document).on('click', '.sourcedelrss', function (e) {
    $(this).closest('tr').remove();
    toStorageUrls();
});

// Save Urls To Storage
function toStorageUrls() {
    let storageUrls = [];
    let state = [];
    let sourceName = [];
    let sourceLink = [];
    let elementsArr = [];
    let sourceStatus = [];
    let sourceType = [];
    $('.checkbox').each(function (index) {
        let text = $(this).closest('tr').find('.sourcename:first').val();
        let link = $(this).closest('tr').find('.sourcelink:first').val();
        let elements = $(this).closest('tr').find('.ruleselement:first').val();
        if (text.trim().length === 0) {
            if (getLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入 Name')
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入 Name')
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Name');
            }
            $(this).prop('checked', false);
        }
        if (link.trim().length === 0) {
            if (getLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入 Link')
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入 Link')
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Link');
            }
            $(this).prop('checked', false);
        }
        if (elements.trim().length === 0) {
            if (getLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入 Elements 文本')
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入 Elements 文本')
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Elements Text');
            }
            $(this).prop('checked', false);
        }
        if (text && link && elements) {
            let status = $(this).closest('tr').find('.sourcestatus:first').text();
            let type = $(this).closest('tr').find('.sourcestype:first').text();
            sourceName.push(text);
            sourceLink.push(link);
            elementsArr.push(elements);
            sourceStatus.push(status);
            sourceType.push(type);
            state.push($(this).prop('checked'));
        }
    });
    for (let i = 0; i < sourceName.length; i++) {
        storageUrls.push(
            {
                name: sourceName[i],
                url: sourceLink[i],
                rules: elementsArr[i],
                status: sourceStatus[i],
                type: sourceType[i],
                checked: state[i]
            }
        )
    }
    let stateString = JSON.stringify(state);
    let sourceNameString = JSON.stringify(storageUrls);
    localStorage.setItem('checkboxState', stateString);
    localStorage.setItem('apiArr', sourceNameString);
}

// Get All Setting Rules
function getSettingRulesList() {
    if (getLocalStorageAllUrls) {
        urlsArr = JSON.parse(getLocalStorageAllUrls);
        let getApi = urlsArr.filter(item => item.type === 'API');
        let getDom = urlsArr.filter(item => item.type === 'DOM');
        let getRss = urlsArr.filter(item => item.type === 'RSS');
        $('#zhihu').val(getApi[0].name);
        $('#tencent').val(getApi[1].name);
        $('#toutiao').val(getApi[2].name);
        $('#weibo').val(getApi[3].name);
        $('#zhihuStatus').text(getApi[0].status);
        $('#tencentStatus').text(getApi[1].status);
        $('#toutiaoStatus').text(getApi[2].status);
        $('#weiboStatus').text(getApi[3].status);
        /* Get ALL DOM Links Valid Start */
        $('#domList tr:gt(1)').remove();
        for (let i = 0; i < getDom.length; i++) {
            $('#domList').append(`
            <tr>
                <td><input type="checkbox" class="checkbox" ${getDom[i].checked ? 'checked' : ''} name="${getDom[i].name + 'check'}"></td>
                <td><input type="text" value="${getDom[i].name}" id="${getDom[i].name.replace(/\s+/g, '')}" placeholder="${getDom[i].name}" title="${getDom[i].name}" class="sourcename"></td>
                <td><input type="text" value="${getDom[i].url}" placeholder="${getDom[i].url}" title="${getDom[i].url}" class="sourcelink" name="${getDom[i].name + 'url'}"></td>
                <td><input type="text" value="${getDom[i].rules}" placeholder="${getDom[i].rules}" title="${getDom[i].rules}" class="ruleselement" name="${getDom[i].name + 'rules'}"></td>
                <td><span class="sourcestatus" id="${getDom[i].name + 'Status'}">${getDom[i].status}</span></td>
                <td><span class="sourcestype">DOM</span></td>
                <td><input type="button" class="sourcedel" value="-" title="Delete"></td>
            </tr>    
            `);
        }
        /* Get ALL DOM Links Valid End */
        /* Get ALL RSS Links Valid Start */
        $('#rssList tr:gt(1)').remove();
        for (let i = 0; i < getRss.length; i++) {
            $('#rssList').append(`
            <tr>
                <td><input type="checkbox" class="checkbox" ${getRss[i].checked ? 'checked' : ''} name="${getRss[i].name + 'check'}"></td>
                <td><input type="text" value="${getRss[i].name}" id="${getRss[i].name.replace(/\s+/g, '')}" placeholder="${getRss[i].name}" title="${getRss[i].name}" class="sourcename"></td>
                <td><input type="text" value="${getRss[i].url}" placeholder="${getRss[i].url}" title="${getRss[i].url}" class="sourcelink" name="${getRss[i].name + 'url'}"></td>
                <td><input type="text" value="${getRss[i].rules}" placeholder="${getRss[i].rules}" title="${getRss[i].rules}" class="ruleselement" name="${getRss[i].name + 'rules'}" disabled></td>
                <td><span class="sourcestatus" id="${getRss[i].name + 'Status'}">${getRss[i].status}</span></td>
                <td><span class="sourcestype">RSS</span></td>
                <td><input type="button" class="sourcedelrss" value="-" title="Delete"></td>
            </tr>    
            `);
        }
        /* Get ALL RSS Links Valid End */
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

// Reset localStorage
const closeButton = document.getElementById('resetBtn');
closeButton.addEventListener('click', () => {
    localStorage.clear();
    window.close();
});
// Save News Items to Favourite List
$(document).on('click', '.newsfavourite', function () {
    // Update Favourite News List
    updateAllLocalStorage();
    let toFavouriteNewsList;
    try {
        toFavouriteNewsList = JSON.parse(getLocalStorageFavourite)
    } catch (e) {
        toFavouriteNewsList = getLocalStorageFavourite;
    }
    toFavouriteNewsList.push({ title: $(this).parent().parent().find('a').text(), links: $(this).parent().parent().find('a').attr('href') });
    // Filter Double News Item
    toFavouriteNewsList = toFavouriteNewsList.filter(function (value, index) {
        return toFavouriteNewsList.map(x => x.title).indexOf(value.title) === index
    });
    localStorage.setItem('favouriteNews', JSON.stringify(toFavouriteNewsList));
    $(this).parent().parent().remove();
    let totalNumber = Number($('#totalNews').text()) - 1
    $('#totalNews').text(totalNumber);
    // Update Favourite News List
    updateAllLocalStorage();
    updateFavouriteNewsList();
    $('.tabcontent:eq(1)').hide();
    newsAll = JSON.parse(localStorage.getItem('memoryNewsList')).filter((x,y)=>JSON.parse(localStorage.getItem('favouriteNews')).map(item=>item.title).indexOf(x.title) === -1);
});
// Delete News Item from Favourite List
$(document).on('click', '.removenewsfavourite', function () {
    // Update Favourite News List
    updateAllLocalStorage();
    let removeFavouriteNewsList;
    try {
        removeFavouriteNewsList = JSON.parse(getLocalStorageFavourite)
    } catch (e) {
        removeFavouriteNewsList = getLocalStorageFavourite;
    }
    removeFavouriteNewsList = removeFavouriteNewsList.filter(item => item.title !== $(this).parent().parent().find('a').text());
    localStorage.setItem('favouriteNews', JSON.stringify(removeFavouriteNewsList));
    let totalNumber = Number($('#totalFavouriteNews').text()) - 1;
    $('#totalFavouriteNews').text(totalNumber)
    $(this).parent().parent().remove();
    updateAllLocalStorage();
    updateFavouriteNewsList();
});

