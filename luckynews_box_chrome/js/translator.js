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
    } else if (window.localStorage.getItem('language') == 'jp') {
        japaneseTranslator();
    }
    $('#languages').on('change', function () {
        let selectLanguage = $(this).val();
        localStorage.setItem('language', selectLanguage);
        if ($(this).val() === 'zh-CN') {
            cnChineseTranslate();
        } else if ($(this).val() === 'zh-TW') {
            twChineseTranslator();
        } else if ($(this).val() === 'en') {
            englishTranslate();
        } else if ($(this).val() === 'jp') {
            japaneseTranslator();
        }
    });
});
// JP Translator
function japaneseTranslator() {
    $('#startText').text('始める：');
    $('#totalText').text('合計：');
    $('#totalFavouriteText').text('合計：');
    $('#nameItem').attr('placeholder', '検索キーワード');
    $('#nameFavouriteItem').attr('placeholder', '検索キーワード');
    $('.customsearchbtn').attr("title", "検索");
    $('#exportExcel').attr("title", "輸出");
    $('#exportFavouriteExcel').attr("title", "輸出");
    $('#clearFavouriteList').attr("title", "クリア");
    $('.removenewsfavourite').attr("title", "消去");
    $('#about').text('について');
    $('#advanced').text('高度な');
    $('#blacklistText').text('ブラックリスト');
    $('#favouriteText').text('お気に入りリスト');
    $('.tooltip').attr("title", `嫌いな単語を含むニュース項目をブロックするには、「porn|sex|stupid」など、「|」を使用して切り取ります。`);
    $('.tooltip-favourite').attr("title", `「お金|学び|知恵」など、好きな言葉が含まれるニュースを集めて「|」で切り取ります。`);
    $('#blacklistFilter').attr('placeholder', 'porn|sex|stupid');
    $('#favouriteFilter').attr('placeholder', 'お金|学び|知恵');
    $('#memoryModeText').text('メモリーモード');
    $('#importRulesText').text('フィードをインポートする');
    $('#uploadButton').text('JSONをアップロードする');
    $('#exportRulesText').text('フィードのエクスポート');
    $('#downloadButton').text('ダウンロード');
    $('#basic').text('基本的な');
    $('#donate').text('寄付する');
    $('#history').text('歴史');
    $('#historyList').html(`
    <ul>
        <li class="settingscontent">
            <h3>バージョン 1.7.1<h3>
            <p>2023-10-20</p>
        </li>
        <ul>
            <li>フィードにダブルクリック並べ替え機能を追加しました。</li>
            <li>日本語サポートを追加しました。</li>
            <li>エクスポートファイル名に日付を追加する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.7.0<h3>
            <p>2023-10-13</p>
        </li>
        <ul>
            <li>ニュースページとコレクションページに「トップに戻る」ボタンを追加しました。</li>
            <li>フィード ルール ページを最適化し、並べ替えを増やす。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.8<h3>
            <p>2023-10-08</p>
        </li>
        <ul>
            <li>ニュース項目の読書エクスペリエンスを最適化する。</li>
            <li>バグを修正する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.6<h3>
            <p>2023-09-28</p>
        </li>
        <ul>
            <li>ニュースアイテムを共有するための共有ボタンを追加します。</li>
            <li>ページアイコンを美しくする。</li>
            <li>プレゼンテーションを最適化する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.5<h3>
            <p>2023-09-25</p>
        </li>
        <ul>
            <li>コレクションメニューにクリアボタンを追加。</li>
            <li>メモリモードを最適化し、最後に閉じる前のニュース項目の位置までスクロールします。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.4<h3>
            <p>2023-09-23</p>
        </li>
        <ul>
            <li>お気に入りリストのフィルタリングを追加 ニュースを入手するたびに、お気に入りの単語が含まれるニュース項目が自動的に保存されます。</li>
            <li>ページアイコンを美しくする。</li>
            <li>プレゼンテーションを最適化する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.2<h3>
            <p>2023-09-16</p>
        </li>
        <ul>
            <li>フィード名フィルターを追加する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.6.0<h3>
            <p>2023-09-13</p>
        </li>
        <ul>
            <li>ポップアップモードでの入力の不便さを解決するために、新しい安定入力フィード設定ページを追加しました。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.5.0<h3>
            <p>2023-09-09</p>
        </li>
        <ul>
            <li>新しいインポートされたニュース フィードを追加しました。</li>
            <li>輸出ニュースフィードを追加しました。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.4.0<h3>
            <p>2023-09-07</p>
        </li>
        <ul>
            <li>お気に入りのニュースを集めるのに役立つ新しいお気に入り機能を追加しました。</li>
            <li>複数の RSS フィードを追加するときにクラッシュする問題を修正しました。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.3.0<h3>
            <p>2023-09-04</p>
        </li>
        <ul>
            <li>スタイルにダークモードを追加。</li>
            <li>バグを修正する。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.2.0<h3>
            <p>2023-09-02</p>
        </li>
        <ul>
            <li>詳細設定にメモリーモードを追加し、オンにすると最後にリストされたニュースリストを自動的に表示できるようになりました。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.1.0<h3>
            <p>2023-08-30</p>
        </li>
        <ul>
            <li>ブラックリスト フィルタリングを追加しました。ブラックリスト内の単語を含むニュース項目をブロックできます。</li>
            <li>デフォルト設定に戻すリセット機能を追加。</li>
        </ul>
        <li class="settingscontent">
            <h3>バージョン 1.0.0<h3>
            <p>2023-08-20</p>
        </li>
        <ul>
            <li>LuckyNews Box のデモが公開されました。</li>
        </ul>
    </ul>    
    `);
    $('#resetText').text('リセット');
    $('#rules').text('フィード');
    $('#style').text('样式');
    $('#versionText').text('スタイル');
    $('#emailText').text('電子メイル');
    $('#powerText').text('テクニカルサポート');
    $('#wechatImg').attr('title', 'WeChat ID: Nosense-history');
    $('#socialText').text('ソーシャルメディア');
    $('#languageText').text('言語');
    $('#totalLimitsText').text('ニュース項目の総数制限');
    $('#orderText').text('ニュース項目の並べ替え');
    $('#defaultText').text('デフォルト');
    $('#shortText').text('短いから長いまで');
    $('#longText').text('長いから短いまで');
    $('#randomText').text('ランダム');
    $('#paypalText').text('ペイパル');
    $('#alipayText').text('アリペイ');
    $('#wechatpayText').text('微信');
    $('.activetranslate').text('有効');
    $('.nametranslate').text('名前');
    $('.linktranslate').text('リンク');
    $('.elementstranslate').text('要素');
    $('.statetranslate').text('状態');
    $('.typetranslate').text('種類');
    $('.optiontranslate').text('操作');
    $("input[type='button'].sourceadd").attr('title', 'に追加');
    $("input[type='button'].sourceaddrss").attr('title', 'に追加');
    $(".teststatus").attr('title', 'テストステータス');
    $('#apiTips').text('新しいニュース API をお持ちの場合は、メールでお知らせください');
    $('#stableEditTitle').attr('title', '安定した編集');
    $('#darkModeText').text('暗黑モード');
    $('#fontSizeText').text('ニュースのフォントサイズ');
    $('#fontColorText').text('ニュースのフォントの色');
    if ($('#newsList ul li').text().indexOf('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.') > -1) {
        $('#newsList ul li').text('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。');
    } else if ($('#newsList ul li').text().indexOf('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。') > -1) {
        $('#newsList ul li').text('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。');
    } else if ($('#newsList ul li').text().indexOf('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。') > -1) {
        $('#newsList ul li').text('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。');
    }
    $('#instructionsList').html(`
        <ul>
            <li>
                <h3>最初のステップとして、[設定] -> [フィード] に移動してニュース ソースを追加します</h3>
                <ul>
                    <li><b>API</b>、<b>DOM</b>、<b>RSS</b> モードをサポートします。 </li>
                    <li><b>API</b> モードには 4 つの組み込みオプションがあります。新しいニュース API がある場合は、メールで通知してもらえます。 </li>
                    <li><b>DOM</b> モードでは、自分で設定する必要があります。 </li>
                    <li>たとえば、https://lite.cnn.com/en からニュース情報を取得する場合は、[名前] 入力ボックスにカスタム名を入力し、[リンク] に https://lite.cnn.com/en の入力ボックス「元素」に「.tabcontent ul li a」と入力します。 </li>
                    <li><b>RSS</b> モードでも、自分で設定する必要があります。 </li>
                    <li>たとえば、https://www.luckydesigner.space/feed を購読したい場合は、[名前] 入力ボックスにカスタム名を入力し、[RSS] に https://www.luckydesigner.space/feed を入力します。 </li>
                </ul>
            </li>
            <li>
                <h3>2 番目のステップでは、ニュースに移動して [スタート] ボタンをクリックします</h3>
                <ul>
                    <li>興味深いニュースをお楽しみください。 </li>
                </ul>
            </li>
            <li>
                <h3>メモ</h3>
                <li>カスタム名が重複するとエラーが発生する可能性があります。 </li>
                <li>Web サイトによっては、3 つのモードすべてをサポートしていない場合があります。 </li>
            </li>
        </ul>
    `);    
}

// TW Chinese Translator
function twChineseTranslator() {
    $('#startText').text('啟動：');
    $('#totalText').text('總量：');
    $('#totalFavouriteText').text('總量：');
    $('#nameItem').attr('placeholder', '搜尋關鍵字');
    $('#nameFavouriteItem').attr('placeholder', '搜尋關鍵字');
    $('.customsearchbtn').attr("title", "搜尋");
    $('#exportExcel').attr("title", "匯出");
    $('#exportFavouriteExcel').attr("title", "匯出")
    $('#clearFavouriteList').attr("title", "清空");
    $('.removenewsfavourite').attr("title", "剔除");
    $('#about').text('關於');
    $('#advanced').text('高級');
    $('#blacklistText').text('黑名單');
    $('#favouriteText').text('喜愛名單');
    $('.tooltip').attr("title", `屏蔽含有你不喜歡詞彙的新聞條目，使用“｜”切割, 比如 "色情|性愛|愚蠢"`);
    $('.tooltip-favourite').attr("title", `收藏含有你喜歡詞彙的新聞條目，使用「｜」切割, 例如 "錢|學習|智慧"`);
    $('#blacklistFilter').attr('placeholder', '色情|性愛|愚蠢');
    $('#favouriteFilter').attr('placeholder', '錢|學習|智慧');
    $('#memoryModeText').text('記憶模式');
    $('#importRulesText').text('匯入訂閱源');
    $('#uploadButton').text('匯入 JSON');
    $('#exportRulesText').text('匯出訂閱源');
    $('#downloadButton').text('匯出');
    $('#basic').text('基礎');
    $('#donate').text('斗内');
    $('#history').text('歷史');
    $('#historyList').html(`
    <ul>
        <li class="settingscontent">
            <h3>版本 1.7.1<h3>
            <p>2023-10-20</p>
        </li>
        <ul>
            <li>訂閱源增加雙擊排序功能。</li>
            <li>新增日語支持。</li>
            <li>匯出檔案名稱增加日期。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.7.0<h3>
            <p>2023-10-13</p>
        </li>
        <ul>
            <li>新聞以及收藏頁面增加返回頂部按鈕。</li>
            <li>優化訂閱源規則頁面，增加排序。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.8<h3>
            <p>2023-10-08</p>
        </li>
        <ul>
            <li>優化新聞條目閱讀體驗。</li>
            <li>修復 Bugs。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.6<h3>
            <p>2023-09-28</p>
        </li>
        <ul>
            <li>增加分享按鈕，用來分享新聞條目。</li>
            <li>美化頁面圖標。</li>
            <li>優化表現形式。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.5<h3>
            <p>2023-09-25</p>
        </li>
        <ul>
            <li>收藏選單​​中增加清空按鈕。</li>
            <li>優化記憶模式，捲動到上次關閉前新聞條目位置。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.4<h3>
            <p>2023-09-23</p>
        </li>
        <ul>
            <li>新增喜愛名單篩選，每次獲取新聞會自動收藏含有你喜歡詞彙的新聞條目。</li>
            <li>美化頁面圖標。</li>
            <li>優化表現形式。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.2<h3>
            <p>2023-09-16</p>
        </li>
        <ul>
            <li>增加訂閱源名稱篩選。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.0<h3>
            <p>2023-09-13</p>
        </li>
        <ul>
            <li>新增穩定輸入訂閱源設置頁面，解決彈出模式下輸入不便。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.5.0<h3>
            <p>2023-09-09</p>
        </li>
        <ul>
            <li>新增匯入訂閱源。</li>
            <li>新增匯出訂閱源。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.4.0<h3>
            <p>2023-09-07</p>
        </li>
        <ul>
            <li>新增收藏夾功能，幫助你收藏喜愛的新聞。</li>
            <li>修復添加多個 RSS 源出現崩潰問題。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.3.0<h3>
            <p>2023-09-04</p>
        </li>
        <ul>
            <li>風格新增暗黑模式。</li>
            <li>修復 Bugs。</li>
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
    $('.activetranslate').text('啟用');
    $('.nametranslate').text('名稱');
    $('.linktranslate').text('連結');
    $('.elementstranslate').text('元素');
    $('.statetranslate').text('狀態');
    $('.typetranslate').text('類型');
    $('.optiontranslate').text('操作');
    $("input[type='button'].sourceadd").attr('title', '新增');
    $("input[type='button'].sourceaddrss").attr('title', '新增');
    $(".teststatus").attr('title', '測試狀態');
    $('#apiTips').text('如果你有新的新聞 API，可以信箱告訴我');
    $('#stableEditTitle').attr('title', '穩定編輯');
    $('#darkModeText').text('暗黑模式');
    $('#fontSizeText').text('新聞字型大小');
    $('#fontColorText').text('新聞字型顏色');
    if ($('#newsList ul li').text().indexOf('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.') > -1) {
        $('#newsList ul li').text('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。');
    } else if ($('#newsList ul li').text().indexOf('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。') > -1) {
        $('#newsList ul li').text('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。');
    } else if ($('#newsList ul li').text().indexOf('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。') > -1) {
        $('#newsList ul li').text('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。');
    }
    $('#instructionsList').html(`
        <ul>
            <li>
                <h3>第一步, 前往設定 -> 訂閱源添加新聞源</h3>
                <ul>
                    <li>支持 <b>API</b>, <b>DOM</b> 和 <b>RSS</b> 模式。</li>
                    <li><b>API</b> 模式已經內置四個選項, 如果你有新的新聞 API, 可以發電郵通知我。</li>
                    <li><b>DOM</b> 模式需要你自行配置。</li>
                    <li>舉一個例子, 如果你想從 https://lite.cnn.com/en 獲取新聞信息, 你可以在 '名稱' 輸入框輸入自定義名稱, 在 '連結' 輸入 https://lite.cnn.com/en, 在輸入框 '元素' 輸入 '.tabcontent ul li a'。</li>
                    <li><b>RSS</b> 模式也需要你自行配置。</li>
                    <li>舉一個例子, 如果你想訂閱 https://www.luckydesigner.space/feed, 你可以在 '名稱' 輸入框輸入自定義名稱, 在 'RSS' 輸入 https://www.luckydesigner.space/feed。</li>
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
    $('#startText').text('开始：');
    $('#totalText').text('总数：');
    $('#totalFavouriteText').text('总数：');
    $('#nameItem').attr('placeholder', '搜索关键词');
    $('#nameFavouriteItem').attr('placeholder', '搜索关键词');
    $('.customsearchbtn').attr("title", "搜索");
    $('#exportExcel').attr("title", "导出");
    $('#exportFavouriteExcel').attr("title", "导出");
    $('#clearFavouriteList').attr("title", "清空");
    $('.removenewsfavourite').attr("title", "删除");
    $('#about').text('关于');
    $('#advanced').text('高级');
    $('#blacklistText').text('黑名单');
    $('#favouriteText').text('喜爱名单');
    $('.tooltip').attr("title", `屏蔽含有你不喜欢词汇的新闻条目，使用“｜”切割, 比如 "色情|性爱|愚蠢"`);
    $('.tooltip-favourite').attr("title", `收藏含有你喜欢词汇的新闻条目，使用“｜”切割, 比如 "钱|学习|智慧"`);
    $('#blacklistFilter').attr('placeholder', '色情|性爱|愚蠢');
    $('#favouriteFilter').attr('placeholder', '钱|学习|智慧');
    $('#memoryModeText').text('记忆模式');
    $('#importRulesText').text('导入订阅源');
    $('#uploadButton').text('上传 JSON');
    $('#exportRulesText').text('导出订阅源');
    $('#downloadButton').text('下载');
    $('#basic').text('基础');
    $('#donate').text('捐赠');
    $('#history').text('历史');
    $('#historyList').html(`
    <ul>
        <li class="settingscontent">
            <h3>版本 1.7.1<h3>
            <p>2023-10-20</p>
        </li>
        <ul>
            <li>订阅源增加双击排序功能。</li>
            <li>新增日语支持。</li>
            <li>导出文件名称增加日期。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.7.0<h3>
            <p>2023-10-13</p>
        </li>
        <ul>
            <li>新闻以及收藏页面增加返回顶部按钮。</li>
            <li>优化订阅源规则页面，增加排序。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.8<h3>
            <p>2023-10-08</p>
        </li>
        <ul>
            <li>优化新闻条目阅读体验。</li>
            <li>修复 Bugs。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.6<h3>
            <p>2023-09-28</p>
        </li>
        <ul>
            <li>增加分享按钮，用来分享新闻条目。</li>
            <li>美化页面图标。</li>
            <li>优化表现形式。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.5<h3>
            <p>2023-09-25</p>
        </li>
        <ul>
            <li>收藏菜单中增加清空按钮。</li>
            <li>优化记忆模式，滚动到上次关闭前新闻条目位置。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.4<h3>
            <p>2023-09-23</p>
        </li>
        <ul>
            <li>新增喜爱名单筛选，每次获取新闻会自动收藏含有你喜欢词汇的新闻条目。</li>
            <li>美化页面图标。</li>
            <li>优化表现形式。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.2<h3>
            <p>2023-09-16</p>
        </li>
        <ul>
            <li>增加订阅源名称筛选。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.6.0<h3>
            <p>2023-09-13</p>
        </li>
        <ul>
            <li>新增稳定输入订阅源设置页面，解决弹出模式下输入不便。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.5.0<h3>
            <p>2023-09-09</p>
        </li>
        <ul>
            <li>新增导入新闻订阅源。</li>
            <li>新增导出新闻订阅源。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.4.0<h3>
            <p>2023-09-07</p>
        </li>
        <ul>
            <li>新增收藏夹功能，帮助你收藏喜爱的新闻。</li>
            <li>修复添加多个 RSS 源出现崩溃问题。</li>
        </ul>
        <li class="settingscontent">
            <h3>版本 1.3.0<h3>
            <p>2023-09-04</p>
        </li>
        <ul>
            <li>样式新增暗黑模式。</li>
            <li>修复 Bugs。</li>
        </ul>
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
    $('.activetranslate').text('启用');
    $('.nametranslate').text('名称');
    $('.linktranslate').text('链接');
    $('.elementstranslate').text('元素');
    $('.statetranslate').text('状态');
    $('.typetranslate').text('类型');
    $('.optiontranslate').text('操作');
    $("input[type='button'].sourceadd").attr('title', '添加');
    $("input[type='button'].sourceaddrss").attr('title', '添加');
    $(".teststatus").attr('title', '测试状态');
    $('#apiTips').text('如果你有新的新闻 API，可以邮箱告诉我');
    $('#stableEditTitle').attr('title', '稳定编辑');
    $('#darkModeText').text('暗黑模式');
    $('#fontSizeText').text('新闻字体尺寸');
    $('#fontColorText').text('新闻字体颜色');
    if ($('#newsList ul li').text().indexOf('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.') > -1) {
        $('#newsList ul li').text('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。');
    } else if ($('#newsList ul li').text().indexOf('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。') > -1) {
        $('#newsList ul li').text('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。');
    } else if ($('#newsList ul li').text().indexOf('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。') > -1) {
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
                    <li>举一个例子, 如果你想从 https://lite.cnn.com/en，获取新闻信息, 你可以在 '名称' 输入框输入自定义名称, 在 '链接' 输入 https://lite.cnn.com/en, 在输入框 '元素' 输入 '.tabcontent ul li a'。</li>
                    <li><b>RSS</b> 模式也需要你自行配置。</li>
                    <li>举一个例子, 如果你想订阅 https://www.luckydesigner.space/feed, 你可以在 '名称' 输入框输入自定义名称, 在 'RSS' 输入 https://www.luckydesigner.space/feed。</li>
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
    $('#startText').text('Start：');
    $('#totalText').text('Total：');
    $('#totalFavouriteText').text('Total：');
    $('#nameItem').attr('placeholder', 'Search Keywords');
    $('#nameFavouriteItem').attr('placeholder', 'Search Keywords');
    $('.customsearchbtn').attr("title", "Search");
    $('#exportExcel').attr("title", "Export");
    $('#exportFavouriteExcel').attr("title", "Export");
    $('#clearFavouriteList').attr("title", "Clear");
    $('.removenewsfavourite').attr("title", "Delete");
    $('#about').text('About');
    $('#advanced').text('Advanced');
    $('#blacklistText').text('Blacklist Filter');
    $('#favouriteText').text('Favourite Filter');
    $('.tooltip').attr("title", `Block news items containing you don't like words. Separated by "|", such as "porn|sex|stupid"`);
    $('.tooltip-favourite').attr("title", `Collect news items containing you favourite words. Separated by "|", such as "money|learn|smart"`);
    $('#blacklistFilter').attr('placeholder', 'porn|sex|stupid');
    $('#favouriteFilter').attr('placeholder', 'money|learn|smart');
    $('#memoryModeText').text('Memory Mode');
    $('#importRulesText').text('Import Rules');
    $('#uploadButton').text('Upload JSON');
    $('#exportRulesText').text('Export Rules');
    $('#downloadButton').text('Download');
    $('#basic').text('Basic');
    $('#donate').text('Donate');
    $('#history').text('History');
    $('#historyList').html(`
        <ul>
            <li class="settingscontent">
                <h3>版本 1.7.1<h3>
                <p>2023-10-20</p>
            </li>
            <ul>
                <li>Add double-click sorting function to feeds.</li>
                <li>Add Japanese support.</li>
                <li>Add date to export file name.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.7.0<h3>
                <p>2023-10-13</p>
            </li>
            <ul>
                <li>Add a return to top button to the news and collection pages.</li>
                <li>Add sorting to the rules tab.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.8<h3>
                <p>2023-10-08</p>
            </li>
            <ul>
                <li>Optimize news item reading experience.</li>
                <li>Fixed Bugs.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.6<h3>
                <p>2023-09-28</p>
            </li>
            <ul>
                <li>Add share button to share news.</li>
                <li>Beautify icons.</li>
                <li>Optimize performance.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.5<h3>
                <p>2023-09-25</p>
            </li>
            <ul>
                <li>Add clear button to favourite menu.</li>
                <li>Optimize memory mode, scroll to the position of the news item before last closing.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.4<h3>
                <p>2023-09-23</p>
            </li>
            <ul>
                <li>Add favorite list filtering, every time you get news, you will automatically collect news items containing your favorite words.</li>
                <li>Beautify icons.</li>
                <li>Optimize performance.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.2<h3>
                <p>2023-09-16</p>
            </li>
            <ul>
                <li>Add feed name filter.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.6.0<h3>
                <p>2023-09-13</p>
            </li>
            <ul>
                <li>Add a new stable input feed setting page to solve the inconvenience of input in pop-up mode.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.5.0<h3>
                <p>2023-09-09</p>
            </li>
            <ul>
                <li>Add Import News Sources.</li>
                <li>Add Export News Sources.</li>
            </ul>
            <li class="settingscontent">
                <h3>Version 1.4.0<h3>
                <p>2023-09-07</p>
            </li>
            <ul>
                <li>Add favourites function to help you collect your favorite news.</li>
                <li>Fixed a crash issue when adding multiple RSS feeds.</li>
            </ul>
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
    $('.activetranslate').text('Active');
    $('.nametranslate').text('Name');
    $('.linktranslate').text('Link');
    $('.elementstranslate').text('Elements');
    $('.statetranslate').text('State');
    $('.typetranslate').text('Type');
    $('.optiontranslate').text('Option');
    $("input[type='button'].sourceadd").attr('title', 'Add');
    $("input[type='button'].sourceaddrss").attr('title', 'Add');
    $(".teststatus").attr('title', 'Test State');
    $('#apiTips').text('If you have news api, you can mail me. I will add here.');
    $('#stableEditTitle').attr('title', 'Stable Edit');
    $('#darkModeText').text('Dark Mode');
    $('#fontSizeText').text('Font Size');
    $('#fontColorText').text('Font Color');
    if ($('#newsList ul li').text().indexOf('什么都没有，请前往设置——订阅源配置好订阅源，再点击开始按钮开始。') > -1) {
        $('#newsList ul li').text('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.');
    } else if ($('#newsList ul li').text().indexOf('什麼都沒有，請前往設置——訂閱源配置好訂閱源，再點擊開始按鈕開始。') > -1) {
        $('#newsList ul li').text('Nothing For You, Please Go to Settings--Rules Select News Source Then Click Start Button to Get Infomation.');
    } else if ($('#newsList ul li').text().indexOf('何もありません。設定 -- フィードに移動してください。ニュース フィードを選択して、[スタート] ボタンをクリックして情報を取得してください。') > -1) {
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
                    <li>As an example, if you want to get news from https://lite.cnn.com/en, you can add a custom name in the input box 'Name', type https://lite.cnn.com/en in the input box 'Link', and type '.tabcontent ul li a' in the input box 'Elements'.</li>
                    <li><b>RSS</b> mode also requires you to configure it by yourself.</li>
                    <li>As an example, if you want to subscribe https://www.luckydesigner.space/feed, you can add a custom name in the input box 'Name', type https://www.luckydesigner.space/feed in the input box 'RSS'.</li>
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
// Mouse Over Save Button Show Text
$(document).on("mouseenter", ".newsfavourite", function () {
    getLocalStorageLanguage = localStorage.getItem('language');
    if (getLocalStorageLanguage == "en") {
        $(this).attr("title", "Save");
    } else if (getLocalStorageLanguage == "zh-CN") {
        $(this).attr("title", "收藏");
    } else if (getLocalStorageLanguage == "zh-TW") {
        $(this).attr("title", "收藏");
    } else if (getLocalStorageLanguage == "jp") {
        $(this).attr("title", "保存");
    }
});
// Mouse Over Favourite Button Show Text
$(document).on("mouseenter", ".removenewsfavourite", function () {
    getLocalStorageLanguage = localStorage.getItem('language');
    if (getLocalStorageLanguage == "en") {
        $(this).attr("title", "Delete");
    } else if (getLocalStorageLanguage == "zh-CN") {
        $(this).attr("title", "清除");
    } else if (getLocalStorageLanguage == "zh-TW") {
        $(this).attr("title", "剔除");
    } else if (getLocalStorageLanguage == "jp") {
        $(this).attr("title", "消去");
    }
});
// Mouse Over Share Button Show Text
$(document).on("mouseenter", ".newsshare", function () {
    getLocalStorageLanguage = localStorage.getItem('language');
    if (getLocalStorageLanguage == "en") {
        $(this).attr("title", "Copy");
    } else if (getLocalStorageLanguage == "zh-CN") {
        $(this).attr("title", "复制");
    } else if (getLocalStorageLanguage == "zh-TW") {
        $(this).attr("title", "複製");
    } else if (getLocalStorageLanguage == "jp") {
        $(this).attr("title", "コピー");
    }
});