$(document).ready(function () { // Set Default Settings
    getDefault();
    // Change Menu Tabs Function
    changeMenu();
    // Set API Rules Check
    apiRulesCheck();
    // Settings Effect
    settingsEffect();
});
// Set Default Settings
function getDefault() { // Get Default Language
    if (!getLocalStorageLanguage) {
        localStorage.setItem('language', 'en');
    }
    // Get Default Total Limits
    if (!getLocalStorageTotalLimits) {
        localStorage.setItem('totalLimits', '300');
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
    $('#favouriteFilter').val(getLocalStorageFavouriteList);
    if (!getLocalStoragememoryMode) {
        $('#memoryMode').prop('checked', false);
        localStorage.setItem('memoryMode', 'close');
        showNewsNotingTips()
    } else {
        if (getLocalStoragememoryMode === "open") {
            $('#memoryMode').prop('checked', true);
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
                    $('#newsList ul').append(`<li><div style="color:${getLocalStorageStyleFontColor}" class="innercontent" title="${
                        parseNewsList[i].links
                    }">${
                        parseNewsList[i].title
                    }</div><div class="inlinetools"><button class="vieworigin"><img src="../images/eyes.png"></button><button class="newsfavourite"><img src="../images/collections.png"></button><button class="newsshare"><img src="../images/share.png"></button></div></li>`);
                }
                // Scroll to Last Position
                if (getLocalStorageScrollNewsList) {
                    $('#newsList').animate({
                        scrollTop: getLocalStorageScrollNewsList
                    }, 400);
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
function changeMenu() { // Default First Tabs High Lighting Show
    $('#news').addClass('activetab');
    $('#newsList').show();
    $('.tablinks').click(function (e) {
        let paramId = $(this).attr("id");
        $('#' + paramId + 'List').show();
        $('#' + paramId + 'List').siblings().not('.tab').hide();
        paramId === 'news' ? $('#tools').show() : $('#tools').hide();
        if (paramId === 'favourite') {
            $('#favouritetools').show();
            updateAllLocalStorage();
            // Update Favourite News List
            updateFavouriteNewsList();
        } else {
            $('#favouriteList').hide();
            $('#favouritetools').hide();
        }
        $('.tablinks').removeClass('activetab');
        $(this).addClass('activetab');
        $(".settingflow").hide();
        if (paramId == 'settings') {
            $('#settingsList').css({"display": "flex", "justify-content": "space-between", "align-item": "flex-start", "padding": "20px 0"})
            $('.tabsettings').removeClass('active');
            // Default First Settings High Lighting Show
            $('#about').addClass('active');
            $("#aboutList").show();
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
    // Change Favourite Filter Value
    $('#favouriteFilter').on("blur", function () {
        localStorage.setItem('favouriteList', $(this).val());
    });
    // Check Memory Mode if or not
    $('#memoryMode').on('change', function () {
        if ($(this).is(':checked')) {
            localStorage.setItem('memoryMode', 'open');
        } else {
            localStorage.setItem('memoryMode', 'close');
        }
    });
    // Import JSON Upload Button
    $('#uploadButton').click(function () { // Solve User Upload Same JSON
        $('#fileInput').val('');
        $('#fileInput').click();
    });
    $('#fileInput').change(function () {
        getLocalStorageLanguage = localStorage.getItem('language');
        let file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let contents = e.target.result;
                let jsonData;
                try {
                    jsonData = JSON.parse(contents);
                    if (jsonData.length) {
                        getLocalStorageAllUrls = JSON.stringify(jsonData);
                        localStorage.setItem('apiArr', getLocalStorageAllUrls);
                        getSettingRulesList();
                        if (getLocalStorageLanguage === 'zh-CN') {
                            layer.msg('成功！')
                        } else if (getLocalStorageLanguage === 'zh-TW') {
                            layer.msg('成功！')
                        } else if (getLocalStorageLanguage === 'en') {
                            layer.msg('Success！')
                        }
                    }
                } catch (error) {
                    if (getLocalStorageLanguage === 'zh-CN') {
                        layer.msg('请导入正确的 JSON 类型文件及正确规则！')
                    } else if (getLocalStorageLanguage === 'zh-TW') {
                        layer.msg('請匯入正確的 JSON 類型文件及正確規則！')
                    } else if (getLocalStorageLanguage === 'en') {
                        layer.msg('Please import the correct JSON type file and correct rules！')
                    }
                }
            };
            reader.readAsText(file);
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
        let trueHeight = $(`#${
            $(this).next().find('table').attr('id')
        }`).height();
        panel.css("max-height", trueHeight);
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
    // Click Keyboard Enter to Search News List
    keyboardEnterSearch('searchBtn');
    // Click Keyboard Enter to Search Favourite News List
    keyboardEnterSearch('searchFavouriteBtn');
    // Click Keyboard Enter to Search API List
    keyboardEnterSearch('nameApiSearchBtn');
    // Click Keyboard Enter to Search DOM List
    keyboardEnterSearch('nameDomSearchBtn');
    // Click Keyboard Enter to Search RSS List
    keyboardEnterSearch('nameRssSearchBtn');
    // Get API All Checkbox Status
    getSelectAllCheckboxStatus("apiList", "selectall");
    // Get DOM All Checkbox Status
    getSelectAllCheckboxStatus("domList", "selectdomall");
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
    // Select API All Checkbox
    checkboxSelectAllRules("selectall", "apiList");
    // Select DOM All Checkbox
    checkboxSelectAllRules("selectdomall", "domList");
    // Select RSS All Checkbox
    checkboxSelectAllRules("selectrssall", "rssList");
    // Search API Name Items
    searchRulesNamePublic("nameApiSearchBtn", "nameApiSearch", "apiList");
    // Search DOM Name Items
    searchRulesNamePublic("nameDomSearchBtn", "nameDomSearch", "domList");
    // Search RSS Name Items
    searchRulesNamePublic("nameRssSearchBtn", "nameRssSearch", "rssList");
}
// Get News List
function init() {
    let loadingTips = layer.load(); // Set loading Tips
    let checkedUrls = urlsArr.filter(item => item.checked);
    $('#newsList ul').empty();
    for (let i = 0; i < checkedUrls.length; i++) {
        let request = $.ajax({url: checkedUrls[i].url, method: "GET"});
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
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].target.title.trim(),
                                    links: `https://www.zhihu.com/question/${
                                        arr[j].target.id
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#tencent').val()) {
                            let arr = response[0].data.list;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].title.trim(),
                                    links: `${
                                        arr[j].url
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#toutiao').val()) {
                            let arr = response[0].data.data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].title.trim(),
                                    links: `https://www.toutiao.com/article/${
                                        arr[j].item_id
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#weibo').val()) {
                            let arr = response[0].data.cards[0].card_group;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].desc.trim(),
                                    links: `${
                                        arr[j].scheme
                                    }`
                                })
                            }
                        }
                    } else if (checkedUrls[i].type === 'DOM') {
                        if (checkedUrls[i].name === $(`#${
                            checkedUrls[i].name.replace(/\s+/g, '')
                        }`).val()) {
                            let htmlFull = $.parseHTML(response[0]);
                            let $articles = $(htmlFull).find(`${
                                checkedUrls[i].rules
                            }`);
                            $articles.each(function () {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + $(this).text().trim(),
                                    links: normalizeURL($(this).attr('href'), checkedUrls[i].url)
                                });
                            });
                        }
                    } else {
                        if (checkedUrls[i].name === $(`#${
                            checkedUrls[i].name.replace(/\s+/g, '')
                        }`).val()) {
                            let $xml = $(response[0]);
                            $xml.find("item").each(function () {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
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
                                title: `请检查 ${
                                checkedUrls[i].name
                            } 源，无法接收到信息了。`,
                            links: '#'
                        })
                    } else if (getLocalStorageLanguage === 'zh-TW') {
                        newsInfoBox.push({
                                title: `請檢查 ${
                                checkedUrls[i].name
                            } 源，無法接收到資訊了。`,
                            links: '#'
                        })
                    } else if (getLocalStorageLanguage === 'en') {
                        newsInfoBox.push({
                                title: `Please Check ${
                                checkedUrls[i].name
                            } Source，Can't Get Infomation.`,
                            links: '#'
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
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].target.title.trim(),
                                    links: `https://www.zhihu.com/question/${
                                        arr[j].target.id
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name == $('#tencent').val()) {
                            let arr = response[i][0].data.list;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].title.trim(),
                                    links: `${
                                        arr[j].url
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name === $('#toutiao').val()) {
                            let arr = response[i][0].data;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].title.trim(),
                                    links: `https://www.toutiao.com/article/${
                                        arr[j].item_id
                                    }`
                                })
                            }
                        }
                        if (checkedUrls[i].name == $('#weibo').val()) {
                            let arr = response[i][0].data.cards[0].card_group;
                            for (let j = 0; j < arr.length; j++) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + arr[j].desc.trim(),
                                    links: `${
                                        arr[j].scheme
                                    }`
                                })
                            }
                        }
                    } else if (checkedUrls[i].type === 'DOM') {
                        if (checkedUrls[i].name === $(`#${
                            checkedUrls[i].name.replace(/\s+/g, '')
                        }`).val()) {
                            let htmlFull = $.parseHTML(response[i][0]);
                            let $articles = $(htmlFull).find(`${
                                checkedUrls[i].rules
                            }`);
                            $articles.each(function (index, val) {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
                                    }】` + $(this).text().trim(),
                                    links: normalizeURL($(this).attr('href'), checkedUrls[i].url)
                                });
                            })
                        }
                    } else {
                        if (checkedUrls[i].name === $(`#${
                            checkedUrls[i].name.replace(/\s+/g, '')
                        }`).val()) {
                            let $xml = $(response[i][0]);
                            $xml.find("item").each(function () {
                                newsInfoBox.push({
                                        title: `【${
                                        checkedUrls[i].name
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
                                    title: `请检查 ${
                                    checkedUrls[i].name
                                } 源，无法接收到信息了。`,
                                links: '#'
                            })
                        } else if (getLocalStorageLanguage === 'zh-TW') {
                            newsInfoBox.push({
                                    title: `請檢查 ${
                                    checkedUrls[i].name
                                } 源，無法接收到資訊了。`,
                                links: '#'
                            })
                        } else if (getLocalStorageLanguage === 'en') {
                            newsInfoBox.push({
                                    title: `Please Check ${
                                    checkedUrls[i].name
                                } Source，Can't Get Infomation.`,
                                links: '#'
                            })
                        }
                    }
                }
            }
        }
    }).done(response => {
        $('#newsList').css({'display': 'block'});
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
            if (getLocalStorageFavourite) {
                realLengthNewsInfoBox = realLengthNewsInfoBox.filter(function (value, index) {
                    return JSON.parse(getLocalStorageFavourite).map(x => x.title).indexOf(value.title) === -1;
                });
            }
            // Collect Favourite News Items From News Items
            if (getLocalStorageFavouriteList) {
                const regex = new RegExp(`${getLocalStorageFavouriteList}`, 'g');
                realLengthFavouriteNewsInfoBox = realLengthNewsInfoBox.filter(item => item.title.match(regex));
                realLengthNewsInfoBox = realLengthNewsInfoBox.filter(item => !item.title.match(regex));
                let saveToLocalStorageFavouriteNewsList = JSON.parse(getLocalStorageFavourite);
                for (let i = 0; i < realLengthFavouriteNewsInfoBox.length; i++) {
                    saveToLocalStorageFavouriteNewsList.push(realLengthFavouriteNewsInfoBox[i]);
                }
                newsFavouriteArr = saveToLocalStorageFavouriteNewsList;
                localStorage.setItem('favouriteNews', JSON.stringify(saveToLocalStorageFavouriteNewsList));
            }
            // Export Table use
            newsAll = realLengthNewsInfoBox;
            $('#totalNews').text(realLengthNewsInfoBox.length); // Set Total News
            for (let i = 0; i < realLengthNewsInfoBox.length; i++) {
                $('#newsList ul').append(`<li><div style="color:${getLocalStorageStyleFontColor}" class="innercontent" title="${
                    realLengthNewsInfoBox[i].links
                }">${
                    realLengthNewsInfoBox[i].title
                }</div><div class="inlinetools"><button class="vieworigin"><img src="../images/eyes.png"></button><button class="newsfavourite"><img src="../images/collections.png"></button><button class="newsshare"><img src="../images/share.png"></button></div></li>`);
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
        $('#newsList').css({'display': 'flex', 'align-items': 'center', 'justify-content': 'center'})
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
        // Switch Off when Failed
        $(".switch input").prop('checked', false);
        $('#newsList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
        $('#newsList ul li').css('color', getLocalStorageStyleFontColor);
    });
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
        $('#newsList').css({'display': 'flex', 'align-items': 'center', 'justify-content': 'center'})
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
    if (childLi.length > 1) {
        for (let i = 0; i < childLi.length; i++) {
            let txtValue = childLi[i].textContent || childLi[i].innerText;
            if (txtValue.toUpperCase().indexOf(endwords) > -1) {
                childLi[i].style.display = "";
            } else {
                childLi[i].style.display = "none";
            }
        }
    }
});
// Search Favourite List
$("#searchFavouriteBtn").on('click', function () {
    let keywords = $('#nameFavouriteItem').val();
    const endwords = keywords.toUpperCase();
    const parentUl = document.getElementById("favouriteList");
    const childLi = parentUl.getElementsByTagName('li');
    if (childLi.length > 1) {
        for (let i = 0; i < childLi.length; i++) {
            let txtValue = childLi[i].textContent || childLi[i].innerText;
            if (txtValue.toUpperCase().indexOf(endwords) > -1) {
                childLi[i].style.display = "";
            } else {
                childLi[i].style.display = "none";
            }
        }
    }
});
// Click Show Source News Layer
$(document).on('click', '.innercontent', function () {
    let links = $(this).attr('title');
    let title = $(this).text();
    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.open({
            type: 2,
            title: `<div>${title.slice(0, 36)}...</div>`,
            content: links,
            area: ['98%', '98%']
        });
    });
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
        const blob = new Blob([csv], {type: "text/csv"});
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
            layer.msg('匯出什麼都沒有，你點擊啟動按鈕了嗎？')
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
        const blob = new Blob([csv], {type: "text/csv"});
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
            layer.msg('匯出什麼都沒有')
        } else if (exportLocalStorageLanguage === 'en') {
            layer.msg('There is nothing for you')
        }
    }
});
// Clear Favourite News List
$('#clearFavouriteList').on('click', function () {
    getLocalStorageFavourite = localStorage.getItem('favouriteNews');
    if (JSON.parse(getLocalStorageFavourite).length > 0) {
        $('#favouriteList ul').empty();
        $('#totalFavouriteNews').text('0');
        localStorage.setItem('favouriteNews', JSON.stringify([]));
        newsFavouriteArr = [];
        showFavouriteNotingTips();
        $('#favouriteList ul li').css('font-size', getLocalStorageStyleFontSize + 'px');
        $('#favouriteList ul li').css('color', getLocalStorageStyleFontColor);
    }
});
// Export News Rules List
$('#downloadButton').on('click', function () {
    toStorageUrls();
    updateAllLocalStorage();
    let jsonContent = JSON.stringify(JSON.parse(getLocalStorageAllUrls), null, 2);
    if (jsonContent.length === 2) {
        if (getLocalStorageLanguage === 'zh-CN') {
            layer.msg('没有添加订阅源，请添加订阅源！')
        } else if (getLocalStorageLanguage === 'zh-TW') {
            layer.msg('沒有添加訂閱源，請添加訂閱源！')
        } else if (getLocalStorageLanguage === 'en') {
            layer.msg('No feed added, please add feed!')
        }
    } else {
        downloadJSON(jsonContent, 'news_rules');
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
    getLocalStorageFavouriteList = localStorage.getItem('favouriteList')
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
        $('#favouriteList').css("display", "block");
        $('#totalFavouriteNews').text(favouriteArr.length)
        newsFavouriteArr = favouriteArr;
        for (let i = 0; i < favouriteArr.length; i++) {
            $('#favouriteList ul').append(`<li><div style="color:${getLocalStorageStyleFontColor}" class="innercontent" title="${favouriteArr[i].links}">${favouriteArr[i].title}</div><div class="inlinetools"><button class="vieworigin"><img src="../images/eyes.png"></button><button class="removenewsfavourite"><img src="../images/delete.png"></button><button class="newsshare"><img src="../images/share.png"></button></div></li>`);
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
                <td><input type="checkbox" class="checkbox" name="${
            randomPassword + 'checkbox'
        }"></td>
                <td><input type="text" value="" name="${
            randomPassword + 'name'
        }" placeholder="Luckydesigner" class="sourcename"></td>
                <td><input type="text" value="" name="${
            randomPassword + 'link'
        }" placeholder="https://www.luckydesigner.space/" class="sourcelink"></td>
                <td><input type="text" value="" name="${
            randomPassword + 'rules'
        }" placeholder="article h2 a" class="ruleselement"></td>
                <td><span class="sourcestatus">-</span></td>
                <td><span class="sourcestype">DOM</span></td>
                <td><input type="button" class="sourcedel" value="-" name="${
            randomPassword + 'del'
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
                        <td><input type="checkbox" class="checkbox" name="${
                    randomPassword + 'checkbox'
                }"></td>
                        <td><input type="text" value="" name="${
                    randomPassword + 'name'
                }" placeholder="Luckydesigner" class="sourcename"></td>
                        <td><input type="text" value="" name="${
                    randomPassword + 'link'
                }" placeholder="https://www.luckydesigner.space/" class="sourcelink"></td>
                        <td><input type="text" value="" name="${
                    randomPassword + 'rules'
                }" placeholder="article h2 a" class="ruleselement"></td>
                        <td><span class="sourcestatus">-</span></td>
                        <td><span class="sourcestype">DOM</span></td>
                        <td><input type="button" class="sourcedel" value="-" name="${
                    randomPassword + 'del'
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
    // Get DOM All Checkbox Status
    getSelectAllCheckboxStatus("domList", "selectdomall");
});
// Set RSS Rules Click Add
$(document).on('click', '.sourceaddrss', function () {
    let rowCount = $('#rssList tr').length;
    let randomPassword = generateRandomPassword(12);
    if (rowCount === 2) {
        $('#rssList').append(`
            <tr>
                <td><input type="checkbox" class="checkbox" name="${
            randomPassword + 'checkbox'
        }"></td>
                <td><input type="text" value="" name="${
            randomPassword + 'name'
        }" placeholder="Luckydesigner" class="sourcename"></td>
                <td><input type="text" value="" name="${
            randomPassword + 'link'
        }" placeholder="https://www.luckydesigner.space/feed" class="sourcelink"></td>
                <td><input type="text" value="-" name="${
            randomPassword + 'rules'
        }" placeholder="-" class="ruleselement" disabled></td>
                <td><span class="sourcestatus">-</span></td>
                <td><span class="sourcestype">RSS</span></td>
                <td><input type="button" class="sourcedelrss" value="-" name="${
            randomPassword + 'del'
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
                        <td><input type="checkbox" class="checkbox" name="${
                    randomPassword + 'checkbox'
                }"></td>
                        <td><input type="text" value="" name="${
                    randomPassword + 'name'
                }" placeholder="Luckydesigner" class="sourcename"></td>
                        <td><input type="text" value="" name="${
                    randomPassword + 'link'
                }" placeholder="https://www.luckydesigner.space/feed" class="sourcelink"></td>
                        <td><input type="text" value="-" name="${
                    randomPassword + 'rules'
                }" placeholder="-" class="ruleselement" disabled></td>
                        <td><span class="sourcestatus">-</span></td>
                        <td><span class="sourcestype">RSS</span></td>
                        <td><input type="button" class="sourcedelrss" value="-" name="${
                    randomPassword + 'del'
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
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
});
// Test API Link Valid
$(document).on('click', '.testbtnapi', function () {
    $('.sourcelink').each(function () {
        let link = $(this).val();
        let request = $.ajax({url: link, method: "GET"});
        request.done(function () {
            if (link === 'https://api.zhihu.com/topstory/hot-lists/total') {
                $('#zhihuStatus').text('success');
            } else if (link === 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=finance&srv_id=pc&offset=0&limit=100&strategy=1&ext={%22pool%22:[%22hot%22],%22is_filter%22:2,%22check_type%22:true}') {
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
    toStorageUrls();
    // Get API All Checkbox Status
    getSelectAllCheckboxStatus("apiList", "selectall");
    // Get DOM All Checkbox Status
    getSelectAllCheckboxStatus("domList", "selectdomall");
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
});
// Set Delete DOM This Line If Or Not
$(document).on('click', '.sourcedel', function (e) {
    $(this).closest('tr').remove();
    toStorageUrls();
    // Get DOM All Checkbox Status
    getSelectAllCheckboxStatus("domList", "selectdomall");
});
// Set Delete RSS Line If Or Not
$(document).on('click', '.sourcedelrss', function (e) {
    $(this).closest('tr').remove();
    toStorageUrls();
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
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
    // Get API All Checkbox Status
    getSelectAllCheckboxStatus("apiList", "selectall");
    // Get DOM All Checkbox Status
    getSelectAllCheckboxStatus("domList", "selectdomall");
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
}

// Reset localStorage
const closeButton = document.getElementById('resetBtn');
closeButton.addEventListener('click', () => {
    localStorage.clear();
    window.close();
});
// View Origin Website
$(document).on('click', '.vieworigin', function() {
    let href = $(this).parent().parent().find('div').attr('title')
    window.open(href, '_blank')
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
    toFavouriteNewsList.push({ title: $(this).parent().parent().find('div').text(), links: $(this).parent().parent().find('div').attr('title') });
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
    $('#favouriteList').hide();
    try {
        newsAll = JSON.parse(localStorage.getItem('memoryNewsList')).filter((x, y) => JSON.parse(localStorage.getItem('favouriteNews')).map(item => item.title).indexOf(x.title) === -1);
    } catch (e) {
        return false;
    }
});
// News Items Infomation Share
$(document).on('click', '.newsshare', function () {
    let shareTitle = $(this).parent().parent().find('div').text();
    let shareLink = $(this).parent().parent().find('div').attr('title');
    let shareInfomation = `${shareTitle} -- ${shareLink}`;
    navigator.clipboard.writeText(shareInfomation);
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
    removeFavouriteNewsList = removeFavouriteNewsList.filter(item => item.title !== $(this).parent().parent().find('div').text());
    localStorage.setItem('favouriteNews', JSON.stringify(removeFavouriteNewsList));
    let totalNumber = Number($('#totalFavouriteNews').text()) - 1;
    $('#totalFavouriteNews').text(totalNumber)
    $(this).parent().parent().remove();
    updateAllLocalStorage();
    updateFavouriteNewsList();
});

// NewsList Scroll to LocalStorage
$('#newsList').on('scroll', function () {
    if ($('#nameItem').val() == "") {
        let newsList = document.getElementById('newsList');
        let scrollDistance = newsList.scrollTop;
        localStorage.setItem('scrollNewsList', scrollDistance);
    } else {
        localStorage.setItem('scrollNewsList', 0);
    }
});
