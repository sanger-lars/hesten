'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
    function Modal() {
        _classCallCheck(this, Modal);

        this.modalContainer = document.createElement('div');
        this.modalContainer.className = 'modal';
        document.body.appendChild(this.modalContainer);

        var contentContainer = document.createElement('div');
        contentContainer.className = 'mcontainer';
        this.modalContainer.appendChild(contentContainer);

        var closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.className = 'close-button';
        contentContainer.appendChild(closeButton);
        closeButton.addEventListener('click', this.close.bind(this));

        this.content = document.createElement('div');
        contentContainer.appendChild(this.content);
        this.pos = window.scrollY;
    }

    _createClass(Modal, [{
        key: 'open',
        value: function open() {
            this.modalContainer.classList.add('open');
        }
    }, {
        key: 'close',
        value: function close() {
            window.scroll(0, this.pos);
            this.modalContainer.classList.remove('open');
            this.modalContainer.remove();
        }
    }, {
        key: 'html',
        set: function set(value) {
            this.content.innerHTML = value;
        }
    }]);

    return Modal;
}();
