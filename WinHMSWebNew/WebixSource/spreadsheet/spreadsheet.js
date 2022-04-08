/**
 * @license
 * Webix SpreadSheet v.6.4.5
 * This software is covered by Webix Commercial License.
 * Usage without proper license is prohibited.
 * (c) XB Software Ltd.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var en = {
	  labels: {
	    // formats
	    "common": "Common",
	    "currency": "Currency",
	    "number": "Number",
	    "percent": "Percent",
	    "custom-format": "Custom",
	    "decimal-places": "Decimal places",
	    "separator": "Group separator",
	    "negative": "Negative number",
	    "format-docs": "How to create a format",
	    // titles
	    "undo-redo": "Undo/Redo",
	    "font": "Font",
	    "text": "Text",
	    "cell": "Cell",
	    "align": "Align",
	    "format": "Number",
	    "column": "Column",
	    "borders": "Borders",
	    "px": "px",
	    "apply": "Apply",
	    // popups and dialogs
	    "cancel": "Cancel",
	    "save": "Save",
	    // multisheets
	    "sheet": "Sheet",
	    // conditions
	    "conditional-format": "Conditional Format",
	    "condition": "Condition",
	    "conditional-value": "Value",
	    "conditional-style": "Style",
	    "conditional-between": "between",
	    "conditional-not-equal": "not equal",
	    // ranges
	    "range": "Range",
	    "range-title": "Named ranges",
	    "range-name": "Name",
	    "range-cells": "Range",
	    // images
	    "image-or": "or",
	    "image-title": "Add image",
	    "image-upload": "Select file for upload",
	    "image-url": "URL (e.g. http://*)",
	    // sparklines
	    "sparkline-title": "Add sparkline",
	    "sparkline-type": "Type",
	    "sparkline-range": "Range",
	    "sparkline-color": "Color",
	    "sparkline-positive": "Positive",
	    "sparkline-negative": "Negative",
	    // custom format
	    "format-title": "Set format",
	    "format-pattern": "Format pattern",
	    //dropdown
	    "dropdown-empty": "Empty cells",
	    "dropdown-title": "Add dropdown",
	    "dropdown-range": "Range",
	    // confirm
	    "ok": "OK",
	    // import/export
	    "import-title": "Import",
	    "import-not-support": "Sorry, your browser does not support import",
	    "export-title": "Export",
	    "export-name": "Name of xslx file",
	    "export-all-sheets": "Export all sheets",
	    // add link
	    "link-title": "Add Link",
	    "link-name": "Text",
	    "link-url": "URL",
	    //images
	    "image": "Image",
	    "graph": "Graph",
	    //conditional format labels
	    "display": "Display",
	    "value": "Value",
	    // confirm messages
	    "range-remove-confirm": "Are you sure you want to remove the range permanently?",
	    "sheet-remove-confirm": "Are you sure you want to remove the sheet permanently?",
	    "merge-cell-confirm": "Only the left top value will remain after merging. Continue?",
	    "error-range": "The range is incorrect!",
	    //print
	    "print": "Print",
	    "print-title": "Before you print..",
	    "print-settings": "General settings",
	    "print-paper": "Paper size",
	    "print-layout": "Layout",
	    "current-sheet": "Current sheet",
	    "all-sheets": "All sheets",
	    "selection": "Selected cells",
	    "borderless": "Hide gridlines",
	    "sheet-names": "Show sheet names",
	    "skip-rows": "Skip empty rows",
	    "margin": "Hide margins",
	    "page-letter": "Letter",
	    "page-a4": "A4 (210x297mm)",
	    "page-a3": "A3 (297x420mm)",
	    "page-width": "Page width",
	    "page-actual": "Actual Size",
	    "page-portrait": "Portrait",
	    "page-landscape": "Landscape",
	    //comment
	    "comment": "Comment",
	    //resize
	    "width": "Width",
	    "height": "Height"
	  },
	  tooltips: {
	    "color": "Font color",
	    "background": "Background color",
	    "font-family": "Font family",
	    "font-size": "Font size",
	    "text-align": "Horizontal align",
	    "vertical-align": "Vertical align",
	    "borders": "Borders",
	    "borders-no": "Clear borders",
	    "borders-left": "Left border",
	    "borders-top": "Top border",
	    "borders-right": "Right border",
	    "borders-bottom": "Bottom border",
	    "borders-all": "All borders",
	    "borders-outer": "Outer borders",
	    "borders-top-bottom": "Top and bottom borders",
	    "borders-color": "Border color",
	    "align-left": "Left align",
	    "align-center": "Center align",
	    "align-right": "Right align",
	    "align-top": "Top align",
	    "align-middle": "Middle align",
	    "align-bottom": "Bottom align",
	    "span": "Merge",
	    "wrap": "Text wrap",
	    "undo": "Undo",
	    "redo": "Redo",
	    "format": "Number format",
	    "increase-decimals": "Increase decimal places",
	    "decrease-decimals": "Decrease decimal places",
	    "font-weight": "Bold",
	    "font-style": "Italic",
	    "text-decoration": "Underline",
	    "hide-gridlines": "Hide/show gridlines",
	    "hide-headers": "Hide/show headers",
	    "freeze-columns": "Freeze/unfreeze columns",
	    "add-range": "Set name for the selected range",
	    "conditional": "Conditional formatting",
	    "add-sheet": "Add Sheet",
	    "lock-cell": "Lock/unlock cell",
	    "clear": "Clear",
	    "add-link": "Add link",
	    "row": "Rows",
	    "column": "Columns",
	    "sheet": "Sheet",
	    "add-image": "Image",
	    "add-sparkline": "Graph",
	    "add-comment": "Comment"
	  },
	  menus: {
	    "remove-sheet": "Remove sheet",
	    "rename-sheet": "Rename sheet",
	    "file": "File",
	    "new": "New",
	    "new-sheet": "New sheet",
	    "excel-import": "Import from Excel",
	    "excel-export": "Export to Excel",
	    "sheet": "Sheets",
	    "copy-sheet": "Copy to new sheet",
	    "edit": "Edit",
	    "undo": "Undo",
	    "redo": "Redo",
	    "columns": "Columns",
	    "insert-column": "Insert column",
	    "delete-column": "Delete column",
	    "show-column": "Show column",
	    "hide-column": "Hide column",
	    "resize-column": "Resize column",
	    "rows": "Rows",
	    "insert-row": "Insert row",
	    "delete-row": "Delete row",
	    "show-row": "Show row",
	    "hide-row": "Hide row",
	    "resize-row": "Resize row",
	    "insert": "Insert",
	    "conditional-format": "Conditional format",
	    "clear": "Clear",
	    "clear-value": "Values",
	    "clear-style": "Styles",
	    "clear-conditional-formats": "Conditional formats",
	    "clear-dropdown-editors": "Dropdowns and filters",
	    "clear-comments": "Comments",
	    "clear-all": "All",
	    "add-image": "Image",
	    "add-sparkline": "Graph",
	    "data": "Data",
	    "add-link": "Add link",
	    "add-range": "Named ranges",
	    "sort": "Sort",
	    "sort-asc": "Sort A to Z",
	    "sort-desc": "Sort Z to A",
	    "create-filter": "Create filter",
	    "view": "View",
	    "freeze-columns": "Freeze/unfreeze columns",
	    "freeze-rows": "Freeze/unfreeze rows",
	    "hide-gridlines": "Hide/show gridlines",
	    "hide-headers": "Hide/show headers",
	    "add-dropdown": "Add dropdown",
	    "lock-cell": "Lock/unlock cell",
	    "print": "Print",
	    "add-comment": "Comment"
	  },
	  table: {
	    "math-error": "ERROR"
	  }
	};

	webix.i18n.spreadsheet = en;

	webix.protoUI({
	  name: "ssheet-align",
	  $cssName: "richselect",
	  $init: function (config) {
	    config.options = {
	      view: "datasuggest",
	      body: {
	        view: "ssheet-icons",
	        tooltip: {
	          template: "#tooltip#"
	        },
	        xCount: 3,
	        yCount: 1
	      },
	      data: config.data
	    };
	  }
	}, webix.ui.richselect);

	webix.protoUI({
	  name: "ssheet-borders-suggest",
	  defaults: {
	    width: 300
	  },
	  $init: function (config) {
	    config.body = {
	      margin: 6,
	      cols: [{
	        view: "ssheet-icons",
	        scroll: false,
	        select: true,
	        xCount: 4,
	        yCount: 2,
	        tooltip: {
	          template: function (obj) {
	            return webix.i18n.spreadsheet.tooltips["borders-" + obj.id];
	          }
	        },
	        on: {
	          onAfterSelect: function () {
	            var suggest = this.getParentView().getParentView();
	            suggest.updateMasterValue(true);
	          }
	        },
	        template: function (obj) {
	          var css = "webix_ssheet_button_icon webix_ssheet_icon ssi-borders-" + obj.value;
	          return "<span class='" + css + "'></span>";
	        },
	        data: config.data
	      }, {
	        view: "ssheet-separator"
	      }, {
	        rows: [{
	          view: "ssheet-color",
	          css: config.css,
	          name: config.name,
	          width: 68,
	          value: "#000000",
	          tooltip: webix.i18n.spreadsheet.tooltips["borders-color"],
	          title: "<span class='webix_icon wxi-pencil'></span>",
	          on: {
	            onChange: function () {
	              var suggest = this.getParentView().getParentView().getParentView();
	              suggest.updateMasterValue(false);
	            }
	          }
	        }, {}]
	      }]
	    };
	  },
	  updateMasterValue: function (hide) {
	    var value = this.getValue();
	    var master = webix.$$(this.config.master);
	    master.setValue(value);
	    if (hide) this.hide();
	  },
	  setValue: function (value) {
	    if (value[0]) this.getList().select(value[0]);
	    if (value[1]) this.getColorView().setValue(value[1]);
	  },
	  getValue: function () {
	    return [this.getList().getSelectedId(), this.getColorView().getValue() || ""];
	  },
	  getList: function () {
	    return this.getBody().getChildViews()[0];
	  },
	  getColorView: function () {
	    return this.getBody().getChildViews()[2].getChildViews()[0];
	  },
	  getItemText: function () {
	    return "<span class='webix_ssheet_button_icon webix_ssheet_icon ssi-borders-all'>";
	  }
	}, webix.ui.suggest);
	webix.protoUI({
	  name: "ssheet-borders",
	  $cssName: "richselect",
	  $init: function (config) {
	    config.options = {
	      view: "ssheet-borders-suggest",
	      fitMaster: false,
	      data: config.data
	    };
	    this.$ready.push(webix.bind(function () {
	      this.getPopup().config.master = this.config.id;
	    }, this));
	  },
	  setValue: function (value) {
	    if (webix.isArray(value)) {
	      if (!this.config.value || value[0] != this.config.value[0] || value[1] != this.config.value[1]) {
	        this.getPopup().setValue(value);
	      }

	      this.config.value = value;
	      if (value[0]) this.callEvent("onChange");
	    }

	    return value;
	  },
	  getValue: function () {
	    return this.getPopup().getValue().join(",");
	  },
	  getList: function () {
	    return this.getPopup().getBody().getChildViews()[0];
	  },
	  getColorView: function () {
	    return this.getPopup().getBody().getChildViews()[1].getChildViews()[0];
	  }
	}, webix.ui.richselect);

	// toolbar: color selector
	webix.protoUI({
	  $cssName: "colorboard",
	  name: "ssheet-colorboard",
	  defaults: {
	    css: "webix_ssheet_colorboard",
	    palette: [["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"], ["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"], ["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"], ["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"], ["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]]
	  }
	}, webix.ui.colorboard);
	webix.protoUI({
	  $cssName: "richselect",
	  name: "ssheet-color",
	  defaults: {
	    css: "webix_ssheet_color",
	    icon: "wxi-menu-down",
	    suggest: {
	      borderless: true,
	      body: {
	        view: "ssheet-colorboard",
	        height: 202,
	        on: {
	          onSelect: function (value) {
	            this.getParentView().setMasterValue({
	              value: value
	            });
	          }
	        }
	      }
	    }
	  },
	  $init: function () {
	    this.$view.className += " webix_ssheet_color";
	  },
	  $renderInput: function (config, divStart, id) {
	    var color = this.renderColor.call(this);
	    divStart = divStart.replace(/([^>]>)(.*)(<\/div)/, function (match, p1, p2, p3) {
	      return p1 + config.title + color + p3;
	    });
	    return webix.ui.colorpicker.prototype.$renderInput.call(this, config, divStart, id);
	  },
	  $setValue: function (value) {
	    var popup = webix.$$(this.config.popup.toString());
	    var colorboard = popup.getBody();

	    if (value) {
	      colorboard.setValue(value);
	      this.config.value = value;
	      this.getColorNode().style.backgroundColor = value;
	    }
	  },
	  renderColor: function () {
	    return "<div class='webix_ssheet_cp_color' style='background-color:" + this.config.value + ";'> </div>";
	  },
	  getColorNode: function () {
	    return this.$view.firstChild.firstChild.childNodes[1];
	  },
	  $renderIcon: function () {
	    return webix.ui.text.prototype.$renderIcon.apply(this, arguments);
	  }
	}, webix.ui.colorpicker);

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	webix.protoUI({
	  $cssName: "window",
	  name: "ssheet-dialog",
	  $init: function (config) {
	    this.$view.className += " webix_ssheet_dialog";
	    this.config.buttons = config.buttons;
	  },
	  getHeaderConfig: function (label) {
	    return {
	      paddingX: 10,
	      paddingY: 5,
	      height: 60,
	      cols: [{
	        view: "label",
	        label: label
	      }, {
	        view: "icon",
	        css: "webix_ssheet_hide_icon",
	        icon: "webix_ssheet_icon ssi-close",
	        width: 50,
	        click: function () {
	          var parentView = this.getTopParentView();
	          parentView.callEvent("onHideClick", []);
	        }
	      }]
	    };
	  },
	  getBodyConfig: function (content) {
	    content.borderless = true;
	    var elements = this.getFormElements(content);
	    var config = {
	      view: "form",
	      css: "webix_ssheet_form",
	      paddingY: 0,
	      elements: elements
	    };
	    return config;
	  },
	  getFormElements: function (content) {
	    var elements;
	    if (webix.isArray(content)) elements = content;else {
	      elements = [];
	      elements.push(content);
	    }

	    if (this.config.buttons) {
	      elements.push({
	        height: 1
	      });
	      elements.push({
	        margin: 10,
	        cols: [{}, {
	          view: "button",
	          css: "ssheet_cancel_button",
	          label: webix.i18n.spreadsheet.labels.cancel,
	          autowidth: true,
	          click: function () {
	            var parentView = this.getTopParentView();
	            parentView.callEvent("onCancelClick", []);
	          }
	        }, {
	          view: "button",
	          label: webix.i18n.spreadsheet.labels.save,
	          autowidth: true,
	          click: function () {
	            var parentView = this.getTopParentView();
	            parentView.callEvent("onSaveClick", []);
	          }
	        }]
	      });
	    }

	    elements.push({
	      height: 10,
	      borderless: true
	    });
	    return elements;
	  },
	  body_setter: function (value) {
	    if (_typeof(value) == "object") {
	      value.paddingY = value.paddingY || 0;

	      if (value.view == "form" && value.elements) {
	        value.elements = this.getFormElements(value.elements);
	        if (!value.css) value.css = "webix_ssheet_form";
	      } else value = this.getBodyConfig(value);
	    }

	    return webix.ui.window.prototype.body_setter.call(this, value);
	  },
	  head_setter: function (value) {
	    if (value) {
	      value = this.getHeaderConfig(value);
	    }

	    return webix.ui.window.prototype.head_setter.call(this, value);
	  },
	  defaults: {
	    padding: 0,
	    move: true,
	    head: true,
	    buttons: true,
	    //we need to retain focus in table area, so disabling the autofocusing feature
	    autofocus: false,
	    width: 350
	  }
	}, webix.ui.window, webix.IdSpace);
	webix.protoUI({
	  $cssName: "datatable",
	  name: "ssheet-dialog-table",
	  $init: function (config) {
	    if (!config.headerRowHeight) config.headerRowHeight = 34;
	    this.$view.className += " webix_ssheet_table webix_ssheet_dialog_table";
	  }
	}, webix.ui.datatable);

	webix.protoUI({
	  name: "ssheet-form-popup",
	  defaults: {
	    padding: 0,
	    borderless: true
	  },
	  $init: function () {
	    this.$view.className += " webix_ssheet_form";
	  }
	}, webix.ui.suggest);
	webix.protoUI({
	  name: "ssheet-form-suggest",
	  defaults: {
	    padding: 0,
	    borderless: true
	  },
	  $init: function () {
	    this.$view.className += " webix_ssheet_suggest";
	  }
	}, webix.ui.suggest);
	webix.protoUI({
	  $cssName: "colorpicker",
	  name: "ssheet-colorpicker",
	  $init: function () {
	    this.$view.className += " webix_ssheet_colorpicker";
	  },
	  defaults: {
	    icon: "wxi-menu-down",
	    suggest: {
	      borderless: true,
	      body: {
	        view: "ssheet-colorboard",
	        height: 202,
	        on: {
	          onSelect: function (value) {
	            this.getParentView().setMasterValue({
	              value: value
	            });
	          }
	        }
	      }
	    }
	  }
	}, webix.ui.colorpicker);

	webix.protoUI({
	  name: "formlate",
	  setValue: function (a) {
	    return this.setHTML(a);
	  },
	  getValue: function () {
	    return "";
	  }
	}, webix.ui.template);

	webix.protoUI({
	  name: "ssheet-icons",
	  $cssName: "dataview",
	  $init: function () {
	    this.$view.className += " webix_ssheet_dataview";
	  },
	  defaults: {
	    borderless: true,
	    template: "<span class='webix_ssheet_button_icon #css#' ></span>",
	    type: {
	      width: 36,
	      height: 36
	    }
	  }
	}, webix.ui.dataview);

	webix.protoUI({
	  name: "ssheet-suggest",
	  defaults: {
	    padding: 0,
	    css: "webix_ssheet_suggest"
	  }
	}, webix.ui.contextmenu);

	webix.protoUI({
	  name: "suggest-formula",
	  defaults: {
	    fitMaster: false,
	    width: 200,
	    filter: function (item, value) {
	      var trg = webix.$$(this.config.master).getInputNode();
	      var cursor = trg.selectionStart;
	      var val = trg.value;
	      if (val.charAt(0) !== "=") return;
	      var str1 = val.substring(0, cursor).match(/([a-zA-Z]+)$/);
	      var str2 = val.charAt(cursor).search(/[^A-Za-z0-9]/);

	      if (str1 && (cursor === val.length || str2 === 0)) {
	        value = str1[0];
	      }

	      return item.value.toString().toLowerCase().indexOf(value.toLowerCase()) === 0;
	    }
	  },
	  $init: function () {
	    var _this = this;

	    this.attachEvent("onBeforeShow", function (node) {
	      if (node.tagName) {
	        //only for formulas
	        if (!node.value || node.value.charAt(0) !== "=") return false;
	        var sizes = webix.html.offset(node);
	        var symbolLength = 9;
	        var y = sizes.y + sizes.height;
	        var x = sizes.x + node.selectionStart * symbolLength;
	        webix.ui.popup.prototype.show.apply(_this, [{
	          x: x,
	          y: y
	        }]);
	        return false;
	      }
	    });
	  },
	  setMasterValue: function (data, refresh) {
	    var text = data.id ? this.getItemText(data.id) : data.text || data.value;
	    var master = webix.$$(this.config.master);
	    master.setValueHere(text);
	    if (!refresh) this.hide(true);
	    this.callEvent("onValueSuggest", [data, text]);
	  },
	  $enterKey: function (popup) {
	    if (popup.isVisible()) return webix.ui.suggest.prototype.$enterKey.apply(this, arguments);
	  }
	}, webix.ui.suggest);

	webix.protoUI({
	  name: "live-editor",
	  $cssName: "text webix_ssheet_formula",
	  defaults: {
	    keyPressTimeout: 25
	  },
	  $init: function (config) {
	    var _this = this;

	    config.suggest = {
	      view: "suggest-formula",
	      data: config.suggestData
	    };
	    this.attachEvent("onKeyPress", function (code) {
	      if (code === 13) {
	        //ignore Enter key if it was pressed to select some value from suggest
	        if (new Date() - (_this._last_value_set || 0) > 300) {
	          _this.updateCellValue(); //we have 'enter' hot key to activate editor


	          webix.delay(function () {
	            this.getTopParentView()._table.moveSelection("down");
	          }, _this);
	        }
	      }
	    });
	    this.attachEvent("onAfterRender", webix.once(function () {
	      var node = this.getInputNode();
	      var ev = webix.env.isIE8 ? "propertychange" : "input";
	      webix.event(node, ev, webix.bind(this.paintValue, this));
	      webix.event(node, "keydown", webix.bind(this.endEdit, this));
	    }));
	  },
	  endEdit: function (e) {
	    var code = e.which || e.keyCode;
	    var node = this.getInputNode(); //if it is a formula - force user to finish it by click outside or 'enter'

	    if (code == 9 || code > 36 && code < 41 && node.value.charAt(0) !== "=") {
	      var dir = code == 40 ? "down" : code === 39 ? "right" : code == 37 ? "left" : "up";
	      if (code === 9) dir = "right";
	      this.updateCellValue();

	      this.getTopParentView()._table.moveSelection(dir);
	    }
	  },
	  paintValue: function () {
	    var master = this.getTopParentView();
	    var cell = this.config.activeCell;

	    var node = master._table.getItemNode(cell);

	    if (cell && node) node.innerHTML = this.getValue();
	  },
	  updateCellValue: function () {
	    var newv = this.getValue();
	    var master = this.getTopParentView();
	    var cell = this.config.activeCell;
	    if (!cell) this.setValue("");else {
	      if (newv != master.getCellValue(cell.row, cell.column)) {
	        this.config.value = newv;
	        master.setCellValue(cell.row, cell.column, newv);
	        master.refresh();
	      }
	    }
	  },
	  $setValueHere: function (value) {
	    this.setValueHere(value);
	  },
	  setValueHere: function (value) {
	    this._last_value_set = new Date();
	    var node = this.getInputNode();

	    if (node.value && node.value.charAt(0) === "=") {
	      var formula = node.value;
	      var cursor = node.selectionStart;
	      var str1 = formula.substring(0, cursor);
	      var str2 = formula.substring(cursor);
	      str1 = str1.replace(/([a-zA-Z(]+)$/, value);
	      node.value = str1 + "(" + str2;
	      node.setSelectionRange(str1.length + 1, str1.length + 1);
	    }
	  },
	  expectRange: function () {
	    var text = this.getValue().trim();
	    var last = text.substr(text.length - 1, 1);
	    return last.match(/[(,]/);
	  },
	  expectOperator: function () {
	    var text = this.getValue().trim();
	    var last = text.substr(text.length - 1, 1);
	    return text.substr(0, 1) == "=" && last.match(/[+&\-/*%=(:,]/);
	  },
	  setRange: function (range) {
	    var node = this.getInputNode();
	    var cursor = node.selectionStart;
	    var formula = this.getValue();
	    var str1 = formula.substring(0, cursor) + range;
	    var str2 = formula.substring(cursor);
	    node.value = str1 + str2;
	    node.setSelectionRange(str1.length + 1, str1.length + 1);
	    this.focus();
	  }
	}, webix.ui.text);

	webix.protoUI({
	  name: "ssheet-separator",
	  defaults: {
	    css: "webix_ssheet_toolbar_spacer",
	    template: " ",
	    width: 1,
	    borderless: true
	  }
	}, webix.ui.view);

	webix.protoUI({
	  name: "sheets",
	  defaults: {
	    layout: "x",
	    borderless: true,
	    css: "ssheet_list_sheets",
	    select: true,
	    drag: "order",
	    dragscroll: "x",
	    scroll: false
	  }
	}, webix.EditAbility, webix.ui.list);

	// toolbar: toogle button
	webix.protoUI({
	  $cssName: "toggle",
	  name: "ssheet-toggle",
	  toggle: function () {
	    var value = this.getValue() == this.config.onValue ? true : false;
	    this.setValue(!value);
	  },
	  $setValue: function (value) {
	    if (value == this.config.offValue) value = false;else if (value == this.config.onValue) value = true;
	    webix.ui.toggle.prototype.$setValue.call(this, value);
	  },
	  getValue: function () {
	    var config = this.config;
	    var value = config.value;
	    return !value || value == config.offValue ? config.offValue || false : config.onValue || true;
	  },
	  defaults: {
	    template: function (obj, common) {
	      var css = obj.value === true || obj.value == obj.onValue ? " webix_pressed" : "";
	      var inp = common.$renderInput(obj, common);
	      return "<div class='webix_el_box" + css + "' style='width:" + obj.awidth + "px; height:" + obj.aheight + "px'>" + inp + "</div>";
	    }
	  }
	}, webix.ui.toggle);

	webix.protoUI({
	  name: "ssheet-bar-title",
	  defaults: {
	    borderless: true
	  },
	  $init: function () {
	    this.$view.className += " webix_ssheet_subbar_title";
	  }
	}, webix.ui.template);

	webix.protoUI({
	  name: "ssheet-button",
	  $cssName: "button",
	  defaults: {
	    type: "htmlbutton",
	    width: 40
	  },
	  $init: function (config) {
	    this.$view.className += " webix_ssheet_button" + (config.arrow ? " webix_ssheet_button_menu" : "");

	    if (config.label || config.icon) {
	      var icon = config.icon || config.name,
	          text = config.label || "";
	      if (config.arrow) text += "<span class='webix_ssheet_button_icon webix_ssheet_icon_arrow webix_icon wxi-menu-down'></span>";
	      config.label = "<span class='webix_ssheet_button_icon webix_ssheet_icon ssi-" + icon + "'></span> " + text;
	      config.tooltip = webix.i18n.spreadsheet.tooltips[config.name] || "";
	    }

	    if (config.options && !config.popup) config.popup = getPopupConfig(config.options);
	  }
	}, webix.ui.button);
	webix.protoUI({
	  name: "ssheet-button-icon-top",
	  $cssName: "button",
	  defaults: {
	    type: "htmlbutton",
	    width: 70,
	    height: 70
	  },
	  $init: function (config) {
	    this.$view.className += " ssheet_button_icon_top";

	    if (config.label) {
	      var icon = config.icon || config.name || "",
	          text = config.label;
	      config.label = "<span class='webix_ssheet_button_icon webix_ssheet_icon ssi-" + icon + "'></span><br/>";
	      config.label += "<span class='ssheet_button_icon_top_text'>" + text + "</span>";
	      if (config.arrow) config.label += "<br/><span class='ssheet_button_icon_top_arrow webix_icon wxi-menu-down'></span>";
	      config.tooltip = webix.i18n.spreadsheet.tooltips[config.name] || "";
	    }

	    if (config.options && !config.popup) config.popup = getPopupConfig(config.options);
	  }
	}, webix.ui.button);

	function getPopupConfig(options) {
	  return {
	    view: "ssheet-suggest",
	    css: "webix_ssheet_suggest",
	    autowidth: true,
	    template: function (obj) {
	      var text = "";
	      if (obj.icon) text += "<span class='webix_ssheet_button_icon webix_ssheet_icon ssi-" + obj.icon + "'></span> ";
	      text += obj.value || webix.i18n.spreadsheet.menus[obj.id] || obj.id;
	      return text;
	    },
	    data: options,
	    on: {
	      onItemClick: function (id) {
	        var button = this.config.master;

	        if (button) {
	          var view = webix.$$(button).getTopParentView();
	          var params = [this.getItem(id)];

	          if (webix.$$(button).config.area) {
	            var area = view.$$("cells").getSelectArea();
	            if (area) params = params.concat([area.start, area.end]);
	          }

	          view.callEvent("onCommand", params);
	        }
	      }
	    }
	  };
	}

	webix.protoUI({
	  name: "multicheckbox",
	  defaults: {
	    padding: 0,
	    type: "clean",
	    borderless: true,
	    elementsConfig: {
	      labelWidth: 10
	    }
	  },
	  $init: function (config) {
	    config.rows = [{
	      height: 0.000001
	    }];
	    this.$ready.push(function () {
	      this._initOnChange();

	      this.setValue(config.value);
	    });
	  },
	  _initOnChange: function () {
	    this.attachEvent("onChange", function (newv) {
	      this.blockEvent();

	      if (this.$eventSource.config.name === "$all") {
	        for (var i in this.elements) {
	          this.elements[i].setValue(newv);
	        }

	        this.getChildViews()[0].getBody().getChildViews()[0].setValue(1);
	      } else {
	        var count = this.getValue().length;
	        if (count === this._count) this.elements.$all.setValue(1);
	        if (count < this._count) this.elements.$all.setValue(0);
	        if (count === 0) this.elements[this._findNext(this.$eventSource.config.name)].setValue(1);
	      }

	      this.unblockEvent();
	    });
	  },
	  _findNext: function (name) {
	    for (var i in this.elements) {
	      if (i !== name && i !== "$all") return i;
	    }
	  },
	  setValue: function (value) {
	    var keys = [];

	    for (var i in value) {
	      keys.push(i);
	    }

	    value = value || {};
	    this.elements = {};
	    this._count = keys.length;

	    if (_typeof(value) !== "object" || !keys.length) {
	      if (this.getChildViews().length > 1) webix.ui([{
	        height: 0.000001
	      }], this);
	    } else {
	      var elements = [],
	          base = [],
	          maxHeight = 400;

	      for (var _i in value) {
	        base.push({
	          view: "checkbox",
	          labelRight: _i,
	          name: _i
	        });
	      }

	      var baseHeight = base.length * webix.skin.$active.inputHeight;
	      elements.push({
	        view: "scrollview",
	        body: {
	          rows: base
	        },
	        scroll: baseHeight > maxHeight,
	        height: baseHeight > maxHeight ? maxHeight : baseHeight
	      });
	      elements.push({
	        template: "<div class='ss_sep_line'></div>",
	        height: 10
	      });
	      elements.push({
	        view: "checkbox",
	        labelRight: webix.i18n.spreadsheet.labels["export-all-sheets"],
	        name: "$all"
	      });
	      webix.ui(elements, this);

	      for (var _i2 in value) {
	        if (value[_i2]) this.elements[_i2].setValue(value[_i2]);
	      }
	    }
	  },
	  getValue: function () {
	    var value = this.getValues(),
	        output = [];

	    for (var i in value) {
	      if (value[i] && i !== "$all") output.push(i);
	    }

	    return output;
	  }
	}, webix.ui.form);

	webix.protoUI({
	  name: "formlist",
	  defaults: {
	    paddingY: 5,
	    height: 120
	  },
	  $init: function (config) {
	    var _this = this;

	    config.cols = [{
	      css: "webix_inp_label",
	      template: config.label,
	      width: config.labelWidth,
	      borderless: true
	    }, {
	      view: "list",
	      data: config.data,
	      css: config.css,
	      template: config.template,
	      select: true,
	      scroll: false,
	      borderless: true,
	      on: {
	        onSelectChange: function () {
	          _this.getParentView().callEvent("onChange", []);
	        }
	      }
	    }];
	  },
	  setValue: function (value) {
	    this.getChildViews()[1].select(value);
	  },
	  getValue: function () {
	    return this.getChildViews()[1].getSelectedId();
	  },
	  refresh: function () {
	    this.getChildViews()[1].refresh();
	  },
	  focus: function () {}
	}, webix.ui.layout);

	var group = {
	  value: null,
	  set: function (method, master) {
	    if (!this.value) {
	      this.start();
	      method.call(master);
	      this.end();
	    } else method.call(master);
	  },
	  start: function () {
	    this.value = webix.uid();
	  },
	  end: function () {
	    this.value = null;
	  }
	};

	function init(view) {
	  var events = [{
	    name: "onSheetAdd",
	    type: "insert"
	  }, {
	    name: "onSheetRemove",
	    type: "remove"
	  }, {
	    name: "onSheetRename",
	    type: "rename"
	  }, {
	    name: "onCellChange"
	  }, {
	    name: "onStyleChange"
	  }, {
	    name: "onAction"
	  }, {
	    name: "onRowOperation"
	  }, {
	    name: "onColumnOperation"
	  }, {
	    name: "onAfterConditionSet"
	  }, {
	    name: "onAfterRangeSet"
	  }, {
	    name: "onAfterSpan"
	  }, {
	    name: "onAfterSplit"
	  }, {
	    name: "onRowResize",
	    view: "cells"
	  }, {
	    name: "onColumnResize",
	    view: "cells"
	  }];
	  var thread;

	  var _loop = function (i) {
	    var handler = events[i];
	    (handler.view ? view.$$(handler.view) : view).attachEvent(handler.name, function (name, newName) {
	      if (view._loading_data) return;
	      var params;
	      if (handler.type) params = handler.type == "rename" ? [handler.type, newName, name] : [handler.type, name];else params = ["update", view.getActiveSheet()];
	      clearTimeout(thread);
	      thread = webix.delay(function () {
	        return view.callEvent("onChange", params);
	      });
	    });
	  };

	  for (var i = 0; i < events.length; i++) {
	    _loop(i);
	  }

	  view.attachEvent("onChange", function () {
	    save(view, "all");
	  });
	}
	function save(view, name, data) {
	  var save = view.config.save;
	  var url;
	  if (!save) return;

	  if (name == "all") {
	    if (!save.all) return;
	    data = {
	      data: view.serialize({
	        sheets: true
	      })
	    };
	    url = save.all;
	  } else {
	    url = typeof save === "string" ? save + "/" + name : save[name];
	  }

	  url = webix.proxy.$parse(url);

	  if (url) {
	    if (typeof url === "function") return url(name, data);
	    if (url.$proxy && url.save) return url.save(view, data, null, null);
	    var ajax = webix.ajax();
	    if (name === "all") ajax.headers({
	      "Content-type": "application/json"
	    });
	    ajax.post(url, data);
	  }
	}

	var m27 = /*#__PURE__*/Object.freeze({
		init: init,
		save: save
	});

	var decode = {};
	var encode = {};
	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	for (var i = 1; i < 1000; i++) {
	  var prefixIndex = parseInt((i - 1) / alpha.length);
	  var str = (prefixIndex ? alpha[prefixIndex - 1] : "") + alpha[(i - 1) % alpha.length];
	  decode[str] = i;
	  encode[i] = str;
	}

	encode[0] = encode[1];
	function adress(text) {
	  var size = text.charCodeAt(1) < 59 ? 1 : 2;
	  var col = text.substr(0, size);
	  var row = text.substr(size);
	  return [row * 1, decode[col]];
	}
	function range(text, view) {
	  var nind = text.indexOf("!");
	  var sheet = ""; //parse sheet names

	  if (nind !== -1) {
	    sheet = text.substr(0, nind);
	    if (sheet[0] === "'") sheet = sheet.substr(1, sheet.length - 2);
	    text = text.substr(nind + 1);
	  }

	  var parts = text.split(":");

	  if (parts.length != 2 && view) {
	    text = view.ranges.getCode(text, sheet);
	    if (!text) return null;
	    parts = text.split(":");
	  }

	  var d1 = adress(parts[0]);
	  var d2 = adress(parts[1]);
	  return [d1[0], d1[1], d2[0], d2[1], sheet];
	}
	var notAlphaNum = /[^A-Za-z0-9]/;

	function escapeSheet(text) {
	  if (notAlphaNum.test(text)) return "'".concat(text, "'");
	  return text;
	}

	function toRange(x, y, x2, y2, sheet) {
	  return (sheet ? escapeSheet(sheet) + "!" : "") + encode[y] + x + ":" + encode[y2] + x2;
	}
	function toSheetRange(x, y, sheet) {
	  return (sheet ? escapeSheet(sheet) + "!" : "") + x + ":" + y;
	}
	function rangeObj(text, view) {
	  if (_typeof(text) === "object") return text;
	  var a = range(text, view);
	  return {
	    start: {
	      row: a[0],
	      column: a[1]
	    },
	    end: {
	      row: a[2],
	      column: a[3]
	    },
	    sheet: a[4]
	  };
	}
	function eachRange(text, view, callback, data) {
	  var range = rangeObj(text);

	  for (var row = range.start.row; row <= range.end.row; row++) {
	    for (var column = range.start.column; column <= range.end.column; column++) {
	      callback(view, {
	        row: row,
	        column: column
	      }, data);
	    }
	  }
	}
	var rangeTest = /(([A-Za-z0-9]+|'[^']+')!|)[A-Z]+[0-9]+:[A-Z]+[0-9]+/;
	function isRange(text) {
	  return rangeTest.test(text);
	}
	function changeRange(text, name, inc, start) {
	  var updated = false;

	  if (isRange(text)) {
	    var _range = range(text),
	        _range2 = _slicedToArray(_range, 5),
	        r1 = _range2[0],
	        c1 = _range2[1],
	        r2 = _range2[2],
	        c2 = _range2[3],
	        sheet = _range2[4];

	    if (name === "row" && start.row <= r2) {
	      if (start.row <= r1) r1 += inc;
	      r2 += inc;
	      updated = true;
	    } else if (name === "column" && start.column <= c2) {
	      if (start.column <= c1) c1 += inc;
	      c2 += inc;
	      updated = true;
	    }

	    if (updated) text = toRange(r1, c1, r2, c2, sheet);
	  }

	  return text;
	}

	var toolbarSizes = {
	  width: 38,
	  margin: 7,
	  paddingY: 1,
	  sectorPadding: 5,
	  sectorMargin: 0
	}; // default styles for toolbar elements

	var defaultStyles = {
	  "color": "#666666",
	  "background": "#ffffff",
	  "font-family": "'PT Sans', Tahoma",
	  "font-size": "15px",
	  "text-align": "left",
	  "vertical-align": "top",
	  "white-space": "nowrap",
	  "format": "common"
	};
	function setSkinDefaults() {
	  var material = webix.skin.$name == "material" || webix.skin.$name == "mini";
	  toolbarSizes.width = webix.skin.$active.inputHeight + 2;
	  toolbarSizes.titleHeight = webix.skin.$name == "mini" ? 18 : 20;
	  defaultStyles["font-family"] = material ? "'Roboto', sans-serif" : "'PT Sans', Tahoma";
	}

	//add new options to the end of this list

	var style_names = ["color", "background", "text-align", "font-family", "font-size", "font-style", "text-decoration", "font-weight", "vertical-align", "wrap", "borders", "format", "border-right", "border-bottom", "border-left", "border-top"];
	var _style_map = {
	  "vertical-align": {
	    "top": function () {
	      return "display: block;";
	    },
	    "middle": function (obj) {
	      var align = "flex-start";
	      if (obj["text-align"] == "center") align = "center";else if (obj["text-align"] == "right") align = "flex-end";
	      var result = "display: flex; align-items: center;justify-content:" + align + ";";
	      return result;
	    },
	    "bottom": function (obj) {
	      var align = "flex-start";
	      if (obj["text-align"] == "center") align = "center";else if (obj["text-align"] == "right") align = "flex-end";
	      var result = "display: flex; align-items:flex-end;justify-content:" + align + ";";
	      return result;
	    }
	  },
	  "wrap": {
	    "wrap": function () {
	      var padding = 7 - (34 - webix.skin.$active.rowHeight);
	      return "white-space: normal !important; line-height:normal !important; padding-top:" + padding + "px;padding-bottom:" + padding + "px;";
	    },
	    "nowrap": function () {
	      return "";
	    }
	  },
	  "format": "",
	  "borders": "",
	  "border-left": function (obj) {
	    if (obj["border-left"]) return "border-left: 1px solid " + obj["border-left"] + " !important;";
	    return "";
	  },
	  "border-top": function (obj) {
	    if (obj["border-top"]) return "border-top: 1px solid " + obj["border-top"] + " !important;";
	    return "";
	  },
	  "border-right": function (obj) {
	    if (obj["border-right"]) return "border-right: 1px solid " + obj["border-right"] + " !important;";
	    return "";
	  },
	  "border-bottom": function (obj) {
	    if (obj["border-bottom"]) return "border-bottom: 1px solid " + obj["border-bottom"] + " !important;";
	    return "";
	  },
	  "font-weight": function (obj) {
	    //Roboto bold - font-weight:500 (looks better, than 700). Roboto is default font for material skins.
	    if (obj["font-weight"] == "bold") {
	      var family = obj["font-family"] || defaultStyles["font-family"];
	      return "font-weight:" + (family == "'Roboto', sans-serif" ? 500 : 700) + ";";
	    }
	  }
	};
	var border_checks = {
	  "border-left": function (cell, area, mode) {
	    return cell.column == area.start.column || mode == "no";
	  },
	  "border-right": function (cell, area, mode) {
	    return cell.column == area.end.column || mode == "all" || mode == "no";
	  },
	  "border-top": function (cell, area, mode) {
	    return cell.row == area.start.row || mode == "no";
	  },
	  "border-bottom": function (cell, area, mode) {
	    return cell.row == area.end.row || mode == "all" || mode == "no";
	  }
	};
	var _style_handlers = {
	  "borders": function (view, style, value, cell) {
	    var area = view.$$("cells").getSelectArea();
	    value = value.split(",");
	    var type = value[0];
	    var color = value[1];
	    var modes = ["border-left", "border-right", "border-bottom", "border-top"];
	    if (type == "no") color = "";else if (type == "top-bottom") {
	      modes = ["border-top", "border-bottom"];
	    } else if (type != "all" && type != "outer") modes = ["border-" + type];

	    for (var i = 0; i < modes.length; i++) {
	      var mode = modes[i];
	      var result = view.callEvent("onAction", ["check-borders", {
	        row: cell.row,
	        column: cell.column,
	        area: area,
	        type: type,
	        mode: mode
	      }]);
	      if (result === true || border_checks[mode](cell, area, type)) style = _updateStyle(view, style, mode, color, cell);
	    }

	    return style;
	  }
	};
	var sizeEl;
	function init$1(view) {
	  view.attachEvent("onStyleSet", function (name, value) {
	    return _applyStyles(view, name, value);
	  });
	  view.attachEvent("onDataParse", function (data) {
	    return _parse(view, data);
	  });
	  view.attachEvent("onDataSerialize", function (data) {
	    return _serialize(view, data);
	  });
	  view.attachEvent("onReset", function () {
	    return reset(view);
	  });
	  view.attachEvent("onUndo", function (type, row, column, style) {
	    if (type == "style") _undoStyle(view, row, column, style);
	  });
	  reset(view);
	  if (!sizeEl) sizeEl = webix.html.create("DIV", {
	    style: "visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden;"
	  }, "");
	}

	function reset(view) {
	  view._styles = {};
	  view._styles_cache = {};
	  view._styles_max = 1;
	  var prefix = ".wss_" + view.$index;
	  webix.html.removeStyle(prefix);
	}

	function getStyle(view, cell) {
	  var styles = view.getRow(cell.row).$cellCss;

	  if (styles) {
	    var styleid = styles[cell.column];
	    if (styleid) return view._styles[styleid];
	  }

	  return null;
	} // undo

	function _undoStyle(view, row, column, style) {
	  var cell = {
	    row: row,
	    column: column
	  };
	  setStyle(view, cell, style);
	}

	function _serialize(view, obj) {
	  var styles = [];

	  for (var key in view._styles_cache) {
	    styles.push([view._styles_cache[key].id, key]);
	  }

	  obj.styles = styles;
	}

	function addStyle(view, props, origin) {
	  var style = {
	    props: _styleFromText(";;;;;;;;;;;;;;;")
	  };
	  if (origin) for (var key in origin.props) {
	    style.props[key] = origin.props[key];
	  }

	  for (var _key in props) {
	    style.props[_key] = props[_key];
	  }

	  style.text = _styleToText(style);
	  var cache = view._styles_cache[style.text];
	  if (cache) return cache;

	  _addStyle(view, style);

	  return style;
	}

	function _parse(view, obj) {
	  if (obj.styles) for (var i = 0; i < obj.styles.length; i++) {
	    var styleObj = obj.styles[i];
	    var style = {
	      id: styleObj[0],
	      text: styleObj[1],
	      props: _styleFromText(styleObj[1])
	    };

	    _addStyle(view, style, true);
	  }

	  for (var _i = 0; _i < obj.data.length; _i++) {
	    var _obj$data$_i = _slicedToArray(obj.data[_i], 4),
	        row = _obj$data$_i[0],
	        column = _obj$data$_i[1],
	        css = _obj$data$_i[3];

	    if (css) update_style_data(view.getRow(row), column, view._styles[css]);
	  }
	}

	function _applyStyles(view, name, value) {
	  //this - spreadsheet
	  group.set(function () {
	    view.eachSelectedCell(function (cell) {
	      _applyCellStyles(view, cell, name, value);
	    });
	  });
	  view.refresh();
	}

	function _applyCellStyles(view, cell, name, value) {
	  var ostyle = getStyle(view, cell);

	  var nstyle = _updateStyle(view, ostyle, name, value, cell);

	  if (nstyle && nstyle != ostyle) _setStyle(view, cell, nstyle, ostyle);
	}

	function _updateStyle(view, style, name, value, cell) {
	  if (_style_handlers[name]) {
	    return _style_handlers[name](view, style, value, cell);
	  }

	  if (style && style.props[name] == value) return style;
	  var nstyle = {
	    text: "",
	    id: 0,
	    props: style ? webix.copy(style.props) : {}
	  };
	  nstyle.props[name] = value;
	  nstyle.text = _styleToText(nstyle);
	  var cache = view._styles_cache[nstyle.text];
	  if (cache) return cache;

	  _addStyle(view, nstyle);

	  return nstyle;
	}

	function update_style_data(item, column, style) {
	  item.$cellCss = item.$cellCss || {};
	  item.$cellFormat = item.$cellFormat || {};

	  if (style) {
	    item.$cellCss[column] = style.id;
	    item.$cellFormat[column] = style.props.format || null;
	  } else {
	    delete item.$cellCss[column];
	    delete item.$cellFormat[column];
	  }
	}

	function setStyle(view, cell, style) {
	  var old = getStyle(view, cell);
	  return _setStyle(view, cell, style, old);
	}
	function setRangeStyle(view, range$$1, style) {
	  eachRange(range$$1, view, _setStyle, style);
	}
	function getTextSize(view, text, css, x, y) {
	  var width = 0;
	  var height = 0;
	  sizeEl.innerHTML = text;
	  sizeEl.style.width = (x || 1) + "px";
	  sizeEl.style.height = (y || 1) + "px";
	  sizeEl.className = "webix_table_cell webix_cell " + css;

	  view._table.$view.appendChild(sizeEl);

	  width = Math.max(width, sizeEl.scrollWidth);
	  height = Math.max(height, sizeEl.scrollHeight);

	  view._table.$view.removeChild(sizeEl);

	  sizeEl.innerHTML = "";
	  return {
	    width: width,
	    height: height
	  };
	}

	function _setStyle(view, cell, style, old) {
	  if (view.callEvent("onBeforeStyleChange", [cell.row, cell.column, style, old])) {
	    update_style_data(view.getRow(cell.row), cell.column, style);
	    view.saveCell(cell.row, cell.column);
	    view.callEvent("onStyleChange", [cell.row, cell.column, style, old]);
	  }
	}

	function _buildCssString(style) {
	  var css = "";

	  for (var key in style) {
	    if (style[key]) {
	      if (_style_map[key]) {
	        if (_style_map[key][style[key]]) css += _style_map[key][style[key]](style);else if (typeof _style_map[key] == "function") css += _style_map[key](style);
	      } else css += key + ":" + style[key] + ";";
	    }
	  }

	  return css;
	}

	function _addStyle(view, style, silent) {
	  view._styles_cache[style.text] = style;

	  while (!style.id || view._styles[style.id]) {
	    style.id = "wss" + view._styles_max++;
	  }

	  view._styles[style.id] = style;

	  var css = _buildCssString(style.props);

	  var prefix = ".wss_" + view.$index;
	  webix.html.addStyle(prefix + " ." + style.id + "{" + css + "}", prefix);
	  if (!silent) save(view, "styles", {
	    name: style.id,
	    text: style.text
	  });
	}

	function _styleToText(style) {
	  var id = [];

	  for (var i = 0; i < style_names.length; i++) {
	    id.push(style.props[style_names[i]]);
	  }

	  return id.join(";");
	}

	function _styleFromText(text) {
	  var parts = text.split(";");
	  var props = {};

	  for (var i = 0; i < style_names.length; i++) {
	    props[style_names[i]] = parts[i];
	  }

	  return props;
	}

	function clearRangeStyle(view, range$$1) {
	  group.set(function () {
	    eachRange(range$$1, view, function (view, cell) {
	      var style = getStyle(view, cell);
	      if (style) setStyle(view, cell, null);
	    });
	  });
	}
	function compactStyles(view) {
	  var params = view.serialize();
	  var data = params.data;
	  var styles = params.styles;
	  var used = {};

	  for (var i = 0; i < data.length; i++) {
	    var name = data[i][3];
	    if (name) used[name] = 1;
	  }

	  var newStyles = [];

	  for (var _i2 = 0; _i2 < styles.length; _i2++) {
	    var _name = styles[_i2][0];
	    if (used[_name]) newStyles.push(styles[_i2]);
	  }

	  params.styles = newStyles;
	  reset(view);

	  _parse(view, params);
	}

	var m5 = /*#__PURE__*/Object.freeze({
		style_names: style_names,
		init: init$1,
		getStyle: getStyle,
		addStyle: addStyle,
		setStyle: setStyle,
		setRangeStyle: setRangeStyle,
		getTextSize: getTextSize,
		clearRangeStyle: clearRangeStyle,
		compactStyles: compactStyles
	});

	var formatHelpers = {};
	var formats;
	var formatsCount;
	var formatSources;
	var formatCache;
	function setDefaultFormats() {
	  formats = {};
	  formatsCount = 0;
	  formatSources = {};
	  formatCache = {};
	  formatHelpers = {
	    price: {
	      getFormat: function (value, extra) {
	        extra.css = "webix_ssheet_format_price";
	        return webix.i18n.priceFormat(value);
	      },
	      values: webix.extend({
	        zeros: webix.i18n.priceSettings.decimalSize,
	        symbol: webix.i18n.priceFormat(""),
	        separator: 1,
	        negative: 1,
	        type: "price"
	      }, getDelimiters("price"))
	    },
	    "int": {
	      getFormat: function (value, extra) {
	        extra.css = "webix_ssheet_format_int";
	        return webix.i18n.numberFormat(value);
	      },
	      values: webix.extend({
	        zeros: webix.i18n.decimalSize,
	        separator: 1,
	        negative: 1,
	        type: "int"
	      }, getDelimiters("int"))
	    },
	    percent: {
	      getFormat: function (value, extra) {
	        extra.css = "webix_ssheet_format_percent";
	        return Math.round(value * 100) + "%";
	      },
	      values: webix.extend({
	        zeros: 0,
	        separator: 0,
	        negative: 1,
	        type: "percent"
	      }, getDelimiters("percent"))
	    }
	  };

	  for (var i in formatHelpers) {
	    formatSources[i] = serializeFormat(formToValues(i, formatHelpers[i].values));
	    formatCache[formatSources[i]] = i;
	  }
	}
	function getDelimiters(type) {
	  if (type == "price") return {
	    groupSign: webix.i18n.priceSettings.groupDelimiter,
	    decimalSign: webix.i18n.priceSettings.decimalDelimiter
	  };else return {
	    groupSign: webix.i18n.groupDelimiter,
	    decimalSign: webix.i18n.decimalDelimiter
	  };
	}
	function serialize(view, data) {
	  var formats = [];

	  for (var i in formatSources) {
	    if (i != "percent" && i != "int" && i != "price") //exclude default formats
	      formats.push([i, formatSources[i]]);
	  }

	  data.formats = formats;
	}
	function load(view, data) {
	  var i,
	      formats = data.formats;
	  if (formats) for (i = 0; i < formats.length; i++) {
	    getFormatName(formats[i][1], formats[i][0]);
	  }
	}
	function getFormat(name) {
	  return formatHelpers[name] ? formatHelpers[name].getFormat : formatHelpers[name];
	}
	function getFormatSource(name, toexcel) {
	  if (toexcel) {
	    var parced = parceFormat({
	      values: formatHelpers[name].values,
	      format: formatSources[name]
	    });
	    return serializeFormat(parced, true);
	  } else return formatSources[name];
	}

	function getFormatName(str, values) {
	  if (formatCache[str]) return formatCache[str];
	  var name = _typeof(values) == "object" ? "fmt" + formatsCount : values;
	  formatsCount++;
	  formats[name] = str;
	  values = webix.extend(_typeof(values) == "object" ? values : {
	    format: str,
	    type: "custom"
	  }, getDelimiters("custom"));
	  formatHelpers[name] = {
	    getFormat: format2code(str, {
	      decimalSign: values.decimalSign,
	      groupSign: values.groupSign
	    }),
	    values: values
	  };
	  formatSources[name] = str;
	  formatCache[str] = name;
	  return name;
	}

	function addFormat(view, row, column, format, type) {
	  if (!type) type = {
	    format: format,
	    type: "custom"
	  };
	  var old = view.getStyle(row, column);
	  var fmtstring = getFormatName(format, type);
	  var nev = addStyle(view, {
	    format: fmtstring
	  }, old);
	  view.setStyle(row, column, nev);
	}

	function splitFormat(str) {
	  var conditional = str.match(/.*\[[><=].*/g);
	  var parts = str.split(";");

	  if (!conditional) {
	    if (parts.length > 1) {
	      parts[0] = (parts.length > 2 ? "[>0]" : "[>=0]") + parts[0];
	      parts[1] = "[<0]" + parts[1];
	      if (parts[2]) parts[2] = "[=0]" + parts[2];
	    }
	  }

	  return parts;
	}

	function format2code(str, delimiters) {
	  var parts = splitFormat(str);
	  var code = ["var spaces = \"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\";"];

	  for (var i = 0; i < parts.length; i++) {
	    var separated = separateFmt(parts[i]);
	    code.push(genCode(separated.condition, separated.color.toLowerCase(), separated.fmt, i, parts.length > 0, delimiters));
	  }

	  return new Function("val", "extra", code.join("\n") + " return val;");
	}

	function genCode(check, color, line, ind, isAbs, delimiters) {
	  var str = "";

	  if (check) {
	    if (!ind) str += "if";else str += "else if";
	    if (check[0] === "=") check = "=" + check;
	    str += "(val" + check + "){";
	    if (isAbs) str += "val = Math.abs(val);";
	  }

	  if (color) str += "extra.css = \"webix_ssheet_format_" + color + "\";";
	  if (line.indexOf("%") !== -1) str += "val = val*100;";
	  str += genFormatCode(line, delimiters);
	  return str + (check ? "}" : "");
	}

	function genFormatCode(line, delimiters) {
	  if (!line) return "return val;";
	  var isQuote = 0;
	  var str = "return \"\"";
	  var fmt = "";
	  var comma = false;
	  var inserted = false;

	  for (var i = 0; i < line.length; i++) {
	    var betweenPlaceholders = placeholder(line[i - 1]) && placeholder(line[i + 1]);

	    if (line[i] == "\"") {
	      if (isQuote) {
	        str += "+\"".concat(line.substr(isQuote, i - isQuote), "\"");
	        isQuote = false;
	        continue;
	      } else isQuote = i;
	    }

	    if (isQuote) continue;else if (line[i] === delimiters.decimalSign && betweenPlaceholders) {
	      fmt += delimiters.decimalSign;
	    } else if (placeholder(line[i])) {
	      if (!inserted) {
	        str += "+fmt";
	        inserted = true;
	      }

	      fmt += line[i];
	    } else if (line[i] === delimiters.groupSign && betweenPlaceholders) comma = true;else str += "+\"".concat(line[i], "\"");
	  }

	  if (fmt) return numberFormat(fmt, comma, delimiters) + ";" + str + ";";else return str + ";";
	}

	function numberFormat(fmt, comma, delimiters) {
	  var str = "if (isNaN(val)) var fmt = val; else {";
	  var decimal = delimiters.decimalSign;

	  var _getParts = getParts(fmt, decimal),
	      _getParts2 = _slicedToArray(_getParts, 2),
	      left = _getParts2[0],
	      right = _getParts2[1];

	  right = (right || "").split("").reverse().join(""); //calculate indexes in mask

	  var lzeros = left.indexOf("0");
	  if (lzeros >= 0) lzeros = left.length - lzeros;
	  var lfills = left.indexOf("?");
	  if (lfills >= 0) lfills = left.length - lfills;
	  var rzeros = right.indexOf("0");
	  if (rzeros >= 0) rzeros = right.length - rzeros;
	  var rfills = right.indexOf("?");
	  if (rfills >= 0) rfills = right.length - rfills;
	  var rmax = right.length;
	  str += "\n\tvar parts = val.toFixed(".concat(rmax, ").split(\".\");\n\tvar left = parts[0];\n\tvar lsize = left.length; \n\tvar right = parts[1] || \"\";\n\tif (left.length < ").concat(lzeros, ") left = \"0000000000\".substr(0, ").concat(lzeros, " - left.length)+left;\n\tif (left.length < ").concat(lfills, ") left = spaces.substr(0, 6*(").concat(lfills, " - left.length))+left;\n\tif (").concat(comma, ") {\n\t\tvar buf = [];\n\t\tvar start = 3;\n\t\twhile (lsize > start) { buf.push(left.substr(left.length-start,3)); start+=3; }\n\t\tvar last = left.substr(0,left.length-start+3);\n\t\tif (last !== \"-\")\n\t\t\tbuf.push(last);\n\t\telse\n\t\t\tbuf.push(\"-\"+buf.pop());\n\n\t\tleft = buf.reverse().join(\"").concat(delimiters.groupSign, "\");\n\t}\n\tif (right){\n\t\tvar zpoint = right.length-1;\n\t\twhile (zpoint >= ").concat(rzeros, "){\n\t\t\tif (right[zpoint] !== \"0\"){\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tzpoint--;\n\t\t}\n\t\t\n\t\tif (zpoint <= right.length)\n\t\t\tright = right.substr(0, zpoint+1);\n\n\t\tif (right.length < ").concat(rfills, "){\n\t\t\tright += spaces.substr(0, 6*(").concat(rfills, " - right.length));\n\t\t}\n\t}\n\tvar fmt = left+(right?\"").concat(decimal, "\":\"\")+right;\n\t");
	  return str + "}\n";
	}

	function updateDecimals(fmt, inc, val) {
	  var parced = parceFormat(fmt);

	  for (var i = 0; i < parced.length; i++) {
	    if (parced[i].decimals) {
	      if (inc > 0) parced[i].right.placeholders += Array(inc + 1).join("0");else parced[i].right.placeholders = parced[i].right.placeholders.slice(0, inc);
	    } else {
	      var withoutText = !parced[i].left.text && !parced[i].right.text;
	      var withoutPlaceholders = !parced[i].left.placeholders && !parced[i].right.placeholders; //check if cell value have decimals (not cell format)

	      if (inc < 0 && withoutText && withoutPlaceholders && webix.rules.isNumber(val) && val.indexOf(".") > -1) {
	        parced[i].left.placeholders = "0";
	        parced[i].right.placeholders = Array(val.split(".")[1].length).join(Array(inc + 1).join("0"));
	      } //ignore text
	      else if (inc > 0 && (parced[i].left.placeholders || withoutText)) {
	          parced[i].left.placeholders = parced[i].left.placeholders || "0";
	          parced[i].right.placeholders = Array(inc + 1).join("0");
	          parced[i].decimals = true;
	        }
	    }

	    parced[i].decimals = parced[i].right.placeholders.length > 0;
	  }

	  return serializeFormat(parced);
	}

	function changeAreaDecimals(view, inc, row, column) {
	  var cells = getCells(view, row, column);
	  if (cells.length == 0) return;
	  var item = view.$$("cells").getItem(cells[0].row)[cells[0].column];
	  var firstValue = item ? item.toString() : item;
	  var firstStyle = view.getStyle(cells[0].row, cells[0].column);

	  if (webix.rules.isNumber(firstValue) || firstStyle && firstStyle.props.format) {
	    group.set(function () {
	      for (var i = 0; i < cells.length; i++) {
	        changeCellDecimals(view, inc, cells[i]);
	      }
	    });
	    view.refresh();
	    var name = view.getStyle(cells[0].row, cells[0].column).props.format;
	    view.$$("bar").setValues({
	      format: name.indexOf("fmt") < 0 ? name : "custom"
	    }, true);
	  }
	}
	function changeCellDecimals(view, inc, cell) {
	  var format;
	  var style = view.getStyle(cell.row, cell.column);
	  var value = view.$$("cells").getItem(cell.row)[cell.column];
	  value = value ? value.toString() : "";

	  if (style && style.props.format) {
	    var name = style.props.format;
	    format = webix.copy({
	      values: formatHelpers[name].values,
	      format: getFormatSource(name)
	    });
	    format.format = updateDecimals(format, inc, value);
	    if (format.values && format.values.hasOwnProperty("zeros")) format.values.zeros = Math.max(format.values.zeros + inc, 0);
	  } //add format for cell without format
	  else {
	      var zeros = webix.rules.isNumber(value) && value.split(".")[1] ? Math.max(value.split(".")[1].length + inc, 0) : Math.max(inc, 0);
	      format = {
	        values: {
	          negative: 1,
	          zeros: zeros,
	          separator: 0,
	          type: "int"
	        }
	      };
	      format.format = serializeFormat(formToValues(format.values.type, format.values));
	    }

	  addFormat(view, cell.row, cell.column, format.format, format.values);
	}
	function isCustom(name) {
	  return name != "common" && (name.indexOf("fmt") != -1 || formatHelpers[name].values.type == "custom");
	}
	function formToValues(type, formValues) {
	  var values = [{
	    condition: ">=0",
	    left: {
	      text: ""
	    },
	    right: {
	      text: ""
	    }
	  }, {
	    condition: "<0",
	    left: {
	      text: ""
	    },
	    right: {
	      text: ""
	    }
	  }];
	  webix.extend(values, getDelimiters(type));
	  values[0].right.placeholders = values[1].right.placeholders = formValues.zeros ? Array(formValues.zeros + 1).join("0") : "";
	  values[0].separator = values[1].separator = formValues.separator && type != "percent";
	  values[0].left.placeholders = values[1].left.placeholders = values[0].separator ? "#" + values.groupSign + "0" : "0";
	  values[0].decimals = values[1].decimals = formValues.zeros ? true : false;
	  values[1].color = formValues.negative != 1 ? "red" : "";
	  values[1].left.text += formValues.negative < 3 ? "-" : "";
	  if (type === "percent") values[0].right.text = values[1].right.text = "%";else if (type === "price") {
	    var symbol = formatHelpers.price.values.symbol;
	    var right = symbol.indexOf(" ") == 0;
	    values[1][right ? "right" : "left"].text += symbol;
	    values[0][right ? "right" : "left"].text += symbol;
	  }
	  return values;
	}
	function serializeFormat(values, toExcel) {
	  var fmt = "";

	  for (var i = 0; i < values.length; i++) {
	    if (values[i].condition) fmt += "[" + values[i].condition + "]";
	    if (values[i].color) fmt += "[" + values[i].color + "]";

	    if (values[i].left.text) {
	      var leftText = values[i].left.text;
	      fmt += toExcel ? "\"" + leftText + "\"" : leftText;
	    }

	    if (values[i].left.placeholders) {
	      var leftPlaceholders = values[i].left.placeholders;
	      fmt += toExcel ? leftPlaceholders.replace(values.groupSign, ",") : leftPlaceholders;
	    }

	    if (values[i].decimals) fmt += toExcel ? "." : values.decimalSign;
	    if (values[i].right.placeholders) fmt += values[i].right.placeholders;

	    if (values[i].right.text) {
	      var rightText = values[i].right.text;
	      if (toExcel) rightText = ("\"" + rightText + "\"").replace(/%/g, "\"%\"").replace(/""/g, "");
	      fmt += rightText;
	    }

	    if (i != values.length - 1) fmt += ";";
	  }

	  return fmt;
	}

	function parceFormat(fmt) {
	  var fmtParts = fmt.format.split(";");
	  var values = [];

	  for (var i = 0; i < fmtParts.length; i++) {
	    var separated = separateFmt(fmtParts[i]);
	    values[i] = {
	      color: separated.color,
	      condition: separated.condition,
	      left: {},
	      right: {}
	    };
	    var format = separated.fmt;
	    values.groupSign = fmt.values.groupSign;
	    values.decimalSign = fmt.values.decimalSign;
	    if (format.indexOf(values.groupSign) > -1) values[i].separator = true;
	    var sepFmtParts = getParts(format, values.decimalSign);
	    var left = sepFmtParts[0];
	    var right = sepFmtParts[1] || "";
	    if (sepFmtParts[1]) values[i].decimals = true;
	    left = getFmtPartValues(left, "left", values.groupSign);
	    right = getFmtPartValues(right, "right", values.groupSign);
	    values[i].left = {
	      text: left.leftText,
	      placeholders: left.placeholders
	    };
	    values[i].right = {
	      text: left.rightText + right.rightText,
	      placeholders: right.placeholders
	    };
	  }

	  return values;
	}

	function getFmtPartValues(fmtPart, type, groupSign) {
	  var firstPlaceholder;

	  if (type == "left") {
	    firstPlaceholder = fmtPart.match(/[#?0]/);
	    firstPlaceholder = firstPlaceholder ? firstPlaceholder.index : Infinity;
	  }

	  var leftText = "";
	  var rightText = "";
	  var placeholders = "";

	  for (var k = 0; k < fmtPart.length; k++) {
	    if (!placeholder(fmtPart[k])) {
	      if (fmtPart[k] == groupSign && placeholder(fmtPart[k + 1]) && placeholder(fmtPart[k - 1])) {
	        placeholders += fmtPart[k];
	        continue;
	      }

	      if (type == "left") if (k < firstPlaceholder) {
	        leftText += fmtPart[k];
	        continue;
	      }
	      rightText += fmtPart[k];
	    } else placeholders += fmtPart[k];
	  }

	  return {
	    leftText: leftText,
	    rightText: rightText,
	    placeholders: placeholders
	  };
	}

	function separateFmt(line) {
	  var color = "";
	  var check = "";
	  var start = line.indexOf("[");

	  if (start !== -1) {
	    if (line[1].match(/[><=]/)) {
	      var end = line.indexOf("]");
	      check = line.substr(start + 1, end - start - 1);
	      line = line.substr(end + 1);
	    }
	  }

	  start = line.indexOf("[");

	  if (start !== -1) {
	    var _end = line.indexOf("]");

	    color = line.substr(start + 1, _end - start - 1);
	    line = line.substr(_end + 1);
	  }

	  return {
	    condition: check,
	    color: color,
	    fmt: line
	  };
	}

	function getCells(view, row, column) {
	  if (row && column) {
	    if (_typeof(row) === "object" && _typeof(column) === "object") {
	      var cells = [];

	      for (var r = row.row; r <= column.row; r++) {
	        for (var c = row.column; c <= column.column; c++) {
	          cells.push({
	            row: r,
	            column: c
	          });
	        }
	      }

	      return cells;
	    } else return [{
	      row: row,
	      column: column
	    }];
	  } else return view.getSelectedId(true);
	}

	function placeholder(val) {
	  return val === "0" || val === "#" || val === "?";
	}

	function getParts(str, decimal) {
	  // it is nessesary to use "/" before decimal to escape regex special characters
	  var match = str.match("[#?0][/" + decimal + "][#?0]");
	  if (match) return [str.substring(0, match.index + 1), str.substring(match.index + 2)];else return [str];
	}

	var m6 = /*#__PURE__*/Object.freeze({
		get formatHelpers () { return formatHelpers; },
		setDefaultFormats: setDefaultFormats,
		getDelimiters: getDelimiters,
		serialize: serialize,
		load: load,
		getFormat: getFormat,
		getFormatSource: getFormatSource,
		addFormat: addFormat,
		format2code: format2code,
		changeAreaDecimals: changeAreaDecimals,
		changeCellDecimals: changeCellDecimals,
		isCustom: isCustom,
		formToValues: formToValues,
		serializeFormat: serializeFormat
	});

	var actions = {
	  span: function (view) {
	    var range = view.$$("cells").getSelectArea();

	    if (range) {
	      if (isMerged(view, range)) {
	        view.splitCell();
	      } else {
	        var values = [];

	        for (var r = range.start.row; r <= range.end.row; r++) {
	          for (var c = range.start.column; c <= range.end.column; c++) {
	            var value = view.getCellValue(r, c);
	            if (value) values.push(value);
	            if (values.length > 1) break;
	          }

	          if (values.length > 1) break;
	        }

	        if (values.length > 1) {
	          view.confirm({
	            text: webix.i18n.spreadsheet.labels["merge-cell-confirm"],
	            callback: function (res) {
	              if (res) view.combineCells();
	            }
	          });
	        } else view.combineCells();
	      }
	    }
	  },
	  undo: function (view) {
	    view.undo();
	  },
	  redo: function (view) {
	    view.redo();
	  },
	  "hide-gridlines": function (view) {
	    view.hideGridlines("toggle");
	  },
	  "hide-headers": function (view) {
	    view.hideHeaders("toggle");
	  },
	  "freeze-columns": function (view) {
	    var table = view.$$("cells");
	    var select = table.getSelectedId();
	    view.freezeColumns(select && select.column != "rowId" ? select.column : 0);
	  },
	  "freeze-rows": function (view) {
	    var table = view.$$("cells");
	    var select = table.getSelectedId();
	    view.freezeRows(select ? select.row : 0);
	  },
	  "increase-decimals": function (view) {
	    changeAreaDecimals(view, 1);
	  },
	  "decrease-decimals": function (view) {
	    changeAreaDecimals(view, -1);
	  }
	};

	function isMerged(view, range) {
	  var i,
	      j,
	      c0 = range.start,
	      c1 = range.end;

	  for (i = c0.row * 1; i <= c1.row * 1; i++) {
	    for (j = c0.column * 1; j <= c1.column * 1; j++) {
	      if (view.$$("cells").getSpan(i, j)) return true;
	    }
	  }

	  return false;
	}

	var fontFamily = [{
	  id: "Arial",
	  value: "Arial"
	}, {
	  id: "'Roboto', sans-serif",
	  value: "Roboto"
	}, {
	  id: "'PT Sans', Tahoma",
	  value: "PT Sans"
	}, {
	  id: "Tahoma",
	  value: "Tahoma"
	}, {
	  id: "Verdana",
	  value: "Verdana"
	}, {
	  id: "Calibri, Tahoma",
	  value: "Calibri"
	}]; // options for 'format' select

	function getCellFormats() {
	  var locale = webix.i18n.spreadsheet.labels;
	  return [{
	    id: "common",
	    value: locale.common
	  }, {
	    id: "price",
	    value: locale.currency,
	    example: "98.20"
	  }, {
	    id: "int",
	    value: locale.number,
	    example: "2120.02"
	  }, {
	    id: "percent",
	    value: locale.percent,
	    example: "0.5"
	  }, {
	    id: "custom",
	    value: locale["custom-format"]
	  }];
	}

	function getColumnOperation(view) {
	  var locale = webix.i18n.spreadsheet.menus;
	  var colOperations = [{
	    id: "add",
	    group: "column",
	    value: locale["insert-column"]
	  }, {
	    id: "del",
	    group: "column",
	    value: locale["delete-column"]
	  }, {
	    id: "show",
	    group: "column",
	    value: locale["show-column"]
	  }, {
	    id: "hide",
	    group: "column",
	    value: locale["hide-column"]
	  }];
	  if (view.config.resizeCell != false) colOperations.push({
	    id: "resize",
	    group: "column",
	    value: locale["resize-column"]
	  });
	  return colOperations;
	}
	function getRowOperation(view) {
	  var locale = webix.i18n.spreadsheet.menus;
	  var rowOperations = [{
	    id: "add",
	    group: "row",
	    value: locale["insert-row"]
	  }, {
	    id: "del",
	    group: "row",
	    value: locale["delete-row"]
	  }, {
	    id: "show",
	    group: "row",
	    value: locale["show-row"]
	  }, {
	    id: "hide",
	    group: "row",
	    value: locale["hide-row"]
	  }];
	  if (view.config.resizeCell != false) rowOperations.push({
	    id: "resize",
	    group: "row",
	    value: locale["resize-row"]
	  });
	  return rowOperations;
	} // options for 'clear' select

	function getClearOperation() {
	  return [{
	    id: "clear-value",
	    value: getLocaleClear("value")
	  }, {
	    id: "clear-style",
	    value: getLocaleClear("style")
	  }, {
	    id: "clear-conditional-formats",
	    value: getLocaleClear("conditional-formats")
	  }, {
	    id: "clear-dropdown-editors",
	    value: getLocaleClear("dropdown-editors")
	  }, {
	    id: "clear-comments",
	    value: getLocaleClear("comments")
	  }, {
	    $template: "Separator"
	  }, {
	    id: "clear-all",
	    value: getLocaleClear("all")
	  }];
	} // options for 'borders' select

	var borders = [{
	  id: "no",
	  value: "no"
	}, {
	  id: "left",
	  value: "left"
	}, {
	  id: "top",
	  value: "top"
	}, {
	  id: "right",
	  value: "right"
	}, {
	  id: "bottom",
	  value: "bottom"
	}, {
	  id: "all",
	  value: "all"
	}, {
	  id: "outer",
	  value: "outer"
	}, {
	  id: "top-bottom",
	  value: "top-bottom"
	}];

	function getLocaleClear(value) {
	  var locale = webix.i18n.spreadsheet.menus;
	  return locale["clear"] + " " + locale["clear-" + value].toLowerCase();
	} // options for 'font-size' select


	function getFontSize() {
	  var numbers = ["8", "9", "10", "11", "12", "14", "15", "16", "18", "20", "22", "24", "28", "36"];
	  var fontSize = [];

	  for (var i = 0; i < numbers.length; i++) {
	    fontSize.push({
	      id: numbers[i] + webix.i18n.spreadsheet.labels.px,
	      value: numbers[i]
	    });
	  }

	  return fontSize;
	}

	var styleFormats = {
	  "font-weight": "bold",
	  "font-style": "italic",
	  "text-decoration": "underline"
	};
	var ui = {
	  button: function (config) {
	    return {
	      view: "ssheet-toggle",
	      width: config.width || toolbarSizes.width,
	      id: config.name,
	      name: config.name,
	      label: config.label,
	      css: config.css || "",
	      onValue: styleFormats[config.name],
	      offValue: "normal",
	      tooltip: webix.i18n.spreadsheet.tooltips[config.name] || ""
	    };
	  },
	  colorButton: function (config) {
	    return {
	      view: "ssheet-color",
	      css: config.css,
	      name: config.name,
	      width: config.width || toolbarSizes.width + 24,
	      title: "<span class='webix_ssheet_button_icon webix_ssheet_color_button_icon webix_ssheet_icon ssi-" + config.name + "' ></span>",
	      tooltip: webix.i18n.spreadsheet.tooltips[config.name] || ""
	    };
	  },
	  iconButton: function (config) {
	    var btn = webix.copy(config);
	    webix.extend(btn, {
	      view: "button",
	      type: "htmlbutton",
	      width: toolbarSizes.width,
	      id: config.name,
	      label: "<span class='webix_ssheet_button_icon webix_ssheet_icon ssi-" + config.name + "'></span>",
	      css: "",
	      tooltip: webix.i18n.spreadsheet.tooltips[config.name] || webix.i18n.spreadsheet.menus[config.name] || ""
	    });

	    if (config.onValue) {
	      webix.extend(btn, {
	        view: "ssheet-toggle",
	        onValue: config.onValue,
	        offValue: config.offValue
	      }, true);
	    }

	    return btn;
	  },
	  segmented: function (config) {
	    return {
	      view: "segmented",
	      name: config.name,
	      css: config.css || "",
	      width: config.width || toolbarSizes.width + 76,
	      options: config.options
	    };
	  },
	  select: function (config) {
	    webix.extend(config, {
	      view: "richselect",
	      id: config.name,
	      value: defaultStyles[config.name],
	      suggest: {
	        css: "webix_ssheet_suggest",
	        //fitMaster: false,
	        padding: 0,
	        data: config.options
	      }
	    });
	    config.tooltip = webix.i18n.spreadsheet.tooltips[config.name] || "";

	    if (config.popupWidth) {
	      config.suggest.fitMaster = false;
	      config.suggest.width = config.popupWidth;
	    }

	    if (config.popupTemplate) config.suggest.body = {
	      template: config.popupTemplate
	    };

	    if (config.popupEvents) {
	      config.suggest.body = config.suggest.body || {};
	      config.suggest.body.on = config.popupEvents;
	    }

	    return config;
	  },
	  separator: function () {
	    return {
	      view: "ssheet-separator"
	    };
	  },
	  title: function (config) {
	    var title = config.title;
	    if (title.indexOf("$") === 0) title = "";
	    title = webix.i18n.spreadsheet.labels[config.title] || title;
	    return {
	      template: title,
	      view: "ssheet-bar-title",
	      height: toolbarSizes.titleHeight
	    };
	  },
	  borders: function (config) {
	    return {
	      view: "ssheet-borders",
	      width: config.width || toolbarSizes.width + 24,
	      data: borders,
	      id: config.name,
	      name: config.name,
	      tooltip: webix.i18n.spreadsheet.tooltips[config.name]
	    };
	  },
	  align: function (config) {
	    return {
	      view: "ssheet-align",
	      value: defaultStyles[config.name],
	      width: config.width || toolbarSizes.width + 24,
	      data: config.options,
	      name: config.name,
	      tooltip: webix.i18n.spreadsheet.tooltips[config.name]
	    };
	  },
	  condFormat: function (config) {
	    return {
	      view: "ssheet-cond-format",
	      width: 40,
	      id: config.name,
	      name: config.name
	    };
	  }
	};
	var buttonsMap = {
	  "font-family": function () {
	    return ui.select({
	      name: "font-family",
	      options: fontFamily,
	      width: 100
	    });
	  },
	  "font-size": function () {
	    return ui.select({
	      name: "font-size",
	      options: getFontSize(),
	      width: 64
	    });
	  },
	  "font-weight": function () {
	    return ui.button({
	      name: "font-weight",
	      label: "B",
	      css: "webix_ssheet_bold"
	    });
	  },
	  "font-style": function () {
	    return ui.button({
	      name: "font-style",
	      label: "I",
	      css: "webix_ssheet_italic"
	    });
	  },
	  "text-decoration": function () {
	    return ui.button({
	      name: "text-decoration",
	      label: "U",
	      css: "webix_ssheet_underline"
	    });
	  },
	  "color": function () {
	    return ui.colorButton({
	      name: "color",
	      icon: "font",
	      css: "webix_ssheet_color"
	    });
	  },
	  "background": function () {
	    return ui.colorButton({
	      name: "background",
	      icon: "paint-brush",
	      css: "webix_ssheet_background",
	      width: 64
	    });
	  },
	  "borders": function () {
	    return ui.borders({
	      name: "borders"
	    });
	  },
	  "text-align": function () {
	    var locale = webix.i18n.spreadsheet.tooltips;
	    return ui.align({
	      name: "text-align",
	      css: "webix_ssheet_align",
	      options: [{
	        id: "left",
	        css: "webix_ssheet_icon ssi-left",
	        tooltip: locale["align-left"]
	      }, {
	        id: "center",
	        css: "webix_ssheet_icon ssi-center",
	        tooltip: locale["align-center"]
	      }, {
	        id: "right",
	        css: "webix_ssheet_icon ssi-right",
	        tooltip: locale["align-right"]
	      }]
	    });
	  },
	  "vertical-align": function () {
	    var locale = webix.i18n.spreadsheet.tooltips;
	    return ui.align({
	      name: "vertical-align",
	      css: "webix_ssheet_align",
	      options: [{
	        id: "top",
	        css: "webix_ssheet_icon ssi-top",
	        tooltip: locale["align-top"]
	      }, {
	        id: "middle",
	        css: "webix_ssheet_icon ssi-middle",
	        tooltip: locale["align-middle"]
	      }, {
	        id: "bottom",
	        css: "webix_ssheet_icon ssi-bottom",
	        tooltip: locale["align-bottom"]
	      }]
	    });
	  },
	  "wrap": function () {
	    return ui.iconButton({
	      name: "wrap",
	      onValue: "wrap",
	      offValue: "nowrap"
	    });
	  },
	  "format": function () {
	    return ui.select({
	      name: "format",
	      width: 106,
	      options: getCellFormats(),
	      popupWidth: 180,
	      popupTemplate: function (obj) {
	        //make it look like an actual cell
	        var format = formatHelpers[obj.id] ? formatHelpers[obj.id].getFormat : "";
	        var cell = {
	          css: ""
	        };
	        var example = format && obj.example ? format(obj.example, cell) : "";
	        return obj.value + (format ? "<span class='webix_ssheet_right" + (cell.css ? " " + cell.css : "") + "'>" + example + "</span>" : "");
	      },
	      popupEvents: {
	        onItemClick: function (id) {
	          if (id == "custom") this.getTopParentView().callEvent("onCommand", [{
	            id: id
	          }]);
	        }
	      }
	    });
	  },
	  "column": function (view) {
	    return {
	      name: "column",
	      view: "ssheet-button",
	      icon: "column",
	      arrow: true,
	      area: true,
	      width: 58,
	      options: getColumnOperation(view)
	    };
	  },
	  "row": function (view) {
	    return {
	      name: "row",
	      view: "ssheet-button",
	      icon: "row",
	      arrow: true,
	      area: true,
	      width: 58,
	      options: getRowOperation(view)
	    };
	  },
	  "clear": function () {
	    return {
	      name: "clear",
	      view: "ssheet-button",
	      icon: "clear-styles",
	      arrow: true,
	      area: true,
	      width: 58,
	      options: getClearOperation()
	    };
	  },
	  "comment": function () {
	    return {
	      name: "comment",
	      view: "ssheet-button",
	      icon: "comments",
	      arrow: true,
	      area: true,
	      width: 55
	    };
	  }
	};

	function toolbarButtons(view, structure) {
	  var checkButtons = function (cells) {
	    for (var i = 0; i < cells.length; i++) {
	      var name = cells[i].$button;

	      if (name) {
	        var base = buttonsMap[name] ? buttonsMap[name](view) : ui.iconButton({
	          name: name
	        });
	        webix.extend(cells[i], base);
	      }

	      if (cells[i].rows) checkButtons(cells[i].rows);
	      if (cells[i].cols) checkButtons(cells[i].cols);
	    }
	  };

	  checkButtons(structure);
	  return structure;
	}
	function getButtons(view, structure) {
	  var config = [];

	  for (var block in structure) {
	    config.push(elementsBlock(view, block, structure[block]));
	    config.push(ui.separator());
	  }

	  return config;
	}

	function blockColumns(view, buttons) {
	  var cols = [];

	  for (var i = 0; i < buttons.length; i++) {
	    var name = buttons[i];

	    if (_typeof(name) == "object") {
	      cols.push(name);
	    } else {
	      var base = buttonsMap[name] ? buttonsMap[name](view) : ui.iconButton({
	        name: name
	      });
	      cols.push(base);
	    }
	  }

	  return cols;
	}

	function elementsBlock(view, name, columns) {
	  var block = {
	    rows: [{
	      padding: 2,
	      cols: [{
	        margin: 2,
	        cols: blockColumns(view, columns)
	      }]
	    }, ui.title({
	      title: name
	    })]
	  };
	  return block;
	}

	function getText(text) {
	  var locale = webix.i18n.spreadsheet;
	  return locale.menus[text] || locale.labels[text] || locale.tooltips[text] || text;
	}

	function calcButtons() {
	  var i,
	      name,
	      width,
	      groups = {
	    "undo": ["undo", "redo"],
	    "insert": ["add-sparkline", "add-image", "add-comment"]
	  },
	      result = {};

	  for (name in groups) {
	    result[name] = 0;

	    for (i = 0; i < groups[name].length; i++) {
	      width = webix.html.getTextSize(getText(groups[name][i]), "webix_ssheet_button_measure").width + 7;
	      result[name] = Math.max(width, result[name]);
	    }
	  }

	  return result;
	}

	function getAllElements() {
	  var sizes = calcButtons();
	  var titleHeight = toolbarSizes.titleHeight;
	  return [{
	    padding: 3,
	    margin: 0,
	    rows: [{
	      margin: 2,
	      cols: [{
	        name: "sheet",
	        view: "ssheet-button-icon-top",
	        label: getText("sheet"),
	        arrow: true,
	        options: [{
	          id: "new-sheet"
	        }, {
	          id: "copy-sheet"
	        }, {
	          id: "remove-sheet"
	        }]
	      }, {
	        rows: [{
	          $button: "excel-import"
	        }, {
	          $button: "excel-export"
	        }]
	      }, {
	        rows: [{
	          $button: "print"
	        }]
	      }]
	    }, {}, {
	      template: getText("file"),
	      view: "ssheet-bar-title",
	      height: titleHeight,
	      width: 85
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      $button: "undo",
	      view: "ssheet-button",
	      label: getText("undo"),
	      width: sizes.undo
	    }, {
	      $button: "redo",
	      view: "ssheet-button",
	      label: getText("redo"),
	      width: sizes.undo
	    }, {
	      template: getText("undo-redo"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      margin: 2,
	      cols: [{
	        margin: 2,
	        cols: [{
	          $button: "font-family",
	          width: (webix.skin.$active.inputHeight + 2) * 3 + 4
	        }, {
	          $button: "font-size"
	        }]
	      }, {
	        $button: "borders"
	      }]
	    }, {
	      margin: 2,
	      cols: [{
	        margin: 2,
	        cols: [{
	          $button: "font-weight"
	        }, {
	          $button: "font-style"
	        }, {
	          $button: "text-decoration"
	        }]
	      }, {
	        $button: "background"
	      }, {
	        $button: "color"
	      }]
	    }, {
	      template: getText("font"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      margin: 2,
	      cols: [{
	        $button: "text-align"
	      }, {
	        $button: "span"
	      }]
	    }, {
	      margin: 2,
	      cols: [{
	        $button: "vertical-align"
	      }, {
	        $button: "wrap"
	      }]
	    }, {
	      template: getText("align"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      $button: "format"
	    }, {
	      margin: 2,
	      cols: [{
	        $button: "increase-decimals"
	      }, {
	        $button: "decrease-decimals"
	      }]
	    }, {
	      template: getText("number"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      cols: [{
	        $button: "sort-asc"
	      }, {
	        $button: "create-filter"
	      }, {
	        $button: "conditional-format"
	      }, {
	        $button: "add-link"
	      }, {
	        $button: "clear"
	      }]
	    }, {
	      cols: [{
	        $button: "sort-desc"
	      }, {
	        $button: "add-range"
	      }, {
	        $button: "lock-cell"
	      }, {
	        $button: "add-dropdown"
	      }]
	    }, {
	      template: getText("edit"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      cols: [{
	        $button: "add-image",
	        view: "ssheet-button",
	        label: getText("image"),
	        width: sizes.insert
	      }, {
	        $button: "add-comment",
	        view: "ssheet-button",
	        label: getText("comment"),
	        width: sizes.insert
	      }]
	    }, {
	      $button: "add-sparkline",
	      view: "ssheet-button",
	      label: getText("graph"),
	      width: sizes.insert
	    }, {
	      template: getText("insert"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {
	    padding: 3,
	    rows: [{
	      cols: [{
	        rows: [{
	          $button: "row"
	        }, {
	          $button: "column"
	        }]
	      }, {
	        rows: [{
	          $button: "hide-gridlines"
	        }, {
	          $button: "hide-headers"
	        }]
	      }, {
	        rows: [{
	          $button: "freeze-rows"
	        }, {
	          $button: "freeze-columns"
	        }]
	      }]
	    }, {
	      template: getText("view"),
	      view: "ssheet-bar-title",
	      height: titleHeight
	    }]
	  }, {
	    view: "ssheet-separator"
	  }, {}];
	}

	var buttons = {
	  "undo-redo": ["undo", "redo"],
	  "font": ["font-family", "font-size", "font-weight", "font-style", "text-decoration", "color", "background", "borders"],
	  "align": ["text-align", "vertical-align", "wrap", "span"],
	  "format": ["format"]
	};
	function init$2(view) {
	  view.attachEvent("onComponentInit", function () {
	    return ready(view);
	  });
	  var elements = [];

	  if (view.config.toolbar) {
	    var allElements = view.config.toolbar;

	    if (allElements == "full") {
	      allElements = getAllElements();
	      if (webix.isUndefined(view.config.bottombar)) view.config.bottombar = true;
	    }

	    elements = toolbarButtons(view, allElements);
	  } else elements = getButtons(view, view.config.buttons || buttons);

	  var bar = {
	    view: "toolbar",
	    css: "webix_ssheet_toolbar webix_layout_toolbar",
	    id: "bar",
	    padding: 0,
	    elements: elements,
	    on: {
	      onChange: function () {
	        var source = this.$eventSource;
	        var value = source.getValue();
	        var name = source.config.name;
	        if (name == "format" && value == "common") value = "";
	        if (!(name == "format" && value == "custom")) view.callEvent("onStyleSet", [name, value]);
	      },
	      onItemClick: function (id) {
	        var viewId = view.innerId(id);
	        if (actions[viewId]) actions[viewId].call(this, view);else view.callEvent("onCommand", [{
	          id: viewId
	        }]);
	      }
	    }
	  };
	  view.callEvent("onViewInit", ["toolbar", bar]);
	  return bar;
	}

	function ready(view) {
	  view.attachEvent("onAfterSelect", function (selected) {
	    return setValues(view, selected);
	  });
	}

	function setValues(view, selected) {
	  var styles = {};
	  var cell = selected[0];

	  if (cell) {
	    var obj = view.getStyle(cell.row, cell.column);
	    if (obj) styles = obj.props;
	  }

	  var barStyles = webix.copy(styles);

	  for (var i in defaultStyles) {
	    if (!barStyles[i]) barStyles[i] = defaultStyles[i];
	  }

	  barStyles.format = isCustom(barStyles.format) ? "custom" : barStyles.format;
	  view.$$("bar").setValues(barStyles);
	}

	function selectRow(row, view, endRow) {
	  var columns = view.$$("cells").config.columns;
	  var firstColumn = columns[0].id == "rowId" ? 1 : 0;
	  var start = {
	    row: row,
	    column: columns[firstColumn].id
	  };
	  var last = {
	    row: endRow || row,
	    column: columns[columns.length - 1].id
	  };
	  if (start.column && last.column) _selectRange(start, last, view);
	}
	function selectAll(view) {
	  var order = view.$$("cells").data.order;
	  var columns = view.$$("cells").config.columns;
	  var firstColumn = columns[0].id == "rowId" ? 1 : 0;
	  var start = {
	    row: order[0],
	    column: columns[firstColumn].id
	  };
	  var last = {
	    row: order[order.length - 1],
	    column: columns[columns.length - 1].id
	  };
	  if (start.column && last.column) _selectRange(start, last, view);
	}
	function selectColumn(column, view, endColumn) {
	  var order = view.$$("cells").data.order;
	  var startRow = order[0];
	  var lastRow = order[order.length - 1];
	  var start = {
	    row: startRow,
	    column: column
	  };
	  var last = {
	    row: lastRow,
	    column: endColumn || column
	  };

	  _selectRange(start, last, view);
	}
	function isColSelected(column, view) {
	  var selectedArea = view.$$("cells").getSelectArea();

	  if (selectedArea) {
	    if (column >= selectedArea.start.column && column <= selectedArea.end.column) return true;
	  }

	  return false;
	}
	function isCellSelected(row, column, view) {
	  return isRowSelected(row, view) && isColSelected(column, view);
	}
	function isRowSelected(row, view) {
	  var selectedArea = view.$$("cells").getSelectArea();

	  if (selectedArea) {
	    if (row >= selectedArea.start.row && row <= selectedArea.end.row) return true;
	  }

	  return false;
	}
	function selectColumns(column, view) {
	  var selectedArea = view.$$("cells").getSelectArea();
	  if (!selectedArea) selectColumn(column, view);else {
	    var col1 = Math.min(selectedArea.start.column, selectedArea.end.column, column);
	    var col2 = Math.max(selectedArea.start.column, selectedArea.end.column, column);
	    selectColumn(col1, view, col2);
	  }
	}

	function _selectRange(a, b, view) {
	  view.$$("cells").addSelectArea(a, b);
	}

	function adjustColumn(column, view) {
	  var width = 25;

	  view._table.eachRow(function (row) {
	    var rowobj = this.getItem(row);
	    var text = this.getText(row, column);
	    var style = view.getStyle(row, column);
	    var css = style ? style.id : "";

	    if (text) {
	      var size = getTextSize(view, text, css, 0, rowobj.$height);
	      if (size.width > width) width = size.width;
	    }
	  });

	  view._table.setColumnWidth(column, width);
	}
	function adjustRow(row, view) {
	  var height = 25;

	  view._table.eachColumn(function (column) {
	    var text = this.getText(row, column);
	    var style = view.getStyle(row, column);
	    var css = style ? style.id : "";

	    if (text) {
	      var size = getTextSize(view, text, css, this.getColumnConfig(column).width, 0);
	      if (size.height > height) height = size.height;
	    }
	  });

	  view._table.setRowHeight(row, height);
	}
	function highlightColRow(start, end, view) {
	  if (!view._table.config.header) return;
	  var sr = start.row,
	      er = end.row,
	      sc = start.column,
	      ec = end.column;

	  if (er < sr) {
	    var _ref = [er, sr];
	    sr = _ref[0];
	    er = _ref[1];
	  }

	  if (ec < sc) {
	    var _ref2 = [ec, sc];
	    sc = _ref2[0];
	    ec = _ref2[1];
	  }

	  view._table.eachRow(function (row) {
	    if (row >= sr && row <= er) view._table.addCellCss(row, "rowId", "webix_highlight");else view._table.removeCellCss(row, "rowId", "webix_highlight");
	  });

	  view._table.eachColumn(function (col) {
	    var node = view._table.getHeaderNode(col);

	    if (!node) return;
	    if (col >= sc && col <= ec) webix.html.addCss(node, "webix_highlight");else webix.html.removeCss(node, "webix_highlight");
	  });
	}

	var m12 = /*#__PURE__*/Object.freeze({
		selectRow: selectRow,
		selectAll: selectAll,
		selectColumn: selectColumn,
		isColSelected: isColSelected,
		isCellSelected: isCellSelected,
		isRowSelected: isRowSelected,
		selectColumns: selectColumns,
		adjustColumn: adjustColumn,
		adjustRow: adjustRow,
		highlightColRow: highlightColRow
	});

	function init$3(view, extra) {
	  view.attachEvent("onComponentInit", function () {
	    return ready$1(view);
	  });
	  var datatable = {
	    view: "datatable",
	    id: "cells",
	    css: "webix_ssheet_table webix_data_border wss_" + view.$index,
	    headerRowHeight: webix.skin.$name == "contrast" || webix.skin.$name == "flat" ? 24 : 20,
	    spans: true,
	    leftSplit: 1,
	    areaselect: true,
	    editable: true,
	    editaction: extra.liveEditor ? "custom" : "dblclick",
	    minColumnWidth: 1,
	    minRowHeight: 1,
	    navigation: true
	  }; //enable clipboard by default

	  if (extra.clipboard !== false) {
	    extra.clipboard = "custom";
	    if (extra.clipboardDecimalDelimiter) extra.templateCopy = function (item) {
	      if (webix.rules.isNumber(item)) item = item.toString().replace(".", extra.clipboardDecimalDelimiter);
	      return item;
	    };
	  }

	  if (extra) datatable = webix.extend(datatable, extra, true);
	  return datatable;
	}

	function ready$1(view) {
	  var grid = view._table;
	  var showHandler = webix.event(document.body, "mousemove", function () {
	    var thread;
	    return function (e) {
	      clearTimeout(thread);
	      thread = webix.delay(function (e) {
	        if (view.comments._activeComment.editStatus) return;
	        var cell = grid.locate(e);
	        var visible = view.comments.commentsView && view.comments.commentsView.isVisible();

	        if (cell && view.comments.get(cell.row, cell.column)) {
	          var activeCell = view.comments._activeComment.cell;
	          if (activeCell && (activeCell.row != cell.row || activeCell.column != cell.column) || !visible) view.callEvent("onCommand", [{
	            id: "add-comment",
	            cell: cell,
	            viewonly: true
	          }]);
	        } else if (visible && !view.comments.commentsView.$view.contains(e.target)) view.callEvent("onCommentHide", []);
	      }, true, [e], 250);
	    };
	  }());
	  view.attachEvent("onDestruct", function () {
	    return webix.eventRemove(showHandler);
	  }); //in grid math

	  if (view.config.math) {
	    grid.config.editMath = true;
	  } //saving value after edit


	  grid.attachEvent("onBeforeEditStop", function (st, ed) {
	    //ignore empty cells
	    if (st.old === webix.undefined && st.value === "") return;

	    if (st.value != st.old) {
	      view.setCellValue(ed.row, ed.column, st.value);
	      grid.refresh();
	    }

	    st.value = st.old;
	  }); //column drag event checking

	  var dragStartColumn;
	  grid.$view.firstChild.addEventListener("mousedown", function (e) {
	    //column ids are starting from 0, thats why we adding 1
	    dragStartColumn = e.target.parentNode.cellIndex + 1;
	  });
	  grid.$view.firstChild.addEventListener("mouseup", function (e) {
	    var dragEndColumn = e.target.parentNode.cellIndex + 1;

	    if (dragStartColumn && dragStartColumn !== dragEndColumn) {
	      selectColumn(dragStartColumn, view, dragEndColumn);
	      dragStartColumn = undefined;
	    }
	  });
	  grid.attachEvent("onEnter", function () {
	    if (grid.getEditor()) {
	      webix.delay(function () {
	        grid.moveSelection("down");
	      });
	    }
	  }); //prevent editing of locked cells

	  view.attachEvent("onBeforeEditStart", function (row, column) {
	    return !view.isCellLocked(row, column);
	  });
	  grid.attachEvent("onBeforeEditStart", function (editor) {
	    return view.callEvent("onBeforeEditStart", [editor.row, editor.column]);
	  }); //column and row selection

	  grid.attachEvent("onBeforeSelect", function (id) {
	    return id.column != "rowId";
	  });
	  grid.attachEvent("onBeforeBlockSelect", function (start, end, finalStep) {
	    if (finalStep && (start.column !== "rowId" || end.column !== "rowId")) {
	      if (start.column === "rowId") start.column = 1;
	      if (end.column === "rowId") end.column = 1;
	    }

	    if (start.column !== "rowId" || end.column !== "rowId") {
	      highlightColRow(start, end, view);
	      return true;
	    }

	    return false;
	  });
	  grid.attachEvent("onSelectChange", function () {
	    var ids = grid.getSelectedId(true);

	    if (ids.length) {
	      var start = ids[0];
	      var end = ids[ids.length - 1] ? ids[ids.length - 1] : ids[0];
	      highlightColRow(start, end, view);
	    } else {
	      var data = {
	        row: 0,
	        column: 0
	      };
	      highlightColRow(data, data, view);
	    }
	  });
	  grid.attachEvent("onItemDblClick", function (id) {
	    if (id.column === "rowId") adjustRow(id.row, view);
	  });
	  var lastHeaderClick = 0;
	  grid.attachEvent("onHeaderClick", function (id, e) {
	    if (id.column == "rowId") {
	      selectAll(view);
	      return;
	    }

	    var headerClick = new Date();
	    var dblClick = headerClick - lastHeaderClick <= 300;

	    if (dblClick) {
	      adjustColumn(id.column, view);
	    } else {
	      lastHeaderClick = headerClick;

	      if (e.shiftKey) {
	        selectColumns(id.column, view);
	      } else {
	        selectColumn(id.column, view);
	      }
	    }
	  }); //select rows by shift click

	  var lastClickedRow = null;
	  grid.attachEvent("onItemClick", function (cell, e) {
	    if (cell.column === "rowId") {
	      if (!e.shiftKey) selectRow(cell.row, view);else {
	        if (!lastClickedRow) selectRow(cell.row, view);else selectRow(lastClickedRow, view, cell.row);
	      }
	      lastClickedRow = cell.row;
	    }
	  }); //reset API

	  view.attachEvent("onReset", function () {
	    return reset$1(view);
	  });
	  view.attachEvent("onBeforeSheetShow", function () {
	    return grid.editStop();
	  });
	  grid.attachEvent("onBlur", function () {
	    //after focus moved out, check and if it is somewhere
	    //on the spreadsheet controls them move focus back to datatable
	    webix.delay(function () {
	      var target = document.activeElement;
	      if (target && target.tagName == "INPUT") return;
	      var focus = webix.UIManager.getFocus();
	      var need_focus = focus && focus != grid && focus.getTopParentView && focus.getTopParentView() === view;
	      if (need_focus) webix.UIManager.setFocus(grid);
	    }, this, [], 100);
	  });
	  setDefaultCss(view);
	}

	function cell_template(view, obj, common, value, column) {
	  var format = obj.$cellFormat ? obj.$cellFormat[column.id] : null;
	  var commented = view.comments.get(obj.id, column.id) ? "<div class='ssheet_commented_sign'></div>" : "";

	  if (format) {
	    var cell = {
	      css: ""
	    };
	    var helper = getFormat(format);

	    if (helper) {
	      var parsed = parseFloat(value);

	      if (!isNaN(parsed)) {
	        var newvalue = helper(parsed, cell);
	        if (cell.css) return "<div class='" + cell.css + "'>" + newvalue + "</div>" + commented;
	        return newvalue + commented;
	      }
	    }
	  }

	  if (webix.isUndefined(value) || value === null) value = "";
	  return value + commented;
	}

	function reset$1(view) {
	  var grid = view.$$("cells");
	  grid.clearAll();
	  var columns = view.config.columnCount;
	  var rows = view.config.rowCount;
	  var cols = [{
	    id: "rowId",
	    header: "",
	    width: 40,
	    css: "sheet_column_0",
	    template: function (el) {
	      return el.id;
	    }
	  }];

	  for (var i = 1; i <= columns; i++) {
	    cols.push({
	      id: i,
	      editor: "text",
	      header: {
	        text: encode[i],
	        css: view._hideColumn && view._hideColumn.indexOf(i + 1) >= 0 ? "webix_ssheet_hide_column" : ""
	      },
	      template: function (obj, common, value, column) {
	        return cell_template(view, obj, common, value, column);
	      }
	    });
	    view.callEvent("onColumnInit", [cols[i]]);
	  }

	  grid.refreshColumns(cols);
	  if (view._hideColumn && view._hideColumn.length) view._hideColumn.map(function (id) {
	    return grid.hideColumn(id);
	  });
	  var data = [];

	  for (var _i = 1; _i <= rows; _i++) {
	    data.push({
	      id: _i
	    });
	  }

	  grid.parse(data);

	  if (view._hideRow && view._hideRow.length) {
	    grid.filter(function (obj) {
	      if (view._hideRow.indexOf(obj.id) === -1) {
	        return true;
	      } else {
	        if (obj.id - 1 === 0) {
	          var cell = view.$$("cells").getColumnConfig("rowId").header[0];
	          cell.css = (cell.css || "") + " webix_ssheet_hide_row";
	          view.$$("cells").refreshColumns();
	        } else {
	          view.$$("cells").addCellCss(obj.id - 1, "rowId", "webix_ssheet_hide_row");
	        }

	        return false;
	      }
	    });
	  }
	} // nowrap by default

	function setDefaultCss(view) {
	  webix.html.addStyle("#" + view._table.$view.id + ".webix_dtable .webix_cell { white-space:nowrap;}");
	}

	function init$4(view) {
	  var grid = view.$$("cells");
	  var key = webix.env.isMac ? "command" : "ctrl";
	  webix.UIManager.addHotKey(key + "-a", function () {
	    if (!grid.getEditor()) selectAll(view);
	  }, grid);

	  if (!view.config.readonly) {
	    webix.UIManager.addHotKey("any", function (view, ev) {
	      //ignore shift key
	      if ((ev.which || ev.keyCode) == 16) return;
	      var sel = view.getSelectedId(true);

	      if (sel.length) {
	        grid.$anyKey = true;
	        grid.edit(sel[0]);
	      }
	    }, grid);
	    webix.UIManager.addHotKey("enter", function (view) {
	      var sel = view.getSelectedId(true);

	      if (sel.length) {
	        if (view.config.liveEditor) grid.callEvent("onBeforeLiveEditor", [sel[0]]);else grid.edit(sel[0]);
	      }
	    }, grid);
	    webix.UIManager.addHotKey("backspace", function () {
	      return del(view);
	    }, grid);
	    webix.UIManager.addHotKey("delete", function () {
	      return del(view);
	    }, grid);
	    var redo = webix.env.isMac ? "command-shift-z" : "ctrl-y";
	    webix.UIManager.addHotKey(redo, function () {
	      return view.redo();
	    }, grid);
	    webix.UIManager.addHotKey(key + "-z", function () {
	      return view.undo();
	    }, grid);
	    webix.UIManager.addHotKey(key + "-b", function () {
	      return styleHotKey(view, "font-weight");
	    }, grid);
	    webix.UIManager.addHotKey(key + "-i", function () {
	      return styleHotKey(view, "font-style");
	    }, grid);
	    webix.UIManager.addHotKey(key + "-u", function (v, e) {
	      return ctrlU(view, e);
	    }, grid);
	    webix.UIManager.addHotKey(key + "-p", function (v, e) {
	      return ctrlP(view, e);
	    }, grid);
	  }
	}

	function del(view) {
	  group.set(function () {
	    view.eachSelectedCell(function (cell) {
	      return view.setCellValue(cell.row, cell.column, "");
	    });
	    view.refresh();
	  });
	}

	function ctrlU(view, e) {
	  styleHotKey(view, "text-decoration");
	  return webix.html.preventEvent(e);
	}

	function ctrlP(view, e) {
	  view.callEvent("onCommand", [{
	    id: "print"
	  }]);
	  return webix.html.preventEvent(e);
	}

	function styleHotKey(view, attr) {
	  var cell = view.getSelectedId();

	  if (cell) {
	    var style = view.getStyle(cell.row, cell.column);
	    var elementOn = styleFormats[attr];
	    var elementOff = "normal";
	    var state = style && style.props[attr] === elementOn ? elementOff : elementOn;
	    view.callEvent("onStyleSet", [attr, state]);
	  }
	}

	function _to_number(v) {
	  if (v || v === 0) {
	    v = v * 1;
	    if (!isNaN(v)) return v;
	  }

	  return false;
	}

	function _combine(data) {
	  var arr = [];

	  for (var i = 0; i < data.length; i++) {
	    arr = arr.concat(data[i]);
	  }

	  return arr;
	}
	/*Empty cells, logical values like TRUE, or text are ignored.*/


	function SUM() {
	  var sum = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false) sum += v;
	  }

	  return sum;
	}
	/*If a range or cell reference argument contains text, logical values, or empty cells, those values are ignored; 
	however, cells with the value zero are included.*/

	function AVERAGE() {
	  var sum = 0,
	      count = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false) {
	      sum += v;
	      count++;
	    }
	  }

	  return sum / count;
	}
	/*Empty cells, logical values, text, or error values in the array or reference are not counted. */

	function COUNT() {
	  var count = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false) count++;
	  }

	  return count;
	}
	/*counts the number of cells that are not empty in a range, zero is excluded.*/

	function COUNTA() {
	  var count = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    if (set[i] && set[i] * 1 !== 0) count++;
	  }

	  return count;
	}
	/*Counts empty cells in a specified range of cells. Cells with zero values are not counted.*/

	function COUNTBLANK() {
	  var count = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    if (!set[i] * 1) count++;
	  }

	  return count;
	}
	/*Empty cells, logical values, or text in the array or reference are ignored.
	If the arguments contain no numbers, MAX returns 0 (zero).*/

	function MAX() {
	  var max = "",
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false && (v > max || max === "")) max = v;
	  }

	  return max || 0;
	}
	/*Empty cells, logical values, or text in the array or reference are ignored. 
	If the arguments contain no numbers, MIN returns 0.*/

	function MIN() {
	  var min = "",
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false && (v < min || min === "")) min = v;
	  }

	  return min || 0;
	}
	/* Only numbers in the array or reference are multiplied. 
	Empty cells, logical values, and text in the array or reference are ignored.*/

	function PRODUCT() {
	  var product = "",
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false) product = product === "" ? v : product * v;
	  }

	  return product;
	}
	/* For valid products only numbers are multiplied. Empty cells, logical values, and text are ignored.
	Treats array entries that are not numeric as if they were zeros.*/

	function SUMPRODUCT(sets) {
	  var length = sets[0].length;

	  for (var i in sets) {
	    if (sets[i].length !== length) return;
	  }

	  var sp = 0;

	  for (var _i = 0; _i < sets[0].length; _i++) {
	    var product = "";

	    for (var s in sets) {
	      var v = _to_number(sets[s][_i]);

	      if (v !== false) product = product === "" ? v : product * v;else {
	        product = 0;
	        break;
	      }
	    }

	    if (!webix.isUndefined(product)) sp += product;
	  }

	  return sp;
	}
	/*Empty cells, logical values, text, or error values in the array or reference are ignored. */

	function SUMSQ() {
	  var sq = 0,
	      set = _combine(arguments);

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (typeof v === "number") sq += Math.pow(v, 2);
	  }

	  return sq;
	}
	/*Empty cells, logical values, text, or error values in the array or reference are ignored. */

	function VARP() {
	  var set = _combine(arguments);

	  var count = this.COUNT(set);
	  var avg = this.AVERAGE(set);
	  var sum = 0;

	  for (var i = 0; i < set.length; i++) {
	    var v = _to_number(set[i]);

	    if (v !== false) sum += Math.pow(v - avg, 2);
	  }

	  return sum / count;
	}
	/* Empty cells, logical values, text, or error values in the array or reference are ignored. */

	function STDEVP() {
	  var set = _combine(arguments);

	  return Math.sqrt(this.VARP(set));
	}
	/*real numbers*/

	function POWER(num, pow) {
	  var n = _to_number(num),
	      p = _to_number(pow);

	  if (typeof n == "number" && typeof p == "number") return Math.pow(n, p);
	}
	/*real numbers*/

	function QUOTIENT(num, div) {
	  var n = _to_number(num),
	      d = _to_number(div);

	  if (typeof n == "number" && typeof d == "number") return n / d;
	}
	/*Returns a positive square root.*/

	function SQRT(num) {
	  var v = _to_number(num);

	  if (v !== false && v >= 0) return Math.sqrt(v);
	}
	function ABS(num) {
	  var v = _to_number(num);

	  if (v !== false) return Math.abs(v);
	}
	function RAND() {
	  return Math.random();
	}
	function PI() {
	  return Math.PI;
	}
	/*Rounds a number down to the nearest integer*/

	function INT(num) {
	  var v = _to_number(num);

	  if (v !== false) return Math.round(v);
	}
	/*rounds a number to a specified number of digits*/

	function ROUND(num, digits) {
	  var v = _to_number(num);

	  var d = _to_number(digits) || 0;
	  if (v !== false) return parseFloat(v.toFixed(d));
	}
	/*rounds a number down to a specified number of digits*/

	function ROUNDDOWN(num, digits) {
	  var v = _to_number(num);

	  var d = _to_number(digits) || 0;
	  if (v !== false) return Math.floor(v * Math.pow(10, d)) / Math.pow(10, d);
	}
	/*rounds a number up to a specified number of digits*/

	function ROUNDUP(num, digits) {
	  var v = _to_number(num);

	  var d = _to_number(digits) || 0;
	  if (v !== false) return Math.ceil(v * Math.pow(10, d)) / Math.pow(10, d);
	}
	/*Truncates a number to an integer by removing the fractional part of the number.*/

	function TRUNC(num) {
	  var v = _to_number(num);

	  if (v !== false) return parseInt(v);
	}
	/*Returns number rounded up to the nearest even integer*/

	function EVEN(num) {
	  var v = _to_number(num);

	  if (v !== false) {
	    var r = Math.round(v);
	    return r % 2 ? r + 1 : r;
	  }
	}
	/*Returns number rounded up to the nearest odd integer*/

	function ODD(num) {
	  var v = _to_number(num);

	  if (v !== false) {
	    var r = Math.round(v);
	    return r % 2 ? r : r + 1;
	  }
	}

	var numbers = /*#__PURE__*/Object.freeze({
		SUM: SUM,
		AVERAGE: AVERAGE,
		COUNT: COUNT,
		COUNTA: COUNTA,
		COUNTBLANK: COUNTBLANK,
		MAX: MAX,
		MIN: MIN,
		PRODUCT: PRODUCT,
		SUMPRODUCT: SUMPRODUCT,
		SUMSQ: SUMSQ,
		VARP: VARP,
		STDEVP: STDEVP,
		POWER: POWER,
		QUOTIENT: QUOTIENT,
		SQRT: SQRT,
		ABS: ABS,
		RAND: RAND,
		PI: PI,
		INT: INT,
		ROUND: ROUND,
		ROUNDDOWN: ROUNDDOWN,
		ROUNDUP: ROUNDUP,
		TRUNC: TRUNC,
		EVEN: EVEN,
		ODD: ODD
	});

	function CONCATENATE() {
	  var data = Array.prototype.slice.call(arguments);
	  data = data.map(function (obj) {
	    if (_typeof(obj) === "object") return obj.join("");
	    return obj;
	  });
	  return data.join("");
	}
	function LEFT(text, count) {
	  if (!text) {
	    return "";
	  }

	  return text.substring(0, count);
	}
	function MID(text, start, count) {
	  if (!text) {
	    return "";
	  }

	  return text.substring(start, start + count);
	}
	function RIGHT(text, count) {
	  if (!text) {
	    return "";
	  }

	  return text.substring(text.length - count);
	}
	function LOWER(text) {
	  if (!text) {
	    return "";
	  }

	  return text.toLowerCase();
	}
	function UPPER(text) {
	  if (!text) {
	    return "";
	  }

	  return text.toUpperCase();
	}
	function PROPER(text) {
	  if (!text) {
	    return "";
	  }

	  var temp = text.toLowerCase().split(" ");
	  text = "";

	  for (var idx in temp) {
	    text += (text ? " " : "") + temp[idx].substring(0, 1).toUpperCase() + temp[idx].substring(1);
	  }

	  return text;
	}
	function TRIM(text) {
	  if (!text) {
	    return "";
	  }

	  return text.trim();
	}
	function LEN(text) {
	  if (!text && text !== 0) {
	    return 0;
	  }

	  return text.toString().length;
	}

	var strings = /*#__PURE__*/Object.freeze({
		CONCATENATE: CONCATENATE,
		LEFT: LEFT,
		MID: MID,
		RIGHT: RIGHT,
		LOWER: LOWER,
		UPPER: UPPER,
		PROPER: PROPER,
		TRIM: TRIM,
		LEN: LEN
	});

	function IMAGE(url) {
	  return "<img class=\"webix_ssheet_cimage\" src=\"".concat(webix.template.escape(url), "\">");
	}
	function SPARKLINE(arr, type, color1, color2) {
	  var i,
	      config = {
	    type: type,
	    color: color1,
	    negativeColor: color2
	  },
	      width = type == "pie" ? 60 : 150;

	  for (i = 0; i < arr.length; i++) {
	    arr[i] = arr[i] || 0;
	  }

	  return webix.Sparklines.getTemplate(config)(arr, {
	    width: width,
	    height: 35
	  });
	}
	function LINK(url, text) {
	  text = text || url;
	  return "<a target=\"blank\" href=\"".concat(webix.template.escape(url), "\">").concat(webix.template.escape(text), "</a>");
	}
	function IF(check, pos, neg) {
	  if (check) return pos;else return neg;
	}

	var other = /*#__PURE__*/Object.freeze({
		IMAGE: IMAGE,
		SPARKLINE: SPARKLINE,
		LINK: LINK,
		IF: IF
	});

	var methods = {};
	webix.extend(methods, numbers);
	webix.extend(methods, strings);
	webix.extend(methods, other);
	function addMethod(name, handler) {
	  methods[name] = handler;
	}

	var methodsName = [];

	for (var i$1 in methods) {
	  if (i$1 != "__esModule") methodsName.push(i$1);
	}

	function init$5(view) {
	  view.attachEvent("onComponentInit", function () {
	    return ready$2(view);
	  });
	  return {
	    view: "toolbar",
	    css: "webix_ssheet_toolbar",
	    elements: [{
	      view: "label",
	      label: "Edit: ",
	      width: 60
	    }, {
	      view: "live-editor",
	      disabled: true,
	      id: "liveEditor",
	      suggestData: methodsName
	    }]
	  };
	}

	function ready$2(view) {
	  var editor = view.$$("liveEditor"); //block native editor, and move focus to the custom input
	  //edit by key press

	  view._table.attachEvent("onBeforeEditStart", function (cell) {
	    var mode = view._table.$anyKey;
	    view._table.$anyKey = false;
	    return startEdit(this, cell, mode);
	  }); //edit by enter key


	  view._table.attachEvent("onBeforeLiveEditor", function (cell) {
	    startEdit(this, cell, false);
	  }); //edit by dbl-click


	  view._table.attachEvent("onItemDblClick", function (cell) {
	    startEdit(this, cell, false);
	  });

	  view.attachEvent("onCellChange", function (r, c, v) {
	    var cell = editor.config.activeCell;
	    if (cell && cell.row == r && cell.column == c) editor.setValue(v);
	  });
	  view.attachEvent("onAfterSelect", function (data) {
	    if (!view.$handleSelection) {
	      var cell = data[0];
	      fillEditor(view._table, cell);
	    }
	  });
	  view.attachEvent("onReset", function () {
	    return view.$handleSelection = null;
	  });
	  view.attachEvent("onAction", function (name, options) {
	    if (name == "lock" || name == "filter" || name == "dropdown") disableEditor(options.row, options.column);
	  });

	  function startEdit(table, cell, clear) {
	    var editor = table.getColumnConfig(cell.column).editor; //do not interfere with custom editors

	    if (editor == "text") {
	      fillEditor(table, cell, clear);
	      return false;
	    }

	    return true;
	  }

	  function disableEditor(row, column) {
	    if (view.getCellEditor(row, column) || view.isCellLocked(row, column)) {
	      editor.setValue("");
	      editor.disable();
	      return true;
	    }

	    return false;
	  }

	  function fillEditor(table, cell, clear) {
	    if (disableEditor(cell.row, cell.column)) return;
	    editor.enable();
	    editor.config.activeCell = cell;
	    editor.setValue(clear ? "" : view.getCellValue(cell.row, cell.column));
	    editor.focus();

	    view.$handleSelection = function (a, b, st, en) {
	      return pasteRange(table, st, en, a);
	    };
	  }

	  function pasteRange(view, st, en, cell) {
	    if (st == en) {
	      if (!editor.expectOperator()) return endEdit(cell);
	      editor.setRange(st);
	      webix.delay(function () {
	        return editor.focus();
	      });
	    } else {
	      if (!editor.expectRange()) return endEdit(cell);
	      editor.setRange("".concat(st, ":").concat(en));
	      webix.delay(function () {
	        return editor.focus();
	      });
	    }

	    return false;
	  }

	  function endEdit(st) {
	    if (editor.isEnabled()) {
	      editor.updateCellValue();
	      editor.setValue(st ? view.getCellValue(st.row, st.column) : "");
	    }

	    return true;
	  }
	}

	function find(arr, func) {
	  var result = findIndex(arr, func);
	  return arr[result];
	}
	function findIndex(arr, func) {
	  var result = -1;

	  for (var i = 0; result < 0 && i < arr.length; i++) {
	    if (func(arr[i])) result = i;
	  }

	  return result;
	}
	function getDimension(data, rows, cols) {
	  //var [ row, column, value, style] = obj.data[i];
	  for (var i = 0; i < data.length; i++) {
	    var line = data[i];
	    if (line[0] > rows) rows = line[0];
	    if (line[1] > cols) cols = line[1];
	  }

	  return [rows * 1, cols * 1];
	}

	var options = ["rename-sheet", "remove-sheet"];
	var actionMap = {
	  "remove-sheet": function (view) {
	    view.confirm({
	      text: webix.i18n.spreadsheet.labels["sheet-remove-confirm"],
	      callback: function (res) {
	        if (res) remove(view, view._activeSheet);
	      }
	    });
	  },
	  "rename-sheet": function (view) {
	    edit(view, view._activeSheet);
	  },
	  "new-sheet": function (view) {
	    add(view);
	  },
	  "copy-sheet": function (view) {
	    copy(view);
	  }
	};
	function init$6(view) {
	  view.attachEvent("onComponentInit", function () {
	    return ready$3(view);
	  });
	}
	function defaultBottom(view) {
	  var readonly = view.config.readonly;
	  var tabWidth = view.config.sheetTabWidth;
	  var toolbar = {
	    view: "toolbar",
	    id: "bottom-toolbar",
	    css: "webix_ssheet_bottom_toolbar webix_layout_toolbar",
	    paddingY: 0,
	    height: 34,
	    elements: [{
	      view: "button",
	      type: "htmlbutton",
	      width: 34,
	      id: "add-sheet",
	      label: "<span class='webix_ssheet_icon_add_sheet'></span>",
	      tooltip: webix.i18n.spreadsheet.tooltips["add-sheet"] || "",
	      hidden: readonly
	    }, {
	      id: "sheets",
	      view: "sheets",
	      width: 5 * tabWidth,
	      editable: !readonly,
	      editaction: "dblclick",
	      editor: "text",
	      editValue: "value",
	      type: {
	        width: tabWidth,
	        height: 32,
	        template: function (obj) {
	          return "<div>" + obj.value + "</div>" + (!readonly ? "<div class='webix_input_icon wxi-menu-down webix_ssheet_sheet_arrow'></div>" : "");
	        },
	        //remove skin selection css on dnd
	        css: "ssheet_order_sheets"
	      },
	      onClick: {
	        webix_ssheet_sheet_arrow: function (e, id) {
	          initSheetMenu(view, e, id);
	        }
	      },
	      on: {
	        onItemClick: function (id) {
	          if (id != view._activeSheet) view.showSheet(id);
	        }
	      }
	    }, {
	      view: "button",
	      type: "htmlbutton",
	      width: 34,
	      id: "prev-sheet",
	      disabled: true,
	      hidden: true,
	      label: "<span class='webix_icon wxi-menu-left'></span>",
	      batch: "pager",
	      click: function () {
	        scrollSheets(view, -1);
	      }
	    }, {
	      view: "button",
	      type: "htmlbutton",
	      width: 34,
	      id: "next-sheet",
	      hidden: true,
	      label: "<span class='webix_icon wxi-menu-right'></span>",
	      batch: "pager",
	      click: function () {
	        scrollSheets(view, 1);
	      }
	    }]
	  };
	  view.callEvent("onViewInit", ["bottom-toolbar", toolbar]);
	  return toolbar;
	}

	function scrollSheets(view, direction) {
	  var sheets = view.$$("sheets");
	  sheets.scrollTo(sheets.getScrollState().x + direction * view.config.sheetTabWidth, 0);
	}

	function menuInit(view) {
	  var data = [];

	  for (var i = 0; i < options.length; i++) {
	    data.push({
	      id: options[i],
	      value: webix.i18n.spreadsheet.menus[options[i]] || options[i]
	    });
	  }

	  var menu = {
	    view: "ssheet-suggest",
	    data: data
	  };
	  view.callEvent("onViewInit", ["sheet-menu", menu]);
	  return menu;
	}

	function reset$2(view, obj) {
	  var tabs = view.$$("sheets");

	  if (tabs) {
	    tabs.clearAll();
	    var set = [];
	    obj.sheets.forEach(function (sheet) {
	      set.push({
	        id: sheet.name,
	        value: sheet.name
	      });
	    });
	    tabs.parse(set);
	  }
	}

	function ready$3(view) {
	  prepare(view);
	  if (view.$$("add-sheet")) view.$$("add-sheet").attachEvent("onItemClick", function () {
	    add(view);
	  });
	  view.attachEvent("onAfterSheetShow", function (name) {
	    return selectSheet(view, name);
	  });
	  view.attachEvent("onCommand", function (command) {
	    if (actionMap[command.id]) actionMap[command.id](this);
	  });

	  if (view.$$("sheets")) {
	    view.$$("sheets").data.attachEvent("onStoreUpdated", function () {
	      return changePagerVisability(view);
	    });
	    view.$$("sheets").attachEvent("onAfterScroll", function () {
	      return changePagerStatus(view);
	    });
	    view.$$("sheets").attachEvent("onAfterDrop", function (context) {
	      return dataOrder(view, context.start, context.index);
	    });
	    view.$$("sheets").attachEvent("onAfterEditStop", function (state) {
	      return rename(view, state.old, state.value);
	    });
	  }
	}

	function initSheetMenu(view, e, id) {
	  if (!view.$sheetMenu) {
	    view.$sheetMenu = webix.ui(menuInit(view));
	    view.$sheetMenu.attachEvent("onItemClick", function (id) {
	      return callAction(view, id);
	    });
	  }

	  if (view.$sheetMenu.getItem("remove-sheet")) if (view.$$("sheets").count() == 1) view.$sheetMenu.disableItem("remove-sheet");else view.$sheetMenu.enableItem("remove-sheet");

	  if (view.callEvent("onBeforeSheetMenu", [id])) {
	    view.$sheetMenu.show(e);
	  }
	}

	function changePagerStatus(view) {
	  var sheets = view.$$("sheets");
	  var scrollPos = sheets.getScrollState().x;

	  if (scrollPos == 0) {
	    view.$$("prev-sheet").disable();
	  } else {
	    view.$$("prev-sheet").enable();
	    var tabWidth = view.config.sheetTabWidth;

	    if (scrollPos == (sheets.count() - sheets.config.width / tabWidth) * tabWidth) {
	      view.$$("next-sheet").disable();
	      return;
	    }
	  }

	  view.$$("next-sheet").enable();
	}

	function changePagerVisability(view) {
	  var toolbar = view.$$("bottom-toolbar");
	  var sheets = view.$$("sheets");
	  if (sheets.count() <= sheets.config.width / view.config.sheetTabWidth) toolbar.showBatch("pager", false);else toolbar.showBatch("pager");
	}

	function dataOrder(view, name, num) {
	  for (var id in view._sheets) {
	    if (view._sheets[id].name == name) {
	      var item = view._sheets.splice(id, 1);

	      view._sheets.splice(num, 0, item[0]);

	      break;
	    }
	  }
	}

	function add(view, content) {
	  var index, name, newIndex;
	  index = findIndex(view._sheets, function (x) {
	    return x.name == view._activeSheet;
	  });
	  newIndex = index > -1 ? index + 1 : view._sheets.length;
	  name = getNewTitle(view);
	  content = content || {
	    data: []
	  };

	  view._sheets.splice(newIndex, 0, {
	    name: name,
	    content: content
	  });

	  view.$$("sheets").add({
	    id: name,
	    value: name
	  }, newIndex);
	  view.showSheet(name);
	  view.callEvent("onSheetAdd", [name]);
	  return name;
	}

	function getNewTitle(view) {
	  var index = view._sheets.length + 1;

	  while (getSheet(view, webix.i18n.spreadsheet.labels.sheet + index)) {
	    index++;
	  }

	  var name = webix.i18n.spreadsheet.labels.sheet + index;
	  return name;
	}

	function selectSheet(view, name) {
	  if (view.$$("sheets")) {
	    view.$$("sheets").select(name);
	    view.$$("sheets").showItem(name);
	  }
	}

	function edit(view, name) {
	  view.$$("sheets").edit(name);
	}
	function remove(view, name) {
	  var index, newSheet;

	  if (view._sheets.length > 1) {
	    index = findIndex(view._sheets, function (x) {
	      return x.name == name;
	    });

	    view._sheets.splice(index, 1);

	    if (!view._sheets[index]) index = 0;
	    newSheet = view._sheets[index];
	    view._activeSheet = null;

	    if (view.$$("sheets")) {
	      view.$$("sheets").remove(name);
	      view.$$("sheets").refresh();
	    }

	    view.showSheet(newSheet.name);
	    view.callEvent("onSheetRemove", [name]);
	  }
	}
	function rename(view, name, newName) {
	  if (name == newName) return; //correct sheet name

	  var i = 1;

	  while (!newName || getSheet(view, newName)) {
	    newName = webix.i18n.spreadsheet.labels.sheet + i;
	    i++;
	  }

	  newName = newName.replace(/[*?:[\]\\/]/g, "").substring(0, 31);
	  var sheet = getSheet(view, name);
	  var sheets = view.$$("sheets");
	  sheet.name = newName;
	  if (view._activeSheet == name) view._activeSheet = newName;

	  if (sheets) {
	    var item = sheets.getItem(name);
	    item.value = newName;
	    sheets.data.changeId(name, newName);
	    sheets.refresh(newName);
	  }

	  view.callEvent("onSheetRename", [name, newName]);
	}
	function serialize$1(view, obj) {
	  getSheet(view, view._activeSheet).content = obj;
	  return view._sheets;
	}
	function load$1(view, obj) {
	  obj = webix.isArray(obj) ? {
	    sheets: obj
	  } : obj;

	  if ((obj.excel || !obj.sheets) && view._activeSheet) {
	    //loading into active sheet
	    var name = view._activeSheet;
	    getSheet(view, name).content = obj;
	    refresh(view, obj);
	  } else {
	    //creating new set of sheets
	    prepare(view, obj);
	  }
	}
	function prepare(view, obj) {
	  if (!obj) obj = {
	    data: []
	  };
	  if (!obj.sheets) obj = newSheet(obj);
	  var name = obj.sheets[0].name;
	  view._activeSheet = "";
	  view._sheets = obj.sheets;
	  reset$2(view, obj);
	  show(view, name);
	}
	function newSheet(obj) {
	  return {
	    sheets: [{
	      name: webix.i18n.spreadsheet.labels.sheet + 1,
	      content: obj
	    }]
	  };
	}
	function show(view, name) {
	  if (name == view._activeSheet) return;

	  if (view.callEvent("onBeforeSheetShow", [name])) {
	    if (view._activeSheet) getSheet(view, view._activeSheet).content = view.serialize();
	    view._activeSheet = name;
	    var obj = getSheet(view, name).content;
	    refresh(view, obj);
	    view.callEvent("onAfterSheetShow", [name]);
	  }
	}
	function getSheet(view, name) {
	  return find(view._sheets, function (x) {
	    return x.name == name;
	  });
	}
	function getActive(view) {
	  return view._activeSheet;
	}

	function refresh(view, obj) {
	  var _arr$getDimension = getDimension(obj.data, view.config.rowCount, view.config.columnCount),
	      _arr$getDimension2 = _slicedToArray(_arr$getDimension, 2),
	      rows = _arr$getDimension2[0],
	      cols = _arr$getDimension2[1];

	  view.callEvent("onReset", []);

	  if (rows != view.config.rowCount || cols != view.config.columnCount) {
	    view.config.rowCount = rows;
	    view.config.columnCount = cols;

	    view._resetTable();
	  }

	  view._loading_data = true;
	  view.callEvent("onDataParse", [obj]);
	  view._loading_data = false;

	  view._table.refresh();

	  if (view.config.bottombar) view.$$("sheets").refresh();
	}

	function copy(view) {
	  add(view, view.serialize());
	}

	function callAction(view, id) {
	  if (!view.$sheetMenu.data.getMark(id, "webix_disabled")) actionMap[id](view);
	}

	var Dialog =
	/*#__PURE__*/
	function () {
	  function Dialog(view) {
	    _classCallCheck(this, Dialog);

	    this.view = view;
	  }

	  _createClass(Dialog, [{
	    key: "$init",
	    value: function $init() {}
	  }, {
	    key: "$show",
	    value: function $show() {}
	  }, {
	    key: "$hide",
	    value: function $hide() {}
	  }, {
	    key: "open",
	    value: function open() {
	      var _this = this;

	      if (!this.$dialog) {
	        this.$dialog = webix.ui(this.$init());
	        this.$dialog.attachEvent("onHide", function () {
	          return _this.$hide();
	        });
	      }

	      var form = this.$dialog.getBody();
	      this.$dialog.show();
	      if (this.$show(this.$dialog, form) === false) this.close();
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      webix.UIManager.setFocus(this.view);
	      this.$dialog.hide();
	    }
	  }]);

	  return Dialog;
	}();

	function image(url) {
	  return "=IMAGE(\"".concat(url, "\")");
	}
	function chart(config) {
	  var result = "=SPARKLINE(".concat(config.range, ",\"").concat(config.type, "\"");
	  if (config.type === "bar") result += ",\"".concat(config.color, "\",\"").concat(config.negativeColor, "\"");else if (config.color) result += ",\"".concat(config.color, "\"");
	  return result + ")";
	}
	function parseImage(value) {
	  if (value && value.indexOf("=IMAGE(") === 0) return {
	    url: unescape(value.substr(7, value.length - 8))
	  };
	}
	function parseChart(value) {
	  if (value && value.indexOf("=SPARKLINE(") === 0) {
	    var text = value.substr(11, value.length - 12).split(",");
	    return {
	      range: text[0],
	      type: unescape(text[1]),
	      color: unescape(text[2]),
	      negativeColor: unescape(text[3])
	    };
	  }
	}

	function unescape(text) {
	  if (!text) return "";
	  text = text.trim();
	  if (text[0] === "\"") text = text.substr(1);
	  if (text[text.length - 1] === "\"") text = text.substr(0, text.length - 1);
	  return text;
	}

	var action = "add-image";
	var DialogBox =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box, form) {
	      this.cell = this.view.getSelectedId();
	      if (!this.cell) return false;
	      form.elements.preview.setHTML("");
	      form.elements.url.setValue(""); //sync state of dialog to data with  the selected cell

	      var value = this.view.getCellValue(this.cell.row, this.cell.column);
	      var data = parseImage(value);
	      if (data && data.url) form.elements.url.setValue(data.url);
	      form.elements.url.focus();
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      var save = this.view.config.save;
	      var server = save && save.images || null;
	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["image-title"],
	        move: true,
	        position: "center",
	        body: {
	          view: "form",
	          elements: [{
	            view: "text",
	            name: "url",
	            placeholder: webix.i18n.spreadsheet.labels["image-url"],
	            on: {
	              "onChange": showPreview
	            }
	          }, {
	            view: "label",
	            label: webix.i18n.spreadsheet.labels["image-or"],
	            align: "center"
	          }, {
	            view: "uploader",
	            label: webix.i18n.spreadsheet.labels["image-upload"],
	            upload: server,
	            on: {
	              "onBeforeFileAdd": startLoad,
	              "onFileUpload": endLoad
	            }
	          }, {
	            view: "formlate",
	            name: "preview",
	            borderless: true,
	            css: "webix_ssheet_preview",
	            template: "",
	            height: 50
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return okClick(_this);
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	function startLoad(file) {
	  var _this2 = this;

	  if (!this.config.upload) {
	    var reader = new FileReader();

	    reader.onload = function (e) {
	      return _this2.getFormView().elements.url.setValue(e.target.result);
	    };

	    reader.readAsDataURL(file.file);
	    return false;
	  } else this.getFormView().elements.preview.setHTML("");
	}

	function endLoad(item, response) {
	  this.getFormView().elements.url.setValue(response.imageURL);
	}

	function okClick(dialog) {
	  var cell = dialog.cell;
	  var image$$1 = fillUrl(dialog.$dialog.getBody().elements.url.getValue());
	  dialog.view.addImage(cell.row, cell.column, image$$1);
	  dialog.close();
	}

	function showPreview(image$$1) {
	  if (image$$1) {
	    image$$1 = webix.template.escape(fillUrl(image$$1));
	    this.getFormView().elements.preview.setHTML("<img class='webix_ssheet_cimage' src='" + image$$1 + "'></img>");
	  }
	}

	function fillUrl(url) {
	  if (!/^[/]|((https?:\/|data:image)\/)/i.test(url)) url = "http://" + url;
	  return url;
	}

	var aiw = /*#__PURE__*/Object.freeze({
		action: action,
		DialogBox: DialogBox
	});

	function isChar(char) {
	  var code = char.charCodeAt(0);
	  return code >= 65 && code <= 122 || code === 36;
	}

	function isNumber(char) {
	  var code = char.charCodeAt(0);
	  return code >= 48 && code <= 57;
	}

	function getWord(formula, i, passive) {
	  var max = formula.length;
	  var sheet = passive;
	  var quotes = false;

	  for (var j = i; j < max; j++) {
	    var key = formula[j];

	    if (key === "'") {
	      quotes = !quotes;
	      continue;
	    }

	    if (!quotes) {
	      if (key === "!") {
	        //mulit-sheet math
	        sheet = formula.substr(i, j - i);
	        if (sheet[0] === "'") sheet = sheet.substr(1, sheet.length - 2);
	        i = j + 1;
	      } else if (!isChar(key) && !isNumber(key)) {
	        return [formula.substr(i, j - i), j, i, sheet];
	      }
	    }
	  }

	  return [formula.substr(i), j, i, sheet];
	}

	var operand = /^[A-Z$]+[0-9]+$/;

	function isPosition(text) {
	  return operand.test(text);
	}

	function position(word) {
	  var row = 0,
	      sum = 0,
	      x = 1,
	      mode = 1,
	      flags = 0;
	  var chars = false;

	  for (var j = word.length - 1; j >= 0; j--) {
	    var key = word[j].charCodeAt(0);

	    if (key === 36) {
	      flags = flags + mode;
	      continue;
	    }

	    if (key < 58) {
	      //numeric
	      sum += (key - 48) * x;
	      x *= 10;
	    } else {
	      if (!chars) {
	        x = 1;
	        row = sum;
	        sum = 0;
	        chars = true;
	        mode += 1;
	      } //alpha


	      sum += (key - 64) * x;
	      x *= 26;
	    }
	  }
	  /*
	  	$X$Y => flags = 3
	  	$XY  => flags = 2
	  	X$Y  => flags = 1
	  	XY   => flags = 0
	  */


	  return [row, sum, flags];
	}

	function operandCode(deps, word, sheet) {
	  var _position = position(word),
	      _position2 = _slicedToArray(_position, 2),
	      r = _position2[0],
	      c = _position2[1];

	  if (sheet !== "") {
	    deps.push([r, c, r, c, sheet]);
	    return "this.vs(\"".concat(sheet, "\",").concat(r, ",").concat(c, ")");
	  } else {
	    deps.push([r, c, r, c, ""]);
	    return "this.v(".concat(r, ",").concat(c, ")");
	  }
	}

	function methodCode(word) {
	  return "this.m.".concat(word);
	}

	function namedRangeCode(deps, view, word, sheet) {
	  var code = view.ranges.getCode(word, sheet);
	  if (!code) return "";
	  var sheetInd = code.indexOf("!");

	  if (sheetInd !== -1) {
	    sheet = code.substr(0, sheetInd);
	    if (sheet[0] === "'") sheet = sheet.substr(1, sheet.length - 2);
	    code = code.substr(sheetInd + 1);
	  }

	  var _code$split = code.split(":"),
	      _code$split2 = _slicedToArray(_code$split, 2),
	      a = _code$split2[0],
	      b = _code$split2[1];

	  return rangeCode(deps, a, b, sheet);
	}

	function templateCode(word) {
	  return "this.p.".concat(word);
	}

	function rangeCode(deps, a, b, sheet) {
	  var _position3 = position(a),
	      _position4 = _slicedToArray(_position3, 2),
	      r1 = _position4[0],
	      c1 = _position4[1];

	  var _position5 = position(b),
	      _position6 = _slicedToArray(_position5, 2),
	      r2 = _position6[0],
	      c2 = _position6[1];

	  if (r1 > r2) {
	    var t = r1;
	    r1 = r2;
	    r2 = t;
	  }

	  if (c1 > c2) {
	    var _t = c1;
	    c1 = c2;
	    c2 = _t;
	  }

	  if (sheet === "") {
	    deps.push([r1, c1, r2, c2, ""]);
	    return "this.r(".concat(r1, ",").concat(c1, ",").concat(r2, ",").concat(c2, ")");
	  } else {
	    deps.push([r1, c1, r2, c2, sheet]);
	    return "this.rs(\"".concat(sheet, "\",").concat(r1, ",").concat(c1, ",").concat(r2, ",").concat(c2, ")");
	  }
	}

	function split(formula, crosssheet) {
	  var lines = [];
	  var index = 0;
	  var quotes = false,
	      ph = false;

	  for (var i = formula[i] === "=" ? 1 : 0; i < formula.length; i++) {
	    var key = formula[i];

	    if (key == "\"") {
	      quotes = !quotes;
	    } else if (!quotes) {
	      if (key == "{" && formula[i + 1] == "{") {
	        ph = true;
	      } else if (key == "}" && formula[i + 1] == "}") {
	        ph = false;
	      } else if (!ph) {
	        if (key === "'" || isChar(key)) {
	          var _getWord = getWord(formula, i, ""),
	              _getWord2 = _slicedToArray(_getWord, 4),
	              word = _getWord2[0],
	              end = _getWord2[1],
	              sheet = _getWord2[3];

	          var next = end - 1;
	          var value = void 0;

	          if (!sheet || !crosssheet && sheet) {
	            if (sheet) i += sheet.length + 1;

	            if (formula[next + 1] !== "(" && isPosition(word)) {
	              value = crosssheet ? word : position(word);
	              pushLine(lines, formula, i, index, value);
	              index = next + 1;
	            }
	          } else {
	            if (crosssheet) {
	              value = [sheet, word];
	              pushLine(lines, formula, i, index, value);
	              index = next + 1;
	            }

	            if (formula[next + 1] === ":") {
	              //for multi-sheet reference, ignore second parameter of range
	              var _getWord3 = getWord(formula, next + 2, ""),
	                  _getWord4 = _slicedToArray(_getWord3, 2),
	                  _end = _getWord4[1];

	              next = _end - 1;
	            }
	          }

	          i = next;
	        }
	      }
	    }
	  }

	  if (index != formula.length) lines.push(formula.substr(index));
	  return lines;
	}

	function pushLine(lines, formula, i, index, value) {
	  if (i !== 0) lines.push(formula.substr(index, i - index));
	  lines.push(value);
	}

	function parse(formula, view) {
	  var passive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	  var code = "return ";
	  var deps = [];
	  var quotes = false;
	  var pair = "",
	      pairsheet = "";
	  if (formula[0] !== "=") return false;

	  for (var i = 1; i < formula.length; i++) {
	    var key = formula[i];
	    if (key == "\"") quotes = !quotes;else if (key == "{" && formula[i + 1] == "{") {
	      var _getWord5 = getWord(formula, i + 2),
	          _getWord6 = _slicedToArray(_getWord5, 2),
	          word = _getWord6[0],
	          end = _getWord6[1];

	      i = end + 1;
	      code += templateCode(word);
	      continue;
	    } else if (!quotes && (key === "'" || isChar(key))) {
	      var _getWord7 = getWord(formula, i, passive),
	          _getWord8 = _slicedToArray(_getWord7, 4),
	          rawword = _getWord8[0],
	          _end2 = _getWord8[1],
	          start = _getWord8[2],
	          sheet = _getWord8[3]; //lower case formulas, fix them


	      var _word = rawword.toUpperCase();

	      i = _end2 - 1;

	      if (formula[i + 1] === "(") {
	        code += methodCode(_word);
	      } else if (isPosition(_word)) {
	        if (formula[i + 1] === ":") {
	          pair = _word;
	          pairsheet = sheet;
	          i++;
	        } else {
	          if (pair !== "") {
	            code += rangeCode(deps, pair, _word, pairsheet);
	            pair = "";
	          } else code += operandCode(deps, _word, sheet);
	        }
	      } else {
	        var range = namedRangeCode(deps, view, _word, sheet); //we have some error word in a formula
	        //break from loop to skip formula updating

	        if (range == "") continue;
	        code += range;
	      } //operator, or range, or parameter


	      if (_word !== rawword) {
	        formula = formula.substr(0, start) + _word + formula.substr(_end2);
	      }

	      continue;
	    }

	    if (!quotes) {
	      //special handling for & operator, string concat
	      if (key === "&" && formula[i + 1] !== "&") code += "+"; //convert <> to !=
	      else if (key === "<" && formula[i + 1] === ">") {
	          code += "!=";
	          i++; //convert = to ==
	        } else if (key === "=" && formula[i - 1] !== "<" && formula[i - 1] !== ">") code += "==";else code += key;
	    } else code += key;
	  }

	  return {
	    code: code + ";",
	    triggers: deps,
	    text: formula
	  };
	}

	var actives = {};
	var passives = {};
	function _parse$1(value, core, passive) {
	  var struct = parse(value, core, passive);
	  var cache = passive ? passives : actives;
	  struct.handler = cache[value] = cache[value] || _build_function(struct.code);
	  return struct;
	}
	function clearMathCache() {
	  actives = {};
	  passives = {};
	}

	function error_function() {
	  return webix.i18n.spreadsheet.table["math-error"];
	}

	function _build_function(value) {
	  try {
	    return new Function(value);
	  } catch (e) {
	    return error_function;
	  }
	}

	function updateMath(formula, action, area) {
	  var stack = split(formula);
	  var max = stack.length;
	  var start = area ? area.start : null;
	  var end = area ? area.end : null;

	  for (var i = 1; i < max; i += 2) {
	    var _stack$i = _slicedToArray(stack[i], 3),
	        row = _stack$i[0],
	        column = _stack$i[1],
	        flags = _stack$i[2];

	    var isRowFix = flags & 1;
	    var isColumnFix = flags & 2; // for cut operations we need to check whether referenced values are inside cut block. if so - update them.

	    if (action.id === "move" && (!action.cut || row >= start.row && row <= end.row && column >= start.column && column <= end.column)) {
	      column += isColumnFix ? 0 : action.column;
	      row += isRowFix ? 0 : action.row;
	    } else if (action.id === "row" && action.start <= row) {
	      row += isRowFix ? 0 : action.count;
	    } else if (action.id === "column" && action.start <= column) {
	      column += isColumnFix ? 0 : action.count;
	    }

	    if (!column || !row) stack[i] = 0;else stack[i] = (isColumnFix ? "$" : "") + encode[column] + (isRowFix ? "$" : "") + row;
	  }

	  return stack.join("");
	}
	function updateSheetNames(formula, oldName, newName, extra) {
	  var stack = split(formula, true);

	  for (var i = 0; i < stack.length; i++) {
	    if (webix.isArray(stack[i])) {
	      var thisSheet = stack[i][0] === oldName;
	      if (!extra.multiSheet && thisSheet) extra.multiSheet = true;
	      var sheet = thisSheet ? newName : stack[i][0];
	      stack[i] = "'" + sheet + "'!" + stack[i][1];
	    }
	  }

	  return stack.join("");
	}

	function init$7(view, core, helpers) {
	  view.attachEvent("onBeforeSheetShow", function () {
	    delete view._mathSheetCache[getActive(view)];
	  });
	  view.attachEvent("onSheetRename", function (name, newName) {
	    view._sheets.forEach(function (sheet) {
	      var extra = {
	        multiSheet: false
	      };
	      var edit$$1 = ["data", "editors", "conditions", "ranges"];
	      edit$$1.forEach(function (param) {
	        if (sheet.content[param]) sheet.content[param].forEach(function (value) {
	          switch (param) {
	            case "data":
	              if (value[2][0] === "=") value[2] = updateSheetNames(value[2], name, newName, extra);
	              break;

	            case "editors":
	              value[2].options = updateSheetNames(value[2].options, name, newName, extra);
	              break;

	            case "conditions":
	              if (value[3][0] === "=") value[3] = updateSheetNames(value[3], name, newName, extra);
	              break;

	            case "ranges":
	              value[1] = updateSheetNames(value[1], name, newName, extra);
	              break;
	          }
	        });
	      });

	      if (extra.multiSheet === true) {
	        delete view._mathSheetCache[sheet.name];
	        getAccessor(view, sheet.name);
	        clearMathCache();
	      }
	    });

	    delete view._mathSheetCache[name];
	  });
	  view.attachEvent("onSheetRemove", function (name) {
	    delete view._mathSheetCache[name];
	  });
	  view._mathSheetCache = {};
	  view._mathSheetCore = core;
	  view._mathSheetHelpers = helpers;
	}
	function getAccessor(view, name) {
	  //actuve sheet accessor
	  if (!name) return SheetAccessor(activeAccessor(view)); //passive sheet accessor

	  if (!view._mathSheetCache[name]) {
	    var temp = view._mathSheetCache[name] = name === getActive(view) ? SheetAccessor(activeAccessor(view)) : SheetAccessor(passiveAccessor(view, name));
	    temp.init();
	  }

	  return view._mathSheetCache[name];
	}

	function SheetAccessor(helpers) {
	  return {
	    init: function () {
	      helpers.init();
	    },
	    getRangeCode: function (name) {
	      return helpers.getRangeCode(name);
	    },
	    getValue: function (r, c) {
	      var val = helpers.getCell(r, c);
	      var test = val * 1;
	      if (!isNaN(test)) return test;
	      return val ? val : "";
	    },
	    getRangeValue: function (name) {
	      var code = this.getRangeCode(name) || name;
	      if (code.indexOf(":") == -1) return [];
	      var pos = range(code);
	      return this.getRange.apply(this, pos);
	    },
	    getRange: function (r1, c1, r2, c2) {
	      var set = helpers.getRange(r1, c1, r2, c2);

	      for (var i = set.length - 1; i >= 0; i--) {
	        var val = set[i];
	        var test = val !== "" ? val * 1 : "";
	        set[i] = isNaN(test) ? val ? val : "" : test;
	      }

	      return set;
	    }
	  };
	}

	function activeAccessor(view) {
	  return {
	    init: function () {},
	    getRangeCode: function (name) {
	      return view.ranges.getCode(name);
	    },
	    getRow: function (r) {
	      return view.getRow(r);
	    },
	    getCell: function (r, c) {
	      return view.getRow(r)[c];
	    },
	    getRange: function (r1, c1, r2, c2) {
	      var set = [];

	      for (var i = r1; i <= r2; i++) {
	        var item = view.getRow(i);

	        for (var j = c1; j <= c2; j++) {
	          set.push(item[j]);
	        }
	      }

	      return set;
	    }
	  };
	}

	function passiveAccessor(view, name) {
	  var page = getSheet(view, name).content;
	  var table = [];
	  var formulas = [];
	  var ranges = [];
	  return {
	    init: function () {
	      if (page.ranges) {
	        for (var i = 0; i < page.ranges.length; i++) {
	          var line = page.ranges[i];
	          ranges[line[0]] = line[1];
	        }
	      }

	      if (page.data) {
	        for (var _i = 0; _i < page.data.length; _i++) {
	          //expand data structure
	          var _page$data$_i = _slicedToArray(page.data[_i], 3),
	              row = _page$data$_i[0],
	              column = _page$data$_i[1],
	              value = _page$data$_i[2];

	          if (!table[row]) table[row] = [];
	          table[row][column] = value;

	          if (value[0] === "=") {
	            //for math cells, store the code
	            var math = view._mathSheetHelpers.parse(value, view._mathSheetCore, name);

	            table[row][column] = math.handler; //store list of cross-sheet formulas

	            for (var j = 0; j < math.triggers.length; j++) {
	              if (math.triggers[j][5]) {
	                formulas.push(page.data[_i]);
	                break;
	              }
	            }
	          }
	        }
	      }
	    },
	    getRangeCode: function (name) {
	      return ranges[name];
	    },
	    getRow: function (i) {
	      return table[i] || [];
	    },
	    getCell: function (i, j) {
	      var value = this.getRow(i)[j];
	      if (typeof value === "function") return view._mathSheetHelpers.execute(value, view._mathSheetCore);
	      return value;
	    },
	    getRange: function (r1, c1, r2, c2) {
	      var set = [];

	      for (var i = r1; i <= r2; i++) {
	        for (var j = c1; j <= c2; j++) {
	          set.push(this.getCell(i, j));
	        }
	      }

	      return set;
	    }
	  };
	}

	function nullFilter() {
	  var locale = webix.i18n.spreadsheet.labels;
	  return "<span class='webix_ssheet_empty'>" + locale["dropdown-empty"] + "</span>";
	}
	function rangeValue(view, text, extra) {
	  var vals;

	  if (typeof text == "string") {
	    var pos = range(text, view);
	    var page = getAccessor(view, pos[4]);
	    vals = page.getRange.apply(page, pos);
	  } else {
	    vals = webix.copy(text);
	  }

	  if (extra) {
	    if (extra.unique) {
	      var t = {};

	      for (var i = vals.length - 1; i >= 0; i--) {
	        if (t[vals[i]]) vals.splice(i, 1);else t[vals[i]] = true;
	      }
	    }

	    if (extra.order) vals.sort();
	    var empty = vals.indexOf("");

	    if (empty > -1) {
	      vals.splice(empty, 1);
	      if (extra.filter) vals.unshift(nullFilter());
	    }

	    if (extra.empty) vals.unshift({
	      id: "$empty",
	      $empty: true,
	      value: ""
	    });
	  }

	  return vals;
	}
	var Ranges =
	/*#__PURE__*/
	function () {
	  function Ranges(view) {
	    _classCallCheck(this, Ranges);

	    this._master = view;
	    this._ranges = {};
	  }

	  _createClass(Ranges, [{
	    key: "clear",
	    value: function clear() {
	      this._ranges = {};
	    }
	  }, {
	    key: "add",
	    value: function add(name, text) {
	      var needUpdate = !!this._ranges[name];

	      this._master.callEvent("onAfterRangeSet", [name, text]);

	      this._ranges[name] = text;
	      if (needUpdate) this._master.callEvent("onMathRefresh", []);
	    }
	  }, {
	    key: "getCode",
	    value: function getCode(name, sheet) {
	      if (sheet) return getAccessor(this._master, sheet).getRangeCode(name);
	      return this._ranges[name];
	    }
	  }, {
	    key: "remove",
	    value: function remove(name) {
	      delete this._ranges[name];
	    }
	  }, {
	    key: "getRanges",
	    value: function getRanges() {
	      var data = [];

	      for (var name in this._ranges) {
	        data.push({
	          name: name,
	          range: this._ranges[name]
	        });
	      }

	      return data;
	    }
	  }, {
	    key: "parse",
	    value: function parse(data) {
	      if (!data) return;
	      var i = data.length;

	      while (i--) {
	        var c = data[i];
	        this._ranges[c[0]] = c[1];
	      }
	    }
	  }, {
	    key: "serialize",
	    value: function serialize() {
	      var name,
	          data = [];

	      for (name in this._ranges) {
	        data.push([name, this._ranges[name]]);
	      }

	      return data;
	    }
	  }]);

	  return Ranges;
	}();

	var action$1 = "add-sparkline";
	var types = [{
	  id: "line",
	  value: "Line"
	}, {
	  id: "spline",
	  value: "Spline"
	}, {
	  id: "splineArea",
	  value: "Spline Area"
	}, {
	  id: "area",
	  value: "Area"
	}, {
	  id: "bar",
	  value: "Bar"
	}, {
	  id: "pie",
	  value: "Pie"
	}];
	var DialogBox$1 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box, form) {
	      this.cell = this.view.getSelectedId();
	      if (!this.cell) return false;
	      var els = form.elements;

	      this.view.$handleSelection = function (st, end, a, b) {
	        els.range.setValue(a + ":" + b);
	        return false;
	      };

	      els.range.setValue(""); //sync state of dialog to data with  the selected cell

	      var value = this.view.getCellValue(this.cell.row, this.cell.column);
	      var data = parseChart(value);

	      if (data) {
	        form.blockEvent();
	        els.type.setValue(data.type);
	        els.range.setValue(data.range);

	        if (data.color) {
	          els.color_def.setValue(data.color);
	          els.color_pos.setValue(data.color);
	        }

	        if (data.negativeColor) els.color_neg.setValue(data.negativeColor);
	        form.unblockEvent();
	        renderPreview(this);
	      }

	      els.range.focus();
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["sparkline-title"],
	        move: true,
	        position: "center",
	        body: {
	          view: "form",
	          id: "form",
	          visibleBatch: 1,
	          on: {
	            onChange: function () {
	              return renderPreview(_this);
	            }
	          },
	          elements: [{
	            view: "richselect",
	            name: "type",
	            label: webix.i18n.spreadsheet.labels["sparkline-type"],
	            value: "line",
	            labelPosition: "left",
	            suggest: {
	              view: "ssheet-form-suggest",
	              data: types
	            },
	            on: {
	              "onChange": typesChangeHandler
	            }
	          }, {
	            view: "text",
	            label: webix.i18n.spreadsheet.labels["sparkline-range"],
	            name: "range"
	          }, {
	            view: "ssheet-colorpicker",
	            label: webix.i18n.spreadsheet.labels["sparkline-color"],
	            name: "color_def",
	            id: "add_sparkline_color",
	            value: "#6666FF",
	            batch: "1"
	          }, {
	            view: "ssheet-colorpicker",
	            label: webix.i18n.spreadsheet.labels["sparkline-positive"],
	            name: "color_pos",
	            value: "#6666FF",
	            batch: "2"
	          }, {
	            view: "ssheet-colorpicker",
	            label: webix.i18n.spreadsheet.labels["sparkline-negative"],
	            name: "color_neg",
	            value: "#FF6666",
	            batch: "2"
	          }, {
	            view: "formlate",
	            name: "preview",
	            borderless: true,
	            css: "webix_ssheet_preview",
	            height: 50
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return okClick$1(_this);
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }, {
	    key: "checkRange",
	    value: function checkRange(text) {
	      if (text && range(text, this.view)) return true;
	      this.view.alert({
	        text: webix.i18n.spreadsheet.labels["error-range"]
	      });
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	function renderPreview(dialog) {
	  var form = dialog.$dialog.getBody();
	  var data = form.getValues();

	  if (data.range && dialog.checkRange(data.range)) {
	    var i,
	        values = rangeValue(dialog.view, data.range),
	        config = sparkConfig(form);

	    for (i = 0; i < values.length; i++) {
	      values[i] = values[i] || 0;
	    }

	    form.elements.preview.setValue(webix.Sparklines.getTemplate(config)(values, {
	      width: 200,
	      height: 40
	    }));
	  }
	}

	function sparkConfig(form, config) {
	  var data = form.getValues();
	  config = config || {
	    type: data.type
	  };

	  if (data.type === "bar") {
	    config.color = data.color_pos;
	    config.negativeColor = data.color_neg;
	  } else if (form.elements.color_def.isVisible()) config.color = data.color_def;

	  return config;
	}

	function okClick$1(dialog) {
	  var form = dialog.$dialog.getBody();
	  var config = sparkConfig(form, form.getValues());

	  if (dialog.checkRange(config.range)) {
	    dialog.view.addSparkline(dialog.cell.row, dialog.cell.column, config);
	    dialog.close();
	  }
	}

	function typesChangeHandler(type) {
	  var form = this.getFormView();

	  switch (type) {
	    case "pie":
	      form.showBatch(3);
	      break;

	    case "bar":
	      form.showBatch(2);
	      break;

	    default:
	      form.showBatch(1);
	  }
	}

	var asw = /*#__PURE__*/Object.freeze({
		action: action$1,
		DialogBox: DialogBox$1
	});

	var action$2 = "add-range";
	var DialogBox$2 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box) {
	      var table = box.$$("table");
	      var form = box.$$("form");
	      var sheet = ""; // this.view.getActiveSheet(); ranges are per-sheet by default

	      form.clear();
	      form.elements.name.focus();
	      form.elements.range.setValue(this.view.getSelectedRange());
	      table.clearAll();
	      table.parse(this.view.ranges.getRanges());

	      this.view.$handleSelection = function (st, end, a, b) {
	        form.elements.range.setValue(toSheetRange(a, b, sheet));
	        return false;
	      };
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "saveClick",
	    value: function saveClick() {
	      var form = this.$dialog.$$("form");
	      var data = form.getValues();
	      var sheets = data.range.indexOf("!");
	      data.range = data.range.substr(0, sheets + 1) + data.range.substr(sheets + 1).toUpperCase();
	      data.name = data.name.toUpperCase();
	      form.setValues(data);

	      if (form.validate()) {
	        var table = this.$dialog.$$("table");

	        if (data.id && table.exists(data.id)) {
	          this.view.ranges.remove(table.getItem(data.id).name);
	          table.updateItem(data.id, data);
	        } else this.$dialog.$$("table").add(data);

	        this.view.ranges.add(data.name, data.range);
	        form.clear();
	      }
	    }
	  }, {
	    key: "removeRange",
	    value: function removeRange(id) {
	      var _this = this;

	      this.view.confirm({
	        text: webix.i18n.spreadsheet.labels["range-remove-confirm"],
	        callback: function (res) {
	          if (res) {
	            var table = _this.$dialog.$$("table");

	            _this.view.ranges.remove(table.getItem(id).name);

	            table.remove(id);
	          }
	        }
	      });
	    }
	  }, {
	    key: "editRange",
	    value: function editRange(id) {
	      var form = this.$dialog.$$("form");
	      form.setValues(this.$dialog.$$("table").getItem(id));
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this2 = this;

	      var theform = {
	        type: "clean",
	        cols: [{
	          view: "ssheet-dialog-table",
	          id: "table",
	          borderless: true,
	          columns: [{
	            id: "name",
	            header: webix.i18n.spreadsheet.labels["range-name"],
	            width: 120
	          }, {
	            id: "range",
	            header: webix.i18n.spreadsheet.labels["range-cells"],
	            width: 120
	          }, {
	            template: "<div class='webix_icon wxi-pencil'></div>",
	            width: 40
	          }, {
	            template: "<div class='webix_icon wxi-trash'></div>",
	            width: 40
	          }],
	          autowidth: true,
	          height: 150,
	          onClick: {
	            "wxi-trash": function (ev, id) {
	              return _this2.removeRange(id);
	            },
	            "wxi-pencil": function (ev, id) {
	              return _this2.editRange(id);
	            }
	          }
	        }, {
	          width: 250,
	          view: "form",
	          id: "form",
	          rules: {
	            name: function (value) {
	              var correct = /^[A-Za-z]+$/.test(value);

	              var table = _this2.$dialog.$$("table");

	              var data = _this2.$dialog.$$("form").getValues();

	              var unique = true;
	              table.eachRow(function (id) {
	                var obj = this.getItem(id);
	                if (obj.name == value && obj.id != data.id) unique = false;
	              });
	              return correct && unique;
	            },
	            range: isRange
	          },
	          elementsConfig: {
	            labelWidth: 70
	          },
	          elements: [{
	            view: "text",
	            name: "name",
	            gravity: 1,
	            label: webix.i18n.spreadsheet.labels["range-name"]
	          }, {
	            view: "text",
	            name: "range",
	            gravity: 1,
	            label: webix.i18n.spreadsheet.labels["range-cells"]
	          }, {
	            cols: [{}, {
	              view: "button",
	              value: "Save",
	              click: function () {
	                return _this2.saveClick();
	              }
	            }]
	          }]
	        }]
	      };
	      return {
	        view: "ssheet-dialog",
	        move: true,
	        head: webix.i18n.spreadsheet.labels["range-title"],
	        buttons: false,
	        autoheight: true,
	        width: 610,
	        position: "center",
	        body: theform,
	        on: {
	          onSaveClick: function () {
	            return _this2.close();
	          },
	          onHideClick: function () {
	            return _this2.close();
	          },
	          onCancelClick: function () {
	            return _this2.close();
	          }
	        }
	      };
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var rgs = /*#__PURE__*/Object.freeze({
		action: action$2,
		DialogBox: DialogBox$2
	});

	var action$3 = "add-dropdown";
	var DialogBox$3 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show() {
	      var form = this.$dialog.$$("form");
	      this.cell = this.view.getSelectedId(true);
	      if (!this.cell.length) return false;
	      form.clear(); //restore previosly selected range

	      var value = this.view.getCellEditor(this.cell[0].row, this.cell[0].column);
	      if (value && value.options) form.elements.range.setValue(value.options);

	      this.view.$handleSelection = function (st, end, a, b) {
	        form.elements.range.setValue(a + ":" + b);
	        return false;
	      };

	      form.elements.range.focus();
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        position: "center",
	        head: webix.i18n.spreadsheet.labels["dropdown-title"],
	        move: true,
	        body: {
	          view: "form",
	          id: "form",
	          rows: [{
	            view: "text",
	            label: webix.i18n.spreadsheet.labels["dropdown-range"],
	            name: "range"
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return _this.okClick();
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }, {
	    key: "okClick",
	    value: function okClick() {
	      var values = this.$dialog.$$("form").elements.range.getValue();

	      if (values) {
	        if (!range(values, this.view)) this.view.alert({
	          text: webix.i18n.spreadsheet.labels["error-range"]
	        });else {
	          group.set(function () {
	            for (var i = 0; i < this.cell.length; i++) {
	              this.view.setCellEditor(this.cell[i].row, this.cell[i].column, {
	                editor: "richselect",
	                options: values
	              });
	            }
	          }, this);
	          this.close();
	        }
	      } else this.close();
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var dpd = /*#__PURE__*/Object.freeze({
		action: action$3,
		DialogBox: DialogBox$3
	});

	var action$4 = "custom";
	var DialogBox$4 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show() {
	      this.form = this.$dialog.$$("form");
	      this.list = this.$dialog.$$("list");
	      this.preview = this.$dialog.$$("preview");
	      this.cell = this.view.getSelectedId(true);
	      if (!this.cell.length) return false;
	      this.fillForm(this.view);

	      this.view.$handleSelection = function () {
	        return false;
	      };
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      var locale = webix.i18n.spreadsheet.labels;
	      var docsLink = "https://webix-guides.gitbook.io/spreadsheet-user-guide/formatting_numbers#custom-number-format";
	      var delimiters = getDelimiters("int");
	      return {
	        view: "ssheet-dialog",
	        position: "center",
	        width: 460,
	        head: locale["format-title"],
	        move: true,
	        body: {
	          cols: [{
	            view: "list",
	            id: "list",
	            css: "webix_ssheet_format_type",
	            width: 120,
	            scroll: false,
	            data: this.getFormats(),
	            select: true,
	            on: {
	              onSelectChange: function (id) {
	                _this.updateForm();

	                if (id[0] === "custom") _this.form.showBatch("custom");else {
	                  _this.form.showBatch("common");

	                  _this.form.elements.separator.show();

	                  if (id[0] === "percent") _this.form.elements.separator.hide();
	                }
	              }
	            }
	          }, {
	            view: "form",
	            id: "form",
	            margin: 15,
	            height: 270,
	            paddingY: 0,
	            paddingX: 20,
	            elements: [{
	              template: function (obj) {
	                return "<span class ='" + obj.css + "'>" + obj.value + "</span>";
	              },
	              css: "webix_ssheet_format_preview",
	              autoheight: true,
	              id: "preview",
	              borderless: true
	            }, {
	              view: "counter",
	              css: "webix_ssheet_counter",
	              label: locale["decimal-places"],
	              name: "zeros",
	              value: 0,
	              batch: "common"
	            }, {
	              view: "checkbox",
	              label: locale["separator"],
	              name: "separator",
	              batch: "common"
	            }, {
	              view: "formlist",
	              label: locale["negative"],
	              name: "negative",
	              batch: "common",
	              css: "webix_ssheet_format_negative",
	              template: function (obj) {
	                if (_this.list) {
	                  var format = _this.getFormat(obj.id);

	                  format = format2code(format.fmt, format.delimiters);
	                  var style = {
	                    css: ""
	                  };
	                  var value = format(-1234.56789, style);
	                  return "<span class='" + style.css + "'>" + value + "</span>";
	                }
	              },
	              data: [{
	                id: 1
	              }, {
	                id: 2
	              }, {
	                id: 3
	              }]
	            }, {
	              view: "text",
	              label: locale["format-pattern"],
	              name: "format",
	              labelPosition: "top",
	              batch: "custom",
	              placeholder: "[>100]0" + delimiters.groupSign + "000" + delimiters.decimalSign + "00;[>0]None"
	            }, {
	              template: "<a href='" + docsLink + "' target='_blank' class = 'docs'>" + locale["format-docs"] + "</a>",
	              borderless: true,
	              batch: "custom",
	              id: "docs"
	            }],
	            elementsConfig: {
	              labelWidth: 155
	            },
	            on: {
	              onChange: function () {
	                return _this.updateForm();
	              }
	            }
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return _this.okClick();
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.closeWin();
	          }
	        }
	      };
	    }
	  }, {
	    key: "okClick",
	    value: function okClick() {
	      var _this2 = this;

	      var type = this.list.getSelectedId();
	      var values = type == "custom" ? {
	        format: this.form.getValues().format
	      } : this.form.getValues();
	      values.type = type;
	      group.set(function () {
	        for (var i = 0; i < _this2.cell.length; i++) {
	          addFormat(_this2.view, _this2.cell[i].row, _this2.cell[i].column, values.format, values);
	        }
	      });
	      this.view.$$("cells").refresh();
	      this.closeWin();
	    }
	  }, {
	    key: "closeWin",
	    value: function closeWin() {
	      var style = this.view.getStyle(this.cell[0].row, this.cell[0].column);
	      var name = style && style.props.format ? style.props.format : "common"; //default format

	      if (!isCustom(name)) this.view.$$("bar").setValues({
	        format: name
	      }, true);
	      this.close();
	    }
	  }, {
	    key: "getFormat",
	    value: function getFormat$$1(negative) {
	      var type = this.list.getSelectedId();
	      var values = this.form.getValues();
	      values.negative = negative || values.negative;

	      if (type !== "custom") {
	        values = formToValues(type, values);
	        return {
	          fmt: serializeFormat(values),
	          delimiters: getDelimiters(type)
	        };
	      } else return {
	        fmt: values.format,
	        delimiters: getDelimiters(type)
	      };
	    }
	  }, {
	    key: "fillForm",
	    value: function fillForm(view) {
	      var style = view.getStyle(this.cell[0].row, this.cell[0].column);
	      var values = {
	        zeros: 0,
	        separator: 0,
	        negative: 1,
	        format: ""
	      };
	      var type;
	      var name = style && style.props.format ? style.props.format : "";
	      if (!name || name == -1) type = name = "price";else type = formatHelpers[name].values.type;
	      values.format = getFormatSource(name);
	      if (type !== "custom") webix.extend(values, formatHelpers[name].values, true);
	      var value = this.view.$$("cells").getItem(this.cell[0].row)[this.cell[0].column];
	      if (value === "" || isNaN(value)) value = 1234.56789;
	      this.value = value;
	      this.form.setValues(values);
	      this.list.select(type);
	      this.updateForm();
	    }
	  }, {
	    key: "updateForm",
	    value: function updateForm() {
	      var form = this.form.elements;
	      var format = this.getFormat();
	      var style = {
	        css: ""
	      };
	      var value = format2code(format.fmt, format.delimiters)(this.value * 1, style); //preview values

	      this.preview.parse({
	        value: value,
	        css: style.css
	      });
	      form.negative.refresh(); //set new format string

	      form.format.setValue(format.fmt);
	    }
	  }, {
	    key: "getFormats",
	    value: function getFormats() {
	      var locale = webix.i18n.spreadsheet.labels;
	      return [{
	        id: "price",
	        value: locale.currency
	      }, {
	        id: "int",
	        value: locale.number
	      }, {
	        id: "percent",
	        value: locale.percent
	      }, {
	        id: "custom",
	        value: locale["custom-format"]
	      }];
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var fmt = /*#__PURE__*/Object.freeze({
		action: action$4,
		DialogBox: DialogBox$4
	});

	var action$5 = "conditional-format";
	var condition = [{
	  id: ">",
	  value: ">"
	}, {
	  id: "<",
	  value: "<"
	}, {
	  id: "=",
	  value: "="
	}, {
	  id: "!=",
	  value: webix.i18n.spreadsheet.labels["conditional-not-equal"]
	}, {
	  id: "<>",
	  value: webix.i18n.spreadsheet.labels["conditional-between"]
	}];

	function getConditionStyle(data) {
	  return data.map(function (item) {
	    item.id = item.css;
	    return item;
	  });
	}

	var DialogBox$5 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "_getCondition",
	    value: function _getCondition() {
	      var _this = this;

	      var view = this.view;
	      var forms = this.$dialog.getBody().getChildViews()[0].getChildViews()[0].getChildViews();
	      var data = [];
	      forms.forEach(function (form) {
	        if (!form.getValues) return;
	        var values = form.getValues();
	        var item = [];
	        item.push(values.condition);

	        if (values.condition !== "<>") {
	          item.push(_this._safeInt(values.value, 10));
	        } else {
	          item.push([_this._safeInt(values.value, 10), _this._safeInt(values.value2, 10)]);
	        }

	        item.push(values.style);

	        for (var i = 0; i < item.length; i++) {
	          if (item[i] === "") return false;
	        }

	        data.push(item);
	      });
	      view.callEvent("onConditionSet", [data]);
	    }
	  }, {
	    key: "_safeInt",
	    value: function _safeInt(a) {
	      var num = parseFloat(a);
	      if (num == a) return num;
	      return a;
	    }
	  }, {
	    key: "_setCondition",
	    value: function _setCondition() {
	      var view = this.view,
	          select = view.getSelectedId(true),
	          cell = select[0];
	      if (!select.length) return false;
	      var collection = view.conditions.get(cell.row, cell.column);

	      if (collection) {
	        var forms = this.$dialog.getBody().getChildViews()[0].getChildViews()[0].getChildViews();
	        collection.forEach(function (item, i) {
	          var values = {};
	          values.condition = item[0];

	          if (webix.isArray(item[1])) {
	            values.value = item[1][0].toString();
	            values.value2 = item[1][1].toString();
	          } else values.value = item[1].toString();

	          values.style = item[2];
	          forms[i + 1].setValues(values);
	        });
	      }
	    }
	  }, {
	    key: "apply",
	    value: function apply() {
	      this._getCondition();

	      this.close();
	    }
	  }, {
	    key: "_clean",
	    value: function _clean() {
	      var forms = this.$dialog.getBody().getChildViews()[0].getChildViews()[0].getChildViews();
	      forms.forEach(function (form) {
	        if (form.setValues) form.setValues({
	          condition: "",
	          value: "",
	          value2: "",
	          style: ""
	        });
	      });
	    }
	  }, {
	    key: "$show",
	    value: function $show() {
	      var _this2 = this;

	      if (!this.view.getSelectedId()) return false;

	      this.view.$handleSelection = function (st, end, a, b) {
	        if (_this2.activeValue && a == b) {
	          _this2.activeValue.setValue("=" + a);
	        }

	        return false;
	      };

	      this._setCondition();
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;

	      this._clean();
	    }
	  }, {
	    key: "getRows",
	    value: function getRows(data, count) {
	      var _this3 = this;

	      var headers = {
	        height: 36,
	        cols: [{
	          view: "label",
	          label: webix.i18n.spreadsheet.labels.display
	        }, {
	          view: "label",
	          label: webix.i18n.spreadsheet.labels.condition
	        }, {
	          view: "label",
	          label: webix.i18n.spreadsheet.labels.value
	        }, {
	          width: 25
	        }]
	      };
	      var arr = [headers];
	      var item = {
	        view: "form",
	        padding: 0,
	        borderless: true,
	        elements: [{
	          margin: 10,
	          cols: [{
	            view: "richselect",
	            name: "style",
	            width: 120,
	            placeholder: webix.i18n.spreadsheet.labels["conditional-style"],
	            css: "webix_ssheet_cformat_select",
	            suggest: {
	              padding: 0,
	              borderless: true,
	              css: "webix_ssheet_cformat_list",
	              body: {
	                template: function (obj) {
	                  var css = "webix_ssheet_cformat " + obj.css;
	                  return "<div class=\"".concat(css, "\">").concat(obj.name, "</div>");
	                },
	                data: data
	              }
	            }
	          }, {
	            view: "richselect",
	            width: 105,
	            name: "condition",
	            placeholder: webix.i18n.spreadsheet.labels["conditional-operator"],
	            on: {
	              onChange: function (newv) {
	                if (newv === "<>") {
	                  this.getFormView().elements.value2.show();
	                } else {
	                  this.getFormView().elements.value2.hide();
	                }
	              }
	            },
	            suggest: {
	              view: "ssheet-form-suggest",
	              body: {
	                data: condition
	              }
	            }
	          }, {
	            cols: [{
	              view: "text",
	              placeholder: webix.i18n.spreadsheet.labels["conditional-number"],
	              on: {
	                onFocus: function (current_view) {
	                  _this3.activeValue = current_view;
	                }
	              },
	              name: "value"
	            }, {
	              view: "text",
	              name: "value2",
	              on: {
	                onFocus: function (current_view) {
	                  _this3.activeValue = current_view;
	                }
	              },
	              hidden: true
	            }]
	          }, {
	            view: "icon",
	            css: "webix_ssheet_cformat_clear",
	            icon: "wxi-trash",
	            click: clearRow
	          }]
	        }]
	      };

	      while (count--) {
	        arr.push(item);
	      }

	      return arr;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this4 = this;

	      //[IMPROVE] can be optimized by using datalayout instead of nested forms
	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["conditional-format"],
	        position: "center",
	        width: 500,
	        move: true,
	        buttons: false,
	        body: {
	          view: "form",
	          borderless: true,
	          rows: [{
	            rows: this.getRows(getConditionStyle(this.view.config.conditionStyle), 3)
	          }, {
	            cols: [{
	              gravity: 2
	            }, {
	              view: "button",
	              value: webix.i18n.spreadsheet.labels.apply,
	              click: function () {
	                return _this4.apply();
	              }
	            }]
	          }]
	        },
	        on: {
	          onHideClick: function () {
	            return _this4.close();
	          }
	        }
	      };
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	function clearRow() {
	  //this - clear icon
	  var form = this.getFormView();
	  form.clear();
	}

	var cnd = /*#__PURE__*/Object.freeze({
		action: action$5,
		DialogBox: DialogBox$5
	});

	var action$6 = "excel-export";
	var DialogBox$6 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box, form) {
	      this.view.$handleSelection = function () {
	        return false;
	      };

	      form.elements.sheets.setValue(this.getSheets());
	      form.elements.filename.setValue("Data");
	      form.elements.filename.getInputNode().select();
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["export-title"],
	        move: true,
	        position: "center",
	        body: {
	          view: "form",
	          elements: [{
	            view: "text",
	            name: "filename",
	            placeholder: webix.i18n.spreadsheet.labels["export-name"]
	          }, {
	            view: "multicheckbox",
	            name: "sheets"
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return okClick$2(_this);
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }, {
	    key: "getSheets",
	    value: function getSheets() {
	      var view = this.view;
	      var sheets = view._sheets;
	      var value = {};

	      if (sheets && sheets.length > 1) {
	        for (var i = 0; i < sheets.length; i++) {
	          value[sheets[i].name] = view._activeSheet === sheets[i].name ? 1 : 0;
	        }
	      }

	      return value;
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	function okClick$2(dialog) {
	  var values = dialog.$dialog.getBody().getValues();
	  webix.toExcel(dialog.view, values);
	  dialog.close();
	}

	var exp = /*#__PURE__*/Object.freeze({
		action: action$6,
		DialogBox: DialogBox$6
	});

	var action$7 = "add-link";
	var DialogBox$7 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box, form) {
	      var cell = this.view.getSelectedId();
	      if (!cell) return false;
	      if (!this.restoreValue(form)) form.clear();
	      form.elements.name.focus();
	    }
	  }, {
	    key: "restoreValue",
	    value: function restoreValue(form) {
	      var cell = this.view.getSelectedId();

	      if (cell) {
	        var item = this.view.getRow(cell.row);
	        var value = item["$" + cell.column] || item[cell.column];

	        if (value && value.indexOf("=LINK") === 0) {
	          var parts = value.split("\"");
	          form.setValues({
	            name: parts[3] || "",
	            url: parts[1] || ""
	          });
	          return true;
	        }
	      }

	      return false;
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["link-title"],
	        move: true,
	        position: "center",
	        body: {
	          view: "form",
	          elements: [{
	            view: "text",
	            name: "name",
	            placeholder: webix.i18n.spreadsheet.labels["link-name"]
	          }, {
	            view: "text",
	            name: "url",
	            placeholder: webix.i18n.spreadsheet.labels["link-url"]
	          }]
	        },
	        on: {
	          onSaveClick: function () {
	            return okClick$3(_this);
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	function okClick$3(dialog) {
	  var cell = dialog.view.getSelectedId();
	  var data = dialog.$dialog.getBody().getValues();
	  var text = "";

	  if (data.url) {
	    data.name = data.name || data.url;
	    if (!/^https?:\/\//i.test(data.url)) data.url = "http://" + data.url;
	    text = "=LINK(\"".concat(data.url, "\",\"").concat(data.name, "\")");
	  }

	  dialog.view.setCellValue(cell.row, cell.column, text);
	  dialog.view.refresh();
	  dialog.close();
	}

	var lnk = /*#__PURE__*/Object.freeze({
		action: action$7,
		DialogBox: DialogBox$7
	});

	var action$8 = "print";
	var DialogBox$8 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "$show",
	    value: function $show(box, form) {
	      form.setValues({
	        data: "current",
	        paper: "A4",
	        fit: "page",
	        mode: "landscape",
	        sheetnames: 1,
	        margin: 0
	      });
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        head: webix.i18n.spreadsheet.labels["print-title"],
	        move: true,
	        modal: true,
	        width: 520,
	        height: 520,
	        position: "center",
	        buttons: false,
	        body: {
	          view: "form",
	          elements: [{
	            type: "section",
	            template: webix.i18n.spreadsheet.labels["print-settings"]
	          }, {
	            cols: [{
	              view: "radio",
	              name: "data",
	              vertical: true,
	              options: [{
	                id: "current",
	                value: webix.i18n.spreadsheet.labels["current-sheet"]
	              }, {
	                id: "all",
	                value: webix.i18n.spreadsheet.labels["all-sheets"]
	              }, {
	                id: "selection",
	                value: webix.i18n.spreadsheet.labels["selection"]
	              }],
	              on: {
	                onChange: function (newv) {
	                  if (newv == "all") {
	                    var form = this.getFormView();
	                    form.elements.sheetnames.setValue(1);
	                  }
	                }
	              }
	            }, {
	              rows: [{
	                view: "checkbox",
	                name: "sheetnames",
	                labelRight: webix.i18n.spreadsheet.labels["sheet-names"]
	              }, {
	                view: "checkbox",
	                name: "borderless",
	                labelRight: webix.i18n.spreadsheet.labels["borderless"]
	              }, {
	                view: "checkbox",
	                name: "skiprows",
	                labelRight: webix.i18n.spreadsheet.labels["skip-rows"]
	              }, {
	                view: "checkbox",
	                name: "margin",
	                labelRight: webix.i18n.spreadsheet.labels["margin"]
	              }]
	            }]
	          }, {
	            type: "section",
	            template: webix.i18n.spreadsheet.labels["print-paper"]
	          }, {
	            view: "radio",
	            name: "paper",
	            options: [{
	              id: "letter",
	              value: webix.i18n.spreadsheet.labels["page-letter"]
	            }, {
	              id: "A4",
	              value: webix.i18n.spreadsheet.labels["page-a4"]
	            }, {
	              id: "A3",
	              value: webix.i18n.spreadsheet.labels["page-a3"]
	            }]
	          }, {
	            type: "section",
	            template: webix.i18n.spreadsheet.labels["print-layout"]
	          }, {
	            cols: [{
	              view: "radio",
	              name: "fit",
	              options: [{
	                id: "page",
	                value: webix.i18n.spreadsheet.labels["page-width"]
	              }, {
	                id: "data",
	                value: webix.i18n.spreadsheet.labels["page-actual"]
	              }]
	            }, {
	              width: 35
	            }, {
	              view: "radio",
	              width: 220,
	              name: "mode",
	              options: [{
	                id: "portrait",
	                value: webix.i18n.spreadsheet.labels["page-portrait"]
	              }, {
	                id: "landscape",
	                value: webix.i18n.spreadsheet.labels["page-landscape"]
	              }]
	            }]
	          }, {
	            cols: [{}, {
	              view: "button",
	              css: "ssheet_cancel_button",
	              value: webix.i18n.spreadsheet.labels.cancel,
	              autowidth: true,
	              click: function () {
	                return _this.close();
	              }
	            }, {
	              view: "button",
	              value: webix.i18n.spreadsheet.labels.print,
	              autowidth: true,
	              click: function () {
	                return _this.apply(_this);
	              }
	            }]
	          }]
	        },
	        on: {
	          onHideClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }, {
	    key: "apply",
	    value: function apply(dialog) {
	      var data = dialog.$dialog.getBody().getValues();
	      data.margin = data.margin ? 0 : {};
	      this.close();
	      webix.print(dialog.view, data);
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var pnt = /*#__PURE__*/Object.freeze({
		action: action$8,
		DialogBox: DialogBox$8
	});

	var action$9 = "add-comment";
	var DialogBox$9 =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "open",
	    value: function open(action) {
	      var _this = this;

	      //we get cell only on hover commented cell
	      this.cell = action.cell ? action.cell : this.view.getSelectedId(); // cell not provided

	      if (!this.cell || // cell is locked and in the edit mode
	      this.view.isCellLocked(this.cell.row, this.cell.column) && !action.viewonly || // action blocked by user's code
	      !this.view.callEvent("onBeforeCommentShow", [this.cell.row, this.cell.column, !action.viewonly])) {
	        return false;
	      }

	      this.view.comments._activeComment = {
	        editStatus: !action.viewonly,
	        cell: this.cell
	      };

	      if (!this.$dialog) {
	        this.$dialog = webix.ui(this.$init());
	        this.view.comments.commentsView = this.$dialog;
	        this.$dialog.attachEvent("onHide", function () {
	          return _this.$hide();
	        });
	        this.view.attachEvent("onCommentHide", function () {
	          return _this.$dialog.hide();
	        });
	      }

	      var form = this.$dialog.getBody();
	      var span = this.view.$$("cells").getSpan(this.cell.row, this.cell.column);
	      var item = span ? {
	        row: this.cell.row,
	        column: span[1] * 1 + span[2] - 1
	      } : this.cell;
	      webix.delay(function () {
	        _this.$dialog.show(_this.view.$$("cells").getItemNode(item));

	        _this._setComment();
	      });
	      if (this.$show(this.$dialog, form) === false) this.close();
	    }
	  }, {
	    key: "$show",
	    value: function $show() {
	      this.textarea = this.$dialog.queryView({
	        view: "textarea"
	      });
	      this.template = this.$dialog.queryView({
	        view: "template"
	      });
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this2 = this;

	      return {
	        view: "popup",
	        css: "ssheet_comments",
	        minWidth: 250,
	        minHeight: 150,
	        relative: "right",
	        resize: true,
	        on: {
	          onViewResize: function () {
	            _this2.$dialog.hide();

	            _this2.$dialog.show();
	          }
	        },
	        body: {
	          animate: false,
	          cells: [{
	            view: "template",
	            css: "ssheet_comment_view",
	            borderless: true,
	            scroll: "auto",
	            onClick: {
	              "ssheet_comment_view": function () {
	                if (!(_this2.view.config.readonly || _this2.view.isCellLocked(_this2.cell.row, _this2.cell.column))) _this2.showInput(_this2.view.comments.get(_this2.cell.row, _this2.cell.column));
	              }
	            }
	          }, {
	            view: "textarea",
	            on: {
	              onChange: function () {
	                _this2.addComment();
	              },
	              onFocus: function () {
	                _this2.view.$$("cells").select(_this2.cell.row, _this2.cell.column);

	                _this2.view.comments._activeComment = {
	                  editStatus: true,
	                  cell: _this2.cell
	                };
	              },
	              onBlur: function () {
	                _this2.showTemplate(_this2.textarea.getValue());

	                _this2.changeTextarea();

	                _this2.view.comments._activeComment = {};
	              }
	            }
	          }]
	        }
	      };
	    }
	  }, {
	    key: "_setComment",
	    value: function _setComment() {
	      var comment = this.view.comments.get(this.cell.row, this.cell.column);
	      if (this.view.comments._activeComment.editStatus) this.showInput(comment);else this.showTemplate(comment);
	    }
	  }, {
	    key: "showTemplate",
	    value: function showTemplate(text) {
	      this.template.show();
	      this.template.setHTML(text);
	    }
	  }, {
	    key: "showInput",
	    value: function showInput(text) {
	      this.changeTextarea(text);
	      this.textarea.show();
	      this.textarea.focus();
	    }
	  }, {
	    key: "addComment",
	    value: function addComment() {
	      this.view.comments.add(this.cell.row, this.cell.column, this.textarea.getValue());
	      this.$dialog.hide();
	    }
	  }, {
	    key: "changeTextarea",
	    value: function changeTextarea(text) {
	      this.textarea.blockEvent();
	      this.textarea.setValue(text || "");
	      this.textarea.unblockEvent();
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var cmt = /*#__PURE__*/Object.freeze({
		action: action$9,
		DialogBox: DialogBox$9
	});

	var action$a = "resize";
	var DialogBox$a =
	/*#__PURE__*/
	function (_Dialog) {
	  _inherits(DialogBox, _Dialog);

	  function DialogBox() {
	    _classCallCheck(this, DialogBox);

	    return _possibleConstructorReturn(this, _getPrototypeOf(DialogBox).apply(this, arguments));
	  }

	  _createClass(DialogBox, [{
	    key: "open",
	    value: function open(action) {
	      this.type = action.group;
	      this.header = action.value;
	      Dialog.prototype.open.apply(this, arguments);
	    }
	  }, {
	    key: "$show",
	    value: function $show() {
	      var sel = this.view.getSelectedId();
	      if (!sel) return false;

	      this.view.$handleSelection = function () {
	        return false;
	      };

	      this.size = this.$dialog.getBody().elements["size"];
	      this.$dialog.getHead().getChildViews()[0].setHTML(this.header);
	      var grid = this.view.$$("cells");
	      var value;
	      if (this.type == "row") value = grid.getItem(sel.row).$height || grid.config.rowHeight;else value = grid.getColumnConfig(sel.column).width || grid.config.columnWidth;
	      this.size.define({
	        value: value,
	        label: webix.i18n.spreadsheet.labels[this.type == "row" ? "height" : "width"]
	      });
	      this.size.refresh();
	      this.size.focus();
	    }
	  }, {
	    key: "$hide",
	    value: function $hide() {
	      this.view.$handleSelection = null;
	    }
	  }, {
	    key: "okClick",
	    value: function okClick() {
	      var size = this.size.getValue() * 1;
	      if (this.type == "row") this.view.setRowHeight(null, size);else this.view.setColumnWidth(null, size);
	      this.close();
	    }
	  }, {
	    key: "$init",
	    value: function $init() {
	      var _this = this;

	      return {
	        view: "ssheet-dialog",
	        position: "center",
	        width: 300,
	        move: true,
	        body: {
	          name: "size",
	          view: "text"
	        },
	        on: {
	          onSaveClick: function () {
	            return _this.okClick();
	          },
	          onHideClick: function () {
	            return _this.close();
	          },
	          onCancelClick: function () {
	            return _this.close();
	          }
	        }
	      };
	    }
	  }]);

	  return DialogBox;
	}(Dialog);

	var siz = /*#__PURE__*/Object.freeze({
		action: action$a,
		DialogBox: DialogBox$a
	});

	var bases = [aiw, asw, rgs, dpd, fmt, cnd, exp, lnk, pnt, cmt, siz];
	function init$8(view) {
	  var dialogs = {};
	  if (view.config.readonly) bases = [cmt];

	  for (var i = 0; i < bases.length; i++) {
	    dialogs[bases[i].action] = new bases[i].DialogBox(view);
	  }

	  view.attachEvent("onCommand", function (action$$1) {
	    var box = dialogs[action$$1.id];
	    if (box) box.open(action$$1);
	  });
	}

	function init$9(view) {
	  view.attachEvent("onComponentInit", function () {
	    return view.$$("context").attachTo(view._table.$view);
	  });
	  var locale = webix.i18n.spreadsheet.menus;
	  var lists = {
	    data: [{
	      id: "clear",
	      value: locale["clear"],
	      submenu: getClearOperation()
	    }, {
	      id: "lock-cell",
	      value: locale["lock-cell"]
	    }, {
	      $template: "Separator"
	    }, {
	      id: "sort",
	      value: locale.sort,
	      submenu: [{
	        id: "sort-asc",
	        value: locale["sort-asc"]
	      }, {
	        id: "sort-desc",
	        value: locale["sort-desc"]
	      }]
	    }, {
	      id: "create-filter",
	      value: locale["create-filter"]
	    }, {
	      $template: "Separator"
	    }, {
	      id: "add-range",
	      value: locale["add-range"]
	    }, {
	      id: "add-link",
	      value: locale["add-link"]
	    }, {
	      id: "add-comment",
	      value: locale["add-comment"]
	    }],
	    column: getColumnOperation(view),
	    row: getRowOperation(view)
	  };
	  var context = {
	    view: "contextmenu",
	    id: "context",
	    padding: 0,
	    sizeToContent: true,
	    submenuConfig: {
	      padding: 0,
	      on: {
	        onBeforeShow: function () {
	          this.sizeToContent();
	        }
	      }
	    },
	    data: [],
	    on: {
	      onMenuItemClick: function (id) {
	        view.callEvent("onCommand", [this.getMenuItem(id)]);
	      },
	      onBeforeShow: function (pos) {
	        webix.callEvent("onClick", []);
	        var mode, trg;
	        trg = view._table.locate(pos);
	        if (!trg) return false;
	        mode = "";

	        if (trg.header && trg.column !== "rowId") {
	          if (!isColSelected(trg.column, view)) selectColumn(trg.column, view);
	          mode = "column";
	        } else if (trg.row) {
	          if (trg.column === "rowId") {
	            if (!isRowSelected(trg.row, view)) selectRow(trg.row, view);
	            mode = "row";
	          } else {
	            if (!isCellSelected(trg.row, trg.column, view)) view._table.addSelectArea(trg, trg);
	            mode = "data";
	          }
	        }

	        if (mode) {
	          var data = getMenuData(view, mode, lists[mode]);

	          if (data) {
	            this.clearAll();
	            this.parse(data);
	            webix.html.preventEvent(pos);
	            return true;
	          }
	        }

	        return false;
	      }
	    }
	  };
	  view.callEvent("onViewInit", ["context", context]);
	  view.ui(context);
	}
	function getMenuData(view, name, data) {
	  var ev = {
	    area: name,
	    data: data
	  };
	  if (view.callEvent("onContextMenuConfig", [ev])) return ev && ev.data;
	  return null;
	}

	var lockCss = "webix_lock";
	function init$a(view) {
	  view._locks = {};
	  view.attachEvent("onReset", function () {
	    return reset$3(view);
	  });
	  view.attachEvent("onUndo", function (type, row, column, mode) {
	    if (type === "lock") lockCell(view, row, column, !!mode, true);
	  });
	  view.attachEvent("onCommand", function (cm) {
	    if (cm.id === "lock-cell") lock(view);
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition(p.name, p.inc, p.data, p.start);
	  });
	}

	function reset$3(view) {
	  view._locks = {};
	}

	function lockCell(view, row, column, mode, silent) {
	  var table = view.$$("cells");

	  if (_typeof(row) === "object" && _typeof(column) === "object") {
	    group.set(function () {
	      _mapCellsCalls(row, column, function (row, column) {
	        lockCell(view, row, column, mode, true);
	      });
	    });
	  } else {
	    mode = mode === false ? false : true;
	    var objrow = view._locks[row] = view._locks[row] || {};
	    objrow[column] = mode;
	    if (mode) table.addCellCss(row, column, lockCss, true);else table.removeCellCss(row, column, lockCss, true);
	    view.callEvent("onAction", ["lock", {
	      row: row,
	      column: column,
	      value: !mode,
	      newValue: mode
	    }]);
	  }

	  if (!silent) table.refresh();
	}

	function _mapCellsCalls(start, end, handler, master) {
	  for (var x = start.row; x <= end.row; x++) {
	    for (var y = start.column; y <= end.column; y++) {
	      handler.call(master || this, x, y);
	    }
	  }
	}

	function isCellLocked(view, row, column) {
	  return view._locks[row] ? view._locks[row][column] : false;
	}
	function serialize$2(view, data) {
	  var row,
	      column,
	      locked = [];

	  for (row in view._locks) {
	    for (column in view._locks[row]) {
	      if (view._locks[row][column]) locked.push([row, column]);
	    }
	  }

	  data.locked = locked;
	}
	function load$2(view, data) {
	  var i,
	      locked = data.locked;
	  if (locked) for (i = 0; i < locked.length; i++) {
	    lockCell(view, locked[i][0], locked[i][1], true, true);
	  }
	}

	function lock(view) {
	  var block = view.$$("cells").getSelectArea();

	  if (block) {
	    var mode = view.isCellLocked(block.start.row, block.start.column);
	    view.lockCell(block.start, block.end, !mode);
	  }
	}

	function updatePosition(name, inc, data, start) {
	  var locked = data.locked,
	      i = locked.length;

	  if (inc) {
	    while (i--) {
	      var _locked$i = _slicedToArray(locked[i], 2),
	          row = _locked$i[0],
	          column = _locked$i[1];

	      if (row && name == "row" && row >= start.row || column && name == "column" && column >= start.column) {
	        if (name == "row") {
	          if (row < start.row - inc) //delete lock mark if row was deleted
	            locked.splice(i, 1);else //update mark position if upper row was deleted
	            locked[i][0] = row * 1 + inc;
	        } else if (name == "column") {
	          if (column < start.column - inc) {
	            locked.splice(i, 1);
	          } else locked[i][1] = column * 1 + inc;
	        }
	      }
	    }
	  }
	}

	var m3 = /*#__PURE__*/Object.freeze({
		lockCss: lockCss,
		init: init$a,
		lockCell: lockCell,
		isCellLocked: isCellLocked,
		serialize: serialize$2,
		load: load$2
	});

	var ignoreUndoReset = false;
	function init$b(view) {
	  reset$4(view);
	  undoHandlers(view);
	  view.attachEvent("onHardReset", function () {
	    return reset$4(view);
	  });
	  view.attachEvent("onAfterSheetShow", function () {
	    return reset$4(view);
	  }); // styles

	  view.attachEvent("onBeforeStyleChange", function (row, column, nstyle, ostyle) {
	    if (isCellLocked(view, row, column)) return false;
	    addToHistory(view, {
	      action: "style",
	      row: row,
	      column: column,
	      value: ostyle,
	      newValue: nstyle,
	      group: group.value
	    });
	  }); // editing

	  view.attachEvent("onBeforeValueChange", function (row, column, nvalue, ovalue) {
	    if (isCellLocked(view, row, column)) return false;
	    addToHistory(view, {
	      action: "value",
	      row: row,
	      column: column,
	      value: ovalue,
	      newValue: nvalue,
	      group: group.value
	    });
	  }); // merge cells

	  view.attachEvent("onBeforeSpan", function (row, column, value) {
	    if (isCellLocked(view, row, column)) return false;
	    addToHistory(view, {
	      action: "span",
	      row: row,
	      column: column,
	      value: value,
	      newValue: value,
	      group: group.value
	    });
	  }); // split cells

	  view.attachEvent("onBeforeSplit", function (row, column, value) {
	    if (isCellLocked(view, row, column)) return false;
	    addToHistory(view, {
	      action: "split",
	      row: row,
	      column: column,
	      value: value,
	      newValue: value,
	      group: group.value
	    });
	  }); // Any abstract undo actions

	  view.attachEvent("onAction", function (action, obj) {
	    return addToHistory(view, {
	      action: action,
	      row: obj.row || null,
	      column: obj.column || null,
	      value: obj.value || null,
	      newValue: obj.newValue || null,
	      group: group.value
	    });
	  }); // column resize

	  view.$$("cells").attachEvent("onColumnResize", function (column, nvalue, ovalue) {
	    return addToHistory(view, {
	      action: "c-resize",
	      row: 0,
	      column: column,
	      value: ovalue,
	      newValue: nvalue,
	      group: group.value
	    });
	  }); // column hide

	  view.attachEvent("onColumnOperation", function (action, start, end) {
	    if (action.id !== "add" && action.id !== "del") addToHistory(view, {
	      action: action,
	      row: 0,
	      column: {
	        start: start,
	        end: end
	      }
	    });
	  }); // row hide

	  view.attachEvent("onRowOperation", function (action, start, end) {
	    if (action.id !== "add" && action.id !== "del") addToHistory(view, {
	      action: action,
	      row: {
	        start: start,
	        end: end
	      },
	      column: 0
	    });
	  }); // row resize

	  view.$$("cells").attachEvent("onRowResize", function (row, nvalue, ovalue) {
	    return addToHistory(view, {
	      action: "r-resize",
	      row: row,
	      column: 0,
	      value: ovalue,
	      newValue: nvalue,
	      group: group.value
	    });
	  }); // condition formats

	  view.attachEvent("onBeforeConditionSet", function (row, column, value, nvalue) {
	    if (isCellLocked(view, row, column)) return false;
	    value = value ? webix.copy(value) : null;
	    addToHistory(view, {
	      action: "condition",
	      row: row,
	      column: column,
	      value: value,
	      newValue: nvalue,
	      group: group.value
	    });
	  });
	  view.$skipHistory = 0;
	}
	function undo(view) {
	  restoreHistory(view, -1);
	}
	function redo(view) {
	  restoreHistory(view, 1);
	}
	function reset$4(view) {
	  if (!ignoreUndoReset) {
	    view._ssUndoHistory = [];
	    view._ssUndoCursor = -1;
	  }
	}

	function addToHistory(view, data) {
	  if (!view.$skipHistory) {
	    // remove futher history
	    view._ssUndoHistory.splice(view._ssUndoCursor + 1); // add to an array and increase cursor


	    view._ssUndoHistory.push(data);

	    view._ssUndoCursor++;
	  }
	}

	function ignoreUndo(func, view) {
	  view.$skipHistory++;

	  try {
	    func.call(view);
	  } finally {
	    view.$skipHistory--;
	  }
	}
	function ignoreReset(func) {
	  ignoreUndoReset = true;
	  func();
	  ignoreUndoReset = false;
	}

	function restoreHistory(view, step) {
	  var data = view._ssUndoHistory[step > 0 ? view._ssUndoCursor + step : view._ssUndoCursor];

	  if (data) {
	    var value = step > 0 ? data.newValue : data.value;
	    var direction = step > 0;
	    var params = [data.action, data.row, data.column, value, direction];
	    view._ssUndoCursor += step; // group support

	    var group$$1 = data.group;
	    var prevData = view._ssUndoHistory[step > 0 ? view._ssUndoCursor + step : view._ssUndoCursor];
	    ignoreUndo(function () {
	      view.callEvent("onUndo", params);
	      if (!group$$1 || !(prevData && group$$1 == prevData.group)) view.refresh();
	    }, view);

	    if (prevData && group$$1 && group$$1 == prevData.group) {
	      restoreHistory(view, step);
	    }
	  }
	}

	function undoHandlers(view) {
	  view.attachEvent("onUndo", function (type, row, column, value) {
	    switch (type) {
	      case "freeze-row":
	        view.freezeRows(value);
	        break;

	      case "freeze-column":
	        view.freezeColumns(value);
	        break;
	    }
	  });
	}

	var m11 = /*#__PURE__*/Object.freeze({
		init: init$b,
		undo: undo,
		redo: redo,
		reset: reset$4,
		ignoreUndo: ignoreUndo,
		ignoreReset: ignoreReset
	});

	function init$c(view) {
	  view.attachEvent("onStyleChange", function (row, column, style) {
	    var span = getSpan(view, row, column);
	    if (span) span[3] = style ? style.id : "";
	  });
	  view.attachEvent("onDataParse", function (data) {
	    if (data.spans) for (var i = 0; i < data.spans.length; i++) {
	      var span = data.spans[i];
	      addSpan(view, {
	        row: span[0],
	        column: span[1]
	      }, span[2] * 1, span[3] * 1, true);
	    }
	  });
	  view.attachEvent("onDataSerialize", function (data) {
	    var spans = [];
	    var pull = view.$$("cells").getSpan();

	    if (pull) {
	      for (var rid in pull) {
	        var row = pull[rid];

	        for (var cid in row) {
	          var span = row[cid];
	          spans.push([rid * 1, cid * 1, span[0], span[1]]);
	        }
	      }

	      data.spans = spans;
	    }
	  });
	  view.attachEvent("onUndo", function (type, row, column, value, isUndo) {
	    if (type == "span" || type == "split") {
	      if (type == "span") isUndo = !isUndo;
	      undoSpan(view, row, column, value, isUndo);
	    }
	  });
	  view.attachEvent("onAction", function (name, options) {
	    if (name == "lock") setLockCss(view, options.row, options.column, options.newValue);else if (name == "before-grid-change") updatePosition$1(options.name, options.inc, options.data, options.start);else if (name == "check-borders") return checkSpanBorders(view, options.row, options.column, options.area, options.mode);
	  });
	}

	function getSpan(view, row, column) {
	  var item = view.$$("cells").getSpan()[row];
	  if (item) return item[column];
	}

	function addSpan(view, cell, x, y, silent) {
	  if (x < 2 && y < 2) return;

	  if (silent || view.callEvent("onBeforeSpan", [cell.row, cell.column, [x, y]])) {
	    var row = view.getRow(cell.row);
	    var css = row.$cellCss ? row.$cellCss[cell.column] || "" : "";
	    setSpanValue(view, cell, x, y);
	    view.$$("cells").addSpan(cell.row, cell.column, x, y, null, css);

	    if (!silent) {
	      view.callEvent("onAfterSpan", [cell.row, cell.column, [x, y]]);
	      save(view, "spans", {
	        row: cell.row,
	        column: cell.column,
	        x: x,
	        y: y
	      });
	    }
	  }
	}
	function removeSpan(view, cell) {
	  var span = view.$$("cells").getSpan(cell.row, cell.column);

	  if (span && view.callEvent("onBeforeSplit", [cell.row, cell.column, [span[2], span[3]]])) {
	    view.$$("cells").removeSpan(cell.row, cell.column);
	    view.callEvent("onAfterSplit", [cell.row, cell.column, [span[2], span[3]]]);
	    save(view, "spans", {
	      row: cell.row,
	      column: cell.column,
	      x: 0,
	      y: 0
	    });
	  }
	}
	function getRange(sel) {
	  var lx, ly, rx, ry;
	  rx = ry = 0;
	  lx = ly = Infinity;

	  for (var i = 0; i < sel.length; i++) {
	    var cx = sel[i].column * 1;
	    var cy = sel[i].row * 1;
	    lx = Math.min(cx, lx);
	    rx = Math.max(cx, rx);
	    ly = Math.min(cy, ly);
	    ry = Math.max(cy, ry);
	  }

	  return {
	    cell: {
	      row: ly,
	      column: lx
	    },
	    x: rx - lx + 1,
	    y: ry - ly + 1
	  };
	}

	function undoSpan(view, row, column, value, isUndo) {
	  if (isUndo) {
	    removeSpan(view, {
	      row: row,
	      column: column
	    });
	  } else {
	    addSpan(view, {
	      row: row,
	      column: column
	    }, value[0], value[1]);
	  }
	}

	function setLockCss(view, row, column, mode) {
	  var span = getSpan(view, row, column);

	  if (span) {
	    if (mode) {
	      if (span[3].indexOf(lockCss) == -1) span[3] += " " + lockCss;
	    } else span[3] = span[3].replace(" " + lockCss, "");

	    view._table.refresh();
	  }
	}

	function updatePosition$1(name, inc, data, start) {
	  var spans = data.spans;

	  if (inc) {
	    for (var i = spans.length - 1; i >= 0; i--) {
	      var _spans$i = _slicedToArray(spans[i], 2),
	          row = _spans$i[0],
	          column = _spans$i[1];

	      if (inc < 0) {
	        //deleting
	        if (name == "row" && row <= start.row - inc - 1) inc = start.row - spans[i][0];else if (name == "column" && column <= start.column - inc - 1) inc = start.column - spans[i][1];
	      }

	      if (name == "row" && row >= start.row || name == "column" && column >= start.column) {
	        spans[i][0] = name == "row" ? row * 1 + inc : row;
	        spans[i][1] = name == "column" ? column * 1 + inc : column;
	      }
	    }
	  }
	}

	var borderChecks = {
	  "border-right": function (row, column, span, area) {
	    return area.end.column == column + span[0] - 1;
	  },
	  "border-bottom": function (row, column, span, area) {
	    return area.end.row == row + span[1] - 1;
	  }
	};

	function checkSpanBorders(view, row, column, area, mode) {
	  var span = getSpan(view, row, column);
	  return span && borderChecks[mode] ? borderChecks[mode](row, column, span, area) : false;
	} // clear merged cells except the first one


	function setSpanValue(view, cell, x, y) {
	  var i,
	      j,
	      value,
	      row = cell.row * 1,
	      column = cell.column * 1,
	      isEmpty = !view.getCellValue(row, column);

	  for (i = row; i < row + y; i++) {
	    for (j = column; j < column + x; j++) {
	      value = view.getCellValue(i, j);

	      if (value !== "" && (j != column || i != row)) {
	        if (isEmpty) {
	          isEmpty = false;
	          view.setCellValue(row, column, value);
	        }

	        view.setCellValue(i, j, "");
	      }
	    }
	  }
	}

	function adjustSpan(span, action, start, end, data) {
	  var length = action.group == "row" ? span[3] : span[2];
	  var checkSpan = action.group == "row" ? [span[0] * 1, span[0] * 1 + span[3] - 1] : [span[1] * 1, span[1] * 1 + span[2] - 1];
	  var selection = action.group == "row" ? [start.row, end.row] : [start.column, end.column]; //if we add, the number of selected rows/cols is added to span, so we need original selection length

	  var inc = selection[1] - selection[0] + 1;
	  selection[0] = Math.max(selection[0], checkSpan[0]);
	  selection[1] = Math.min(selection[1], checkSpan[1]);
	  var isFirstCell = selection[0] == checkSpan[0];

	  if (selection[0] <= selection[1]) {
	    //selection is in span
	    if (action.id == "del") //if we delete, only rows/cols included into span
	      inc = (selection[1] - selection[0] + 1) * -1; //delete smth which starts as span and less than it's length

	    if (action.id == "del" && isFirstCell && length > -1 * inc) {
	      var value = find(data, function (value) {
	        return value[0] == span[0] && value[1] == span[1];
	      });
	      value[0] = action.group == "row" ? value[0] - inc : value[0];
	      value[1] = action.group == "column" ? value[1] - inc : value[1];
	      var oldValue = findIndex(data, function (oldValue) {
	        return oldValue[0] == value[0] && oldValue[1] == value[1] && (oldValue[2] != value[2] || oldValue[3] != value[3]);
	      });
	      if (oldValue > -1) //remove another data at the same place
	        data.splice(oldValue, 1);
	    }

	    if (!(isFirstCell && action.id == "add")) {
	      span[2] = action.group == "column" ? span[2] + inc : span[2];
	      span[3] = action.group == "row" ? span[3] + inc : span[3];
	    }
	  }

	  return span;
	}
	function pasteSpan(view, extra, row, col, cutted, translate) {
	  //existing span
	  var s = view._table.getSpan(row, col);

	  if (extra && extra.span) {
	    var span = extra.span; //if we are on start position for the future span

	    if (row == span[0] * 1 + translate.row && col == span[1] * 1 + translate.column) {
	      //delete spans in future paste zone 
	      view._table.mapCells(row, col, span[3], span[2], function (value, rid, cid) {
	        s = view._table.getSpan(rid, cid);
	        if (s) removeSpan(view, {
	          row: s[0],
	          column: s[1]
	        });
	      }, true);

	      addSpan(view, {
	        row: row,
	        column: col
	      }, span[2], span[3]);
	      if (cutted === 1) removeSpan(view, {
	        row: extra.row,
	        column: extra.col
	      });
	    }
	  } else if (s) removeSpan(view, {
	    row: s[0],
	    column: s[1]
	  });
	}

	var m16 = /*#__PURE__*/Object.freeze({
		init: init$c,
		addSpan: addSpan,
		removeSpan: removeSpan,
		getRange: getRange,
		adjustSpan: adjustSpan,
		pasteSpan: pasteSpan
	});

	function init$d(view) {
	  view.attachEvent("onCommand", function (action, start, end) {
	    if (action.id == "add" || action.id == "del") {
	      var area = view._table.getSelectArea();

	      if (area && !(start && end)) {
	        start = area.start;
	        end = area.end;
	      }

	      if (start && end) {
	        group.set(function () {
	          process(action, start, end, view);
	        });
	      }
	    }
	  });
	  view.attachEvent("onUndo", function (action, row, column, value) {
	    if (action == "grid-change") loadChangedData(view, value);
	  });
	}
	function process(action, start, end, view, e, r) {
	  var data,
	      i,
	      newData,
	      oldData,
	      values,
	      count = 0,
	      origin = 0;

	  var select = view._table.getSelectArea();

	  var state = view._table.getScrollState();

	  newData = view.serialize({
	    math: true
	  });
	  oldData = webix.copy(newData);
	  var spans = newData.spans;

	  for (var s in spans) {
	    var span = spans[s];
	    span = adjustSpan(span, action, start, end, newData.data);

	    if (span[2] <= 0 || span[3] <= 0) {
	      spans.splice(s, 1);
	    }
	  }

	  values = getUpdateValues(action, start, end);
	  view.$handleSelection = null;
	  if (!e) ignoreUndo(function () {
	    view.callEvent("onAction", ["before-grid-change", {
	      name: values.name,
	      inc: values.inc,
	      data: newData,
	      start: start
	    }]);
	  }, view);
	  data = newData.data;

	  if (action.group == "column") {
	    count = end.column - start.column + 1;
	    origin = start.column;
	    if (action.id == "add") _addColumn(action, start, end, view, e, r, data);else if (action.id == "del") {
	      _delColumn(action, start, end, view, e, r, data);

	      count = -count;
	    }
	  } else if (action.group == "row") {
	    count = end.row - start.row + 1;
	    origin = start.row;
	    if (action.id == "add") _addRow(action, start, end, view, e, r, data);else if (action.id == "del") {
	      _delRow(action, start, end, view, e, r, data);

	      count = -count;
	    }
	  } //update formulas


	  var update = {
	    id: action.group,
	    start: origin,
	    count: count
	  };
	  i = data.length;

	  while (i--) {
	    if (data[i][2] && typeof data[i][2] === "string" && data[i][2].substr(0, 1) == "=") data[i][2] = updateMath(data[i][2], update);
	  }

	  view.callEvent("onAction", ["grid-change", {
	    value: oldData,
	    newValue: newData
	  }]);
	  ignoreUndo(function () {
	    loadChangedData(view, newData);

	    view._table.scrollTo(state.x, state.y);
	  }, view);

	  if (select) {
	    var grid = view.$$("cells");
	    select = fixSelectArea(select, grid);
	    if (select) grid.addSelectArea(select.start, select.end);
	  }
	}

	function fixSelectArea(select, grid) {
	  var rows = grid.count();
	  var cols = grid.config.columns.length;
	  if (select.start.row * 1 > rows) return null;
	  if (select.end.row * 1 > rows) return null;
	  if (select.start.column * 1 > cols) return null;
	  if (select.end.column * 1 > cols) return null;
	  return select;
	}

	function loadChangedData(view, data) {
	  // data loading resets undo history, and
	  // we need to preserve it
	  ignoreReset(function () {
	    view.$handleSelection = null;
	    view.parse(data);
	  });
	}

	function getUpdateValues(action, start, end) {
	  var name = action.group,
	      inc = action.id == "add" ? 1 : action.id == "del" ? -1 : 0;

	  if (inc) {
	    // span support
	    if (name == "row") inc += inc * (end.row - start.row);
	    if (name == "column") inc += inc * (end.column - start.column);
	  }

	  return {
	    name: name,
	    inc: inc
	  };
	}

	function _addColumn(action, start, end, view, silent, value, data) {
	  var i = data.length;
	  var add_column_count = end.column - start.column + 1;
	  view.config.columnCount += add_column_count;
	  view.reset();

	  while (i--) {
	    if (data[i][1] >= start.column) data[i][1] += add_column_count;
	  }

	  if (!silent) view.callEvent("onColumnOperation", [action, start, end, null]); //add item to history
	  else data.push.apply(data, _toConsumableArray(value)); //recovering value which has been deleted
	}

	function _delColumn(action, start, end, view, silent, value, data) {
	  var i = data.length;
	  var del_column_count = end.column - start.column + 1;

	  if (view.config.columnCount === del_column_count) {
	    if (start.column == end.column) return; //deleting last column, ignoring
	    //prevent deleting all columns

	    end.column--;
	    del_column_count--;
	  }

	  view.config.columnCount -= del_column_count;
	  view.reset();
	  var deleted = []; // for history

	  while (i--) {
	    if (data[i][1] >= start.column && data[i][1] <= end.column) deleted.push(data.splice(i, 1)[0]);else if (data[i][1] > end.column) data[i][1] -= del_column_count;
	  }

	  if (!silent) view.callEvent("onColumnOperation", [action, start, end, deleted]);
	}

	function _addRow(action, start, end, view, silent, value, data) {
	  var i = data.length;
	  var add_row_count = end.row - start.row + 1;
	  view.config.rowCount += add_row_count;
	  view.reset();

	  while (i--) {
	    if (data[i][0] >= start.row) data[i][0] += add_row_count;
	  }

	  if (!silent) {
	    view.callEvent("onRowOperation", [action, start, end, null]);
	  } else {
	    data.push.apply(data, _toConsumableArray(value));
	  }
	}

	function _delRow(action, start, end, view, silent, value, data) {
	  var i = data.length;
	  var del_row_count = end.row - start.row + 1;

	  if (view.config.rowCount === del_row_count) {
	    if (start.row == end.row) return; //deleting last column, ignoring
	    //prevent deleting all columns

	    end.row--;
	    del_row_count--;
	  }

	  view.config.rowCount -= del_row_count;
	  view.reset();
	  var deleted = [];

	  while (i--) {
	    if (data[i][0] >= start.row && data[i][0] <= end.row) deleted.push(data.splice(i, 1)[0]);else if (data[i][0] > end.row) data[i][0] -= del_row_count;
	  }

	  if (!silent) view.callEvent("onRowOperation", [action, start, end, deleted]);
	}

	var m1 = /*#__PURE__*/Object.freeze({
		init: init$d,
		process: process
	});

	function init$e(view) {
	  var holders = {};

	  view.setPlaceholder = function (obj, value) {
	    if (_typeof(obj) === "object") for (var key in obj) {
	      holders[key.toLowerCase()] = obj[key];
	    } else holders[obj.toString().toLowerCase()] = value;
	    view.callEvent("onMathRefresh", []);
	  };

	  return holders;
	}

	function init$f(view) {
	  var triggers = [];
	  var backtrak = []; //math operations object

	  var core = get_core(view); //init named ranges

	  view.ranges = core.ranges = new Ranges(view); //init placeholders

	  core.p = init$e(view);
	  view.attachEvent("onReset", function () {
	    triggers = [];
	    backtrak = [];
	    view.ranges.clear();
	  });
	  view.attachEvent("onCellChange", recalckCell);
	  view.attachEvent("onMathRefresh", recalckAll);
	  view.attachEvent("onDataSerialize", function (data) {
	    return _serialize$1(view, data);
	  });
	  view.attachEvent("onDataParse", function (data) {
	    return _dataParse(view, data);
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$2(p.name, p.inc, p.data, p.start);
	  });
	  var solvedMath;
	  var solvedCounter; //execute math handler

	  function applyMath(r, c, handler) {
	    var row = view.getRow(r);

	    var value = _execute(handler, core);

	    row[c] = value;
	    var tkey = c * 100000000 + r;
	    var count = solvedCounter[tkey] = (solvedCounter[tkey] || 0) + 1;

	    if (solvedMath[tkey] === value || count > 1000) {
	      //prevent infinity loops
	      //if cell was already calculated with the same value, do not recaculate dependent cells
	      //in some cases we have have non-stable loop, where value of math is different each time
	      //counter limits calculation for 1000 itterations per cell
	      return;
	    }

	    solvedMath[tkey] = value; //check if we have related cells, process their math as well

	    check_trigger(r, c);
	  } //check and run triggers


	  function check_trigger(srow, scolumn) {
	    //triggers is a matrix[row][column]
	    //store array of coordinates of related cells
	    var line = triggers[srow];

	    if (line) {
	      var block = line[scolumn];

	      if (block) {
	        for (var i = 0; i < block.length; i++) {
	          var _block$i = block[i],
	              row = _block$i.row,
	              column = _block$i.column,
	              handler = _block$i.handler;

	          if (row != srow || column != scolumn) {
	            applyMath(row, column, handler);
	          }
	        }
	      }
	    }
	  }

	  function recalckAll() {
	    var grid = view.$$("cells");
	    var state = grid.getState();
	    var columns = state.ids.concat(state.hidden);
	    grid.eachRow(function (obj) {
	      var item = this.getItem(obj);

	      for (var i = 1; i < columns.length; i++) {
	        var key = columns[i];
	        var value = item["$" + key];
	        if (value) recalckCell(obj, key, value);
	      }
	    }, true);
	    grid.refresh();
	  }

	  function recalckCell(r, c, value) {
	    //check if changed cell was a math cell, based on some other cells
	    //clean triggers in such case
	    var line = backtrak[r];
	    if (line && line[c]) remove_triggers(triggers, backtrak, c, r); //if new value is a math, calculate it and store triggers

	    if (value && value.toString().indexOf("=") === 0) {
	      var formula = _parse$1(value, core, "");

	      var row = view.getRow(r);
	      row[c] = _execute(formula.handler, core);
	      row["$" + c] = formula.text;

	      if (formula.triggers.length) {
	        add_triggers(triggers, backtrak, formula.triggers, {
	          row: r,
	          column: c,
	          handler: formula.handler
	        }, view.getActiveSheet());
	      }
	    } //check if we have some other cells, related to the changed one


	    solvedMath = {};
	    solvedCounter = {};
	    check_trigger(r, c);
	  }

	  init$7(view, core, {
	    parse: _parse$1,
	    execute: _execute
	  });
	}
	function calculate(view, value) {
	  var core = get_core(view);

	  var formula = _parse$1(value, core, "");

	  value = _execute(formula.handler, core);
	  return value;
	} //add new triggers

	function add_triggers(trs, back, adds, cell, active) {
	  //trs - matrix of triggers
	  //back - matrix of backlinks
	  //adds - list of triggers
	  var blist = [];

	  for (var i = 0; i < adds.length; i++) {
	    var line = adds[i]; //line = [start_row, start_column, end_row, end_column, sheet]
	    //ignore triggers from passive cells

	    if (line[4] !== "" && line[4] !== active) continue;

	    for (var j = line[0]; j <= line[2]; j++) {
	      var step = trs[j];
	      if (!step) step = trs[j] = [];

	      for (var k = line[1]; k <= line[3]; k++) {
	        var block = step[k];
	        if (!block) block = step[k] = [];
	        blist.push([j, k]);
	        block.push(cell);
	      }
	    }
	  } //store back-relations, for easy trigger removing 


	  add_backtrack(back, cell.row, cell.column, blist);
	} //store backtrack relations as a matrix


	function add_backtrack(back, row, column, adds) {
	  var line = back[row];
	  if (!line) line = back[row] = [];
	  line[column] = adds;
	} //remove unused triggers


	function remove_triggers(trs, back, c, r) {
	  //get list of triggers from backtrack structure
	  var adds = back[r][c];
	  back[r][c] = null; //delete triggers

	  for (var i = adds.length - 1; i >= 0; i--) {
	    var cell = adds[i];
	    var block = trs[cell[0]][cell[1]];

	    for (var j = block.length - 1; j >= 0; j--) {
	      var bcell = block[j];
	      if (bcell.row == r && bcell.column == c) block.splice(j, 1);
	    }
	  }
	} //run math function


	function _execute(formula, core) {
	  var value;
	  var error = webix.i18n.spreadsheet.table["math-error"];

	  try {
	    value = formula.call(core);
	  } catch (e) {
	    //some error in the math code
	    return error;
	  }

	  if (typeof value === "number") {
	    if (!isFinite(value)) return error; //round values to fix math precision issue in JS

	    return Math.round(value * 100000) / 100000;
	  } else if (typeof value !== "string") {
	    return value ? value.toString() : error;
	  } else return value;
	} //converts cell references to code


	function get_core(view) {
	  var active = getAccessor(view);
	  return {
	    rs: function (sheet, r1, c1, r2, c2) {
	      return getAccessor(view, sheet).getRange(r1, c1, r2, c2);
	    },
	    r: active.getRange,
	    vs: function (sheet, r, c) {
	      return getAccessor(view, sheet).getValue(r, c);
	    },
	    v: active.getValue,
	    m: methods,
	    p: {}
	  };
	}

	function _serialize$1(view, obj) {
	  obj.ranges = view.ranges.serialize();
	}

	function _dataParse(view, obj) {
	  view.ranges.parse(obj.ranges);
	}

	function updatePosition$2(name, inc, data, start) {
	  var ranges = data.ranges;

	  for (var i = 0; i < ranges.length; i++) {
	    ranges[i][1] = changeRange(ranges[i][1], name, inc, start);
	  }
	}

	var m16a = /*#__PURE__*/Object.freeze({
		init: init$f,
		calculate: calculate
	});

	function init$g(view) {
	  view.conditions = {
	    _empty: true,
	    _pull: {},
	    handlers: {
	      ">": function (a, b) {
	        return a > getCellValue(view, b);
	      },
	      "<": function (a, b) {
	        return a < getCellValue(view, b);
	      },
	      "=": function (a, b) {
	        return a == getCellValue(view, b);
	      },
	      "!=": function (a, b) {
	        return a != getCellValue(view, b);
	      },
	      "<>": function (a, b) {
	        var first = b[0];
	        var second = b[1];
	        return webix.isArray(b) && a < getCellValue(view, second) && a > getCellValue(view, first);
	      }
	    },
	    add: add$1,
	    remove: remove$1,
	    update: update,
	    get: get,
	    parse: parse$1,
	    serialize: serialize$3,
	    clear: clear
	  };
	  view.attachEvent("onConditionSet", function (data) {
	    return _setCondition(view, data);
	  });
	  view.attachEvent("onUndo", function (type_action, row, column, value) {
	    if (type_action == "condition") _undoCondition(view, row, column, value);
	  });
	  view.attachEvent("onDataSerialize", function (data) {
	    return _serialize$2(view, data);
	  });
	  view.attachEvent("onDataParse", function (data) {
	    return _parse$2(view, data);
	  });
	  view.attachEvent("onColumnInit", function (column) {
	    return _setCssFormat(view, column);
	  });
	  view.attachEvent("onReset", function () {
	    return view.conditions.clear();
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$3(p.name, p.inc, p.data, p.start);
	  });
	  reset$5(view);
	}

	function getCellValue(view, value) {
	  if (isNaN(value * 1)) {
	    if (value.charAt(0) == "=") {
	      value = calculate(view, value);
	    }
	  } else {
	    value = value * 1;
	  }

	  return value;
	}

	function reset$5(view) {
	  view.conditions.clear();
	}

	function _setCondition(view, data) {
	  group.set(function () {
	    view.eachSelectedCell(function (cell) {
	      var collection = view.conditions.get(cell.row, cell.column);

	      _changeCondition("update", cell.row, cell.column, collection || null, data, view);
	    });
	  });
	  view.refresh();
	}

	function _undoCondition(view, row, column, value) {
	  if (view.conditions.get(row, column)) view.conditions.remove(row, column);
	  if (value) view.conditions.update(row, column, value);
	}

	function _serialize$2(view, obj) {
	  obj.conditions = view.conditions.serialize();
	}

	function _parse$2(view, obj) {
	  view.conditions.parse(obj.conditions);
	}

	function _setCssFormat(view, column) {
	  column.cssFormat = function (value, obj, row, column) {
	    if (view.conditions._empty) return "";
	    var collection, i;
	    collection = view.conditions.get(row, column);
	    if (!collection) return "";
	    i = collection.length;

	    while (i--) {
	      var handler = view.conditions.handlers[collection[i][0]];
	      if (handler && handler(obj[column], collection[i][1])) return collection[i][2];
	    }

	    return "";
	  };
	}

	function addEmptyCollection(pull, row, column, state) {
	  state._empty = false;
	  if (!pull[row]) pull[row] = {};
	  if (!pull[row][column]) pull[row][column] = [];
	  return pull[row][column];
	}

	function parse$1(data) {
	  this._empty = true;
	  if (!data) return;
	  var i = data.length;

	  while (i--) {
	    var c = data[i];
	    var collection = addEmptyCollection(this._pull, c[0], c[1], this);
	    collection.push([c[2], c[3], c[4]]);
	  }
	}

	function clear() {
	  this._pull = {};
	}

	function update(row, column, newData) {
	  var collection = this.get(row, column);
	  if (!collection) addEmptyCollection(this._pull, row, column, this);
	  this._pull[row][column] = newData;
	}

	function get(rowId, columnId) {
	  if (!rowId) return this._pull;
	  if (!columnId) return this._pull[rowId];
	  return this._pull[rowId] ? this._pull[rowId][columnId] : null;
	}

	function add$1(rowId, columnId, condition, value, style) {
	  var collection = addEmptyCollection(this._pull, rowId, columnId, this);
	  collection.push([condition, value, style]);
	}

	function remove$1(rowId, columnId) {
	  var collection = this.get(rowId, columnId);
	  if (collection) delete this._pull[rowId][columnId];
	}

	function serialize$3() {
	  var column,
	      condition,
	      i,
	      row,
	      data = [];

	  for (row in this._pull) {
	    for (column in this._pull[row]) {
	      for (i = 0; i < this._pull[row][column].length; i++) {
	        condition = this._pull[row][column][i];
	        data.push([row, column, condition[0], condition[1], condition[2]]);
	      }
	    }
	  }

	  return data;
	}

	function updatePosition$3(name, inc, data, start) {
	  var conditions = data.conditions,
	      i = conditions.length;

	  if (inc) {
	    while (i--) {
	      var _conditions$i = _slicedToArray(conditions[i], 2),
	          row = _conditions$i[0],
	          column = _conditions$i[1];

	      if (name == "row" && row >= start.row || name == "column" && column >= start.column) {
	        if (name == "row") {
	          if (row < start.row - inc) //delete lock mark if row was deleted
	            conditions.splice(i, 1);else //update mark position if upper row was deleted
	            conditions[i][0] = row * 1 + inc;
	        } else if (name == "column") {
	          if (column < start.column - inc) {
	            conditions.splice(i, 1);
	          } else conditions[i][1] = column * 1 + inc;
	        }
	      }
	    }
	  }
	}

	function clearConditionalFormats(view, range$$1) {
	  group.set(function () {
	    eachRange(range$$1, view, function (view, cell) {
	      var condition = view.conditions.get(cell.row, cell.column);
	      if (condition) _changeCondition("remove", cell.row, cell.column, condition, null, view);
	    });
	    view.refresh();
	  });
	}
	function pasteCondition(view, extra, row, col, cutted) {
	  var condition = extra.condition;
	  var collection = view.conditions.get(row, col);

	  _changeCondition("update", row, col, collection || null, condition, view);

	  if (cutted === 1) _changeCondition("remove", extra.row, extra.col, condition, null, view);
	}
	function _changeCondition(name, row, column, oldCondition, newCondition, view) {
	  if (view.callEvent("onBeforeConditionSet", [row, column, oldCondition, newCondition])) {
	    view.conditions[name].apply(view.conditions, [row, column, newCondition]);
	    view.callEvent("onAfterConditionSet", [row, column, oldCondition, newCondition]);
	  }
	}

	var m2 = /*#__PURE__*/Object.freeze({
		init: init$g,
		clearConditionalFormats: clearConditionalFormats,
		pasteCondition: pasteCondition,
		_changeCondition: _changeCondition
	});

	function init$h(view) {
	  var table = view._table;
	  view.attachEvent("onReset", function () {
	    return reset$6(view);
	  });
	  reset$6(view);
	  table.attachEvent("onBeforeEditStart", function (id) {
	    var col = this.getColumnConfig(id.column);

	    if (this._ssEditors[id.row]) {
	      var ed = this._ssEditors[id.row][id.column];

	      if (ed) {
	        webix.extend(col, ed, true);

	        if (ed.options) {
	          if (typeof ed.options == "string") col.options = rangeValue(view, ed.options, {
	            unique: true,
	            empty: true,
	            order: true,
	            filter: ed.useAsFilter
	          });else if (webix.isArray(ed.options)) col.options = rangeValue(view, ed.options, {
	            empty: true,
	            filter: ed.useAsFilter
	          });
	        }
	      }
	    }
	  });
	  table.attachEvent("onAfterEditStop", function (state, id) {
	    var col = this.getColumnConfig(id.column);
	    col.editor = "text";
	    delete col.popup;
	    delete col.$popup;
	    if (isFilter(view, id.row, id.column)) return view.filterSpreadSheet();
	  });

	  table.on_click.ss_filter = function (e, id) {
	    this.edit(id);
	  };

	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$4(p.name, p.inc, p.data, p.start);
	  });
	}

	function reset$6(view) {
	  view._table._ssEditors = {};
	  view._table._ssFilters = {};
	}

	function serialize$4(view, data) {
	  var row,
	      column,
	      tblEditors = view._table._ssEditors,
	      editors = [];

	  for (row in tblEditors) {
	    for (column in tblEditors[row]) {
	      if (!isFilter(view, row, column)) editors.push([row, column, tblEditors[row][column]]);
	    }
	  }

	  data.editors = editors;
	}
	function load$3(view, data) {
	  var i,
	      editors = data.editors;
	  if (editors) for (i = 0; i < editors.length; i++) {
	    view.setCellEditor.apply(view, editors[i]);
	  }
	}
	function clearEditors(view, range$$1) {
	  var refilter = false;

	  view._table.editStop();

	  eachRange(range$$1, view, function (view, cell) {
	    var editor = view._table._ssEditors[cell.row];
	    var filter = view._table._ssFilters[cell.row];

	    if (editor) {
	      if (editor[cell.column]) {
	        delete editor[cell.column];

	        view._table.removeCellCss(cell.row, cell.column, "ss_filter");
	      }
	    }

	    if (filter) {
	      if (filter[cell.column]) {
	        delete filter[cell.column];
	        refilter = true;
	      }
	    }
	  });
	  if (refilter) view.filterSpreadSheet();
	}
	function isFilter(view, row, column) {
	  var filters = view._table._ssFilters;
	  return filters[row] && filters[row][column];
	}
	function addCellFilter(view, row, column, initial) {
	  var filters = view._table._ssFilters;
	  var line = filters[row] = filters[row] || {};
	  line[column] = [row, column];
	  view.callEvent("onAction", ["addFilter", {
	    row: row,
	    column: column
	  }]);
	  if (!initial && view.getCellValue(row, column) != "") view.setCellValue(row, column, "");
	} // called on column/row add, delete, hide,show

	function updatePosition$4(name, inc, data, start) {
	  var i,
	      editors = data.editors;

	  if (inc) {
	    // create new editors
	    for (i = editors.length - 1; i >= 0; i--) {
	      var _editors$i = _slicedToArray(editors[i], 3),
	          row = _editors$i[0],
	          column = _editors$i[1],
	          editor = _editors$i[2];

	      if (name == "row" && row >= start.row || name == "column" && column >= start.column) {
	        //make copy of editor object
	        editor = editors[i][2] = webix.copy(editor);

	        if (name == "row") {
	          if (row < start.row - inc) //delete lock mark if row was deleted
	            editors.splice(i, 1);else //update mark position if upper row was deleted
	            editors[i][0] = row * 1 + inc;
	        } else if (name == "column") {
	          if (column < start.column - inc) {
	            editors.splice(i, 1);
	          } else editors[i][1] = column * 1 + inc;
	        }
	      }

	      editor.options = changeRange(editor.options, name, inc, start);
	    }
	  }
	}

	function pasteDropdown(view, extra, row, col, cutted, translate, updateFilters) {
	  var editor = extra.dropdown.editor;

	  if (extra.dropdown.filter) {
	    if (updateFilters) {
	      var options = changeRange(editor.options, "row", translate.row, {
	        column: extra.col,
	        row: extra.row
	      });
	      options = changeRange(options, "column", translate.column, {
	        column: extra.col,
	        row: extra.row
	      });
	      view.setCellFilter(row, col, options);
	      view.callEvent("onAction", ["filter", {
	        row: row,
	        column: col,
	        value: null,
	        newValue: {
	          options: options
	        }
	      }]);
	    }
	  } else {
	    view.setCellEditor(row, col, editor);
	    if (cutted === 1) view.setCellEditor(extra.row, extra.col, {});
	  }
	}
	function setFilter(view, row, column, range$$1, initial) {
	  if (!range$$1) range$$1 = {
	    end: {
	      row: row
	    }
	  };

	  if (range$$1.end) {
	    var endRow = range$$1.end.row;
	    range$$1 = getFilterRange(view, row, column, endRow);
	  }

	  view.setCellEditor(row, column, {
	    editor: "richselect",
	    options: range$$1,
	    useAsFilter: true
	  });
	  addCellFilter(view, row, column, initial);
	}

	function getFilterRange(view, row, column, endRow) {
	  if (row === endRow) {
	    for (endRow = row; endRow < view.config.rowCount; endRow++) {
	      if (!view.getCellValue(endRow + 1, column)) break;
	    }
	  }

	  return toRange(row + 1, column, endRow, column);
	}

	var m4 = /*#__PURE__*/Object.freeze({
		init: init$h,
		serialize: serialize$4,
		load: load$3,
		clearEditors: clearEditors,
		isFilter: isFilter,
		addCellFilter: addCellFilter,
		pasteDropdown: pasteDropdown,
		setFilter: setFilter
	});

	var styledata, clipdata, origin, cutted, updateFilters;
	function init$i(view) {
	  var keyC = 67; //keyboard 'c' code

	  var keyX = 88; //keyboard 'x' code

	  var grid = view.$$("cells");
	  grid.attachEvent("onKeyPress", function (code, e) {
	    if ((code === keyC || code === keyX) && (e.ctrlKey || e.metaKey) && grid.getSelectedId()) {
	      styledata = _get_sel_style(view, grid);
	      clipdata = document.getElementsByClassName("webix_clipbuffer")[0].value;
	      origin = grid.getSelectArea();
	      cutted = (code === keyX) * 1;
	      if (cutted && Object.keys(view._table._ssFilters).length !== 0) updateFilters = allFiltersInZone(view._table._ssFilters, origin, view.config.columnCount);
	    }
	  });

	  if (!view.config.readonly) {
	    grid.attachEvent("onPaste", function (text) {
	      _clip_to_sel(view, grid, text);
	    });
	  }
	}

	function _clip_to_sel(view, grid, text) {
	  var leftTop = grid.getSelectArea();
	  if (!leftTop) return;
	  var start = leftTop.start;
	  var fromSheet = text === clipdata;
	  var data = fromSheet ? styledata : webix.csv.parse(text, grid.config.delimiter);
	  if (!fromSheet && view.config.clipboardDecimalDelimiter) data = _changeDelimiter(data, view.config.clipboardDecimalDelimiter);
	  var translate = {
	    id: "move",
	    column: 0,
	    row: 0,
	    cut: cutted
	  };

	  if (fromSheet) {
	    translate.column = start.column - origin.start.column;
	    translate.row = start.row - origin.start.row;
	  } else {
	    cutted = 0;
	  }

	  group.set(function () {
	    if (updateFilters) view.removeFilter();

	    _add_row_col(view, start, data);

	    if (cutted === 1) {
	      for (var row = origin.start.row; row <= origin.end.row; row++) {
	        for (var column = origin.start.column; column <= origin.end.column; column++) {
	          view.setCellValue(row, column, null);
	          view.setStyle(row, column, null);
	        }
	      }
	    }

	    if (data.length == 1 && data[0].length == 1 && !updateFilters) {
	      view.eachSelectedCell(function (cell) {
	        var subtrans = {
	          id: "move",
	          column: translate.column + cell.column * 1 - start.column,
	          row: translate.row + cell.row * 1 - start.row,
	          cut: cutted
	        };

	        _clipboardToTable(view, cell.row, cell.column, data[0][0], fromSheet, subtrans);
	      });
	    } else {
	      grid.mapCells(start.row, start.column, data.length, null, function (value, row, col, row_ind, col_ind) {
	        if (data[row_ind] && data[row_ind].length > col_ind) {
	          var cdata = data[row_ind][col_ind];

	          _clipboardToTable(view, row, col, cdata, fromSheet, translate);
	        }
	      }, true);
	    }

	    if (cutted === 1) {
	      //cut and cleared
	      cutted = 2;
	      updateFilters = false;
	    }
	  });
	  view.refresh();
	}

	function _clipboardToTable(view, row, col, cdata, fromSheet, translate) {
	  var newValue = cdata;
	  var style = null;

	  if (_typeof(cdata) === "object") {
	    if (cdata.math) newValue = updateMath(cdata.math, translate, origin);else newValue = cdata.text;
	    style = cdata.style;
	    view.setStyle(row, col, style);
	    var extra = cdata.extra;

	    if (extra) {
	      if (extra.condition) pasteCondition(view, extra, row, col, cutted);
	      if (extra.dropdown) pasteDropdown(view, extra, row, col, cutted, translate, updateFilters);
	    }

	    pasteSpan(view, extra, row, col, cutted, translate);
	  }

	  view.setCellValue(row, col, newValue);
	}

	function _get_sel_style(view, grid) {
	  var data = [];
	  var row, last;
	  grid.mapSelection(function (value, id, col) {
	    if (id != last) {
	      row = [];
	      data.push(row);
	      last = id;
	    }

	    var item = grid.getItem(id);
	    var math = item["$" + col];
	    var obj = {
	      text: value,
	      math: math,
	      style: view.getStyle(id, col)
	    };
	    var condition = view.conditions.get(id, col);
	    var editor = view.getCellEditor(id, col);

	    var span = view._table.getSpan(id, col);

	    if (editor || condition || span) {
	      var extra = {
	        row: id,
	        col: col
	      };
	      if (condition) extra.condition = condition;
	      if (editor) extra.dropdown = {
	        editor: editor,
	        filter: !!isFilter(view, id, col)
	      };
	      if (span) extra.span = span;
	      obj.extra = extra;
	    }

	    row.push(obj);
	    return value;
	  });
	  return data;
	}

	function allFiltersInZone(extra, origin, columnCount) {
	  var filters = Object.keys(extra);
	  var startRow = Math.min.apply(null, filters);
	  var endRow = Math.max.apply(null, filters);
	  var startCol = columnCount;
	  var endCol = 1;

	  for (var i = startRow; i <= endRow; i++) {
	    if (extra[i]) {
	      var columns = Object.keys(extra[i]);
	      startCol = Math.min(startCol, Math.min.apply(null, columns));
	      endCol = Math.max(endCol, Math.max.apply(null, columns));
	    }
	  }

	  if (origin.start.row <= startRow && origin.end.row >= endRow && origin.start.column <= startCol && origin.end.column >= endCol) return true;else return false;
	} //dynamically increase rows and columns according to pasted data size


	function _add_row_col(view, start, data) {
	  var maxRow = start.row + data.length - 1;
	  var maxCol = start.column + data[0].length - 1;

	  if (maxRow > view.config.rowCount || maxCol > view.config.columnCount) {
	    var action = {
	      id: "add"
	    };

	    if (maxRow > view.config.rowCount) {
	      action.group = "row";
	      view.callEvent("onCommand", [action, {
	        row: view.config.rowCount + 1
	      }, {
	        row: maxRow
	      }]);
	    }

	    if (maxCol > view.config.columnCount) {
	      action.group = "column";
	      view.callEvent("onCommand", [action, {
	        column: view.config.columnCount + 1
	      }, {
	        column: maxCol
	      }]);
	    }
	  }
	}

	function _changeDelimiter(data, clipboardDecimalDelimiter) {
	  for (var i = 0; i < data.length; i++) {
	    for (var k = 0; k < data[i].length; k++) {
	      var record = data[i][k].toString().replace(clipboardDecimalDelimiter, ".");
	      if (webix.rules.isNumber(record)) data[i][k] = record;
	    }
	  }

	  return data;
	}

	var m6$1 = /*#__PURE__*/Object.freeze({
		init: init$i
	});

	function init$j(view) {
	  //parsing initial data
	  view.attachEvent("onDataParse", function (data) {
	    return _parse$3(view, data);
	  });
	  view.attachEvent("onDataSerialize", function (data, config) {
	    return _serialize$3(view, data, config);
	  }); // undo

	  view.attachEvent("onUndo", function (type, row, column, value) {
	    if (type == "value") _undoValue(view, row, column, value);
	  });
	}

	function _serialize$3(view, obj, config) {
	  var math = !config || config.math !== false;
	  var data = [];
	  var grid = view.$$("cells");
	  var state = grid.getState();
	  var columns = state.ids.concat(state.hidden); // remove "rowId" column

	  columns.splice(columns.indexOf("rowId"), 1);
	  grid.eachRow(function (obj) {
	    var item = this.getItem(obj);

	    for (var i = 0; i < columns.length; i++) {
	      var key = columns[i];
	      var value = item[key];
	      var css = item.$cellCss ? item.$cellCss[key] || "" : ""; //serialize instead of value if defined

	      if (math) value = item["$" + key] || value; //put not empty values in serialization

	      var hasValue = value || value === 0;

	      if (hasValue || css) {
	        data.push([obj * 1, key * 1, hasValue ? value : "", css]);
	      }
	    }
	  }, true);
	  obj.table = {
	    frozenColumns: view._frozenColumns || 0,
	    frozenRows: view._frozenRows || 0
	  };
	  obj.data = data;
	}

	function _parse$3(view, obj) {
	  var grid = view.$$("cells");
	  var tconfig = obj.table || {
	    frozenColumns: 0,
	    frozenRows: 0
	  };
	  view._frozenColumns = view._frozenRows = 0;

	  if (tconfig) {
	    if (!webix.isUndefined(tconfig.frozenColumns) && tconfig.frozenColumns + 1 != grid.config.leftSplit) view.freezeColumns(tconfig.frozenColumns);
	    if (!webix.isUndefined(tconfig.frozenRows) && tconfig.frozenRows != grid.config.topSplit) view.freezeRows(tconfig.frozenRows);
	  }

	  if (obj.sizes) grid.define("fixedRowHeight", false);

	  for (var i = 0; i < obj.data.length; i++) {
	    var _obj$data$i = _slicedToArray(obj.data[i], 4),
	        row = _obj$data$i[0],
	        column = _obj$data$i[1],
	        value = _obj$data$i[2],
	        style = _obj$data$i[3];

	    var item = grid.getItem(row);
	    item[column] = value;

	    if (style) {
	      item.$cellCss = item.$cellCss || {};
	      item.$cellCss[column] = style;
	    }

	    view.callEvent("onCellChange", [row, column, value]);
	  }
	}

	function _undoValue(view, row, column, value) {
	  view.setCellValue(row, column, value);
	}

	var m17 = /*#__PURE__*/Object.freeze({
		init: init$j
	});

	function init$k(view) {
	  view.attachEvent("onCommand", function (action) {
	    if (action.id == "show" || action.id == "hide") {
	      var sel = view._table.getSelectArea();

	      if (sel) process$1(action, sel.start, sel.end, view);
	    }
	  });
	  reset$7(view);
	  view.attachEvent("onUndo", function (action, row, column, value, direction) {
	    if ((action.id == "hide" || action.id == "show") && (action.group == "column" || action.group == "row")) {
	      var type = action.id;
	      if (!direction) type = type == "hide" ? "show" : "hide";
	      var obj = row || column;
	      process$1({
	        id: type,
	        group: action.group
	      }, obj.start, obj.end, view, true);
	    }
	  });
	  view.attachEvent("onHardReset", function () {
	    return reset$7(view);
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") _updatePosition(view, p.name, p.inc, p.data, p.start);
	  });
	}
	function reset$7(view, mode) {
	  if (mode) view["_hidden_" + mode + "_hash"] = {};else {
	    view._hidden_cols_hash = {};
	    view._hidden_rows_hash = {};
	  }
	}

	function getIds(id) {
	  return webix.isArray(id) ? id : [id, id];
	}

	function setColumnState(view, column, state) {
	  // hide
	  if (!column) {
	    var sel = view.getSelectedId(true),
	        action = {
	      id: state === false ? "show" : "hide",
	      group: "column"
	    };
	    if (sel.length) view.callEvent("onCommand", [action, sel[0], sel[sel.length - 1]]);
	  } else {
	    var ids = getIds(column);

	    if (!view._hidden_cols_hash[ids[0]] && (webix.isUndefined(state) || state)) {
	      _hideColumn({
	        id: "hide",
	        group: "column"
	      }, {
	        column: ids[0]
	      }, {
	        column: ids[1]
	      }, view);
	    } // show
	    else if (view._hidden_cols_hash[ids[0]] && (webix.isUndefined(state) || !state)) {
	        var inc = ids[0] > 1 ? 1 : -1;

	        _showColumn({
	          id: "show",
	          group: "column"
	        }, {
	          column: ids[0] + inc
	        }, {
	          column: ids[1] + inc
	        }, view);
	      }
	  }
	}
	function isColumnVisible(view, column) {
	  return !view._hidden_cols_hash[column];
	}
	function setRowState(view, row, state) {
	  // hide
	  if (!row) {
	    var sel = view.getSelectedId(true),
	        action = {
	      id: state === false ? "show" : "hide",
	      group: "row"
	    };
	    if (sel.length) view.callEvent("onCommand", [action, sel[0], sel[sel.length - 1]]);
	  } else {
	    var ids = getIds(row);

	    if (!view._hidden_rows_hash[ids[0]] && (webix.isUndefined(state) || state)) {
	      _hideRow({
	        id: "hide",
	        group: "row"
	      }, {
	        row: ids[0]
	      }, {
	        row: ids[1]
	      }, view);
	    } // show
	    else if (view._hidden_rows_hash[ids[0]] && (webix.isUndefined(state) || !state)) {
	        var inc = ids[0] > 1 ? 1 : -1;

	        _showRow({
	          id: "show",
	          group: "row"
	        }, {
	          row: ids[0] + inc
	        }, {
	          row: ids[1] + inc
	        }, view);
	      }
	  }
	}
	function isRowVisible(view, row) {
	  return !view._hidden_rows_hash[row];
	}
	function serialize$5(view, data) {
	  var hrows = [];
	  var hcols = [];

	  for (var r in view._hidden_rows_hash) {
	    hrows.push(r);
	  }

	  for (var c in view._hidden_cols_hash) {
	    hcols.push(c);
	  }

	  if (hrows.length || hcols.length) data.table.hidden = {};
	  if (hrows.length) data.table.hidden.row = hrows;
	  if (hcols.length) data.table.hidden.column = hcols;
	}
	function load$4(view, data) {
	  reset$7(view);

	  if (!webix.isUndefined(data.table) && !webix.isUndefined(data.table.hidden)) {
	    var hidden = data.table.hidden;

	    if (hidden.row && hidden.row.length) {
	      for (var r = 0; r < hidden.row.length; r++) {
	        _hideRow({
	          id: "hide",
	          group: "row"
	        }, {
	          row: hidden.row[r]
	        }, {
	          row: hidden.row[r]
	        }, view, true);
	      }
	    }

	    if (hidden.column && hidden.column.length) {
	      for (var c = 0; c < hidden.column.length; c++) {
	        _hideColumn({
	          id: "hide",
	          group: "column"
	        }, {
	          column: hidden.column[c]
	        }, {
	          column: hidden.column[c]
	        }, view, true);
	      }
	    }
	  }
	}

	function process$1(action) {
	  if (action.group == "column") {
	    if (action.id == "show") _showColumn.apply(this, arguments);else if (action.id == "hide") _hideColumn.apply(this, arguments);
	  } else if (action.group == "row") {
	    if (action.id == "show") _showRow.apply(this, arguments);else if (action.id == "hide") _hideRow.apply(this, arguments);
	  }
	}

	function _showColumn(action, start, end, view, silent) {
	  var i = end.column;
	  var grid = view.$$("cells");

	  while (i >= start.column) {
	    var id = i;
	    if (!silent) id = view._hidden_cols_hash[i * 1 - 1] || view._hidden_cols_hash[i * 1 + 1] || false;

	    if (id !== false) {
	      delete view._hidden_cols_hash[id];
	      var cell = grid.getColumnConfig(id - 1 || "rowId").header[0];
	      cell.css = cell.css.replace("webix_ssheet_hide_column", "");
	      grid.showColumn(id);
	      start.column = start.column < id ? start.column : id;
	      end.column = end.column > id ? end.column : id;
	      if (!silent) view.callEvent("onColumnOperation", [action, {
	        column: id
	      }, {
	        column: id
	      }, null]);
	    }

	    i--;
	  }
	}

	function _showRow(action, start, end, view, silent) {
	  var i = end.row;
	  var grid = view.$$("cells");
	  var split = view._frozenRows;

	  if (split + 1 >= start.row) {
	    //Frozen rows ignore filtering applied to the datatable
	    view.freezeRows(0);
	  }

	  while (i >= start.row) {
	    var id = i;
	    if (!silent) id = view._hidden_rows_hash[i * 1 - 1] || view._hidden_rows_hash[i * 1 + 1] || false;

	    if (id !== false) {
	      delete view._hidden_rows_hash[id];

	      if (id - 1 === 0) {
	        var cell = view.$$("cells").getColumnConfig("rowId").header[0];
	        cell.css = cell.css.replace("webix_ssheet_hide_row", "");
	        grid.refreshColumns();
	      } else {
	        grid.removeCellCss(id - 1, "rowId", "webix_ssheet_hide_row");
	      }

	      if (!silent) view.callEvent("onRowOperation", [action, {
	        row: id
	      }, {
	        row: id
	      }, null]);
	    }

	    i--;
	  }

	  grid.filter(function (obj) {
	    return !view._hidden_rows_hash[obj.id];
	  });
	  if (split + 1 >= start.row) view.freezeRows(split);
	}

	function _hideColumn(action, start, end, view, silent) {
	  var i = end.column;
	  view.$handleSelection = null;
	  view.$$("cells").unselect();

	  if (end.column < 1 || start.column < 1) {
	    delete view._hidden_cols_hash[start.column];
	    return;
	  }

	  while (i >= start.column) {
	    view._hidden_cols_hash[i] = i;
	    var cell = view.$$("cells").getColumnConfig(i - 1 || "rowId").header[0];
	    cell.css = (cell.css || "") + " webix_ssheet_hide_column";
	    view.$$("cells").hideColumn(i);
	    i--;
	  }

	  if (!silent) view.callEvent("onColumnOperation", [action, start, end, null]);
	}

	function _hideRow(action, start, end, view, silent) {
	  var grid = view.$$("cells");
	  var i = end.row;

	  if (end.row < 1 || start.row < 1) {
	    delete view._hidden_rows_hash[start.row];
	    return;
	  }

	  var split = view._frozenRows;

	  if (split >= start.row) {
	    //Frozen rows ignore filtering applied to the datatable
	    view.freezeRows(0);
	  }

	  while (i >= start.row) {
	    view._hidden_rows_hash[i] = i;

	    if (i - 1 === 0) {
	      var cell = grid.getColumnConfig("rowId").header[0];
	      cell.css = (cell.css || "") + " webix_ssheet_hide_row";
	      grid.refreshColumns();
	    } else {
	      grid.addCellCss(i - 1, "rowId", "webix_ssheet_hide_row");
	    }

	    i--;
	  }

	  grid.filter(function (obj) {
	    return !view._hidden_rows_hash[obj.id];
	  });
	  if (split >= start.row) view.freezeRows(split);
	  if (!silent) view.callEvent("onRowOperation", [action, start, end, null]);
	}

	function _updatePosition(view, name, inc, data, start) {
	  if (data.table && data.table.hidden && data.table.hidden[name] && data.table.hidden[name].length) {
	    if (name === "column") reset$7(view, "cols");
	    if (name === "row") reset$7(view, "rows");
	    var s = start[name],
	        e = s + inc;

	    if (s > e) {
	      var _ref = [e, s];
	      s = _ref[0];
	      e = _ref[1];
	    }

	    for (var i = s; i < e; i++) {
	      for (var h = 0; h < data.table.hidden[name].length; h++) {
	        if (data.table.hidden[name][h] >= i) data.table.hidden[name][h] = data.table.hidden[name][h] * 1 + (inc > 0 ? 1 : -1);
	      }
	    }
	  }
	}

	var m7 = /*#__PURE__*/Object.freeze({
		init: init$k,
		reset: reset$7,
		setColumnState: setColumnState,
		isColumnVisible: isColumnVisible,
		setRowState: setRowState,
		isRowVisible: isRowVisible,
		serialize: serialize$5,
		load: load$4
	});

	function init$l(view) {
	  if (view.config.resizeCell) {
	    var grid = view.$$("cells");
	    grid.define("resizeRow", {
	      headerOnly: true,
	      size: 10
	    });
	    grid.define("resizeColumn", {
	      headerOnly: true,
	      size: 10
	    });
	    grid.define("fixedRowHeight", false);
	    grid.attachEvent("onRowResize", function (id) {
	      view.$$("cells").refreshSelectArea();
	      save(view, "sizes", {
	        row: id,
	        column: 0,
	        size: view.getRow(id).$height
	      });
	    });
	    grid.attachEvent("onColumnResize", function (id) {
	      view.$$("cells").refreshSelectArea();
	      save(view, "sizes", {
	        row: 0,
	        column: id,
	        size: view.getColumn(id).width
	      });
	    }); // undo

	    view.attachEvent("onUndo", function (type, row, column, value) {
	      if (type == "c-resize" || type == "r-resize") _undoResize(view, row, column, value);
	    });
	  }

	  view.attachEvent("onDataParse", function (data) {
	    if (data.sizes) {
	      for (var i = 0; i < data.sizes.length; i++) {
	        var size = data.sizes[i];

	        if (size[0] * 1 !== 0) {
	          var row = view.getRow(size[0]);
	          if (row) row.$height = size[2] * 1;
	        } else {
	          var col = view.getColumn(size[1]);
	          if (col) col.width = size[2] * 1;
	        }
	      }

	      if (data.sizes.length) view.refresh(true);
	    }
	  });
	  view.attachEvent("onDataSerialize", function (data) {
	    var sizes = [];
	    var grid = view.$$("cells");
	    var columns = grid.getState().order;
	    var order = grid.data.order;
	    var defWidth = grid.config.columnWidth;
	    var defHeight = grid.config.rowHeight;

	    for (var i = 1; i < columns.length; i++) {
	      var width = grid.getColumnConfig(columns[i]).width;
	      if (width && width != defWidth) sizes.push([0, i, width]);
	    }

	    for (var _i = 0; _i < order.length; _i++) {
	      var height = grid.getItem(order[_i]).$height;
	      if (height && height != defHeight) sizes.push([order[_i] * 1, 0, height]);
	    }

	    data.sizes = sizes;
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$5(p.name, p.inc, p.data, p.start);
	  });
	  view.attachEvent("onBeforeStyleChange", function (row, column, n, o) {
	    if (o && o.props.wrap === "wrap" && (!n || n.props.wrap != o.props.wrap)) {
	      delete view._table.getItem(row).$height;
	    }
	  });
	  view.attachEvent("onStyleChange", _adjustRowHeight);
	  view.attachEvent("onCellChange", _adjustRowHeight);
	}

	function _undoResize(view, row, column, value) {
	  if (row) {
	    view.$$("cells").getItem(row).$height = value;
	    save(view, "sizes", {
	      row: row,
	      column: 0,
	      size: value
	    });
	  } else {
	    view._table.setColumnWidth(column, value);
	  } // update area selection


	  view._table.refreshSelectArea();
	}

	function updatePosition$5(name, inc, data, start) {
	  var i,
	      sizes = data.sizes,
	      nsizes = [];

	  if (inc) {
	    for (i = sizes.length - 1; i >= 0; i--) {
	      var _sizes$i = _slicedToArray(sizes[i], 3),
	          row = _sizes$i[0],
	          column = _sizes$i[1],
	          size = _sizes$i[2];

	      if (row && name == "row" && row >= start.row || column && name == "column" && column >= start.column) {
	        //moving row|column index
	        row = name == "row" ? row * 1 + inc : row;
	        column = name == "column" ? column * 1 + inc : column;
	        if (name == "row" && row > 0 || name == "column" && column > 0) nsizes.push([row, column, size]);
	      } else //row, column not affected by resize
	        nsizes.push(sizes[i]);
	    }

	    data.sizes = nsizes;
	  }
	}

	function _adjustRowHeight(row, column) {
	  var view = this;
	  var style = getStyle(view, {
	    row: row,
	    column: column
	  }); //changing styles or content of wrapped cell -> resize the related row

	  if (style && style.props.wrap) {
	    var item = view._table.getItem(row);

	    var height = item.$height || view._table.config.rowHeight;

	    view._table.eachColumn(function (col, config) {
	      var style = getStyle(view, {
	        row: row,
	        column: col
	      }); //include only cells with active wrap into calculation 

	      if (style && style.props && style.props.wrap === "wrap") {
	        var text = this.getText(row, col);
	        height = Math.max(height, getTextSize(view, text, style.id, config.width).height);
	      }
	    });

	    item.$height = height;
	  }
	}

	var m3$1 = /*#__PURE__*/Object.freeze({
		init: init$l
	});

	function init$m(view) {
	  var table = view._table;
	  var bs = 0;
	  table.attachEvent("onAreaDrag", function () {
	    return bs = new Date();
	  });
	  table.attachEvent("onBeforeAreaRemove", function () {
	    //[FIXME] currently we don't have enough info to know
	    //is user selects new area, and removing need to be blocked
	    //or is it some API which attempts to remove the area
	    if (view.$handleSelection && new Date() - bs < 500) return false;
	  });
	  table.attachEvent("onBeforeAreaAdd", function (area) {
	    //[FIXME] 
	    //block selection of row-id column
	    //temporary fix, we need to fire onBeforeBlockSelect when selection moves
	    //so the common onBeforeBlockSelect handler will block rowId selection
	    if (area.start.column == "rowId") return false; //if we have an active editor, we need to close it on block selection
	    //ignore, when selecting the editor's cell

	    var editor = table.getEditor();
	    if (editor && (editor.row != area.start.row || editor.column != area.start.column || editor.row != area.start.row || editor.column != area.start.column)) table.editStop();
	    if (!view.$handleSelection) return true;
	    var blockStart = encode[area.start.column] + area.start.row;
	    var blockEnd = encode[area.end.column] + area.end.row;
	    var res = view.$handleSelection(area.start, area.end, blockStart, blockEnd);

	    if (res !== false) {
	      view.$handleSelection = null;
	      table.removeSelectArea();
	    }

	    return res;
	  });
	  webix.event(table.$view, "mousedown", function (e) {
	    if (view.$handleSelection) return webix.html.preventEvent(e);
	  });
	}

	var m9 = /*#__PURE__*/Object.freeze({
		init: init$m
	});

	function expandSelection(r, view) {
	  var maxY = view.config.rowCount;
	  var maxX = view.config.columnCount;
	  var table = view._table;
	  var nr1 = r.start.row,
	      nr2 = r.end.row,
	      nc1 = r.start.column,
	      nc2 = r.end.column;

	  for (var i = nr1 - 1; i > 0; i--) {
	    if (getValue(i, r.start.column, table)) nr1 = i;else break;
	  }

	  for (var _i = nr2 + 1; _i < maxY; _i++) {
	    if (getValue(_i, r.end.column, table)) nr2 = _i;else break;
	  }

	  for (var _i2 = nc1 - 1; _i2 > 0; _i2--) {
	    if (getValue(r.start.row, _i2, table)) nc1 = _i2;else break;
	  }

	  for (var _i3 = nc2 + 1; _i3 < maxX; _i3++) {
	    if (getValue(r.end.row, _i3, table)) nc2 = _i3;else break;
	  }

	  var newrange = {
	    start: {
	      row: nr1,
	      column: nc1
	    },
	    end: {
	      row: nr2,
	      column: nc2
	    }
	  };

	  if (nr1 != r.start.row || nr2 != r.end.row || nc1 != r.start.column || nc2 != r.end.column) {
	    view._table.addSelectArea(newrange.start, newrange.end);
	  }

	  return newrange;
	}

	function getValue(r, c, table) {
	  var value = table.getItem(r)[c];

	  if (value === undefined || value === "") {
	    return false;
	  } else {
	    return true;
	  }
	}

	function init$n(view) {
	  view.attachEvent("onCommand", function (cm) {
	    if (cm.id === "sort-asc" || cm.id === "sort-desc") sortRange(view, null, cm.id.replace("sort-", ""));
	  });
	}
	var sorters = {
	  "int": function (dir, key) {
	    return function (a, b) {
	      var c = parseFloat(a[key]) || -Infinity;
	      var d = parseFloat(b[key]) || -Infinity;
	      return (c > d ? 1 : c == d ? 0 : -1) * dir;
	    };
	  },
	  "str": function (dir, key) {
	    return function (a, b) {
	      var c = (a[key] || "").toString().toLowerCase();
	      var d = (b[key] || "").toString().toLowerCase();
	      return (c > d ? 1 : c == d ? 0 : -1) * dir;
	    };
	  }
	};
	function sortRange(view, range$$1, dir, type) {
	  range$$1 = range$$1 || view._table.getSelectArea();

	  if (range$$1) {
	    range$$1 = rangeObj(range$$1, view);
	    var fullrange = range$$1;
	    if (range$$1.start.row === range$$1.end.row) fullrange = expandSelection(range$$1, view);
	    var key = view.getRow(range$$1.start.row)[range$$1.start.column];
	    type = type || (isNaN(parseFloat(key)) ? "str" : "int");
	    dir = !dir || dir === "asc" ? 1 : -1;
	    group.set(function () {
	      return sort(fullrange, range$$1.start.column, type, dir, view);
	    });
	  }
	}

	function sort(range$$1, by, type, dir, view) {
	  for (var column = range$$1.start.column; column <= range$$1.end.column; column++) {
	    //get all selected column values
	    var values = [];

	    for (var row = range$$1.start.row; row <= range$$1.end.row; row++) {
	      if (view.isRowVisible(row)) {
	        var fullRow = view.getRow(row);
	        var value = fullRow[column];
	        var style = view.getStyle(row, column);
	        var math = fullRow["$" + column];
	        var conditions = view.conditions.get(row, column);
	        if (conditions) _changeCondition("remove", row, column, conditions, null, view);
	        values.push({
	          value: value,
	          style: style,
	          math: math,
	          row: row,
	          conditions: conditions
	        });
	      }
	    } //sort them


	    values.sort(sorters[type](dir, "value")); //set new values to original column

	    for (var _row = range$$1.start.row; _row <= range$$1.end.row; _row++) {
	      if (view.isRowVisible(_row)) {
	        var element = values.shift();
	        view.setStyle(_row, column, element.style || null);
	        if (element.conditions) _changeCondition("update", _row, column, null, element.conditions, view);
	        if (!element.math) view.setCellValue(_row, column, element.value);else {
	          var translate = {
	            id: "move",
	            row: _row - element.row,
	            column: 0
	          };
	          var newMath = updateMath(element.math, translate);
	          view.setCellValue(_row, column, newMath);
	        }
	      }
	    }
	  }

	  view.refresh();
	}

	var m10 = /*#__PURE__*/Object.freeze({
		init: init$n,
		sortRange: sortRange
	});

	function init$o(view) {
	  view.attachEvent("onUndo", function (action, row, column, value) {
	    if (action == "gridlines-hide") {
	      hideGridlines(view, value);
	    }
	  });
	}
	function hideGridlines(view) {
	  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var grid = view.$$("cells");
	  var borderless = grid.$view.className.indexOf("webix_borderless") != -1;
	  if (state === "toggle") state = !borderless;

	  if (!borderless && state) {
	    webix.html.addCss(grid.$view, "webix_borderless", true);
	    view.callEvent("onAction", ["gridlines-hide", {
	      newValue: true,
	      value: false
	    }]);
	  } else if (borderless && !state) {
	    webix.html.removeCss(grid.$view, "webix_borderless");
	    view.callEvent("onAction", ["gridlines-hide", {
	      newValue: false,
	      value: true
	    }]);
	  }
	}
	function serialize$6(view, data) {
	  data.table.gridlines = view.$$("cells").$view.className.indexOf("webix_borderless") != -1 ? 0 : 1;
	}
	function load$5(view, data) {
	  var mode = false;
	  if (!webix.isUndefined(data.table) && !webix.isUndefined(data.table.gridlines)) mode = !data.table.gridlines;
	  hideGridlines(view, mode);
	}

	var m1$1 = /*#__PURE__*/Object.freeze({
		init: init$o,
		hideGridlines: hideGridlines,
		serialize: serialize$6,
		load: load$5
	});

	function init$p(view) {
	  view.attachEvent("onUndo", function (action, row, column, value) {
	    if (action == "header-hide") {
	      hideHeaders(view, value);
	    }
	  });
	}
	function hideHeaders(view) {
	  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var grid = view.$$("cells");
	  if (state === "toggle") state = grid.config.header;

	  if (grid.config.header && state) {
	    grid.config.header = false;
	    if (grid.isColumnVisible("rowId")) grid.hideColumn("rowId", {}, true, true);
	    grid.refreshColumns();
	    view.callEvent("onAction", ["header-hide", {
	      newValue: true,
	      value: false
	    }]);
	  } else if (!grid.config.header && !state) {
	    grid.config.header = true;
	    if (!grid.isColumnVisible("rowId")) grid.showColumn("rowId", {}, true);
	    grid.refreshColumns();
	    view.callEvent("onAction", ["header-hide", {
	      newValue: false,
	      value: true
	    }]);
	  }
	}
	function serialize$7(view, data) {
	  data.table.headers = view.$$("cells").config.header ? 1 : 0;
	}
	function load$6(view, data) {
	  var mode = false;
	  if (data.table && !webix.isUndefined(data.table.headers)) mode = !data.table.headers;
	  hideHeaders(view, mode);
	}

	var m2$1 = /*#__PURE__*/Object.freeze({
		init: init$p,
		hideHeaders: hideHeaders,
		serialize: serialize$7,
		load: load$6
	});

	function init$q(view) {
	  view.attachEvent("onCommand", function (cm) {
	    if (cm.id === "create-filter") filter(view);
	  });
	  view.attachEvent("onUndo", function (type, row, column, value) {
	    if (type === "filter") {
	      if (!value) view.removeFilter();else view.setCellFilter(row, column, value.options);
	    } else if (type == "dropdown") {
	      view.setCellEditor(row, column, value);
	    }
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$6(p.name, p.inc, p.data, p.start);
	  });
	}
	function getFilters(table) {
	  var filters = table._ssFilters;
	  var all = [];

	  for (var row in filters) {
	    for (var column in filters[row]) {
	      all.push(filters[row][column]);
	    }
	  }

	  return all;
	}
	function serialize$8(view, data) {
	  var filters = getFilters(view._table);
	  var editors = view._table._ssEditors;
	  var result = data.filters = [];

	  for (var i = 0; i < filters.length; i++) {
	    var _filters$i = _slicedToArray(filters[i], 2),
	        row = _filters$i[0],
	        column = _filters$i[1];

	    var options = editors[row][column].options;
	    if (options) result.push([row, column, options]);
	  }
	}
	function load$7(view, data) {
	  var i,
	      filters = data.filters;

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      setFilter(view, filters[i][0], filters[i][1], filters[i][2], true);
	    }

	    view.filterSpreadSheet();
	  }
	}

	function filter(view, range$$1) {
	  range$$1 = range$$1 || view._table.getSelectArea();
	  group.set(function () {
	    view.removeFilter();
	    if (!range$$1) return;
	    var row = range$$1.start.row;

	    for (var i = range$$1.start.column; i <= range$$1.end.column; i++) {
	      view.setCellFilter(row, i, range$$1);
	      view.callEvent("onAction", ["filter", {
	        row: row,
	        column: i,
	        value: null,
	        newValue: range$$1
	      }]);
	    }
	  });
	}

	function updatePosition$6(name, inc, data, start) {
	  var i,
	      filters = data.filters;

	  if (inc) {
	    for (i = filters.length - 1; i >= 0; i--) {
	      var _filters$i2 = _slicedToArray(filters[i], 3),
	          row = _filters$i2[0],
	          column = _filters$i2[1],
	          range$$1 = _filters$i2[2];

	      if (name == "row" && row >= start.row || name == "column" && column >= start.column) {
	        filters[i][0] = name == "row" ? row * 1 + inc : row;
	        filters[i][1] = name == "column" ? column * 1 + inc : column;
	        filters[i][2] = changeRange(range$$1, name, inc, start);
	      }
	    }
	  }
	}

	var m5$1 = /*#__PURE__*/Object.freeze({
		init: init$q,
		getFilters: getFilters,
		serialize: serialize$8,
		load: load$7
	});

	function init$r(view) {
	  view.comments = {
	    get: function (row, column) {
	      return getComment(view, row, column);
	    },
	    add: function (row, column, comment) {
	      commentCell(view, row, column, comment);
	    },
	    remove: function (row, column) {
	      removeComment(view, row, column);
	    },
	    _activeComment: {},
	    _pull: {}
	  };
	  view.attachEvent("onReset", function () {
	    return reset$8(view);
	  });
	  view.attachEvent("onUndo", function (type, row, column, value) {
	    if (type === "comment") _undoComment(view, row, column, value);
	  });
	  view.attachEvent("onAction", function (action, p) {
	    if (action == "before-grid-change") updatePosition$7(p.name, p.inc, p.data, p.start);
	  });
	}

	function _undoComment(view, row, column, value) {
	  if (getComment(view, row, column)) removeComment(view, row, column, true);
	  if (value) commentCell(view, row, column, value, true);
	}

	function reset$8(view) {
	  view.comments._pull = {};
	}

	function removeComment(view, row, column, silent) {
	  if (getComment(view, row, column)) {
	    if (!silent) view.callEvent("onAction", ["comment", {
	      row: row,
	      column: column,
	      newValue: null,
	      value: view.comments._pull[row][column]
	    }]);
	    delete view.comments._pull[row][column];
	  }

	  view.$$("cells").updateItem(row, column);
	}

	function removeCommentsRange(view, range$$1) {
	  group.set(function () {
	    eachRange(range$$1, view, function (view, cell) {
	      if (getComment(view, cell.row, cell.column)) removeComment(view, cell.row, cell.column);
	    });
	    view.$$("cells").refresh();
	  });
	}

	function commentCell(view, row, column, comment, silent) {
	  var oldValue = getComment(view, row, column) ? view.comments._pull[row][column] : null;
	  var table = view.$$("cells");
	  if (typeof comment == "string") comment = comment.trim() ? comment : "";
	  view.comments._pull[row] = view.comments._pull[row] ? view.comments._pull[row] : {};
	  view.comments._pull[row][column] = comment;
	  table.addCellCss(row, column, "ssheet_commented_cell");
	  if (!silent) view.callEvent("onAction", ["comment", {
	    row: row,
	    column: column,
	    newValue: comment,
	    value: oldValue
	  }]);
	}

	function serialize$9(view, data) {
	  var row,
	      column,
	      comments = [];

	  for (row in view.comments._pull) {
	    for (column in view.comments._pull[row]) {
	      if (view.comments._pull[row][column]) comments.push([row, column, view.comments._pull[row][column]]);
	    }
	  }

	  data.comments = comments;
	}
	function load$8(view, data) {
	  var i,
	      comments = data.comments;
	  if (comments) for (i = 0; i < comments.length; i++) {
	    commentCell(view, comments[i][0], comments[i][1], comments[i][2], true);
	  }
	}

	function updatePosition$7(name, inc, data, start) {
	  var comments = data.comments,
	      i = comments.length;

	  if (inc) {
	    while (i--) {
	      var _comments$i = _slicedToArray(comments[i], 2),
	          row = _comments$i[0],
	          column = _comments$i[1];

	      if (row && name == "row" && row >= start.row || column && name == "column" && column >= start.column) {
	        if (name == "row") {
	          if (row < start.row - inc) //delete comment if row was deleted
	            comments.splice(i, 1);else //update mark position if upper row was deleted
	            comments[i][0] = row * 1 + inc;
	        } else if (name == "column") {
	          if (column < start.column - inc) {
	            comments.splice(i, 1);
	          } else comments[i][1] = column * 1 + inc;
	        }
	      }
	    }
	  }
	}

	function getComment(view, row, column) {
	  return view.comments._pull[row] && view.comments._pull[row][column] ? view.comments._pull[row][column] : "";
	}

	var m8 = /*#__PURE__*/Object.freeze({
		init: init$r,
		removeCommentsRange: removeCommentsRange,
		serialize: serialize$9,
		load: load$8
	});

	function init$s(view) {
	  var modules = [m1$1, m2$1, m3, m4, m5$1, m6, m7, m8];
	  view.attachEvent("onDataSerialize", function (data) {
	    for (var i = 0; i < modules.length; i++) {
	      if (modules[i].serialize) modules[i].serialize(view, data);
	    }
	  });
	  view.attachEvent("onDataParse", function (data) {
	    view._loading_data = true;

	    for (var i = 0; i < modules.length; i++) {
	      if (modules[i].load) modules[i].load(view, data);
	    }

	    view._loading_data = false;
	  });
	}

	var m19 = /*#__PURE__*/Object.freeze({
		init: init$s
	});

	var types$1 = [".xls", ".xlt", ".xla", ".xlsx", ".xlsm", ".xltx", ".xltm", ".xlam", ".xlsb"];
	function init$t(view) {
	  var uploader;

	  if (window.XMLHttpRequest && new XMLHttpRequest().upload) {
	    uploader = webix.ui({
	      view: "uploader",
	      apiOnly: true,
	      accept: types$1.join()
	    });
	    uploader.attachEvent("onBeforeFileAdd", webix.bind(function (upload) {
	      if (types$1.indexOf("." + upload.type.toLowerCase()) > -1) {
	        view.reset();
	        view.parse(upload.file, "excel");
	      }

	      return false;
	    }, this));
	  }

	  view.attachEvent("onCommand", function (obj) {
	    if (obj.id === "excel-import") startImport(view, uploader);
	  });
	}

	function startImport(view, uploader) {
	  if (!uploader) webix.alert(webix.i18n.spreadsheet.labels["import-not-support"]);else webix.delay(function () {
	    return uploader.fileDialog();
	  });
	}

	var m20 = /*#__PURE__*/Object.freeze({
		init: init$t
	});

	function print(view, options) {
	  var active = view._activeSheet;

	  var html = _buildHtml(view, options, active);

	  webix.html.insertBefore(html, options.docFooter, document.body);
	  window.print();

	  _cleanHtml(view, html);

	  view.showSheet(active);
	}
	function init$u(view) {
	  view.$customPrint = function (options) {
	    print(view, options);
	  };
	}

	function _cleanHtml(view, html) {
	  webix.html.remove(html);

	  view._sheets.forEach(function (sheet, i) {
	    webix.html.removeStyle(".wss_" + view.$index + "_" + i);
	  });
	}

	function _buildHtml(view, options, active) {
	  var doc = webix.html.create("div", {
	    "class": "webix_ssheet_print"
	  });
	  options.xCorrection = 1;
	  options.header = options.header || false;
	  options.trim = webix.isUndefined(options.trim) ? true : options.trim;
	  options.sheetnames = webix.isUndefined(options.sheetnames) ? true : options.sheetnames;
	  var baseIndex = view.$index;

	  view._sheets.forEach(function (sheet, i) {
	    view.$index = baseIndex + "_" + i;

	    if (options.data === "all" || options.data !== "all" && sheet.name === active) {
	      view.showSheet(sheet.name);
	      var prefix = "wss_" + view.$index;

	      if (options.sheetnames) {
	        var sheetname = webix.html.create("div", {
	          "class": "webix_view webix_ssheet_sheetname"
	        }, sheet.name + ":");
	        doc.appendChild(sheetname);
	      }

	      var table = view._table.$customPrint(options, true); //for empty sheet we don't have any HTML


	      if (table.firstChild) table.firstChild.className += " " + prefix;
	      doc.appendChild(table);

	      if (options.data == "all" && i + 1 < view._sheets.length) {
	        var br = webix.html.create("DIV", {
	          "class": "webix_print_pagebreak"
	        });
	        doc.appendChild(br);
	      }
	    }
	  });

	  view.$index = baseIndex;
	  return doc;
	}

	var m22 = /*#__PURE__*/Object.freeze({
		print: print,
		init: init$u
	});

	function init$v(view) {
	  view.$exportView = function (options) {
	    webix.extend(options, {
	      header: false,
	      rawValues: true,
	      spans: true,
	      styles: true,
	      math: true,
	      xCorrection: 1,
	      ignore: {
	        rowId: true
	      }
	    });
	    if (options.export_mode == "excel") return _exportExcel(view, options);else return view._table;
	  };
	}

	function _exportExcel(view, options) {
	  if (options.sheets === true) options.sheets = view._sheets.map(function (s) {
	    return s.name;
	  });else if (!options.sheets || !options.sheets.length) options.sheets = [view._activeSheet];else if (typeof options.sheets == "string") options.sheets = [options.sheets];
	  options.dataOnly = true;
	  var data = [];
	  var active = view._activeSheet;

	  for (var i = 0; i < options.sheets.length; i++) {
	    view.showSheet(options.sheets[i]);
	    options.xCorrection = view.$$("cells").config.header ? 1 : 0;
	    data = data.concat(webix.toExcel(view._table, options));
	    data[i].ranges = [];
	    var ranges = view.ranges.getRanges();

	    for (var r = 0; r < ranges.length; r++) {
	      data[i].ranges.push({
	        Sheet: i,
	        Name: ranges[r].name,
	        Ref: options.sheets[i] + "!" + ranges[r].range.replace(/(\w)/gi, function (match) {
	          return "$" + match;
	        })
	      });
	    }

	    if (options.styles) data[i].styles = _getStyles(view, options);
	  }

	  view.showSheet(active);
	  delete options.dataOnly;
	  return data;
	}

	function _safeColor(str) {
	  str = str.substring(1);
	  if (str.length === 3) str = str + str;
	  return str;
	}

	function _getDefaults() {
	  var d = defaultStyles;
	  return {
	    font: {
	      sz: d["font-size"].replace("px", "") * 0.75,
	      name: d["font-family"].replace(/'|,.*$/g, "") //we do not export default color, but it is the right place to do it

	    },
	    alignment: {
	      horizontal: d["text-align"],
	      vertical: d["vertical-align"],
	      wrapText: d["white-space"] != "nowrap"
	    }
	  };
	}

	function _getStyles(view, options) {
	  view.compactStyles();
	  var result = [];
	  var cached = {};

	  var defaults = _getDefaults();

	  if (options.docHeader) result = result.concat([{
	    0: _getDocStyle(options.docHeader.css, defaults)
	  }, {}]);
	  if (options.header) result.push({});
	  var delta = result.length;
	  var grid = view.$$("cells");
	  var columns = grid.config.columns;
	  var rIndex = delta;
	  grid.eachRow(function (row) {
	    for (var cIndex = options.xCorrection; cIndex < columns.length; cIndex++) {
	      var css = view.getStyle(row, columns[cIndex].id);
	      result[rIndex] = result[rIndex] || {};
	      if (css) result[rIndex][cIndex - options.xCorrection] = cached[css.id] = cached[css.id] || _getCellStyle(css.text);else result[rIndex][cIndex - options.xCorrection] = defaults;
	    }

	    rIndex++;
	  });
	  if (options.docFooter) result = result.concat([{}, {
	    0: _getDocStyle(options.docFooter.css, defaults)
	  }]);
	  return result;
	}

	function _getCellStyle(styles) {
	  var str = styles.split(";"),
	      stl = {
	    font: {},
	    alignment: {},
	    border: {}
	  };

	  for (var s = 0; s < str.length; s++) {
	    if (str[s]) {
	      switch (style_names[s]) {
	        case "color":
	          stl.font.color = {
	            rgb: _safeColor(str[s])
	          };
	          break;

	        case "background":
	          {
	            var fill = _safeColor(str[s]);

	            if (fill && fill.toLowerCase() !== "ffffff") stl.fill = {
	              fgColor: {
	                rgb: fill
	              }
	            };
	            break;
	          }

	        case "text-align":
	          stl.alignment.horizontal = str[s];
	          break;

	        case "font-family":
	          stl.font.name = str[s].replace(/'|,.*$/g, ""); // cut off fallback font

	          break;

	        case "font-size":
	          stl.font.sz = str[s].replace("px", "") * 0.75; //px to pt conversion

	          break;

	        case "font-style":
	          stl.font.italic = true;
	          break;

	        case "text-decoration":
	          stl.font.underline = true;
	          break;

	        case "font-weight":
	          stl.font.bold = true;
	          break;

	        case "vertical-align":
	          stl.alignment.vertical = str[s] == "middle" ? "center" : str[s];
	          break;

	        case "wrap":
	          stl.alignment.wrapText = str[s] == "wrap";
	          break;

	        case "borders":
	          break;

	        case "format":
	          stl.format = getFormatSource(str[s], true) || "";
	          break;

	        case "border-right":
	          stl.border.right = {
	            color: {
	              rgb: _safeColor(str[s])
	            },
	            style: "thin"
	          };
	          break;

	        case "border-bottom":
	          stl.border.bottom = {
	            color: {
	              rgb: _safeColor(str[s])
	            },
	            style: "thin"
	          };
	          break;

	        case "border-left":
	          stl.border.left = {
	            color: {
	              rgb: _safeColor(str[s])
	            },
	            style: "thin"
	          };
	          break;

	        case "border-top":
	          stl.border.top = {
	            color: {
	              rgb: _safeColor(str[s])
	            },
	            style: "thin"
	          };
	          break;
	      }
	    }
	  }

	  return stl;
	}

	function _getDocStyle(css) {
	  if (!css) return {};
	  var str = [];

	  for (var i = 0; i < style_names.length; i++) {
	    str.push(css[style_names[i]] || "");
	  }

	  return _getCellStyle(str.join(";"));
	}

	var m23 = /*#__PURE__*/Object.freeze({
		init: init$v
	});

	function init$w(view) {
	  view._parseExcel = function (obj, driver) {
	    var options = obj.options || {};
	    options.math = view.config.math;
	    var full = {
	      sheets: []
	    };

	    for (var i = 0; i < obj.names.length; i++) {
	      options.name = obj.names[i];
	      full.sheets.push({
	        name: options.name,
	        content: _excel_to_data(driver.getSheet(obj, options), obj.ranges, i)
	      });
	    }

	    return full;
	  };

	  view._parseCsv = function (obj, driver) {
	    obj = driver.getRecords(obj);
	    var dataObj = webix.copy(obj);
	    var data = [];

	    for (var i = 0; i < dataObj.length; i++) {
	      var item = dataObj[i].split(driver.cell);

	      for (var c = 0; c < item.length; c++) {
	        var row = i + 1,
	            column = c + 1;
	        data.push([row, column, item[c]]);
	      }
	    }

	    return {
	      data: data
	    };
	  };
	}

	function _excel_to_data(obj, ranges, index) {
	  var dataObj = webix.copy(obj.data);
	  var data = [];

	  for (var i = 0; i < dataObj.length; i++) {
	    for (var c = 0; c < dataObj[0].length; c++) {
	      var row = i + 1,
	          column = c + 1;
	      data.push([row, column, dataObj[i][c]]);
	    }
	  }

	  obj.data = data; //merged cells

	  if (obj.spans) {
	    for (var _i = 0; _i < obj.spans.length; _i++) {
	      obj.spans[_i][0]++;
	      obj.spans[_i][1]++;
	    }
	  } //named ranges


	  if (ranges) {
	    for (var r = 0; r < ranges.length; r++) {
	      //we don't support global named ranges, so import only sheet-based :(
	      if (ranges[r].Sheet === index) {
	        obj.ranges = obj.ranges || [];
	        obj.ranges.push([ranges[r].Name.toUpperCase(), ranges[r].Ref.substring(ranges[r].Ref.indexOf("!") + 1).replace(/\$/g, "")]);
	      }
	    }
	  } //cell styles


	  if (obj.styles) obj = _getStyles$1(obj); //column width and row height

	  if (obj.sizes) {
	    for (var _i2 = 0; _i2 < obj.sizes.length; _i2++) {
	      if (obj.sizes[_i2][0] == "column") obj.sizes[_i2] = [0, obj.sizes[_i2][1] + 1, obj.sizes[_i2][2]];else obj.sizes[_i2] = [obj.sizes[_i2][1] + 1, 0, obj.sizes[_i2][2]];
	    }
	  }

	  return obj;
	} //ARGB conversion


	function _safeColor$1(str) {
	  str = str || "000000";
	  if (str.length === 8) str = str.substring(2);
	  return "#" + str;
	} //only fonts that we support can be imported


	function _safeFont(str) {
	  var safe = defaultStyles["font-family"];

	  for (var i = 0; i < fontFamily.length; i++) {
	    if (fontFamily[i].value == str) {
	      safe = fontFamily[i].id;
	      break;
	    }
	  }

	  return safe;
	}

	function _getStyles$1(obj) {
	  var styleshash = {},
	      styles = [],
	      stylescount = 1;

	  for (var i = 0; i < obj.styles.length; i++) {
	    var str = [],
	        stl = obj.styles[i][2],
	        css = void 0;

	    for (var s = 0; s < style_names.length; s++) {
	      switch (style_names[s]) {
	        case "color":
	          str[s] = stl.font && stl.font.color ? _safeColor$1(stl.font.color.rgb) || "" : "";
	          break;

	        case "background":
	          str[s] = stl.fill && stl.fill.fgColor ? _safeColor$1(stl.fill.fgColor.rgb) || "" : "";
	          break;

	        case "text-align":
	          str[s] = (stl.alignment ? stl.alignment.horizontal : "") || defaultStyles["text-align"];
	          break;

	        case "font-family":
	          str[s] = stl.font && stl.font.name ? _safeFont(stl.font.name) : "";
	          break;

	        case "font-size":
	          str[s] = stl.font && stl.font.sz ? stl.font.sz / 0.75 + "px" || "" : ""; //pt to px conversion

	          break;

	        case "font-style":
	          str[s] = stl.font && stl.font.italic ? "italic" : "";
	          break;

	        case "text-decoration":
	          str[s] = stl.font && stl.font.underline ? "underline" : "";
	          break;

	        case "font-weight":
	          str[s] = stl.font && stl.font.bold ? "bold" : "";
	          break;

	        case "vertical-align":
	          var va = stl.alignment ? stl.alignment.vertical || "" : "";
	          str[s] = (va == "center" ? "middle" : va) || defaultStyles["vertical-align"];
	          break;

	        case "wrap":
	          str[s] = stl.alignment && stl.alignment.wrapText ? "wrap" : "nowrap";
	          break;

	        case "borders":
	          str[s] = "";
	          break;

	        case "format":
	          str[s] = ""; //stl.numFmt

	          break;

	        case "border-right":
	          str[s] = stl.border && stl.border.right ? _safeColor$1(stl.border.right.color.rgb) || "" : "";
	          break;

	        case "border-bottom":
	          str[s] = stl.border && stl.border.bottom ? _safeColor$1(stl.border.bottom.color.rgb) || "" : "";
	          break;

	        case "border-left":
	          str[s] = stl.border && stl.border.left ? _safeColor$1(stl.border.left.color.rgb) || "" : "";
	          break;

	        case "border-top":
	          str[s] = stl.border && stl.border.top ? _safeColor$1(stl.border.top.color.rgb) || "" : "";
	          break;
	      }
	    }

	    str = str.join(";");
	    css = styleshash[str] || "wss" + stylescount;

	    for (var d = 0; d < obj.data.length; d++) {
	      if (obj.data[d][0] === obj.styles[i][0] + 1 && obj.data[d][1] === obj.styles[i][1] + 1) {
	        obj.data[d][3] = css;
	        break;
	      }
	    }

	    if (!styleshash[str]) {
	      styles.push([css, str]);
	      styleshash[str] = css;
	      stylescount++;
	    }
	  }

	  obj.styles = styles;
	  return obj;
	}

	var m24 = /*#__PURE__*/Object.freeze({
		init: init$w
	});

	function init$x(view) {
	  view.attachEvent("onCommand", function (action) {
	    switch (action.id) {
	      case "clear-value":
	        view.clearRange(null, {
	          values: true
	        });
	        break;

	      case "clear-style":
	        view.clearRange(null, {
	          styles: true
	        });
	        break;

	      case "clear-conditional-formats":
	        view.clearRange(null, {
	          conditions: true
	        });
	        break;

	      case "clear-dropdown-editors":
	        view.clearRange(null, {
	          editors: true
	        });
	        break;

	      case "clear-all":
	        group.set(function () {
	          view.clearRange(null, null);
	        });
	        break;

	      case "clear-comments":
	        view.clearRange(null, {
	          comments: true
	        });
	        break;
	    }
	  });
	}

	var m25 = /*#__PURE__*/Object.freeze({
		init: init$x
	});

	function operations(view) {
	  //order in some cases does matter
	  //resize must be applied after math, to size data by the result of math calculation
	  var all = [m1, m2, m5, m6$1, m6, m9, m10, m11, m12, m7, m3, m16, m16a, m3$1, m17, m4, m19, m20, m5$1, m22, m23, m24, m25, m8, m27, m2$1, m1$1];

	  for (var i = 0; i < all.length; i++) {
	    if (all[i].init) all[i].init(view);
	  }
	}

	/* row operations */

	function insertRow(row) {
	  callCommand(this, "add", "row", row);
	}
	function deleteRow(row) {
	  callCommand(this, "del", "row", row);
	}
	function setRowHeight(row, height) {
	  setSize(this, "row", row, height);
	}
	/* col operations */

	function insertColumn(column) {
	  callCommand(this, "add", "column", column);
	}
	function deleteColumn(column) {
	  callCommand(this, "del", "column", column);
	}
	function setColumnWidth(column, width) {
	  setSize(this, "column", column, width);
	}
	/* helpers */

	function getCells$1(view, id, group$$1) {
	  if (!id) {
	    var area = view.$$("cells").getSelectArea();
	    if (area) id = [area.start[group$$1], area.end[group$$1]];
	  } else if (!webix.isArray(id)) {
	    id = [id, id];
	  }

	  return id;
	}

	function callCommand(view, name, group$$1, id) {
	  var start = {},
	      end = {};
	  id = getCells$1(view, id, group$$1);
	  if (!id) return;
	  start[group$$1] = id[0];
	  end[group$$1] = id[1];
	  view.callEvent("onCommand", [{
	    id: name,
	    group: group$$1
	  }, start, end]);
	}

	function setSize(view, type, id, size) {
	  id = getCells$1(view, id, type);
	  if (!id) return;
	  group.set(function () {
	    for (var i = id[0]; i <= id[1]; i++) {
	      view.$$("cells")[type == "row" ? "setRowHeight" : "setColumnWidth"](i, size);
	    }
	  });
	}

	var rco = /*#__PURE__*/Object.freeze({
		insertRow: insertRow,
		deleteRow: deleteRow,
		setRowHeight: setRowHeight,
		insertColumn: insertColumn,
		deleteColumn: deleteColumn,
		setColumnWidth: setColumnWidth
	});

	function lockCell$1(row, column, state) {
	  lockCell(this, row, column, state);
	}
	function isCellLocked$1(row, column) {
	  return isCellLocked(this, row, column);
	}

	var lcl = /*#__PURE__*/Object.freeze({
		lockCell: lockCell$1,
		isCellLocked: isCellLocked$1
	});

	function freezeColumns(column) {
	  var grid = this.$$("cells");

	  if (webix.isUndefined(column)) {
	    var sel = this.getSelectedId(true);
	    column = sel.length ? sel[0].column : 0;
	  }

	  var base = grid.config.columns[0].id == "rowId" ? 1 : 0;
	  var index = base;
	  if (column && column != this._frozenColumns) index = grid.getColumnIndex(column * 1 + 1);
	  if (index < base) index = base;
	  group.set(function () {
	    checkSpans(this, "column", column);
	    grid.unselect();
	    grid.define("leftSplit", index);
	    grid.refreshColumns();
	    this.callEvent("onAction", ["freeze-column", {
	      value: this._frozenColumns || 0,
	      newValue: column
	    }]);
	    this._frozenColumns = index > base ? column : 0;
	  }, this);
	}
	function freezeRows(row) {
	  var grid = this.$$("cells");

	  if (webix.isUndefined(row)) {
	    var sel = this.getSelectedId(true);
	    row = sel.length ? sel[0].row : 0;
	  }

	  var index = 0;
	  if (row && row != this._frozenRows) index = grid.getIndexById(row * 1 + 1);
	  if (index < 0) index = 0;
	  group.set(function () {
	    checkSpans(this, "row", row);
	    grid.unselect();
	    grid.define("topSplit", index);
	    grid.refreshColumns();
	    this.callEvent("onAction", ["freeze-row", {
	      value: this._frozenRows,
	      newValue: row
	    }]);
	    this._frozenRows = index ? row : 0;
	  }, this);
	}

	function checkSpans(view, type, num) {
	  var grid = view.$$("cells");

	  if (type == "row") {
	    var start = 1;
	    var end = view.config.columnCount;

	    for (var i = start; i <= end; i++) {
	      var span = grid.getSpan(num, i);

	      if (span) {
	        var spanSize = span[0] * 1 + span[3] - 1;
	        if (spanSize > num) changeSpan(view, span, span[2], num - span[1] + 1);
	      }
	    }
	  } else {
	    //column
	    var _start = grid.data.order[0];
	    var _end = grid.data.order.length;

	    for (var _i = _start; _i <= _end; _i++) {
	      var _span = grid.getSpan(_i, num);

	      if (_span) {
	        var _spanSize = _span[1] * 1 + _span[2] - 1;

	        if (_spanSize > num) changeSpan(view, _span, num - _span[0] + 1, _span[3]);
	      }
	    }
	  }
	}

	function changeSpan(view, span, x, y) {
	  view.splitCell(span[0], span[1]);
	  view.combineCells({
	    cell: {
	      row: span[0],
	      column: span[1]
	    },
	    x: x,
	    y: y
	  });
	}

	var fcl = /*#__PURE__*/Object.freeze({
		freezeColumns: freezeColumns,
		freezeRows: freezeRows
	});

	function hideGridlines$1(state) {
	  hideGridlines(this, state);
	}

	var hbr = /*#__PURE__*/Object.freeze({
		hideGridlines: hideGridlines$1
	});

	function hideHeaders$1(state) {
	  hideHeaders(this, state);
	}

	var hhd = /*#__PURE__*/Object.freeze({
		hideHeaders: hideHeaders$1
	});

	function hideColumn(column, state) {
	  setColumnState(this, column, state);
	}
	function isColumnVisible$1(column) {
	  return isColumnVisible(this, column);
	}
	function hideRow(row, state) {
	  setRowState(this, row, state);
	}
	function isRowVisible$1(row) {
	  return isRowVisible(this, row);
	}

	var hrc = /*#__PURE__*/Object.freeze({
		hideColumn: hideColumn,
		isColumnVisible: isColumnVisible$1,
		hideRow: hideRow,
		isRowVisible: isRowVisible$1
	});

	function addImage(row, column, url) {
	  this.setCellValue(row, column, image(url));
	  this.refresh();
	}
	function addSparkline(row, column, config) {
	  var value = chart(config);
	  this.setCellValue(row, column, value);
	  this.refresh();
	}
	function getSheetData(name) {
	  return getAccessor(this, name);
	}
	function recalculate() {
	  this.callEvent("onMathRefresh", []);
	}
	function registerMathMethod(name, handler) {
	  name = name.toUpperCase();
	  addMethod(name, handler);

	  if (this.$$("liveEditor")) {
	    var sid = this.$$("liveEditor").config.suggest;
	    var list = webix.$$(sid).getList();
	    if (!list.exists(name)) list.add({
	      id: name,
	      value: name
	    });
	  }
	}

	var mat = /*#__PURE__*/Object.freeze({
		addImage: addImage,
		addSparkline: addSparkline,
		getSheetData: getSheetData,
		recalculate: recalculate,
		registerMathMethod: registerMathMethod
	});

	function combineCells(range) {
	  var _this = this;

	  if (!range) {
	    var sel = this.getSelectedId(true);

	    if (sel.length > 1) {
	      range = getRange(sel);
	    }
	  }

	  group.set(function () {
	    if (range) addSpan(_this, range.cell, range.x, range.y);
	  });
	  this.refresh();
	}
	function splitCell(row, column) {
	  if (row && column) {
	    removeSpan(this, {
	      row: row,
	      column: column
	    });
	  } else {
	    group.set(function () {
	      this.eachSelectedCell(function (cell) {
	        removeSpan(this, cell);
	      });
	    }, this);
	  }

	  this.refresh();
	} //styles

	function addStyle$1(prop, origin) {
	  return addStyle(this, prop, origin);
	}
	function getStyle$1(row, column) {
	  return getStyle(this, {
	    row: row,
	    column: column
	  });
	}
	function setStyle$1(row, column, style) {
	  return setStyle(this, {
	    row: row,
	    column: column
	  }, style);
	}
	function setRangeStyle$1(rangeStr, style) {
	  group.set(function () {
	    setRangeStyle(this, rangeStr, style);
	  }, this);
	}
	function clearRange(rangeStr, type) {
	  if (!rangeStr) {
	    rangeStr = this._table.getSelectArea();
	    if (!rangeStr) return;
	  }

	  if (!type) type = {
	    styles: true,
	    values: true,
	    editors: true,
	    conditions: true,
	    comments: true
	  };
	  if (type.styles) clearRangeStyle(this, rangeStr);
	  if (type.conditions) clearConditionalFormats(this, rangeStr);
	  if (type.values) this.setRangeValue(rangeStr, null);
	  if (type.editors) clearEditors(this, rangeStr);
	  if (type.comments) removeCommentsRange(this, rangeStr);
	  this.refresh();
	}
	function compactStyles$1() {
	  return compactStyles(this);
	} // serialize

	function serialize$a(config) {
	  var obj = {};
	  this.callEvent("onDataSerialize", [obj, config]);
	  if (config && config.sheets) return serialize$1(this, obj);
	  return obj;
	} //sheets

	function showSheet(name) {
	  show(this, name);
	}
	function getActiveSheet() {
	  return this._activeSheet;
	}
	function addSheet(content) {
	  add(this, content);
	}
	function clearSheet() {
	  this.reset();
	}
	function renameSheet(name, newName) {
	  rename(this, name, newName);
	}
	function editSheet(name) {
	  edit(this, name);
	}
	function removeSheet(name) {
	  remove(this, name);
	} //undo

	function undo$1() {
	  undo(this);
	}
	function redo$1() {
	  redo(this);
	} // sort

	function sortRange$1(range, dir) {
	  sortRange(this, range, dir);
	}

	var ops = /*#__PURE__*/Object.freeze({
		combineCells: combineCells,
		splitCell: splitCell,
		addStyle: addStyle$1,
		getStyle: getStyle$1,
		setStyle: setStyle$1,
		setRangeStyle: setRangeStyle$1,
		clearRange: clearRange,
		compactStyles: compactStyles$1,
		serialize: serialize$a,
		showSheet: showSheet,
		getActiveSheet: getActiveSheet,
		addSheet: addSheet,
		clearSheet: clearSheet,
		renameSheet: renameSheet,
		editSheet: editSheet,
		removeSheet: removeSheet,
		undo: undo$1,
		redo: redo$1,
		sortRange: sortRange$1
	});

	function refresh$1(all) {
	  if (all) this._table.refreshColumns();else this._table.refresh();
	}
	function eachSelectedCell(cb) {
	  var cells = this.getSelectedId(true);

	  for (var i = 0; i < cells.length; i++) {
	    cb.call(this, cells[i]);
	  }
	}
	function getSelectedRange(sheet) {
	  var area = this._table.getSelectArea();

	  if (area) {
	    if (sheet) sheet = this.getActiveSheet();
	    return toRange(area.start.row, area.start.column, area.end.row, area.end.column, sheet);
	  }

	  return "";
	}
	function getSelectedId(all) {
	  var area = this._table.getSelectArea();

	  if (!all) return area && area.start.row ? area.start : null;
	  var selection = [];

	  if (area) {
	    var c0 = area.start;
	    var c1 = area.end;

	    for (var i = c0.row; i <= c1.row; i++) {
	      for (var j = c0.column; j <= c1.column; j++) {
	        selection.push({
	          row: i,
	          column: j
	        });
	      }
	    }
	  }

	  return selection; //return this._table.getSelectedId(all)
	}
	function getCellValue$1(row, column) {
	  var item = this.getRow(row);
	  var value = item["$" + column] || item[column];
	  if (typeof value === "undefined") return "";
	  return value;
	}
	function setCellValue(row, column, value) {
	  if (this.getCellValue(row, column) !== value) {
	    var item = this.getRow(row);
	    var old = item["$" + column] || item[column];

	    if (this.callEvent("onBeforeValueChange", [row, column, value, old])) {
	      item[column] = value;
	      delete item["$" + column];
	      this.callEvent("onCellChange", [row, column, value]);
	      this.saveCell(row, column);
	    }
	  }
	}
	function setRangeValue(range$$1, value) {
	  group.set(function () {
	    var pos = rangeObj(range$$1, this);

	    for (var row = pos.start.row; row <= pos.end.row; row++) {
	      for (var column = pos.start.column; column <= pos.end.column; column++) {
	        this.setCellValue(row, column, value);
	      }
	    }
	  }, this);
	}
	function getRow(id) {
	  return this._table.getItem(id);
	}
	function getColumn(id) {
	  return this._table.getColumnConfig(id);
	}
	function reset$9(mode) {
	  var obj = {
	    data: []
	  };

	  if (mode && mode.sheets) {
	    obj = newSheet(obj);
	  }

	  this.parse(obj);
	}
	function _resetTable() {
	  reset$1(this);
	}

	var cor = /*#__PURE__*/Object.freeze({
		refresh: refresh$1,
		eachSelectedCell: eachSelectedCell,
		getSelectedRange: getSelectedRange,
		getSelectedId: getSelectedId,
		getCellValue: getCellValue$1,
		setCellValue: setCellValue,
		setRangeValue: setRangeValue,
		getRow: getRow,
		getColumn: getColumn,
		reset: reset$9,
		_resetTable: _resetTable
	});

	function saveCell(row, column) {
	  var style = this.getStyle(row, column);
	  save(this, "data", {
	    row: row,
	    column: column,
	    value: this.getCellValue(row, column),
	    style: style ? style.id : ""
	  });
	}

	var sav = /*#__PURE__*/Object.freeze({
		saveCell: saveCell
	});

	function getRow$1(id) {
	  return this._table.getItem(id);
	}
	function setCellFilter(row, column, range) {
	  setFilter(this, row, column, range);
	}
	function setCellEditor(row, column, editor) {
	  var line = this._table._ssEditors[row] = this._table._ssEditors[row] || {};

	  var value = line[column] || this._table.getItem(row)[column];

	  line[column] = editor;
	  if (editor && editor.editor) this._table.addCellCss(row, column, "ss_filter");else {
	    delete this._table._ssEditors[row][column];

	    this._table.removeCellCss(row, column, "ss_filter");
	  }
	  this.callEvent("onAction", ["dropdown", {
	    row: row,
	    column: column,
	    value: value,
	    newValue: editor
	  }]);
	}
	function getCellEditor(row, column) {
	  var line = this._table._ssEditors[row] || {};
	  return line[column] || null;
	}
	function addFilter(row, column) {
	  return addCellFilter(this, row, column);
	}
	function removeFilter() {
	  var fs = getFilters(this._table);

	  for (var i = 0; i < fs.length; i++) {
	    var _fs$i = _slicedToArray(fs[i], 2),
	        row = _fs$i[0],
	        column = _fs$i[1];

	    var value = this.getCellEditor(row, column);
	    this.setCellEditor(row, column, null);

	    this._table.removeCellCss(row, column, "ss_filter");

	    this.callEvent("onAction", ["filter", {
	      row: row,
	      column: column,
	      value: value,
	      newValue: null
	    }]);
	  }

	  this._table._ssFilters = {};

	  this._table.data.filter(function () {
	    return true;
	  });
	}
	function filterSpreadSheet() {
	  this._table.data.silent(function () {
	    var _this = this;

	    var filters = getFilters(this._table);

	    var _loop = function () {
	      var _filters$i = _slicedToArray(filters[i], 2),
	          row = _filters$i[0],
	          column = _filters$i[1];

	      value = _this._table.getItem(row)[column];
	      all = false;
	      var isNull = value == nullFilter();

	      _this._table.data.filter(function (obj) {
	        if (!value) return true;
	        if (isNull && !obj[column]) return true;
	        if (obj.id * 1 <= row * 1) return true;
	        if (!obj[column] && obj[column] !== "") all = true;
	        return all || obj[column] == value;
	      }, 1, i);
	    };

	    for (var i = 0; i < filters.length; i++) {
	      var value;
	      var all;

	      _loop();
	    }
	  }, this);

	  this._table.refresh();
	}

	var dpd$1 = /*#__PURE__*/Object.freeze({
		getRow: getRow$1,
		setCellFilter: setCellFilter,
		setCellEditor: setCellEditor,
		getCellEditor: getCellEditor,
		addFilter: addFilter,
		removeFilter: removeFilter,
		filterSpreadSheet: filterSpreadSheet
	});

	function confirm(config) {
	  var _this = this;

	  webix.modalbox({
	    type: "alert webix_ssheet_confirm",
	    text: config.text,
	    buttons: [webix.i18n.spreadsheet.labels.cancel, webix.i18n.spreadsheet.labels.ok],
	    callback: function (result) {
	      config.callback.call(_this, result != "0");
	    }
	  });
	}
	function alert(config) {
	  webix.modalbox({
	    type: "alert webix_ssheet_alert",
	    text: config.text,
	    buttons: [webix.i18n.spreadsheet.labels.ok]
	  });
	}

	var cfm = /*#__PURE__*/Object.freeze({
		confirm: confirm,
		alert: alert
	});

	function resetUndo() {
	  reset$4(this);
	}
	function groupUndo(func) {
	  group.set(func, this);
	}
	function ignoreUndo$1(func) {
	  ignoreUndo(func, this);
	}

	var und = /*#__PURE__*/Object.freeze({
		resetUndo: resetUndo,
		groupUndo: groupUndo,
		ignoreUndo: ignoreUndo$1
	});

	function setFormat(row, column, format) {
	  addFormat(this, row, column, format);
	}
	function changeDecimals(row, column, inc) {
	  //row and column may be obj
	  changeAreaDecimals(this, inc, row, column);
	}

	var fmt$1 = /*#__PURE__*/Object.freeze({
		setFormat: setFormat,
		changeDecimals: changeDecimals
	});

	function api(view) {
	  var all = [rco, lcl, fcl, hbr, hhd, hrc, mat, ops, cor, sav, dpd$1, cfm, und, fmt$1];

	  for (var i = 0; i < all.length; i++) {
	    webix.extend(view, all[i]);
	  }
	}

	var defaultMenu = [{
	  id: "file",
	  submenu: [{
	    id: "sheet",
	    submenu: [{
	      id: "new-sheet"
	    }, {
	      id: "copy-sheet"
	    }, {
	      id: "remove-sheet"
	    }]
	  }, {
	    id: "excel-import"
	  }, {
	    id: "excel-export"
	  }]
	}, {
	  id: "edit",
	  submenu: [{
	    id: "add-range"
	  }, {
	    id: "add-dropdown"
	  }, {
	    id: "add-link"
	  }, {
	    id: "lock-cell"
	  }, {
	    id: "conditional-format"
	  }, {
	    id: "clear",
	    submenu: [{
	      id: "clear-value"
	    }, {
	      id: "clear-style"
	    }, {
	      id: "clear-conditional-formats"
	    }, {
	      id: "clear-dropdown-editors"
	    }, {
	      id: "clear-comments"
	    }, {
	      $template: "Separator"
	    }, {
	      id: "clear-all"
	    }]
	  }]
	}, {
	  id: "insert",
	  submenu: [{
	    id: "add-image"
	  }, {
	    id: "add-sparkline"
	  }, {
	    id: "add-comment"
	  }]
	}, {
	  id: "data",
	  submenu: [{
	    id: "sort",
	    submenu: [{
	      id: "sort-asc"
	    }, {
	      id: "sort-desc"
	    }]
	  }, {
	    id: "create-filter"
	  }]
	}, {
	  id: "view",
	  submenu: [{
	    id: "columns",
	    submenu: [{
	      id: "insert-column"
	    }, {
	      id: "delete-column"
	    }, {
	      id: "show-column"
	    }, {
	      id: "hide-column"
	    }, {
	      id: "resize-column"
	    }]
	  }, {
	    id: "rows",
	    submenu: [{
	      id: "insert-row"
	    }, {
	      id: "delete-row"
	    }, {
	      id: "show-row"
	    }, {
	      id: "hide-row"
	    }, {
	      id: "resize-row"
	    }]
	  }, {
	    $template: "Separator"
	  }, {
	    id: "freeze-columns"
	  }, {
	    id: "freeze-rows"
	  }, {
	    id: "hide-gridlines"
	  }, {
	    id: "hide-headers"
	  }]
	}];
	var ui$1 = {
	  getMenuData: function (menu, config) {
	    var i;

	    for (i = 0; i < menu.length; i++) {
	      if (typeof menu[i] == "string") menu[i] = {
	        id: menu[i]
	      };

	      if ((menu[i].id == "resize-column" || menu[i].id == "resize-row") && !config.resizeCell) {
	        menu.splice(i, 1);
	        i--;
	        continue;
	      }

	      if (!menu[i].value) menu[i].value = webix.i18n.spreadsheet.menus[menu[i].id];
	      if (menu[i].submenu) menu[i].submenu = this.getMenuData(menu[i].submenu, config);
	    }

	    return menu;
	  }
	};
	function init$y(view) {
	  view.attachEvent("onComponentInit", function () {
	    return ready$4(view);
	  });
	  var config = view.config,
	      menu = {
	    view: "menu",
	    borderless: true,
	    css: "webix_ssheet_menu",
	    id: "menu",
	    autowidth: true,
	    type: {
	      height: 40
	    },
	    data: ui$1.getMenuData(webix.isArray(config.menu) ? config.menu : webix.copy(defaultMenu), view.config)
	  };
	  view.callEvent("onViewInit", ["menu", menu]);
	  return menu;
	}

	function ready$4(view) {
	  if (view.$$("menu")) view.$$("menu").attachEvent("onMenuItemClick", function (id) {
	    return callAction$1(view, id);
	  });
	}

	var actionMap$1 = {
	  "undo": function (view) {
	    view.undo();
	  },
	  "redo": function (view) {
	    view.redo();
	  },
	  "insert-column": function (view) {
	    view.insertColumn();
	  },
	  "delete-column": function (view) {
	    view.deleteColumn();
	  },
	  "show-column": function (view) {
	    view.hideColumn(null, false);
	  },
	  "hide-column": function (view) {
	    view.hideColumn(null, true);
	  },
	  "resize-column": function (view) {
	    //like we are calling from the toolbar
	    view.callEvent("onCommand", [{
	      id: "resize",
	      group: "column",
	      value: webix.i18n.spreadsheet.menus["resize-column"]
	    }]);
	  },
	  "insert-row": function (view) {
	    view.insertRow();
	  },
	  "delete-row": function (view) {
	    view.deleteRow();
	  },
	  "show-row": function (view) {
	    view.hideRow(null, false);
	  },
	  "hide-row": function (view) {
	    view.hideRow(null, true);
	  },
	  "resize-row": function (view) {
	    //like we are calling from the toolbar
	    view.callEvent("onCommand", [{
	      id: "resize",
	      group: "row",
	      value: webix.i18n.spreadsheet.menus["resize-row"]
	    }]);
	  },
	  "freeze-columns": function (view) {
	    view.freezeColumns();
	  },
	  "hide-gridlines": function (view) {
	    view.hideGridlines("toggle");
	  },
	  "hide-headers": function (view) {
	    view.hideHeaders("toggle");
	  }
	};

	function callAction$1(view, id) {
	  if (view.callEvent("onMenuItemClick", [id])) {
	    if (actionMap$1[id]) actionMap$1[id](view);else view.callEvent("onCommand", [{
	      id: id
	    }]);
	  }
	}

	function getText$1(text) {
	  var locale = webix.i18n.spreadsheet.labels;
	  return locale[text] || text;
	}

	function getDefaultStyles() {
	  return [{
	    name: getText$1("normal"),
	    css: "webix_ssheet_condition_regular"
	  }, {
	    name: getText$1("neutral"),
	    css: "webix_ssheet_condition_neutral"
	  }, {
	    name: getText$1("bad"),
	    css: "webix_ssheet_condition_bad"
	  }, {
	    name: getText$1("good"),
	    css: "webix_ssheet_condition_good"
	  }];
	}

	//global definitions
	var component = {
	  name: "spreadsheet",
	  _base_index: {
	    count: 1
	  },
	  defaults: {
	    spans: true,
	    rowCount: 50,
	    math: true,
	    columnCount: 20,
	    resizeCell: true,
	    sheetTabWidth: 90,
	    conditionStyle: getDefaultStyles()
	  },
	  $init: function () {
	    this.$index = this._base_index.count++;
	    this.$view.className += " webix_ssheet";
	    this.$ready.unshift(this._sub_init);
	    this.$ready.unshift(setDefaultFormats);
	    this.$ready.push(this._set_handlers);
	  },
	  $skin: function () {
	    setSkinDefaults();
	  },
	  _sub_init: function () {
	    var obj = this.config;
	    var rows = []; //toolbars

	    if (!obj.readonly && obj.menu) rows.push(init$y(this));
	    if (!obj.readonly && obj.toolbar !== false) rows.push(init$2(this));
	    if (obj.subbar) rows.push(obj.subbar);
	    if (obj.liveEditor) rows.push(init$5(this)); //data part

	    var tblObj = {
	      editable: !obj.readonly,
	      clipboard: obj.clipboard,
	      liveEditor: obj.liveEditor,
	      clipboardDecimalDelimiter: obj.clipboardDecimalDelimiter
	    };
	    if (obj.rowHeight) tblObj.rowHeight = obj.rowHeight;
	    if (obj.columnWidth) tblObj.columnWidth = obj.columnWidth;
	    rows.push(init$3(this, tblObj));
	    var bottom = obj.bottombar === true ? defaultBottom(this) : obj.bottombar;
	    if (bottom) rows.push(bottom);
	    init$6(this);
	    if (!obj.readonly) init$9(this);
	    init$8(this);
	    this.rows_setter(rows);
	  },
	  _set_handlers: function () {
	    var _this = this;

	    //prevent double init
	    if (this._table) return;
	    this._table = this.$$("cells"); //init all sub modules

	    operations(this); //set sizes for the table

	    reset$1(this, this.config.columnCount, this.config.rowCount);
	    init$4(this); //keyboard shortcuts

	    this._table.attachEvent("onAfterAreaAdd", function () {
	      return _this.callEvent("onAfterSelect", [_this.getSelectedId(true)]);
	    });

	    this.callEvent("onComponentInit", []);
	  },
	  $onLoad: function (obj, driver) {
	    //when loading data by data:, we can get $onLoad before _set_handlers call
	    this._set_handlers();

	    if (obj.excel) obj = this._parseExcel(obj, driver);else if (!obj.data && typeof obj == "string" && (driver.cell || driver.row)) obj = this._parseCsv(obj, driver);
	    load$1(this, obj);
	  }
	};
	api(component);
	webix.protoUI(component, webix.AtomDataLoader, webix.IdSpace, webix.ui.layout);

})));
