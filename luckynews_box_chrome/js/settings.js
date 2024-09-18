$(document).ready(function () {
    // Set Default Settings
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
            }
        } else {
            $('#memoryMode').prop('checked', false);
        }
    }
    $("#slider input").val(getLocalStorageStyleFontSize);
    $("#sliderValue").text(getLocalStorageStyleFontSize);
    $("#sliderValue").css('font-size', getLocalStorageStyleFontSize + 'px');
    getSettingRulesList();
}
// Change Menu Tabs Function
function changeMenu() {
    // Default First Tabs High Lighting Show
    $(".settingflow").hide();
    $('#rules').addClass('active');
    $("#rulesList").show();
    $('.tabsettings').click(function (e) {
        let paramId = $(this).attr("id");
        $('#' + paramId + 'List').show();
        $('#' + paramId + 'List').siblings().not('.columntab').hide();
        $('.tabsettings').removeClass('active');
        $(this).addClass('active');
    });
}
// Settings Effect
function settingsEffect() {
    // Change Total Limits
    $("#editTotal").on("blur", function () {
        let value = parseInt($(this).val());
        if (value === "" || isNaN(value) || value < 10) {
            $(this).val(10);
        }
        localStorage.setItem('totalLimits', parseInt($(this).val()));
    });
    // Resize Blacklist
    $('#blacklistFilter').on('click', function() {
        this.style.height = '';
        this.style.height = this.scrollHeight + 'px';
      });
    // Change Blacklist Filter Value
    $('#blacklistFilter').on("blur", function () {
        localStorage.setItem('blackList', $(this).val());
    });
    // Resize FavouriteList
    $('#favouriteFilter').on('click', function() {
        this.style.height = '';
        this.style.height = this.scrollHeight + 'px';
      });
    // Change Favourite Filter Value
    $('#favouriteFilter').on("blur", function() {
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
    $('#uploadButton').click(function () {
        // Solve User Upload Same JSON
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
                            layer.msg('Success!')
                        } else if (getLocalStorageLanguage === 'jp') {
                            layer.msg('成功！')
                        }
                    }
                } catch (error) {
                    if (getLocalStorageLanguage === 'zh-CN') {
                        layer.msg('请导入正确的 JSON 类型文件及正确规则！')
                    } else if (getLocalStorageLanguage === 'zh-TW') {
                        layer.msg('請匯入正確的 JSON 類型文件及正確規則！')
                    } else if (getLocalStorageLanguage === 'en') {
                        layer.msg('Please import the correct JSON type file and correct rules！')
                    } else if (getLocalStorageLanguage === 'jp') {
                        layer.msg('正しい JSON タイプのファイルと正しいルールをインポートしてください！')
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
    $('.accordion').each(function (index) {
        $(this).addClass("target");
        let panel = $(this).next();
        panel.show();
        let trueHeight = $(`#${$(this).next().find('table').attr('id')}`).height();
        panel.css("max-height", trueHeight + "px");
    });
    $(".accordion").click(function () {
        $(this).toggleClass("target");
        let panel = $(this).next();
        panel.slideToggle();
        let trueHeight = $(`#${$(this).next().find('table').attr('id')}`).height();
        panel.css("max-height", trueHeight + "px");
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
        } else if (getLocalStorageLanguage === 'jp') {
            layer.msg('フィードが追加されていません。フィードを追加してください！')
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
    getLocalStoragememoryMode = localStorage.getItem('memoryMode');
    getLocalStorageStyleFontSize = localStorage.getItem('styleFontSize');
    getLocalStorageStyleFontColor = localStorage.getItem('styleFontColor');
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
                <td class="tableinline">
                    <div>
                        <input type="button" class="sourcedel" value="-"  name="${
                            randomPassword + 'del'
                        }" title="Delete">
                    </div>
                    <div class="tableorder">
                        <img class="move-up" src="./images/arrowup.svg" alt="top" />
                        <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                    </div>
                </td>
            </tr>    
        `);
        updateButtonState("domList");
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
                        <td class="tableinline">
                            <div>
                                <input type="button" class="sourcedel" value="-"  name="${
                                    randomPassword + 'del'
                                }" title="Delete">
                            </div>
                            <div class="tableorder">
                                <img class="move-up" src="./images/arrowup.svg" alt="top" />
                                <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                            </div>
                        </td>
                    </tr>    
                `);
                updateButtonState("domList");
            } else {
                let sourceAddLocalStorageLanguage = localStorage.getItem('language');
                if (sourceAddLocalStorageLanguage === 'zh-CN') {
                    layer.msg('请输入名称, 链接和元素！');
                } else if (sourceAddLocalStorageLanguage === 'zh-TW') {
                    layer.msg('請輸入名稱, 連結和元素！');
                } else if (sourceAddLocalStorageLanguage === 'en') {
                    layer.msg('please input name, link and elements!');
                } else if (sourceAddLocalStorageLanguage === 'jp') {
                    layer.msg('名前、リンク、要素を入力してください！');
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
                <td class="tableinline">
                    <div>
                        <input type="button" class="sourcedelrss" value="-" name="${
                            randomPassword + 'del'
                        }" title="Delete">
                    </div>
                    <div class="tableorder">
                        <img class="move-up" src="./images/arrowup.svg" alt="top" />
                        <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                    </div>
                </td>
            </tr>
        `);
        updateButtonState("rssList");
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
                        <td class="tableinline">
                            <div>
                                <input type="button" class="sourcedelrss" value="-" name="${
                                    randomPassword + 'del'
                                }" title="Delete">
                            </div>
                            <div class="tableorder">
                                <img class="move-up" src="./images/arrowup.svg" alt="top" />
                                <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                            </div>
                        </td>
                    </tr>
                `);
                updateButtonState("rssList");
            } else {
                let sourceAddRssLocalStorageLanguage = localStorage.getItem('language');
                if (sourceAddRssLocalStorageLanguage === 'zh-CN') {
                    layer.msg('请输入名称和链接！')
                } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                    layer.msg('請輸入名稱和連結！')
                } else if (sourceAddRssLocalStorageLanguage === 'en') {
                    layer.msg('please input name and link!')
                } else if (sourceAddRssLocalStorageLanguage === 'jp') {
                    layer.msg('名前、リンクを入力してください！');
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
        let request = $.ajax({ url: link, method: "GET" });
        request.done(function () {
            if (link.indexOf('zhihu.com') > -1) {
                $('#zhihuStatus').text('success');
            } else if (link.indexOf('qq.com') > -1) {
                $('#tencentStatus').text('success');
            } else if (link.indexOf('toutiao.com') > -1) {
                $('#toutiaoStatus').text('success');
            } else if (link.indexOf('weibo.cn') > -1) {
                $('#weiboStatus').text('success');
            }
            toStorageUrls();
        });
        request.fail(function () {
            if (link.indexOf('zhihu.com') > -1) {
                $('#zhihuStatus').text('fail');
            } else if (link.indexOf('qq.com') > -1) {
                $('#tencentStatus').text('fail');
            } else if (link.indexOf('toutiao.com') > -1) {
                $('#toutiaoStatus').text('fail');
            } else if (link.indexOf('weibo.cn') > -1) {
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
                layer.msg('请输入至少一个DOM订阅源！')
            } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入至少一個DOM訂閱源！')
            } else if (sourceAddRssLocalStorageLanguage === 'en') {
                layer.msg('Please Add Least One DOM Source!')
            } else if (sourceAddRssLocalStorageLanguage === 'jp') {
                layer.msg('少なくとも 1 つの DOM ソースを追加してください！')
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
                layer.msg('请输入至少一个RSS订阅源！')
            } else if (sourceAddRssLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入至少一個RSS訂閱源！')
            } else if (sourceAddRssLocalStorageLanguage === 'en') {
                layer.msg('Please Add Least One RSS Source!')
            } else if (sourceAddRssLocalStorageLanguage === 'jp') {
                layer.msg('少なくとも 1 つの RSS ソースを追加してください！')
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
    updateButtonState("domList");
});
// Set Delete RSS Line If Or Not
$(document).on('click', '.sourcedelrss', function (e) {
    $(this).closest('tr').remove();
    toStorageUrls();
    // Get RSS All Checkbox Status
    getSelectAllCheckboxStatus("rssList", "selectrssall");
    updateButtonState("rssList");
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
                layer.msg('请输入名称！');
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入名稱！');
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Name!');
            } else if (getLocalStorageLanguage === 'jp') {
                layer.msg('名前を入力してください！');
            }
            $(this).prop('checked', false);
        }
        if (link.trim().length === 0) {
            if (getLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入链接！');
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入連結！');
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Link!');
            } else if (getLocalStorageLanguage === 'jp') {
                layer.msg('リンクを入力してください！');
            }
            $(this).prop('checked', false);
        }
        if (elements.trim().length === 0) {
            if (getLocalStorageLanguage === 'zh-CN') {
                layer.msg('请输入元素文本！')
            } else if (getLocalStorageLanguage === 'zh-TW') {
                layer.msg('請輸入元素文本！')
            } else if (getLocalStorageLanguage === 'en') {
                layer.msg('Please Input Elements Text!');
            } else if (getLocalStorageLanguage === 'jp') {
                layer.msg('要素を入力してください！');
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
                <td class="tableinline">
                    <div>
                        <input type="button" class="sourcedel" value="-" title="Delete">
                    </div>
                    <div class="tableorder">
                        <img class="move-up" src="./images/arrowup.svg" alt="top" />
                        <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                    </div>
                </td>
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
                <td class="tableinline">
                    <div>
                        <input type="button" class="sourcedelrss" value="-" title="Delete">
                    </div>
                    <div class="tableorder">
                        <img class="move-up" src="./images/arrowup.svg" alt="top" />
                        <img class="move-down" src="./images/arrowdown.svg" alt="down" />
                    </div>
                </td>
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
    // Get DOM Top Or Bottom Button Valid
    updateButtonState("domList");
    updateButtonState("rssList");
}
// Change Rules Order Move-Up
$(document).on('click', '.move-up', function (){
    let currentRow = $(this).closest('tr');
    let prevRow = currentRow.prev('tr');
    if (!clickTimer) {
        clickTimer = setTimeout(function() {
            if (prevRow.length) {
              currentRow.insertBefore(prevRow);
              updateButtonState("domList");
              updateButtonState("rssList");
              toStorageUrls();
            }
            clickTimer = null;
        }, 300);
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
    }
});
// Change Rules Order Move-Up to Top
$(document).on('dblclick', '.move-up', function (){
    let currentRow = $(this).closest('tr');
    let belongsTable = currentRow.closest('table');
    let prevRow = belongsTable.find('tr:eq(2)');
    if (prevRow.length) {
      currentRow.insertBefore(prevRow);
      updateButtonState("domList");
      updateButtonState("rssList");
      toStorageUrls();
    }
});
// Change Rules Order Move-Down
$(document).on('click', '.move-down', function (){
    let currentRow = $(this).closest('tr');
    let nextRow = currentRow.next('tr');
    if (!clickTimer) {
        clickTimer = setTimeout(function() {
            if (nextRow.length) {
              currentRow.insertAfter(nextRow);
              updateButtonState("domList");
              updateButtonState("rssList");
              toStorageUrls();
            }
            clickTimer = null;
        }, 300);
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
    }
});
// Change Rules Order Move-Down to Bottom
$(document).on('dblclick', '.move-down', function (){
    let currentRow = $(this).closest('tr');
    let belongsTable = currentRow.closest('table');
    let nextRow = belongsTable.find('tr:last');
    if (nextRow.length) {
      currentRow.insertAfter(nextRow);
      updateButtonState("domList");
      updateButtonState("rssList");
      toStorageUrls();
    }
});
// Reset localStorage
const closeButton = document.getElementById('resetBtn');
closeButton.addEventListener('click', () => {
    localStorage.clear();
});

