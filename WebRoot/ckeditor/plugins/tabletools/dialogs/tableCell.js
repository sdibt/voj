﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add('cellProperties',function(a){var b=a.lang.table,c=b.cell,d=a.lang.common,e=CKEDITOR.dialog.validate,f=/^(\d+(?:\.\d+)?)(px|%)$/,g=/^(\d+(?:\.\d+)?)px$/,h=CKEDITOR.tools.bind;function i(){return{type:'html',html:'&nbsp;'};};function j(k,l){var m=function(){p(this);l(this);},n=function(){p(this);},o=function(q){q.on('ok',m);q.on('cancel',n);},p=function(q){q.removeListener('ok',m);q.removeListener('cancel',n);};a.execCommand(k);if(a._.storedDialogs.colordialog)o(a._.storedDialogs.colordialog);else CKEDITOR.on('dialogDefinition',function(q){if(q.data.name!=k)return;var r=q.data.definition;q.removeListener();r.onLoad=CKEDITOR.tools.override(r.onLoad,function(s){return function(){o(this);r.onLoad=s;if(typeof s=='function')s.call(this);};});});};return{title:c.title,minWidth:CKEDITOR.env.ie&&CKEDITOR.env.quirks?550:480,minHeight:CKEDITOR.env.ie?CKEDITOR.env.quirks?180:150:140,contents:[{id:'info',label:c.title,accessKey:'I',elements:[{type:'hbox',widths:['40%','5%','40%'],children:[{type:'vbox',padding:0,children:[{type:'hbox',widths:['70%','30%'],children:[{type:'text',id:'width',label:b.width,widths:['71%','29%'],labelLayout:'horizontal',validate:e.number(c.invalidWidth),onLoad:function(){var k=this.getDialog().getContentElement('info','widthType'),l=k.getElement(),m=this.getInputElement(),n=m.getAttribute('aria-labelledby');m.setAttribute('aria-labelledby',[n,l.$.id].join(' '));},setup:function(k){var l=parseInt(k.getAttribute('width'),10),m=parseInt(k.getStyle('width'),10);!isNaN(l)&&this.setValue(l);!isNaN(m)&&this.setValue(m);},commit:function(k){var l=parseInt(this.getValue(),10),m=this.getDialog().getValueOf('info','widthType');if(!isNaN(l))k.setStyle('width',l+m);else k.removeStyle('width');k.removeAttribute('width');},'default':''},{type:'select',id:'widthType',labelLayout:'horizontal',widths:['0%','100%'],label:a.lang.table.widthUnit,labelStyle:'display:none','default':'px',items:[[b.widthPx,'px'],[b.widthPc,'%']],setup:function(k){var l=f.exec(k.$.style.width);if(l)this.setValue(l[2]);}}]},{type:'hbox',widths:['70%','30%'],children:[{type:'text',id:'height',label:b.height,'default':'',widths:['71%','29%'],labelLayout:'horizontal',validate:e.number(c.invalidHeight),onLoad:function(){var k=this.getDialog().getContentElement('info','htmlHeightType'),l=k.getElement(),m=this.getInputElement(),n=m.getAttribute('aria-labelledby');m.setAttribute('aria-labelledby',[n,l.$.id].join(' '));},setup:function(k){var l=parseInt(k.getAttribute('height'),10),m=parseInt(k.getStyle('height'),10);
!isNaN(l)&&this.setValue(l);!isNaN(m)&&this.setValue(m);},commit:function(k){var l=parseInt(this.getValue(),10);if(!isNaN(l))k.setStyle('height',CKEDITOR.tools.cssLength(l));else k.removeStyle('height');k.removeAttribute('height');}},{id:'htmlHeightType',type:'html',html:b.widthPx}]},i(),{type:'select',id:'wordWrap',labelLayout:'horizontal',label:c.wordWrap,widths:['50%','50%'],'default':'yes',items:[[c.yes,'yes'],[c.no,'no']],setup:function(k){var l=k.getAttribute('noWrap'),m=k.getStyle('white-space');if(m=='nowrap'||l)this.setValue('no');},commit:function(k){if(this.getValue()=='no')k.setStyle('white-space','nowrap');else k.removeStyle('white-space');k.removeAttribute('noWrap');}},i(),{type:'select',id:'hAlign',labelLayout:'horizontal',label:c.hAlign,widths:['50%','50%'],'default':'',items:[[d.notSet,''],[b.alignLeft,'left'],[b.alignCenter,'center'],[b.alignRight,'right']],setup:function(k){var l=k.getAttribute('align'),m=k.getStyle('text-align');this.setValue(m||l||'');},commit:function(k){var l=this.getValue();if(l)k.setStyle('text-align',l);else k.removeStyle('text-align');k.removeAttribute('align');}},{type:'select',id:'vAlign',labelLayout:'horizontal',label:c.vAlign,widths:['50%','50%'],'default':'',items:[[d.notSet,''],[c.alignTop,'top'],[c.alignMiddle,'middle'],[c.alignBottom,'bottom'],[c.alignBaseline,'baseline']],setup:function(k){var l=k.getAttribute('vAlign'),m=k.getStyle('vertical-align');switch(m){case 'top':case 'middle':case 'bottom':case 'baseline':break;default:m='';}this.setValue(m||l||'');},commit:function(k){var l=this.getValue();if(l)k.setStyle('vertical-align',l);else k.removeStyle('vertical-align');k.removeAttribute('vAlign');}}]},i(),{type:'vbox',padding:0,children:[{type:'select',id:'cellType',label:c.cellType,labelLayout:'horizontal',widths:['50%','50%'],'default':'td',items:[[c.data,'td'],[c.header,'th']],setup:function(k){this.setValue(k.getName());},commit:function(k){k.renameNode(this.getValue());}},i(),{type:'text',id:'rowSpan',label:c.rowSpan,labelLayout:'horizontal',widths:['50%','50%'],'default':'',validate:e.integer(c.invalidRowSpan),setup:function(k){var l=parseInt(k.getAttribute('rowSpan'),10);if(l&&l!=1)this.setValue(l);},commit:function(k){var l=parseInt(this.getValue(),10);if(l&&l!=1)k.setAttribute('rowSpan',this.getValue());else k.removeAttribute('rowSpan');}},{type:'text',id:'colSpan',label:c.colSpan,labelLayout:'horizontal',widths:['50%','50%'],'default':'',validate:e.integer(c.invalidColSpan),setup:function(k){var l=parseInt(k.getAttribute('colSpan'),10);
if(l&&l!=1)this.setValue(l);},commit:function(k){var l=parseInt(this.getValue(),10);if(l&&l!=1)k.setAttribute('colSpan',this.getValue());else k.removeAttribute('colSpan');}},i(),{type:'hbox',padding:0,widths:['80%','20%'],children:[{type:'text',id:'bgColor',label:c.bgColor,labelLayout:'horizontal',widths:['70%','30%'],'default':'',setup:function(k){var l=k.getAttribute('bgColor'),m=k.getStyle('background-color');this.setValue(m||l);},commit:function(k){var l=this.getValue();if(l)k.setStyle('background-color',this.getValue());else k.removeStyle('background-color');k.removeAttribute('bgColor');}},{type:'button',id:'bgColorChoose',label:c.chooseColor,style:'margin-left: 10px',onClick:function(){var k=this;j('colordialog',function(l){k.getDialog().getContentElement('info','bgColor').setValue(l.getContentElement('picker','selectedColor').getValue());});}}]},i(),{type:'hbox',padding:0,widths:['80%','20%'],children:[{type:'text',id:'borderColor',label:c.borderColor,labelLayout:'horizontal',widths:['70%','30%'],'default':'',setup:function(k){var l=k.getAttribute('borderColor'),m=k.getStyle('border-color');this.setValue(m||l);},commit:function(k){var l=this.getValue();if(l)k.setStyle('border-color',this.getValue());else k.removeStyle('border-color');k.removeAttribute('borderColor');}},{type:'button',id:'borderColorChoose',label:c.chooseColor,style:'margin-left: 10px',onClick:function(){var k=this;j('colordialog',function(l){k.getDialog().getContentElement('info','borderColor').setValue(l.getContentElement('picker','selectedColor').getValue());});}}]}]}]}]}],onShow:function(){var k=this;k.cells=CKEDITOR.plugins.tabletools.getSelectedCells(k._.editor.getSelection());k.setupContent(k.cells[0]);},onOk:function(){var k=this._.editor.getSelection(),l=k.createBookmarks(),m=this.cells;for(var n=0;n<m.length;n++)this.commitContent(m[n]);k.selectBookmarks(l);}};});
