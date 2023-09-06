$(document).ready(function () {
    if (!getLocalStorageLanguage) {
        localStorage.setItem('language', 'en');
        getLocalStorageLanguage = localStorage.getItem('language');
    } else {
        getLocalStorageLanguage = localStorage.getItem('language');
    }
    $('#languages').val(getLocalStorageLanguage);
    if (window.localStorage.getItem('language') == 'en') {
        englishTranslate();
    } else if (window.localStorage.getItem('language') == 'zh-CN') {
        cnChineseTranslate();
    } else if (window.localStorage.getItem('language') == 'zh-TW') {
        twChineseTranslator();
    }
    // Tooltip Show Or Not
    tooltipShowOrNot();
    $('#languages').on('change', function () {
        let selectLanguage = $(this).val();
        localStorage.setItem('language', selectLanguage);
        if ($(this).val() === 'zh-CN') {
            cnChineseTranslate();
        } else if ($(this).val() === 'zh-TW') {
            twChineseTranslator();
        } else if ($(this).val() === 'en') {
            englishTranslate();
        }
        tooltipShowOrNot();
    });
});

// TW Chinese Translator
function twChineseTranslator() {
    $('#news').text('新聞');
    $('#settings').text('設定');
    $('#instructions').text('玩法說明');
    $('#startText').text('啟動：');
    $('#totalText').text('總量：');
    $('#searchText').text('搜尋關鍵字：');
    $('#searchBtn').val('ø搜尋');
    $("#searchBtn").attr("title", "搜尋");
    $('#exportExcel').val('∫匯出');
    $('#exportExcel').attr("title", "匯出");
    $('#about').text('關於');
    $('#advanced').text('高級');
    $('#blacklistText').html(`黑名單篩選<span class="tooltip">&nbsp;?&nbsp;</span><span class="tooltip-text">使用“｜”切割, 比如 "色情|性愛|愚蠢"</span>`);
    $('#blacklistFilter').attr('placeholder', '色情|性愛|愚蠢');
    $('#memoryModeText').text('記憶模式');
    $('#basic').text('基礎');
    $('#donate').text('斗内');
    $('#history').text('歷史');
    $('#historyList').html(`
    <ul>
        <li class="settingscontent">
            <h3>版本 1.3.0<h3>
            <p>2023-09-04</p>
        </li>
        <ul>
            <li>風格新增暗黑模式。</li>
            <li>修復 Bugs</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.2.0<h3>
            <p>2023-09-02</p>
        </li>
        <ul>
            <li>高級設置中增加記憶模式，開啟後可以自動展示最後一次羅列的新聞列表。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.1.0<h3>
            <p>2023-08-30</p>
        </li>
        <ul>
            <li>新增黑名單篩選, 能夠屏蔽含有黑名單內詞的新聞條目。</li>
            <li>增加重置功能，可以恢復默認設置。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.0.0<h3>
            <p>2023-08-20</p>
        </li>
        <ul>
            <li>LuckyNews Box 初始版發布。</li>
        </ul>
    </ul>    
    `);
    $('#resetText').text('重設');
    $('#resetBtn').text('是的');
    $('#rules').text('訂閱源');
    $('#style').text('風格');
    $('#versionText').text('版本');
    $('#emailText').text('信箱');
    $('#powerText').text('技術支援');
    $('#socialText').text('社交網路');
    $('#wechatImg').attr('title', '微信ID：Nosense-history');
    $('#languageText').text('語言');
    $('#totalLimitsText').text('新聞條目限制總量');
    $('#orderText').text('新聞條目排序');
    $('#defaultText').text('默認');
    $('#shortText').text('從短到長');
    $('#longText').text('從長到短');
    $('#randomText').text('隨機');
    $('#paypalText').text('PayPal');
    $('#alipayText').text('支付寶');
    $('#wechatpayText').text('微信');
    $("input[type='button'].sourceadd").attr('title', '新增');
    $("input[type='button'].sourceaddrss").attr('title', '新增');
    $("input[type='button'].testbtnapi").attr('title', '測試狀態');
    $("input[type='button'].testbtn").attr('title', '測試狀態');
    $("input[type='button'].testbtnrss").attr('title', '測試狀態');
    $('#apiTips').text('如果你有新的新聞 API，可以信箱告訴我');
    $('#darkModeText').text('暗黑模式');
    $('#fontSizeText').text('新聞字型大小');
    $('#fontColorText').text('新聞字型顏色');
    if ($('#newsList ul li').text().indexOf('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.') > -1) {
        $('#newsList ul li').text('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。');
    } else if ($('#newsList ul li').text().indexOf('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。') > -1) {
        $('#newsList ul li').text('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。');
    }
    $('#instructionsList').html(`
        <ul>
            <li>
                <h3>第一步, 前往設置 -> 訂閱源添加新聞源</h3>
                <ul>
                    <li>支持 <b>API</b>, <b>DOM</b> 和 <b>RSS</b> 模式。</li>
                    <li><b>API</b> 模式已經內置四個選項, 如果你有新的新聞 API, 可以發電郵通知我。</li>
                    <li><b>DOM</b> 模式需要你自行配置。</li>
                    <li>舉一個例子, 如果你想從 https://lite.cnn.com/en 獲取新聞信息, 你可以在 'name' 輸入框輸入自定義名稱, 在 'link' 輸入 https://lite.cnn.com/en, 在輸入框 'rules' 輸入 '.tabcontent ul li a'。</li>
                    <li><b>RSS</b> 模式也需要你自行配置。</li>
                    <li>舉一個例子, 如果你想訂閱 https://www.luckydesigner.space/feed, 你可以在 'name' 輸入框輸入自定義名稱, 在 'link' 輸入 https://www.luckydesigner.space/feed。</li>
                </ul>
            </li>
            <li>
                <h3>第二步, 前往新聞後點擊開始按鈕</h3>
                <ul>
                    <li>享受有趣的新聞吧。</li>
                </ul>
            </li>
            <li>
                <h3>注意事項</h3>
                <li>重複的自定義名稱可能會造成錯誤。</li>
                <li>有些網站可能三種模式都不支持。</li>
            </li>
        </ul>
    `);
}

// CN Chinese Translator
function cnChineseTranslate() {
    $('#news').text('新闻');
    $('#settings').text('设置');
    $('#instructions').text('玩法说明');
    $('#startText').text('开始：');
    $('#totalText').text('总数：');
    $('#searchText').text('搜索关键词：');
    $('#searchBtn').val('ø搜索');
    $("#searchBtn").attr("title", "搜索");
    $('#exportExcel').val('∫导出');
    $('#exportExcel').attr("title", "导出");
    $('#about').text('关于');
    $('#advanced').text('高级');
    $('#blacklistText').html(`黑名单筛选<span class="tooltip">&nbsp;?&nbsp;</span><span class="tooltip-text">使用“｜”切割, 比如 "色情|性爱|愚蠢"</span>`);
    $('#blacklistFilter').attr('placeholder', '色情|性爱|愚蠢');
    $('#memoryModeText').text('记忆模式');
    $('#basic').text('基础');
    $('#donate').text('捐赠');
    $('#history').text('历史');
    $('#historyList').html(`
    <ul>
        <li class="settingscontent">
            <h3>版本 1.3.0<h3>
            <p>2023-09-04</p>
        </li>
        <ul>
            <li>样式新增暗黑模式。</li>
            <li>修复 Bugs</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.1.0<h3>
            <p>2023-08-30</p>
        </li>
        <li class="settingscontent">
            <h3>版本 1.2.0<h3>
            <p>2023-09-02</p>
        </li>
        <ul>
            <li>高级设置中增加记忆模式，开启后可以自动展示最后一次罗列的新闻列表。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.1.0<h3>
            <p>2023-08-30</p>
        </li>
        <ul>
            <li>新增黑名单筛选, 能够屏蔽含有黑名单内词的新闻条目。</li>
            <li>增加重置功能，可以恢复默认设置。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.0.0<h3>
            <p>2023-08-20</p>
        </li>
        <ul>
            <li>LuckyNews Box 初始版发布。</li>
        </ul>
    </ul>    
    `);
    $('#resetText').text('重置');
    $('#resetBtn').text('是');
    $('#rules').text('订阅源');
    $('#style').text('样式');
    $('#versionText').text('版本');
    $('#emailText').text('邮箱');
    $('#powerText').text('技术支持');
    $('#wechatImg').attr('title', '微信ID：Nosense-history');
    $('#socialText').text('社交媒体');
    $('#languageText').text('语言');
    $('#totalLimitsText').text('新闻条目限制总数');
    $('#orderText').text('新闻条目排序');
    $('#defaultText').text('默认');
    $('#shortText').text('从短到长');
    $('#longText').text('从长到短');
    $('#randomText').text('随机');
    $('#paypalText').text('贝宝(PayPal)');
    $('#alipayText').text('支付宝');
    $('#wechatpayText').text('微信');
    $("input[type='button'].sourceadd").attr('title', '添加');
    $("input[type='button'].sourceaddrss").attr('title', '添加');
    $("input[type='button'].testbtnapi").attr('title', '测试状态');
    $("input[type='button'].testbtn").attr('title', '测试状态');
    $("input[type='button'].testbtnrss").attr('title', '测试状态');
    $('#apiTips').text('如果你有新的新闻 API，可以邮箱告诉我');
    $('#darkModeText').text('暗黑模式');
    $('#fontSizeText').text('新闻字体尺寸');
    $('#fontColorText').text('新闻字体颜色');
    if ($('#newsList ul li').text().indexOf('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.') > -1) {
        $('#newsList ul li').text('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。');
    } else if ($('#newsList ul li').text().indexOf('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。') > -1) {
        $('#newsList ul li').text('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。');
    }
    $('#instructionsList').html(`
        <ul>
            <li>
                <h3>第一步, 前往设置 -> 订阅源添加新闻源</h3>
                <ul>
                    <li>支持 <b>API</b>, <b>DOM</b> 和 <b>RSS</b> 模式。</li>
                    <li><b>API</b> 模式已经内置四个选项, 如果你有新的新闻 API, 可以发邮件通知我。</li>
                    <li><b>DOM</b> 模式需要你自行配置。</li>
                    <li>举一个例子, 如果你想从 https://lite.cnn.com/en，获取新闻信息, 你可以在 'name' 输入框输入自定义名称, 在 'link' 输入 https://lite.cnn.com/en, 在输入框 'rules' 输入 '.tabcontent ul li a'。</li>
                    <li><b>RSS</b> 模式也需要你自行配置。</li>
                    <li>举一个例子, 如果你想订阅 https://www.luckydesigner.space/feed, 你可以在 'name' 输入框输入自定义名称, 在 'link' 输入 https://www.luckydesigner.space/feed。</li>
                </ul>
            </li>
            <li>
                <h3>第二步, 前往新闻后点击开始按钮</h3>
                <ul>
                    <li>享受有趣的新闻吧。</li>
                </ul>
            </li>
            <li>
                <h3>注意事项</h3>
                <li>重复的自定义名称可能会造成错误。</li>
                <li>有些网站可能三种模式都不支持。</li>
            </li>
        </ul>
    `);
}

// English Translator
function englishTranslate() {
    $('#news').text('News');
    $('#settings').text('Settings');
    $('#instructions').text('Instructions');
    $('#startText').text('Start：');
    $('#totalText').text('Total：');
    $('#searchText').text('Search Keywords：');
    $('#searchBtn').val('øSearch');
    $("#searchBtn").attr("title", "Search");
    $('#exportExcel').val('∫Export');
    $('#exportExcel').attr("title", "Export");
    $('#about').text('About');
    $('#advanced').text('Advanced');
    $('#blacklistText').html(`Blacklist Filter<span class="tooltip">&nbsp;?&nbsp;</span><span class="tooltip-text">Separated by "|", such as "porn|sex|stupid"</span>`);
    $('#blacklistFilter').attr('placeholder', 'porn|sex|stupid');
    $('#memoryModeText').text('Memory Model');
    $('#basic').text('Basic');
    $('#donate').text('Donate');
    $('#history').text('History');
    $('#historyList').html(`
        <ul>
            <li class="settingscontent">
                <h3>Version 1.3.0<h3>
                <p>2023-09-04</p>
            </li>
            <ul>
                <li>Style add Dark Mode.</li>
                <li>Fixed Bugs.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.2.0<h3>
                <p>2023-09-02</p>
            </li>
            <ul>
                <li>The memory mode is added in the advanced settings, which can automatically display the last listed news list after it is turned on.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.1.0<h3>
                <p>2023-08-30</p>
            </li>
            <ul>
                <li>Add a blacklist, which can block news items containing words in the blacklist.</li>
                <li>Add reset function to restore default settings.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.0.0<h3>
                <p>2023-08-20</p>
            </li>
            <ul>
                <li>LuckyNews Box Demo Published.</li>
            </ul>
        </ul>    
    `);
    $('#resetText').text('Reset');
    $('#resetBtn').text('Yes');
    $('#rules').text('Rules');
    $('#style').text('Style');
    $('#versionText').text('Version');
    $('#emailText').text('E-mail');
    $('#powerText').text('Power By');
    $('#socialText').text('Social');
    $('#wechatImg').attr('title', 'Wechat ID: Nosense-history');
    $('#languageText').text('Languages');
    $('#totalLimitsText').text('Total Limits');
    $('#orderText').text('Order Settings');
    $('#defaultText').text('Default');
    $('#shortText').text('S to L');
    $('#longText').text('L to S');
    $('#randomText').text('Random');
    $('#paypalText').text('PayPal');
    $('#alipayText').text('Alipay');
    $('#wechatpayText').text('Wechat Pay');
    $("input[type='button'].sourceadd").attr('title', 'Add');
    $("input[type='button'].sourceaddrss").attr('title', 'Add');
    $("input[type='button'].testbtnapi").attr('title', 'Test State');
    $("input[type='button'].testbtn").attr('title', 'Test State');
    $("input[type='button'].testbtnrss").attr('title', 'Test State');
    $('#apiTips').text('If you have news api, you can mail me. I will add here.');
    $('#darkModeText').text('Dark Mode');
    $('#fontSizeText').text('Font Size');
    $('#fontColorText').text('Font Color');
    if ($('#newsList ul li').text().indexOf('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。') > -1) {
        $('#newsList ul li').text('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.');
    } else if ($('#newsList ul li').text().indexOf('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。') > -1) {
        $('#newsList ul li').text('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.');
    }
    $('#instructionsList').html(`
        <ul>
            <li>
                <h3>First, go to Settings -> Rules to add news sources</h3>
                <ul>
                    <li>Supports <b>API</b>, <b>DOM</b> and <b>RSS</b> modes.</li>
                    <li><b>API</b> mode has built-in four options by default, if you have more new news APIs, you can email me.</li>
                    <li><b>DOM</b> mode requires you to configure it by yourself.</li>
                    <li>As an example, if you want to get news from https://lite.cnn.com/en, you can add a custom name in the input box 'name', type https://lite.cnn.com/en in the input box 'link', and type '.tabcontent ul li a' in the input box 'rules'.</li>
                    <li><b>RSS</b> mode also requires you to configure it by yourself.</li>
                    <li>As an example, if you want to subscribe https://www.luckydesigner.space/feed, you can add a custom name in the input box 'name', type https://www.luckydesigner.space/feed in the input box 'link'.</li>
                </ul>
            </li>
            <li>
                <h3>Second, go to News to click Start button</h3>
                <ul>
                    <li>Enjoy interesting news.</li>
                </ul>
            </li>
            <li>
                <h3>Tips</h3>
                <li>Duplicate custom names are deprecated, causing errors.</li>
                <li>Some websites may not support all three modes.</li>
            </li>
        </ul>
    `);
}

// Tooltip Show Or Not
function tooltipShowOrNot() {
    $('.tooltip').hover(function () {
        $('.tooltip-text').fadeIn(200);
    }, function () {
        $('.tooltip-text').fadeOut(200);
    });
}
