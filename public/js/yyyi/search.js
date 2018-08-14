/**
 * yyyi.searchモジュール
 */
YYYI.search = (function(){
  var db;  // データベース
  var yusha;  // yushaテーブル
  var skill;  // skillテーブル
  /**
   * データベース初期化。
   */
  init = function(){
    // データベース作成
    db = new loki("yyyi.db");
    // yushaテーブル初期化
    yusha = db.addCollection('yusha');
    // skillテーブル初期化
    skill = db.addCollection('skill');

    _initByDataJs();
  }
  /**
   * data.jsからデータをロードして初期化する。
   */
  function _initByDataJs() {
    for (var y of YYYI.data.loadY()) {
      yusha.insert(y);
    }
    for (var s of YYYI.data.loadS()) {
      skill.insert(s);
    }
  }
  /**
   * 検索する。
   * @param {Array} params 検索パラメータ
   * @return {Array} 条件に合ったyushaの配列
   */
  find = function(params) {
    // まずskillを検索しcodeを重複なく収集する
    var code = [];
    var skills = _findSkill(params);

    if (Array.isArray(skills)) {
      // スキル検索の結果が0件なら当然0件なので空配列を返して終了
      if (skills.length == 0) {
        return [];

      // スキル検索の結果が1件以上あればコードを絞り込み条件に追加
      } else {
        skills.forEach((skill) => {
          if (code.indexOf(skill.b) === -1) {
            code.push(skill.b);
          }
        });
        params["code"] = code;
      }
    }
    return _findYusha(params);
  }
  /**
   * 条件に合ったskillを検索して返す。
   * @param {Array} params 検索パラメータ
   * @return {Array|bool} 条件に合ったskillの配列
   */
  function _findSkill(params) {
    var $and = [];
    var skillType = params["skillType"];
    if (skillType.length > 0 && skillType[0] != "0") {
      $and.push({'c': {'$in': _toNumArr(skillType)}});
    }
    var skillTrigger = params["skillTrigger"];
    if (skillTrigger.length > 0 && skillTrigger[0] != "0") {
      $and.push({'d': {'$in': _toNumArr(skillTrigger)}});
    }
    var skillTarget = params["skillTarget"];
    if (skillTarget.length > 0 && skillTarget[0] != "0") {
      $and.push({'f': {'$in': _toNumArr(skillTarget)}});
    }
    var skillStatus = params["skillStatus"];
    if (skillStatus.length > 0 && skillStatus[0] != "0") {
      $and.push({'h': {'$in': _toNumArr(skillStatus)}});
    }
    if ($and.length == 0) {
      return false;
    } else {
      return skill.find({'$and': $and});
    }
  }
  /**
   * 条件に合ったyushaを検索して返す。
   * @param {Array} params  検索パラメータ
   * @return {Array} 条件に合ったyushaの配列
   */
  function _findYusha(params) {
    var $and = [];
    var code = params["code"];
    if (code.length > 0) {
      $and.push({'b': {'$in': code}});
    }
    var name = params["name"];
    if (name.length > 0 && name[0] != "0") {
      $and.push({'d': {'$in': _toNumArr(name)}});
    }
    var rare = params["rare"];
    if (rare.length > 0 && rare[0] != "0") {
      $and.push({'e': {'$in': _toNumArr(rare)}});
    }
    var color = params["color"];
    if (color.length > 0 && color[0] != "0") {
      $and.push({'f': {'$in': _toNumArr(color)}});
    }
    var range = params["range"];
    if (range.length > 0 && range[0] != "0") {
      $and.push({'g': {'$in': _toNumArr(range)}});
    }
    return yusha.chain()
      .find({'$and': $and})
      // レアリティ降順、属性昇順、キャラクター昇順、コード昇順
      .compoundsort([['e', true],['f', false],['d', false],['b', false]])
      .data();
  }
  /**
   * 文字列配列を数値配列に変換して返す。
   * @param {Array} arr 文字列配列
   * @return {Array} 数値配列 
   */
  function _toNumArr(arr) {
    var ret = [];
    arr.forEach((elem) => {
      ret.push(+elem);
    });
    return ret;
  }
  
  return {
    init: init,
    find: find
  };
}());

/* モーダルおためし　ここから */
$(function(){
  $("#modal-open").click(function(){
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $(this).blur();	//ボタンからフォーカスを外す
    if($("#modal-overlay")[0]){ return false; }		//新しくモーダルウィンドウを起動しない (防止策1)
    //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)
  
    //オーバーレイを出現させる
    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").fadeIn("slow");
    //コンテンツをセンタリングする
    centeringModalSyncer();
    //コンテンツをフェードインする
    $("#modal-content").fadeIn("slow");
    //[#modal-overlay]、または[#modal-close]をクリックしたら…
    $("#modal-overlay, #modal-close").unbind().click(function() {
     //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
      $("#modal-content, #modal-overlay").fadeOut("slow", function() {
        //[#modal-overlay]を削除する
        $('#modal-overlay').remove();
      });
    });
  });
  
  //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
  $(window).resize(centeringModalSyncer);

  //センタリングを実行する関数
  function centeringModalSyncer() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $(window).width();
    var h = $(window).height();
    // コンテンツ(#modal-content)の幅、高さを取得
    // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
    var cw = $("#modal-content").outerWidth( {margin:true} );
    var ch = $("#modal-content").outerHeight( {margin:true} );
    var cw = $("#modal-content").outerWidth();
    var ch = $("#modal-content").outerHeight();
    //センタリングを実行する
    $("#modal-content").css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
  }
});
/* モーダルおためし　ここまで */
