/**
 * yyyi.uiモジュール
 */
YYYI.ui = (function(){
  /** 検索項目のid配列 */
  var boxes = {
    0: ["name", "rare", "color", "range",
        "skill-type", "skill-trigger", "skill-target", "skill-status"],
    1: ["name", "rare", "color", "range"],
    2: ["skill-type", "skill-trigger", "skill-target", "skill-status"]
  };
  /**
   * UIの初期化を行う
   */
  init = function() {
    _initSearchAccordion();
    // ボタンアクション登録
    $("#yyyi-search-form").on("submit", _onSearchButton);
    $("#yyyi-search-form").on("reset", _onResetButton);
    $('.search-select').on("change", 'input[type="checkbox"]', _onCheck);
    $(".acd-head").on("click", _onAccodionHead);
    _initFooter();

    var pageTop = $('#pagetop');
    pageTop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {  //100pxスクロールしたら表示
        pageTop.fadeIn();
      } else {
        pageTop.fadeOut();
      }
    });
    pageTop.on("click", _onTop);
    pageTop.removeClass("invisible");
  }
  function _onTop() {
      $('body, html').animate({
        scrollTop: 0
      }, 500); //0.5秒かけてトップへ移動
      return false;
  }
  /**
   * 検索アコーディオンを生成する
   */
  function _initSearchAccordion() {
    _initSearchBox("name", YYYI.master.getSelection("name"));  // キャラクター
    _initSearchBox("rare", YYYI.master.getSelection("rare"));  // レアリティ
    _initSearchBox("color", YYYI.master.getSelection("color"));  // 属性
    _initSearchBox("range", YYYI.master.getSelection("range"));  // 距離タイプ
    _initSearchBox("skill-type", YYYI.master.getSelection("skill-type"));  // スキルタイプ
    _initSearchBox("skill-trigger", YYYI.master.getSelection("skill-trigger"));  // タイミング
    _initSearchBox("skill-target", YYYI.master.getSelection("skill-target"));  // 対象
    _initSearchBox("skill-status", YYYI.master.getSelection("skill-status"));  // 効果
  }
  /**
   * 検索ボックスを生成する
   * @param target 検索ボックスの種別
   * @param elements 検索ボックスに並べるlabelとvalueのマップの配列
   */
  function _initSearchBox(target, selection) {
    $seachBox = $("#search-select-" + target);
    selection.forEach(option => {
      var value = option.v;
      var inputId = target + "-" + value;
      var $input = $('<input type="checkbox" name="' + target + '">').attr("id", inputId).attr("value", value);
      if (value == 0) {
        $input.attr("checked", "checked");
      }
      var label = option.l;
      var $label = $('<label></label>').attr("for", inputId).append(label);
      $seachBox.append($input);
      $seachBox.append($label);
    });
  }
  /**
   * footerを初期化する
   */
  function _initFooter() {
    // バージョン表記
    $("#version").append("version : " + YYYI.version + "(" + YYYI.dataVersion + ")");
    // Twitterリンク
    var twitterUrl = "https://twitter.com/intent/tweet?hashtags=yyyi_search&related=yyyi_game:%E3%80%8E%E7%B5%90%E5%9F%8E%E5%8F%8B%E5%A5%88%E3%81%AF%E5%8B%87%E8%80%85%E3%81%A7%E3%81%82%E3%82%8B+%E8%8A%B1%E7%B5%90%E3%81%84%E3%81%AE%E3%81%8D%E3%82%89%E3%82%81%E3%81%8D%E3%80%8F%E5%85%AC%E5%BC%8F%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%A7%E3%81%99%E3%80%82,anime_yukiyuna:%E3%82%A2%E3%83%8B%E3%83%A1%E3%80%8E%E7%B5%90%E5%9F%8E%E5%8F%8B%E5%A5%88%E3%81%AF%E5%8B%87%E8%80%85%E3%81%A7%E3%81%82%E3%82%8B%E3%80%8F%E5%85%AC%E5%BC%8F%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%A7%E3%81%99%E3%80%82&text=[ver."+YYYI.version+"]";
    $("#contact a").attr("href", twitterUrl);
  }

  /**
   * 検索結果を表示する
   * @param {Array} result 検索結果の配列
   */
  showResult = function(result) {
    var content = $('#yyyi-search-result-content');
    content.empty();
    if (result.length > 0) {
      content.append('<div class="info">実質<span class="count">' + result.length + '</span>人！</div>');
      $.each(result, function() {
        var $div = $('<div class="list-card"></div>');
        var $img = _generateImgElem(this.c, this.d, this.e, this.f, this.g);
        $div.append($img);
        var $info = _generateInfoElem(this.h, this.i, this.j, this.k, this.l, this.m);
        $div.append($info);
        content.append($div);
      });
      _toggleNotFound(true);
    } else {
      _toggleNotFound(false);
    }
  }
  /**
   * 検索結果左側を生成する
   * @param {String} tl title
   * @param {String} nm name
   * @param {Number} ra rare
   * @param {Number} cl color
   * @param {Number} rg range
   */
  _generateImgElem = function(tl, nm, ra, cl, rg){
    var $img = $('<div class="list-img theme-'+nm+'"></div>');
    if (tl != '') {
      var $title = $('<p class="yusha-title"></p>').append(tl);
      $img.append($title);
    }
    var $name = $('<p class="yusha-name white-bold"></p>').append(YYYI.master.getName(nm));
    $img.append($name);
    var src = YYYI.master.getImgSrc(nm, 200);
    $img.append($('<image src=""/>').attr('src', src));
    var $rcr = $('<p class="yusha-rcr-inner"></p>');
    $rcr.append($('<span class="yusha-rare"></span>').append(YYYI.master.getRare(ra)));
    $rcr.append(' / ');
    $rcr.append($('<span class="yusha-color theme-color-'+(cl)+'"></span>').append(YYYI.master.getColorShort(cl)));
    $rcr.append(' / ');
    $rcr.append($('<span class="yusha-range"></span>').append(YYYI.master.getRangeShort(rg)));
    var $div = $('<div class="yusha-rcr-outer theme-rare-'+ra+'"></div>');
    $div.append($rcr);
    $img.append($div);
    return $img;
  }
  /**
   * 検索結果右側を生成する
   * @param {String} ls  leader_skill
   * @param {String} lsd leader_skill_desc
   * @param {String} at  arts
   * @param {String} atd arts_desc
   * @param {String} ab  ability
   * @param {String} abd ability_desc
   */
  _generateInfoElem = function(ls, lsd, at, atd, ab, abd) {
    var $info = $('<div class="list-info"></div>');
    var $ul = $('<ul></ul>');
    var $li = $('<li class="leader-skill"></li>');
    var $title = $('<p class="title white-bold"></p>');
    var $desc = $('<p class="desc"></p>')
    if (ls != '') {
      var $leader_skill = $li.clone(true).attr("class", "leader-skill");
      $leader_skill.append($title.clone(true).append(ls));
      $leader_skill.append($desc.clone(true).append(lsd));
      $ul.append($leader_skill);
    }
    if (at != '') {
      var $arts = $li.clone(true).attr("class", "arts");
      $arts.append($title.clone(true).append(at));
      $arts.append($desc.clone(true).append(atd));
      $ul.append($arts);
    }
    if (ab != '') {
      var $ability = $li.clone(true).attr("class", "ability");
      $ability.append($title.clone(true).append(ab));
      $ability.append($desc.clone(true).append(abd));
      $ul.append($ability);
    }
    $info.append($ul);
    return $info;
  }

  /**
   * 検索項目ラベル部タップ時のアクション
   */
  _onAccodionHead = function(event) {
    var checked = $("+ input", this).prop("checked");
    if (checked){
      $("+ input", this).prop("checked", false);
      event.preventDefault();
    }
  }
  /**
   * 検索するボタンアクション
   */
  function _onSearchButton() {
    _closeAccodion();
    var params = _gatherParams();
    // console.log(params);
    var result = YYYI.search.find(params);
    YYYI.ui.showResult(result);
    // 黒板までスクロール
    $('html, body').animate({
      scrollTop: $('#yyyi-search-result').offset().top,
    }, 500);
    return false;
  }
  /**
   * アコーディオンを閉じる
   */
  function _closeAccodion() {
    $('#base-1').prop("checked", false);
    $('#base-2').prop("checked", false);
    $('#base-3').prop("checked", false);
    $('#base-4').prop("checked", false);
    $('#skill-1').prop("checked", false);
    $('#skill-2').prop("checked", false);
    $('#skill-3').prop("checked", false);
    $('#skill-4').prop("checked", false);
  }
  /**
   * 検索パラメータを収集して返す
   * @return {Array} 検索パラメータ
   */
  function _gatherParams() {
    var name = [];
    $('[name="name"]:checked').map(function() {
      name.push($(this).val());
    });
    var rare = [];
    $('[name="rare"]:checked').map(function() {
      rare.push($(this).val());
    });
    var color = [];
    $('[name="color"]:checked').map(function() {
      color.push($(this).val());
    });
    var range = [];
    $('[name="range"]:checked').map(function() {
      range.push($(this).val());
    });
    var skillType = [];
    $('[name="skill-type"]:checked').map(function() {
      skillType.push($(this).val());
    });
    var skillTrigger = [];
    $('[name="skill-trigger"]:checked').map(function() {
      skillTrigger.push($(this).val());
    });
    var skillTarget = [];
    $('[name="skill-target"]:checked').map(function() {
      skillTarget.push($(this).val());
    });
    var skillStatus = [];
    $('[name="skill-status"]:checked').map(function() {
      skillStatus.push($(this).val());
    });
    return {
      "code": [],
      "name": name,
      "rare": rare,
      "color": color,
      "range": range,
      "skillType": skillType,
      "skillTrigger": skillTrigger,
      "skillTarget": skillTarget,
      "skillStatus": skillStatus,
    };
  }
  /**
   * 絞り込みを解除するボタンアクション
   */
  function _onResetButton() {
    _closeAccodion();
    boxes[0].forEach((box) => {
      var id = '#search-select-' + box;
      var checkboxes = $(id).find('input[type="checkbox"]');
      for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value != "0") {
          $(checkboxes[i]).prop("checked", false);
        } else {
          $(checkboxes[i]).prop("checked", true);
        }
      }
      _setCurrent($('#current-'+box), ["0"]);
      _toggleTabFlower(1, "基本検索");
      _toggleTabFlower(2, "スキル検索");
    });
    return false;
  }
  /**
   * 検索条件タップ時アクション
   * 主にデフォルト条件の切り替え
   */
  function _onCheck(){
    var myVal = $(this).val();
    var myChecked = $(this).prop("checked");
    var $parent = $(this).parents(".search-select");
    var $children = $parent.find('input[type="checkbox"]');
    var current = [];
    if (myVal == "0") {
      if (myChecked) {
        // 自分が「すべて」かつチェックが「付いた」-> 他の兄弟のチェックを全て外す
        for (i = 0; i < $children.length-1; i++) {
          $($children[i]).prop("checked", false);
        }
        current.push("0");
      } else {
        // 自分が「すべて」かつチェックが「外れた」-> 外さない
        $(this).prop("checked", true);
        current.push("0")
      }
    } else {
      if (myChecked) {
        // 自分が「すべて」以外かつチェックが「付いた」->「すべて」のチェックを外す
        $($children[$children.length-1]).prop("checked", false);
        for (i = 0; i < $children.length-1; i++) {
          if ($($children[i]).prop("checked")) {
            current.push($($children[i]).val());
          }
        }
  
      } else {
        // 自分が「すべて」以外かつチェックが「外れた」
        // -> 他の兄弟にチェック済みが一人もいなかったら「すべて」にチェックを入れる
        for (i = 0; i < $children.length-1; i++) {
          if ($($children[i]).prop("checked")) {
            current.push($($children[i]).val());
          }
        }
        if (current.length < 1) {
          $($children[$children.length-1]).prop("checked", true);
          current.push("0")
        }
      }
    }
  
    var $div = $(this).parents(".acd-box");
    var $current = $div.find(".search-current");
    _setCurrent($current, current);
    _toggleTabFlower(1, "基本検索");
    _toggleTabFlower(2, "スキル検索");
  }
  /**
   * 現在選択中の検索条件をラベル部に表示する
   * @param {Object} element ラベルオブジェクト
   * @param {Array} current 現在選択中の条件
   */
  function _setCurrent($element, current) {
    var id = $element.prop("id");
    id = id.replace("current-", "");
    YYYI.master.getCurrent($element, id, current);
  }
  /**
   * デフォルト以外の選択条件が加わった際にタブラベルに花アイコンを付加する
   * @param {Number} index タブインデックス
   * @param {String} defaultLabel デフォルトタブラベル
   */
  function _toggleTabFlower(index, defaultLabel) {
    var hasTag = false;
    boxes[index].forEach((box) => {
      if (!hasTag) {
        var id = '[name="'+box+'"]:checked'
        $(id).map(function() {
          if ($(this).val() != "0") {
            hasTag = true;
            return;
          }
        });
      }
    });
    var tab = $('#tab-li-'+index+' label');
    var label = defaultLabel;
    if (hasTag) {
      label += "　&#10047;";
    }
    tab.html(label);
  }
  /**
   * NotFoundメッセージの表示を切り替える
   * @param {Boolean} found 検索結果が1件以上あったかどうか
   */
  function _toggleNotFound(found) {
    var $notfound = $('#notfound');
    if (found) {
      $notfound.addClass('found');
      $notfound.removeClass('notfound');
    } else {
      $notfound.addClass('notfound');
      $notfound.removeClass('found');
    }
  }
  return {
    init: init,
    showResult: showResult
  };
}());
