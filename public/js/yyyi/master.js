/**
 * yyyi.masterモジュール
 */
YYYI.master = (function(){
  _name = {  // 名前
    0: "みんな",
    1: "結城 友奈",
    2: "東郷 美森",
    3: "犬吠埼 風",
    4: "犬吠埼 樹",
    5: "三好 夏凜",
    6: "乃木 園子(中)",
    7: "鷲尾 須美",
    8: "三ノ輪 銀",
    9: "乃木 園子(小)",
    10: "乃木 若葉",
    11: "土居 球子",
    12: "伊予島 杏",
    13: "郡 千景",
    14: "高嶋 友奈",
    15: "上里 ひなた",
    16: "白鳥 歌野",
    17: "藤森 水都",
    18: "秋原 雪花",
    19: "古波蔵 棗",
    // 20: "楠 芽吹",
    // 21: "加賀城 雀",
    // 22: "弥勒 夕海子",
    // 23: "山伏 しずく",
    // 24: "国土 亜耶",
  },
  _s_name = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,0];
  _yusha = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,18,19,0];
  _miko = [2,15,17,0]
  _rare = {  // レアリティ
    0: "すべて",
    1: "N",
    2: "R",
    3: "SR",
    4: "SSR",
  },
  _s_rare = [4,3,2,0];
  _color = {  // 属性
    0: "すべて",
    1: "赤属性",
    2: "青属性",
    3: "緑属性",
    4: "黄属性",
    5: "紫属性",
  },
  _color_short = {  // 属性（省略形）
    0: "すべて",
    1: "赤",
    2: "青",
    3: "緑",
    4: "黄",
    5: "紫",
  },
  _s_color = [1,2,3,4,5,0];
  _range = {  // 攻撃範囲
    0: "すべて",
    1: "近接型",
    2: "範囲型",
    3: "遠射型",
    9: "巫女",
  },
  _range_short = {  // 攻撃範囲（省略形）
    0: "すべて",
    1: "近",
    2: "範",
    3: "遠",
    9: "巫",
  },
  _s_range = [1,2,3,0];
  _skill_type = {  // スキルタイプ
    0: "すべて",
    1: "リーダースキル",
    2: "必殺技",
    3: "アビリティ",
  },
  _s_skill_type = [1,2,3,0];
  _skill_trigger = {  // 発動タイミング
    0: "いつか",
    1: "開幕時",
    2: "二段昇段時",
    3: "三段昇段時",
    4: "四段昇段時",
    5: "五段昇段時",
    6: "六段昇段時",
    7: "七段昇段時",
    8: "八段昇段時",
    9: "九段昇段時",
    10: "十段昇段時",
    11: "昇段時",
    12: "敵撃破時",
    13: "高段の敵撃破時",
    14: "被弾時",
    15: "クリティカル発生時",
    16: "被クリティカル時",
    17: "必殺技発動時",
    18: "ボス出現時",
    19: "HPn割以下",
    20: "HPn割以上",
    21: "HP100%",
    22: "戦闘開始からn秒後",
    23: "敵攻撃による弱体時",
  },
  _s_skill_trigger = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
  _skill_target = {  // 対象
    0: "だれか",
    1: "赤属性",
    2: "青属性",
    3: "緑属性",
    4: "黄属性",
    5: "紫属性",
    6: "前列（左2列）",
    7: "中列（真ん中の2列）",
    8: "後列（右2列）",
    9: "自ペア",
    10: "自ペア以外",
    11: "範囲内の仲間",
    12: "仲間全員",
    // 50: "敵",
    61: "範囲内の敵",
    62: "敵全体",
  }
  _s_skill_target = [1,2,3,4,5,6,7,8,9,10,11,12,61,62,0];
  _skill_status = { // 効果
    0: "なにか",
    1: "ATK昇",
    2: "CRT昇",
    3: "ダメージカット",
    4: "HP回復",
    5: "MAXHP昇",
    6: "移動速度昇",
    7: "攻撃ペース昇",
    8: "踏ん張り昇",
    9: "昇段EXP昇",
    10: "必殺技ゲージ増",
    11: "命中昇",
    12: "必殺技再使用時間減",
    // 50: "なにかダウン",
    51: "ATK減",
    52: "CRT減",
    53: "被ダメージ増",
    54: "HP減少",
    55: "MAXHP減",
    56: "移動速度減",
    57: "攻撃ペース減",
    58: "踏ん張り減",
    59: "昇段EXP減",
    60: "必殺技ゲージ減",
    61: "命中減少",
    62: "必殺技再使用時間増",
    63: "移動停止",
    64: "攻撃停止",
    65: "ノックバック",
    66: "追加ダメージ",
  }
  _s_skill_status = [1,51,2,52,3,53,4,54,5,55,6,56,7,57,8,58,9,59,10,60,
                    11,61,12,62,63,64,65,66,0];

  _getValue = function(_master, index) { return _master[index]; }
  getName = function(index) { return _getValue(_name, index); }
  getRare = function(index) { return _getValue(_rare, index); }
  getColor = function(index) { return _getValue(_color, index); }
  getColorShort = function(index) { return _getValue(_color_short, index); }
  getRange = function(index) { return _getValue(_range, index); }
  getRangeShort = function(index) { return _getValue(_range_short, index); }
  getSkillType = function(index) { return _getValue(_skill_type, index); }
  getSkillTrigger = function(index) { return _getValue(_skill_trigger, index); }
  getSkillTarget = function(index) { return _getValue(_skill_target, index); }
  getSkillStatus = function(index) { return _getValue(_skill_status, index); }

  /**
   * 現在選択中の検索タグを表示する。
   * @param {Object} element
   * @param {String} id
   * @param {Array} currentArr
   */
  getCurrent = function($element, id, currentArr) {
    // 一旦空にする
    $element.empty();
    // あらためて現在選択中のタグを表示
    $.each(currentArr, function(i, elem){
      switch(id) {
        case "name":
          if (currentArr.length == 1 && currentArr[0] == "0") {
            $element.append(_generateSearchTag(['outer-3'], [], 'みんな'));
          } else {
            var src = YYYI.image.getImgBase64(elem);
            var image = $('<img src=""/>').attr('src', src);
            $element.append(image);
          }
          break;
        case "rare":
          $element.append(_generateSearchTag(['outer-3','theme-rare-'+elem], [], getRare(elem)));
          break;
        case "color":
          $element.append(_generateSearchTag(['outer-3'], ['theme-color-'+elem], getColor(elem)));
          break;
        case "range":
          $element.append(_generateSearchTag(['outer-3'], [], getRange(elem)));
          break;
        case "skill-type":
          // 文字長に合ったクラスを付加する
          var str = getSkillType(elem);
          var outerClass = 'outer-' + str.length;
          $element.append(_generateSearchTag([outerClass], [], str));
          break;
        case "skill-trigger":
          // 文字長に合ったクラスを付加する
          var str = getSkillTrigger(elem);
          var outerClass = 'outer-' + str.length;
          $element.append(_generateSearchTag([outerClass], [], str));
          break;
        case "skill-target":
          // 文字長に合ったクラスを付加する
          var str = getSkillTarget(elem);
          var outerClass = 'outer-' + str.length;
          $element.append(_generateSearchTag([outerClass], [], str));
          break;
        case "skill-status":
          // 文字長に合ったクラスを付加する
          var str = getSkillStatus(elem);
          var outerClass = 'outer-' + str.length;
          $element.append(_generateSearchTag([outerClass], [],str));
          break;
        default:
          break;
      }
    });
  }

  /**
   * 検索タグを生成する。
   * @param {Array} outerClasses outer要素のclass
   * @param {Array} itemClasses item要素のclass
   * @param {String} item タグ名
   */
  function _generateSearchTag(outerClasses, itemClasses, item) {
    var $outer = $('<div class="tag-outer"></div>');
    for (var cls of outerClasses) {
      $outer.addClass(cls);
    }
    var $inner = $('<p class="tag-inner"></p>');
    var $item = $('<span class="tag-item">' + item + '</span>');
    for (var cls of itemClasses) {
      $item.addClass(cls);
    }
    $outer.append($inner.append($item));
    return $outer;
  }

  /**
   * 検索ボックスに表示するlabelとvalueのマップ配列を返す
   * @param {String} id 検索項目名
   * @return {Array} {"v":"値", "l":"ラベル"}
   */
  getSelection = function(id) {
    var selection = [];
    switch(id) {
      case "name":
        _s_name.forEach(elem => { selection.push({"v":elem,"l":getName(elem)}); });
        break;
      case "rare":
        _s_rare.forEach(elem => { selection.push({"v":elem,"l":getRare(elem)}); });
        break;
      case "color":
        _s_color.forEach(elem => { selection.push({"v":elem,"l":getColor(elem)}); });
        break;
      case "range":
        _s_range.forEach(elem => { selection.push({"v":elem,"l":getRange(elem)}); });
        break;
      case "skill-type":
        _s_skill_type.forEach(elem => { selection.push({"v":elem,"l":getSkillType(elem)}); });
        break;
      case "skill-trigger":
        _s_skill_trigger.forEach(elem => { selection.push({"v":elem,"l":getSkillTrigger(elem)}); });
        break;
      case "skill-target":
        _s_skill_target.forEach(elem => { selection.push({"v":elem,"l":getSkillTarget(elem)}); });
        break;
      case "skill-status":
        _s_skill_status.forEach(elem => { selection.push({"v":elem,"l":getSkillStatus(elem)}); });
        break;
      default:
        break;
    }
    return selection;
  }

  return {
    getName: getName,
    getRare: getRare,
    getColor: getColor,
    getColorShort: getColorShort,
    getRange: getRange,
    getRangeShort: getRangeShort,
    getSkillType: getSkillType,
    getSkillTrigger: getSkillTrigger,
    getSkillTarget: getSkillTarget,
    getSkillStatus: getSkillStatus,
    getSelection: getSelection,
    getCurrent: getCurrent
  }
}());

